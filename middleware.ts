import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // If Supabase credentials are not configured, bypass middleware gracefully
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[middleware] Supabase env not set - skipping auth checks')
    }
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // Refresh session if expired - with timeout protection
  let user = null
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Auth check timeout')), 3000)
    )
    const authPromise = (supabase.auth as any).getUser()

    const { data } = await Promise.race([authPromise, timeoutPromise]) as any
    user = data?.user
  } catch (error) {
    console.error('Middleware auth check failed:', error)
    // Graceful degradation: allow request to proceed
    // This prevents cold start timeouts from breaking the entire app
  }

  // Redirect to auth if not authenticated and trying to access dashboard
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth"
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users from /auth to dashboard
  if (user && request.nextUrl.pathname === "/auth") {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard/orientation"
    return NextResponse.redirect(url)
  }

  // Redirect from /dashboard root to orientation
  if (user && request.nextUrl.pathname === "/dashboard") {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard/orientation"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Only run middleware on auth-protected routes
     * This reduces unnecessary Supabase API calls and improves performance
     */
    "/dashboard/:path*",
    "/auth",
  ],
}
