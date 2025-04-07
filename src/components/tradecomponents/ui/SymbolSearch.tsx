
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { symbols } from '@/lib/chartUtils';
import { Input } from '@/components/tradecomponents/ui/input';
import { Button } from '@/components/tradecomponents/ui/button';

interface SymbolSearchProps {
  onSelectSymbol: (symbol: string) => void;
}

const SymbolSearch: React.FC<SymbolSearchProps> = ({ onSelectSymbol }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSymbols = symbols.filter(
    item => item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectSymbol = (symbol: string) => {
    onSelectSymbol(symbol);
    setIsOpen(false);
    setSearchTerm('');
  };
  
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-base font-semibold bg-grayview text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>AAPL</span>
        </Button>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground bg-grayview" />
          <Input
            placeholder="Search symbols..."
            className="pl-8 w-60 bg-grayview text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute mt-2 w-full max-h-80 overflow-y-auto bg-secondary rounded-md shadow-lg z-10">
          {filteredSymbols.length > 0 ? (
            filteredSymbols.map((item) => (
              <div
                key={item.symbol}
                className="px-4 py-2 hover:bg-accent cursor-pointer flex flex-col"
                onClick={() => handleSelectSymbol(item.symbol)}
              >
                <span className="font-medium text-white">{item.symbol}</span>
                <span className="text-xs text-gray-300">{item.name}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-muted-foreground">No symbols found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SymbolSearch;
