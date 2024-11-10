import { TabsTrigger } from "@/components/ui/tabs";
import React from "react";

function TabButton({ data }) {
  return data.map((data) => {
    return (
      <TabsTrigger
        key={data.value}
        value={data.value}
        className="w-full py-3 data-[state=active]:bg-dark_link_active dark:data-[state=active]:bg-dark_link_active data-[state=active]:text-text_link_active_l dark:data-[state=active]:text-text_link_active"
      >
        {data.title}
      </TabsTrigger>
    );
  });
}

export default TabButton;
