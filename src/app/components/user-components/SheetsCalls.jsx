"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import { CardContent } from "@/components/ui/card";
import React from "react";
import SelectInput from "./utils/SelectInput";
import DateInput from "./utils/DateInput";

function SheetCalls({ isDisabled, handleChange, lead, options }) {
  const { t, locale } = useTranslation();


  return (
    <div className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden">
      <CardContent className="w-full min-w-max overflow-x-auto" >
        <div className="grid gap-1 grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1" dir={locale == "ar" ? "rtl" : "ltr"}>
          <SelectInput
            label={t("Assigned_To")}
            id="assignedTo"
            value={lead?.assignedTo}
            data={options?.assignedTo}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <SelectInput
            label={t("Customer_Source")}
            id="customerSource"
            value={lead?.customerSource}
            data={options?.customerSource}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <SelectInput
            label={t("type")}
            id="type"
            value={lead?.type}
            data={options?.type}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <SelectInput
            label={t("Lead_Status")}
            id="leadStatus"
            value={lead?.leadStatus}
            data={options?.leadStatus}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <DateInput
            label={t("modified_time")}
            id="modifiedTime"
            defaultValue={lead?.$updatedAt}
            isDisabled={true}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <DateInput
            label={t("created_time")}
            id="createdTime"
            defaultValue={lead?.$createdAt || 0}
            isDisabled={true}
            section="sheetsCalls"
            handleChange={handleChange}
          />
        </div>
      </CardContent>

    </div>
  );
}

export default SheetCalls;
