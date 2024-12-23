"use client";
import { UserContext } from "@/app/context/UserContext";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useEffect, useMemo, useState, useContext } from "react";
import { Pagination } from "antd";
import ClientTable from "@/app/components/ClientTable";
import { filterData } from "./data";
import { useRouter, useSearchParams } from "next/navigation";
import { Spin } from "antd";
import { FaFileImport, FaFileExport } from "react-icons/fa";

import {
  getAllLeads,
  getAllLeadsForUser,
  getAllLeadsForTeamLead,
  importLeads,
  searchLeads,
  searchLeadsByCustomerSource,
  searchLeadsByType,
  exportLeads,
  deleteAllLeads,
  transferLead
} from "@/actions/leadsAction";

import { countLeadsByCustomerSource,generateLeadsReport,countForTeamLead} from "@/actions/report";
import { Grid } from "@mui/material";
import { Input } from "@/components/ui/input";
import "./pagination.css";
import { CiFilter, CiSearch } from "react-icons/ci";
import CustomButton from "@/app/components/CustomButton";
import { IoMdAddCircle } from "react-icons/io";
import { useIsMobile } from "@/hooks/use-mobile";
import Papa from "papaparse";
import { useToast } from "@/hooks/use-toast";
import DeleteButton from "../../components/delete-button/DeleteButton";
import { getAllSettings } from "@/actions/filterSettings";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getUsers, searchUsers } from "@/actions/auth";
import TransformComponent from "@/app/components/TransformComponent";
import { checkRole } from "@/app/functions/check-role";

