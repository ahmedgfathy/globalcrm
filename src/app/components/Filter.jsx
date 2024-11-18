"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function Filter({ data }) {
  return (
      <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-3 w-full md:w-3/4 justify-items-end">
        {data?.map((ele, i) => {
          return (
            <Select key={i}>
              <SelectTrigger className="w-full md:w-[150px] lg:w-[200px] font-bold text-green-600  bg-green-200 dark:bg-gray-900 dark:text-white">
                <SelectValue placeholder={ele.filterName} />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-900 dark:text-white">
                <SelectGroup>
                  <SelectLabel>{ele.filterName}</SelectLabel>
                  {ele.optionData.map((option, i) => {
                    return (
                      <SelectItem value={option.value} key={i}>
                        {option.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        })}
      </div>
  );
}

export default Filter;
