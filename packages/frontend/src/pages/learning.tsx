import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Book, BookOpen, GraduationCap } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "Learn the basics of React and component-based architecture",
    progress: 80,
    totalLessons: 12,
    completedLessons: 10,
    category: "Frontend Development",
  },
  {
    id: 2,
    title: "TypeScript Mastery",
    description: "Master TypeScript and type-safe programming",
    progress: 45,
    totalLessons: 15,
    completedLessons: 7,
    category: "Programming Languages",
  },
  {
    id: 3,
    title: "Node.js Backend",
    description: "Build scalable backend services with Node.js",
    progress: 20,
    totalLessons: 10,
    completedLessons: 2,
    category: "Backend Development",
  },
]

export default function LearningPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning</h1>
          <p className="text-muted-foreground">
            Track your learning progress and achievements
          </p>
        </div>
        <Button>
          <Book className="mr-2 h-4 w-4" />
          Browse Courses
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                </div>
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{course.completedLessons} / {course.totalLessons} lessons</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {course.category}
                </span>
                <Button variant="ghost" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continue
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
