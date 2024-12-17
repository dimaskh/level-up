export const mockTasks = [
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

export const mockCourses = [
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

export const mockAchievements = [
  {
    id: 1,
    title: "Task Master",
    description: "Complete 100 tasks",
    progress: 75,
    unlocked: true,
  },
  {
    id: 2,
    title: "Learning Champion",
    description: "Complete 10 courses",
    progress: 40,
    unlocked: false,
  },
  {
    id: 3,
    title: "Streak Warrior",
    description: "Maintain a 30-day streak",
    progress: 100,
    unlocked: true,
  },
]

export const mockStats = {
  totalTasks: 24,
  completedTasks: 18,
  streak: 7,
  experience: 1250,
  level: 5,
  nextLevelExp: 2000,
}
