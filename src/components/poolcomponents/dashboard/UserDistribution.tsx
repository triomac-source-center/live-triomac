
import React from 'react';
import { Card } from "@/components/poolcomponents/ui/card";

type UserDistributionProps = {
  className?: string;
};

const data = [
  { name: 'Collectors', value: 540, color: '#3b82f6', percentage: 42.9 },
  { name: 'Traders', value: 320, color: '#8b5cf6', percentage: 25.4 },
  { name: 'Investors', value: 210, color: '#06b6d4', percentage: 16.7 },
  { name: 'Developers', value: 140, color: '#14b8a6', percentage: 11.1 },
  { name: 'Others', value: 48, color: '#6b7280', percentage: 3.9 },
];

export default function UserDistribution({ className }: UserDistributionProps) {
  return (
    <Card className={`p-6 glass-card h-96 overflow-auto ${className}`}>
      <h3 className="text-lg font-medium mb-2">User Distribution</h3>
      <p className="text-sm text-muted-foreground mb-4">Triomen ownership by user type</p>
      
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-1 h-4 rounded-lg" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className='text-xs'>{item.name}</span>
            </div> 
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-xs">{item.value} users</span>
              <span className="w-16 text-right text-sm font-medium">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-8 pt-6 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total users</span>
          <span className="font-medium text-xs">
            {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
          </span>
        </div>
      </div> */}
    </Card>
  );
}
