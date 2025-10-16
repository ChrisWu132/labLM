"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { CoachDrawer } from "@/components/shared/coach-drawer"
import { usePathname } from "next/navigation"
import { useUser } from "@/lib/hooks/use-user"

// Map paths to module numbers
const pathToModule: Record<string, number> = {
  "/dashboard/orientation": 0,
  "/dashboard/vibecoding": 1,
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [coachDrawerOpen, setCoachDrawerOpen] = useState(false)
  const pathname = usePathname()
  const currentModule = pathToModule[pathname] ?? 0

  // Get real user data from Supabase
  const { displayName, user } = useUser()

  // Check if current page is vibecoding - needs full screen layout
  const isVibecoding = pathname === "/dashboard/vibecoding"

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content - Full Width */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          userName={displayName}
          userAvatar={user?.user_metadata?.avatar_url}
          currentModule={currentModule}
          onCoachClick={() => setCoachDrawerOpen(true)}
        />

        <main className={isVibecoding ? "flex-1 overflow-hidden" : "flex-1 overflow-y-auto"}>
          {isVibecoding ? (
            children
          ) : (
            <div className="container mx-auto max-w-5xl px-4 py-8">{children}</div>
          )}
        </main>
      </div>

      <CoachDrawer open={coachDrawerOpen} onOpenChange={setCoachDrawerOpen} currentModule={currentModule} />
    </div>
  )
}
