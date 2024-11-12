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
      <div className="grid lg:grid-cols-4 max-sm:grid-cols-2 gap-3">
        {data?.map((ele, i) => {
          return (
            <Select key={i}>
              <SelectTrigger className="w-[165px] md:w-[150px] lg:w-[200px] dark:bg-gray-900 dark:text-white">
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
