
// Sample data for the chart
export const generateCandlestickData = (count = 200) => {
  const baseTimestamp = new Date(2023, 0, 1, 0, 0, 0, 0).getTime() / 1000;
  const hour = 60 * 60;
  const data = [];
  let lastClose = 200 + Math.random() * 100;
  
  for (let i = 0; i < count; i++) {
    const time = baseTimestamp + i * hour;
    const open = lastClose;
    const high = open + (Math.random() * 10);
    const low = open - (Math.random() * 10);
    const close = low + (Math.random() * (high - low));
    
    data.push({
      time: time,
      open: open,
      high: high,
      low: low,
      close: close,
    });
    
    lastClose = close;
  }
  
  return data;
};

export const generateVolumeData = (candlestickData: any[]) => {
  return candlestickData.map(candle => ({
    time: candle.time,
    value: Math.random() * 1000000,
    color: candle.close >= candle.open ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)'
  }));
};

export const timeframes = [
  { label: '1m', value: '1' },
  { label: '5m', value: '5' },
  { label: '15m', value: '15' },
  { label: '30m', value: '30' },
  { label: '1h', value: '60' },
  { label: '4h', value: '240' },
  { label: '1d', value: 'D' },
  { label: '1w', value: 'W' },
  { label: '1M', value: 'M' },
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

export const formatPercentage = (percentage: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(percentage / 100);
};

export const getRandomChange = () => {
  return (Math.random() * 10 - 5).toFixed(2);
};

export const symbols = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
];
