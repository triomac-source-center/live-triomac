import React from 'react';
import { StatCard } from './StatCard';
import { Package, Users, TrendingUp, ShoppingBag } from 'lucide-react';

export default function MarketOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Triomen" 
        value="8,547" 
        change={5.2} 
        className='text-gray-400'
        icon={<Package size={20} />} 
      />
      <StatCard 
        title="Market Value" 
        value="$2,458,320" 
        change={12.5} 
        className='text-gray-400'
        icon={<TrendingUp size={20} />} 
      />
      <StatCard 
        title="Active Users" 
        value="1,258" 
        change={-2.3} 
        className='text-gray-400'
        icon={<Users size={20} />} 
      />
      <StatCard 
        title="Open Offers" 
        value="456" 
        change={8.1} 
        className='text-gray-400'
        icon={<ShoppingBag size={20} />} 
      />
    </div>
  );
}
