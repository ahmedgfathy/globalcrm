"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useState, useEffect } from "react";
import { ClientDetails, filterData } from "./data";
import CardProperty from "@/app/components/units-components/CardComponent";
import { IoMdAddCircle } from "react-icons/io";
import Filter from "@/app/components/Filter";
import { Pagination } from "antd";
import { Grid } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import CustomButton from "@/app/components/CustomButton";
import { GrTransaction } from "react-icons/gr";
import DropdownMenImportExport from "@/app/components/leadImport-Export/ImportExport";
import {
  exportProperties,
  searchPropertyByRange,
  getAllProperties,
  deleteAllProperties,
  importProperties,
  searchPropertyByName,
  togglePropertyInHome,
  togglePropertyLiked,
  searchUnitByCategory,
  searchUnitByTypes,
} from "@/actions/propertiesAction";
import DeleteButton from "@/app/components/delete-button/DeleteButton";
import { CiFilter, CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import Papa from "papaparse";
import { getAllSettings } from "@/actions/filterSettings";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { searchUsers } from "@/actions/auth";

function Page() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { t, locale } = useTranslation();
  const [units, setUnits] = useState([]);
  const urlParams = useSearchParams();
  const initialPage = parseInt(urlParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUnits, setTotalUnits] = useState(0);
  const [UnitsPerPage, setUnitsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [unitsTransfer, setUnitsTransfer] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterValues, setFilterValues] = useState(
    filterData.reduce((acc, ele) => {
      acc[ele.filterName] = "";
      return acc;
    }, {})
  );
  const [options, setOptions] = useState([
    { id: 1, filterName: "Property Types", data: "type", optionData: [] },
    {
      id: 2,
      filterName: "in-side / Out Side",
      data: "inOrOutSideCompound",
      optionData: [],
    },
    { id: 3, filterName: "Sales", data: "sales", optionData: [] },
    { id: 4, filterName: "Category", data: "category", optionData: [] },
    { id: 5, filterName: "Range", data: "range", optionData: [] },
  ]);

  const parseFromTo = () => {
    const parsedFrom = from ? Number(from) : undefined;
    const parsedTo = to ? Number(to) : undefined;
    return { parsedFrom, parsedTo };
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await getAllSettings();

        if (res && res.length > 0 && res[0].unitSettings) {
          const data = JSON.parse(res[0].unitSettings);
          console.log("Fetched Data:", data);

          setOptions((prev) =>
            prev.map((option) => {
              const matchedData = data[option.data];
              return {
                ...option,
                optionData:
                  matchedData && matchedData.length > 0
                    ? matchedData
                    : option.data === "range"
                    ? ["Total Price", "Unit price per square meter"]
                    : [],
              };
            })
          );
        } else {
          console.warn("No settings found.");
        }
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { parsedFrom, parsedTo } = parseFromTo();
        if (searchTerm) {
          const propertiesByName = await searchPropertyByName(searchTerm);
          console.log("Fetched properties by name:", propertiesByName);
        }
        if (parsedFrom || parsedTo) {
          const { properties, total } = await searchPropertyByRange(
            parsedFrom,
            parsedTo
          );
          console.log("Fetched properties by range:", properties);
          setUnits(properties);
          setTotalUnits(total);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, [from, to, searchTerm]);

  const handleFilterChange = (value, filterName) => {
    const updatedFilters = { ...filterValues, [filterName]: value };
    console.log(updatedFilters);
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
  const fetchUnits = async (page = 1, search = "", range = {}) => {
    const offset = (page - 1) * UnitsPerPage;

    if (!UnitsPerPage || UnitsPerPage <= 0) {
      console.error("Invalid UnitsPerPage value");
      return;
    }

    try {
      let properties = [];
      let totalProperties = 0;

      if (search) {
        const propertiesByName = await searchPropertyByName(search);
        properties = propertiesByName;
        totalProperties = propertiesByName.length;
      } else if (range.from || range.to) {
        const { properties: propertiesByRange, total } =
          await searchPropertyByRange(
            range.from,
            range.to,
            currentPage,
            UnitsPerPage
          );
        properties = propertiesByRange;
        totalProperties = total;
      } else {
        const { properties: allProperties, totalProperties: total } =
          await getAllProperties(UnitsPerPage, offset);
        properties = allProperties;
        totalProperties = total;
      }

      setUnits(properties);
      setTotalUnits(totalProperties);
    } catch (error) {
      console.error("Error fetching units", error);
    }
  };

  // const fetchUnits = async (page = 1, search = "") => {
  //   const offset = (page - 1) * UnitsPerPage;
  //   // setIsLoading(true)
  //   try {
  //     if (search) {
  //       console.log("Fetching units with search term:", search);
  //       const properties = await searchPropertyByName(search);
  //       setUnits(properties);
  //       setTotalUnits(properties.length);
  //       console.log(properties);
  //     } else {
  //       console.log("Fetching all units");
  //       const { properties, totalProperties } = await getAllProperties(UnitsPerPage, offset);
  //       setUnits(properties);
  //       setTotalUnits(totalProperties);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching units", error);
  //   } finally {
  //     // setIsLoading(false) // Set loading state to false
  //   }
  // };

  const handlePageSizeChange = (current, size) => {
    setUnitsPerPage(size);
    setCurrentPage(1);
    console.log(size);
  };

  // const handleExportCSV = async () => {
  //   try {
  //     const  {properties}  = await exportProperties();
  //     console.log(properties)
  //     if (!properties || properties.length === 0) {
  //       toast({
  //         variant: 'destructive',
  //         title: 'Error Export Units',
  //         description: 'No units available to export.', 
  //         status: 'error',
  //       });
  //       return;
  //     }

  //     const csv = Papa.unparse(properties);
  //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = 'units.csv';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //     toast({
  //       variant: 'success',
  //       title: 'Success Export Units',
  //       description: 'Units exported successfully.',
  //       status: 'success',
  //     });
  //   } catch (error) {
  //     toast({
  //       variant: 'destructive',
  //       title: 'Error Exporting Units',
  //       description: error.message || 'An unexpected error occurred.', // الآن error معرف هنا
  //       status: 'error',
  //     });
  //     console.error('Error exporting units:', error);
  //   }
  // };
  // // const handleImportCSV = (event) => {
  // //   const file = event.target.files[0];
  // //   if (!file) {
  // //     alert('No file selected.');
  // //     return;
  // //   }

  // //   Papa.parse(file, {
  // //     header: true,
  // //     skipEmptyLines: true,
  // //     complete: async (results) => {
  // //       if (results.errors.length > 0) {
  // //         console.error('Parsing errors:', results.errors);
  // //         toast({
  // //           variant: 'destructive',
  // //           title: 'Invalid file format.',
  // //           description: 'Please ensure the file is in CSV format.',
  // //           status: 'error',
  // //         });
  // //         return;
  // //       }

  // //       // Convert necessary attributes from strings to integers
  // //       const convertedData = results.data.map((property) => ({
  // //         ...property,
  // //         totalPrice: parseInt(property.totalPrice, 10),
  // //         rooms: parseInt(property.rooms, 10),
  // //         mobileNo: parseInt(property.rooms, 10),
  // //         tel: parseInt(property.rooms, 10),
  // //         propertyImage: property.propertyImage ? property.propertyImage.split(',') : [],
  // //         links: property.links ? property.links.split(',') : [],
  // //         inHome: property.inHome === 'TRUE',
  // //         liked: property.liked === 'TRUE',
  // //       }));

  // //       try {
  // //         await importProperties(convertedData);
  // //         toast({
  // //           variant: 'success',
  // //           title: 'Success import Units',
  // //           description: 'Units imported successfully!',
  // //           status: 'success',
  // //         });
  // //       } catch (error) {
  // //         console.error('Error importing units:', error);
  // //         toast({
  // //           variant: 'destructive',
  // //           title: 'Error importing units:',
  // //           description: error.message || 'Failed to import units.',
  // //           status: 'error',
  // //         });
  // //       }
  // //     },
  // //     error: (error) => {
  // //       console.error('Error parsing file:', error);
  // //       toast({
  // //         variant: 'destructive',
  // //         title: 'Error importing units:',
  // //         description: 'Failed to read the CSV file.',
  // //         status: 'error',
  // //       });
  // //     },
  // //   });
  // // };
  // const handleImportCSV = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) {
  //     alert('No file selected.');
  //     return;
  //   }

  //   Papa.parse(file, {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: async (results) => {
  //       if (results.errors.length > 0) {
  //         console.error('Parsing errors:', results.errors);
  //         toast({
  //           variant: 'destructive',
  //           title: 'Invalid file format.',
  //           description: 'Please ensure the file is in CSV format.',
  //           status: 'error',
  //         });
  //         return;
  //       }

  //       const convertedData = results.data.map((property) => ({
  //         ...property,
  //         totalPrice: parseInt(property.totalPrice, 10),
  //         rooms: parseInt(property.rooms, 10),
  //         mobileNo: parseInt(property.mobileNo, 10),
  //         tel: parseInt(property.tel, 10),
  //         propertyImage: property.propertyImage ? property.propertyImage.split(',') : [],
  //         links: property.links ? property.links.split(',') : [],
  //         inHome: property.inHome === 'TRUE',
  //         liked: property.liked === 'TRUE',
  //       }));

  //       try {
  //         await importProperties(convertedData);
  //         toast({
  //           variant: 'success',
  //           title: 'Success import Units',
  //           description: 'Units imported successfully!',
  //           status: 'success',
  //         });
  //       } catch (error) {
  //         console.error('Error importing units:', error);
  //         toast({
  //           variant: 'destructive',
  //           title: 'Error importing units:',
  //           description: error.message || 'Failed to import units.',
  //           status: 'error',
  //         });
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error parsing file:', error);
  //       toast({
  //         variant: 'destructive',
  //         title: 'Error importing units:',
  //         description: 'Failed to read the CSV file.',
  //         status: 'error',
  //       });
  //     },
  //   });
  // };
  // const handleDeleteAllProperties = async () => {
  //   try {
  //     await deleteAllProperties();
  //     toast({
  //       variant: 'success',
  //       title: 'Success Delete Units',
  //       description: 'All units deleted successfully.',
  //       status: 'success',
  //     });
  //     // fetchUnits(); // Refresh the state after deletion
  //   } catch (error) {
  //     toast({
  //       variant: 'destructive',
  //       title: 'Error Deleting Units',
  //       description: error.message || 'An unexpected error occurred.',
  //       status: 'error',
  //     });
  //     console.error('Error deleting units:', error);
  //   }
  // };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchUnits(currentPage, searchTerm);
  }, [currentPage, searchTerm, UnitsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`?page=${page}&search=${searchTerm}`);
    window.scrollTo(0, 0);
  };

  const onFilterChange = async (e, data) => {
    console.log(e, data);
    if (data === "Category") {
      const documents = await searchUnitByCategory(e);
      setUnits(documents);
      setTotalUnits(documents.length);
      console.log(documents);
    }
    if (data === "Property Types") {
      const documents = await searchUnitByTypes(e);
      setUnits(documents);
      setTotalUnits(documents.length);
      console.log(documents);
    }
  };

  const handleLike = async (id) => {
    const data = await togglePropertyLiked(id);
    fetchUnits(currentPage, searchTerm);
  };

  const handleShowHome = async (id) => {
    const data = await togglePropertyInHome(id);
    fetchUnits(currentPage, searchTerm);
  };

  const handleCheckUnits = (id) => {
    setUnitsTransfer((prev) => {
      const exists = prev.some((unit) => unit.id === id);
      if (exists) {
        return prev.filter((unit) => unit.id !== id);
      } else {
        return [...prev, { id, note: false }];
      }
    });
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
  useEffect(() => {
    console.log(unitsTransfer);
  }, [unitsTransfer]);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full flex flex-wrap justify-between items-start gap-3 px-2 pt-2 max-[1200px]:px-7">
        <Grid
          item
          xs={12}
          sm={7}
          md={11.3}
          lg={11.4}
          className="flex w-full justify-end"
          dir="ltr"
        >
          <div
            className={`head flex justify-between items-start w-full flex-col  md:flex-row-reverse gap-2 md:gap-5`}
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
                placeholder={`${t("search_unit")} ...`}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-1 md:gap-2 items-center justify-between w-full md:w-fit">
              {/* <div className='flex gap-1 md:gap-2 items-center justify-between w-full'> */}
              <CustomButton
                fun={() => router.push("/units/add-unit")}
                // title={!isMobile && t('add_unit')}
                title={t("add_unit")}
                className="GreenButton"
                icon={() => <IoMdAddCircle />}
              />
              <CustomButton
                // title={!isMobile && t('clear_filter')}
                title={t("clear_filter")}
                icon={() => <CiFilter />}
                className="GreenButton"
                fun={() => {
                  handleClearFilters();
                  fetchUnits(1, "");
                }}
              />

              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="GreenButton">
                      <GrTransaction />
                      {t("transform")}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle> Transform Units </AlertDialogTitle>
                      <AlertDialogDescription>
                        <Input
                          placeholder="Search Users"
                          onChange={(e) =>
                            searchUsersForTransform(e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {users && users.length > 0 ? (
                          <ul className="mt-4 space-y-2">
                            {users.map((user, index) => (
                              <li
                                key={index}
                                className="p-4 bg-white shadow rounded-lg flex items-center justify-between hover:bg-blue-50 transition dark:bg-gray-900 dark:text-white"
                              >
                                <div>
                                  <p className="font-semibold text-gray-800 dark:text-white">
                                    {user.name}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-white">
                                    {user.email}
                                  </p>
                                </div>
                                <Button className="">{t("select")}</Button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-4 text-gray-600">Not found</p>
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setUsers([])}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* <DeleteButton
                handleDelete={handleDeleteAllProperties}
                title={!isMobile && t('delete_all_units')}
                // afterDel={() => fetchUnits(currentPage, searchTerm)}
              /> */}
              {/* <div className="block md:hidden"> */}
              {/* <DropdownMenImportExport  handleExportCSV={handleExportCSV} handleImportCSV={handleImportCSV} />  */}
              {/* </div> */}
            </div>
          </div>
        </Grid>

        <div
          className="filter bg-Lightbg dark:bg-transparent rounded-xl w-full h-[60px] max-[450px]:h-max max-[450px]:py-2 flex justify-end max-[450px]:flex-wrap items-center mb-5 max-[450px]:mb-0 gap-3 px-0 md:px-3 shadow-box_shadow dark:shadow-none"
          dir="rtl"
        >
          <div className="filter w-full md:w-full">
            <Filter
              filterChange={onFilterChange}
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
              data={options}
              col={5}
            />
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <Input
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            {/* <DropdownMenImportExport handleExportCSV={handleExportCSV} handleImportCSV={handleImportCSV} /> */}
          </div>
        </div>

        <Grid container spacing={1} dir="ltr">
          {units.map((unit, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CardProperty
                property={unit}
                handleLike={handleLike}
                handleShowHome={handleShowHome}
                handleCheckUnits={handleCheckUnits}
              />
            </Grid>
          ))}
        </Grid>

      </div>
        <div className="footer ">
        <div className="flex justify-center items-center mt-4" dir="ltr">
          <Pagination
            current={currentPage}
            showSizeChanger
            total={totalUnits}
            pageSize={UnitsPerPage}
            onShowSizeChange={handlePageSizeChange}
            onChange={handlePageChange}
            className="custom-pagination mt-0 mx-auto"
          />
        </div>


        </div>
    </div>
  );
}
export default Page;
