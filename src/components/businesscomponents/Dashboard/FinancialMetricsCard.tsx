
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import { TrendingUp, TrendingDown, DollarSign, CalendarClock, Timer, AlertTriangle } from "lucide-react";

interface FinancialMetricsCardProps {
  metrics: {
    grossMargin: number;
    operatingMargin: number;
    netMargin: number;
    debtToEquity: number;
    cashReserves: number;
    burnRate: number;
    runway: string;
    breakEvenPoint: string;
  };
}

const FinancialMetricsCard: React.FC<FinancialMetricsCardProps> = ({ metrics }) => {
  return (
    <Card className="glass-card hover-glow">
      <CardHeader>
        <CardTitle className="text-md font-medium">Financial Health Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <TrendingUp size={16} className="mr-2 text-success" /> Profit Margins
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">Gross</span>
                <span className="text-sm font-medium">{metrics.grossMargin}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Operating</span>
                <span className="text-sm font-medium">{metrics.operatingMargin}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Net</span>
                <span className="text-sm font-medium">{metrics.netMargin}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <DollarSign size={16} className="mr-2 text-primary" /> Financial Structure
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">Debt-to-Equity</span>
                <span className="text-sm font-medium">{metrics.debtToEquity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cash Reserves</span>
                <span className="text-sm font-medium">${metrics.cashReserves.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Timer size={16} className="mr-2 text-warning" /> Cash Utilization
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">Monthly Burn</span>
                <span className="text-sm font-medium">${metrics.burnRate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cash Runway</span>
                <span className="text-sm font-medium">{metrics.runway}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <CalendarClock size={16} className="mr-2 text-highlight" /> Forecasts
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">Break-even</span>
                <span className="text-sm font-medium">{metrics.breakEvenPoint}</span>
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex items-center text-xs text-success">
                  <TrendingUp size={12} className="mr-1" />
                  <span>On track for positive cash flow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialMetricsCard;
