
import React from "react";
import { X, ShoppingCart, Carrot, Store, Apple, Banana } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/businesscomponents/ui/button";

interface BusinessNotificationBannerProps {
  companyName: string;
  businessType: string;
  onClose: () => void;
  onViewDashboard: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const BusinessNotificationBanner: React.FC<BusinessNotificationBannerProps> = ({
  companyName,
  businessType,
  onClose,
  onViewDashboard,
  className,
  icon = <Store size={20} />
}) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between w-full p-4 rounded-lg bg-primary/10 border border-primary/20 gap-3 bg-grayview",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-4 w-4 rounded-full bg-greenmade flex items-center justify-center text-greenmade">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-sm text-gray-100">Virtual Grocery Business</h3>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">{companyName}</span> - {businessType}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={onViewDashboard} className="w-full sm:w-auto bg-grayview text-gray-300">
          <ShoppingCart size={16} className="mr-2 text-gray-300" /> View Dashboard
        </Button>
        <Button size="sm" variant="ghost" onClick={onClose} className="flex-shrink-0">
          <X size={16} />
        </Button>
      </div>
    </div>
  );
};

export default BusinessNotificationBanner;
