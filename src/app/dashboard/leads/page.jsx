"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import React from "react";
import { Pagination } from "antd";
import { Button } from "@/components/ui/button";
import ClientTable from "@/app/components/ClientTable";
import { ClientDetails } from "./data";

function Page() {
  const { t } = useTranslation();
  return (
    <div className="py-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t("leads_List")}
          </h1>
          <Button>
            <Link href="/dashboard/leads/add-lead" className="w-full h-full">
              {t("add_lead")}
            </Link>
          </Button>
        </div>
        <div className="menu-drawer w-full bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
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