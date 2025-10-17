/**
 * Server-side Supabase Client Helper
 *
 * Creates authenticated Supabase clients for use in:
 * - Server Components
 * - Server Actions
 * - Route Handlers
 */

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Get Supabase server client with user authentication
 *
 * Use this in Server Components and Server Actions where you need
 * to perform operations on behalf of the authenticated user.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Server component - cookies are read-only
        }
      },
    },
  })
}

/**
 * Legacy export for backwards compatibility
 */
export const getSupabaseServer = createServerSupabaseClient
