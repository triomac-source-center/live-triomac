
import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Toaster } from "@/components/businesscomponents/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto w-full">
        <div className="responsive-container">
          {children}
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default MainLayout;
