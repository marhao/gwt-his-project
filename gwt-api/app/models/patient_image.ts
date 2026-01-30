import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class PatientImage extends BaseModel {
  static table = 'patient_image'

  // Use hn as primary key since we mainly work with profile image
  static primaryKey = 'hn'

  @column({ columnName: 'hn', isPrimary: true })
  declare hn: string

  @column({ columnName: 'image_name' })
  declare imageName: string

  @column({ columnName: 'image' })
  declare image: Buffer | null

  @column({ columnName: 'width' })
  declare width: number | null

  @column({ columnName: 'height' })
  declare height: number | null

  @column.dateTime({ columnName: 'capture_date' })
  declare captureDate: DateTime | null

  @column({ columnName: 'hos_guid' })
  declare hosGuid: string | null

  @column({ columnName: 'hos_guid_ext' })
  declare hosGuidExt: string | null
}
