
import { Avatar } from "@/components/poolcomponents/ui/avatar";
import { Card } from "@/components/poolcomponents/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../ui/table";

type TopUserProps = {
  className?: string;
};

const topUsers = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    avatar: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", 
    triomenCount: 246, 
    value: "$543,200", 
    activity: "High" 
  },
  { 
    id: 2, 
    name: "Sarah Williams", 
    avatar: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", 
    triomenCount: 189, 
    value: "$412,800", 
    activity: "Medium" 
  },
  { 
    id: 3, 
    name: "Michael Chen", 
    avatar: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", 
    triomenCount: 157, 
    value: "$342,500", 
    activity: "High" 
  },
  { 
    id: 4, 
    name: "Emma Davis", 
    avatar: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", 
    triomenCount: 132, 
    value: "$285,600", 
    activity: "Low" 
  },
  { 
    id: 5, 
    name: "James Wilson", 
    avatar: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", 
    triomenCount: 118, 
    value: "$256,400", 
    activity: "Medium" 
  },
];

const activityColor = (activity: string) => {
  switch (activity) {
    case "High":
      return "text-green-500";
    case "Medium":
      return "text-yellow-500";
    case "Low":
      return "text-red-500";
    default:
      return "";
  }
};

export default function TopUsers({ className }: TopUserProps) {
  return (
    <Card className={`p-6 glass-card ${className}`}>
      <h3 className="text-lg font-medium mb-4">Top Triomen Users</h3>
      
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Triomac</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <img src={user.avatar} alt={user.name} />
                  </Avatar>
                  <span>{user.name}</span>
                </TableCell>
                <TableCell className="text-right">{user.triomenCount}</TableCell>
                <TableCell className="text-right">{user.value}</TableCell>
                <TableCell className={`text-right ${activityColor(user.activity)}`}>
                  {user.activity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
