"use client";
import React from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

function MainCard({ dataForChart, title, target }) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="h-max bg-transparent dark:bg-transparent rounded-2xl flex flex-col justify-between items-center gap-2 py-6">
      <div className="flex flex-col w-full text-start px-6">
        <p className="text-xl font-bold dark:text-white">{t(title)}</p>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t("according_to_achievement")}
        </p>
      </div>
      <div className="w-full flex justify-between items-center border-dashed border-b-2 border-gray-200 dark:border-gray-700">
        <div className="pb-5 w-full h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataForChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
                stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'}
              />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#4b5563'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                  color: theme === 'dark' ? '#ffffff' : '#000000'
                }}
              />
              <Bar 
                dataKey="value" 
                fill={theme === 'dark' ? '#059669' : '#007867'}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <ul className="w-full h-20 min-h-max flex flex-wrap justify-center items-center gap-x-2 px-6">
        {dataForChart?.map((data, index) => (
          <li className="flex justify-between items-center gap-2" key={index}>
            <span
              className="p-1 rounded-full"
              style={{ backgroundColor: data.fill }}
            ></span>
            <p className="text-base max-sm:text-sm text-gray-600 dark:text-gray-400">
              {data.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainCard;
