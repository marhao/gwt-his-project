import { TransactionClientContract } from "@adonisjs/lucid/types/database"

export default class SerialHelper {
  /**
   * Get next serial number, ensuring uniqueness
   * Equivalent: @Hosxpdmu@GetSerialNumber + SerialKeyExists loop
   *
   * @param serialKey   - key name (e.g. 'lab_order_number')
   * @param tableName   - table to check uniqueness
   * @param columnName  - column to check
   * @param trx         - transaction
   */
  public static async getUniqueSerial(
    serialKey: string,
    tableName: string,
    columnName: string,
    trx: TransactionClientContract
  ): Promise<number> {
    let serial: number
    let exists: boolean

    do {
      serial = await this.getSerialNumber(serialKey, trx)
      const row = await trx.from(tableName)
        .where(columnName, serial)
        .select(
          trx.raw('count(*) as cc')
        )
        .first()
      exists = (row?.cc || 0) > 0
    } while (exists)

    return serial
  }

  /**
   * Get next serial number from serial_number table
   * Equivalent: @Hosxpdmu@GetSerialNumber
   */
  public static async getSerialNumber(
    key: string,
    trx: TransactionClientContract
  ): Promise<number> {
    // HOSxP uses a serial_number table
    // UPDATE serial_number SET number = number + 1 WHERE key = ?
    // SELECT number FROM serial_number WHERE key = ?
    await trx.from('serial')
      .where('name', key)
      .increment('serial_no', 1)

    const row = await trx.from('serial')
      .where('name', key)
      .select('serial_no as number_value')
      .first()

    return row?.number_value || 1
  }
}