// start/routes/lookups.ts

/*
|--------------------------------------------------------------------------
| Lookup Routes
|--------------------------------------------------------------------------
|
| Routes for lookup/reference data (dropdowns)
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LookupsController = () => import('#controllers/lookups_controller')

export default function lookupRoutes() {
  router
    .group(() => {
      // =========================================
      // Personal Info Lookups
      // =========================================
      router.get('/pnames', [LookupsController, 'pnames'])               // คำนำหน้าชื่อ
      router.get('/occupations', [LookupsController, 'occupations'])     // อาชีพ
      router.get('/nationalities', [LookupsController, 'nationalities']) // สัญชาติ
      router.get('/religions', [LookupsController, 'religions'])         // ศาสนา
      router.get('/marry-statuses', [LookupsController, 'marryStatuses']) // สถานะสมรส
      router.get('/educations', [LookupsController, 'educations'])       // การศึกษา
      router.get('/pttypes', [LookupsController, 'pttypes'])             // สิทธิการรักษา
      router.get('/relation-types', [LookupsController, 'relationTypes']) // ความสัมพันธ์

      // =========================================
      // Thai Address Lookups
      // =========================================
      router.get('/provinces', [LookupsController, 'provinces'])         // จังหวัด
      router.get('/districts', [LookupsController, 'districts'])         // อำเภอ
      router.get('/subdistricts', [LookupsController, 'subdistricts'])   // ตำบล
      router.get('/address/search', [LookupsController, 'searchAddress']) // ค้นหาที่อยู่

      // =========================================
      // Static Lookups
      // =========================================
      router.get('/blood-groups', [LookupsController, 'bloodGroups'])     // หมู่เลือด
      router.get('/blood-group-rhs', [LookupsController, 'bloodGroupRhs']) // Rh
      router.get('/sexes', [LookupsController, 'sexes'])                  // เพศ

      // =========================================
      // OPD Visit Lookups
      // =========================================
      router.get('/ovstists', [LookupsController, 'ovstists'])           // ประเภทการมา
      router.get('/departments', [LookupsController, 'departments'])     // แผนก/ห้องตรวจ
      router.get('/doctors', [LookupsController, 'doctors'])             // แพทย์ (ใช้ร่วมกับ death)
      router.get('/spclties', [LookupsController, 'spclties'])           // ความเชี่ยวชาญ
      router.get('/clinics', [LookupsController, 'clinics'])             // ห้องตรวจ

      // =========================================
      // Death Lookups
      // =========================================
      router.get('/deaths', [LookupsController, 'deaths'])               // death_place, death_source, newborn_death_cause
      router.get('/icd10', [LookupsController, 'icd10'])                 // ค้นหา ICD-10 (autocomplete)
      router.get('/patients', [LookupsController, 'patients'])           // ค้นหาผู้ป่วย (autocomplete)

      // =========================================
      // Combined Lookups (for specific pages)
      // =========================================
      router.get('/opd-visit', [LookupsController, 'opdVisit'])                     // OPD ส่งตรวจ
      router.get('/patient-registration', [LookupsController, 'patientRegistration']) // ลงทะเบียนผู้ป่วย
    })
    .prefix('/api/v1/lookups')
    .use(middleware.auth())
}