
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import { PieChart, Target, MapPin } from "lucide-react";

interface MarketShareCardProps {
  data: {
    currentShare: number;
    growthPoints: number;
    competitors: {
      name: string;
      share: number;
      change: number;
    }[];
    regions: {
      name: string;
      share: number;
      growth: number;
    }[];
  };
}

export const MarketShareCard: React.FC<MarketShareCardProps> = ({ data }) => {
  return (
    <Card className="glass-card hover-glow">
      <CardHeader>
        <CardTitle className="text-md font-medium">Market Position Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <PieChart size={16} className="mr-2 text-highlight" /> Competitive Landscape
            </h3>
            <div className="space-y-3">
              {data.competitors.map((company) => (
                <div key={company.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{company.name}</span>
                    <span className="text-sm font-medium flex items-center">
                      {company.share}%
                      <span className={company.change > 0 ? "text-success ml-2" : "text-destructive ml-2"}>
                        {company.change > 0 ? `+${company.change}` : company.change}
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${company.name === "Our Company" ? "bg-highlight" : "bg-primary/50"}`}
                      style={{ width: `${company.share}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <MapPin size={16} className="mr-2 text-success" /> Regional Performance
            </h3>
            <div className="space-y-4">
              {data.regions.map((region) => (
                <div key={region.name} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{region.name}</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">{region.share}%</span>
                      <span className="text-xs text-success">+{region.growth}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full"
                      style={{ width: `${region.share}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              <div className="pt-3 mt-2 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Top Potential Market</span>
                  <span className="text-sm">North Metro Area</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm font-medium">Expansion Target</span>
                  <span className="text-sm">East Valley Region</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
