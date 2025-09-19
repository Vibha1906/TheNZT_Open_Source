import React, { useCallback } from 'react';
import { ISelectedPeriodData } from './FinanaceChart';

interface TimePeriodTabsProps {
  symbol: string;
  selectedPeriod: string;
  selectedPeriodData: ISelectedPeriodData[];
  onPeriodChange: (period: string, symbol: string) => void;
  periodsList?: string[]; // Optional, if periods are available
}

const TimePeriodTabs: React.FC<TimePeriodTabsProps> = ({
  symbol,
  selectedPeriod,
  selectedPeriodData,
  onPeriodChange,
  periodsList,
}) => {
  function handle(period: string) {
    onPeriodChange(period, symbol);
  }

  return (
    <div className="flex border-b border-gray-200 overflow-x-auto pb-1 mb-3">
      {Array.isArray(periodsList) &&
        periodsList.map((period) => {
          const activeTab = selectedPeriodData.some(
            (item) => item.symbol + selectedPeriod === symbol + period
          );
          return (
            <div
              key={period}
              className={`time-period-tab ${activeTab ? 'active' : ''} xs:text-xs text-[9px] leading-normal`}
              onClick={() => handle(period)}
            >
              {period}
            </div>
          );
        })}
    </div>
  );
};

export default TimePeriodTabs;
