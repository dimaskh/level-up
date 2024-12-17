import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { ThemeProvider } from './components/theme-provider'
import DashboardPage from './pages/dashboard'
import TasksPage from './pages/tasks'
import LearningPage from './pages/learning'
import AchievementsPage from './pages/achievements'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="level-up-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
