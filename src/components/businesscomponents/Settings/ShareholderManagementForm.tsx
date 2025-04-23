
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/businesscomponents/ui/form";
import { Input } from "@/components/businesscomponents/ui/input";
import { Button } from "@/components/businesscomponents/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/businesscomponents/ui/select";
import { Checkbox } from "@/components/businesscomponents/ui/checkbox";
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
import { UserPlus, UserMinus, Edit, Trash2, X, Check, Search } from "lucide-react";

// Import the Shareholder interface
import { Shareholder } from "@/components/businesscomponents/Dashboard/ShareholderTable";

// Sample shareholders data similar to what we have in the Shareholders page
const initialShareholders: Shareholder[] = [
  {
    id: "1",
    name: "Robert Anderson",
    shares: 215000,
    percentage: 21.5,
    joinedDate: "2018-03-15",
    type: "individual",
    contactInfo: {
      email: "r.anderson@example.com",
      phone: "(555) 123-4567"
    }
  },
  {
    id: "2",
    name: "Evergreen Capital",
    shares: 200000,
    percentage: 20.0,
    joinedDate: "2018-06-22",
    type: "institutional",
    contactInfo: {
      email: "investments@evergreencapital.com",
      phone: "(555) 987-6543"
    }
  },
  {
    id: "3",
    name: "Maya Williams",
    shares: 175000,
    percentage: 17.5,
    joinedDate: "2018-03-15",
    type: "individual",
    contactInfo: {
      email: "m.williams@example.com",
      phone: "(555) 234-5678"
    }
  }
];

// Sample pending shareholders
const initialPendingShareholders = [
  {
    id: "p1",
    name: "Jennifer Thompson",
    type: "individual",
    requestedShares: 25000,
    requestDate: "2023-11-10",
    contactInfo: {
      email: "j.thompson@example.com",
      phone: "(555) 333-4444"
    }
  },
  {
    id: "p2",
    name: "Innovative Fund LLC",
    type: "institutional",
    requestedShares: 50000,
    requestDate: "2023-12-05",
    contactInfo: {
      email: "contact@innovativefund.com",
      phone: "(555) 555-6666"
    }
  }
];

// Form schema for editing a shareholder
const shareholderFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  shares: z.coerce.number().min(1, "Must have at least 1 share"),
  type: z.enum(["individual", "institutional", "pool"]),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters")
});

type ShareholderFormValues = z.infer<typeof shareholderFormSchema>;

interface ShareholderManagementFormProps {
  onSuccess: () => void;
}

