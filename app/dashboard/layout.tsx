"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { CoachDrawer } from "@/components/shared/coach-drawer"
import { usePathname } from "next/navigation"
import { useUser } from "@/lib/hooks/use-user"

// Map paths to module numbers
const pathToModule: Record<string, number> = {
  "/dashboard/orientation": 0,
  "/dashboard/vibecoding": 1,
}

// Lab metadata
const labMetadata: Record<number, string> = {
  1: "Lab 1: What is a Prompt",
  2: "Lab 2: How to Give Clear Instructions",
  3: "Lab 3: Role-Playing Techniques",
  4: "Lab 4: Guided Reasoning",
  5: "Lab 5: Comprehensive Application Challenge",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [coachDrawerOpen, setCoachDrawerOpen] = useState(false)
  const pathname = usePathname()
  const currentModule = pathToModule[pathname] ?? 0

  // Get real user data from Supabase
  const { displayName, user } = useUser()

  // Check if current page is vibecoding - needs full screen layout
  const isVibecoding = pathname.startsWith("/dashboard/vibecoding")

  // Extract current lab number and title from pathname
  const { currentLabNumber, currentLabTitle } = useMemo(() => {
    const labMatch = pathname.match(/\/labs\/lab(\d+)/)
    if (labMatch) {
      const labNum = parseInt(labMatch[1])
      return {
        currentLabNumber: labNum,
        currentLabTitle: labMetadata[labNum] || `Lab ${labNum}`,
      }
    }
    return { currentLabNumber: undefined, currentLabTitle: undefined }
  }, [pathname])

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

      <CoachDrawer
        open={coachDrawerOpen}
        onOpenChange={setCoachDrawerOpen}
        currentModule={currentModule}
        currentLabTitle={currentLabTitle}
        currentLabNumber={currentLabNumber}
      />
    </div>
  )
}
