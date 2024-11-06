"use client";
import Details from "@/app/components/user-components/Details";
import { useTranslation } from "@/app/context/TranslationContext";
import React from "react";

function Page() {
  const { t } = useTranslation();
  return (
    <div className="add-lead">
      <div className="container mx-auto">
        <Details
          page="add"
          title={t("add_lead")}
          description={t("add_lead_description")}
        />
      </div>
    </div>
  );
}

export default Page;
