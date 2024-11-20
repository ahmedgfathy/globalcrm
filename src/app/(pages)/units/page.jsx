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
import  DropdownMenImportExport  from "@/app/components/leadImport-Export/ImportExport";
import { getAllProperties } from "@/actions/propertiesAction";
import DeleteButton from "@/app/components/delete-button/DeleteButton";
import { CiFilter, CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
// import "./pagination.css"

function Page() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { t, locale } = useTranslation();
  const [units, setUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUnits, setTotalUnits] = useState(0);
  const UnitsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('')
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
          <Grid item xs={12} sm={7} md={11.3} lg={11.4} className="flex w-full justify-end" dir="ltr">
          <div
            className={`head flex justify-between items-start w-full flex-row-reverse gap-2 md:gap-5`}
          >
            <div
              className={`flex items-center w-3/4 h-max max-[450px]:w-full dark:shadow-none rounded-xl bg-Lightbg dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus-within:border-black dark:hover:border-white dark:focus-within:border-white focus:outline-none px-2`}
            >
              <span
                className={`text-gray-400 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`}
              >
                <CiSearch />
              </span>
              <Input
                dir={locale == 'ar' ? 'rtl' : 'ltr'}
                type='text'
                className='w-full bg-transparent focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 text-lg border-0 shadow-none'
                placeholder={`${t('search_unit')} ...`}
                value={searchTerm}
                // onChange={handleSearchChange}
              />
            </div>
            <div className='flex gap-1 md:gap-2 items-center'>
              <CustomButton
                fun={() => router.push('/units/add-unit')}
                title={!isMobile && t('add_unit')}
                className='GreenButton p-2'
                icon={() => <IoMdAddCircle />}
              />

              <CustomButton
                title={!isMobile && 'Clear Filter'}
                icon={() => <CiFilter />}
                className='GreenButton w-full md:w-fit'
                fun={() => {
                  // handleClearFilters()
                  // fetchLeads(1, '')
                }}
              />
              <DeleteButton
              // handleDelete={deleteAllLeads}
                title={!isMobile && t('delete all units')}
                // afterDel={()=>fetchLeads(
                //   currentPage,
                //   searchTerm,
                //   typeFilter,
                //   customerSourceFilter
                // )}
              />
            </div>
          </div>
          </Grid>
 

        <div className="filter bg-Lightbg dark:bg-transparent rounded-xl w-full h-[60px] max-[450px]:h-max max-[450px]:py-2 flex justify-end max-[450px]:flex-wrap items-center mb-5 max-[450px]:mb-0 gap-3 px-0 md:px-3 shadow-box_shadow dark:shadow-none" dir="rtl">
          <div className="filter w-full md:w-full" >
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