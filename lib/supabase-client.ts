// Client-side Supabase helper (stub for now)
// TODO: Install @supabase/auth-helpers-nextjs and configure with real keys

import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient

  // TODO: Replace with actual environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

  supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

// Alias for convenience
export function createClient() {
  return getSupabaseClient()
}

// Another alias
export function createSupabaseBrowser() {
  return getSupabaseClient()
}
