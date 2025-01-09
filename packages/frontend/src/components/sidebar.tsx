import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  ListTodo,
  Trophy,
  Sword,
  Backpack,
  Settings,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";

const sidebarItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Quests",
    icon: ListTodo,
    href: "/quests",
  },
  {
    title: "Achievements",
    icon: Trophy,
    href: "/achievements",
  },
  {
    title: "Combat",
    icon: Sword,
    href: "/combat",
  },
  {
    title: "Inventory",
    icon: Backpack,
    href: "/inventory",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        "pb-12 min-h-screen border-r bg-background",
        className
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Level Up
            </h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Quest
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors",
                  window.location.pathname === item.href && "bg-accent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
