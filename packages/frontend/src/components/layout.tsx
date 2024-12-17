import { ReactNode } from 'react'
import { MainNav } from './main-nav'
import { UserNav } from './user-nav'
import { ThemeToggle } from './theme-toggle'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <MainNav />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">
        {children}
      </main>
    </div>
  )
}
