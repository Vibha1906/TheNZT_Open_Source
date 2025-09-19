'use client';
import { useMemo } from 'react';
import { PlotlyChart } from './PlotilyChart';
import { getUUID } from '@/utils/utility';
import { getSupportedChartTypes } from '@/utils/plotly';

// interface ICurrentActiveChart {
//   id: string;
//   activeChart: string;
// }
const GraphRenderer = ({ codeContent }: { codeContent: string }) => {
  // const [currentChart, setCurrentChart] = useState<ICurrentActiveChart[]>([]);

  // Parse the JSON content safely
  const parsedData = useMemo(() => {
    try {
      return JSON.parse(codeContent);
    } catch (error) {
      console.error('Failed to parse graph data:', error);
      return null;
    }
  }, [codeContent]);

  // Create datasets object
  const updatedChartData = useMemo(() => {
    if (!parsedData) return {};
    const supportedChartTypes =
      parsedData &&
      parsedData.chart_collection.map((chartData: any) => {
        if (chartData.chart_type === 'pie') {
          const response = getSupportedChartTypes(chartData);
          return response.push('pie');
        }
        return getSupportedChartTypes(chartData);
      });

    if (
      supportedChartTypes.length > 0 &&
      parsedData.chart_collection.length > 0 &&
      supportedChartTypes.length === parsedData.chart_collection.length
    ) {
      const chartData = parsedData.chart_collection.map((_: any, index: number) => {
        return {
          id: getUUID(),
          supportedTypes: supportedChartTypes[index],
          data: parsedData.chart_collection[index],
        };
      });

      return chartData;
    }
  }, [parsedData]);

  // useEffect(() => {
  //   if (updatedChartData && updatedChartData.length > 0 && currentChart.length === 0) {
  //     const defaultChartState = updatedChartData.map((chart: any) => {
  //       return {
  //         id: chart.id,
  //         activeChart: chart.supportedTypes[0],
  //       };
  //     });
  //     setCurrentChart(defaultChartState);
  //   }
  // }, [updatedChartData, currentChart.length]);

  // const chartTypeLabels = {
  //   lines: 'Line Chart',
  //   bar: 'Bar Chart',
  //   group_bar: 'Grouped Bar',
  //   pie: 'Pie Chart',
  // };

  // If parsing failed, show error
  if (!parsedData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
        <p className="text-red-700 text-sm">
          Failed to parse graph data. Please ensure the JSON format is correct.
        </p>
      </div>
    );
  }

  // const handleUpdateCurrentChart = (id: string, type: string) => {
  //   setCurrentChart((prev) => {
  //     const currentIdx = prev.findIndex((item) => item.id === id);

  //     // If not found or already the same type, do nothing (no re-render)
  //     if (currentIdx === -1 || prev[currentIdx].activeChart === type) {
  //       return prev;
  //     }

  //     // Only update if needed
  //     const updatedCurrentChart = [...prev];
  //     updatedCurrentChart[currentIdx] = { ...updatedCurrentChart[currentIdx], activeChart: type };
  //     console.log('updatedCurrentChart', updatedCurrentChart);
  //     return updatedCurrentChart;
  //   });
  // };

  return (
    <div className="my-6 rounded-lg">
      {updatedChartData.length > 0 && (
        <>
          <div className="mb-6">
            <div className="space-y-10">
              {updatedChartData.map((chartData: any, index: number) => {
                // const chartActiveType =
                //   currentChart.find((chart) => chart.id === chartData.id)?.activeChart || '';
                return (
                  <div key={chartData.id}>
                    {/* Tab container with the full-width bottom border */}
                    {/* <div className="border-b border-[rgba(16,40,34,0.10)] mb-6">
                      <div className="flex">
                        {Array.isArray(chartData.supportedTypes) &&
                          chartData.supportedTypes.length > 0 &&
                          chartData.supportedTypes.map((type: string) => {
                            const isActive = chartActiveType === type;

                            console.log('activeChart', isActive, type, chartData.id);
                            return (
                              <button
                                key={type}
                                onClick={() => handleUpdateCurrentChart(chartData.id, type)}
                                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                                    ? 'border-b-2 border-[#4B9770] text-[#102822] bg-[rgba(75,151,112,0.04)] mb-[-1px]'
                                    : 'border-b-2 border-transparent text-gray-500 hover:text-[#4B9770]'
                                  }`}
                              >
                                {chartTypeLabels[type as keyof typeof chartTypeLabels]}
                              </button>
                            );
                          })}
                      </div>
                    </div> */}

                    <div className="bg-white overflow-hidden">
                      <PlotlyChart
                        chartData={chartData.data}
                        chartType={chartData.data.chart_type}
                        showTitle={true}
                        className="transition-all duration-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GraphRenderer;
