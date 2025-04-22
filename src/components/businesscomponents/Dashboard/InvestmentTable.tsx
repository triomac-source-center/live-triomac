
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
import { Badge } from "@/components/businesscomponents/ui/badge";

interface Investment {
  id: string;
  investor: string;
  amount: number;
  sharePrice: number;
  sharesAcquired: number;
  date: string;
  type: string;
}

interface InvestmentTableProps {
  investments: Investment[];
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({ investments }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "Series A":
        return "default";  // Changed from "primary" to "default"
      case "Series B":
        return "highlight";
      case "Grocery Expansion":
        return "grocery";
      case "Store Network":
        return "success";
      case "Supply Chain":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="glass-card hover-glow">
      <CardHeader>
        <CardTitle className="text-md font-medium">Investment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investor</TableHead>
              <TableHead>Round</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Share Price</TableHead>
              <TableHead className="text-right">Shares</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.map((investment) => (
              <TableRow key={investment.id}>
                <TableCell className="font-medium">{investment.investor}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(investment.type)}>
                    {investment.type}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(investment.date)}</TableCell>
                <TableCell className="text-right">${investment.amount.toLocaleString()}</TableCell>
                <TableCell className="text-right">${investment.sharePrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">{investment.sharesAcquired.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InvestmentTable;
