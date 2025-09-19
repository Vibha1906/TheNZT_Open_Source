export const COLOR_PALETTE = [
  '#3B82F6',
  "#F97316",
  '#10B981',
  "#8B5CF6",
  '#EF4444',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#F97316',
  '#06B6D4',
  '#EC4899',
  '#84CC16',
  '#6366F1',
];

export const CHART_COLOR_MAP: Record<string, string> = {
  "Total Income": "#FABC4B",
  "Net Income": " #FF8000",
  "Cash & Investments": "#EF4444",
  "Revenue": "#f7b23cff",
  "Net Profit": "#d67506ff",
  "Market Cap": "#581579",
  "P/E Ratio": '#185a06',
  "GDP Growth Rate": '#4aa0b6ff',
  "CPI Inflation": "#b45698ff",
  "Debt-to-GDP": "#bdc572ff",
  "Trade Balance": "#ec9fb6ff",
  "FDI Inflows": "#916666ff"
};

 // Responsive configuration based on screen size
  export const getResponsiveConfig = (screenSize:string,windowHeight:number,height:number,showTitle:boolean) => {
    const isMobile = screenSize === 'mobile';
    const isTablet = screenSize === 'tablet';

    return {
      // Dynamic height based on screen size
      dynamicHeight:
        windowHeight < 800
          ? 300
          : isMobile
            ? Math.min(height * 0.8, 400)
            : isTablet
              ? height - 100
              : height,

      // Responsive margins
      margins: {
        l: isMobile ? 30 : isTablet ? 40 : 50,
        r: isMobile ? 10 : isTablet ? 20 : 30,
        t: showTitle ? (isMobile ? 60 : isTablet ? 70 : 80) : isMobile ? 20 : 40,
        b: 40,
      },

      // Responsive font sizes
      titleFontSize: isMobile ? 14 : isTablet ? 16 : 18,
      axisLabelFontSize: isMobile ? 10 : isTablet ? 11 : 12,
      tickFontSize: isMobile ? 9 : isTablet ? 10 : 11,
      legendFontSize: isMobile ? 9 : isTablet ? 10 : 11,

      // Legend configuration
      legendConfig: isMobile
        ? {
          orientation: 'h',
          y: -0.6,
          x: 0.5,
          xanchor: 'center',
          yanchor: 'top',
          bgcolor: 'transparent',
          bordercolor: '#E5E7EB',
          borderwidth: 0,
          font: { size: 9 },
        }
        : {
          orientation: 'h',
          y: isTablet ? -0.5 : -0.4,
          x: 0.5,
          xanchor: 'center',
          yanchor: 'top',
          bgcolor: 'transparent',
          bordercolor: '#E5E7EB',
          borderwidth: 0,
          font: { size: isTablet ? 10 : 11 },
        },
    };
  };


  
// Utility function to check what chart types are supported by the data
export const getSupportedChartTypes = (chartData: any) => {
  if (!chartData) {
    return [];
  }

  const { data } = chartData;

  if (!data || data.length === 0) return [];

  const supportedTypes: string[] = [];

  // Check for lines - needs at least one series with x,y data
  if (
    data.length >= 1 &&
    data[0].x_axis_data &&
    data[0].y_axis_data &&
    data[0].x_axis_data.length > 0 &&
    data[0].y_axis_data.length > 0
  ) {
    supportedTypes.push('lines');
  }

  // Check for bar - needs at least one series
  if (
    data.length >= 1 &&
    data[0].x_axis_data &&
    data[0].y_axis_data &&
    data[0].x_axis_data.length > 0 &&
    data[0].y_axis_data.length > 0
  ) {
    supportedTypes.push('bar');
  }

  // Check for group_bar - needs multiple series with same x-axis structure
  if (data.length >= 2) {
    const firstSeriesLength = data[0].x_axis_data?.length || 0;
    const allSeriesValid = data.every(
      (series: any) =>
        series.x_axis_data &&
        series.y_axis_data &&
        series.x_axis_data.length > 0 &&
        series.y_axis_data.length > 0
    );
    if (allSeriesValid && firstSeriesLength > 0) {
      supportedTypes.push('group_bar');
    }
  }

  // // Check for pie - needs one series with labels and positive values
  // if (
  //   data.length >= 1 &&
  //   data[0].x_axis_data &&
  //   data[0].y_axis_data &&
  //   data[0].x_axis_data.length > 0 &&
  //   data[0].y_axis_data.length > 0 &&
  //   data[0].y_axis_data.every((val: any) => typeof val === 'number' && val >= 0)
  // ) {
  //   console.log('Pie chart supported', data);
  //   supportedTypes.push('pie');
  // }

  return supportedTypes;
};