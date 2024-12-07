import React, { useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";

function Filter({ data, onFilterChange, filterValues, filterChange }) {
  const urlParams = useSearchParams();
  const filterValue = useMemo(() => urlParams.get("filter"), [urlParams]);
  const filterData = useMemo(() => urlParams.get("data"), [urlParams]);

  useEffect(() => {
    if (filterValue && filterData && Array.isArray(data)) {
      data.forEach((ele) => {
        onFilterChange(filterData, filterValue);
        filterChange(filterData, filterValue);
      });
    }
  }, [data, filterValue, filterData]);
  

  return (
    <div className={`grid lg:grid-cols-${data?.length} max-sm:grid-cols-1 gap-3 w-full md:w-3/4 justify-items-end`}>
      {data?.map((ele, i) => (
        <Select
          key={i}
          value={filterValues[ele.filterName] || ""}
          onValueChange={(value) => {
            onFilterChange(value, ele.filterName);
            filterChange(value, ele.filterName);
          }}
        >
          <SelectTrigger className="w-full font-bold bg-dark_link_active text-text_link_active_l dark:bg-gray-900 dark:text-white">
            <SelectValue placeholder={ele.filterName} />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-900 dark:text-white">
            <SelectGroup>
              <SelectLabel>{ele.filterName}</SelectLabel>
              {ele.optionData.map((option, idx) => (
                <SelectItem value={option.value || option} key={idx}>
                  {option.name || option}
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
