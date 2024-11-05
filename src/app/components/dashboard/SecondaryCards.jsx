import React from "react";
import ChartComponentTwo from "./ChartTwo";
import { useTranslation } from "@/app/context/TranslationContext";
import { ToTop } from "../../../../public/assets/icons";

function SecondaryCards({ data }) {
  const { t } = useTranslation();
  return (
    <div
      key={data.id}
      className="h-[179px] min-h-max bg-white dark:bg-[#1c252e] rounded-2xl flex justify-between items-center px-2 pt-2 shadow-box_shadow"
    >
      <div className="w-max h-full flex flex-col justify-between items-start gap-2 p-4">
        <p className="text-xl">{t(data.title)}</p>
        <p className="text-4xl max-sm:text-2xl">{data.number}</p>
        <div className="flex justify-between items-center gap-2">
          <span className="text-base w-max text-[#637381]">{t(data.time)}</span>
          <div className="size-6">
            <ToTop />
          </div>
          <span className="text-base text-[#637381]">{data.percent}</span>
        </div>
      </div>

      <div className="w-max pl-5 flex justify-between items-center text-end">
        <ChartComponentTwo />
      </div>
    </div>
  );
}

export default SecondaryCards;
