
import React from "react";
import { Card } from "@/components/businesscomponents/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  className,
}) => {
  return (
    <Card className={cn("p-6 bg-grayview border-gray-800 hover-glow", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <div className="flex items-center text-xs">
            <span
              className={cn(
                "mr-1",
                change.positive ? "text-success" : "text-destructive"
              )}
            >
              {change.value}
            </span>
            <span className="text-muted-foreground">vs previous period</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;
