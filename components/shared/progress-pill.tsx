"use client"

import { Badge } from "@/components/ui/badge"

interface ProgressPillProps {
  currentModule: number
  totalModules?: number
}

export function ProgressPill({ currentModule, totalModules = 6 }: ProgressPillProps) {
  return (
    <Badge variant="secondary" className="gap-1.5 px-3 py-1">
      <span className="text-xs font-medium">
        Module {currentModule} of {totalModules}
      </span>
    </Badge>
  )
}
