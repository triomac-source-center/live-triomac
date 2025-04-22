"use client"
import React from "react";
import MainLayout from "@/components/businesscomponents/Layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/businesscomponents/ui/tabs";
import { Badge } from "@/components/businesscomponents/ui/badge";
import { 
  Building, 
  Briefcase, 
  Users, 
  Award, 
  Target, 
  ShoppingCart,
  MapPin, 
  Phone, 
  Mail,
  Globe,
  Calendar,
  Clock,
  Store,
  Truck,
  ShoppingBag,
  Carrot,
  Apple,
  Beef
} from "lucide-react";

const Company = () => {
  const [activeTab, setActiveTab] = React.useState("overview");
  
  // Sample company data - this would normally come from a database or API
  const companyData = {
    name: "Fresh Harvest",
    founded: "2020",
    description: "Fresh Harvest Groceries is a rapidly growing chain of premium grocery stores specializing in locally sourced organic produce, sustainable meat and seafood, and artisanal food products. Our mission is to make fresh, healthy food accessible to all communities while supporting local farmers and producers.",
    mission: "To provide communities with access to the freshest, highest quality foods while supporting sustainable farming practices and local producers.",
    vision: "To revolutionize grocery shopping by creating stores that serve as community hubs for food education, sustainability, and healthy living.",
    valuation: "$4.2 Million",
    monthlyRevenue: "$108,500",
    storeCount: 7,
    employeeCount: 142,
    headquarters: "Portland, Oregon",
    certifications: ["Certified Organic", "B Corporation", "Fair Trade Partner"],
    contact: {
      email: "info@freshharvestgroceries.com",
      phone: "(503) 555-1234",
      website: "www.freshharvestgroceries.com"
    },
    locations: [
      {
        name: "Downtown Portland",
        address: "123 Main Street, Portland, OR 97205",
        openingHours: "7am - 10pm Daily",
        sqft: 5200,
        openedDate: "Jan 2020"
      },
      {
        name: "East Village",
        address: "456 Market Ave, Portland, OR 97215",
        openingHours: "7am - 9pm Daily",
        sqft: 4800,
        openedDate: "Jul 2020"
      },
      {
        name: "Westside",
        address: "789 Pine Blvd, Portland, OR 97229",
        openingHours: "8am - 9pm Daily",
        sqft: 6100,
        openedDate: "Feb 2021"
      },
      {
        name: "Riverside",
        address: "321 Water St, Portland, OR 97217",
        openingHours: "7am - 10pm Daily",
        sqft: 5800,
        openedDate: "Sep 2021"
      },
      {
        name: "North Portland",
        address: "555 Evergreen Rd, Portland, OR 97203",
        openingHours: "8am - 9pm Daily",
        sqft: 4500,
        openedDate: "Mar 2022"
      },
      {
        name: "South Portland",
        address: "888 Cedar Ave, Portland, OR 97219",
        openingHours: "7am - 9pm Daily",
        sqft: 5100,
        openedDate: "Aug 2022"
      },
      {
        name: "Lake Oswego",
        address: "222 Lake View Dr, Lake Oswego, OR 97034",
        openingHours: "8am - 9pm Daily",
        sqft: 6300,
        openedDate: "Jan 2023"
      }
    ],
    departments: [
      {
        name: "Produce",
        products: 420,
        suppliers: 15,
        localSuppliers: 12,
        description: "Organic fruits and vegetables sourced from farms within 100 miles when possible."
      },
      {
        name: "Bakery",
        products: 85,
        suppliers: 6,
        localSuppliers: 5,
        description: "Fresh bread, pastries, and desserts baked in-store daily."
      },
      {
        name: "Meat & Seafood",
        products: 130,
        suppliers: 8,
        localSuppliers: 5,
        description: "Ethically raised meat and sustainably caught seafood."
      },
      {
        name: "Dairy & Eggs",
        products: 95,
        suppliers: 7,
        localSuppliers: 6,
        description: "Organic dairy products and free-range eggs from local farms."
      },
      {
        name: "Bulk Foods",
        products: 210,
        suppliers: 12,
        localSuppliers: 4,
        description: "Zero-waste shopping with bulk grains, nuts, spices, and more."
      },
      {
        name: "Prepared Foods",
        products: 75,
        suppliers: 3,
        localSuppliers: 3,
        description: "Ready-to-eat meals prepared fresh daily using our own ingredients."
      }
    ],
    sustainability: [
      "100% renewable energy in all store locations",
      "Zero food waste program that donates unsold food to local food banks",
      "Plastic-free packaging initiative",
      "Electric delivery vehicles",
      "Water conservation systems in all stores",
      "Community garden program supporting 12 neighborhood gardens"
    ],
    communityPrograms: [
      {
        name: "Cooking Classes",
        description: "Weekly classes teaching how to prepare healthy, seasonal meals",
        participants: "~450/month"
      },
      {
        name: "School Garden Initiative",
        description: "Supporting garden programs in 15 local schools",
        participants: "22 schools"
      },
      {
        name: "Food Donation Program",
        description: "Daily donation of unsold food to local shelters",
        impact: "~3,200 meals/month"
      },
      {
        name: "Farm Tours",
        description: "Monthly tours to local partner farms",
        participants: "~120/month"
      }
    ]
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold gradient-text text-gray-300">{companyData.name}</h1>
          <Badge className="text-sm py-1">Est. {companyData.founded}</Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="locations">Store Locations</TabsTrigger>
            <TabsTrigger value="products">Products & Departments</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="glass-card hover-glow bg-white">
              <CardHeader>
                <CardTitle>About Our Business</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm font-normal text-gray-500">{companyData.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-normal flex items-center gap-2">
                      <Target size={20} />
                      Our Mission
                    </h3>
                    <p className="font-normal text-gray-500 text-sm">{companyData.mission}</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-normal flex items-center gap-2">
                      <Award size={20} />
                      Our Vision
                    </h3>
                    <p className="font-normal text-gray-500 text-sm">{companyData.vision}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <ShoppingCart className="mx-auto mb-2" size={24} />
                    <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                    <p className="text-xl font-bold text-gray-300">{companyData.monthlyRevenue}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Store className="mx-auto mb-2" size={24} />
                    <p className="text-xs text-muted-foreground">Store Locations</p>
                    <p className="text-xl font-bold text-gray-300">{companyData.storeCount}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Users className="mx-auto mb-2" size={24} />
                    <p className="text-xs text-muted-foreground">Employees</p>
                    <p className="text-xl font-bold text-gray-300">{companyData.employeeCount}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <Building className="mx-auto mb-2" size={24} />
                    <p className="text-xs text-muted-foreground">Valuation</p>
                    <p className="text-xl font-bold text-gray-300">{companyData.valuation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-muted-foreground" />
                    <span className="text-xs font-normal text-gray-400">Headquarters: {companyData.headquarters}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-muted-foreground" />
                    <span className="text-xs font-normal text-gray-400">{companyData.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-muted-foreground" />
                    <span className="text-xs font-normal text-gray-400">{companyData.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={12} className="text-muted-foreground" />
                    <span className="text-xs font-normal text-gray-400">{companyData.contact.website}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-md font-medium">Certifications & Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {companyData.certifications.map((cert, index) => (
                      <Badge key={index} variant="success" className="py-1">
                        <Award size={14} className="mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <Card className="bg-gray-900 border-none hover-glow">
              <CardHeader>
                <CardTitle>Our {companyData.storeCount} Store Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companyData.locations.map((location, index) => (
                    <Card key={index} className="bg-grayview border-gray-800 hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{location.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 pt-0">
                        <div className="flex items-start gap-2">
                          <MapPin size={12} className="text-muted-foreground mt-1 flex-shrink-0" />
                          <span className="text-xs text-gray-400">{location.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={12} className="text-muted-foreground flex-shrink-0" />
                          <span className="text-xs text-gray-400">{location.openingHours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-muted-foreground flex-shrink-0" />
                          <span className="text-xs text-gray-400">Opened: {location.openedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Store size={12} className="text-muted-foreground flex-shrink-0" />
                          <span className="text-xs text-gray-400">{location.sqft.toLocaleString()} sq ft</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="bg-gray-900 border-none hover-glow">
              <CardHeader>
                <CardTitle>Our Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companyData.departments.map((dept, index) => (
                    <Card key={index} className="bg-grayview border-gray-800 hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm text-gray-200">{dept.name}</CardTitle>
                          {dept.name === "Produce" && <Carrot size={20} />}
                          {dept.name === "Bakery" && <Briefcase size={20} />}
                          {dept.name === "Meat & Seafood" && <Beef size={20} />}
                          {dept.name === "Dairy & Eggs" && <ShoppingBag size={20} />}
                          {dept.name === "Bulk Foods" && <Apple size={20} />}
                          {dept.name === "Prepared Foods" && <Truck size={20} />}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2 pt-0">
                        <p className="text-xs text-gray-400">{dept.description}</p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <div className="bg-muted/50 p-2 rounded text-center">
                            <p className="text-xs text-muted-foreground">Products</p>
                            <p className="font-semibold">{dept.products}</p>
                          </div>
                          <div className="bg-muted/50 p-2 rounded text-center">
                            <p className="text-xs text-muted-foreground">Local Suppliers</p>
                            <p className="font-semibold">{dept.localSuppliers}/{dept.suppliers}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-grayview border-gray-800 hover-glow">
                <CardHeader>
                  <CardTitle>Sustainability Initiatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {companyData.sustainability.map((initiative, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 text-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-400">{initiative}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-grayview border-gray-800 hover-glow">
                <CardHeader>
                  <CardTitle>Community Programs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {companyData.communityPrograms.map((program, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="font-normal text-sm">{program.name}</h4>
                      <p className="text-xs text-muted-foreground">{program.description}</p>
                      <p className="text-sm">
                        <span className="font-normal">Impact: </span>
                        {program.participants || program.impact}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Company;
