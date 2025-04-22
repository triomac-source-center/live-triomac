"use client"

import React, { useState } from "react";
import MainLayout from "@/components/businesscomponents/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/businesscomponents/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/businesscomponents/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/businesscomponents/ui/table";
import { Badge } from "@/components/businesscomponents/ui/badge";
import {
  Users,
  UserPlus,
  User,
  HandCoins,
  Percent,
  Share,
  Handshake,
  Briefcase,
  Clock,
  Calendar,
  Building,
  FileSpreadsheet,
  UserCheck
} from "lucide-react";
import StatsCard from "@/components/businesscomponents/Dashboard/StatsCard";
import ShareholderTable, { Shareholder } from "@/components/businesscomponents/Dashboard/ShareholderTable";

interface ExtendedShareholder extends Shareholder {
  role?: string;
  background?: string;
  representative?: string;
  focus?: string;
  investmentHistory?: { date: string; amount: number; shares: number; }[];
  manager?: string;
  allocation?: string;
}

const shareholders: ExtendedShareholder[] = [
  {
    id: "1",
    name: "Robert Anderson",
    shares: 215000,
    percentage: 21.5,
    joinedDate: "2018-03-15",
    type: "individual",
    contactInfo: {
      email: "r.anderson@example.com",
      phone: "(555) 123-4567"
    },
    role: "Founder",
    background: "Former grocery chain executive",
    investmentHistory: [
      { date: "2018-03-15", amount: 850000, shares: 170000 },
      { date: "2020-07-10", amount: 225000, shares: 45000 }
    ]
  },
  {
    id: "2",
    name: "Evergreen Capital",
    shares: 200000,
    percentage: 20.0,
    joinedDate: "2018-06-22",
    type: "institutional",
    contactInfo: {
      email: "investments@evergreencapital.com",
      phone: "(555) 987-6543"
    },
    representative: "Sarah Johnson",
    focus: "Sustainable retail investments",
    investmentHistory: [
      { date: "2018-06-22", amount: 1000000, shares: 200000 }
    ]
  },
  {
    id: "3",
    name: "Maya Williams",
    shares: 175000,
    percentage: 17.5,
    joinedDate: "2018-03-15",
    type: "individual",
    contactInfo: {
      email: "m.williams@example.com",
      phone: "(555) 234-5678"
    },
    role: "Co-Founder",
    background: "Supply chain management specialist",
    investmentHistory: [
      { date: "2018-03-15", amount: 750000, shares: 150000 },
      { date: "2021-02-18", amount: 125000, shares: 25000 }
    ]
  },
  {
    id: "4",
    name: "Fresh Foods Ventures",
    shares: 150000,
    percentage: 15.0,
    joinedDate: "2019-05-10",
    type: "institutional",
    contactInfo: {
      email: "investments@freshfoodsvc.com",
      phone: "(555) 876-5432"
    },
    representative: "Carlos Mendez",
    focus: "Food industry investments",
    investmentHistory: [
      { date: "2019-05-10", amount: 750000, shares: 150000 }
    ]
  },
  {
    id: "5",
    name: "Neighborhood Partners Fund",
    shares: 100000,
    percentage: 10.0,
    joinedDate: "2020-11-05",
    type: "institutional",
    contactInfo: {
      email: "info@npfund.com",
      phone: "(555) 345-6789"
    },
    representative: "Elena Rodriguez",
    focus: "Community-based businesses",
    investmentHistory: [
      { date: "2020-11-05", amount: 500000, shares: 100000 }
    ]
  },
  {
    id: "6",
    name: "David Chen",
    shares: 85000,
    percentage: 8.5,
    joinedDate: "2019-08-23",
    type: "individual",
    contactInfo: {
      email: "d.chen@example.com",
      phone: "(555) 456-7890"
    },
    role: "Angel Investor",
    background: "Tech entrepreneur with interest in retail innovation",
    investmentHistory: [
      { date: "2019-08-23", amount: 425000, shares: 85000 }
    ]
  },
  {
    id: "7",
    name: "Employee Stock Pool",
    shares: 50000,
    percentage: 5.0,
    joinedDate: "2021-01-01",
    type: "pool",
    contactInfo: {
      email: "hr@yourgrocery.com",
      phone: "(555) 567-8901"
    },
    manager: "HR Department",
    allocation: "Distributed among 15 key employees"
  },
  {
    id: "8",
    name: "Jennifer Lee",
    shares: 25000,
    percentage: 2.5,
    joinedDate: "2021-06-15",
    type: "individual",
    contactInfo: {
      email: "j.lee@example.com",
      phone: "(555) 678-9012"
    },
    role: "Strategic Advisor",
    background: "Marketing executive in consumer goods",
    investmentHistory: [
      { date: "2021-06-15", amount: 125000, shares: 25000 }
    ]
  }
];

