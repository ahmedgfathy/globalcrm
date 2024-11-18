"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import ClientTable from "@/app/components/ClientTable";
import { filterData } from "./data";
import { useRouter } from "next/navigation";
import { getAllLeads, searchLeads, searchLeadsByCustomerSource, searchLeadsByType } from "@/actions/leadsAction";
import { Grid } from "@mui/material";
import { Input } from "@/components/ui/input";
import EmptyPage from "@/app/components/EmptyPage";
import "./pagination.css";
import { CiSearch } from "react-icons/ci";
import CustomButton from "@/app/components/CustomButton";
import { IoMdAddCircle } from "react-icons/io";

function Page() {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [customerSourceFilter, setCustomerSourceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const leadsPerPage = 10;

  const fetchLeads = async (page = 1, search = "") => {
    const offset = (page - 1) * leadsPerPage;
    try {
      if (search) {
        console.log("Fetching leads with search term:", search);
        const leads = await searchLeads(search);
        setLeads(leads);
        setTotalLeads(leads.length);
      } else {
        console.log("Fetching all leads");
        const { leads, totalLeads } = await getAllLeads(leadsPerPage, offset);
        setLeads(leads);
        setTotalLeads(totalLeads);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };
  const onFilterChange = async (e, data) => {
    console.log(e,data)
    if (data === "Request type") {
      const documents = await searchLeadsByType(e)
      setLeads(documents)
      console.log(documents)
    }
    if (data === "Leads Source") {
      const documents = await searchLeadsByCustomerSource(e)
      setLeads(documents)
      console.log(documents)
    }
  };
  useEffect(() => {
    fetchLeads(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Grid className="w-full my-2" dir="ltr">
        <Grid
          item
          xs={12}
          sm={7}
          md={11.3}
          lg={11.4}
          className="flex items-center justify-end gap-2"
        >
          <div
            className={`head flex justify-between items-start w-full flex-row-reverse gap-5`}
          >
            <div
              className={`flex items-center w-3/4 h-max max-[450px]:w-full dark:shadow-none rounded-xl bg-Lightbg dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus-within:border-black dark:hover:border-white dark:focus-within:border-white focus:outline-none px-2`}
            >
              <span
                className={`text-gray-400 ${locale === "ar" ? "ml-2" : "mr-2"}`}
              >
                <CiSearch />
              </span>
              <Input
                dir={locale == "ar" ? "rtl" : "ltr"}
                type="text"
                className="w-full bg-transparent focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 text-lg border-0 shadow-none"
                placeholder={`${t("search_client")} ...`}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <CustomButton
              fun={() => router.push("/leads/add-lead")}
              title={t("add_lead")}
              className="GreenButton p-2"
              icon={() => <IoMdAddCircle />}
            />
          </div>
        </Grid>
      </Grid>
      <div
        className="w-full bg-Lightbg dark:bg-cardbgDark shadow rounded-lg overflow-hidden"
        dir="rtl"
      >
        <ClientTable
          clients={leads}
          t={t}
          onFilterChange={onFilterChange}
          afterDel={fetchLeads}
          onAddLead={() => router.push("/leads/add-lead")}
          filterData={filterData}
        />
      </div>
      <div className="flex justify-center mt-4" dir="ltr">
        <Pagination
          current={currentPage}
          total={totalLeads}
          pageSize={leadsPerPage}
          onChange={handlePageChange}
          className="custom-pagination"
        />
      </div>
    </div>
  );
}

export default Page;
