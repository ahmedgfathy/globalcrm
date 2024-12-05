"use client";
import React from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import PieChartActive from "./PieChartActive";
import { useTheme } from 'next-themes';

function MainCard({ dataForChart, title }) {
  const { t } = useTranslation();
  return (
    <div className="h-max bg-Lightbg dark:bg-cardbgDark rounded-2xl flex flex-col justify-between items-center gap-2 py-6 shadow-box_shadow dark:shadow-none">
      <div className="flex flex-col w-full text-start px-6">
        {/* <p className="text-xl font-bold">{t("tasks")}</p> */}
        <p className="text-xl font-bold">{t(title)}</p>
        <p className="text-lg text-[#637381]">
          {t("according_to_achievement")}
        </p>
      </div>
      <div className="w-full flex justify-between items-center border-dashed border-b-2 border-[#2e3942] ">
        <div className="pb-5 w-full h-60">
          <PieChartActive dataForChart={dataForChart} />
        </div>
      </div>
      <ul className="w-full h-20 min-h-max flex flex-wrap justify-center items-center gap-x-2 px-6">
        {dataForChart?.map((data, index) => {
          return (
            <li className="flex justify-between items-center gap-2" key={index}>
              <span
                className={`p-1 rounded-full bg-[${data.fill}]`}
                style={{ backgroundColor: data.fill }}
              ></span>
              <p className="text-base max-sm:text-sm text-[#637381]">
                {data.name}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MainCard;
