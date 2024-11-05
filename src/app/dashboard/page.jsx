"use client";
import React from "react";
import MainCard from "../components/dashboard/MainCard";
import SecondaryCards from "../components/dashboard/SecondaryCards";

function Page() {
  const dataForChart = [
    { name: "A", value: 14, fill: "#c8fad6" },
    { name: "B", value: 6, fill: "#004b50" },
    { name: "C", value: 4, fill: "#007867" },
    { name: "D", value: 3, fill: "#5be49b" },
  ];
  const commonInfo = {
    title: "employee_count",
    number: "١٬٥٠٠",
    time: "last_s_days",
    percent: "+٢٫٦%",
  };

  const cardInfo = Array.from({ length: 3 }, (_, index) => ({
    ...commonInfo,
    id: index + 1,
  }));

  return (
    <div className="dashboard pt-10">
      <div className="mx-auto container">
        <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-6">
          <div className="main-card row-span-2">
            <MainCard dataForChart={dataForChart} />
          </div>
          {cardInfo?.map((card, index) => {
            return (
              <div className="secondary-card" key={index}>
                <SecondaryCards data={card} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
