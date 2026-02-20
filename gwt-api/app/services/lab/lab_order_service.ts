
  import ChargeService from '#services/charge/charge_service'
  import GuidHelper from '#services/shared/guid_helper'
  import SerialHelper from '#services/shared/serial_helper'
  import { LabOrderSaveParams, LabItemParam } from '#services/charge/types'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
  
  export default class LabOrderService {
    private chargeService: ChargeService
  
    constructor() {
      this.chargeService = new ChargeService()
    }
  
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SAVE LAB ORDER (DoSaveLab equivalent)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
    public async saveLab(params: LabOrderSaveParams) {
      return db.transaction(async (trx) => {
        // ── Phase 1: Validate ────────────────────────────
        await this.validate(params, trx)
  
        // ── Phase 2: Determine OPD/IPD ───────────────────
        const isOPD = !!params.vn
        const department = isOPD ? 'OPD' : 'IPD'
  
        // ── Phase 3: Get/Create lab_order_number ─────────
        const labOrderNumber = params.labOrderNumber
          || await SerialHelper.getUniqueSerial(
               'lab_order_number', 'lab_head', 'lab_order_number', trx
             )
  
        // ── Phase 4: Get form settings ──────────────────
        const formSettings = await trx.from('lab_form_head')
          .where('form_name', params.formName)
          .select('confirm_charge_money', 'finance_lab_confirm')
          .first()
  
        // ── Phase 5: Clean existing orders (edit mode) ──
        if (params.labOrderNumber && params.labOrderNumber > 0) {
          await this.cleanExistingOrders(
            params.labOrderNumber, trx
          )
        }
  
        // ── Phase 6: Save lab_head ──────────────────────
        await this.upsertLabHead({
          labOrderNumber,
          labAppOrderNumber: params.labAppOrderNumber,
          hn: params.hn,
          vn: params.vn,
          an: params.an,
          department,
          formName: params.formName,
          doctorCode: params.doctorCode,
          orderDate: params.orderDate,
          confirmChargeMoney: formSettings?.confirm_charge_money || 'N',
          financeLabConfirm: formSettings?.finance_lab_confirm || 'N',
        }, trx)
  
        // ── Phase 7: Save lab_order items ───────────────
        for (const item of params.labItems) {
          await this.insertLabOrder(labOrderNumber, item, trx)
        }
  
        // ── Phase 8: Save lab_order_service + CHARGE ────
        for (const item of params.labItems) {
          if (!item.icode || item.price <= 0) continue
  
          await this.processLabOrderService({
            labOrderNumber,
            labAppOrderNumber: params.labAppOrderNumber,
            item,
            vn: params.vn,
            an: params.an,
            hn: params.hn,
            doctorCode: params.doctorCode,
            isOPD,
            shouldCharge:
              formSettings?.confirm_charge_money === 'Y',
          }, trx)
        }
  
        return { labOrderNumber }
      })
    }
  
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PRIVATE: Process single lab_order_service + charge
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
    private async processLabOrderService(
      params: {
        labOrderNumber: number
        labAppOrderNumber?: number
        item: LabItemParam
        vn?: string
        an?: string
        hn: string
        doctorCode: string
        isOPD: boolean
        shouldCharge: boolean
      },
      trx: TransactionClientContract
    ) {
      // Step 1: Generate opi_guid
      const opiGuid = await GuidHelper.getNewGUID()
  
      // Step 2: Generate lab_order_service_id
      const serviceId = await SerialHelper.getUniqueSerial(
        'lab_order_service_id',
        'lab_order_service',
        'lab_order_service_id',
        trx
      )
  
      // Step 3: Insert lab_order_service
      await trx.table('lab_order_service').insert({
        lab_order_service_id: serviceId,
        lab_order_number: params.labOrderNumber,
        lab_items_code: params.item.labItemsCode,
        lab_order_type: params.item.labOrderType,
        icode: params.item.icode,
        price: params.item.price,
        opi_guid: opiGuid,
      })
  
      // Step 4: Insert lab_opitemrece (mapping)
      await trx.table('lab_opitemrece').insert({
        lab_order_number: params.labOrderNumber,
        hos_guid: opiGuid,
        lab_items_code: params.item.labItemsCode,
      })
  
      // Step 5: Create opitemrece charge (if enabled)
      if (params.shouldCharge) {
        if (params.isOPD && params.vn) {
          await this.chargeService.checkServiceOPDGuid({
            opiGuid,
            vn: params.vn,
            hn: params.hn,
            icode: params.item.icode,
            qty: 1,
            price: params.item.price,
            doctorCode: params.doctorCode,
            itemType: 'N', // lab = nondrug
          }, trx)
        } else if (!params.isOPD && params.an) {
          await this.chargeService.checkServiceIPDGuid({
            opiGuid,
            an: params.an,
            hn: params.hn,
            icode: params.item.icode,
            qty: 1,
            price: params.item.price,
            doctorCode: params.doctorCode,
            itemType: 'N',
            rxDate: new Date(),
          }, trx)
        }
      }
    }
  
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PRIVATE: Delete lab charges
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Equivalent: DoSaveLab Lines 3700-3770
  
    public async deleteLabCharges(
      labOrderNumber: number,
      vn: string | undefined,
      an: string | undefined,
      trx: TransactionClientContract
    ) {
      // Step 1: Get all opi_guids for this lab order
      const guids = await trx.from('lab_opitemrece')
        .where('lab_order_number', labOrderNumber)
        .select('hos_guid')
  
      if (guids.length === 0) return
  
      const guidList = guids.map((g) => g.hos_guid)
  
      // Step 2: Remove charges (only unfinanced)
      for (const guid of guidList) {
        if (vn) {
          await this.chargeService.removeServiceOPDGuid(vn, guid, trx)
        } else if (an) {
          await this.chargeService.removeServiceIPDGuid(an, guid, trx)
        }
      }
    }
  
    // ── Validation, upsert helpers (abbreviated) ─────────
  
    private async validate(
      params: LabOrderSaveParams,
      trx: TransactionClientContract
    ) {
      if (!params.vn && !params.an) {
        throw new Error('Save lab error invalid vn/an')
      }
      if (params.vn) {
        const ovst = await trx.from('ovst')
          .where('vn', params.vn).first()
        if (!ovst) throw new Error('Invalid VN')
      }
      if (params.an) {
        const ipt = await trx.from('ipt')
          .where('an', params.an).first()
        if (!ipt) throw new Error('Invalid AN')
      }
    }
  
    private async upsertLabHead(
      data: Record<string, any>,
      trx: TransactionClientContract
    ) {
      // Upsert into lab_head
      const existing = await trx.from('lab_head')
        .where('lab_order_number', data.labOrderNumber)
        .first()
  
      const record = {
        lab_order_number: data.labOrderNumber,
        lab_app_order_number: data.labAppOrderNumber || null,
        hn: data.hn,
        vn: data.vn || null,
        an: data.an || null,
        form_name: data.formName,
        department: data.department,
        doctor_code: data.doctorCode,
        order_date: data.orderDate,
        confirm_charge_money: data.confirmChargeMoney,
        finance_lab_confirm: data.financeLabConfirm,
        lab_perform_status_id: 1,
        confirm_report: 'N',
      }
  
      if (!existing) {
        await trx.table('lab_head').insert(record)
      } else {
        await trx.from('lab_head')
          .where('lab_order_number', data.labOrderNumber)
          .update(record)
      }
    }
  
    private async insertLabOrder(
      labOrderNumber: number,
      item: LabItemParam,
      trx: TransactionClientContract
    ) {
      await trx.table('lab_order').insert({
        lab_order_number: labOrderNumber,
        lab_items_code: item.labItemsCode,
        confirm: 'N',
        order_type: 'A',
      })
    }
  
    private async cleanExistingOrders(
      labOrderNumber: number,
      trx: TransactionClientContract
    ) {
      await trx.from('lab_order')
        .where('lab_order_number', labOrderNumber)
        .whereNot('confirm', 'Y')
        .where((q) => {
          q.whereNull('order_type')
            .orWhere('order_type', 'A')
            .orWhere('order_type', '')
        })
        .delete()
    }
  }