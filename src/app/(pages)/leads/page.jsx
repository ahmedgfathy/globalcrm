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
import "./pagination.css"

function Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const leadsPerPage = 10; 

  const fetchLeads = async (page = 1) => {
    const offset = (page - 1) * leadsPerPage;
    try {
      const { leads, totalLeads } = await getAllLeads(leadsPerPage, offset);
      setLeads(leads);
      setTotalLeads(totalLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        <div className="w-full bg-Lightbg dark:bg-cardbgDark shadow rounded-lg overflow-hidden" dir="rtl">
        <ClientTable clients={leads} t={t} afterDel={fetchLeads} onAddLead={()=>router.push("/leads/add-lead")} filterData={filterData} />
      </div>
      <div className="flex justify-center mt-4" dir="ltr">
        <Pagination
          current={currentPage}
          total={totalLeads}
          pageSize={leadsPerPage}
          onChange={handlePageChange}
          className="custom-pagination"
        />
      </div>
    </div>
  );
}

export default Page;