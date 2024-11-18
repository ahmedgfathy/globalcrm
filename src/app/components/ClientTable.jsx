import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowComponent from "./TableRowComponent";
import { CiFilter } from "react-icons/ci";
import CustomButton from "@/app/components/CustomButton";
import Filter from "./Filter";
import { DropdownMenImportExport } from "./leadImport-Export/ImportExport";

const ClientTable = ({ clients, t, afterDel, onFilterChange, filterData }) => {
  const [filterValues, setFilterValues] = useState(
    filterData.reduce((acc, ele) => {
      acc[ele.filterName] = ""; 
      return acc;
    }, {})
  );
  const handleFilterChange = (value, filterName) => {
    const updatedFilters = { ...filterValues, [filterName]: value };
    console.log(updatedFilters)
    setFilterValues(updatedFilters);
    // onFilterChange(updatedFilters);
  };
  const handleClearFilters = () => {
    const resetFilters = Object.keys(filterValues).reduce((acc, key) => {
      acc[key] = ""; 
      return acc;
    }, {});
    setFilterValues(resetFilters); 
    // onFilterChange(resetFilters); 
  };
  return (
    <div
      className="w-full bg-Lightbg dark:bg-cardbgDark shadow rounded-lg overflow-hidden"
      dir="rtl"
    >
      <div
        className="filter p-3 bg-gray-100 dark:bg-gray-700 flex justify-between flex-col md:flex-row-reverse items-center rounded-t-lg"
        dir="ltr"
      >
        <Filter
          data={filterData}
          onFilterChange={handleFilterChange}
          filterChange={onFilterChange}
          filterValues={filterValues}
        />
        <CustomButton
          title="Clear Filter"
          icon={() => <CiFilter />}
          className="GreenButton w-full md:w-fit mt-3 md:mt-0 hidden md:flex"
          fun={() => {
            handleClearFilters();
            afterDel(1, "");
          }}
        />
      </div>
      <Table className="min-w-full text-start">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-700">
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t("lead_no")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t("name_client")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold ">
              {t("mobile_phone")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold ">
              {t("status")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t("source")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t("request_type")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold">
              {t("action")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 text-end flex h-auto justify-around items-center">
              <DropdownMenImportExport />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRowComponent
              key={client.$id}
              client={client}
              t={t}
              afterDel={() => afterDel(1, "")}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;
