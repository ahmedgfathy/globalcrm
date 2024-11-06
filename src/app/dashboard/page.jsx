"use client";
import React from "react";
import MainCard from "../components/dashboard/MainCard";
import SecondaryCards from "../components/dashboard/SecondaryCards";
import ActionsCard from "../components/dashboard/ActionsCard";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineRecentActors } from "react-icons/md";

function Page() {
  const dataForChart = [
    { name: "A", value: 14, fill: "#004D99" },
    { name: "B", value: 6, fill: "#3D2785" },
    { name: "C", value: 4, fill: "#F5921B" },
    { name: "D", value: 3, fill: "#87BB62" },
  ];
  const commonInfo = {
    title: "employee_count",
    number: "١٬٥٠٠",
    time: "last_s_days",
    percent: "+٢٫٦%",
  };
  const sectionOne = [
    {
      id: 1,
      title: "",
      number: "",
      time: "",
      percent: "",
      icon: ()=>{},
      link: "",
      description: "",
    },
    {
      id: 2,
      title: "Recent Activities",
      number: "1,200",
      time: "Last 5 days",
      percent: "+٣٫٥%",
      icon: ()=><MdOutlineRecentActors />,
      link: "/details/activities",
      description: "أحدث الأنشطة والمشاركات في النظام",
    },
    {
      id: 3,
      title: "Calendar",
      number: "Events",
      time: "Upcoming",
      percent: "",
      icon: ()=><FaCalendarAlt />,
      link: "/calendar",
      description: "جدولة الأحداث القادمة والمواعيد الهامة",
      actions: [
        { name: "Add Event", onClick: () => {/* إضافة حدث */} },
      ],
    },
  ];
  

  const cardInfo = Array.from({ length: 3 }, (_, index) => ({
    ...commonInfo,
    id: index + 1,
  }));

  return (
    <div className="dashboard pt-10">
        <div className="mx-auto container">
          <div className="grid lg:grid-cols-3 max-sm:grid-cols-1 gap-4 px-4 py-4">
          {sectionOne?.map((card, index) => {
              return (
                <div className="actions-card" key={index}>
                  <ActionsCard card={card} />
                </div>
              );
            })}
          </div>
          <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-4 px-4">
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
