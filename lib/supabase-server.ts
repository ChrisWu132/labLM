// Server-side Supabase helper (stub for now)
// TODO: Install @supabase/auth-helpers-nextjs and configure with real keys

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function getSupabaseServer() {
  const cookieStore = await cookies()

  // TODO: Replace with actual environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server component, ignore
        }
      },
    },
  })
}
