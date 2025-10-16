"use client"

import { useState, useEffect } from "react"
import { createSupabaseBrowser } from "@/lib/supabase-client"
import type { User } from "@supabase/supabase-js"

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createSupabaseBrowser()

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Get display name with fallback logic
  const displayName =
    user?.user_metadata?.full_name || (user?.email ? user.email.split("@")[0] : null) || "Learner"

  return {
    user,
    displayName,
    loading,
  }
}
