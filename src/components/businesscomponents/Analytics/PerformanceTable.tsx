
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/businesscomponents/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/businesscomponents/ui/card";
import { TrendingUp } from "lucide-react";

interface PerformanceTableProps {
  data: {
    period: string;
    revenue: number;
    expenses: number;
    profit: number;
    change: string;
    stores: number;
    newProducts: number;
  }[];
}

export const PerformanceTable: React.FC<PerformanceTableProps> = ({ data }) => {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  
  return (
    <Card className="glass-card hover-glow">
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium flex items-center">
          <TrendingUp size={18} className="mr-2" /> Quarterly Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Expenses</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="text-right">YoY Change</TableHead>
              <TableHead className="text-center">Stores</TableHead>
              <TableHead className="text-center">New Products</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.period}>
                <TableCell className="font-medium">{item.period}</TableCell>
                <TableCell className="text-right">${item.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">${item.expenses.toLocaleString()}</TableCell>
                <TableCell className="text-right">${item.profit.toLocaleString()}</TableCell>
                <TableCell className="text-right text-success">{item.change}</TableCell>
                <TableCell className="text-center">{item.stores}</TableCell>
                <TableCell className="text-center">{item.newProducts}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50">
              <TableCell className="font-medium">TOTAL</TableCell>
              <TableCell className="text-right font-medium">${totalRevenue.toLocaleString()}</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right font-medium">${totalProfit.toLocaleString()}</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center">{data.reduce((sum, item) => sum + item.newProducts, 0)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
