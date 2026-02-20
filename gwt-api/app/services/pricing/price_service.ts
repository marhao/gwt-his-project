
import { PriceResult } from '#services/charge/types'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class PriceService {

  // ── Get OPD Pttype ───────────────────────────────────
  public async getOPDPttype(
    vn: string,
    trx: TransactionClientContract
  ): Promise<string | null> {
    const row = await trx.from('visit_pttype')
      .where('vn', vn)
      .orderBy('pttype_number', 'asc')
      .select('pttype')
      .first()
    return row?.pttype || null
  }

  // ── Get IPD Pttype ───────────────────────────────────
  public async getIPDPttype(
    an: string,
    trx: TransactionClientContract
  ): Promise<string | null> {
    // Try pttype_number = 1 first
    let row = await trx.from('ipt_pttype')
      .where('an', an)
      .where('pttype_number', 1)
      .select('pttype')
      .first()

    if (!row) {
      row = await trx.from('ipt_pttype')
        .where('an', an)
        .select('pttype')
        .first()
    }
    return row?.pttype || null
  }

  // ── Calculate OPD Price ──────────────────────────────
  public async calculateOPDPrice(
    params: {
      vn: string
      icode: string
      pttype: string
      inputPrice: number
    },
    trx: TransactionClientContract
  ): Promise<PriceResult> {
    return this.calculatePrice({
      ...params,
      mode: 'OPD',
      visitKey: params.vn,
    }, trx)
  }

  // ── Calculate IPD Price ──────────────────────────────
  public async calculateIPDPrice(
    params: {
      an: string
      icode: string
      pttype: string
      inputPrice: number
    },
    trx: TransactionClientContract
  ): Promise<PriceResult> {
    return this.calculatePrice({
      ...params,
      mode: 'IPD',
      visitKey: params.an,
    }, trx)
  }

  // ── Core Price Calculation ───────────────────────────
  private async calculatePrice(
    params: {
      visitKey: string
      icode: string
      pttype: string
      inputPrice: number
      mode: 'OPD' | 'IPD'
    },
    trx: TransactionClientContract
  ): Promise<PriceResult> {

    // Step 1: Get pttype_price_policy_type_id
    const pttypeInfo = await trx.from('pttype')
      .where('pttype', params.pttype)
      .select(
        'pttype_price_policy_type_id',
        'discount as discount_pct',
        'paidst',
        'round_money',
        'debtor'
      )
      .first()

    // Step 2: Try policy-based price
    let unitprice = params.inputPrice
    if (unitprice <= 0) {
      const policyPrice = await this.getPttypeItemsPrice(
        params.pttype, params.icode, trx
      )
      if (policyPrice > 0) {
        unitprice = policyPrice
      } else {
        // Fallback to nondrugitems.price
        const ndrug = await trx.from('nondrugitems')
          .where('icode', params.icode)
          .select('price')
          .first()
        unitprice = ndrug?.price || 0
      }
    }

    // Step 3: Get income from s_drugitems
    const serviceItem = await trx.from('s_drugitems')
      .where('icode', params.icode)
      .select('income', 'paidst')
      .first()
    let income = serviceItem?.income || ''
    let paidst = serviceItem?.paidst || pttypeInfo?.paidst || ''

    // Step 4: Calculate discount
    const discountPct = await this.getDiscountPercent(
      params.pttype, params.icode, income, trx
    )
    const discount = unitprice * (discountPct / 100)
    const sumPrice = unitprice - discount

    return {
      unitprice,
      income,
      paidst,
      pttype: params.pttype,
      discount,
      sumPrice,
    }
  }

  // ── Get PttypeItemsPrice ─────────────────────────────
  public async getPttypeItemsPrice(
    pttype: string,
    icode: string,
    trx: TransactionClientContract
  ): Promise<number> {
    // TODO: Implement full GetPttypeItemsPrice logic
    // ดึงจาก pttype_items_price ตาม policy
    return 0
  }

  // ── Get PttypeItemsPriceId ───────────────────────────
  public async getPttypeItemsPriceId(
    pttype: string,
    icode: string,
    trx: TransactionClientContract
  ): Promise<number | null> {
    // TODO: Implement
    return null
  }

  // ── Get Discount Percent ─────────────────────────────
  private async getDiscountPercent(
    pttype: string,
    icode: string,
    income: string,
    trx: TransactionClientContract
  ): Promise<number> {
    if (!income) return 0

    const row = await trx.from('income_discount')
      .where('pttype', pttype)
      .where('income', income)
      .select('discount')
      .first()

    return row?.discount || 0
  }
}