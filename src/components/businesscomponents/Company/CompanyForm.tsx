
import React from "react";
import { useToast } from "@/components/businesscomponents/ui/use-toast";
import { Button } from "@/components/businesscomponents/ui/button";
import { Input } from "@/components/businesscomponents/ui/input";
import { Label } from "@/components/businesscomponents/ui/label";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/businesscomponents/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/businesscomponents/ui/select";
import { Switch } from "@/components/businesscomponents/ui/switch";
import { Textarea } from "@/components/businesscomponents/ui/textarea";
import { Badge } from "@/components/businesscomponents/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

interface CompanyFormProps {
  onSubmit: (data: CompanyFormData) => void;
  initialData?: CompanyFormData;
}

export interface CompanyFormData {
  name: string;
  description: string;
  industry: string;
  foundedYear: string;
  initialValuation: string;
  initialShares: string;
  isPublic: boolean;
  verificationStatus: "verified" | "pending" | "unverified";
  businessType: string; // Added this field
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit, initialData }) => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<CompanyFormData>(
    initialData || {
      name: "",
      description: "",
      industry: "",
      foundedYear: new Date().getFullYear().toString(),
      initialValuation: "1000000",
      initialShares: "1000000",
      isPublic: false,
      verificationStatus: "unverified",
      businessType: "Grocery Retail", // Default value
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast({
      title: initialData ? "Company Updated" : "Company Created",
      description: initialData
        ? "Your company details have been updated successfully."
        : "Your virtual company has been created successfully.",
    });
  };

  return (
    <Card className="glass-card w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                {initialData ? "Edit Company" : "Create Virtual Company"}
              </CardTitle>
              <CardDescription>
                {initialData
                  ? "Update your company information below."
                  : "Set up your virtual company profile."}
              </CardDescription>
            </div>
            <VerificationBadge status={formData.verificationStatus} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter company name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    handleSelectChange("industry", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="real_estate">Real Estate</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Add business type field */}
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) =>
                  handleSelectChange("businessType", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grocery Retail">Grocery Retail</SelectItem>
                  <SelectItem value="Grocery Wholesale">Grocery Wholesale</SelectItem>
                  <SelectItem value="Specialty Foods">Specialty Foods</SelectItem>
                  <SelectItem value="Organic Market">Organic Market</SelectItem>
                  <SelectItem value="Convenience Store">Convenience Store</SelectItem>
                  <SelectItem value="Grocery Delivery">Grocery Delivery</SelectItem>
                  <SelectItem value="Farm-to-Table">Farm-to-Table</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your company"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Select
                  value={formData.foundedYear}
                  onValueChange={(value) =>
                    handleSelectChange("foundedYear", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: 30 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="verificationStatus">Verification Status</Label>
                <Select
                  value={formData.verificationStatus}
                  onValueChange={(value) =>
                    handleSelectChange(
                      "verificationStatus",
                      value as "verified" | "pending" | "unverified"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending Verification</SelectItem>
                    <SelectItem value="unverified">Unverified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initialValuation">Initial Valuation ($)</Label>
                <Input
                  id="initialValuation"
                  name="initialValuation"
                  type="number"
                  min="0"
                  placeholder="Enter initial valuation"
                  value={formData.initialValuation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialShares">Initial Shares</Label>
                <Input
                  id="initialShares"
                  name="initialShares"
                  type="number"
                  min="1"
                  placeholder="Enter number of shares"
                  value={formData.initialShares}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  handleSwitchChange("isPublic", checked)
                }
              />
              <Label htmlFor="isPublic" className="font-normal">
                Publicly traded company
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t border-border pt-6">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Company" : "Create Company"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

const VerificationBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-success hover:bg-success/80 flex items-center gap-1">
          <CheckCircle2 size={14} />
          <span>Verified</span>
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="border-warning text-warning flex items-center gap-1">
          <span>Pending</span>
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="border-destructive text-destructive flex items-center gap-1">
          <XCircle size={14} />
          <span>Unverified</span>
        </Badge>
      );
  }
};

export default CompanyForm;
