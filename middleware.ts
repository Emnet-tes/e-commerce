import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Add paths that should be protected
const protectedPaths = ['/home', '/home/products', '/home/cart', '/home/profile']
// Add paths that should be accessible without authentication
const publicPaths = ['/auth/login', '/auth/signup']

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value
    const { pathname } = request.nextUrl

    // Check if the path is protected
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

    // If the path is protected and there's no token, redirect to login
    if (isProtectedPath && !token) {
        const url = new URL('/auth/login', request.url)
        url.searchParams.set('from', pathname)
        return NextResponse.redirect(url)
    }

    // If the path is public and there's a token, redirect to home
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
} 