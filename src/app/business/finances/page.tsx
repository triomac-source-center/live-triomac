"use client"

import React, { useState } from "react";
import MainLayout from "@/components/businesscomponents/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/businesscomponents/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  Receipt, 
  ShoppingBag, 
  Truck, 
  Store, 
  Building, 
  Users, 
  BarChart3, 
  PieChart,
  CalendarRange,
  AlertCircle,
  Coins,
} from "lucide-react";
import ChartCard from "@/components/businesscomponents/Dashboard/ChartCard";
import StatsCard from "@/components/businesscomponents/Dashboard/StatsCard";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/businesscomponents/ui/table";
import { Progress } from "@/components/businesscomponents/ui/progress";
import { Badge } from "@/components/businesscomponents/ui/badge";

// Financial data based on $100,000 monthly revenue
const financialData = {
  // Monthly data
  monthly: {
    revenue: 100000,
    cogs: 67000,        // 67% cost of goods sold
    grossProfit: 33000, // 33% gross margin
    expenses: {
      rent: 8200,       // Store locations rent
      salaries: 12500,  // Staff salaries
      utilities: 2800,  // Electricity, water, etc.
      marketing: 1500,  // Advertising and promotions
      insurance: 1200,  // Business insurance
      maintenance: 900, // Equipment and building maintenance
      supplies: 700,    // Office and store supplies
      other: 1100,      // Miscellaneous expenses
    },
    netProfit: 4100,    // Remaining profit after expenses (4.1% margin)
  },
  // Cash flow
  cashFlow: {
    beginningBalance: 78500,
    inflows: {
      salesRevenue: 100000,
      investmentIncome: 1200,
      otherIncome: 300,
    },
    outflows: {
      inventory: 62000,
      operatingExpenses: 28900,
      taxes: 2500,
      loanPayments: 3800,
      capitalExpenditures: 1500,
    },
    endingBalance: 81300,
  },
  // Balance sheet items
  balanceSheet: {
    assets: {
      currentAssets: {
        cash: 81300,
        inventory: 125000,
        accountsReceivable: 12500,
        prepaidExpenses: 4800,
      },
      fixedAssets: {
        property: 345000,
        equipment: 215000,
        vehicles: 75000,
        leasehold: 90000,
        accumulatedDepreciation: -128000,
      },
      intangibleAssets: {
        goodwill: 50000,
        trademarks: 15000,
        licenses: 8000,
      },
    },
    liabilities: {
      currentLiabilities: {
        accountsPayable: 68000,
        wagesPayable: 6200,
        taxes: 9500,
        shortTermLoans: 12500,
        currentPortionLongTermDebt: 45000,
      },
      longTermLiabilities: {
        bankLoans: 235000,
        mortgages: 275000,
        equipmentLoans: 43000,
      },
    },
    equity: {
      ownerCapital: 250000,
      retainedEarnings: 78900,
    }
  },
  // Key performance indicators
  kpis: {
    grossMarginPercentage: 33,
    netMarginPercentage: 4.1,
    quickRatio: 1.2,
    currentRatio: 1.8,
    debtToEquity: 1.7,
    inventoryTurnover: 5.2,
    averageTransactionValue: 38.5,
    customerRetentionRate: 76,
    salesPerSquareFoot: 43.2,
  },
  // Department profitability
  departments: [
    { name: "Fresh Produce", revenue: 27000, cogs: 18900, profit: 8100, margin: 30 },
    { name: "Dairy & Eggs", revenue: 16000, cogs: 10880, profit: 5120, margin: 32 },
    { name: "Meat & Seafood", revenue: 19000, cogs: 13300, profit: 5700, margin: 30 },
    { name: "Bakery", revenue: 9000, cogs: 5580, profit: 3420, margin: 38 },
    { name: "Dry Goods", revenue: 12000, cogs: 7800, profit: 4200, margin: 35 },
    { name: "Frozen Foods", revenue: 8000, cogs: 5360, profit: 2640, margin: 33 },
    { name: "Beverages", revenue: 5000, cogs: 3250, profit: 1750, margin: 35 },
    { name: "Deli & Prepared", revenue: 4000, cogs: 2320, profit: 1680, margin: 42 },
  ],
  // Chart data
  charts: {
    revenueByMonth: [
      { name: "Jan", value: 92000 },
      { name: "Feb", value: 89000 },
      { name: "Mar", value: 93500 },
      { name: "Apr", value: 95800 },
      { name: "May", value: 97200 },
      { name: "Jun", value: 100000 },
    ],
    expensesByMonth: [
      { name: "Jan", value: 88500 },
      { name: "Feb", value: 86200 },
      { name: "Mar", value: 89500 },
      { name: "Apr", value: 91600 },
      { name: "May", value: 92900 },
      { name: "Jun", value: 95900 },
    ],
    cashFlowByMonth: [
      { name: "Jan", value: 3500 },
      { name: "Feb", value: 2800 },
      { name: "Mar", value: 4000 },
      { name: "Apr", value: 4200 },
      { name: "May", value: 4300 },
      { name: "Jun", value: 4100 },
    ],
    // Projected data
    projectedRevenue: [
      { name: "Jul", value: 101500 },
      { name: "Aug", value: 103000 },
      { name: "Sep", value: 105000 },
      { name: "Oct", value: 107200 },
      { name: "Nov", value: 110000 },
      { name: "Dec", value: 118000 },
    ],
  },
  // Financial transactions (recent)
  transactions: [
    { 
      id: "t1",
      date: "2025-04-10",
      description: "Wholesale Produce Supply Co",
      category: "Inventory",
      type: "expenses",
      amount: 12500,
      status: "completed"
    },
    { 
      id: "t2",
      date: "2025-04-08",
      description: "Dairy Distribution Inc",
      category: "Inventory",
      type: "expense",
      amount: 8700,
      status: "completed"
    },
    { 
      id: "t3",
      date: "2025-04-07",
      description: "Payroll Processing",
      category: "Salaries",
      type: "expenses",
      amount: 12500,
      status: "completed"
    },
    { 
      id: "t4",
      date: "2025-04-05",
      description: "Commercial Rent Payment",
      category: "Rent",
      type: "expense",
      amount: 8200,
      status: "completed"
    },
    { 
      id: "t5",
      date: "2025-04-03",
      description: "Utility Payment - Electricity",
      category: "Utilities",
      type: "expenses",
      amount: 1800,
      status: "completed"
    },
    { 
      id: "t6",
      date: "2025-04-01",
      description: "Monthly Loan Payment",
      category: "Loan",
      type: "expense",
      amount: 3800,
      status: "completed"
    },
  ],
  // Budget vs Actual for current month
  budgetVsActual: {
    revenue: { budgeted: 98000, actual: 100000, variance: 2000, percentVariance: 2.04 },
    cogs: { budgeted: 65500, actual: 67000, variance: -1500, percentVariance: -2.29 },
    grossProfit: { budgeted: 32500, actual: 33000, variance: 500, percentVariance: 1.54 },
    expenses: { budgeted: 28000, actual: 28900, variance: -900, percentVariance: -3.21 },
    netProfit: { budgeted: 4500, actual: 4100, variance: -400, percentVariance: -8.89 },
  },
  // Store performance comparison
  stores: [
    { 
      id: 1,
      location: "Downtown", 
      revenue: 32000, 
      expenses: 27500, 
      profit: 4500,
      profitMargin: 14.06,
      squareFootage: 3200,
      salesPerSqFt: 10,
      performanceScore: 94
    },
    { 
      id: 2,
      location: "Westside", 
      revenue: 28000, 
      expenses: 24300, 
      profit: 3700,
      profitMargin: 13.21,
      squareFootage: 2800,
      salesPerSqFt: 10,
      performanceScore: 88
    },
    { 
      id: 3,
      location: "Northgate", 
      revenue: 25000, 
      expenses: 22400, 
      profit: 2600,
      profitMargin: 10.4,
      squareFootage: 2400,
      salesPerSqFt: 10.42,
      performanceScore: 81
    },
    { 
      id: 4,
      location: "Southside", 
      revenue: 15000, 
      expenses: 14100, 
      profit: 900,
      profitMargin: 6,
      squareFootage: 1800,
      salesPerSqFt: 8.33,
      performanceScore: 73
    },
  ],
};

