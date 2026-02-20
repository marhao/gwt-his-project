// ── OPD Charge Parameters ─────────────────────────────
export interface OPDChargeParams {
    opiGuid: string
    vn: string
    hn: string
    icode: string
    qty: number
    price: number          // ราคาจริง (บาท) ไม่ใช่ ×10000
    doctorCode: string
    itemType: string       // 'N' = nondrug
    depCode?: string
  }
  
  // ── IPD Charge Parameters ─────────────────────────────
  export interface IPDChargeParams {
    opiGuid: string
    an: string
    hn: string
    icode: string
    qty: number
    price: number
    doctorCode: string
    itemType: string
    rxDate: Date           // ⭐ IPD ต้องส่ง rxDate
    orderNo?: number       // ถ้าไม่ส่ง จะสร้างใหม่
    depCode?: string
  }
  
  // ── Opitemrece Record ─────────────────────────────────
  export interface OpitemreceRecord {
    hos_guid: string
    vn?: string
    an?: string
    hn: string
    icode: string
    qty: number
    unitprice: number
    discount: number
    sum_price: number
    income: string
    paidst: string
    pttype: string
    doctor: string
    staff: string
    dep_code: string
    vstdate: Date
    vsttime: string
    rxdate: Date
    rxtime: string
    item_type: string
    sub_type: string
    last_modified: Date
    order_no?: number      // IPD only
    item_no?: number       // IPD only
    iperdose?: number      // IPD only
    iperday?: number       // IPD only
    drugusage?: string     // IPD only
    sp_use?: string        // IPD only
  }
  
  // ── Lab Order Save Parameters ─────────────────────────
  export interface LabOrderSaveParams {
    labOrderNumber?: number      // null = new order
    labAppOrderNumber?: number   // ถ้ามาจาก advance order
    vn?: string
    an?: string
    hn: string
    formName: string
    doctorCode: string
    orderDate: Date
    orderTime: string
    labItems: LabItemParam[]
  }
  
  export interface LabItemParam {
    labItemsCode: number
    labCode: string
    specimenCode: string
    icode: string
    price: number
    labOrderType: 'ITEM' | 'PROFILE'
  }
  
  // ── Price Calculation Result ──────────────────────────
  export interface PriceResult {
    unitprice: number
    income: string
    paidst: string
    pttype: string
    discount: number
    sumPrice: number
    pttypeItemsPriceId?: number
  }
  
  // ── Service Item Info (from cache) ────────────────────
  export interface ServiceItemInfo {
    icode: string
    chargeServiceOpd: string
    chargeServiceIpd: string
    multiplyChargeService: number
    income: string
    paidst: string
  }