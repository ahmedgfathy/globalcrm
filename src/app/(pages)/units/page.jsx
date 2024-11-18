"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useState, useEffect } from "react";
import { ClientDetails, filterData } from "./data";
import { CardUnitComponent } from "@/app/components/units-components/CardComponent";
import { IoMdAddCircle } from "react-icons/io";
import Filter from "@/app/components/Filter";
import { Pagination } from "antd";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomButton from "@/app/components/CustomButton";
import { DropdownMenImportExport } from "@/app/components/leadImport-Export/ImportExport";
import { getAllProperties } from "@/actions/propertiesAction";
// import "./pagination.css"

function Page() {
  const router = useRouter()
  const { t } = useTranslation();
  const [units, setUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUnits, setTotalUnits] = useState(0);
  const UnitsPerPage = 10;

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
  const fetchUnits = async (page = 1) => {
    const offset = (page - 1) * UnitsPerPage;
    try {
      const { properties, totalProperties } = await getAllProperties(UnitsPerPage, offset);

      setUnits(properties);
      setTotalUnits(totalProperties);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };


  useEffect(() => {
    fetchUnits(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onFilterChange = ()=>{
    console.log("filter")
  }
  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full flex flex-wrap justify-between items-start gap-3 px-2 pt-2 max-[1200px]:px-7">
        <Grid container className="flex justify-center gap-1 w-full mt-5 mb-3 " dir="ltr">
          <Grid item xs={12} sm={7} md={11.3} lg={11.4} className="flex items-center justify-end gap-2" >
            <div className="w-3/4 h-max max-[450px]:w-full  dark:shadow-none rounded-xl">
              <input
                type="text"
                className="w-full  bg-Lightbg dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md p-2 max-[450px]:py-1"
                placeholder={`${t("search_unit")} ...`}
              />
            </div>
            <div className="">
              <CustomButton
                fun={() => router.push("/units/add-unit")}
                title={t("add_unit")}
                icon={() => <IoMdAddCircle />}
              />
            </div>
          </Grid>
        </Grid>
 

        <div className="filter bg-Lightbg dark:bg-transparent rounded-xl w-full h-[60px] max-[450px]:h-max max-[450px]:py-2 flex justify-end max-[450px]:flex-wrap items-center mb-5 max-[450px]:mb-0 gap-3 px-3 shadow-box_shadow dark:shadow-none" dir="ltr">
          <div className="filter w-full md:w-full">
            <Filter
            filterChange={onFilterChange}
            filterValues={filterValues}
            onFilterChange={handleFilterChange}
            data={filterData} />
          </div>
          <DropdownMenImportExport />
        </div>

        <Grid container className="flex justify-center gap-5" dir="ltr">
          {units.map((unit, index) => (
            <Grid item xs={12} sm={7} md={5.5} lg={3.7} key={index}>
              <CardUnitComponent ele={unit} />
            </Grid>
          ))}
        </Grid>

        <div className="w-full flex justify-center mt-4" dir="ltr">
          <Pagination
            current={currentPage}
            total={totalUnits}
            pageSize={UnitsPerPage}
            onChange={handlePageChange}
            className="custom-pagination"
          />
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}
export default Page;