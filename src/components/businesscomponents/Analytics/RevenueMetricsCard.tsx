
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import { CircleDollarSign, TrendingUp, Store, Calendar, ShoppingCart } from "lucide-react";

interface RevenueMetricsCardProps {
  data: {
    totalRevenue: number;
    revenueGrowth: number;
    averageOrderValue: number;
    orderValueGrowth: number;
    physicalStoreRevenue: number;
    physicalPercentage: number;
    onlineRevenue: number;
    onlinePercentage: number;
    onlineGrowth: number;
    highestDay: { date: string; revenue: number };
    topStore: { location: string; revenue: number };
  };
}

export const RevenueMetricsCard: React.FC<RevenueMetricsCardProps> = ({ data }) => {
  return (
    <Card className="glass-card hover-glow">
      <CardHeader>
        <CardTitle className="text-md font-medium">Revenue Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <CircleDollarSign size={16} className="mr-2 text-highlight" /> Revenue Breakdown
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Physical Stores</span>
                  <span className="text-sm font-medium">{data.physicalPercentage}%</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-highlight rounded-full"
                    style={{ width: `${data.physicalPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Online</span>
                  <span className="text-sm font-medium">{data.onlinePercentage}%</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${data.onlinePercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex items-center mt-2 text-xs text-success">
                  <TrendingUp size={12} className="mr-1" />
                  <span>Online revenue growing at +{data.onlineGrowth}% YoY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Store size={16} className="mr-2 text-success" /> Store Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Top Location</span>
                <span className="text-sm font-medium">{data.topStore.location}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Revenue</span>
                <span className="text-sm font-medium">${data.topStore.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">% of Total</span>
                <span className="text-sm font-medium">{(data.topStore.revenue / data.totalRevenue * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Growth</span>
                <span className="text-sm font-medium text-success">+19.5%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Calendar size={16} className="mr-2 text-primary" /> Notable Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Highest Day</span>
                <span className="text-sm font-medium">{data.highestDay.date}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Peak Day Revenue</span>
                <span className="text-sm font-medium">${data.highestDay.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Avg. Order Value</span>
                <span className="text-sm font-medium">${data.averageOrderValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">AOV Change</span>
                <span className="text-sm font-medium text-success">+{data.orderValueGrowth}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
