"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import React from "react";
import { Pagination } from "antd";
import { Button } from "@/components/ui/button";
import ClientTable from "@/app/components/ClientTable";
import { ClientDetails, filterData } from "./data";
import Filter from "@/app/components/Filter";
import { IoMdAddCircle } from "react-icons/io";

function Page() {
  const { t } = useTranslation();
  return (
    <div className="py-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-4 space-y-4">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t("leads_List")}
          </h1>
          {/* <button className="w-max GreenButton dark"> */}
          <div className="flex justify-end items-center">
            <Link href="/leads/add-lead" className="GreenButton dark p-1 flex justify-between items-center gap-1">
              <IoMdAddCircle />
              {t("add_lead")}
            </Link>
          </div>
            
          {/* </button> */}
        </div>
        <div className="filter bg-Lightbg dark:bg-cardbgDark rounded-xl w-full h-[60px] max-[450px]:h-max max-[450px]:py-2 flex max-[450px]:flex-wrap items-center mb-5 max-[450px]:mb-0 gap-3 px-3 shadow-box_shadow dark:shadow-none">
          <Filter data={filterData} />
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