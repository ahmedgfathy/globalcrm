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
    <div className="filter w-full">
      <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-3">
        {data?.map((ele, i) => {
          return (
            <Select key={i}>
              <SelectTrigger className="">
                <SelectValue placeholder={ele.filterName} />
              </SelectTrigger>
              <SelectContent>
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
    </div>
  );
}

export default Filter;
