import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'
import env from '#start/env'

// Extend Request type to include user
declare module '@adonisjs/core/http' {
  interface Request {
    user?: {
      id: number
      loginName: string | null
      name: string
      email: string | null
      doctorCode: string | null
      groups: string | null
      [key: string]: any
    }
  }
}

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users using JWT.
 */
export default class AuthMiddleware {
  /**
   * JWT Secret key from environment
   */
  private jwtSecret = env.get('JWT_SECRET', 'your-secret-key')

  async handle(ctx: HttpContext, next: NextFn) {
    const authHeader = ctx.request.header('Authorization')

    if (!authHeader) {
      return ctx.response.unauthorized({
        success: false,
        message: 'Authorization header is missing',
      })
    }

    // Extract token from "Bearer <token>"
    const [scheme, token] = authHeader.split(' ')

    if (scheme !== 'Bearer' || !token) {
      return ctx.response.unauthorized({
        success: false,
        message: 'Invalid authorization format. Use: Bearer <token>',
      })
    }

    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(token, this.jwtSecret) as jwt.JwtPayload

      // Attach user data to the request context
      ctx.request.user = {
        id: decoded.id,
        loginName: decoded.loginName,
        name: decoded.name,
        email: decoded.email,
        doctorCode: decoded.doctorCode,
        groups: decoded.groups,
      }

      return next()
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return ctx.response.unauthorized({
          success: false,
          message: 'Token has expired',
        })
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return ctx.response.unauthorized({
          success: false,
          message: 'Invalid token',
        })
      }

      return ctx.response.unauthorized({
        success: false,
        message: 'Authentication failed',
      })
    }
  }
}