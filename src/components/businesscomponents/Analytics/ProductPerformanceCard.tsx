
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/businesscomponents/ui/table";
import { ShoppingCart } from "lucide-react";

interface ProductPerformanceCardProps {
  data: {
    category: string;
    revenue: number;
    growth: number;
    profit: number;
  }[];
}

export const ProductPerformanceCard: React.FC<ProductPerformanceCardProps> = ({ data }) => {
  return (
    <Card className="glass-card hover-glow">
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium flex items-center">
          <ShoppingCart size={18} className="mr-2" /> Product Category Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Growth</TableHead>
              <TableHead className="text-right">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.category}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell className="text-right">${item.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right text-success">+{item.growth}%</TableCell>
                <TableCell className="text-right">${item.profit.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Top performing categories by revenue. Total product revenue: ${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
