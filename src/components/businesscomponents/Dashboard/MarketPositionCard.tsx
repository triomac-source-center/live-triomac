
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

interface MarketPositionCardProps {
  marketData: {
    marketShare: number;
    competitors: {
      name: string;
      marketShare: number;
    }[];
    growthRate: number;
    industryGrowthRate: number;
    marketCapRanking: number;
  };
}

const MarketPositionCard: React.FC<MarketPositionCardProps> = ({ marketData }) => {
  const COLORS = ['hsl(var(--highlight))', 'hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--secondary))', 'hsl(var(--muted))'];
  const pieData = [
    { name: "Your Company", value: marketData.marketShare },
    ...marketData.competitors,
  ];

  return (
    <Card className="glass-card hover-glow overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">Market Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="marketShare"
                nameKey="name"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Market Share']}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))" 
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Your Growth</span>
              <span className="font-medium text-success">{marketData.growthRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Industry Average</span>
              <span className="font-medium">{marketData.industryGrowthRate}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Market Ranking</span>
              <span className="font-medium">#{marketData.marketCapRanking}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Growth vs. Industry</span>
              <span className="font-medium text-success">+{(marketData.growthRate - marketData.industryGrowthRate).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPositionCard;
