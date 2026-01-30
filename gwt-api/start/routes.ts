/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
| Route modules are organized in start/routes/ folder.
|
*/

import router from '@adonisjs/core/services/router'

// Import route modules
import {
  authRoutes,
  swaggerRoutes,
  userRoutes,
  patientRoutes,
  opdRoutes,
  reportRoutes,
  settingsRoutes,
  groupsRoutes,
  rolesRoutes,
  lookupRoutes,
} from './routes/index.js'
import nhsoRoutes from './routes/nhso.js'

// ============================================
// Root Route
// ============================================
router.get('/', async () => {
  return {
    name: 'GWT HIS API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  }
})

// ============================================
// Health Check Route
// ============================================
router.get('/health', async () => {
  return {
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }
})

// ============================================
// Register Route Modules
// ============================================
swaggerRoutes()   // /docs, /swagger, /swagger.json
authRoutes()      // /api/v1/auth/*
userRoutes()      // /api/v1/settings/users/*
patientRoutes()   // /api/v1/patients/*
opdRoutes()       // /api/v1/opd/*
reportRoutes()    // /api/v1/reports/*
settingsRoutes()  // /api/v1/settings/menus/*
groupsRoutes()    // /api/v1/settings/groups/*
rolesRoutes()     // /api/v1/settings/roles/*
lookupRoutes()    // /api/v1/lookups/*
nhsoRoutes()      // /api/v1/nhso/*

