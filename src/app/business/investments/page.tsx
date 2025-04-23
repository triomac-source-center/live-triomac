'use client'

import React, { useState } from 'react'
import MainLayout from '@/components/businesscomponents/Layout/MainLayout'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/businesscomponents/ui/tabs'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/businesscomponents/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/businesscomponents/ui/table'
import {
    PieChart as PieChartIcon,
    Users,
    TrendingUp,
    Coins,
    DollarSign,
    PieChart as PieChartLucide,
    UserPlus,
    Building,
    BarChart3,
    Target,
} from 'lucide-react'
import StatsCard from '@/components/businesscomponents/Dashboard/StatsCard'
import ChartCard from '@/components/businesscomponents/Dashboard/ChartCard'
import InvestmentTable from '@/components/businesscomponents/Dashboard/InvestmentTable'
import { Badge } from '@/components/businesscomponents/ui/badge'
import { Progress } from '@/components/businesscomponents/ui/progress'
import { Button } from '@/components/businesscomponents/ui/button'
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
} from 'recharts'

const sampleInvestments = [
    {
        id: '1',
        investor: 'Fresh Foods Capital',
        amount: 200000,
        sharePrice: 5.25,
        sharesAcquired: 38095,
        date: '2023-01-10',
        type: 'Series A',
    },
    {
        id: '2',
        investor: 'Grocery Growth Partners',
        amount: 150000,
        sharePrice: 5.25,
        sharesAcquired: 28571,
        date: '2023-01-18',
        type: 'Series A',
    },
    {
        id: '3',
        investor: 'Sustainable Markets Fund',
        amount: 300000,
        sharePrice: 6.0,
        sharesAcquired: 50000,
        date: '2023-04-05',
        type: 'Grocery Expansion',
    },
    {
        id: '4',
        investor: 'Local Produce Ventures',
        amount: 180000,
        sharePrice: 6.0,
        sharesAcquired: 30000,
        date: '2023-04-22',
        type: 'Supply Chain',
    },
    {
        id: '5',
        investor: 'Farm-to-Table Investors',
        amount: 250000,
        sharePrice: 6.5,
        sharesAcquired: 38462,
        date: '2023-06-14',
        type: 'Store Network',
    },
]

const investorDetails = [
    {
        id: '1',
        name: 'Fresh Foods Capital',
        type: 'Venture Capital',
        focus: 'Sustainable Food Retail',
        sharesOwned: 50095,
        percentOwnership: 18.5,
        investmentTotal: 320000,
        location: 'San Francisco, CA',
        joinDate: '2023-01-10',
        representative: 'Sarah Johnson',
        boardSeat: true,
        portfolioCompanies: 14,
    },
    {
        id: '2',
        name: 'Grocery Growth Partners',
        type: 'Private Equity',
        focus: 'Grocery Retail Expansion',
        sharesOwned: 40571,
        percentOwnership: 15.0,
        investmentTotal: 250000,
        location: 'Chicago, IL',
        joinDate: '2023-01-18',
        representative: 'Michael Chen',
        boardSeat: true,
        portfolioCompanies: 8,
    },
    {
        id: '3',
        name: 'Sustainable Markets Fund',
        type: 'ESG Fund',
        focus: 'Eco-Friendly Retail',
        sharesOwned: 65000,
        percentOwnership: 24.1,
        investmentTotal: 400000,
        location: 'Portland, OR',
        joinDate: '2023-04-05',
        representative: 'Emma Rodriguez',
        boardSeat: false,
        portfolioCompanies: 23,
    },
    {
        id: '4',
        name: 'Local Produce Ventures',
        type: 'Strategic Investor',
        focus: 'Farm-to-Store Logistics',
        sharesOwned: 30000,
        percentOwnership: 11.1,
        investmentTotal: 180000,
        location: 'Austin, TX',
        joinDate: '2023-04-22',
        representative: 'David Thompson',
        boardSeat: false,
        portfolioCompanies: 5,
    },
    {
        id: '5',
        name: 'Farm-to-Table Investors',
        type: 'Industry Fund',
        focus: 'Local Food Systems',
        sharesOwned: 38462,
        percentOwnership: 14.2,
        investmentTotal: 250000,
        location: 'Madison, WI',
        joinDate: '2023-06-14',
        representative: 'Lisa Park',
        boardSeat: false,
        portfolioCompanies: 12,
    },
    {
        id: '6',
        name: 'Founders & Management',
        type: 'Internal',
        focus: 'Company Leadership',
        sharesOwned: 45000,
        percentOwnership: 16.7,
        investmentTotal: 100000,
        location: 'Company HQ',
        joinDate: '2023-01-01',
        representative: 'CEO & Team',
        boardSeat: true,
        portfolioCompanies: 1,
    },
]

