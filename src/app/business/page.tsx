"use client"

import React, { useState, useEffect } from "react";
import MainLayout from "@/components/businesscomponents/Layout/MainLayout";
import StatsCard from "@/components/businesscomponents/Dashboard/StatsCard";
import ChartCard from "@/components/businesscomponents/Dashboard/ChartCard";
import { BusinessBannerList, Business } from "@/components/businesscomponents/Dashboard/BusinessBanner";
import CompanyForm, { CompanyFormData } from "@/components/businesscomponents/Company/CompanyForm";
import BusinessNotificationBanner from "@/components/businesscomponents/Dashboard/BusinessNotificationBanner";
import { Button } from "@/components/businesscomponents/ui/button";
import { Badge } from "@/components/businesscomponents/ui/badge";
import { useToast } from "@/components/businesscomponents/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/businesscomponents/ui/tabs";
import { 
  ArrowUpRight, 
  BarChart3, 
  Building, 
  Coins, 
  DollarSign, 
  Users, 
  TrendingUp, 
  LineChart, 
  Activity, 
  CreditCard, 
  Target, 
  ShoppingCart,
  Store,
  Truck,
  Waypoints,
  Apple,
  Carrot,
  Beef
} from "lucide-react";
import ShareholderTable, { Shareholder } from "@/components/businesscomponents/Dashboard/ShareholderTable";
import FinancialMetricsCard from "@/components/businesscomponents/Dashboard/FinancialMetricsCard";
import InvestmentTable from "@/components/businesscomponents/Dashboard/InvestmentTable";
import MarketPositionCard from "@/components/businesscomponents/Dashboard/MarketPositionCard";
import { Card } from "@/components/businesscomponents/ui/card";

const sampleChartData = {
  valuation: [
    { name: "Jan", value: 1500000 },
    { name: "Feb", value: 1600000 },
    { name: "Mar", value: 1750000 },
    { name: "Apr", value: 1900000 },
    { name: "May", value: 2100000 },
    { name: "Jun", value: 2400000 },
  ],
  revenue: [
    { name: "Jan", value: 105000 },
    { name: "Feb", value: 108000 },
    { name: "Mar", value: 112000 },
    { name: "Apr", value: 118000 },
    { name: "May", value: 125000 },
    { name: "Jun", value: 132000 },
  ],
  investments: [
    { name: "Jan", value: 50000 },
    { name: "Feb", value: 50000 },
    { name: "Mar", value: 250000 },
    { name: "Apr", value: 250000 },
    { name: "May", value: 350000 },
    { name: "Jun", value: 350000 },
  ],
  apiIncome: [
    { name: "Jan", value: 12000 },
    { name: "Feb", value: 13500 },
    { name: "Mar", value: 15000 },
    { name: "Apr", value: 17500 },
    { name: "May", value: 19000 },
    { name: "Jun", value: 22000 },
  ],
  netProfit: [
    { name: "Jan", value: 28000 },
    { name: "Feb", value: 29500 },
    { name: "Mar", value: 31000 },
    { name: "Apr", value: 33500 },
    { name: "May", value: 36000 },
    { name: "Jun", value: 39000 },
  ],
  marketTrends: [
    { name: "Jan", value: 95 },
    { name: "Feb", value: 98 },
    { name: "Mar", value: 101 },
    { name: "Apr", value: 104 },
    { name: "May", value: 108 },
    { name: "Jun", value: 112 },
  ],
};

const sampleShareholders: Shareholder[] = [
  {
    id: "1",
    name: "Fresh Foods Capital",
    shares: 250000,
    percentage: 25,
    joinedDate: "2023-01-15",
    type: "institutional",
    contactInfo: {
      email: "investments@freshfoods.com",
      phone: "(555) 123-4567"
    }
  },
  {
    id: "2",
    name: "Grocery Growth Partners",
    shares: 200000,
    percentage: 20,
    joinedDate: "2023-01-02",
    type: "institutional",
    contactInfo: {
      email: "partners@grocerygrowth.com",
      phone: "(555) 987-6543"
    }
  },
  {
    id: "3",
    name: "Sarah Johnson",
    shares: 150000,
    percentage: 15,
    joinedDate: "2023-02-10",
    type: "individual",
    contactInfo: {
      email: "s.johnson@example.com",
      phone: "(555) 234-5678"
    }
  },
  {
    id: "4",
    name: "Local Produce Ventures",
    shares: 100000,
    percentage: 10,
    joinedDate: "2023-03-22",
    type: "institutional",
    contactInfo: {
      email: "contact@localproducevc.com",
      phone: "(555) 345-6789"
    }
  },
  {
    id: "5",
    name: "Michael Brown",
    shares: 50000,
    percentage: 5,
    joinedDate: "2023-04-15",
    type: "individual",
    contactInfo: {
      email: "m.brown@example.com",
      phone: "(555) 456-7890"
    }
  },
];