// Calculate totals
const totalAssets = 
  Object.values(financialData.balanceSheet.assets.currentAssets).reduce((a, b) => a + b, 0) +
  Object.values(financialData.balanceSheet.assets.fixedAssets).reduce((a, b) => typeof b === 'number' ? a + b : a, 0) +
  Object.values(financialData.balanceSheet.assets.intangibleAssets).reduce((a, b) => a + b, 0);

const totalLiabilities = 
  Object.values(financialData.balanceSheet.liabilities.currentLiabilities).reduce((a, b) => a + b, 0) +
  Object.values(financialData.balanceSheet.liabilities.longTermLiabilities).reduce((a, b) => a + b, 0);

const totalEquity = Object.values(financialData.balanceSheet.equity).reduce((a, b) => a + b, 0);

// Format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const Finances = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-300">Financial Management</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-normal">
              <CalendarRange className="h-3 w-3 mr-1" /> April 2025
            </Badge>
            <Badge variant="success" className="text-xs font-normal">
              <TrendingUp className="h-3 w-3 mr-1" /> Growing
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 bg-transparent">
          <TabsList className="mb-4 grid grid-cols-5 md:w-fit bg-transparent">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="cashflow">Cashflow</TabsTrigger>
            <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
            <TabsTrigger value="stores">Store Analysis</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Monthly Revenue"
                value={formatCurrency(financialData.monthly.revenue)}
                icon={<DollarSign size={20} />}
                change={{ value: "+2.9%", positive: true }}
              />
              <StatsCard
                title="Net Profit"
                value={formatCurrency(financialData.monthly.netProfit)}
                icon={<TrendingUp size={20} />}
                change={{ value: "-8.9%", positive: false }}
              />
              <StatsCard
                title="Cash Balance"
                value={formatCurrency(financialData.cashFlow.endingBalance)}
                icon={<CreditCard size={20} />}
                change={{ value: "+3.6%", positive: true }}
              />
              <StatsCard
                title="Quick Ratio"
                value={financialData.kpis.quickRatio.toString()}
                icon={<AlertCircle size={20} />}
                change={{ value: "+0.1", positive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Revenue vs Expenses (Last 6 Months)"
                data={[...financialData.charts.revenueByMonth].map((item, i) => ({
                  name: item.name,
                  revenue: item.value,
                  expenses: financialData.charts.expensesByMonth[i].value
                }))}
                type="line"
                dataKey="revenue"
                color="hsl(var(--success))"
                height={250}
              />
              <ChartCard
                title="Projected Revenue (Next 6 Months)"
                data={financialData.charts.projectedRevenue}
                dataKey="value"
                color="hsl(var(--highlight))"
                type="area"
                height={250}
              />
            </div>

            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="text-md font-medium">Budget vs. Actual (Current Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-normal">Revenue</span>
                      <span className={`text-sm font-medium ${financialData.budgetVsActual.revenue.variance > 0 ? 'text-success' : 'text-destructive'}`}>
                        {financialData.budgetVsActual.revenue.percentVariance > 0 ? '+' : ''}
                        {financialData.budgetVsActual.revenue.percentVariance.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success" 
                          style={{ width: `${Math.min(100, (financialData.budgetVsActual.revenue.actual / financialData.budgetVsActual.revenue.budgeted) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs w-36 text-right">
                        {formatCurrency(financialData.budgetVsActual.revenue.actual)} / {formatCurrency(financialData.budgetVsActual.revenue.budgeted)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-normal">COGS</span>
                      <span className={`text-sm font-medium ${financialData.budgetVsActual.cogs.variance > 0 ? 'text-destructive' : 'text-success'}`}>
                        {financialData.budgetVsActual.cogs.percentVariance > 0 ? '+' : ''}
                        {financialData.budgetVsActual.cogs.percentVariance.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${financialData.budgetVsActual.cogs.variance > 0 ? 'bg-destructive' : 'bg-success'}`} 
                          style={{ width: `${Math.min(100, (financialData.budgetVsActual.cogs.actual / financialData.budgetVsActual.cogs.budgeted) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs w-36 text-right">
                        {formatCurrency(financialData.budgetVsActual.cogs.actual)} / {formatCurrency(financialData.budgetVsActual.cogs.budgeted)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-normal">Expenses</span>
                      <span className={`text-sm font-medium ${financialData.budgetVsActual.expenses.variance > 0 ? 'text-destructive' : 'text-success'}`}>
                        {financialData.budgetVsActual.expenses.percentVariance > 0 ? '+' : ''}
                        {financialData.budgetVsActual.expenses.percentVariance.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${financialData.budgetVsActual.expenses.variance > 0 ? 'bg-destructive' : 'bg-success'}`} 
                          style={{ width: `${Math.min(100, (financialData.budgetVsActual.expenses.actual / financialData.budgetVsActual.expenses.budgeted) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs w-36 text-right">
                        {formatCurrency(financialData.budgetVsActual.expenses.actual)} / {formatCurrency(financialData.budgetVsActual.expenses.budgeted)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-normal">Net Profit</span>
                      <span className={`text-sm font-medium ${financialData.budgetVsActual.netProfit.variance > 0 ? 'text-success' : 'text-destructive'}`}>
                        {financialData.budgetVsActual.netProfit.percentVariance > 0 ? '+' : ''}
                        {financialData.budgetVsActual.netProfit.percentVariance.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${financialData.budgetVsActual.netProfit.variance > 0 ? 'bg-success' : 'bg-destructive'}`} 
                          style={{ width: `${Math.min(100, (financialData.budgetVsActual.netProfit.actual / financialData.budgetVsActual.netProfit.budgeted) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs w-36 text-right">
                        {formatCurrency(financialData.budgetVsActual.netProfit.actual)} / {formatCurrency(financialData.budgetVsActual.netProfit.budgeted)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Profitability</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Gross Margin</span>
                          <span className="text-sm font-medium">{financialData.kpis.grossMarginPercentage}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Net Margin</span>
                          <span className="text-sm font-medium">{financialData.kpis.netMarginPercentage}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Liquidity</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Quick Ratio</span>
                          <span className="text-sm font-medium">{financialData.kpis.quickRatio}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Current Ratio</span>
                          <span className="text-sm font-medium">{financialData.kpis.currentRatio}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Efficiency</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Inventory Turnover</span>
                          <span className="text-sm font-medium">{financialData.kpis.inventoryTurnover}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Sales per Sq. Ft.</span>
                          <span className="text-sm font-medium">${financialData.kpis.salesPerSquareFoot}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Customer</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Avg. Transaction</span>
                          <span className="text-sm font-medium">${financialData.kpis.averageTransactionValue}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Retention Rate</span>
                          <span className="text-sm font-medium">{financialData.kpis.customerRetentionRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 border-gray-800">
                    {financialData.transactions.slice(0, 5).map(transaction => (
                      <div key={transaction.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                        <div>
                          <p className="font-normal text-xs">{transaction.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            <span className="mx-1">•</span>
                            <span>{transaction.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium text-xs ${transaction.type === 'expense' ? 'text-destructive' : 'text-success'}`}>
                            {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
                          </p>
                          <Badge variant="outline" className="text-xs font-normal bg-grayview border border-gray-900">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Income Tab */}
          <TabsContent value="income" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Revenue"
                value={formatCurrency(financialData.monthly.revenue)}
                icon={<ShoppingBag size={20} />}
              />
              <StatsCard
                title="Cost of Goods"
                value={formatCurrency(financialData.monthly.cogs)}
                icon={<Truck size={20} />}
              />
              <StatsCard
                title="Gross Profit"
                value={formatCurrency(financialData.monthly.grossProfit)}
                icon={<Coins size={20} />}
                change={{ value: `${financialData.kpis.grossMarginPercentage}% margin`, positive: true }}
              />
              <StatsCard
                title="Net Profit"
                value={formatCurrency(financialData.monthly.netProfit)}
                icon={<TrendingUp size={20} />}
                change={{ value: `${financialData.kpis.netMarginPercentage}% margin`, positive: true }}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Monthly Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(financialData.monthly.expenses).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400 capitalize">{key}</span>
                          <span className="text-xs font-normal">{formatCurrency(value)}</span>
                        </div>
                        <Progress 
                          value={(value / financialData.monthly.revenue) * 100} 
                          className="h-1"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-secondary">
                    <div className="flex justify-between items-center">
                      <span className="font-normal text-xs">Total Expenses</span>
                      <span className="font-normal text-xs">
                        {formatCurrency(Object.values(financialData.monthly.expenses).reduce((a, b) => a + b, 0))}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Department Profitability</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">COGS</TableHead>
                        <TableHead className="text-right">Profit</TableHead>
                        <TableHead className="text-right">Margin</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {financialData.departments.map((dept) => (
                        <TableRow key={dept.name}>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell className="text-right">{formatCurrency(dept.revenue)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(dept.cogs)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(dept.profit)}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={dept.margin > 35 ? "success" : dept.margin > 30 ? "default" : "warning"}>
                              {dept.margin}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <ChartCard
                title="Revenue & Net Profit by Month"
                data={financialData.charts.revenueByMonth.map((item, i) => ({
                  name: item.name,
                  revenue: item.value,
                  netProfit: financialData.charts.cashFlowByMonth[i].value
                }))}
                type="line"
                dataKey="revenue"
                color="hsl(var(--highlight))"
                height={300}
              />
            </div>
          </TabsContent>

          {/* Cash Flow Tab */}
          <TabsContent value="cashflow" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard
                title="Beginning Balance"
                value={formatCurrency(financialData.cashFlow.beginningBalance)}
                icon={<CreditCard size={20} />}
              />
              <StatsCard
                title="Net Cash Flow"
                value={formatCurrency(
                  Object.values(financialData.cashFlow.inflows).reduce((a, b) => a + b, 0) - 
                  Object.values(financialData.cashFlow.outflows).reduce((a, b) => a + b, 0)
                )}
                icon={<TrendingUp size={20} />}
                change={{ 
                  value: "+3.6%", 
                  positive: true 
                }}
              />
              <StatsCard
                title="Ending Balance"
                value={formatCurrency(financialData.cashFlow.endingBalance)}
                icon={<CreditCard size={20} />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Cash Inflows</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(financialData.cashFlow.inflows).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <div>
                          <p className="font-normal text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        </div>
                        <div className="text-right font-normal text-xs">
                          <p className="font-medium text-success">{formatCurrency(value)}</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-1 mt-2 border-t border-transparent">
                      <div className="flex justify-between items-center">
                        <p className="font-normal text-xs">Total Inflows</p>
                        <p className="font-medium text-xs text-success">
                          {formatCurrency(Object.values(financialData.cashFlow.inflows).reduce((a, b) => a + b, 0))}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Cash Outflows</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(financialData.cashFlow.outflows).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <div>
                          <p className="font-normal text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-xs text-destructive">{formatCurrency(value)}</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-1 mt-2 border-t border-transparent">
                      <div className="flex justify-between items-center">
                        <p className="font-medium font-normal text-xs">Total Outflows</p>
                        <p className="font-medium text-destructive">
                          {formatCurrency(Object.values(financialData.cashFlow.outflows).reduce((a, b) => a + b, 0))}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="text-md font-medium">Monthly Cash Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartCard
                  title=""
                  data={financialData.charts.cashFlowByMonth}
                  dataKey="value"
                  color="hsl(var(--success))"
                  type="area"
                  height={250}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Balance Sheet Tab */}
          <TabsContent value="balance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard
                title="Total Assets"
                value={formatCurrency(totalAssets)}
                icon={<Building size={20} />}
              />
              <StatsCard
                title="Total Liabilities"
                value={formatCurrency(totalLiabilities)}
                icon={<AlertCircle size={20} />}
              />
              <StatsCard
                title="Total Equity"
                value={formatCurrency(totalEquity)}
                icon={<Users size={20} />}
                change={{ 
                  value: "Debt/Equity: " + financialData.kpis.debtToEquity.toFixed(1), 
                  positive: false
                }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <h3 className="text-xs font-normal mb-3">Current Assets</h3>
                    <div className="space-y-2 mb-6">
                      {Object.entries(financialData.balanceSheet.assets.currentAssets).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs font-normal capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-xs font-normal">{formatCurrency(value)}</span>
                        </div>
                      ))}
                      <div className="pt-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-normal">Total Current Assets</span>
                          <span className="text-xs font-normal">
                            {formatCurrency(Object.values(financialData.balanceSheet.assets.currentAssets).reduce((a, b) => a + b, 0))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-sm font-medium mb-3">Fixed Assets</h3>
                    <div className="space-y-2 mb-6">
                      {Object.entries(financialData.balanceSheet.assets.fixedAssets).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs font-normal capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className={`text-xs font-normal ${value < 0 ? 'text-destructive' : ''}`}>
                            {formatCurrency(value)}
                          </span>
                        </div>
                      ))}
                      <div className="pt-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-normal">Total Fixed Assets</span>
                          <span className="text-xs font-normal">
                            {formatCurrency(Object.values(financialData.balanceSheet.assets.fixedAssets).reduce((a, b) => typeof b === 'number' ? a + b : a, 0))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-sm font-medium mb-3">Intangible Assets</h3>
                    <div className="space-y-2 mb-6">
                      {Object.entries(financialData.balanceSheet.assets.intangibleAssets).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs font-normal capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-xs font-normal">{formatCurrency(value)}</span>
                        </div>
                      ))}
                      <div className="pt-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-normal">Total Intangible Assets</span>
                          <span className="text-xs font-normal">
                            {formatCurrency(Object.values(financialData.balanceSheet.assets.intangibleAssets).reduce((a, b) => a + b, 0))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-normal">TOTAL ASSETS</p>
                        <p className="text-sm font-normal">{formatCurrency(totalAssets)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Liabilities & Equity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <h3 className="text-sm font-medium mb-3">Current Liabilities</h3>
                    <div className="space-y-2 mb-6">
                      {Object.entries(financialData.balanceSheet.liabilities.currentLiabilities).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs font-normal capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-xs font-normal">{formatCurrency(value)}</span>
                        </div>
                      ))}
                      <div className="pt-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-normal">Total Current Liabilities</span>
                          <span className="text-xs font-normal">
                            {formatCurrency(Object.values(financialData.balanceSheet.liabilities.currentLiabilities).reduce((a, b) => a + b, 0))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-sm font-medium mb-3">Long-term Liabilities</h3>
                    <div className="space-y-2 mb-6">
                      {Object.entries(financialData.balanceSheet.liabilities.longTermLiabilities).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs font-normal capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-xs font-normal">{formatCurrency(value)}</span>
                        </div>
                      ))}
                      <div className="pt-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-normal">Total Long-term Liabilities</span>
                          <span className="text-xs font-normal">
                            {formatCurrency(Object.values(financialData.balanceSheet.liabilities.longTermLiabilities).reduce((a, b) => a + b, 0))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-normal">TOTAL LIABILITIES</span>
                        <span className="text-xs font-normal">{formatCurrency(totalLiabilities)}</span>
                      </div>
                    </div>

                    <h3 className="text-xs font-normal mt-6 mb-3">Equity</h3>
                    <div className="space-y-2 mb-2">
                      {Object.entries(financialData.balanceSheet.equity).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs font-normal capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-xs font-normal">{formatCurrency(value)}</span>
                        </div>
                      ))}
                      <div className="pt-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-normal">TOTAL EQUITY</span>
                          <span className="text-xs font-normal">{formatCurrency(totalEquity)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-normal">TOTAL LIABILITIES & EQUITY</p>
                        <p className="text-sm font-normal text-gray-400">{formatCurrency(totalLiabilities + totalEquity)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Store Analysis Tab */}
          <TabsContent value="stores" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {financialData.stores.map(store => (
                <StatsCard
                  key={store.id}
                  title={store.location}
                  value={formatCurrency(store.revenue)}
                  icon={<Store size={20} />}
                  change={{ value: `${store.profitMargin.toFixed(1)}% margin`, positive: store.profitMargin > 10 }}
                />
              ))}
            </div>

            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="text-md font-medium">Store Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Expenses</TableHead>
                      <TableHead className="text-right">Profit</TableHead>
                      <TableHead className="text-right">Margin</TableHead>
                      <TableHead className="text-right">$/Sq.Ft</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.stores.map((store) => (
                      <TableRow key={store.id}>
                        <TableCell className="font-medium">{store.location}</TableCell>
                        <TableCell className="text-right">{formatCurrency(store.revenue)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(store.expenses)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(store.profit)}</TableCell>
                        <TableCell className="text-right">{store.profitMargin.toFixed(1)}%</TableCell>
                        <TableCell className="text-right">${store.salesPerSqFt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={store.performanceScore} 
                              className="h-1 "
                            />
                            <span className="text-xs w-8">{store.performanceScore}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Store Revenue Comparison"
                data={financialData.stores.map(store => ({
                  name: store.location,
                  Revenue: store.revenue,
                  Profit: store.profit
                }))}
                dataKey="Revenue"
                color="hsl(var(--primary))"
                type="bar"
                height={250}
              />
              
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Store Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/40 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-success" />
                        Top Performer: Downtown
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        The Downtown store has the highest revenue and profit margin at 14.1%. 
                        Consider replicating successful strategies from this location at other stores.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <TrendingDown className="h-4 w-4 mr-2 text-destructive" />
                        Needs Improvement: Southside
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Southside store has the lowest profitability at 6%. Consider optimizing product 
                        mix and reducing expenses to improve performance.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2 text-highlight" />
                        Opportunity: Westside
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        The Westside location shows strong performance and has potential for 
                        expansion. Consider adding new product categories or services.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Finances;
