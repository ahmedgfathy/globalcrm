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

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [leadsCount, units, settings, sourceData] = await Promise.all([
        getLastMonthLeadsCount(),
        getPropertiesActivity(),
        getAllSettings(),
        getLeadsBySource(),
      ]);

      const dataJson = JSON.parse(settings[0]?.leadSettings || "{}");
      const customerSources = dataJson.customerSource || [];
      
      setData({
        social_media_leads: 0,
        company_leads: 485,
        partner_leads: leadsCount
      });
      setUnitsCount(units);
      setChartData(prepareChartData(customerSources, sourceData));
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const prepareChartData = (sources = [], apiResponse = {}) => {
    const colors = ["#007867", "#ff5630", "#5f942e", "#ffc107", "#6a1b9a", "#00838f", "#c0ca33", "#8e24aa"];
    return sources.map((source, index) => ({
      name: source,
      value: apiResponse[source] || 0,
      fill: colors[index % colors.length],
    }));
  };

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
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {loading ? (
            // Loading skeleton
            <div className="grid gap-4 animate-pulse">
              <div className="h-32 bg-white/60 dark:bg-gray-800/60 rounded-xl"></div>
              <div className="grid lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-white/60 dark:bg-gray-800/60 rounded-xl"></div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                {unitsInfo.map((card) => (
                  <div key={card.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow dark:border dark:border-gray-700">
                    <SecondaryCards data={card} />
                  </div>
                ))}
              </div>

              {/* Main Dashboard Content */}
              <div className="grid lg:grid-cols-3 gap-4">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 dark:border dark:border-gray-700">
                  <MainCard 
                    dataForChart={chartData} 
                    title="social_media_leads" 
                    target="lead"
                  />
                </div>
                
                {/* Lead Stats */}
                <div className="space-y-4">
                  {leadInfo.map((card) => (
                    <div key={card.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow dark:border dark:border-gray-700">
                      <SecondaryCards data={card} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Section */}
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 dark:border dark:border-gray-700">
                  <MainCard dataForChart={chartData} title="tasks" />
                </div>
                <div className="space-y-4">
                  {sectionOne.map((card) => (
                    <div key={card.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow dark:border dark:border-gray-700">
                      <ActionsCard card={card} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
//hello_upload
export default Page;
