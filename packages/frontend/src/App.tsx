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
import ProfilePage from './pages/profile'
import SettingsPage from './pages/settings'
import { startTransition, StrictMode, Suspense } from 'react'

const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<div>Home</div>} />
    <Route path="/quests" element={<div>Quests</div>} />
    <Route path="/achievements" element={<div>Achievements</div>} />
    <Route path="/combat" element={<div>Combat</div>} />
    <Route path="/inventory" element={<div>Inventory</div>} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/settings" element={<SettingsPage />} />
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
      <ThemeProvider defaultTheme="dark" storageKey="level-up-theme">
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </StrictMode>
  )
}

export default App
