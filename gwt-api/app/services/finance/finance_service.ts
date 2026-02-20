import { TransactionClientContract } from "@adonisjs/lucid/types/database";

export default class FinanceService {

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RECALC OPD FINANCE SUMMARY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Equivalent: RecalcOPDFinanceSummary
  // Called after every OPD charge INSERT/UPDATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  public async recalcOPDFinanceSummary(
    vn: string,
    trx: TransactionClientContract
  ): Promise<void> {
    // HOSxP เรียก HOSxPFinancePackage.bpl dynamically
    // RecalcOPDFinanceSummary(vn) → คำนวณ finance summary ใหม่
    // TODO: Implement based on your finance module
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RECALC IPD FINANCE SUMMARY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  public async recalcIPDFinanceSummary(
    an: string,
    trx: TransactionClientContract
  ): Promise<void> {
    // TODO: Implement
  }
}