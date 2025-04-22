
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/businesscomponents/ui/form";
import { Button } from "@/components/businesscomponents/ui/button";
import { Switch } from "@/components/businesscomponents/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/businesscomponents/ui/select";
import { toast } from "sonner";
import { Save, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/businesscomponents/ui/card";
import { Badge } from "@/components/businesscomponents/ui/badge";

// Schema for notification settings form
const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  shareholderUpdates: z.boolean().default(true),
  financialAlerts: z.boolean().default(true),
  meetingReminders: z.boolean().default(true),
  documentUploads: z.boolean().default(true),
  marketUpdates: z.boolean().default(false),
  frequency: z.enum(["immediately", "daily", "weekly"]).default("daily"),
  shareholderUpdateThreshold: z.enum(["any", "1", "5", "10"]).default("any")
});

type NotificationSettingsFormValues = z.infer<typeof notificationSettingsSchema>;

interface NotificationSettingsFormProps {
  onSuccess: () => void;
}

const NotificationSettingsForm: React.FC<NotificationSettingsFormProps> = ({ onSuccess }) => {
  // Default form values
  const defaultValues: NotificationSettingsFormValues = {
    emailNotifications: true,
    shareholderUpdates: true,
    financialAlerts: true,
    meetingReminders: true,
    documentUploads: true,
    marketUpdates: false,
    frequency: "daily",
    shareholderUpdateThreshold: "any"
  };

  const form = useForm<NotificationSettingsFormValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues
  });

  const onSubmit = (data: NotificationSettingsFormValues) => {
    // In a real app, this would save the notification settings to an API
    console.log("Notification settings updated:", data);
    toast.success("Notification settings updated successfully");
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">Configure email notification preferences</p>
              </div>
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">
                        {field.value ? (
                          <Badge variant="default" className="ml-2">Enabled</Badge>
                        ) : (
                          <Badge variant="outline" className="ml-2">Disabled</Badge>
                        )}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem className="max-w-xs">
                    <FormLabel>Notification Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!form.watch("emailNotifications")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="immediately">Send Immediately</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often you want to receive email notifications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="shareholderUpdateThreshold"
                render={({ field }) => (
                  <FormItem className="max-w-xs">
                    <FormLabel>Shareholder Update Threshold</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!form.watch("emailNotifications") || !form.watch("shareholderUpdates")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="any">Any Change</SelectItem>
                        <SelectItem value="1">Changes ≥ 1%</SelectItem>
                        <SelectItem value="5">Changes ≥ 5%</SelectItem>
                        <SelectItem value="10">Changes ≥ 10%</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Minimum percentage change to trigger shareholder update notifications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="shareholderUpdates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Shareholder Updates</FormLabel>
                    <FormDescription>
                      Receive notifications when shareholder information changes.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!form.watch("emailNotifications")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="financialAlerts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Financial Alerts</FormLabel>
                    <FormDescription>
                      Get notified about important financial events.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!form.watch("emailNotifications")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="meetingReminders"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Meeting Reminders</FormLabel>
                    <FormDescription>
                      Receive reminders about upcoming shareholder meetings.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!form.watch("emailNotifications")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="documentUploads"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Document Uploads</FormLabel>
                    <FormDescription>
                      Get notified when new documents are uploaded.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!form.watch("emailNotifications")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="marketUpdates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Market Updates</FormLabel>
                    <FormDescription>
                      Receive industry and market trend updates.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!form.watch("emailNotifications")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="gap-2">
            <Save className="h-4 w-4" />
            Save Notification Settings
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NotificationSettingsForm;
