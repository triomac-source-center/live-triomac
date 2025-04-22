
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/businesscomponents/ui/button";
import { 
  BarChart3, 
  Building, 
  ChevronLeft, 
  ChevronRight, 
  Coins, 
  Home, 
  PieChart, 
  Settings, 
  Users 
} from "lucide-react";
import  Link from "next/link";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  href,
  isCollapsed,
  isActive = false,
}) => {
  return (
    <Link href={href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 mb-1 text-gray-300",
          isCollapsed ? "px-2" : "px-4",
          isActive && "bg-accent text-gray-300"
        )}
      >
        <Icon size={20} />
        {!isCollapsed && <span>{label}</span>}
      </Button>
      
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/business" },
    { icon: Building, label: "Company", href: "/business/company" },
    { icon: Coins, label: "Finances", href: "/business/finances" },
    { icon: BarChart3, label: "Investments", href: "/business/investments" },
    { icon: Users, label: "Shareholders", href: "/business/shareholders" },
    { icon: PieChart, label: "Analytics", href: "/business/analytics" },
    { icon: Settings, label: "Settings", href: "/business/settings" }
  ];

  return (
    <aside
      className={cn(
        "bg-gray-900 h-screen sticky top-0 border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-sidebar-foreground">Triomac60</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-gray-500"
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        <div className="flex-1 p-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isCollapsed={isCollapsed}
              isActive={window.location.pathname === item.href}
            />
          ))}
        </div>

        <div className="p-4 border-t border-sidebar-border mt-auto">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
                U
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">User</p>
                <p className="text-xs text-sidebar-foreground/60">Free Plan</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
