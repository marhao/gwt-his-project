import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PatientRelationType extends BaseModel {
  static table = 'patient_relation_type'
  static primaryKey = 'patient_relation_type_id'

  @column({ isPrimary: true, columnName: 'patient_relation_type_id' })
  declare id: number

  @column({ columnName: 'patient_relation_type_name' })
  declare name: string | null

  @column({ columnName: 'hos_guid' })
  declare hosGuid: string | null
}
