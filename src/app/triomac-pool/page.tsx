"use client"

import React from 'react'
import DashboardLayout from '@/components/poolcomponents/Layout/dashboardlayout'
import MarketOverview from '@/components/poolcomponents/dashboard/marketoverview'
import DemandChart from '@/components/poolcomponents/dashboard/DemandChart'
import UserDistribution from '@/components/poolcomponents/dashboard/UserDistribution'
import MarketActivity from '@/components/poolcomponents/dashboard/MarketActivity'
import TopUsers from '@/components/poolcomponents/dashboard/TopUsers'
import NotificationBanner from '@/components/poolcomponents/dashboard/NotificationBanner'



export default function PoolDashboard() {

    return (
        <>
            <DashboardLayout>
                <div className="p-6 space-y-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-gray-100">Triomac Market Dashboard</h1>
                        <p className="text-muted-foreground text-xs">
                            Overview of the triomac market, demand trends, and user distribution
                        </p>
                    </div>

                    <MarketOverview />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <DemandChart />
                        <UserDistribution />
                    </div>

                    <div className="h-[500px]">
                        <MarketActivity className="w-full h-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <TopUsers className="lg:col-span-2" />
                        <NotificationBanner />
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}
