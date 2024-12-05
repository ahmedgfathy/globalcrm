"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";
import MainCard from "@/app/components/dashboard/MainCard";
import SecondaryCards from "@/app/components/dashboard/SecondaryCards";
import ActionsCard from "@/app/components/dashboard/ActionsCard";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineRecentActors } from "react-icons/md";
import RecentChart from "@/app/components/dashboard/RecentChart";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getLastMonthLeadsCount, getLeadsBySource } from "@/actions/leadsAction";
import { getAllSettings } from "@/actions/filterSettings";

function Page() {
  const router = useRouter();
  const [state] = useContext(UserContext);
  const [sources, setSources] = useState([]);
  const [data, setData] = useState({
    social_media_leads: 0,
    company_leads: 0,
    partner_leads: 0,
  });
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    const count = await getLastMonthLeadsCount();
    setData((prevData) => ({ ...prevData, partner_leads: count }));
    console.log(count);
  };

  const fetchSources = async () => {
    const documents = await getAllSettings();
    const dataJson = JSON.parse(documents[0].leadSettings);
    setSources(dataJson.customerSource);

    const res = await getLeadsBySource();
    const updatedSources = prepareChartData(dataJson.customerSource, res);
    setChartData(updatedSources); 
    console.log(res);
  };

  const prepareChartData = (sources, apiResponse) => {
    const colors = ["#007867", "#ff5630", "#5f942e", "#ffc107", "#6a1b9a", "#00838f", "#c0ca33", "#8e24aa"];

    return sources.map((source, index) => ({
      name: source,
      value: apiResponse[source] || 0,
      fill: colors[index % colors.length],
    }));
  };

  useEffect(() => {
    console.log(chartData)
  }, [chartData]);
  useEffect(() => {
    fetchData();
    fetchSources();
  }, []);

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
    { id: 4, title: "resil", number: "1205", time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" },
  ];

  const leadInfo = [
    { id: 2, title: "company_leads", number: "485", time: "last_s_days", percent: "+٢٫٦%", color: "#5f942e" },
    { id: 4, title: "partner_leads", number: "2640", time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" },
    { id: 3, title: "total_leads", number: data.partner_leads, time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630", fun: ()=>router.push('/leads') },
  ];

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
      actions: [{ name: "add_event", onClick: () => {} }],
    },
    {
      id: 4,
      title: "",
      subTitle: "",
      number: "",
      time: "",
      percent: "",
      // icon: () => <FaCalendarAlt />,
      link: "",
      description: "",
      // actions: [{ name: "add_event", onClick: () => {} }],
    },
  ];

  return (
    <ProtectedRoute>
      <div className="dashboard py-10 max-sm:px-4">
        <div className="mx-auto container">
          <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-4 px-4 py-4">
            {unitsInfo.map((card) => (
              <div className="secondary-card" key={card.id}>
                <SecondaryCards data={card} />
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-4 px-4 py-4">
            <div className="main-card row-span-2">
              <MainCard dataForChart={chartData} title="social_media_leads" target="lead" />
            </div>
            {leadInfo.map((card) => (
              <div className="secondary-card" key={card.id}>
                <SecondaryCards data={card} />
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-4 px-4 py-4">
          <div className="main-card row-span-2">
            <MainCard dataForChart={dataForChart} title="tasks" />
          </div>
            {sectionOne.map((card, index) => (
              <div className="actions-card" key={index}>
                <ActionsCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Page;
