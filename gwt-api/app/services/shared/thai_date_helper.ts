// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ThaiDateHelper
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// Source: HOSxP FormatThaiDate(formatStr, datetime)
//
// HOSxP VN ใช้ format: "eemmddhhnnss"
//   ee = ปี พ.ศ. 2 หลักท้าย (เช่น 68 = 2568 = 2025)
//   mm = เดือน (01-12)
//   dd = วัน (01-31)
//   hh = ชั่วโมง (00-23)
//   nn = นาที (00-59)
//   ss = วินาที (00-59)
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default class ThaiDateHelper {

    /** พ.ศ. offset */
    private static readonly BUDDHIST_YEAR_OFFSET = 543
  
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // formatThaiDate
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    //
    // Equivalent: HOSxP FormatThaiDate(format, datetime)
    //
    // รับ vstdate ("yyyy-MM-dd") + vsttime ("HH:mm:ss")
    //
    // Format tokens:
    //   "eeee" → ปี พ.ศ. 4 หลัก (2568)
    //   "ee"   → ปี พ.ศ. 2 หลักท้าย (68)
    //   "yyyy" → ปี ค.ศ. 4 หลัก (2025)
    //   "yy"   → ปี ค.ศ. 2 หลัก (25)
    //   "mm"   → เดือน (01-12)
    //   "dd"   → วัน (01-31)
    //   "hh"   → ชั่วโมง (00-23)
    //   "nn"   → นาที (00-59)
    //   "ss"   → วินาที (00-59)
    //
    // ตัวอย่าง:
    //   formatThaiDate("eemmddhhnnss", "2025-01-15", "14:30:22")
    //   → "680115143022"
    //
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
    public static formatThaiDate(
      format: string,
      vstdate: string,
      vsttime: string = '00:00:00'
    ): string {
      // Parse date parts
      const dateParts = vstdate.split('-')
      const ceYear = parseInt(dateParts[0], 10)
      const month = parseInt(dateParts[1], 10)
      const day = parseInt(dateParts[2], 10)
  
      // Parse time parts
      const timeParts = vsttime.split(':')
      const hour = parseInt(timeParts[0] || '0', 10)
      const minute = parseInt(timeParts[1] || '0', 10)
      const second = parseInt(timeParts[2] || '0', 10)
  
      // พ.ศ.
      const beYear = ceYear + this.BUDDHIST_YEAR_OFFSET
  
      // Replace tokens (longest first เพื่อไม่ให้ ee match ก่อน eeee)
      let result = format
  
      // eeee → ปี พ.ศ. 4 หลัก
      result = result.replace(/eeee/g, beYear.toString().padStart(4, '0'))
  
      // ee → ปี พ.ศ. 2 หลักท้าย
      result = result.replace(/ee/g, (beYear % 100).toString().padStart(2, '0'))
  
      // yyyy → ปี ค.ศ. 4 หลัก
      result = result.replace(/yyyy/g, ceYear.toString().padStart(4, '0'))
  
      // yy → ปี ค.ศ. 2 หลัก
      result = result.replace(/yy/g, (ceYear % 100).toString().padStart(2, '0'))
  
      // mm → เดือน
      result = result.replace(/mm/g, month.toString().padStart(2, '0'))
  
      // dd → วัน
      result = result.replace(/dd/g, day.toString().padStart(2, '0'))
  
      // hh → ชั่วโมง
      result = result.replace(/hh/g, hour.toString().padStart(2, '0'))
  
      // nn → นาที
      result = result.replace(/nn/g, minute.toString().padStart(2, '0'))
  
      // ss → วินาที
      result = result.replace(/ss/g, second.toString().padStart(2, '0'))
  
      return result
    }
  
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // toThaiDate
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    //
    // แปลง ค.ศ. → พ.ศ. format "dd/mm/eeee"
    //
    // "2025-01-15" → "15/01/2568"
    //
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
    public static toThaiDate(vstdate: string): string {
      return this.formatThaiDate('dd/mm/eeee', vstdate)
    }
  
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // toMySQLDate
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    //
    // วันนี้ → "yyyy-MM-dd"
    //
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
    public static toMySQLDate(date?: Date): string {
      const d = date || new Date()
      const y = d.getFullYear()
      const m = (d.getMonth() + 1).toString().padStart(2, '0')
      const day = d.getDate().toString().padStart(2, '0')
      return `${y}-${m}-${day}`
    }
  
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // toMySQLTime
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    //
    // เวลาปัจจุบัน → "HH:mm:ss"
    //
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
    public static toMySQLTime(date?: Date): string {
      const d = date || new Date()
      return [
        d.getHours().toString().padStart(2, '0'),
        d.getMinutes().toString().padStart(2, '0'),
        d.getSeconds().toString().padStart(2, '0'),
      ].join(':')
    }
  
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // toMySQLDatetime
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    //
    // "yyyy-MM-dd HH:mm:ss"
    //
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
    public static toMySQLDatetime(date?: Date): string {
      const d = date || new Date()
      return `${this.toMySQLDate(d)} ${this.toMySQLTime(d)}`
    }
  }