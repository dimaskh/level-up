import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: {
    id: string
    title: string
    description: string
    type: string
    difficulty: string
    status: string
    rewards: {
      xp: number
      gold: number
    }
    createdAt: string
    updatedAt: string
  }
}

export function TaskCard({ task }: TaskCardProps) {
  const difficultyColors = {
    novice: "bg-green-100",
    intermediate: "bg-yellow-100",
    expert: "bg-red-100"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            difficultyColors[task.difficulty as keyof typeof difficultyColors]
          )}>
            {task.difficulty}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <CardDescription>{task.description}</CardDescription>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Type: {task.type}</span>
              <span>Rewards: {task.rewards.xp} XP, {task.rewards.gold} Gold</span>
            </div>
            <Progress value={task.status === 'completed' ? 100 : 0} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