const sampleInvestments = [
  {
    id: "1",
    investor: "Fresh Foods Capital",
    amount: 200000,
    sharePrice: 5.25,
    sharesAcquired: 38095,
    date: "2023-01-10",
    type: "Series A",
  },
  {
    id: "2",
    investor: "Grocery Growth Partners",
    amount: 150000,
    sharePrice: 5.25,
    sharesAcquired: 28571,
    date: "2023-01-18",
    type: "Series A",
  },
  {
    id: "3",
    investor: "Sustainable Markets Fund",
    amount: 300000,
    sharePrice: 6.00,
    sharesAcquired: 50000,
    date: "2023-04-05",
    type: "Grocery Expansion",
  },
  {
    id: "4",
    investor: "Local Produce Ventures",
    amount: 180000,
    sharePrice: 6.00,
    sharesAcquired: 30000,
    date: "2023-04-22",
    type: "Supply Chain",
  },
  {
    id: "5",
    investor: "Farm-to-Table Investors",
    amount: 250000,
    sharePrice: 6.50,
    sharesAcquired: 38462,
    date: "2023-06-14",
    type: "Store Network",
  },
];

const marketPositionData = {
  marketShare: 14.5,
  competitors: [
    { name: "GreenBasket Foods", marketShare: 17.2 },
    { name: "FreshPick Market", marketShare: 16.3 },
    { name: "Organic Haven", marketShare: 11.8 },
    { name: "Others", marketShare: 40.2 },
  ],
  growthRate: 9.6,
  industryGrowthRate: 4.8,
  marketCapRanking: 3,
};

const financialMetrics = {
  grossMargin: 32.5,
  operatingMargin: 14.7,
  netMargin: 9.8,
  debtToEquity: 0.45,
  cashReserves: 680000,
  burnRate: 93000,
  runway: "7.3 months",
  breakEvenPoint: "Q1 2024",
};

const initialBusinessData: Business = {
  id: "1",
  name: "Fresh Valley Grocers",
  type: "Grocery Retail Chain",
  locations: 7,
  revenue: "$1.2M monthly",
  customers: 45000,
  employees: 120,
  status: "active",
  logoIcon: <Store size={24} />
};

const sampleFictionalBusinesses: Business[] = [
  {
    id: "sample-1",
    name: "Fresh Harvest Market",
    type: "Organic Grocery Chain",
    locations: 5,
    revenue: "$980K monthly",
    customers: 38000,
    employees: 95,
    status: "active",
    logoIcon: <Apple size={24} />
  },
  {
    id: "sample-2",
    name: "Green Valley Foods",
    type: "Farm-to-Table Grocery",
    locations: 3,
    revenue: "$620K monthly",
    customers: 25000,
    employees: 62,
    status: "active",
    logoIcon: <Carrot size={24} />
  },
  {
    id: "sample-3",
    name: "Urban Pantry Co.",
    type: "Neighborhood Grocery",
    locations: 8,
    revenue: "$1.4M monthly",
    customers: 52000,
    employees: 134,
    status: "active",
    logoIcon: <Store size={24} />
  }
];

