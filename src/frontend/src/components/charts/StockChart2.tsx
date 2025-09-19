'use client';

import { useIsMobile } from '@/hooks/use-is-mobile';
import React, { useMemo, useState } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Customized,
  Area,
  ComposedChart,
} from 'recharts';
import { motion } from 'framer-motion';

interface IChartData {
  date: string;
  high: string | number;
  low: string | number;
  close: number;
  volume?: string | number;
  type?: 'historical' | 'predicted';
}

interface StockChartProps {
  data: IChartData[];
  isPositive: boolean;
  loading: boolean;
  symbol: string;
  period?: string;
  heightOfStockChart: string;
}

const CustomTooltip = ({ active, payload, label, symbol }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.type === 'predicted') {
      return (
        <div className="bg-white p-2 border rounded-md border-gray-200 shadow-md text-sm">
          {/* <p className="font-medium">{symbol}</p> */}
          <p className="text-[#AFAFAF] font-normal text-[9px] not-italic leading-none font-[Schibsted Grotesk]">
            {data.date}
          </p>
          <p className="text-black font-medium text-10px] not-italic pt-2 pb-2  leading-none font-[Schibsted Grotesk]">
            Forecasted Values
          </p>

          <p className="text-xs font-semibold text-black-500">
            Upper Bound:{' '}
            <span className="text-xs font-semibold text-green-500">
              {data.high ? Number(data.high).toFixed(2) : '-'}
            </span>
          </p>
          <p className="text-xs font-semibold text-black-500 ">
            Close:{' '}
            <span className=" text-xs font-semibold text-[#8B2B52]">
              {data.close ? Number(data.close).toFixed(2) : '-'}
            </span>
          </p>
          <p className="text-xs font-semibold text-black-500">
            Lower Bound:{' '}
            <span className=" text-xs font-semibold text-red-500">
              {data.low ? Number(data.low).toFixed(2) : '-'}
            </span>
          </p>
        </div>
      );
    }
    return (
      <div className="bg-white p-2 border rounded-md border-gray-200 shadow-md text-sm">
        <p className="font-medium">{symbol}</p>
        <p className="text-gray-700 text-xs font-semibold">
          High: {data.high ? Number(data.high).toFixed(2) : '-'}
        </p>
        <p className="text-gray-700 text-xs font-semibold">
          Low: {data.low ? Number(data.low).toFixed(2) : '-'}
        </p>
        <p className="text-gray-700 text-xs font-semibold">
          Open: {data.open ? Number(data.open).toFixed(2) : '-'}
        </p>
        <p className="text-gray-700 text-xs font-semibold">
          Close: {data.close ? Number(data.close).toFixed(2) : '-'}
        </p>
        <p className="text-gray-600 text-xs">{data.date}</p>
      </div>
    );
  }
  return null;
};

