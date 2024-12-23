import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/app/context/TranslationContext';

const selectBoxes = [
  // { name: "clientFollowUp", label: "Client_follow_up" },
  // { name: "assignedTo", label: "Assigned_To" },
  { name: "customerSource", label: "Customer_Source" },
  // { name: "type", label: "type" },
  // { name: "leadStatus", label: "Lead_Status" },
  // { name: "class", label: "category" },
];

function LeadReports({ options, handleChange }) {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectBoxes.map((box) => (
          <Card key={box.name} className="bg-Lightbg dark:bg-cardbgDark">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold">{t(`${box.label}`)}</CardTitle>
              <CardDescription className="dark:text-[#b8b9b9] text-sm">
                {t("Options_management")} {t(`${box.label}`)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(e) => handleChange(box.name, e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`${t("Select")} ${t(`${box.label}`)}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{t(`${box.label}`)}</SelectLabel>
                    {options[box.name]?.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default LeadReports;
