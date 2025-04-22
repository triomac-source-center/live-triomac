
import React from "react";
import { Card } from "@/components/businesscomponents//ui/card";
import { Badge } from "@/components/businesscomponents/ui/badge";
import { Store, ChevronRight, Truck, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/businesscomponents/ui/button";

export interface Business {
  id: string;
  name: string;
  type: string;
  locations: number;
  revenue: string;
  customers: number;
  employees: number;
  status: "active" | "pending" | "inactive";
  logoIcon: React.ReactNode;
}

interface BusinessBannerProps {
  business: Business;
  onClick?: (business: Business) => void;
  className?: string;
}

const BusinessBanner: React.FC<BusinessBannerProps> = ({
  business,
  onClick,
  className,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(business);
    }
  };

  return (
    <Card 
      className={cn(
        "p-4 transition-all hover:shadow-md cursor-pointer bg-grayview border-gray-800", 
        business.status === "inactive" && "opacity-60",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-4 w-4 rounded flex items-center justify-center bg-greenmade border border-gray-800 text-greenmade">
            {business.logoIcon}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm">{business.name}</h3>
              <Badge variant={
                business.status === "active" ? "success" : 
                business.status === "pending" ? "warning" : "default"
              }>
                {business.status}
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">{business.type}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <Store size={16} className="text-gray-700 text-xs" />
            <span className="text-gray-400 text-xs">{business.locations} locations</span>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingCart size={16} className="text-gray-700 text-xs" />
            <span className="text-gray-400 text-xs">{business.revenue}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} className="text-gray-700 text-xs" />
            <span className="text-gray-400 text-xs">{business.employees} employees</span>
          </div>
        </div>

        <Button variant="ghost" size="icon">
          <ChevronRight className="text-gray-700" />
        </Button>
      </div>
    </Card>
  );
};

interface BusinessBannerListProps {
  businesses: Business[];
  onSelectBusiness?: (business: Business) => void;
  className?: string;
}

const BusinessBannerList: React.FC<BusinessBannerListProps> = ({
  businesses,
  onSelectBusiness,
  className,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      <h2 className="text-xl font-semibold text-gray-300">Your Businesses</h2>
      {businesses.length === 0 ? (
        <Card className="p-8 text-center">
          <Store size={40} className="mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium text-lg">No businesses yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first business to get started
          </p>
          <Button>Create Business</Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {businesses.map((business) => (
            <BusinessBanner
              key={business.id}
              business={business}
              onClick={onSelectBusiness}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { BusinessBanner, BusinessBannerList };
