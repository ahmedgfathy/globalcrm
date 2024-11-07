"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import SelectInput from "./utils/SelectInput";
import DateInput from "./utils/DateInput";

function SheetCalls({ isDisabled }) {
  const { t } = useTranslation();

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
    <div className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark border-0">
      <div className="header w-full flex justify-between max-[450px]:justify-center items-center max-[450px]:flex-wrap gap-y-3">
        <div>
          <p className="text-2xl font-bold">sheets calls</p>
        </div>
      </div>
      <CardContent className="grid gap-2 md:grid-cols-2 md:gap-4 pt-3">
        <div className="space-y-1 w-full">
          <SelectInput
            label={t("Assigned To")}
            id="Assigned To"
            defaultValue={defaultValues.assignedTo}
            data={AssignedData}
            isDisabled={isDisabled}
          />
        </div>
        <div className="space-y-1 w-full">
          <SelectInput
            label={t("Customer Source")}
            id="Customer Source"
            defaultValue={defaultValues.customerSource}
            data={CustomerSourceData}
            isDisabled={isDisabled}
          />
        </div>
        <div className="space-y-1 w-full">
          <SelectInput
            label={t("Type")}
            id="Type"
            defaultValue={defaultValues.type}
            data={Type}
            isDisabled={isDisabled}
          />
        </div>
        <div className="space-y-1 w-full">
          <SelectInput
            label={t("Lead Status")}
            id="LeadStatus"
            defaultValue={defaultValues.leadStatus}
            data={LeadStatus}
            isDisabled={isDisabled}
          />
        </div>
        <div className="space-y-1 w-full">
          <DateInput
            label={t("ModifiedTime")}
            id="ModifiedTime"
            defaultValue="2022-08-30"
            isDisabled={isDisabled}
          />
        </div>
        <div className="space-y-1 w-full">
          <DateInput
            label={t("CreatedTime")}
            id="CreatedTime"
            defaultValue="2022-08-30"
            isDisabled={isDisabled}
          />
        </div>
      </CardContent>
    </div>
  );
}

export default SheetCalls;
