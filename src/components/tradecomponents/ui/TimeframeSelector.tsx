
import React from 'react';
import { Button } from '@/components/tradecomponents/ui/button';
import { timeframes } from '@/lib/chartUtils';

interface TimeframeSelectorProps {
  selectedTimeframe: string;
  onSelectTimeframe: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ 
  selectedTimeframe, 
  onSelectTimeframe 
}) => {
  return (
    <div className="flex items-center gap-1">
      {timeframes.map((timeframe) => (
        <Button
          key={timeframe.value}
          variant={selectedTimeframe === timeframe.value ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onSelectTimeframe(timeframe.value)}
          className="text-xs py-1 h-7 min-w-9 text-gray-200"
        >
          {timeframe.label}
        </Button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
