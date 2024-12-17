import { Button } from "@/components/ui/button"
import { TaskCard } from "@/components/task-card"
import { TaskForm } from "@/components/task-form"
import { Plus } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Complete Project Proposal",
    description: "Write and submit the project proposal for the new client",
    priority: "high",
    progress: 75,
    dueDate: "2024-12-20",
  },
  {
    id: 2,
    title: "Review Code Changes",
    description: "Review and approve pending pull requests",
    priority: "medium",
    progress: 30,
    dueDate: "2024-12-18",
  },
  {
    id: 3,
    title: "Update Documentation",
    description: "Update API documentation with new endpoints",
    priority: "low",
    progress: 90,
    dueDate: "2024-12-19",
  },
]

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track your tasks
          </p>
        </div>
        <TaskForm />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  )
}
