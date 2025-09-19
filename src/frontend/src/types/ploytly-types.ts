
export type PlotlyChartProps = {
  chartData: any;
  width?: string | number;
  height?: number;
  chartType?: string | null;
  showTitle?: boolean;
  customColors?: string[] | null;
  className?: string;
};