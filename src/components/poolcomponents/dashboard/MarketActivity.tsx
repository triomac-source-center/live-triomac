
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Legend
} from 'recharts';
import { Badge } from "@/components/poolcomponents/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/poolcomponents/ui/chart";
import { Info, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import TradingChart from '@/components/tradecomponents/Chart/TradingChart';

type MarketActivityProps = {
  className?: string;
};

const data = [
  { day: 'Mon', offers: 12, requests: 24, totalVolume: 36, highPoint: false, marketEvent: false },
  { day: 'Tue', offers: 19, requests: 37, totalVolume: 56, highPoint: false, marketEvent: false },
  { day: 'Wed', offers: 30, requests: 45, totalVolume: 75, highPoint: true, marketEvent: true, event: "New Series Launch" },
  { day: 'Thu', offers: 27, requests: 52, totalVolume: 79, highPoint: false, marketEvent: false },
  { day: 'Fri', offers: 43, requests: 64, totalVolume: 107, highPoint: true, marketEvent: false },
  { day: 'Sat', offers: 35, requests: 49, totalVolume: 84, highPoint: false, marketEvent: true, event: "Weekend Sale" },
  { day: 'Sun', offers: 22, requests: 42, totalVolume: 64, highPoint: false, marketEvent: false },
];

const keyMetrics = [
  { label: "Peak Volume", value: "107", change: "+35%", trend: "up" },
  { label: "Avg. Daily Requests", value: "44.7", change: "+12%", trend: "up" },
  { label: "Avg. Daily Offers", value: "26.8", change: "-3%", trend: "down" },
  { label: "Request/Offer Ratio", value: "1.67", change: "+15%", trend: "up" },
];

export default function MarketActivity({ className }: MarketActivityProps) {
  const chartConfig = {
    offers: {
      label: "Offers",
      theme: {
        light: "#06b6d4",
        dark: "#06b6d4"
      }
    },
    requests: {
      label: "Requests",
      theme: {
        light: "#8b5cf6",
        dark: "#8b5cf6"
      }
    },
    volume: {
      label: "Total Volume",
      theme: {
        light: "#14b8a6",
        dark: "#14b8a6"
      }
    }
  };

  return (
    <div className={`p-6 rounded-lg glass-card h-full flex flex-col ${className}`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-300">Weekly Market Activity</h3>
          <p className="text-sm text-muted-foreground">Offers vs Requests and Total Volume</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.filter(d => d.marketEvent).map((event, idx) => (
            <Badge key={idx} variant="outline" className="flex items-center gap-1 bg-secondary/30">
              <Info className="h-3 w-3" />
              <span>{event.day}: {event.event}</span>
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
        {keyMetrics.map((metric, idx) => (
          <div key={idx} className="bg-secondary/40 p-3 rounded-md">
            <div className="text-xs text-muted-foreground">{metric.label}</div>
            <div className="text-lg font-semibold text-gray-300 mt-1">{metric.value}</div>
            <div className={`text-xs flex items-center mt-1 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {metric.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      
      <TradingChart/>
      
      {/* <div className="flex-grow min-h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 15, right: 10, left: 5, bottom: 15 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" tick={{ fill: '#999' }} />
              <YAxis tick={{ fill: '#999' }} />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent
                        className="bg-background/95 border-border shadow-md"
                        payload={payload}
                      />
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" height={36}/>
              {data.filter(d => d.highPoint).map((point, idx) => (
                <ReferenceLine 
                  key={idx} 
                  x={point.day} 
                  stroke="#14b8a6" 
                  strokeDasharray="3 3" 
                  strokeWidth={1.5}
                />
              ))}
              <ReferenceLine 
                y={50} 
                label={{ value: 'Target Volume', position: 'left', fill: '#999', fontSize: 12 }} 
                stroke="#555" 
                strokeDasharray="3 3" 
              />
              <Line 
                type="monotone" 
                dataKey="offers" 
                stroke="#06b6d4" 
                strokeWidth={2}
                activeDot={{ r: 6, fill: "#06b6d4", stroke: "#111" }}
              />
              <Line 
                type="monotone" 
                dataKey="requests" 
                stroke="#8b5cf6" 
                strokeWidth={2} 
                activeDot={{ r: 6, fill: "#8b5cf6", stroke: "#111" }}
              />
              <Line 
                type="monotone" 
                dataKey="totalVolume" 
                stroke="#14b8a6" 
                strokeWidth={1.5} 
                strokeDasharray="5 5"
                activeDot={{ r: 6, fill: "#14b8a6", stroke: "#111" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div> */}
      
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center">
          <TrendingUp className="h-3 w-3 mr-1" />
          <span>Weekly trend analysis updated daily at 00:00 UTC</span>
        </div>
        <button className="text-primary hover:underline">View detailed report</button>
      </div>
    </div>
  );
}
