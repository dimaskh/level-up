import { Button } from "@/components/ui/button"
import { TaskCard } from "@/components/task-card"
import { Progress } from "@/components/ui/progress"
import { TaskForm } from "@/components/task-form"
import { mockTasks, mockStats } from "@/lib/mock-data"
import { Award, BookOpen, Target, Zap } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your progress overview.
          </p>
        </div>
        <TaskForm />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Tasks</h3>
          </div>
          <p className="text-2xl font-bold">{mockStats.completedTasks}/{mockStats.totalTasks}</p>
          <Progress value={(mockStats.completedTasks / mockStats.totalTasks) * 100} className="mt-2" />
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Experience</h3>
          </div>
          <p className="text-2xl font-bold">Level {mockStats.level}</p>
          <Progress value={(mockStats.experience / mockStats.nextLevelExp) * 100} className="mt-2" />
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Experience</h3>
          </div>
          <p className="text-2xl font-bold">{mockStats.experience} XP</p>
          <p className="text-sm text-muted-foreground mt-2">Next level: {mockStats.nextLevelExp} XP</p>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Streak</h3>
          </div>
          <p className="text-2xl font-bold">{mockStats.streak} days</p>
          <p className="text-sm text-muted-foreground mt-2">Keep it up!</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Tasks</h2>
          <Button variant="link" size="sm">View all</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockTasks.slice(0, 3).map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </div>
    </div>
  )
}
