import React from "react";
import ChartComponentTwo from "./ChartTwo";
import { useTranslation } from "@/app/context/TranslationContext";
import { ToTop } from "../../../../public/assets/icons";

function SecondaryCards({ data }) {
  const { t } = useTranslation();
  return (
    <div
      key={data.id}
      className="h-[179px] min-h-max bg-Lightbg dark:bg-cardbgDark rounded-2xl flex justify-between items-center px-2 pt-2 shadow-box_shadow dark:shadow-none overflow-x-auto"
    >
      <div className="w-11/12 h-full flex flex-col justify-between items-start gap-2 p-4">
        <p className="text-xl font-bold">{t(data.title)}</p>
        <p className="text-4xl max-sm:text-2xl">{t("15_00")}</p>
        <div className="flex justify-between items-center gap-2">
          <span className="text-base w-max text-[#637381]">{t(data.time)}</span>
          <div className="size-6 hover:scale-110 duration-200">
            <ToTop color={data.color} />
          </div>
          <span className="text-base text-[#637381]">{data.percent}</span>
        </div>
      </div>

      <div className="w-max flex justify-between items-center text-end">
        <ChartComponentTwo color={data.color} />
      </div>
    </div>
  );
}

export default SecondaryCards;
