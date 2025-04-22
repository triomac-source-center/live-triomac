
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import { Users, Target, CreditCard, ShoppingCart, BadgePercent } from "lucide-react";

interface CustomerMetricsCardProps {
  data: {
    totalCustomers: number;
    customerGrowth: number;
    customerGrowthPercent: number;
    customerRetention: number;
    acquisitionCost: number;
    lifetimeValue: number;
    frequentShoppers: number;
    frequentShopperPercent: number;
    averagePurchaseValue: number;
    averageItemsPerPurchase: number;
    loyaltyProgramMembers: number;
    loyaltyProgramPercent: number;
  };
}

export const CustomerMetricsCard: React.FC<CustomerMetricsCardProps> = ({ data }) => {
  return (
    <Card className="glass-card hover-glow">
      <CardHeader>
        <CardTitle className="text-md font-medium">Customer Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Users size={16} className="mr-2 text-primary" /> Customer Base
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Total Customers</span>
                <span className="text-sm font-medium">{data.totalCustomers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">New Customers (YTD)</span>
                <span className="text-sm font-medium">{data.customerGrowth}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Growth Rate</span>
                <span className="text-sm font-medium text-success">+{data.customerGrowthPercent}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Retention Rate</span>
                <span className="text-sm font-medium">{data.customerRetention}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Target size={16} className="mr-2 text-success" /> Customer Value
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Acquisition Cost</span>
                <span className="text-sm font-medium">${data.acquisitionCost}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Lifetime Value</span>
                <span className="text-sm font-medium">${data.lifetimeValue}</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">LTV:CAC Ratio</span>
                <span className="text-sm font-medium">{(data.lifetimeValue / data.acquisitionCost).toFixed(1)}:1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Purchase Value</span>
                <span className="text-sm font-medium">${data.averagePurchaseValue}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <BadgePercent size={16} className="mr-2 text-highlight" /> Engagement
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Frequent Shoppers</span>
                <span className="text-sm font-medium">{data.frequentShoppers.toLocaleString()} ({data.frequentShopperPercent}%)</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Loyalty Members</span>
                <span className="text-sm font-medium">{data.loyaltyProgramMembers.toLocaleString()} ({data.loyaltyProgramPercent}%)</span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-sm">Avg Items/Purchase</span>
                <span className="text-sm font-medium">{data.averageItemsPerPurchase}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Repurchase Rate</span>
                <span className="text-sm font-medium">78.5%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
