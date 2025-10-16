"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2 } from "lucide-react"

interface ChecklistItem {
  id: string
  label: string
  description?: string
  completed: boolean
}

interface ChecklistCardProps {
  title: string
  description?: string
  items: ChecklistItem[]
  onItemToggle?: (itemId: string) => void
}

export function ChecklistCard({ title, description, items, onItemToggle }: ChecklistCardProps) {
  const completedCount = items.filter((item) => item.completed).length
  const totalCount = items.length
  const allCompleted = completedCount === totalCount

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              {allCompleted && <CheckCircle2 className="w-5 h-5 text-teal" />}
            </CardTitle>
            {description && <CardDescription className="mt-1.5">{description}</CardDescription>}
          </div>
          <div className="text-sm text-muted-foreground">
            {completedCount}/{totalCount}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <Checkbox
              id={item.id}
              checked={item.completed}
              onCheckedChange={() => onItemToggle?.(item.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <label
                htmlFor={item.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {item.label}
              </label>
              {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
