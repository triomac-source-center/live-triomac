
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/poolcomponents/ui/table";
import { Card } from "@/components/poolcomponents/ui/card";

type DemandChartProps = {
  className?: string;
};

const data = [
  { name: 'Alpha Pro', demand: 4000, price: 2400, change: 12.5 },
  { name: 'Nexus', demand: 3000, price: 1398, change: 8.3 },
  { name: 'Quantum', demand: 2000, price: 9800, change: -5.2 },
  { name: 'Stellar', demand: 2780, price: 3908, change: 15.7 }
//   { name: 'Matrix', demand: 1890, price: 4800, change: -2.1 },
//   { name: 'Eclipse', demand: 2390, price: 3800, change: 7.9 },
];

export default function DemandChart({ className }: DemandChartProps) {
  return (
    <Card className={`p-6 glass-card h-96 overflow-auto ${className}`}>
      <h3 className="text-lg font-medium mb-4">Most In-Demand Triomen</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-xs'>Name</TableHead>
            <TableHead className="text-right text-xs">Demand</TableHead>
            <TableHead className="text-right text-xs">Price</TableHead>
            <TableHead className="text-right text-xs">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium text-gray-400 text-xs">{item.name}</TableCell>
              <TableCell className="text-right text-xs">{item.demand.toLocaleString()}</TableCell>
              <TableCell className="text-right text-xs">${item.price.toLocaleString()}</TableCell>
              <TableCell className="text-right flex items-center justify-end gap-1">
                <span className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                  {item.change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                </span>
                <span className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(item.change)}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
