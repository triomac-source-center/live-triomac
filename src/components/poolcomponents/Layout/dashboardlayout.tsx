import React from 'react'
import Sidebar from './sidebar';

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function PoolDashboard({ children }: DashboardLayoutProps) {

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray 900">
                    {children}
                </main>
            </div>
        </>
    )
}