import { Medal, Trophy, Award, Star, Zap, Target } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "Task Master",
    description: "Complete 100 tasks",
    progress: 75,
    icon: Trophy,
    unlocked: true,
  },
  {
    id: 2,
    title: "Learning Champion",
    description: "Complete 10 courses",
    progress: 40,
    icon: Medal,
    unlocked: false,
  },
  {
    id: 3,
    title: "Streak Warrior",
    description: "Maintain a 30-day streak",
    progress: 100,
    icon: Zap,
    unlocked: true,
  },
  {
    id: 4,
    title: "Rising Star",
    description: "Earn 1000 experience points",
    progress: 60,
    icon: Star,
    unlocked: false,
  },
  {
    id: 5,
    title: "Goal Crusher",
    description: "Achieve 50 personal goals",
    progress: 20,
    icon: Target,
    unlocked: false,
  },
  {
    id: 6,
    title: "Elite Performer",
    description: "Complete all tasks for 7 consecutive days",
    progress: 85,
    icon: Award,
    unlocked: false,
  },
]

export default function AchievementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">
          Track your progress and unlock achievements
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => {
          const Icon = achievement.icon
          return (
            <div
              key={achievement.id}
              className={`rounded-lg border bg-card text-card-foreground shadow-sm ${
                !achievement.unlocked && "opacity-75"
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full bg-primary/10 ${
                    achievement.unlocked ? "text-primary" : "text-muted-foreground"
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{achievement.progress}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
