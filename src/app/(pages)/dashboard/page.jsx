"use client";
import React from "react";
import MainCard from "@/app/components/dashboard/MainCard";
import SecondaryCards from "@/app/components/dashboard/SecondaryCards";
import ActionsCard from "@/app/components/dashboard/ActionsCard";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineRecentActors } from "react-icons/md";
import RecentChart from "@/app/components/dashboard/RecentChart";

function Page() {
  const dataForChart = [
    { name: "A", value: 14, fill: "#007867" },
    { name: "B", value: 6, fill: "#ff5630" },
    { name: "C", value: 4, fill: "#5f942e" },
    { name: "D", value: 3, fill: "#ffc107" },
  ];
  const unitsInfo = [
    { id: 1, title: "units", number: "15_00", time: "last_s_days", percent: "+٢٫٦%", color: "#007867" },
    { id: 2, title: "units", number: "15_00", time: "last_s_days", percent: "+٢٫٦%", color: "#5f942e" },
    { id: 3, title: "units", number: "15_00", time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" },
    { id: 4, title: "units", number: "15_00", time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" }
  ]
  const leadinfo = [
    { id: 1, title: "leads", number: "15_00", time: "last_s_days", percent: "+٢٫٦%", color: "#007867" },
    { id: 2, title: "leads", number: "15_00", time: "last_s_days", percent: "+٢٫٦%", color: "#5f942e" },
    { id: 3, title: "leads", number: "15_00", time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" },
    { id: 4, title: "leads", number: "15_00", time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" }
  ]
  const sectionOne = [
    {
      id: 2,
      title: "recent_activities",
      number: "1,200",
      subTitle: "",
      time: "",
      percent: "",
      icon: () => <MdOutlineRecentActors />,
      chart: () => <RecentChart />,
      link: "/details/activities",
      description: "recent_card_description",
    },
    {
      id: 3,
      title: "calendar",
      subTitle: "events",
      number: "",
      time: "",
      percent: "",
      icon: () => <FaCalendarAlt />,
      link: "/calendar",
      description: "calendar_card_description",
      actions: [
        { name: "add_event", onClick: () => { } },
      ],
    },
  ];


  return (
    <div className="dashboard py-10 max-sm:px-4">
      <div className="mx-auto container">

        <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-4 px-4 py-4">
          {unitsInfo.map((card) => {
            return (
              <div className="secondary-card" key={card.id}>
                <SecondaryCards data={card} />
              </div>
            );
          })}
        </div>
        <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-4 px-4 py-4">
          {leadinfo.map((card) => {
            return (
              <div className="secondary-card" key={card.id}>
                <SecondaryCards data={card} />
              </div>
            );
          })}
        </div>
        <div className="grid lg:grid-cols-3 max-sm:grid-cols-1 gap-4 px-4 py-4">
          {sectionOne?.map((card, index) => {
            return (
              <div className="actions-card" key={index}>
                <ActionsCard card={card} />
              </div>
            );
          })}
          <div className="main-card row-span-2">
            <MainCard dataForChart={dataForChart} />
          </div>
        </div>
        {/* <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-4 px-4 py-4">
          <div className="main-card row-span-2">
            <MainCard dataForChart={dataForChart} />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Page;
