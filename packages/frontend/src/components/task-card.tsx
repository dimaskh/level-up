import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  title: string
  description: string
  progress: number
  priority: "low" | "medium" | "high"
  dueDate?: string
  className?: string
}

export function TaskCard({ 
  title, 
  description, 
  progress, 
  priority,
  dueDate,
  className 
}: TaskCardProps) {
  const priorityColors = {
    low: "bg-green-500/20",
    medium: "bg-yellow-500/20",
    high: "bg-red-500/20"
  }

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            priorityColors[priority]
          )}>
            {priority}
          </span>
        </div>
        {dueDate && (
          <CardDescription>
            Due: {new Date(dueDate).toLocaleDateString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <CardDescription>{description}</CardDescription>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
