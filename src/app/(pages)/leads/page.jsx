"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import ClientTable from "@/app/components/ClientTable";
import { filterData } from "./data";
import { useRouter } from "next/navigation";
import { getAllLeads } from "@/actions/leadsAction";
import { Grid } from "@mui/material";
import { Input } from "@/components/ui/input";
import EmptyPage from "@/app/components/EmptyPage";
function Page() {
  const router = useRouter()
  const { t } = useTranslation();
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const leadsData = await getAllLeads();
      setLeads(leadsData);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };
  useEffect(() => {
    fetchLeads();
  }, []);
  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
       <Grid className="w-full my-2" dir="ltr">
          <Grid item xs={12} sm={7} md={11.3} lg={11.4} className="flex items-center justify-between gap-2" >
            <div className="w-3/4 h-max max-[450px]:w-full dark:shadow-none rounded-xl">
              <Input
                type="text"
                className="w-full bg-Lightbg dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md p-2 max-[450px]:py-1"
              placeholder={`${t("search_client")} ...`}
              />
            </div>
          </Grid>
        </Grid>
      {/* {leads && leads.length > 0 ? ( */}
        <div className="w-full bg-Lightbg dark:bg-cardbgDark shadow rounded-lg overflow-hidden" dir="rtl">
        <ClientTable clients={leads} t={t} afterDel={fetchLeads} onAddLead={()=>router.push("/leads/add-lead")} filterData={filterData} />
      </div>
      {/* ) : ( <EmptyPage /> )} */}
      <div className="flex justify-center mt-4" dir="ltr">
        <Pagination className="dark:bg-gray-800 px-3 py-2 rounded-md" defaultCurrent={1} total={500} />
      </div>
    </div>
  );
}

export default Page;