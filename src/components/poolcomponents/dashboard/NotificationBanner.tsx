
import React from 'react';
import { Card } from "@/components/poolcomponents/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/poolcomponents/ui/alert";
import { TrendingUp, Bell, Info } from "lucide-react";

type NotificationBannerProps = {
  className?: string;
};

type MarketNotification = {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'new' | 'trending' | 'info';
};

const notifications: MarketNotification[] = [
  {
    id: 1,
    title: "New Triomen Release",
    description: "CryptoCollector Series #42 just launched with limited availability",
    date: "2h ago",
    type: "new"
  },
  {
    id: 2,
    title: "Market Trend Alert",
    description: "Developer-type Triomen demand increased by 24% in the last 48 hours",
    date: "5h ago",
    type: "trending"
  },
  {
    id: 3,
    title: "Limited Edition Drop",
    description: "Exclusive Triomen collaboration with DigitalArtists launching tomorrow",
    date: "8h ago",
    type: "info"
  },
  {
    id: 4,
    title: "Price Alert",
    description: "Collector's Edition prices stabilizing after recent volatility",
    date: "1d ago",
    type: "info"
  },
  {
    id: 5,
    title: "Trading Volume Spike",
    description: "Record trading volume for Triomen in the Investors category",
    date: "1d ago",
    type: "trending"
  }
];

const getNotificationIcon = (type: MarketNotification['type']) => {
  switch (type) {
    case 'new':
      return <Bell className="h-4 w-4 text-blue-400" />;
    case 'trending':
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    case 'info':
    default:
      return <Info className="h-4 w-4 text-purple-400" />;
  }
};

export default function NotificationBanner({ className }: NotificationBannerProps) {
  return (
    <Card className={`p-6 glass-card h-full overflow-auto ${className}`}>
      <h3 className="text-lg font-medium mb-2">Market Updates</h3>
      <p className="text-sm text-muted-foreground mb-4">Latest Triomen news and trends</p>
      
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Alert key={notification.id} className="border-muted bg-secondary/50">
            <div className="flex items-start">
              {getNotificationIcon(notification.type)}
              <div className="ml-3">
                <AlertTitle className="text-sm font-medium flex justify-between">
                  <span>{notification.title}</span>
                  <span className="text-xs text-muted-foreground">{notification.date}</span>
                </AlertTitle>
                <AlertDescription className="text-xs mt-1 text-muted-foreground">
                  {notification.description}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <button className="text-xs text-primary hover:underline">
          View all updates
        </button>
      </div>
    </Card>
  );
}
