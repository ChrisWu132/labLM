"use client"

import type React from "react"

import { DashboardHeader } from "@/components/layout/dashboard-header"
import { FloatingCoachProvider } from "@/lib/contexts/floating-coach-context"
import { usePathname } from "next/navigation"
import { useUser } from "@/lib/hooks/use-user"

// Map paths to module numbers
const pathToModule: Record<string, number> = {
  "/dashboard/orientation": 0,
  "/dashboard/vibecoding": 1,
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const currentModule = pathToModule[pathname] ?? 0

  // Get real user data from Supabase
  const { displayName, user } = useUser()

  // Check if current page needs full screen layout (no scroll)
  const isFullScreenLayout = pathname.startsWith("/dashboard/vibecoding") || pathname === "/dashboard/orientation"

  return (
    <FloatingCoachProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Main Content - Full Width */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader
            userName={displayName}
            userAvatar={user?.user_metadata?.avatar_url}
            currentModule={currentModule}
          />

          <main className={isFullScreenLayout ? "flex-1 overflow-hidden" : "flex-1 overflow-y-auto"}>
            {isFullScreenLayout ? (
              children
            ) : (
              <div className="container mx-auto max-w-5xl px-4 py-8">{children}</div>
            )}
          </main>
        </div>
      </div>
    </FloatingCoachProvider>
  )
}
