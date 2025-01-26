import { Bell, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-4 h-14 border-b bg-white">
      <div className="flex items-center">
        <SidebarTrigger />
        <h2 className="ml-4 text-lg font-semibold">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
