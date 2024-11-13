"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import { CardContent } from "@/components/ui/card";
import React from "react";
import SelectInput from "./utils/SelectInput";
import DateInput from "./utils/DateInput";

function SheetCalls({ isDisabled, handleChange }) {
  const { t, locale } = useTranslation();

  const AssignedData = [
    { value: "A", label: "Users" },
    { value: "B", label: "Group" },
  ];

  const CustomerSourceData = [
    { value: "A", label: "Ahmed" },
    { value: "B", label: "Khalid" },
    { value: "C", label: "Yaser" },
    { value: "D", label: "Ali" },
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
    { value: "داخل الكومباوند", label: "داخل الكومباوند" },
    { value: "محل تجاري", label: "محل تجاري" },
    { value: "اداري مرخص", label: "اداري مرخص" },
    { value: "اداري غير مرخص", label: "اداري غير مرخص" },
    { value: "سكني خارج الكومباوند", label: "سكني خارج الكومباوند" },
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
        <div className="lg:grid gap-6 lg:grid-cols-2 md:gap-8" dir={locale == "ar" ? "rtl" : "ltr"}>
          <SelectInput
            label={t("Assigned To")}
            id="assignedTo"
            defaultValue={defaultValues.assignedTo}
            data={AssignedData}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <SelectInput
            label={t("Customer Source")}
            id="customerSource"
            defaultValue={defaultValues.customerSource}
            data={CustomerSourceData}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <SelectInput
            label={t("Type")}
            id="type"
            defaultValue={defaultValues.type}
            data={Type}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <SelectInput
            label={t("Lead Status")}
            id="leadStatus"
            defaultValue={defaultValues.leadStatus}
            data={LeadStatus}
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <DateInput
            label={t("ModifiedTime")}
            id="modifiedTime"
            defaultValue="2022-08-30"
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />

          <DateInput
            label={t("CreatedTime")}
            id="createdTime"
            defaultValue="2022-08-30"
            isDisabled={isDisabled}
            section="sheetsCalls"
            handleChange={handleChange}
          />
        </div>
      </CardContent>

    </div>
  );
}

export default SheetCalls;
