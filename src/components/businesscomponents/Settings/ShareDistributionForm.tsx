
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/businesscomponents/ui/form";
import { Input } from "@/components/businesscomponents/ui/input";
import { Button } from "@/components/businesscomponents/ui/button";
import { Slider } from "@/components/businesscomponents/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/businesscomponents/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/businesscomponents/ui/alert-dialog";
import { Trash2, Save, Plus, Pencil, Share2, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/businesscomponents/ui/card";
import { Badge } from "@/components/businesscomponents/ui/badge";
import { toast } from "sonner";

// Schema for share class form
const shareClassFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  shares: z.coerce.number().min(1, "Must have at least 1 share"),
  votingRights: z.coerce.number().min(0, "Voting rights must be 0 or greater").max(100, "Voting rights cannot exceed 100%"),
  description: z.string().optional()
});

type ShareClassFormValues = z.infer<typeof shareClassFormSchema>;

// Schema for share allocation form
const shareAllocationFormSchema = z.object({
  totalShares: z.coerce.number().min(1, "Must have at least 1 total share"),
});

type ShareAllocationFormValues = z.infer<typeof shareAllocationFormSchema>;

// Interface for share class
interface ShareClass {
  id: string;
  name: string;
  shares: number;
  percentage: number;
  votingRights: number;
  description?: string;
}

interface ShareDistributionFormProps {
  onSuccess: () => void;
}