const StockChart2: React.FC<StockChartProps> = ({
  data,
  isPositive,
  loading,
  symbol,
  period,
  heightOfStockChart,
}) => {
  const chartColor = isPositive ? '#51CE72' : '#ef4444';
  const [step, setStep] = useState(0); // State to hold step size for Y-axis domain
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  // Process data for chart
  const chartData = useMemo(() => {
    const processedData = data.map((item) => ({
      ...item,
      historical: item.type === 'historical' ? item.close : null,
      predicted: item.type === 'predicted' ? item.close : null,
    }));

    // Find the transition point between historical and predicted data
    const lastHistoricalIndex = processedData.findLastIndex((item) => item.type === 'historical');
    const firstPredictedIndex = processedData.findIndex((item) => item.type === 'predicted');

    // If we have both historical and predicted data, create a connecting point
    if (lastHistoricalIndex !== -1 && firstPredictedIndex !== -1) {
      // Add the last historical value to the predicted line to create continuity
      processedData[lastHistoricalIndex].predicted = processedData[lastHistoricalIndex].close;
    }

    return processedData;
  }, [data]);

  const xAxisTicks = useMemo(() => {
    const dataLength = chartData.length;
    const tickCount = isMobile ? 3 : 5;
    const ticks: any = [];

    if (dataLength === 0) return ticks;

    const step = Math.max(1, Math.floor(dataLength / (tickCount - 1)));

    for (let i = 0; i < tickCount; i++) {
      const index = i * step;
      if (index < dataLength && !ticks.includes(index)) {
        ticks.push(index);
      }
    }

    if (ticks[ticks.length - 1] !== dataLength - 1) {
      ticks.push(dataLength - 1);
    }

    return ticks;
  }, [chartData.length, isMobile]);

  const transformedData = chartData.map((d, index, arr) => {
    const isLastHistorical =
      d.type === 'historical' && index === arr.findLastIndex((item) => item.type === 'historical');

    const isPredictedOrEdge = d.type === 'predicted' || isLastHistorical;
    const predicted = isPredictedOrEdge ? Number(d.close) : null;

    let band = null,
      bandLow = null;
    if (d.type === 'historical' && isLastHistorical) {
      band = [d.close, d.close];
      bandLow = [d.close, d.close];
    } else if (d.type === 'predicted') {
      band = [d.close, d.high];
      bandLow = [d.close, d.low];
    }

    const high =
      d.type === 'predicted' ? Number(d.high) : isLastHistorical ? Number(d.close) : null;

    const low = d.type === 'predicted' ? Number(d.low) : isLastHistorical ? Number(d.close) : null;

    return {
      ...d,
      predicted,
      index,
      date: typeof d.date === 'string' ? d.date : new Date(d.date).toISOString(),
      predictedHigh: high,
      predictedLow: low,
      band, // Array for AreaChart
      bandLow,
    };
  });

  const { minY, maxY } = getMinMax(transformedData, ['low', 'high']);

  // Calculate Y-axis domain
  const yAxisTicks = useMemo(() => {
    const isSmallRange = maxY < 10;
    const stepSize = (maxY - minY) / 4;

    setStep(stepSize); // optional if needed it in domain

    return Array.from({ length: 6 }, (_, i) =>
      parseFloat((minY + i * stepSize).toFixed(isSmallRange ? 3 : 2))
    );
  }, [minY, maxY]);

  // If loading, show skeleton
  if (loading) {
    console.log('Chart is loading...');
    return <EnhancedChartSkeleton heightOfStockChart={heightOfStockChart} />;
  }

  function getMinMax(data: any[], keys: string[]): { minY: number; maxY: number } {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    data.forEach((item) => {
      keys.forEach((key) => {
        const value = Number(item[key]);
        if (!isNaN(value)) {
          if (value < min) min = value;
          if (value > max) max = value;
        }
      });
    });

    return {
      minY: min === Number.POSITIVE_INFINITY ? 0 : min,
      maxY: max === Number.NEGATIVE_INFINITY ? 0 : max,
    };
  }

  return (
    <div
      className="w-90 h-60 min-h-60 relative"
      style={{ minWidth: '100%', minHeight: heightOfStockChart, height: heightOfStockChart }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={transformedData}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex != null) {
              setActiveIndex(state.activeTooltipIndex);
            } else {
              setActiveIndex(null);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <defs>
            <linearGradient id="bandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#51CE72" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#51CE72" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#51CE72" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <defs>
            <linearGradient id="bandLowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(226, 8, 12, 0)" />
              <stop offset="60%" stopColor="rgba(226, 8, 12, 0.2)" />
              <stop offset="100%" stopColor="rgba(226, 8, 12, 0.5)" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="index"
            ticks={xAxisTicks}
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#666' }}
            tickMargin={12}
            tickFormatter={(i) => {
              const date = transformedData[i]?.date;
              if (!date) return '';
              return new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });
            }}
          />

          <YAxis
            yAxisId="left"
            domain={[minY, maxY + step]}
            axisLine={false}
            tickLine={false}
            ticks={yAxisTicks}
            tickFormatter={(value) => `${value}`}
            tick={{ fontSize: 12, fill: '#666' }}
            interval={0}
          />

          <Area
            yAxisId="left"
            type="monotone"
            dataKey="band"
            fill="url(#bandGradient)"
            stroke="none"
            fillOpacity={0.2}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="bandLow"
            fill="url(#bandLowGradient)"
            stroke="none"
            fillOpacity={0.2}
          />
          <Tooltip content={<CustomTooltip symbol={symbol} />} />

          <Customized
            component={({ xAxisMap, yAxisMap, data, ...rest }: any) => {
              //@ts-ignore
              const xScale = Object.values(xAxisMap)[0]?.scale;
              //@ts-ignore
              const yScale = Object.values(yAxisMap)[0]?.scale;

              const index = data.findLastIndex((d: any) => d.type === 'historical');
              if (index === -1 || !xScale || !yScale) return null;

              const point = data[index];
              const x = xScale(point.index); //  use .index
              const y = yScale(point.close);

              if (isNaN(x) || isNaN(y)) return null;

              return (
                <svg
                  x={x - 15}
                  y={y - 15}
                  width={30}
                  height={30}
                  viewBox="0 0 30 30"
                  style={{ overflow: 'visible', pointerEvents: 'none' }}
                >
                  {/* <motion.circle
                    cx="15"
                    cy="15"
                    r="10"
                    fill="#51CE72"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: [1, 1.6], opacity: [1, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: 'easeInOut',
                    }}
                  /> */}
                  <circle cx="15" cy="15" r="5" fill="#51CE72" />
                </svg>
              );
            }}
          />

          {/* Historical line (if data has type field) */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="historical"
            stroke={chartColor}
            strokeWidth={2}
            dot={false}
            connectNulls={true}
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="predicted"
            stroke="#8B2B52"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
            connectNulls
            name="Predicted Line"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const EnhancedChartSkeleton = ({ heightOfStockChart }: any) => {
  return (
    <div
      className="w-full h-60 p-4 animate-pulse bg-[var(--primary-text-bg)] rounded-md flex items-center justify-center"
      style={{ minHeight: heightOfStockChart, height: heightOfStockChart }}
    >
      <span className="text-gray-500">Loading chart...</span>
    </div>
  );
};

export default React.memo(StockChart2);
