"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Play } from "lucide-react"
import { COPY } from "@/lib/constants"

interface LabCardProps {
  labNumber: number
  title: string
  description: string
  objective: string
  completed?: boolean
  onStart?: () => void
  onMarkComplete?: () => void
}

export function LabCard({
  labNumber,
  title,
  description,
  objective,
  completed = false,
  onStart,
  onMarkComplete,
}: LabCardProps) {
  return (
    <Card className={completed ? "border-teal" : ""}>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant={completed ? "outline" : "secondary"}>Lab {labNumber}</Badge>
          {completed && <CheckCircle2 className="w-5 h-5 text-teal" />}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-sm font-medium mb-1">{COPY.lab.objectiveLabel}</p>
          <p className="text-sm text-muted-foreground">{objective}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onStart} variant="outline" className="gap-2 bg-transparent">
            <Play className="w-4 h-4" />
            {completed ? COPY.lab.reviewText : COPY.lab.startText}
          </Button>
          {!completed && (
            <Button onClick={onMarkComplete} variant="default">
              {COPY.lab.completeText}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
