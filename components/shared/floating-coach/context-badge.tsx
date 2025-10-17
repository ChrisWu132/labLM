import { BookOpen } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContextBadgeProps {
  labNumber?: number
  labTitle?: string
}

export function ContextBadge({ labNumber, labTitle }: ContextBadgeProps) {
  if (!labNumber || !labTitle) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="mt-3 p-2 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-2 cursor-help">
            <BookOpen className="w-4 h-4 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-primary">Lab {labNumber}</p>
              <p className="text-xs text-muted-foreground truncate">{labTitle}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Your coach knows you're working on this lab</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
