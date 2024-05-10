import React from 'rect';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Rect } from 'recharts';

const HeatMap = ({ data, valueKey, rowKey, xLabels, yLabels, colors }) => {
  const minValue = Math.min(...data.map((item) => item[valueKey]));
  const maxValue = Math.max(...data.map((item) => item[valueKey]));

  const getColor = (value) => {
    const ratio = (value - minValue) / (maxValue - minValue);
    const colorIndex = Math.floor(ratio * colors.length);
    return colors[colorIndex];
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={rowKey}
        xLabels={xLabels}
        type="category"
        allowDuplicatedCategory={false}
      />
      <YAxis
        dataKey={rowKey}
        yLabels={yLabels}
        type="category"
        allowDuplicatedCategory={false}
      />
      <Tooltip />
      <Legend />
      {data.map((item, index) => (
        <Rect
          key={`rect-${index}`}
          x={index}
          y={index}
          width={1}
          height={1}
          fill={getColor(item[valueKey])}
        />
      ))}
    </ResponsiveContainer>
  );
};

export default HeatMap;