function Page() {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const role = currentUser.userData.role;
  const userId = currentUser.userData.userId;
  const router = useRouter();
  const isMobile = useIsMobile();
  const urlParams = useSearchParams();
  const [users, setUsers] = useState([]);
  const { t, locale } = useTranslation();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const initialPage = parseInt(urlParams.get("page") || "1", 10);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalLeads, setTotalLeads] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [customerSourceFilter, setCustomerSourceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadsPerPage, setLeadsPerPage] = useState(20);
  const filterValue = useMemo(() => urlParams.get("filter"), [urlParams]);

  const [options, setOptions] = useState([
    { id: 1, filterName: "Request type", data: "type", optionData: [] },
    { id: 2, filterName: "Leads Status", data: "leadStatus", optionData: [] },
    {
      id: 3,
      filterName: "Leads Source",
      data: "customerSource",
      optionData: [],
    },
    {
      id: 4,
      filterName: "Leads Assign to",
      data: "assignedTo",
      optionData: [],
    },

  ]);

  const fetchLeads = async (page = 1, search = "") => {
    const offset = (page - 1) * leadsPerPage;
    setIsLoading(true);
    try {
      let leadsData;
      if (search) {
        console.log("Fetching leads with search term:", search);
        if (role === "admin") {
          leadsData = await searchLeads(search);
        } else {
          const userId = currentUser.userData.userId;
          leadsData = await searchLeads(search, userId);
        }
        setLeads(leadsData);
        setTotalLeads(leadsData.length);
      } else {
        console.log("Fetching all leads");
        if (role === "admin") {
          const { leads, totalLeads } = await getAllLeads(leadsPerPage, offset);
          setLeads(leads);
          setTotalLeads(totalLeads);
        } else if (role === "teamLead") {
          const { allLeads, totalLeads } = await getAllLeadsForTeamLead(leadsPerPage, offset);
          setLeads(allLeads);
          setTotalLeads(totalLeads);
        }
        else {
          const { leads, totalLeads } = await getAllLeadsForUser(
            leadsPerPage,
            offset
          );
          setLeads(leads);
          setTotalLeads(totalLeads);
        }
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const onFilterChange = async (e, data) => {
    console.log(e, data);
    let documents;
    if (data === "Request type") {
      if (role === "admin") {
        documents = await searchLeadsByType(e);
      } else {
        documents = await searchLeadsByType(e, userId);
      }
    }
    if (data === "Leads Source") {
      if (role === "admin") {
        documents = await searchLeadsByCustomerSource(e);
      } else {
        documents = await searchLeadsByCustomerSource(
          e,
          userId
        );
      }
    }
    setLeads(documents);
    console.log(documents);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await getAllSettings();
        const data = JSON.parse(res[0].leadSettings);
        setOptions((prev) =>
          prev.map((option) => {
            const matchedData = data[option.data] || [];
            return { ...option, optionData: matchedData };
          })
        );
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`?page=${page}&search=${searchTerm}`);
    window.scrollTo(0, 0);
  };

  const [filterValues, setFilterValues] = useState(
    filterData.reduce((acc, ele) => {
      acc[ele.filterName] = "";
      return acc;
    }, {})
  );
  const handleFilterChange = (value, filterName) => {
    const updatedFilters = { ...filterValues, [filterName]: value };
    console.log(updatedFilters);
    setFilterValues(updatedFilters);
    // onFilterChange(updatedFilters);
  };
  const handleClearFilters = () => {
    if (filterValue) {
      router.push("/leads");
    }
    const resetFilters = Object.keys(filterValues).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    setFilterValues(resetFilters);
    // onFilterChange(resetFilters);
  };
  useEffect(() => {
    fetchLeads(currentPage, searchTerm);
  }, [currentPage, searchTerm, leadsPerPage, filterValue]);
  const handleExportCSV = async () => {
    try {
      const { leads } = await exportLeads();
      if (!leads || leads.length === 0) {
        toast({
          variant: "destructive",
          title: "Error Export Leads",
          description: error.message || "No leads available to export.",
          status: "error",
        });
        return;
      }
      const csv = Papa.unparse(leads);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "leads.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        variant: "success",
        title: "Success Export Leads",
        description: "Leads exported successfully.",
        status: "success",
      });
    } catch (error) {
      console.error("Error exporting leads:", error);
      alert("Failed to export leads.");
    }
  };
  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        if (results.errors.length > 0) {
          console.error("Parsing errors:", results.errors);
          toast({
            variant: "destructive",
            title: "Invalid file format.",
            description: "Please ensure the file is in CSV format.",
            status: "error",
          });
          return;
        }
        try {
          await importLeads(results.data);
          toast({
            variant: "success",
            title: "Success import Leads",
            description: "Leads imported successfully!",
            status: "success",
          });
        } catch (error) {
          console.error("Error importing leads:", error);
          toast({
            variant: "destructive",
            title: "Error importing leads:",
            description: error.message || "Failed to import leads.",
            status: "error",
          });
        }
      },
      error: (error) => {
        console.error("Error parsing file:", error);
        toast({
          variant: "destructive",
          title: "Error importing leads:",
          description: "Failed to read the CSV file.",
          status: "error",
        });
      },
    });
  };
  const handlePageSizeChange = (current, size) => {
    setLeadsPerPage(size);
    setCurrentPage(1);
    console.log(size);
  };
  const searchUsersForTransform = async (data) => {
    try {
      const res = await searchUsers(data);
      setUsers(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelect = (userId) => {
    setSelectedUsers((prevSelected) => {
      const isSelected = prevSelected.includes(userId);
      const updatedSelected = isSelected
        ? prevSelected.filter((id) => id !== userId) // Remove if already selected
        : [...prevSelected, userId]; // Add if not selected
      console.log("Selected Users:", updatedSelected); // Logging the selectedUsers state
      return updatedSelected;
    });
  };
  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.users);
      console.log("Fetched Users:", res);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleTransferSubmit = async () => {
    try {
      await transferLead(selectedLeads, selectedUsers);
      toast({
        variant: "success",
        title: "Success",
        description: "Leads transferred successfully.",
        status: "success",
      });
      fetchLeads(currentPage, searchTerm); // Fetch leads again
    } catch (error) {
      console.error("Error transferring leads:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to transfer leads.",
        status: "error",
      });
    }
  };
  console.log(countLeadsByCustomerSource('whatsApp Leads',userId))
  console.log(generateLeadsReport(userId))


  return (
    <ProtectedRoute>
      <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Modified Header Section - More Compact */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium text-gray-800 dark:text-white">
              {t("leads_List")}
            </h1>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">
              {totalLeads}
            </span>
          </div>
        </div>

        {/* Modified Action Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="w-full md:w-1/2">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <CiSearch className="text-gray-500" />
                </span>
                <Input
                  dir={locale == "ar" ? "rtl" : "ltr"}
                  type="text"
                  className="w-full pl-10 border-gray-300 dark:border-gray-600 rounded-lg"
                  placeholder={`${t("search_client")}...`}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Action Buttons - Modified section */}
            <div className="flex gap-3 w-full md:w-auto justify-end items-center">
              {/* Add Lead Button */}
              <CustomButton
                fun={() => router.push("/leads/add-lead")}
                title={t("add_lead")}
                className="bg-orange-700 hover:bg-primary/90 text-white"
                icon={() => <IoMdAddCircle className="w-5 h-5" />}
              />

              {/* Import Button */}
              {checkRole(role, ["admin"]) && (
                
                <>
                <label className="cursor-pointer">
                <input
                  type="file"
                  onChange={handleImportCSV}
                  className="hidden"
                  accept=".csv"
                  />
                <CustomButton
                  title={t("import")}
                  className="border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  icon={() => <FaFileImport className="w-5 h-5" />}
                  />
              </label>

              <CustomButton
              fun={handleExportCSV}
              title={t("export")}
              className="border border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
              icon={() => <FaFileExport className="w-5 h-5" />}
              />
</>
       )}

       {checkRole(role, ["admin", "teamLead"]) && (

         <TransformComponent
         title="Transform Leads"
         users={users}
         handleTransferSubmit={handleTransferSubmit}
         handleClick={fetchUsers}
         handleChange={searchUsersForTransform}
         selectedUsers={selectedUsers}
         handleSelect={handleSelect}
         handleCancel={() => setSelectedUsers([])}
         />
        )}

              {/* Clear Filter Button */}
              <CustomButton
                title={t("clear_filter")}
                icon={() => <CiFilter className="w-5 h-5" />}
                className="border border-gray-300 dark:border-gray-600"
                fun={handleClearFilters}
              />

              {/* Delete All Button */}
              {currentUser?.userData?.userEmail === "admin@admin.com" && (

                <DeleteButton
                handleDelete={deleteAllLeads}
                title={t('delete_all_leads')}
                afterDel={()=>fetchLeads(currentPage, searchTerm)}
                className="bg-red-500 hover:bg-red-600 text-white"
                />
              )}
            </div>
          </div>
        </div>

        {/* Leads Table/Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <ClientTable
              clients={leads}
              handleExportCSV={handleExportCSV}
              handleImportCSV={handleImportCSV}
              t={t}
              onFilterChange={onFilterChange}
              afterDel={() => fetchLeads(currentPage, searchTerm)}
              onAddLead={() => router.push("/leads/add-lead")}
              filterData={options}
              searchUsersForTransform={searchUsersForTransform}
              users={users}
              filterValues={filterValues}
              handleFilterChange={handleFilterChange}
              selectedLeads={selectedLeads}
              setSelectedLeads={setSelectedLeads}
              className="w-full"
              showActions={false} // Add this prop to hide the three dots menu
            />
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalLeads > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              current={currentPage}
              showSizeChanger
              total={totalLeads}
              pageSize={leadsPerPage}
              onShowSizeChange={handlePageSizeChange}
              onChange={handlePageChange}
              className="custom-pagination bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && totalLeads === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t("no_leads_found")}
            </p>
            <CustomButton
              fun={() => router.push("/leads/add-lead")}
              title={t("add_lead")}
              className="mt-4 bg-primary hover:bg-primary/90 text-white"
              icon={() => <IoMdAddCircle />}
            />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default Page;
