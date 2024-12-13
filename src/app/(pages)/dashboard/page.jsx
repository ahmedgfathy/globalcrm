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
import { getPropertiesActivity } from "@/actions/propertiesAction";
import dynamic from "next/dynamic";

function Page() {
  // const MainCard = dynamic(() => import("@/app/components/dashboard/MainCard"), {
  //   ssr: false, 
  // });
  const router = useRouter();
  const [state] = useContext(UserContext);
  const [sources, setSources] = useState([]);
  const [unitsCount, setUnitsCount] = useState({
    "سكني": 0,
    "تجاري": 0,
    "اداري": 0,
    "طبي": 0,
  });
  const [data, setData] = useState({
    social_media_leads: 0,
    company_leads: 0,
    partner_leads: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const count = await getLastMonthLeadsCount();
      setData((prevData) => ({ ...prevData, partner_leads: count }));
    } catch (error) {
      console.error("Error fetching leads count:", error);
    }
  };

  const fetchUnitData = async () => {
    try {
      const units = await getPropertiesActivity();
      setUnitsCount(units);
    } catch (error) {
      console.error("Error fetching unit data:", error);
    }
  };

  const fetchSources = async () => {
    try {
      const documents = await getAllSettings();
      const dataJson = JSON.parse(documents[0]?.leadSettings || "{}");
      setSources(dataJson.customerSource || []);

      const res = await getLeadsBySource();
      const updatedSources = prepareChartData(dataJson.customerSource, res);
      setChartData(updatedSources);
    } catch (error) {
      console.error("Error fetching sources:", error);
    }
  };

  const prepareChartData = (sources = [], apiResponse = {}) => {
    const colors = ["#007867", "#ff5630", "#5f942e", "#ffc107", "#6a1b9a", "#00838f", "#c0ca33", "#8e24aa"];
    return sources.map((source, index) => ({
      name: source,
      value: apiResponse[source] || 0,
      fill: colors[index % colors.length],
    }));
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchData(), fetchUnitData(), fetchSources()]);
      setLoading(false);
    };
    fetchAllData();
  }, []);


  const unitsInfo = [
    { id: 1, title: "residential", number: unitsCount["سكني"] || 0, time: "last_s_days", percent: "+٢٫٦%", color: "#007867" },
    { id: 3, title: "administrative", number: unitsCount["اداري"] || 0, time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" },
    { id: 2, title: "commercial", number: unitsCount["تجاري"] || 0, time: "last_s_days", percent: "+٢٫٦%", color: "#5f942e" },
    { id: 4, title: "medical", number: unitsCount["طبي"] || 0, time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630" },
  ];

  const leadInfo = [
    { id: 1, title: "company_leads", number: "485", time: "last_s_days", percent: "+٢٫٦%", color: "#007867" },
    { id: 2, title: "partner_leads", number: "485", time: "last_s_days", percent: "+٢٫٦%", color: "#5f942e" },
    { id: 3, title: "total_leads", number: data.partner_leads, time: "last_s_days", percent: "+٢٫٦%", color: "#ff5630", fun: () => router.push("/leads") },
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
    }
  ];

  return (
    <ProtectedRoute>
      <div className="dashboard min-h-screen bg-slate-50">
        <div className="mx-auto container px-2 py-4 max-w-full pl-6 pr-20">
          {/* Stats Section */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3 mb-3">
            {unitsInfo.map((card) => (
              <div 
                key={card.id}
                className="bg-white/40 backdrop-blur-sm p-4 rounded-lg hover:bg-white/60 transition-colors duration-200 min-h-[120px]"
              >
                <SecondaryCards data={card} />
              </div>
            ))}
          </div>

          {/* Analytics Section */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3 mb-3">
            <div className="main-card row-span-2">
              <MainCard dataForChart={chartData} title="social_media_leads" target="lead" />
            </div>
            {leadInfo.map((card) => (
              <div className="secondary-card" key={card.id}>
                <SecondaryCards data={card} />
              </div>
            ))}
          </div>

          {/* Activity Section */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3">
            <div className="main-card row-span-2">
              <MainCard dataForChart={chartData} title="tasks" />
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
