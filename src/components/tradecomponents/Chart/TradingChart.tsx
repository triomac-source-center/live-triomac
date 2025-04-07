"use client"
import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode, LineStyle, type IChartApi, CandlestickSeries } from 'lightweight-charts';
import { generateCandlestickData } from '@/lib/chartUtils';

interface TradingChartProps {
  containerClassName?: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ containerClassName }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any>(null);
  console.log(chartContainerRef.current)
  useEffect(() => {
    if (chartContainerRef.current) {
      // Create chart
      const chart: IChartApi = createChart(chartContainerRef.current, {
        layout: {
          background: { color: '#121622' },
          textColor: '#D9D9D9',
        },
        grid: {
          vertLines: { color: '#2A2E39', style: LineStyle.Dotted },
          horzLines: { color: '#2A2E39', style: LineStyle.Dotted },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
          vertLine: {
            color: '#758696',
            width: 1,
            style: LineStyle.Solid,
            labelBackgroundColor: '#758696',
          },
          horzLine: {
            color: '#758696',
            width: 1,
            style: LineStyle.Solid,
            labelBackgroundColor: '#758696',
          },
        },
        timeScale: {
          borderColor: '#363A45',
          timeVisible: true,
          secondsVisible: false,
        },
        rightPriceScale: {
          borderColor: '#363A45',
        },
        // Removed the watermark configuration
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
      
      chartRef.current = chart;
      
      // Create candlestick series
      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#26A69A',
        downColor: '#EF5350',
        borderVisible: false,
        wickUpColor: '#26A69A',
        wickDownColor: '#EF5350',
      });
      
      // Generate sample data
      const candlestickData = generateCandlestickData(200);
      candlestickSeries.setData(candlestickData);
      
      chart.timeScale().fitContent()

      // Handle resize
      const handleResize = () => {
        if (chartRef.current && chartContainerRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
          });
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
        }
      };
    }
  }, []);
  
  return (
    <div className={`chart-wrapper ${containerClassName || ''}`}>
      <div ref={chartContainerRef} className="tv-lightweight-charts" />
    </div>
  );
};

export default TradingChart;