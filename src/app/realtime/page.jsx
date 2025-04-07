"use client"
import Header from "@/components/tradecomponents/Layout/Header"
import Sidebar from "@/components/tradecomponents/Layout/Sidebar"
import TradingChart from "@/components/tradecomponents/Chart/TradingChart"
import React, { useState } from 'react';

export default function RealTrade() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  } 
    return (
        <>
            <div className="flex flex-col h-screen bg-background">
                <Header onToggleSidebar={toggleSidebar} />

                <div className="flex-1 flex overflow-hidden">
                    <div className="flex-1 relative">
                        <TradingChart />
                    </div>

                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                </div>
            </div>
        </>
    )
}
