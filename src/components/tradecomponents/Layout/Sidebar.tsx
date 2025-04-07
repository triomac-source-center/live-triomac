
import React from 'react';
import { formatPrice, formatPercentage, formatNumber, getRandomChange } from '@/lib/chartUtils';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  BarChart4,
  LineChart,
  CandlestickChart,
  AreaChart,
  ChevronDown,
  Layers,
  Eye
} from 'lucide-react';
import { Button } from '@/components/tradecomponents/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/tradecomponents/ui/card';
import ProductTable from '@/components/tradecomponents/Layout/product'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tradecomponents/ui/tabs';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const price = 172.35;
  const change = Number(getRandomChange());
  const isPositive = change >= 0;
  const sampleProducts = [
    { name: "Apple", price: "1.20" },
    { name: "Banana", price: "0.80" },
    { name: "Mango", price: "2.50" },
  ];
  
  
  return (
    <div 
      className={`h-full border-l border-border bg-gray-900 transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-80' : 'w-0'
      }`}
    >
      {isOpen && (
        <div className="h-full flex flex-col relative">
          {/* <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 z-10"
            onClick={toggleSidebar}
          >
            <ChevronRight className="h-4 w-4" />
          </Button> */}
          
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-lg text-gray-300">AAPL</h2>
              <span className="text-xs text-muted-foreground">NASDAQ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">{formatPrice(price)}</span>
              <span className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {change}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Volume: {formatNumber(23456789)}
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="flex-1">
            <TabsList className="w-full justify-start px-2 pt-4 bg-transparent">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="chart" className="text-xs">Chart</TabsTrigger>
              <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-4 space-y-4">
              <Card className='border-gray-800 bg-grayview'>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>Market Data</span>
                    <ChevronDown className="h-4 w-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs py-0 pb-3">
                  <div className="grid grid-cols-2 gap-y-2">
                    <div>Open</div>
                    <div className="text-right">{formatPrice(170.72)}</div>
                    <div>High</div>
                    <div className="text-right">{formatPrice(173.12)}</div>
                    <div>Low</div>
                    <div className="text-right">{formatPrice(170.35)}</div>
                    <div>Prev. Close</div>
                    <div className="text-right">{formatPrice(171.42)}</div>
                    <div>52W High</div>
                    <div className="text-right">{formatPrice(199.62)}</div>
                    <div>52W Low</div>
                    <div className="text-right">{formatPrice(124.17)}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className='border-gray-800 bg-grayview'>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>Indicators</span>
                    <ChevronDown className="h-4 w-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs py-0 pb-3">
                  {/* <div className="grid grid-cols-2 gap-y-2">
                    <div>RSI (14)</div>
                    <div className="text-right">56.78</div>
                    <div>MACD (12,26,9)</div>
                    <div className="text-right">1.23</div>
                    <div>ATR (14)</div>
                    <div className="text-right">3.45</div>
                    <div>Bollinger Bands</div>
                    <div className="text-right">169.2 - 175.8</div>
                    <div>Fentry opr</div>
                    <div className="text-right">75.8</div>
                    <div>Wallmart</div>
                    <div className="text-right">69.3</div>
                    <div>Amazon</div>
                    <div className="text-right">16.28</div>
                    <div>Apple</div>
                    <div className="text-right">439.2</div>
                    <div>Nvidia</div>
                    <div className="text-right">85.8</div>
                    <div>Tesla</div>
                    <div className="text-right">33.2</div>
                  </div> */}
                  
                  <ProductTable products={sampleProducts} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="chart" className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-200">Chart Type</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-800 bg-grayview text-gray-300">
                    <BarChart4 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-800 bg-grayview text-gray-300">
                    <LineChart className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="sm" className="h-8 w-8 p-0 border-gray-800 bg-grayview text-gray-900">
                    <CandlestickChart className="h-4 w-4 text-red-400" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-800 bg-grayview text-gray-300">
                    <AreaChart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-200">Indicators</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="text-xs border-gray-800 bg-grayview text-gray-300">MA</Button>
                  <Button variant="outline" size="sm" className="text-xs border-gray-800 bg-grayview text-gray-300">EMA</Button>
                  <Button variant="outline" size="sm" className="text-xs border-gray-800 bg-grayview text-gray-300">RSI</Button>
                  <Button variant="outline" size="sm" className="text-xs border-gray-800 bg-grayview text-gray-300">MACD</Button>
                  <Button variant="outline" size="sm" className="text-xs border-gray-800 bg-grayview text-gray-300">BB</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1 border-gray-800 bg-grayview text-gray-300">
                  <Layers className="h-3 w-3" />
                  <span>Layers</span>
                </Button>
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1 border-gray-800 bg-grayview text-gray-300">
                  <Eye className="h-3 w-3" />
                  <span>Objects</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">About Apple Inc.</h3>
                  <p className="text-xs text-muted-foreground">
                    Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearable products.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Financials</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <div>Market Cap</div>
                    <div className="text-right">$2.7T</div>
                    <div>P/E Ratio</div>
                    <div className="text-right">28.5</div>
                    <div>EPS (TTM)</div>
                    <div className="text-right">$6.14</div>
                    <div>Dividend Yield</div>
                    <div className="text-right">0.51%</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
