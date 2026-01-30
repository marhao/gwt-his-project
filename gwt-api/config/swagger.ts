import path from 'node:path'
import url from 'node:url'

export default {
  // Path to the file containing swagger spec
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',

  // Title of your API documentation
  title: 'GWT API Documentation',

  // Version of your API
  version: '1.0.0',

  // Description of your API
  description: 'API documentation for GWT HIS System',

  // Tags to group your endpoints
  tagIndex: 2,

  // Info object
  info: {
    title: 'GWT API',
    version: '1.0.0',
    description: 'API documentation for GWT HIS System',
    contact: {
      name: 'GWT Team',
      email: 'support@gwt.co.th',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },

  // Swagger UI options
  snakeCase: true,

  // Common responses
  common: {
    parameters: {},
    headers: {},
  },

  // Security schemes
  securitySchemes: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },

  // Auth middleware (to protect swagger docs if needed)
  authMiddlewares: [],

  // Default security for all routes
  defaultSecurityScheme: 'BearerAuth',

  // Persist authorization data
  persistAuthorization: true,

  // Show common route prefix
  showFullPath: false,

  // Tag from controller name
  tagFromControllerName: true,

  // Ignore routes
  ignore: ['/'],

  // Preferred HTTP scheme
  preferredPutPatch: 'PUT',
}