const chartData = {
    ownershipPie: [
        { name: 'Fresh Foods Capital', value: 18.5, color: '#8884d8' },
        { name: 'Grocery Growth Partners', value: 15.0, color: '#83a6ed' },
        { name: 'Sustainable Markets Fund', value: 24.1, color: '#8dd1e1' },
        { name: 'Local Produce Ventures', value: 11.1, color: '#82ca9d' },
        { name: 'Farm-to-Table Investors', value: 14.2, color: '#a4de6c' },
        { name: 'Founders & Management', value: 16.7, color: '#d0ed57' },
    ],
    sharePrice: [
        { name: 'Jan', value: 5.0 },
        { name: 'Feb', value: 5.25 },
        { name: 'Mar', value: 5.5 },
        { name: 'Apr', value: 6.0 },
        { name: 'May', value: 6.25 },
        { name: 'Jun', value: 6.5 },
        { name: 'Jul', value: 6.75 },
    ],
    investmentRounds: [
        { name: 'Series A', value: 350000 },
        { name: 'Grocery Expansion', value: 300000 },
        { name: 'Supply Chain', value: 180000 },
        { name: 'Store Network', value: 250000 },
    ],
    capitalAllocation: [
        { name: 'Store Expansion', value: 380000 },
        { name: 'Supply Chain', value: 220000 },
        { name: 'Technology', value: 150000 },
        { name: 'Inventory', value: 130000 },
        { name: 'Marketing', value: 100000 },
        { name: 'Operations', value: 100000 },
    ],
}

const fundingSummary = {
    totalInvestment: 1080000,
    latestValuation: 2400000,
    totalShares: 270000,
    currentSharePrice: 6.75,
    initialSharePrice: 5.0,
    shareAppreciation: 35,
    fundingRounds: 3,
    nextRoundTarget: 500000,
    nextRoundEstimatedPrice: 8.0,
    burnRate: 93000,
    runway: '7.3 months',
}

const COLORS = [
    '#8884d8',
    '#83a6ed',
    '#8dd1e1',
    '#82ca9d',
    '#a4de6c',
    '#d0ed57',
    '#ffc658',
]

