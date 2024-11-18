"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import { CardContent } from "@/components/ui/card";
import React from "react";
import SelectInput from "./utils/SelectInput";
import DateInput from "./utils/DateInput";

function SheetCalls({ isDisabled, handleChange, lead }) {
  const { t, locale } = useTranslation();

  const AssignedData = [
    { value: "A", label: "Users" },
    { value: "B", label: "Group" },
  ];

  const CustomerSourceData = [
    {id:1, label: "facebook", value: "facebook"},
    {id:2, label: "whatsapp", value: "whatsapp"},
    {id:3, label: "youtupe", value: "youtupe"},
  ];

  const LeadStatus = [
    { value: "قفل خارج الشركه", label: "قفل خارج الشركه" },
    { value: "قفل داخل الشركه", label: "قفل داخل الشركه" },
    { value: "مؤجل حاليا", label: "مؤجل حاليا" },
    { value: "لا يرد", label: "لا يرد" },
    { value: "not interested", label: "not interested" },
    { value: "very interested", label: "very interested" },
    { value: "متابع معاينات", label: "متابع معاينات" },
    { value: "interested", label: "interested" },
  ];

  const Type = [
    {id:1, label: "Apartment", value: "apartment"},
    {id:2, label: "Villa", value: "villa"},
    {id:3, label: "Twinhouse", value: "twinhouse"},
    {id:4, label: "Townhouse", value: "townhouse"},
    {id:5, label: "Duplex", value: "duplex"},
  ];

  const defaultValues = {
    assignedTo: "A",
    customerSource: "A",
    type: "سكني خارج الكومباوند",
    leadStatus: "قفل خارج الشركه",
    modifiedTime: "28-10-2024 11:15 PM",
    createdTime: "30-08-2022 2:43 PM",
  };

  return (
    <div className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden">
      <CardContent className="w-full min-w-max overflow-x-auto" >
        <div className="grid gap-1 grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1" dir={locale == "ar" ? "rtl" : "ltr"}>
          <SelectInput
            label={t("Assigned To")}
            id="assignedTo"
            value={lead?.assignedTo}
            data={AssignedData}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <SelectInput
            label={t("Customer Source")}
            id="customerSource"
            value={lead?.customerSource}
            data={CustomerSourceData}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <SelectInput
            label={t("Type")}
            id="type"
            value={lead?.type}
            data={Type}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <SelectInput
            label={t("Lead Status")}
            id="leadStatus"
            value={lead?.leadStatus}
            data={LeadStatus}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <DateInput
            label={t("ModifiedTime")}
            id="modifiedTime"
            defaultValue={lead?.$updatedAt}
            isDisabled={true}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <DateInput
            label={t("CreatedTime")}
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
