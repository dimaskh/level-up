import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { UserNav } from "./user-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center space-x-2">
          <div className="w-full flex items-center space-x-2 md:w-auto">
            <form className="flex-1 md:w-80">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search quests..." className="pl-8" />
              </div>
            </form>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
          </Button>
          <ThemeToggle />
          <UserNav
            user={{
              heroName: "Hero",
              level: 1,
              xpPoints: 0,
            }}
          />
        </div>
      </div>
    </header>
  );
}
