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
  // Lab sections pages need scrolling but full width
  const isLabSectionPage = pathname.includes("/sections/")
  const isLabOverviewPage = pathname.match(/\/labs\/lab\d+$/)
  const isFullScreenNoScroll = !isLabSectionPage && !isLabOverviewPage && (pathname.startsWith("/dashboard/vibecoding") || pathname === "/dashboard/orientation")

  // Determine main content className
  let mainClassName = "flex-1"
  if (isFullScreenNoScroll) {
    mainClassName += " overflow-hidden"
  } else if (isLabSectionPage || isLabOverviewPage) {
    mainClassName += " overflow-y-auto"
  } else {
    mainClassName += " overflow-y-auto"
  }

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

          <main className={mainClassName}>
            {isFullScreenNoScroll ? (
              children
            ) : isLabSectionPage || isLabOverviewPage ? (
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
