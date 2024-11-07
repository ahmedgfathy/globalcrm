import * as React from "react";
import { useTranslation } from "@/app/context/TranslationContext";
function ClintFollowUp({ data, isDisabled }) {
    const { t } = useTranslation();
  return (
<select disabled={isDisabled} id="client_follow_up" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ">
    <option selected>{t("Client_follow_up")}</option>
       {data.map((data)=> <option key={data.id} value={data.value}>{data.label}</option>)}
  </select>
  );
}

export default ClintFollowUp;
