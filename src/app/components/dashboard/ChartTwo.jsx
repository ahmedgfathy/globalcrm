"use client";

import React from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Page A', uv: 40, pv: 20, amt: 40 },
    { name: 'Page B', uv: 30, pv: 19, amt: 20 },
    { name: 'Page c', uv: 70, pv: 90, amt: 22 },
    { name: 'Page D', uv: 60, pv: 90, amt: 22 },
    { name: 'Page E', uv: 40, pv: 90, amt: 22 },
    { name: 'Page F', uv: 20, pv: 90, amt: 22 },
    { name: 'Page G', uv: 30, pv: 90, amt: 22 },
];

const ChartComponentTwo = () => {
    return (
        <ResponsiveContainer width={50} height={50}>
            <BarChart width={30} height={140} data={data}>
                <Bar dataKey="uv" fill="#007867" />
            </BarChart>
            <Tooltip />
        </ResponsiveContainer>
    );
};

export default ChartComponentTwo;