const InvestmentsPage = () => {
    const [activeTab, setActiveTab] = useState('overview')

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date)
    }

    return (
        <MainLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-300">
                        Investment Management
                    </h1>
                </div>

                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-4"
                >
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="investors">Investors</TabsTrigger>
                        <TabsTrigger value="rounds">Funding Rounds</TabsTrigger>
                        <TabsTrigger value="shares">Shares</TabsTrigger>
                        <TabsTrigger value="allocation">Capital Allocation</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <StatsCard
                                title="Total Investment"
                                value={`$${fundingSummary.totalInvestment.toLocaleString()}`}
                                icon={<Coins size={20} />}
                            />
                            <StatsCard
                                title="Current Valuation"
                                value={`$${fundingSummary.latestValuation.toLocaleString()}`}
                                icon={<Building size={20} />}
                                change={{ value: '+26.3%', positive: true }}
                            />
                            <StatsCard
                                title="Current Share Price"
                                value={`$${fundingSummary.currentSharePrice.toFixed(2)}`}
                                icon={<TrendingUp size={20} />}
                                change={{
                                    value: `+${fundingSummary.shareAppreciation}%`,
                                    positive: true,
                                }}
                            />
                            <StatsCard
                                title="Total Investors"
                                value={String(investorDetails.length - 1)}
                                icon={<Users size={20} />}
                                change={{ value: '+2', positive: true }}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <ChartCard
                                title="Projected Revenue (Next 6 Months)"
                                data={chartData.sharePrice}
                                dataKey="value"
                                color="hsl(var(--highlight))"
                                type="area"
                                height={250}
                            />

                            <ChartCard
                                title="Share Price History"
                                data={chartData.sharePrice}
                                dataKey="value"
                                color="hsl(var(--primary))"
                                type="line"
                                height={300}
                            />
                        </div>

                        <Card className="glass-card hover-glow">
                            <CardHeader>
                                <CardTitle className="text-md font-medium">
                                    Investment Rounds Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <div className="text-sm font-medium">Series A</div>
                                            <div className="text-sm font-medium">$350,000</div>
                                        </div>
                                        <Progress value={32} className="h-1 bg-muted" />
                                    </div>
                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <div className="text-sm font-medium">
                                                Grocery Expansion
                                            </div>
                                            <div className="text-sm font-medium">$300,000</div>
                                        </div>
                                        <Progress value={28} className="h-1 bg-muted" />
                                    </div>
                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <div className="text-sm font-medium">Supply Chain</div>
                                            <div className="text-sm font-medium">$180,000</div>
                                        </div>
                                        <Progress value={17} className="h-1 bg-muted" />
                                    </div>
                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <div className="text-sm font-medium">Store Network</div>
                                            <div className="text-sm font-medium">$250,000</div>
                                        </div>
                                        <Progress value={23} className="h-1 bg-muted" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <InvestmentTable investments={sampleInvestments} />
                    </TabsContent>

                    <TabsContent value="investors" className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <StatsCard
                                title="Investor Count"
                                value={String(investorDetails.length - 1)}
                                icon={<Users size={20} />}
                            />
                            <StatsCard
                                title="Board Seats"
                                value="3"
                                icon={<UserPlus size={20} />}
                            />
                            <StatsCard
                                title="Avg. Investment"
                                value={`$${(fundingSummary.totalInvestment / (investorDetails.length - 1)).toLocaleString()}`}
                                icon={<DollarSign size={20} />}
                            />
                        </div>

                        <Card className="glass-card hover-glow">
                            <CardHeader>
                                <CardTitle className="text-md font-medium">
                                    Investor Directory
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Investor</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Ownership</TableHead>
                                            <TableHead>Investment</TableHead>
                                            <TableHead>Board Seat</TableHead>
                                            <TableHead>Join Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {investorDetails
                                            .filter((inv) => inv.id !== '6')
                                            .map((investor) => (
                                                <TableRow key={investor.id}>
                                                    <TableCell className="font-medium">
                                                        {investor.name}
                                                    </TableCell>
                                                    <TableCell>{investor.type}</TableCell>
                                                    <TableCell>{investor.percentOwnership}%</TableCell>
                                                    <TableCell>
                                                        ${investor.investmentTotal.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {investor.boardSeat ? 'Yes' : 'No'}
                                                    </TableCell>
                                                    <TableCell>{formatDate(investor.joinDate)}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {investorDetails
                                .filter((inv) => inv.id !== '6')
                                .map((investor) => (
                                    <Card key={investor.id} className="glass-card hover-glow">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg font-medium">
                                                    {investor.name}
                                                </CardTitle>
                                                <Badge
                                                    variant={investor.boardSeat ? 'default' : 'outline'}
                                                >
                                                    {investor.boardSeat ? 'Board Member' : 'Investor'}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Type
                                                        </p>
                                                        <p className="text-xs font-medium">
                                                            {investor.type}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Focus Area
                                                        </p>
                                                        <p className="text-xs font-medium">
                                                            {investor.focus}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Shares Owned
                                                        </p>
                                                        <p className="text-xs font-medium">
                                                            {investor.sharesOwned.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Ownership
                                                        </p>
                                                        <p className="text-xs font-medium">
                                                            {investor.percentOwnership}%
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Total Investment
                                                        </p>
                                                        <p className="text-xs font-medium">
                                                            ${investor.investmentTotal.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Portfolio Companies
                                                        </p>
                                                        <p className="text-xs font-medium">
                                                            {investor.portfolioCompanies}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Representative
                                                    </p>
                                                    <p className="text-xs font-medium">
                                                        {investor.representative}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Location
                                                    </p>
                                                    <p className="text-xs font-medium">
                                                        {investor.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="rounds" className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <StatsCard
                                title="Funding Rounds"
                                value={fundingSummary.fundingRounds.toString()}
                                icon={<PieChartIcon size={20} />}
                            />
                            <StatsCard
                                title="Total Raised"
                                value={`$${fundingSummary.totalInvestment.toLocaleString()}`}
                                icon={<Coins size={20} />}
                            />
                            <StatsCard
                                title="Next Round Target"
                                value={`$${fundingSummary.nextRoundTarget.toLocaleString()}`}
                                icon={<Target size={20} />}
                            />
                            <StatsCard
                                title="Est. Next Share Price"
                                value={`$${fundingSummary.nextRoundEstimatedPrice.toFixed(2)}`}
                                icon={<TrendingUp size={20} />}
                                change={{ value: '+18.5%', positive: true }}
                            />
                        </div>

                        <ChartCard
                            title="Investment by Round"
                            data={chartData.investmentRounds}
                            type="bar"
                            dataKey="value"
                            color="hsl(var(--highlight))"
                            height={300}
                        />

                        <Card className="glass-card hover-glow">
                            <CardHeader>
                                <CardTitle className="text-md font-medium">
                                    Funding Rounds Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Round</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Amount Raised</TableHead>
                                            <TableHead>Share Price</TableHead>
                                            <TableHead>Shares Issued</TableHead>
                                            <TableHead>Lead Investor</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">Series A</TableCell>
                                            <TableCell>Jan 2023</TableCell>
                                            <TableCell>$350,000</TableCell>
                                            <TableCell>$5.25</TableCell>
                                            <TableCell>66,666</TableCell>
                                            <TableCell>Fresh Foods Capital</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">
                                                Grocery Expansion
                                            </TableCell>
                                            <TableCell>Apr 2023</TableCell>
                                            <TableCell>$300,000</TableCell>
                                            <TableCell>$6.00</TableCell>
                                            <TableCell>50,000</TableCell>
                                            <TableCell>Sustainable Markets Fund</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">
                                                Store Network
                                            </TableCell>
                                            <TableCell>Jun 2023</TableCell>
                                            <TableCell>$250,000</TableCell>
                                            <TableCell>$6.50</TableCell>
                                            <TableCell>38,462</TableCell>
                                            <TableCell>Farm-to-Table Investors</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">
                                                Series B (Planned)
                                            </TableCell>
                                            <TableCell>Q4 2023</TableCell>
                                            <TableCell>$500,000 (target)</TableCell>
                                            <TableCell>~$8.00 (est.)</TableCell>
                                            <TableCell>~62,500 (est.)</TableCell>
                                            <TableCell>TBD</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <Card className="glass-card hover-glow">
                            <CardHeader>
                                <CardTitle className="text-md font-medium">
                                    Funding Milestones & Goals
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium">
                                            Series A (Completed)
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            Initial funding to establish the first two store locations
                                            and core operations.
                                        </p>
                                        <div className="mt-2 flex items-center gap-4">
                                            <Badge variant="success">Completed</Badge>
                                            <span className="text-sm text-muted-foreground">
                                                Jan 2023
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium">
                                            Grocery Expansion (Completed)
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            Funding for expanding product lines and opening two
                                            additional locations.
                                        </p>
                                        <div className="mt-2 flex items-center gap-4">
                                            <Badge variant="success">Completed</Badge>
                                            <span className="text-sm text-muted-foreground">
                                                Apr 2023
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium">
                                            Store Network (Completed)
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            Capital for establishing regional presence with three more
                                            stores.
                                        </p>
                                        <div className="mt-2 flex items-center gap-4">
                                            <Badge variant="success">Completed</Badge>
                                            <span className="text-sm text-muted-foreground">
                                                Jun 2023
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium">Series B (Planned)</h3>
                                        <p className="text-xs text-muted-foreground">
                                            Strategic growth funding for technology infrastructure,
                                            supply chain optimization, and metropolitan market entry.
                                        </p>
                                        <div className="mt-2 flex items-center gap-4">
                                            <Badge variant="outline">Upcoming</Badge>
                                            <span className="text-sm text-muted-foreground">
                                                Q4 2023
                                            </span>
                                        </div>
                                        <div className="mt-4">
                                            <Button size="sm">Begin Preparations</Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="shares" className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <StatsCard
                                title="Total Shares"
                                value={fundingSummary.totalShares.toLocaleString()}
                                icon={<BarChart3 size={20} />}
                            />
                            <StatsCard
                                title="Current Share Price"
                                value={`$${fundingSummary.currentSharePrice.toFixed(2)}`}
                                icon={<DollarSign size={20} />}
                                change={{
                                    value: `+${fundingSummary.shareAppreciation}%`,
                                    positive: true,
                                }}
                            />
                            <StatsCard
                                title="Initial Share Price"
                                value={`$${fundingSummary.initialSharePrice.toFixed(2)}`}
                                icon={<PieChartLucide size={20} />}
                            />
                            <StatsCard
                                title="Value Appreciation"
                                value={`${fundingSummary.shareAppreciation}%`}
                                icon={<TrendingUp size={20} />}
                                change={{ value: 'Since founding', positive: true }}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <ChartCard
                                title="Share Price History"
                                data={chartData.sharePrice}
                                dataKey="value"
                                color="hsl(var(--highlight))"
                                type="line"
                                height={300}
                            />

                            <ChartCard
                                title="Projected Revenue (Next 6 Months)"
                                data={chartData.sharePrice}
                                dataKey="value"
                                color="hsl(var(--highlight))"
                                type="area"
                                height={250}
                            />
                        </div>

                        <Card className="glass-card hover-glow">
                            <CardHeader>
                                <CardTitle className="text-md font-medium">
                                    Share Distribution Table
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Shareholder</TableHead>
                                            <TableHead className="text-right">Shares</TableHead>
                                            <TableHead className="text-right">Percentage</TableHead>
                                            <TableHead className="text-right">Value ($)</TableHead>
                                            <TableHead>Type</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {investorDetails.map((investor) => (
                                            <TableRow key={investor.id}>
                                                <TableCell className="font-medium">
                                                    {investor.name}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {investor.sharesOwned.toLocaleString()}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {investor.percentOwnership}%
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    $
                                                    {(
                                                        investor.sharesOwned *
                                                        fundingSummary.currentSharePrice
                                                    ).toLocaleString()}
                                                </TableCell>
                                                <TableCell>{investor.type}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell className="font-medium">Total</TableCell>
                                            <TableCell className="text-right">
                                                {fundingSummary.totalShares.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right">100%</TableCell>
                                            <TableCell className="text-right">
                                                $
                                                {(
                                                    fundingSummary.totalShares *
                                                    fundingSummary.currentSharePrice
                                                ).toLocaleString()}
                                            </TableCell>
                                            <TableCell>-</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <Card className="glass-card hover-glow">
                            <CardHeader>
                                <CardTitle className="text-md font-medium">
                                    Share Issuance History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Event</TableHead>
                                            <TableHead className="text-right">
                                                Shares Issued
                                            </TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead className="text-right">
                                                Capital Raised
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Jan 1, 2023</TableCell>
                                            <TableCell>Founding Shares</TableCell>
                                            <TableCell className="text-right">45,000</TableCell>
                                            <TableCell className="text-right">$5.00</TableCell>
                                            <TableCell className="text-right">$225,000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Jan 10, 2023</TableCell>
                                            <TableCell>Series A (First Tranche)</TableCell>
                                            <TableCell className="text-right">38,095</TableCell>
                                            <TableCell className="text-right">$5.25</TableCell>
                                            <TableCell className="text-right">$200,000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Jan 18, 2023</TableCell>
                                            <TableCell>Series A (Second Tranche)</TableCell>
                                            <TableCell className="text-right">28,571</TableCell>
                                            <TableCell className="text-right">$5.25</TableCell>
                                            <TableCell className="text-right">$150,000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Apr 5, 2023</TableCell>
                                            <TableCell>Grocery Expansion Round</TableCell>
                                            <TableCell className="text-right">50,000</TableCell>
                                            <TableCell className="text-right">$6.00</TableCell>
                                            <TableCell className="text-right">$300,000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Apr 22, 2023</TableCell>
                                            <TableCell>Supply Chain Investment</TableCell>
                                            <TableCell className="text-right">30,000</TableCell>
                                            <TableCell className="text-right">$6.00</TableCell>
                                            <TableCell className="text-right">$180,000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Jun 14, 2023</TableCell>
                                            <TableCell>Store Network Funding</TableCell>
                                            <TableCell className="text-right">38,462</TableCell>
                                            <TableCell className="text-right">$6.50</TableCell>
                                            <TableCell className="text-right">$250,000</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2} className="font-medium">
                                                Total
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                {fundingSummary.totalShares.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right">-</TableCell>
                                            <TableCell className="text-right font-medium">
                                                $
                                                {(
                                                    fundingSummary.totalInvestment + 225000
                                                ).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="allocation" className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <StatsCard
                                title="Total Capital"
                                value={`$${(fundingSummary.totalInvestment + 225000).toLocaleString()}`}
                                icon={<DollarSign size={20} />}
                            />
                            <StatsCard
                                title="Allocated Capital"
                                value={`$${chartData.capitalAllocation.reduce((sum, item) => sum + item.value, 0).toLocaleString()}`}
                                icon={<PieChartIcon size={20} />}
                            />
                            <StatsCard
                                title="Monthly Burn Rate"
                                value={`$${fundingSummary.burnRate.toLocaleString()}`}
                                icon={<TrendingUp size={20} />}
                                change={{
                                    value: `${fundingSummary.runway} runway`,
                                    positive: true,
                                }}
                            />
                        </div>

                        <ChartCard
                            title="Capital Allocation"
                            data={chartData.capitalAllocation}
                            type="bar"
                            dataKey="value"
                            color="hsl(var(--primary))"
                            height={300}
                        />

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <Card className="glass-card hover-glow">
                                <CardHeader>
                                    <CardTitle className="text-md font-medium">
                                        Capital Allocation Breakdown
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Category</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                                <TableHead className="text-right">Percentage</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {chartData.capitalAllocation.map((item) => (
                                                <TableRow key={item.name}>
                                                    <TableCell className="font-medium">
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        ${item.value.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {(
                                                            (item.value /
                                                                chartData.capitalAllocation.reduce(
                                                                    (sum, i) => sum + i.value,
                                                                    0,
                                                                )) *
                                                            100
                                                        ).toFixed(1)}
                                                        %
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell className="font-medium">Total</TableCell>
                                                <TableCell className="text-right font-medium">
                                                    $
                                                    {chartData.capitalAllocation
                                                        .reduce((sum, item) => sum + item.value, 0)
                                                        .toLocaleString()}
                                                </TableCell>
                                                <TableCell className="text-right font-medium">
                                                    100%
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <Card className="glass-card hover-glow">
                                <CardHeader>
                                    <CardTitle className="text-md font-medium">
                                        Capital Allocation Distribution
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-center">
                                    <div style={{ height: 300, width: '100%' }}>
                                    <ChartCard
                title="Projected"
                data={chartData.sharePrice}
                dataKey="value"
                color="hsl(var(--highlight))"
                type="area"
                height={250}
              />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="glass-card hover-glow">
                            <CardHeader>
                                <CardTitle className="text-md font-medium">
                                    Investment Performance Metrics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Return on Investment (ROI)
                                            </p>
                                            <p className="text-2xl font-semibold">24.3%</p>
                                            <p className="text-sm text-muted-foreground">
                                                Annual projected
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Cash-on-Cash Return
                                            </p>
                                            <p className="text-2xl font-semibold">17.8%</p>
                                            <p className="text-sm text-muted-foreground">
                                                Annual projected
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Internal Rate of Return (IRR)
                                            </p>
                                            <p className="text-2xl font-semibold">22.1%</p>
                                            <p className="text-sm text-muted-foreground">
                                                5-year projection
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Payback Period
                                            </p>
                                            <p className="text-2xl font-semibold">3.2 years</p>
                                            <p className="text-sm text-muted-foreground">Estimated</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Break-even Analysis
                                            </p>
                                            <p className="text-2xl font-semibold">Q1 2024</p>
                                            <p className="text-sm text-muted-foreground">Projected</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Capital Efficiency Ratio
                                            </p>
                                            <p className="text-2xl font-semibold">1.8x</p>
                                            <p className="text-sm text-muted-foreground">
                                                Revenue / Capital
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    )
}

export default InvestmentsPage
