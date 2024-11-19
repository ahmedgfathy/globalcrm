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

function Filter({ data, onFilterChange, filterValues, filterChange }) {
  return (
    <div className="grid lg:grid-cols-4 max-sm:grid-cols-1 gap-3 w-full md:w-3/4 justify-items-end">
      {data?.map((ele, i) => (
        <Select
          key={i}
          value={filterValues[ele.filterName] || ""}
          onValueChange={(value) => {onFilterChange(value, ele.filterName); filterChange(value, ele.filterName)}}
        >
          <SelectTrigger className="w-full font-bold bg-dark_link_active text-text_link_active_l dark:bg-gray-900 dark:text-white">
            <SelectValue placeholder={ele.filterName} />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-900 dark:text-white">
            <SelectGroup>
              <SelectLabel>{ele.filterName}</SelectLabel>
              {ele.optionData.map((option, idx) => (
                <SelectItem value={option.value} key={idx}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}

export default Filter;
