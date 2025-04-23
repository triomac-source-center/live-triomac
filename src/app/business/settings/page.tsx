"use client"


import React, { useState } from "react";
import MainLayout from "@/components/businesscomponents/Layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/businesscomponents/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/businesscomponents/ui/card";
import ShareholderManagementForm from "@/components/businesscomponents/Settings/ShareholderManagementForm";
import ShareDistributionForm from "@/components/businesscomponents/Settings/ShareDistributionForm";
import CompanySettingsForm from "@/components/businesscomponents/Settings/CompanySettingsForm";
import NotificationSettingsForm from "@/components/businesscomponents/Settings/NotificationSettingsForm";
import { toast } from "sonner";
import { Settings as SettingsIcon, Users, Share, Building, Bell } from "lucide-react";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("shareholders");

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-200">Settings</h1>
          <p className="text-muted-foreground text-xs">
            Manage your business settings, shareholders, shares distribution, and company information.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-3/4 lg:w-1/2">
            <TabsTrigger value="shareholders" className="flex items-center gap-2">
              <Users size={16} /> Shareholders
            </TabsTrigger>
            <TabsTrigger value="shares" className="flex items-center gap-2">
              <Share size={16} /> Shares
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building size={16} /> Company
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} /> Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shareholders" className="space-y-4">
            <Card className="bg-grayview border-gray-800">
              <CardHeader>
                <CardTitle>Shareholder Management</CardTitle>
                <CardDescription className="text-xs">
                  Manage your shareholders, approve or reject new applications, update information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShareholderManagementForm 
                  onSuccess={() => {
                    toast.success("Shareholder settings updated successfully");
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shares" className="space-y-4">
            <Card className="bg-grayview border-gray-800">
              <CardHeader>
                <CardTitle>Share Distribution</CardTitle>
                <CardDescription className="text-xs">
                  Manage your company shares, adjust distribution, and set ownership percentages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShareDistributionForm 
                  onSuccess={() => {
                    toast.success("Share distribution updated successfully");
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-4">
            <Card className="bg-grayview border-gray-800">
              <CardHeader>
                <CardTitle>Company Settings</CardTitle>
                <CardDescription className="text-xs">
                  Update your company information, business address, and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CompanySettingsForm 
                  onSuccess={() => {
                    toast.success("Company settings updated successfully");
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="bg-grayview border-gray-800">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription className="text-xs">
                  Configure how and when you receive notifications about your business.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationSettingsForm 
                  onSuccess={() => {
                    toast.success("Notification settings updated successfully");
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
