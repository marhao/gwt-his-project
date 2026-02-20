import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const code = searchParams.get('code')

  if (pathname === '/' && code) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    // searchParams (code, state, etc.) ติดไปด้วยอัตโนมัติ
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}