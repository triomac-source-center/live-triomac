"use client"

import React, { useState } from "react";
import MainLayout from "@/components/businesscomponents/Layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/businesscomponents/ui/tabs";
import {
  BarChart,
  LineChart,
  TrendingUp,
  Users,
  ShoppingCart,
  Store,
  Target,
  Calendar,
  ChevronDown,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  PieChart,
  ArrowRightLeft,
  CircleDollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import { Button } from "@/components/businesscomponents/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/businesscomponents/ui/select";
import ChartCard from "@/components/businesscomponents/Dashboard/ChartCard";
import StatsCard from "@/components/businesscomponents/Dashboard/StatsCard";
import { PerformanceTable } from "@/components/businesscomponents/Analytics/PerformanceTable";
import { RevenueMetricsCard } from "@/components/businesscomponents/Analytics/RevenueMetricsCard";
import { CustomerMetricsCard } from "@/components/businesscomponents/Analytics/CustomerMetricsCard";
import { ProductPerformanceCard } from "@/components/businesscomponents/Analytics/ProductPerformanceCard";
import { MarketShareCard } from "@/components/businesscomponents/Analytics/MarketShareCard";

const yearData = {
  revenue: [
    { name: "Jan", value: 105000 },
    { name: "Feb", value: 108000 },
    { name: "Mar", value: 112000 },
    { name: "Apr", value: 118000 },
    { name: "May", value: 125000 },
    { name: "Jun", value: 132000 },
    { name: "Jul", value: 138000 },
    { name: "Aug", value: 145000 },
    { name: "Sep", value: 152000 },
    { name: "Oct", value: 159000 },
    { name: "Nov", value: 167000 },
    { name: "Dec", value: 178000 }
  ],
  customerAcquisition: [
    { name: "Jan", value: 850 },
    { name: "Feb", value: 920 },
    { name: "Mar", value: 980 },
    { name: "Apr", value: 1050 },
    { name: "May", value: 1120 },
    { name: "Jun", value: 1290 },
    { name: "Jul", value: 1350 },
    { name: "Aug", value: 1490 },
    { name: "Sep", value: 1640 },
    { name: "Oct", value: 1750 },
    { name: "Nov", value: 1890 },
    { name: "Dec", value: 2100 }
  ],
  storeTraffic: [
    { name: "Jan", Physical: 8500, Online: 12400 },
    { name: "Feb", Physical: 8800, Online: 13200 },
    { name: "Mar", Physical: 9200, Online: 14100 },
    { name: "Apr", Physical: 9600, Online: 15300 },
    { name: "May", Physical: 10200, Online: 16500 },
    { name: "Jun", Physical: 10800, Online: 17900 },
    { name: "Jul", Physical: 11300, Online: 18700 },
    { name: "Aug", Physical: 11700, Online: 19500 },
    { name: "Sep", Physical: 12200, Online: 21000 },
    { name: "Oct", Physical: 12800, Online: 22400 },
    { name: "Nov", Physical: 13500, Online: 24100 },
    { name: "Dec", Physical: 14600, Online: 26800 }
  ],
  productCategories: [
    { name: "Jan", Produce: 42000, Dairy: 26000, Bakery: 18000, Meat: 19000 },
    { name: "Feb", Produce: 43500, Dairy: 26800, Bakery: 18700, Meat: 19000 },
    { name: "Mar", Produce: 45200, Dairy: 27500, Bakery: 19300, Meat: 20000 },
    { name: "Apr", Produce: 47800, Dairy: 28700, Bakery: 20100, Meat: 21400 },
    { name: "May", Produce: 50100, Dairy: 30200, Bakery: 21300, Meat: 23400 },
    { name: "Jun", Produce: 52900, Dairy: 31800, Bakery: 22400, Meat: 24900 },
    { name: "Jul", Produce: 55500, Dairy: 33100, Bakery: 23300, Meat: 26100 },
    { name: "Aug", Produce: 58000, Dairy: 34700, Bakery: 24100, Meat: 28200 },
    { name: "Sep", Produce: 60800, Dairy: 36300, Bakery: 25200, Meat: 29700 },
    { name: "Oct", Produce: 63500, Dairy: 38100, Bakery: 26400, Meat: 31000 },
    { name: "Nov", Produce: 66800, Dairy: 40100, Bakery: 27600, Meat: 32500 },
    { name: "Dec", Produce: 71200, Dairy: 42600, Bakery: 29300, Meat: 34900 }
  ],
  marketShare: [
    { name: "Jan", value: 12.8 },
    { name: "Feb", value: 12.9 },
    { name: "Mar", value: 13.1 },
    { name: "Apr", value: 13.3 },
    { name: "May", value: 13.5 },
    { name: "Jun", value: 13.8 },
    { name: "Jul", value: 14.0 },
    { name: "Aug", value: 14.2 },
    { name: "Sep", value: 14.5 },
    { name: "Oct", value: 14.8 },
    { name: "Nov", value: 15.2 },
    { name: "Dec", value: 15.7 }
  ],
  profitMargins: [
    { name: "Jan", Gross: 32.5, Operating: 14.2, Net: 9.1 },
    { name: "Feb", Gross: 32.4, Operating: 14.3, Net: 9.2 },
    { name: "Mar", Gross: 32.6, Operating: 14.5, Net: 9.3 },
    { name: "Apr", Gross: 32.8, Operating: 14.6, Net: 9.4 },
    { name: "May", Gross: 33.0, Operating: 14.8, Net: 9.6 },
    { name: "Jun", Gross: 33.3, Operating: 15.0, Net: 9.8 },
    { name: "Jul", Gross: 33.5, Operating: 15.2, Net: 10.0 },
    { name: "Aug", Gross: 33.7, Operating: 15.4, Net: 10.2 },
    { name: "Sep", Gross: 33.9, Operating: 15.6, Net: 10.4 },
    { name: "Oct", Gross: 34.2, Operating: 15.8, Net: 10.6 },
    { name: "Nov", Gross: 34.5, Operating: 16.0, Net: 10.8 },
    { name: "Dec", Gross: 34.8, Operating: 16.3, Net: 11.0 }
  ]
};

const performanceData = [
  {
    period: "Q1",
    revenue: 325000,
    expenses: 257000,
    profit: 68000,
    change: "+12.3%",
    stores: 5,
    newProducts: 8
  },
  {
    period: "Q2",
    revenue: 375000,
    expenses: 293000,
    profit: 82000,
    change: "+20.6%",
    stores: 6,
    newProducts: 12
  },
  {
    period: "Q3",
    revenue: 435000,
    expenses: 335000,
    profit: 100000,
    change: "+22.0%",
    stores: 7,
    newProducts: 15
  },
  {
    period: "Q4",
    revenue: 504000,
    expenses: 381000,
    profit: 123000,
    change: "+23.0%",
    stores: 7,
    newProducts: 7
  }
];

const customerMetrics = {
  totalCustomers: 2100,
  customerGrowth: 147,
  customerGrowthPercent: 7.5,
  customerRetention: 84.3,
  acquisitionCost: 28.5,
  lifetimeValue: 940,
  frequentShoppers: 1470,
  frequentShopperPercent: 70,
  averagePurchaseValue: 43.5,
  averageItemsPerPurchase: 9.2,
  loyaltyProgramMembers: 1350,
  loyaltyProgramPercent: 64.3
};

const productPerformance = [
  { category: "Organic Produce", revenue: 368500, growth: 24.5, profit: 138000 },
  { category: "Fresh Dairy", revenue: 173000, growth: 18.2, profit: 62000 },
  { category: "Artisan Bakery", revenue: 118000, growth: 16.8, profit: 42000 },
  { category: "Premium Meats", revenue: 142000, growth: 18.9, profit: 51000 },
  { category: "Specialty Items", revenue: 96000, growth: 32.4, profit: 41000 },
  { category: "Prepared Foods", revenue: 84000, growth: 28.5, profit: 36000 }
];

const revenueMetricsData = {
  totalRevenue: 1639000,
  revenueGrowth: 23.8,
  averageOrderValue: 43.50,
  orderValueGrowth: 6.2,
  physicalStoreRevenue: 985000,
  physicalPercentage: 60.1,
  onlineRevenue: 654000,
  onlinePercentage: 39.9,
  onlineGrowth: 42.3,
  highestDay: { date: "December 23", revenue: 21500 },
  topStore: { location: "Downtown Market", revenue: 305000 }
};

const marketShareData = {
  currentShare: 15.7,
  growthPoints: 2.9,
  competitors: [
    { name: "GreenBasket Foods", share: 16.8, change: -0.4 },
    { name: "FreshPick Market", share: 15.9, change: -0.4 },
    { name: "Organic Haven", share: 11.3, change: -0.5 },
    { name: "Our Company", share: 15.7, change: 2.9 },
    { name: "Others", share: 40.3, change: -1.6 }
  ],
  regions: [
    { name: "Urban Centers", share: 18.2, growth: 3.5 },
    { name: "Suburban Areas", share: 15.4, growth: 2.8 },
    { name: "Rural Markets", share: 12.1, growth: 1.8 }
  ]
};

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("yearly");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-200">Analytics Dashboard</h1>
            <p className="text-muted-foreground text-xs font-normal">Detailed performance metrics and business evolution</p>
          </div>
          <div className="flex items-center gap-2 bg-grayview text-white">
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="market">Market Share</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Annual Revenue"
                value={`$${yearData.revenue.reduce((sum, item) => sum + item.value, 0).toLocaleString()}`}
                icon={<CircleDollarSign size={20} />}
                change={{ value: "+23.8%", positive: true }}
              />
              <StatsCard
                title="Customer Base"
                value={customerMetrics.totalCustomers.toLocaleString()}
                icon={<Users size={20} />}
                change={{ value: `+${customerMetrics.customerGrowthPercent}%`, positive: true }}
              />
              <StatsCard
                title="Market Share"
                value={`${yearData.marketShare[yearData.marketShare.length - 1].value}%`}
                icon={<PieChart size={20} />}
                change={{ value: "+2.9pts", positive: true }}
              />
              <StatsCard
                title="Store Locations"
                value="7"
                icon={<Store size={20} />}
                change={{ value: "+2", positive: true }}
              />
            </div>

            <div className="glass-card hover-glow p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-300">Business Evolution</h2>
                <Button variant="outline" size="sm" className="text-gray-300">
                  <Calendar size={16} className="mr-2 text-gray-300" /> 2023
                </Button>
              </div>
              <ChartCard
                title=""
                data={yearData.revenue}
                type="bar"
                dataKey="value"
                color="hsl(var(--highlight))"
                height={300}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <Card className="bg-secondary/30 border-gray-900">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Overall Growth</p>
                        <p className="text-2xl font-bold">+23.8%</p>
                      </div>
                      <div className="p-2 bg-success/20 rounded-full">
                        <TrendingUp size={24} className="text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/30 border-gray-900">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Profit Margin</p>
                        <p className="text-2xl font-bold">11.0%</p>
                      </div>
                      <div className="p-2 bg-primary/20 rounded-full">
                        <ArrowUpRight size={24} className="text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/30 border-gray-900">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Customer Retention</p>
                        <p className="text-2xl font-bold">84.3%</p>
                      </div>
                      <div className="p-2 bg-highlight/20 rounded-full">
                        <ArrowRightLeft size={24} className="text-highlight" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <PerformanceTable data={performanceData} />
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Revenue"
                value={`$${revenueMetricsData.totalRevenue.toLocaleString()}`}
                icon={<CircleDollarSign size={20} />}
                change={{ value: `+${revenueMetricsData.revenueGrowth}%`, positive: true }}
              />
              <StatsCard
                title="In-Store Revenue"
                value={`$${revenueMetricsData.physicalStoreRevenue.toLocaleString()}`}
                icon={<Store size={20} />}
                change={{ value: `${revenueMetricsData.physicalPercentage}% of total`, positive: null }}
              />
              <StatsCard
                title="Online Revenue"
                value={`$${revenueMetricsData.onlineRevenue.toLocaleString()}`}
                icon={<ShoppingCart size={20} />}
                change={{ value: `+${revenueMetricsData.onlineGrowth}%`, positive: true }}
              />
              <StatsCard
                title="Avg. Order Value"
                value={`$${revenueMetricsData.averageOrderValue}`}
                icon={<CreditCard size={20} />}
                change={{ value: `+${revenueMetricsData.orderValueGrowth}%`, positive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Revenue Breakdown by Month"
                data={yearData.revenue}
                dataKey="value"
                color="hsl(var(--highlight))"
                type="bar"
                height={300}
              />
              <ChartCard
                title="Profit Margin Trends"
                data={yearData.profitMargins}
                type="line"
                dataKey="Net"
                height={300}
              />
            </div>

            <RevenueMetricsCard data={revenueMetricsData} />
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Customers"
                value={customerMetrics.totalCustomers.toLocaleString()}
                icon={<Users size={20} />}
                change={{ value: `+${customerMetrics.customerGrowthPercent}%`, positive: true }}
              />
              <StatsCard
                title="Customer Retention"
                value={`${customerMetrics.customerRetention}%`}
                icon={<Target size={20} />}
                change={{ value: "+1.8pts", positive: true }}
              />
              <StatsCard
                title="Acquisition Cost"
                value={`$${customerMetrics.acquisitionCost}`}
                icon={<CreditCard size={20} />}
                change={{ value: "-3.2%", positive: true }}
              />
              <StatsCard
                title="Lifetime Value"
                value={`$${customerMetrics.lifetimeValue}`}
                icon={<TrendingUp size={20} />}
                change={{ value: "+5.6%", positive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="New Customer Acquisition"
                data={yearData.customerAcquisition}
                type="area"
                dataKey="value"
                color="hsl(var(--primary))"
                height={300}
              />
              <ChartCard
                title="Store Traffic"
                data={yearData.storeTraffic}
                type="line"
                dataKey="Physical"
                height={300}
              />
            </div>

            <CustomerMetricsCard data={customerMetrics} />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              <StatsCard
                title="Product Categories"
                value="42"
                icon={<ShoppingCart size={20} />}
                change={{ value: "+6", positive: true }}
              />
              <StatsCard
                title="Bestselling Category"
                value="Organic Produce"
                icon={<Target size={20} />}
                change={{ value: `$${productPerformance[0].revenue.toLocaleString()}`, positive: null }}
              />
              <StatsCard
                title="Highest Growth"
                value="Specialty Items"
                icon={<TrendingUp size={20} />}
                change={{ value: `+${productPerformance[4].growth}%`, positive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Revenue by Product Category"
                data={yearData.productCategories}
                type="bar"
                dataKey="Produce"
                height={300}
              />
              <ProductPerformanceCard data={productPerformance} />
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Market Share"
                value={`${marketShareData.currentShare}%`}
                icon={<PieChart size={20} />}
                change={{ value: `+${marketShareData.growthPoints}pts`, positive: true }}
              />
              <StatsCard
                title="Market Position"
                value="2nd"
                icon={<Target size={20} />}
                change={{ value: "Up 1 position", positive: true }}
              />
              <StatsCard
                title="Growth Rate"
                value="23.8%"
                icon={<TrendingUp size={20} />}
                change={{ value: "vs 4.2% industry avg", positive: true }}
              />
              <StatsCard
                title="Market Reach"
                value="18 cities"
                icon={<Store size={20} />}
                change={{ value: "+4 new markets", positive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Market Share Evolution"
                data={yearData.marketShare}
                type="area"
                dataKey="value"
                color="hsl(var(--highlight))"
                height={300}
              />
              <MarketShareCard data={marketShareData} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Analytics;
