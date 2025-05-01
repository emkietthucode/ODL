import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const path = new URL(request.url).pathname

  const protectedRoutes = ['/admin', '/tests, //missed-questions']
  const authRoutes = ['/auth/login', '/auth/signup']

  const isProtectedRoute = protectedRoutes.some((route) =>
    new RegExp(`^${route}(\\/.*)?$`).test(path)
  )
  const isAuthRoute = authRoutes.includes(path)

  if (isProtectedRoute || isAuthRoute) {
    const user = await getUser(response, request)

    if (isProtectedRoute && !user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (isAuthRoute && user) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export async function getUser(response: NextResponse, request: NextRequest) {
  const supabaseClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  const user = (await supabaseClient.auth.getUser()).data.user

  return user
}
