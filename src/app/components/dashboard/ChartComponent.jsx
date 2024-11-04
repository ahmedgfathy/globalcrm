"use client";
import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const dataForChart = [
    { name: 'A', value: 14 },
    { name: 'B', value: 6 },
    { name: 'C', value: 4 },
    { name: 'D', value: 3 },
];

function ChartComponent() {
    return (
        <div className="pb-5 w-full h-60">
            <ResponsiveContainer >
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={dataForChart}
                        innerRadius={65}
                        outerRadius={88}
                        fill="#007867"
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
export default ChartComponent;
