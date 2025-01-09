import { 
  Routes, 
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom'
import { Layout } from './components/layout'
import { ThemeProvider } from './components/theme-provider'
import DashboardPage from './pages/dashboard'
import TasksPage from './pages/tasks'
import LearningPage from './pages/learning'
import AchievementsPage from './pages/achievements'
import { startTransition, StrictMode, Suspense } from 'react'

const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/tasks" element={<TasksPage />} />
    <Route path="/learning" element={<LearningPage />} />
    <Route path="/achievements" element={<AchievementsPage />} />
  </Route>
);

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="level-up-theme">
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </StrictMode>
  )
}

export default App
