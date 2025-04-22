
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

export interface Shareholder {
  id: string;
  name: string;
  shares: number;
  percentage: number;
  joinedDate: string;
  type: "individual" | "institutional" | "pool";
  contactInfo: {
    email: string;
    phone: string;
  };
}

interface ShareholderTableProps {
  shareholders: Shareholder[];
}

const ShareholderTable: React.FC<ShareholderTableProps> = ({ shareholders }) => {
  return (
    <Card className="glass-card hover-glow">
      <CardHeader>
        <CardTitle className="text-md font-medium">Top Shareholders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Shares</TableHead>
              <TableHead className="text-right">Percentage</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shareholders.map((shareholder) => (
              <TableRow key={shareholder.id}>
                <TableCell className="font-medium">{shareholder.name}</TableCell>
                <TableCell className="text-right">
                  {shareholder.shares.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {shareholder.percentage.toFixed(2)}%
                </TableCell>
                <TableCell className="capitalize">
                  {shareholder.type}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShareholderTable;
