/**
 * TimeSeriesChart component renders a line chart that visualizes bird flu data over time.
 * It highlights specific seasons and shows detailed information using custom tooltips.
 * The chart is interactive, allowing users to see trends and analyze flu cases by type.
 */

import React from 'react'; // Core React library for building the component
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceArea 
} from 'recharts'; // Recharts library for creating charts and data visualizations
import { ChartData } from '../types/birdFluTypes'; // Type definitions for chart data structure
import { fluTypeColors } from '../constants/colors'; // Import color scheme for flu types

interface TimeSeriesChartProps {
  data: ChartData[]; // Array of data points to display on the chart
  highlightedSeason: string; // Season to be highlighted (e.g., '2020 - Winter')
  pastRange: string[]; // Array of dates that represent the past range for shading
}

// Custom tooltip component to display data details
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload[0]?.payload.total; // Access the total value from the payload

    // Render a tooltip with individual flu type counts and the total
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: fluTypeColors[entry.name] }}>
            {entry.name}: {entry.value}
          </p>
        ))}
        <p style={{ fontWeight: 'bold' }}>Total: {total}</p> {/* Display total on a separate line */}
      </div>
    );
  }

  return null; // Return null if no tooltip content should be displayed
};

// Main TimeSeriesChart component responsible for rendering the line chart
const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data, highlightedSeason, pastRange }) => {
  // Function to determine the styling of lines based on whether the season is highlighted
  const highlightStyle = (season: string) => season === highlightedSeason ? { strokeWidth: 3 } : { strokeWidth: 1 };

  // Determine the last date in the past range to shade up to that point
  const lastPastDate = pastRange[pastRange.length - 1];

  // Format the X-axis labels based on the view mode (either show only the year or full date)
  const formatXAxis = (tick: string) => {
    const [year, detail] = tick.split(' - ');
    return detail ? `${year}` : tick; // Adjust based on whether the detail is present
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" /> {/* Grid lines for better readability */}
        <XAxis dataKey="date" tickFormatter={formatXAxis} /> {/* X-axis with formatted labels */}
        <YAxis /> {/* Y-axis for flu case counts */}
        <Tooltip content={<CustomTooltip />} /> {/* Custom tooltip for data display */}
        <Legend /> {/* Legend for identifying the lines */}

        {/* Shading the area for the past dates to indicate the data range that has already occurred */}
        {lastPastDate && (
          <ReferenceArea
            x1={data[0].date}
            x2={lastPastDate}
            strokeOpacity={0.3}
            fill="#f0f0f0"
            ifOverflow="extendDomain"
          />
        )}

        {/* Lines representing different flu types with dynamic styling based on highlighted seasons */}
        <Line type="monotone" dataKey="H5N1" stroke={fluTypeColors['H5N1']} {...highlightStyle('H5N1')} />
        <Line type="monotone" dataKey="H5N2" stroke={fluTypeColors['H5N2']} {...highlightStyle('H5N2')} />
        <Line type="monotone" dataKey="H7N2" stroke={fluTypeColors['H7N2']} {...highlightStyle('H7N2')} />
        <Line type="monotone" dataKey="H7N8" stroke={fluTypeColors['H7N8']} {...highlightStyle('H7N8')} />
        <Line type="monotone" dataKey="Unknown" stroke={fluTypeColors['Unknown']} {...highlightStyle('Unknown')} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;
