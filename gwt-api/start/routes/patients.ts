/*
|--------------------------------------------------------------------------
| Patient Routes
|--------------------------------------------------------------------------
|
| Routes for patient management (search, view, update)
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const PatientsController = () => import('#controllers/patients_controller')
const PatientImagesController = () => import('#controllers/patient_images_controller')

export default function patientRoutes() {
  router
    .group(() => {
      // Patient list and search
      router.get('/', [PatientsController, 'index'])
      router.get('/search', [PatientsController, 'search'])
      router.get('/stats', [PatientsController, 'stats'])

      // Patient images
      router.get('/:hn/image', [PatientImagesController, 'getImage'])
      router.get('/:hn/image/raw', [PatientImagesController, 'getImageRaw'])
      router.post('/:hn/image', [PatientImagesController, 'uploadImage'])
      router.delete('/:hn/image', [PatientImagesController, 'deleteImage'])
      router.get('/:hn/images', [PatientImagesController, 'getAllImages'])

      // Patient details (must be after /search and /stats)
      router.get('/:hn', [PatientsController, 'show'])
      router.put('/:hn', [PatientsController, 'update'])

      router.post('/', [PatientsController, 'create'])

      // Patient visits
      router.get('/:hn/visits', [PatientsController, 'visits'])
    })
    .prefix('/api/v1/patients')
    .use(middleware.auth())
}
