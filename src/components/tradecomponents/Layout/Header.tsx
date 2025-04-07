
import React, { useState } from 'react';
import { Button } from '@/components/tradecomponents/ui/button';
import SymbolSearch from '@/components/tradecomponents/ui/SymbolSearch';
import TimeframeSelector from '@/components/tradecomponents/ui/TimeframeSelector';
import { BarChart4, Settings, Compass, ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('60');
  
  return (
    <header className="h-16 border-b border-border bg-gray-900 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5 text-white" />
        </Button>
        
        <div className="flex items-center gap-1">
          <BarChart4 className="h-5 w-5 text-red-400" />
          <span className="font-bold text-lg text-white">Triomac60</span>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" className="text-sm text-gray-300">Charts</Button>
          <Button variant="ghost" className="text-sm text-gray-300">Screener</Button>
          <Button variant="ghost" className="text-sm text-gray-300">Community</Button>
          <Button variant="ghost" className="text-sm flex items-center gap-1 text-gray-300">
            More
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <SymbolSearch onSelectSymbol={(symbol) => console.log('Selected symbol:', symbol)} />
        
        <TimeframeSelector 
          selectedTimeframe={selectedTimeframe}
          onSelectTimeframe={setSelectedTimeframe}
        />
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Compass className="h-5 w-5 text-white" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
