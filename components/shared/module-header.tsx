import { Badge } from "@/components/ui/badge"
import { MODULE_STATUS_CONFIG } from "@/lib/constants"

interface ModuleHeaderProps {
  moduleNumber: number
  title: string
  description: string
  duration?: string
  status?: "not_started" | "in_progress" | "completed"
}

export function ModuleHeader({
  moduleNumber,
  title,
  description,
  duration,
  status = "in_progress",
}: ModuleHeaderProps) {
  const statusInfo = MODULE_STATUS_CONFIG[status]

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <Badge variant="secondary">Module {moduleNumber}</Badge>
        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        {duration && <span className="text-sm text-muted-foreground">{duration}</span>}
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
      <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
    </div>
  )
}