const BusinessEntity = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [companyCreated, setCompanyCreated] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyFormData | null>(null);
  const [activeDashboardTab, setActiveDashboardTab] = useState("overview");
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showNotificationBanner, setShowNotificationBanner] = useState(false);
  const [showSampleData, setShowSampleData] = useState(true);
  
  const sampleBusinesses: Business[] = companyData 
    ? [{
        ...initialBusinessData,
        name: companyData.name || initialBusinessData.name,
        type: companyData.businessType || initialBusinessData.type,
      }]
    : [];

  useEffect(() => {
    if (companyCreated && companyData) {
      setShowNotificationBanner(true);
      setShowSampleData(false);
      
      const timer = setTimeout(() => {
        setShowNotificationBanner(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [companyCreated, companyData]);

  const handleCreateCompany = (data: CompanyFormData) => {
    setCompanyData(data);
    setCompanyCreated(true);
    setActiveTab("dashboard");
    setShowNotificationBanner(true);
    setShowSampleData(false);
    
    const newBusiness: Business = {
      id: "1",
      name: data.name,
      type: data.businessType || "Grocery Retail",
      locations: 1,
      revenue: "$0",
      customers: 0,
      employees: 0,
      status: "active",
      logoIcon: <Store size={24} />
    };

    toast({
      title: "Company Created",
      description: `${data.name} has been successfully created.`,
    });
  };

  const handleSelectBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setActiveDashboardTab("overview");
    toast({
      title: "Business Selected",
      description: `${business.name} dashboard loaded.`,
    });
  };

  const handleViewSampleDashboard = () => {
    setSelectedBusiness(sampleFictionalBusinesses[0]);
    setActiveDashboardTab("overview");
  };

  return (
    <MainLayout>
      {showNotificationBanner && companyData && (
        <BusinessNotificationBanner
          companyName={companyData.name}
          businessType={companyData.businessType || "Grocery Business"}
          onClose={() => setShowNotificationBanner(false)}
          onViewDashboard={() => setActiveTab("dashboard")}
          className="mb-6"
        />
      )}
      
      {showSampleData && !companyCreated && (
        <BusinessNotificationBanner
          companyName="Sample Grocery Business"
          businessType="Fictional Demo Data" 
          onClose={() => setShowSampleData(false)}
          onViewDashboard={handleViewSampleDashboard}
          className="mb-6"
          icon={<Apple size={20} />}
        />
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text text-gray-300">
            {companyCreated ? `${companyData?.name} Dashboard` : "Virtual Business"}
          </h1>
          <TabsList>
            <TabsTrigger value="dashboard">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-6">
          {companyCreated ? (
            <>
              <BusinessBannerList 
                businesses={sampleBusinesses.map(b => ({
                  ...b,
                  name: companyData?.name || b.name
                }))} 
                onSelectBusiness={handleSelectBusiness} 
                className="mb-6"
              />
              
              <Tabs value={activeDashboardTab} onValueChange={setActiveDashboardTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="investments">Investments</TabsTrigger>
                  <TabsTrigger value="market">Market Position</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                      title="Current Valuation"
                      value={`$${sampleChartData.valuation[sampleChartData.valuation.length - 1].value.toLocaleString()}`}
                      icon={<Building size={20} />}
                      change={{ value: "+14.3%", positive: true }}
                    />
                    <StatsCard
                      title="Monthly Revenue"
                      value={`$${sampleChartData.revenue[sampleChartData.revenue.length - 1].value.toLocaleString()}`}
                      icon={<ShoppingCart size={20} />}
                      change={{ value: "+5.6%", positive: true }}
                    />
                    <StatsCard
                      title="Store Locations"
                      value="7"
                      icon={<Store size={20} />}
                      change={{ value: "+1", positive: true }}
                    />
                    <StatsCard
                      title="Product Categories"
                      value="42"
                      icon={<Carrot size={20} />}
                      change={{ value: "+3", positive: true }}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChartCard
                      title="Monthly Revenue"
                      data={sampleChartData.revenue}
                      dataKey="value"
                      color="hsl(var(--success))"
                      height={250}
                    />
                    <ChartCard
                      title="Company Valuation"
                      data={sampleChartData.valuation}
                      dataKey="value"
                      color="hsl(var(--highlight))"
                      type="area"
                      height={250}
                    />
                  </div>

                  <ShareholderTable shareholders={sampleShareholders} />
                </TabsContent>
                
                <TabsContent value="financials" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                      title="Monthly Net Profit"
                      value={`$${sampleChartData.netProfit[sampleChartData.netProfit.length - 1].value.toLocaleString()}`}
                      icon={<TrendingUp size={20} />}
                      change={{ value: "+8.3%", positive: true }}
                    />
                    <StatsCard
                      title="Supply Chain Costs"
                      value="$42,800/mo"
                      icon={<Truck size={20} />}
                      change={{ value: "-3.2%", positive: true }}
                    />
                    <StatsCard
                      title="Cash Reserves"
                      value={`$${financialMetrics.cashReserves.toLocaleString()}`}
                      icon={<CreditCard size={20} />}
                    />
                    <StatsCard
                      title="Monthly Burn Rate"
                      value={`$${financialMetrics.burnRate.toLocaleString()}`}
                      icon={<LineChart size={20} />}
                      change={{ value: "-2.1%", positive: true }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChartCard
                      title="Net Profit Trends"
                      data={sampleChartData.netProfit}
                      dataKey="value"
                      color="hsl(var(--success))"
                      height={250}
                    />
                    <ChartCard
                      title="Online Ordering API Income"
                      data={sampleChartData.apiIncome}
                      dataKey="value"
                      color="hsl(var(--primary))"
                      type="area"
                      height={250}
                    />
                  </div>
                  
                  <FinancialMetricsCard metrics={financialMetrics} />
                </TabsContent>
                
                <TabsContent value="investments" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatsCard
                      title="Total Investment"
                      value={`$${sampleInvestments.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}`}
                      icon={<Target size={20} />}
                    />
                    <StatsCard
                      title="Latest Share Price"
                      value={`$${sampleInvestments[sampleInvestments.length - 1].sharePrice.toFixed(2)}`}
                      icon={<DollarSign size={20} />}
                      change={{ value: "+8.3%", positive: true }}
                    />
                    <StatsCard
                      title="Investment Rounds"
                      value="3"
                      icon={<Activity size={20} />}
                    />
                  </div>
                  
                  <ChartCard
                    title="Investment History"
                    data={sampleChartData.investments}
                    dataKey="value"
                    color="hsl(var(--highlight))"
                    height={250}
                  />
                  
                  <InvestmentTable investments={sampleInvestments} />
                </TabsContent>
                
                <TabsContent value="market" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatsCard
                      title="Market Share"
                      value={`${marketPositionData.marketShare}%`}
                      icon={<BarChart3 size={20} />}
                      change={{ value: "+1.8%", positive: true }}
                    />
                    <StatsCard
                      title="Growth Rate"
                      value={`${marketPositionData.growthRate}%`}
                      icon={<TrendingUp size={20} />}
                      change={{ value: `+${(marketPositionData.growthRate - marketPositionData.industryGrowthRate).toFixed(1)}%`, positive: true }}
                    />
                    <StatsCard
                      title="Market Ranking"
                      value={`#${marketPositionData.marketCapRanking}`}
                      icon={<Target size={20} />}
                      change={{ value: "Up 1 position", positive: true }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChartCard
                      title="Grocery Market Trends"
                      data={sampleChartData.marketTrends}
                      dataKey="value"
                      color="hsl(var(--primary))"
                      height={250}
                    />
                    <MarketPositionCard marketData={marketPositionData} />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end">
                <Button
                  className="flex items-center gap-2"
                  onClick={() => setActiveTab("company")}
                >
                  Edit Company <ArrowUpRight size={16} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <BusinessBannerList 
                businesses={sampleFictionalBusinesses} 
                onSelectBusiness={handleSelectBusiness} 
                className="mb-6"
              />
              
              {selectedBusiness ? (
                <Tabs value={activeDashboardTab} onValueChange={setActiveDashboardTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                    <TabsTrigger value="investments">Investments</TabsTrigger>
                    <TabsTrigger value="market">Market Position</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <StatsCard
                        title="Current Valuation"
                        value="$2.4M"
                        icon={<Building size={20} />}
                        change={{ value: "+14.3%", positive: true }}
                      />
                      <StatsCard
                        title="Monthly Revenue"
                        value={selectedBusiness.revenue}
                        icon={<ShoppingCart size={20} />}
                        change={{ value: "+5.6%", positive: true }}
                      />
                      <StatsCard
                        title="Store Locations"
                        value={selectedBusiness.locations.toString()}
                        icon={<Store size={20} />}
                        change={{ value: "+1", positive: true }}
                      />
                      <StatsCard
                        title="Monthly Customers"
                        value={selectedBusiness.customers.toLocaleString()}
                        icon={<Users size={20} />}
                        change={{ value: "+8.3%", positive: true }}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ChartCard
                        title="Monthly Revenue"
                        data={sampleChartData.revenue}
                        dataKey="value"
                        color="hsl(var(--success))"
                        height={250}
                      />
                      <ChartCard
                        title="Company Valuation"
                        data={sampleChartData.valuation}
                        dataKey="value"
                        color="hsl(var(--highlight))"
                        type="area"
                        height={250}
                      />
                    </div>

                  </TabsContent>
                  
                  <TabsContent value="financials" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <StatsCard
                        title="Monthly Net Profit"
                        value="$39,000"
                        icon={<TrendingUp size={20} />}
                        change={{ value: "+8.3%", positive: true }}
                      />
                      <StatsCard
                        title="Supply Chain Costs"
                        value="$42,800/mo"
                        icon={<Truck size={20} />}
                        change={{ value: "-3.2%", positive: true }}
                      />
                      <StatsCard
                        title="Cash Reserves"
                        value="$680,000"
                        icon={<CreditCard size={20} />}
                      />
                      <StatsCard
                        title="Monthly Burn Rate"
                        value="$93,000"
                        icon={<LineChart size={20} />}
                        change={{ value: "-2.1%", positive: true }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ChartCard
                        title="Net Profit Trends"
                        data={sampleChartData.netProfit}
                        dataKey="value"
                        color="hsl(var(--success))"
                        height={250}
                      />
                      <ChartCard
                        title="Online Ordering API Income"
                        data={sampleChartData.apiIncome}
                        dataKey="value"
                        color="hsl(var(--primary))"
                        type="area"
                        height={250}
                      />
                    </div>
                    
                    <FinancialMetricsCard metrics={financialMetrics} />
                  </TabsContent>
                  
                  <TabsContent value="investments" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <StatsCard
                        title="Total Investment"
                        value="$1,080,000"
                        icon={<Target size={20} />}
                      />
                      <StatsCard
                        title="Latest Share Price"
                        value="$6.50"
                        icon={<DollarSign size={20} />}
                        change={{ value: "+8.3%", positive: true }}
                      />
                      <StatsCard
                        title="Investment Rounds"
                        value="3"
                        icon={<Activity size={20} />}
                      />
                    </div>
                    
                    <ChartCard
                      title="Investment History"
                      data={sampleChartData.investments}
                      dataKey="value"
                      color="hsl(var(--highlight))"
                      height={250}
                    />
                    
                    <InvestmentTable investments={sampleInvestments} />
                  </TabsContent>
                  
                  <TabsContent value="market" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <StatsCard
                        title="Market Share"
                        value="14.5%"
                        icon={<BarChart3 size={20} />}
                        change={{ value: "+1.8%", positive: true }}
                      />
                      <StatsCard
                        title="Growth Rate"
                        value="9.6%"
                        icon={<TrendingUp size={20} />}
                        change={{ value: "+4.8%", positive: true }}
                      />
                      <StatsCard
                        title="Market Ranking"
                        value="#3"
                        icon={<Target size={20} />}
                        change={{ value: "Up 1 position", positive: true }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ChartCard
                        title="Grocery Market Trends"
                        data={sampleChartData.marketTrends}
                        dataKey="value"
                        color="hsl(var(--primary))"
                        height={250}
                      />
                      <MarketPositionCard marketData={marketPositionData} />
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center space-y-4 p-12 border border-gray-800 rounded-lg">
                  <ShoppingCart size={48} className="mx-auto text-primary" />
                  <h2 className="text-2xl font-semibold text-gray-300">Sample Grocery Data Available</h2>
                  <p className="text-muted-foreground max-w-lg mx-auto text-xs">
                    Select one of the sample businesses above to view demo data, or create your own virtual grocery business.
                  </p>
                  <div className="flex justify-center gap-4 mt-6">
                    <Button className="bg-grayview text-gray-400" variant="outline" onClick={() => handleSelectBusiness(sampleFictionalBusinesses[0])}>
                      View Sample Data
                    </Button>
                    <Button onClick={() => setActiveTab("company")}>
                      Create My Business
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="company">
          <CompanyForm
            onSubmit={handleCreateCompany}
            initialData={companyData || undefined}
          />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default BusinessEntity;