const ShareholderManagementForm: React.FC<ShareholderManagementFormProps> = ({ onSuccess }) => {
  const [shareholders, setShareholders] = useState<Shareholder[]>(initialShareholders);
  const [pendingShareholders, setPendingShareholders] = useState(initialPendingShareholders);
  const [editingShareholder, setEditingShareholder] = useState<Shareholder | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPending, setShowPending] = useState(true);
  
  const form = useForm<ShareholderFormValues>({
    resolver: zodResolver(shareholderFormSchema),
    defaultValues: {
      name: "",
      shares: 0,
      type: "individual",
      email: "",
      phone: ""
    }
  });

  const onSubmit = (data: ShareholderFormValues) => {
    if (editingShareholder) {
      // Update existing shareholder
      setShareholders(prev => 
        prev.map(sh => 
          sh.id === editingShareholder.id 
            ? {
                ...sh,
                name: data.name,
                shares: data.shares,
                percentage: calculatePercentage(data.shares),
                type: data.type,
                contactInfo: {
                  email: data.email,
                  phone: data.phone
                }
              }
            : sh
        )
      );
    } else {
      // Add new shareholder
      const newShareholder: Shareholder = {
        id: `${Date.now()}`,
        name: data.name,
        shares: data.shares,
        percentage: calculatePercentage(data.shares),
        joinedDate: new Date().toISOString().split('T')[0],
        type: data.type,
        contactInfo: {
          email: data.email,
          phone: data.phone
        }
      };
      
      setShareholders(prev => [...prev, newShareholder]);
    }
    
    resetForm();
    onSuccess();
  };

  const resetForm = () => {
    form.reset({
      name: "",
      shares: 0,
      type: "individual",
      email: "",
      phone: ""
    });
    setEditingShareholder(null);
  };

  const handleEdit = (shareholder: Shareholder) => {
    setEditingShareholder(shareholder);
    form.reset({
      id: shareholder.id,
      name: shareholder.name,
      shares: shareholder.shares,
      type: shareholder.type,
      email: shareholder.contactInfo.email,
      phone: shareholder.contactInfo.phone
    });
  };

  const handleDelete = (id: string) => {
    setShareholders(prev => prev.filter(sh => sh.id !== id));
    onSuccess();
  };

  const handleApprove = (pendingShareholder: typeof initialPendingShareholders[0]) => {
    // Create a new approved shareholder
    const newShareholder: Shareholder = {
      id: pendingShareholder.id,
      name: pendingShareholder.name,
      shares: pendingShareholder.requestedShares,
      percentage: calculatePercentage(pendingShareholder.requestedShares),
      joinedDate: new Date().toISOString().split('T')[0],
      type: pendingShareholder.type as "individual" | "institutional" | "pool",
      contactInfo: pendingShareholder.contactInfo
    };
    
    // Add to shareholders list
    setShareholders(prev => [...prev, newShareholder]);
    
    // Remove from pending list
    setPendingShareholders(prev => prev.filter(p => p.id !== pendingShareholder.id));
    
    onSuccess();
  };

  const handleReject = (id: string) => {
    setPendingShareholders(prev => prev.filter(p => p.id !== id));
    onSuccess();
  };

  const calculatePercentage = (shares: number) => {
    const totalExistingShares = shareholders.reduce((acc, sh) => acc + sh.shares, 0);
    return (shares / (totalExistingShares + shares)) * 100;
  };
  
  const filteredShareholders = shareholders.filter(sh => 
    sh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sh.contactInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3.5 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search shareholders..."
            className="pl-8 bg-grayview text-sm input-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Checkbox 
            id="show-pending" 
            checked={showPending}
            onCheckedChange={(checked) => setShowPending(checked as boolean)}
          />
          <label 
            htmlFor="show-pending" 
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Show pending requests
          </label>
        </div>
      </div>

      {/* Pending shareholders section */}
      {showPending && pendingShareholders.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Pending Shareholder Requests</h3>
          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Requested Shares</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingShareholders.map((pending) => (
                  <TableRow key={pending.id}>
                    <TableCell className="font-medium">{pending.name}</TableCell>
                    <TableCell className="capitalize">{pending.type}</TableCell>
                    <TableCell className="text-right">{pending.requestedShares.toLocaleString()}</TableCell>
                    <TableCell>{pending.requestDate}</TableCell>
                    <TableCell>{pending.contactInfo.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleApprove(pending)}
                          className="h-8 w-8 p-0 text-emerald-600"
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReject(pending.id)}
                          className="h-8 w-8 p-0 text-red-600"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Current shareholders table */}
      <div>
        <h3 className="text-lg font-medium mb-4">Current Shareholders</h3>
        <div className="rounded-md border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShareholders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No shareholders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredShareholders.map((shareholder) => (
                  <TableRow key={shareholder.id}>
                    <TableCell className="font-medium">{shareholder.name}</TableCell>
                    <TableCell className="capitalize">{shareholder.type}</TableCell>
                    <TableCell className="text-right">{shareholder.shares.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{shareholder.percentage.toFixed(2)}%</TableCell>
                    <TableCell>{shareholder.contactInfo.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(shareholder)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
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
                                This action will remove {shareholder.name} as a shareholder. 
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(shareholder.id)}
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit shareholder form */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {editingShareholder ? "Edit Shareholder" : "Add New Shareholder"}
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="bg-secondary/30" placeholder="Shareholder name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-secondary/30">
                          <SelectValue placeholder="Select shareholder type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="institutional">Institutional</SelectItem>
                        <SelectItem value="pool">Pool</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="shares"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shares</FormLabel>
                  <FormControl>
                    <Input className="bg-secondary/30" type="number" placeholder="Number of shares" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className="bg-secondary/30" type="email" placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input className="bg-secondary/30" placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              {editingShareholder && (
                <Button variant="outline" type="button" onClick={resetForm}>
                  Cancel
                </Button>
              )}
              <Button type="submit" className="gap-2">
                {editingShareholder ? <Edit className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                {editingShareholder ? "Update Shareholder" : "Add Shareholder"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ShareholderManagementForm;
