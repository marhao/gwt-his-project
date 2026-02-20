// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Visit Routes — เพิ่มใน start/routes.ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const VisitsController = () => import('#controllers/visits_controller')

export default function visitRoutes() {
router.group(() => {

  // ────────────────────────────────────────────────
  //  Visit Registration
  // ────────────────────────────────────────────────

  // 1. Validate ก่อนสร้าง (ตรวจ hn, ซ้ำ, สถานะ)
  router.post('/visits/validate', [VisitsController, 'validate'])

  // 2. สร้าง visit ใหม่ (full flow: validate → create → doSave)
  router.post('/visits', [VisitsController, 'store'])

  // 3. ใช้ visit เดิม (same-day)
  router.put('/visits/:vn/use-existing', [VisitsController, 'useExisting'])

  // ────────────────────────────────────────────────
  //  Patient Pttypes (สิทธิ์)
  // ────────────────────────────────────────────────

  // 4. ดึงสิทธิ์ผู้ป่วย
  router.get('/patients/:hn/pttypes', [VisitsController, 'pttypes'])

}).prefix('/api/v1').use(middleware.auth())
}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// สรุป Endpoints:
//
//  POST   /api/v1/visits/validate          → ตรวจสอบก่อนสร้าง
//  POST   /api/v1/visits                   → สร้าง visit ใหม่
//  PUT    /api/v1/visits/:vn/use-existing  → ใช้ visit เดิม
//  GET    /api/v1/patients/:hn/pttypes     → ดึงสิทธิ์ผู้ป่วย
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━