
import { cn } from '@/lib/utils';
import React from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  className?: string;
};

export function StatCard({ title, value, icon, change, className }: StatCardProps) {
  return (
    <div className={cn("p-6 rounded-lg glass-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {change !== undefined && (
            <p className={cn(
              "text-xs mt-2 flex items-center",
              change >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
              <span className="text-muted-foreground ml-1">vs last week</span>
            </p>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
