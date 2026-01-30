import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Officer extends BaseModel {
  static table = 'officer'

  @column({ isPrimary: true, columnName: 'officer_id' })
  declare officerId: number

  @column({ columnName: 'officer_name' })
  declare officerName: string | null

  @column({ columnName: 'officer_group_list_text' })
  declare officerGroupListText: string | null

  @column({ columnName: 'officer_login_name' })
  declare officerLoginName: string | null

  @column({ columnName: 'emp_id' })
  declare empId: number | null

  @column({ columnName: 'officer_login_password_md5', serializeAs: null })
  declare officerLoginPasswordMd5: string | null

  @column({ columnName: 'officer_login_password', serializeAs: null })
  declare officerLoginPassword: string | null

  @column({ columnName: 'officer_pname' })
  declare officerPname: string | null

  @column({ columnName: 'officer_fname' })
  declare officerFname: string | null

  @column({ columnName: 'officer_lname' })
  declare officerLname: string | null

  @column({ columnName: 'officer_doctor_code' })
  declare officerDoctorCode: string | null

  @column({ columnName: 'officer_phone' })
  declare officerPhone: string | null

  @column({ columnName: 'officer_mobile' })
  declare officerMobile: string | null

  @column({ columnName: 'officer_email' })
  declare officerEmail: string | null

  @column({ columnName: 'auto_lockout' })
  declare autoLockout: string | null

  @column({ columnName: 'auto_lockout_minute' })
  declare autoLockoutMinute: number | null

  @column({ columnName: 'officer_line_id' })
  declare officerLineId: string | null

  @column({ columnName: 'allow_med_template_transfer' })
  declare allowMedTemplateTransfer: string | null

  @column({ columnName: 'allow_oper_template_transfer' })
  declare allowOperTemplateTransfer: string | null

  @column({ columnName: 'officer_fax' })
  declare officerFax: string | null

  @column({ columnName: 'no_show_welcome' })
  declare noShowWelcome: string | null

  @column({ columnName: 'officer_active' })
  declare officerActive: string | null

  @column.date({ columnName: 'last_change_password_date' })
  declare lastChangePasswordDate: DateTime | null

  @column({ columnName: 'officer_authentication_type_id' })
  declare officerAuthenticationTypeId: number | null

  @column({ columnName: 'send_login_notice' })
  declare sendLoginNotice: string | null

  @column({ columnName: 'line_token' })
  declare lineToken: string | null

  @column({ columnName: 'ipd_order_type' })
  declare ipdOrderType: string | null

  @column({ columnName: 'officer_cid' })
  declare officerCid: string | null

  @column({ columnName: 'send_moph_otp' })
  declare sendMophOtp: string | null

  @column({ columnName: 'officer_cid_hash256' })
  declare officerCidHash256: string | null

  /**
   * Get full name of officer
   */
  get fullName(): string {
    const parts = [this.officerPname, this.officerFname, this.officerLname].filter(Boolean)
    return parts.join(' ') || this.officerName || ''
  }

  /**
   * Check if officer is active
   */
  get isActive(): boolean {
    return this.officerActive === 'Y'
  }
}
