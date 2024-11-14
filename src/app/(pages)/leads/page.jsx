"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import ClientTable from "@/app/components/ClientTable";
import { filterData } from "./data";
import Filter from "@/app/components/Filter";
import { IoMdAddCircle } from "react-icons/io";
import CustomButton from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { FaFileExport, FaFileImport } from "react-icons/fa";
import { getAllLeads } from "@/actions/leadsAction";
import { DropdownMenImportExport } from "@/app/components/leadImport-Export/ImportExport";
import { Grid } from "@mui/material";
function Page() {
  const router = useRouter()
  const { t } = useTranslation();
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const leadsData = await getAllLeads();
      setLeads(leadsData);
      console.log(leadsData)
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };
  useEffect(() => {
    fetchLeads();
  }, []);
              // placeholder={`${t("search_client")} ...`}

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
       <Grid container className="flex justify-center gap-1 w-full mt-5 mb-3 " dir="ltr">
          <Grid item xs={12} sm={7} md={11.3} lg={11.4} className="flex items-center justify-end gap-2" >
            <div className="w-3/4 h-max max-[450px]:w-full  dark:shadow-none rounded-xl">
              <input
                type="text"
                className="w-full  bg-Lightbg dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md p-2 max-[450px]:py-1"
              placeholder={`${t("search_client")} ...`}
              />
            </div>
            <div className="">
              <CustomButton
              fun={()=>router.push("/units/add-unit")}
              title={t("add_lead")}
              icon={()=><IoMdAddCircle />}
              />
            </div>
          </Grid>
        </Grid>


        <div className="filter bg-Lightbg dark:bg-transparent rounded-xl w-full h-[60px] max-[450px]:h-max max-[450px]:py-2 flex justify-end max-[450px]:flex-wrap items-center mb-5 max-[450px]:mb-0 gap-3 px-3 shadow-box_shadow dark:shadow-none" dir="ltr">
        <div className="filter w-full md:w-3/4">
          <Filter data={filterData} />
        </div>
        <DropdownMenImportExport />
      </div>

      <div className="w-full bg-Lightbg dark:bg-cardbgDark shadow rounded-lg overflow-hidden" dir="rtl">
        <ClientTable clients={leads} t={t} afterDel={fetchLeads} />
      </div>
      
      <div className="flex justify-center mt-4">
        <Pagination className="dark:bg-gray-800 px-3 py-2 rounded-md" defaultCurrent={1} total={500} />
      </div>
    </div>
  );
}

export default Page;