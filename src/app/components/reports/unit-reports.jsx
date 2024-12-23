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
  { name: "UnitFor", label: "unit_for" },
  { name: "area", label: "area" },
  { name: "rooms", label: "rooms" },
  { name: "phase", label: "phase" },
  { name: "type", label: "type" },
  { name: "finished", label: "finished" },
  { name: "inOrOutSideCompound", label: "inside_outside" },
  { name: "activity", label: "activity" },
  { name: "propertyOfferedBy", label: "property_offered_by" },
  { name: "forUpdate", label: "update" },
  { name: "callUpdate", label: "update_calls" },
  { name: "handler", label: "handler" },
  { name: "sales", label: "sales" },
  { name: "category", label: "category" },
  { name: "currency", label: "currency" },
  { name: "theFloors", label: "theFloors" },
];

function UnitReports({ options, handleChange }) {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {selectBoxes.map((box) => (
          <Card key={box.name} className="bg-Lightbg dark:bg-cardbgDark">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">{t(`${box.label}`)}</CardTitle>
              <CardDescription className="dark:text-[#b8b9b9] text-xs">
                {t("Options_management")} {t(`${box.label}`)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(e) => handleChange(box.name, e)}>
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder={`${t("Select")} ${t(`${box.label}`)}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-xs">{t(`${box.label}`)}</SelectLabel>
                    {options[box.name]?.map((option, index) => (
                      <SelectItem key={index} value={option} className="text-sm">
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

export default UnitReports;

