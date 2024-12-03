"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";
import MainCard from "@/app/components/dashboard/MainCard";
import SecondaryCards from "@/app/components/dashboard/SecondaryCards";
import ActionsCard from "@/app/components/dashboard/ActionsCard";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineRecentActors } from "react-icons/md";
import RecentChart from "@/app/components/dashboard/RecentChart";
import ProtectedRoute from "@/app/components/ProtectedRoute"
function Page() {
  const router = useRouter();
  const [state] = useContext(UserContext);



  const dataForChart = [
    { name: "A", value: 14, fill: "#007867" },
    { name: "B", value: 6, fill: "#ff5630" },
    { name: "C", value: 4, fill: "#5f942e" },
    { name: "D", value: 3, fill: "#ffc107" },
  ];
  const unitsInfo = [
    { id: 1, title: "residential", number: "1102", time: "last_s_days", percent: "+٢٫٦%", color: "#007867" },
    { id: 2, title: "commercial", number: "1587", time: "last_s_days", percent: "+٢٫٦%", color: "#5f942e" },
    { id: 3, title: "administrative", number: "2602", time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" },
    { id: 4, title: "resil", number: "1205", time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" }
  ]
  const leadInfo = [
    { id: 1, title: "social_media_leads", number: "1025", time: "last_s_days", percent: "+٢٫٦%", color: "#007867" },
    { id: 2, title: "company_leads", number: "485", time: "last_s_days", percent: "+٢٫٦%", color: "#5f942e" },
    { id: 3, title: "partner_leads", number: "2001", time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" },
    { id: 4, title: "partner_leads", number: "2640", time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" }
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
    {
      id: 4,
      title: "",
      subTitle: "",
      number: "",
      time: "",
      percent: "",
      icon: () => {},
      link: "",
      description: "",
      actions: [
        // { name: "add_event", onClick: () => { } },
      ],
    },
  ];


  return (
    <ProtectedRoute>
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
          {leadInfo.map((card) => {
            return (
              <div className="secondary-card" key={card.id}>
                <SecondaryCards data={card} />
              </div>
            );
          })}
        </div>
        <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-4 px-4 py-4">
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
      </div>
    </div>
  </ProtectedRoute>
  );
}

export default Page;