const shareholderVotingRights = [
  { id: "1", name: "Robert Anderson", votingRights: 25.0, category: "Founder" },
  { id: "2", name: "Evergreen Capital", votingRights: 20.0, category: "Institutional" },
  { id: "3", name: "Maya Williams", votingRights: 20.0, category: "Co-Founder" },
  { id: "4", name: "Fresh Foods Ventures", votingRights: 15.0, category: "Institutional" },
  { id: "5", name: "Neighborhood Partners Fund", votingRights: 10.0, category: "Institutional" },
  { id: "6", name: "David Chen", votingRights: 7.5, category: "Individual" },
  { id: "7", name: "Employee Stock Pool", votingRights: 0.0, category: "Pool" },
  { id: "8", name: "Jennifer Lee", votingRights: 2.5, category: "Individual" }
];

const shareholderAgreements = [
  {
    id: "1",
    title: "Founders' Agreement",
    parties: ["Robert Anderson", "Maya Williams"],
    date: "2018-03-15",
    keyTerms: [
      "5-year vesting schedule with 1-year cliff",
      "Right of first refusal on share sales",
      "Non-compete clause for 2 years post-exit"
    ],
    status: "Active"
  },
  {
    id: "2",
    title: "Series A Investment Agreement",
    parties: ["Evergreen Capital", "Fresh Foods Ventures"],
    date: "2019-05-10",
    keyTerms: [
      "Board representation (1 seat each)",
      "Anti-dilution protection",
      "Information rights and quarterly reporting",
      "Participation rights in future rounds"
    ],
    status: "Active"
  },
  {
    id: "3",
    title: "Employee Stock Option Plan",
    parties: ["Company", "Employees"],
    date: "2021-01-01",
    keyTerms: [
      "4-year vesting with 1-year cliff",
      "Exercise window of 90 days post-termination",
      "Accelerated vesting on acquisition"
    ],
    status: "Active"
  },
  {
    id: "4",
    title: "Strategic Investor Agreement",
    parties: ["David Chen", "Jennifer Lee"],
    date: "2021-06-15",
    keyTerms: [
      "Advisory roles (minimum 10 hours/month)",
      "Tag-along rights",
      "Strategic introductions obligation"
    ],
    status: "Active"
  },
  {
    id: "5",
    title: "Community Impact Investment",
    parties: ["Neighborhood Partners Fund"],
    date: "2020-11-05",
    keyTerms: [
      "Quarterly community impact reporting",
      "Local hiring commitments (25% of new hires)",
      "Environmental sustainability targets"
    ],
    status: "Active"
  }
];

const capitalStructure = [
  { class: "Common Stock (Class A)", shares: 440000, percentage: 44.0, votingRights: "1 vote per share", description: "Founders, employees, and angel investors" },
  { class: "Preferred Stock (Series A)", shares: 350000, percentage: 35.0, votingRights: "1 vote per share", description: "Institutional investors with liquidation preference" },
  { class: "Preferred Stock (Series B)", shares: 160000, percentage: 16.0, votingRights: "1 vote per share", description: "Later stage investors with participation rights" },
  { class: "Options Pool (Unallocated)", shares: 50000, percentage: 5.0, votingRights: "No voting rights", description: "Reserved for future employees and advisors" }
];

const shareholderMeetings = [
  {
    id: "1",
    date: "2023-04-15",
    type: "Annual",
    keyDecisions: [
      "Approved annual financial statements",
      "Re-elected board members",
      "Increased authorized share capital"
    ],
    attendance: "87% of voting shares represented",
    minutes: "Available in secure shareholder portal"
  },
  {
    id: "2",
    date: "2023-09-22",
    type: "Special",
    keyDecisions: [
      "Approved new grocery store location expansion",
      "Authorized additional $2M in capital expenditure",
      "Updated corporate bylaws"
    ],
    attendance: "92% of voting shares represented",
    minutes: "Available in secure shareholder portal"
  },
  {
    id: "3",
    date: "2022-04-10",
    type: "Annual",
    keyDecisions: [
      "Approved annual financial statements",
      "Approved 3% dividend distribution",
      "Updated corporate governance policies"
    ],
    attendance: "85% of voting shares represented",
    minutes: "Available in secure shareholder portal"
  },
  {
    id: "4",
    date: "2022-07-18",
    type: "Special",
    keyDecisions: [
      "Approved acquisition of local supplier",
      "Authorized $1.5M for supply chain improvements",
      "Expanded board from 5 to 7 members"
    ],
    attendance: "90% of voting shares represented",
    minutes: "Available in secure shareholder portal"
  }
];

const ShareholdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const totalShares = shareholders.reduce((sum, shareholder) => sum + shareholder.shares, 0);
  const totalInvestors = shareholders.length;
  const institutionalInvestors = shareholders.filter(s => s.type === "institutional").length;
  const individualInvestors = shareholders.filter(s => s.type === "individual" || s.type === "pool").length;
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Shareholders</h1>
          <p className="text-muted-foreground">
            Manage and view details about your business shareholders, equity distribution, and corporate governance.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Shareholder Details</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="agreements">Agreements</TabsTrigger>
            <TabsTrigger value="structure">Capital Structure</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Shareholders"
                value={String(totalInvestors)}
                icon={<Users size={20} />}
                change={{ value: "+1", positive: true }}
              />
              <StatsCard
                title="Institutional Investors"
                value={String(institutionalInvestors)}
                icon={<Building size={20} />}
                change={{ value: "0", positive: true }}
              />
              <StatsCard
                title="Individual Investors"
                value={String(individualInvestors)}
                icon={<User size={20} />}
                change={{ value: "+1", positive: true }}
              />
              <StatsCard
                title="Total Shares"
                value={totalShares.toLocaleString()}
                icon={<Share size={20} />}
                change={{ value: "0%", positive: true }}
              />
            </div>
            
            <ShareholderTable shareholders={shareholders} />

            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="text-md font-medium">Ownership Distribution by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Shareholders</TableHead>
                      <TableHead className="text-right">Shares</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Founder/Co-Founder</TableCell>
                      <TableCell className="text-right">2</TableCell>
                      <TableCell className="text-right">390,000</TableCell>
                      <TableCell className="text-right">39.0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Institutional</TableCell>
                      <TableCell className="text-right">3</TableCell>
                      <TableCell className="text-right">450,000</TableCell>
                      <TableCell className="text-right">45.0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Individual Investors</TableCell>
                      <TableCell className="text-right">2</TableCell>
                      <TableCell className="text-right">110,000</TableCell>
                      <TableCell className="text-right">11.0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Employee Pool</TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right">50,000</TableCell>
                      <TableCell className="text-right">5.0%</TableCell>
                    </TableRow>
                    <TableRow className="font-semibold">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">8</TableCell>
                      <TableCell className="text-right">1,000,000</TableCell>
                      <TableCell className="text-right">100.0%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatsCard
                title="Founding Investors"
                value="2"
                icon={<UserCheck size={20} />}
              />
              <StatsCard
                title="Avg. Holding"
                value="125,000"
                icon={<Briefcase size={20} />}
              />
              <StatsCard
                title="Latest Investment"
                value="Jun 2021"
                icon={<Clock size={20} />}
              />
            </div>
            
            <div className="space-y-6">
              {shareholders.map((shareholder) => (
                <Card key={shareholder.id} className="glass-card hover-glow">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>{shareholder.name}</CardTitle>
                        <CardDescription>
                          {shareholder.type === "individual" ? 
                            shareholder.role : 
                            (shareholder.type === "institutional" ? 
                              `Institutional Investor - ${shareholder.focus || ''}` : 
                              "Employee Stock Pool")}
                        </CardDescription>
                      </div>
                      <Badge variant={shareholder.type === "individual" ? "default" : 
                            (shareholder.type === "institutional" ? "highlight" : "outline")}>
                        {shareholder.type === "individual" ? "Individual" : 
                        (shareholder.type === "institutional" ? "Institutional" : "Pool")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Shares Owned</p>
                        <p className="font-medium">{shareholder.shares.toLocaleString()} shares ({shareholder.percentage}%)</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Joined Date</p>
                        <p className="font-medium">{formatDate(shareholder.joinedDate)}</p>
                      </div>
                    </div>

                    {shareholder.type === "individual" && shareholder.background && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Background</p>
                        <p>{shareholder.background}</p>
                      </div>
                    )}

                    {shareholder.type === "institutional" && shareholder.representative && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Representative</p>
                        <p>{shareholder.representative}</p>
                      </div>
                    )}

                    {shareholder.type === "pool" && shareholder.allocation && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Allocation</p>
                        <p>{shareholder.allocation}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Investment History</p>
                      {shareholder.investmentHistory ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                              <TableHead className="text-right">Shares</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {shareholder.investmentHistory.map((investment, index) => (
                              <TableRow key={index}>
                                <TableCell>{formatDate(investment.date)}</TableCell>
                                <TableCell className="text-right">${investment.amount.toLocaleString()}</TableCell>
                                <TableCell className="text-right">{investment.shares.toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <p>No investment history available</p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Contact Information</p>
                      <p>Email: {shareholder.contactInfo.email}</p>
                      <p>Phone: {shareholder.contactInfo.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatsCard
                title="Voting Shareholders"
                value="7"
                icon={<Handshake size={20} />}
              />
              <StatsCard
                title="Board Members"
                value="7"
                icon={<Users size={20} />}
              />
              <StatsCard
                title="Next Meeting"
                value="Apr 15, 2024"
                icon={<Calendar size={20} />}
              />
            </div>

            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="text-md font-medium">Voting Rights Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shareholder</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Voting Rights</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shareholderVotingRights.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">{item.votingRights.toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="text-md font-medium">Shareholder Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Key Decisions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shareholderMeetings.map((meeting) => (
                      <TableRow key={meeting.id}>
                        <TableCell className="font-medium">{meeting.date}</TableCell>
                        <TableCell>
                          <Badge variant={meeting.type === "Annual" ? "default" : "highlight"}>
                            {meeting.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{meeting.attendance}</TableCell>
                        <TableCell>
                          <ul className="list-disc list-inside">
                            {meeting.keyDecisions.map((decision, index) => (
                              <li key={index} className="text-sm">{decision}</li>
                            ))}
                          </ul>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="agreements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatsCard
                title="Total Agreements"
                value={String(shareholderAgreements.length)}
                icon={<FileSpreadsheet size={20} />}
              />
              <StatsCard
                title="Active Agreements"
                value={String(shareholderAgreements.filter(a => a.status === "Active").length)}
                icon={<Handshake size={20} />}
              />
              <StatsCard
                title="Latest Agreement"
                value="Jun 2021"
                icon={<Calendar size={20} />}
              />
            </div>

            <div className="space-y-6">
              {shareholderAgreements.map((agreement) => (
                <Card key={agreement.id} className="glass-card hover-glow">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{agreement.title}</CardTitle>
                      <Badge variant="outline">{agreement.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                      <p>{agreement.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Parties</p>
                      <div className="flex flex-wrap gap-2">
                        {agreement.parties.map((party, index) => (
                          <Badge key={index} variant="secondary">{party}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Key Terms</p>
                      <ul className="list-disc list-inside space-y-1">
                        {agreement.keyTerms.map((term, index) => (
                          <li key={index}>{term}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="structure" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatsCard
                title="Share Classes"
                value="3"
                icon={<Share size={20} />}
              />
              <StatsCard
                title="Common Shares"
                value="440,000"
                icon={<UserCheck size={20} />}
              />
              <StatsCard
                title="Preferred Shares"
                value="510,000"
                icon={<Percent size={20} />}
              />
            </div>

            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="text-md font-medium">Capital Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead className="text-right">Shares</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                      <TableHead>Voting Rights</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {capitalStructure.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.class}</TableCell>
                        <TableCell className="text-right">{item.shares.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{item.percentage.toFixed(1)}%</TableCell>
                        <TableCell>{item.votingRights}</TableCell>
                        <TableCell>{item.description}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-semibold">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">1,000,000</TableCell>
                      <TableCell className="text-right">100.0%</TableCell>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="text-md font-medium">Share Rights & Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Share Class</TableHead>
                      <TableHead>Liquidation Preference</TableHead>
                      <TableHead>Conversion Rights</TableHead>
                      <TableHead>Anti-Dilution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Common Stock (Class A)</TableCell>
                      <TableCell>None</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>None</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Preferred Stock (Series A)</TableCell>
                      <TableCell>1x with participation</TableCell>
                      <TableCell>Convertible to Common 1:1</TableCell>
                      <TableCell>Broad-based weighted average</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Preferred Stock (Series B)</TableCell>
                      <TableCell>1.5x non-participating</TableCell>
                      <TableCell>Convertible to Common 1:1</TableCell>
                      <TableCell>Full ratchet</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Options Pool</TableCell>
                      <TableCell>None</TableCell>
                      <TableCell>Convertible to Common upon exercise</TableCell>
                      <TableCell>None</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ShareholdersPage;
