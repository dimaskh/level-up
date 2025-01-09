import { ReactNode } from 'react'
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar className="w-64 flex-shrink-0" />
        <div className="flex-1">
          <Header />
          <main className="container py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
