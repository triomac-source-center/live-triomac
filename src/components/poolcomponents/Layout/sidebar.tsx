
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  collapsed: boolean;
};

const SidebarItem = ({ icon: Icon, label, path, collapsed }: SidebarItemProps) => {
  return (
    <Link
      href={path}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-xs",
        path === window.location.pathname && "bg-sidebar-accent text-sidebar-accent-foreground text-xs"
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen flex flex-col bg-gray-900 transition-all duration-300 ease-in-out border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 justify-between">
        {!collapsed && (
          <Link href="/">
            <h2 className="text-xl font-bold text-sidebar-foreground">
              Triomen<span className="text-primary">60</span>
            </h2>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <div className="flex-grow p-3 space-y-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/" collapsed={collapsed} />
        <SidebarItem icon={Package} label="Triomen" path="/triomen" collapsed={collapsed} />
        <SidebarItem icon={BarChart3} label="Market" path="/market" collapsed={collapsed} />
        <SidebarItem icon={ShoppingCart} label="Offers" path="/offers" collapsed={collapsed} />
        <SidebarItem icon={Users} label="Users" path="/users" collapsed={collapsed} />
        <SidebarItem icon={DollarSign} label="Transactions" path="/transactions" collapsed={collapsed} />
      </div>

      <div className="p-3 space-y-1 border-t border-sidebar-border">
        <SidebarItem icon={Settings} label="Settings" path="/settings" collapsed={collapsed} />
        <SidebarItem icon={HelpCircle} label="Help" path="/help" collapsed={collapsed} />
      </div>
    </div>
  );
}
