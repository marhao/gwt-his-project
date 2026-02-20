import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Serial extends BaseModel {
    static table = 'serial'
    static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare name: string

    @column({ columnName: 'serial_no' })
    declare serialNo: number | null

    @column({ columnName: 'node_id' })
    declare nodeId: string | null

    @column({ columnName: 'hos_guid' })
    declare hosGuid: string | null

    @column({ columnName: 'hos_guid_ext' })
    declare hosGuidExt: string | null
}