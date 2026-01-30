/*
|--------------------------------------------------------------------------
| Settings Routes
|--------------------------------------------------------------------------
|
| Routes for settings management (menus, roles, permissions, etc.)
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SettingsController = () => import('#controllers/settings_controller')

export default function settingsRoutes() {
  // Settings Routes - Menu Management
  router
    .group(() => {
      // =========================================
      // Static Routes First
      // =========================================

      // Get all menu items
      router.get('/', [SettingsController, 'index'])

      // Get active menu items
      router.get('/active', [SettingsController, 'active'])

      // Get menu tree (active only)
      router.get('/tree', [SettingsController, 'tree'])

      // Get full menu tree (including inactive)
      router.get('/tree/full', [SettingsController, 'fullTree'])

      // =========================================
      // Current User Menu Access (BEFORE /:id)
      // =========================================

      // Get my menu access
      router.get('/my/access', [SettingsController, 'myAccess'])

      // Get my menu tree
      router.get('/my/tree', [SettingsController, 'myTree'])

      // Check my menu access
      router.get('/my/check/:menuCode', [SettingsController, 'myCheck'])

      // =========================================
      // User Menu Access (BEFORE /:id)
      // =========================================

      // Get user menu access
      router.get('/user/:id/access', [SettingsController, 'userAccess'])

      // Get user menu tree
      router.get('/user/:id/tree', [SettingsController, 'userTree'])

      // Check user menu access
      router.get('/user/:id/check/:menuCode', [SettingsController, 'userCheck'])

      // =========================================
      // Other Static Routes
      // =========================================

      // Get menu item by code
      router.get('/code/:code', [SettingsController, 'showByCode'])

      // Get menu items by parent ID
      router.get('/parent/:parentId', [SettingsController, 'byParent'])

      // Create menu item
      router.post('/', [SettingsController, 'store'])

      // Reorder menu items
      router.post('/reorder', [SettingsController, 'reorder'])

      // =========================================
      // Dynamic Routes Last (/:id)
      // =========================================

      // Get menu item by ID
      router.get('/:id', [SettingsController, 'show'])

      // Update menu item
      router.put('/:id', [SettingsController, 'update'])

      // Move menu item to new parent
      router.put('/:id/move', [SettingsController, 'move'])

      // Delete menu item
      router.delete('/:id', [SettingsController, 'destroy'])
    })
    .prefix('/api/v1/settings/menus')
    .use(middleware.auth())
}
