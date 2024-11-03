"use client";

import React from 'react';
import ChartComponent from '../components/dashboard/ChartOne';
import CardsComponentTwo from '../components/dashboard/CardsComponentTwo';


function Page() {
  return (
    <div className="dashboard pt-20 ">
      <div className="mx-auto px-7 py-8 max-[1200px]:px-12 w-full flex flex-wrap justify-between items-start gap-3 max-[900px]:gap-7" dir="rtl">
        <div className="w-[24%] max-[1200px]:w-full min-h-[436px] h-max bg-[#1c252e] rounded-2xl flex flex-col justify-between items-center gap-2 px-6 py-6 shadow-box_shadow">
          <div className="flex flex-col w-full text-start">
            <p className="text-xl font-bold">المهام</p>
            <p className="text-lg text-[#637381]">بحسب الانجاز</p>
          </div>
          <div className="w-full flex justify-between items-center border-dashed border-b-2 border-[#2e3942]">
            <ChartComponent />
          </div>
          <ul className="w-full h-20 min-h-max flex flex-wrap justify-center items-center gap-x-2">
            <li className="flex justify-between items-center gap-2">
              <span className="p-1 rounded-full bg-[#007867]"></span>
              <p className="text-base max-sm:text-sm text-[#637381]">المهام المنفذة</p>
            </li>
            <li className="flex justify-between items-center gap-2">
              <span className="p-1 rounded-full bg-[#007867]"></span>
              <p className="text-base max-sm:text-sm text-[#637381]">المهام المنفذة</p>
            </li>
            <li className="flex justify-between items-center gap-2">
              <span className="p-1 rounded-full bg-[#007867]"></span>
              <p className="text-base max-sm:text-sm text-[#637381]">المهام المنفذة</p>
            </li>
            <li className="flex justify-between items-center gap-2">
              <span className="p-1 rounded-full bg-[#007867]"></span>
              <p className="text-base max-sm:text-sm text-[#637381]">المهام المنفذة</p>
            </li>
          </ul>
        </div>

        <CardsComponentTwo />
        
      </div>
    </div>
  );
}

export default Page;