const ShareDistributionForm: React.FC<ShareDistributionFormProps> = ({ onSuccess }) => {
  // Initial share classes data
  const [shareClasses, setShareClasses] = useState<ShareClass[]>([
    { 
      id: "1", 
      name: "Common Stock (Class A)", 
      shares: 440000, 
      percentage: 44.0, 
      votingRights: 44.0, 
      description: "Founders, employees, and angel investors" 
    },
    { 
      id: "2", 
      name: "Preferred Stock (Series A)", 
      shares: 350000, 
      percentage: 35.0, 
      votingRights: 35.0, 
      description: "Institutional investors with liquidation preference" 
    },
    { 
      id: "3", 
      name: "Preferred Stock (Series B)", 
      shares: 160000, 
      percentage: 16.0, 
      votingRights: 16.0, 
      description: "Later stage investors with participation rights" 
    },
    { 
      id: "4", 
      name: "Options Pool (Unallocated)", 
      shares: 50000, 
      percentage: 5.0, 
      votingRights: 0, 
      description: "Reserved for future employees and advisors" 
    }
  ]);
  
  const [editingClass, setEditingClass] = useState<ShareClass | null>(null);
  const [totalCompanyShares, setTotalCompanyShares] = useState(1000000);
  
  const form = useForm<ShareClassFormValues>({
    resolver: zodResolver(shareClassFormSchema),
    defaultValues: {
      name: "",
      shares: 0,
      votingRights: 0,
      description: ""
    }
  });

  const allocationForm = useForm<ShareAllocationFormValues>({
    resolver: zodResolver(shareAllocationFormSchema),
    defaultValues: {
      totalShares: totalCompanyShares
    }
  });

  const onSubmit = (data: ShareClassFormValues) => {
    if (editingClass) {
      // Calculate the difference in shares
      const sharesDifference = data.shares - editingClass.shares;
      const newTotalShares = calculateTotalShares() + sharesDifference;
      
      // Update existing share class
      const updatedShareClasses = shareClasses.map(sc => 
        sc.id === editingClass.id 
          ? {
              ...sc,
              name: data.name,
              shares: data.shares,
              votingRights: data.votingRights,
              description: data.description
            }
          : sc
      );
      
      setShareClasses(updatedShareClasses);
      
      // Recalculate percentages based on new total shares
      recalculatePercentages(updatedShareClasses, newTotalShares);
    } else {
      // Add new share class
      const newShareClass: ShareClass = {
        id: `${Date.now()}`,
        name: data.name,
        shares: data.shares,
        percentage: (data.shares / (calculateTotalShares() + data.shares)) * 100,
        votingRights: data.votingRights,
        description: data.description
      };
      
      const updatedShareClasses = [...shareClasses, newShareClass];
      setShareClasses(updatedShareClasses);
      
      // Recalculate percentages based on new total shares
      const newTotalShares = calculateTotalShares() + data.shares;
      recalculatePercentages(updatedShareClasses, newTotalShares);
    }
    
    resetForm();
    onSuccess();
  };
  
  const updateTotalShares = (data: ShareAllocationFormValues) => {
    const oldTotal = calculateTotalShares();
    const ratio = data.totalShares / oldTotal;
    
    // Adjust each share class proportionally
    const updatedClasses = shareClasses.map(sc => ({
      ...sc,
      shares: Math.round(sc.shares * ratio)
    }));
    
    setTotalCompanyShares(data.totalShares);
    setShareClasses(updatedClasses);
    recalculatePercentages(updatedClasses, data.totalShares);
    
    toast.success(`Total share count updated to ${data.totalShares.toLocaleString()} shares`);
  };

  const calculateTotalShares = () => {
    return shareClasses.reduce((acc, sc) => acc + sc.shares, 0);
  };

  const recalculatePercentages = (classes: ShareClass[], totalShares: number) => {
    const updatedClasses = classes.map(sc => ({
      ...sc,
      percentage: (sc.shares / totalShares) * 100
    }));
    
    setShareClasses(updatedClasses);
  };
  
  const resetForm = () => {
    form.reset({
      name: "",
      shares: 0,
      votingRights: 0,
      description: ""
    });
    setEditingClass(null);
  };

  const handleEdit = (shareClass: ShareClass) => {
    setEditingClass(shareClass);
    form.reset({
      name: shareClass.name,
      shares: shareClass.shares,
      votingRights: shareClass.votingRights,
      description: shareClass.description
    });
  };

  const handleDelete = (id: string) => {
    // Find the class we're deleting
    const classToDelete = shareClasses.find(sc => sc.id === id);
    if (!classToDelete) return;
    
    // Remove the class
    const updatedClasses = shareClasses.filter(sc => sc.id !== id);
    setShareClasses(updatedClasses);
    
    // Recalculate percentages
    const newTotalShares = calculateTotalShares() - classToDelete.shares;
    recalculatePercentages(updatedClasses, newTotalShares);
    
    onSuccess();
  };

  const totalShares = calculateTotalShares();
  const totalVotingRights = shareClasses.reduce((acc, sc) => acc + sc.votingRights, 0);

  return (
    <div className="space-y-8">
      {/* Total shares allocation */}
      <Card>
        <CardContent className="pt-6">
          <Form {...allocationForm}>
            <form onSubmit={allocationForm.handleSubmit(updateTotalShares)} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
                <FormField
                  control={allocationForm.control}
                  name="totalShares"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Total Company Shares</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Total shares" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Update Total
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Share distribution overview */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Share Class Distribution</h3>
          <Badge variant="outline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Total Shares: {totalShares.toLocaleString()}
          </Badge>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Share Class</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
                <TableHead className="text-right">Voting Rights</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shareClasses.map((shareClass) => (
                <TableRow key={shareClass.id}>
                  <TableCell className="font-medium">{shareClass.name}</TableCell>
                  <TableCell className="text-right">{shareClass.shares.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{shareClass.percentage.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">{shareClass.votingRights.toFixed(2)}%</TableCell>
                  <TableCell className="max-w-md truncate">{shareClass.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(shareClass)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will remove the {shareClass.name} share class.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(shareClass.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-semibold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">{totalShares.toLocaleString()}</TableCell>
                <TableCell className="text-right">100.00%</TableCell>
                <TableCell className="text-right">{totalVotingRights.toFixed(2)}%</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit share class form */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {editingClass ? "Edit Share Class" : "Add New Share Class"}
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Common Stock (Class A)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="shares"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Shares</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter number of shares" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="votingRights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voting Rights (%)</FormLabel>
                  <div className="space-y-2">
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Slider
                          defaultValue={[field.value]}
                          max={100}
                          step={1}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{field.value}%</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2">
              {editingClass && (
                <Button variant="outline" type="button" onClick={resetForm}>
                  Cancel
                </Button>
              )}
              <Button type="submit" className="gap-2">
                {editingClass ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingClass ? "Update Share Class" : "Add Share Class"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ShareDistributionForm;
