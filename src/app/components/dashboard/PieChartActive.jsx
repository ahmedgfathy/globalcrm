"use client";
import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

const renderActiveShape = (props, isDarkMode) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 4) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fontWeight="bold" fill={isDarkMode ? "white" : "black"}>{`${value}`}</text>
      {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fontSize="12px" fill={isDarkMode ? "white" : "black"}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

const PieChartActive = ({ dataForChart, target }) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const handleClick = () => {
    if (target === "lead" && dataForChart[activeIndex]?.name) {
        router.push(`/leads?filter=Leads Source&data=${dataForChart[activeIndex]?.name}`);
    } else {
        console.error("Invalid data for navigation");
    }
};
// http://localhost:3000/leads?customerSource=Website

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props) => renderActiveShape(props, isDarkMode)}
          data={dataForChart}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={65}
          dataKey="value"
          onMouseEnter={onPieEnter}
          onClick={handleClick}
        
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartActive;
