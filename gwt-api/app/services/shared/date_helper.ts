import { TransactionClientContract } from "@adonisjs/lucid/types/database"

export default class DateHelper {

  public static async getServerDate(
    trx: TransactionClientContract
  ): Promise<Date> {
    const row = await trx.rawQuery('SELECT CURDATE() as d')
    return new Date(row[0]?.[0]?.d || new Date())
  }

  public static async getServerDateTime(
    trx: TransactionClientContract
  ): Promise<Date> {
    const row = await trx.rawQuery('SELECT NOW() as dt')
    return new Date(row[0]?.[0]?.dt || new Date())
  }

  /** Extract date part (Delphi TRUNC equivalent) */
  public static truncDate(dt: Date): Date {
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())
  }

  /** Extract time fraction (Delphi FRAC equivalent) */
  public static fracTime(dt: Date): string {
    const h = dt.getHours().toString().padStart(2, '0')
    const m = dt.getMinutes().toString().padStart(2, '0')
    const s = dt.getSeconds().toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  public static formatDate(dt: Date): string {
    return dt.toISOString().split('T')[0]
  }

  public static formatTime(dt: Date): string {
    return this.fracTime(dt)
  }
}