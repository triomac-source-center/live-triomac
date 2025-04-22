
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface ChartCardProps {
  title: string;
  data: any[];
  type?: "line" | "area" | "bar";
  dataKey: string;
  color?: string;
  height?: number;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  data,
  type = "line",
  dataKey,
  color = "hsl(var(--highlight))",
  height = 200,
}) => {
  return (
    <Card className="bg-grayview border-gray-800 hover-glow overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === "line" ? (
              <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeOpacity={0.5} 
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeOpacity={0.5} 
                  fontSize={12} 
                  tickFormatter={(value) => `$${value}`} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))" 
                  }} 
                />
                <Legend />
                {Object.keys(data[0]).filter(key => key !== 'name').map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={index === 0 ? color : `hsl(var(--${index === 1 ? 'success' : 'primary'}))`}
                    strokeWidth={2}
                    activeDot={{ r: 6, fill: index === 0 ? color : `hsl(var(--${index === 1 ? 'success' : 'primary'}))`, strokeWidth: 0 }}
                    dot={{ r: 3, fill: index === 0 ? color : `hsl(var(--${index === 1 ? 'success' : 'primary'}))`, strokeWidth: 0 }}
                  />
                ))}
              </LineChart>
            ) : type === "area" ? (
              <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeOpacity={0.5} 
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeOpacity={0.5} 
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))" 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke={color} 
                  fill={color} 
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            ) : (
              <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeOpacity={0.5} 
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeOpacity={0.5} 
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))" 
                  }} 
                />
                <Legend />
                {Object.keys(data[0]).filter(key => key !== 'name').map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={index === 0 ? color : `hsl(var(--${index === 1 ? 'success' : 'primary'}))`}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
