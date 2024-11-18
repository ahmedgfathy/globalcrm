import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowComponent from "./TableRowComponent";
import { IoMdAddCircle } from "react-icons/io";
import CustomButton from "@/app/components/CustomButton";
import Filter from "./Filter";
import { DropdownMenImportExport } from "./leadImport-Export/ImportExport";
import { CiFilter } from "react-icons/ci";

const ClientTable = ({ clients, t, afterDel, onFilterChange, filterData }) => {
  return (
    <div
      className="w-full bg-Lightbg dark:bg-cardbgDark shadow rounded-lg overflow-hidden"
      dir="rtl"
    >
      <div
        className="filter p-3 bg-gray-100 dark:bg-gray-700 flex justify-between flex-row-reverse items-center rounded-t-lg"
        dir="ltr"
      >
        <Filter data={filterData} onFilterChange={onFilterChange} />
        <CustomButton
              title="Clear Filter"
              icon={()=><CiFilter />}
              fun={()=>afterDel(1,"")}
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
            <TableHead className="min-w-fit text-nowrap p-3 text-start text-dark dark:text-white text-base font-bold hidden md:table-cell">
              {t("mobile_phone")}
            </TableHead>
            <TableHead className="min-w-fit text-nowrap p-3 hidden md:table-cell text-start text-dark dark:text-white text-base font-bold ">
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
              afterDel={()=>afterDel(1,"")}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;
