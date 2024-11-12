"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React from "react";
import { Pagination } from "antd";
import ClientTable from "@/app/components/ClientTable";
import { ClientDetails, filterData } from "./data";
import Filter from "@/app/components/Filter";
import { IoMdAddCircle } from "react-icons/io";
import CustomButton from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { FaFileExport, FaFileImport } from "react-icons/fa";

function Page() {
  const router= useRouter()
  const { t } = useTranslation();
  return (
    <div className="py-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-4 space-y-4">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t("leads_List")}
          </h1>
          <div className="flex justify-end items-center">
            <Link href="/leads/add-lead" className="GreenButton dark p-1 flex justify-between items-center gap-1">
              <IoMdAddCircle />
              {t("add_lead")}
            </Link>
          </div>
            <CustomButton
            title={t("add_lead")}
            icon={()=><IoMdAddCircle />}
            fun={()=> router.push("/leads/add-lead")}
            />
          </div>            
        </div>
        <div className="filter bg-Lightbg dark:bg-cardbgDark rounded-xl w-full h-[60px] max-[450px]:h-max max-[450px]:py-2 flex max-[450px]:flex-wrap items-center mb-5 max-[450px]:mb-0 gap-3 px-3 shadow-box_shadow dark:shadow-none">
        <div className="filter md:w-3/4">
          <Filter data={filterData} />
          </div>
          <div className="actions w-full md:w-1/4 flex justify-between items-center">
            <CustomButton title={t("import")} fun={() => alert("Importing...")} icon={()=><FaFileImport />} className="max-sm:w-1/3 GreenButton" />
            <CustomButton title={t("export")} fun={() => alert("Exporting...")} icon={()=><FaFileExport  />} className="max-sm:w-1/3 GreenButton" />
          </div>
        </div>
        <div className="w-full bg-Lightbg dark:bg-cardbgDark shadow rounded-lg overflow-hidden" dir="rtl">
          <ClientTable clients={ClientDetails} t={t} />
        </div>
        <div className="flex justify-center mt-4">
          <Pagination className="dark:bg-gray-800 px-3 py-2 rounded-md" defaultCurrent={1} total={500} />
        </div>
      </div>
    </div>
  );
}

export default Page;