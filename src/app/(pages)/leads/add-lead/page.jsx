"use client";
import Details from "@/app/components/user-components/Details";
// import Update from "@/app/components/user-components/Update";
// import { useTranslation } from "@/app/context/TranslationContext";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useIsMobile } from "@/hooks/use-mobile";
// import { useEffect, useRef, useState } from "react";
// import { AiOutlineRightSquare } from "react-icons/ai";
import TabButton from "../utils/TabButton";
import React, { useState } from 'react';
import { useTranslation } from '@/app/context/TranslationContext';
import AddUnits from "@/app/components/units/AddUnits";
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, Grid, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
function Page({ params }) {
  // const isMobile = useIsMobile();
  // const [isOpen, setIsOpen] = useState(!isMobile);
  // const tabsRef = useRef(null);
  const { locale, t } = useTranslation();
      const [selectedTab, setSelectedTab] = useState(0);
 
  const [lead, setLead] = useState({
    leadDetails: {
      name: "",
      leadNumber: "", 
      number: "", 
      lastFollowUp: "",
      description: "",
      clientFollowUp:"",
      class: ""
    },
    sheetsCalls: {
      assignedTo: "",
      customerSource: "",
      type: "",
      leadStatus: "",
      modifiedTime: "",
      createdTime: ""
    }
  })
  const listTabs = [
    { id: 1, title: "Lead Details", value: "details" },
    { id: 2, title: "Updates", value: "updates" },
  ];
  const handleChange = (section, field, value) => {
    setLead((prevLead) => ({
      ...prevLead,
      [section]: {
        ...prevLead[section],
        [field]: value,
      },
    }));
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
};

  const handleSubmit= ()=>{
    console.log(lead)
  } 

  // useEffect(() => {
  //   setIsOpen(!isMobile);
  // }, [isMobile]);

  // useEffect(() => {
  //   if (isMobile) {
  //     const handleClickOutside = (event) => {
  //       if (tabsRef.current && !tabsRef.current.contains(event.target)) {
  //         setIsOpen(false);
  //       }
  //     };
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }
  // }, [isMobile]);

  return (
    // <div className="page-user min-h-screen h-max mx-2">
    //   <div className="container px-0 py-4 max-md:pb-20 max-md:pt-14 mx-auto flex">
    //     <Tabs
    //       defaultValue="details"
    //       className="flex w-full h-full relative"
    //     >
    //       {isMobile && !isOpen && (
    //         <AiOutlineRightSquare
    //           className="text-xl absolute left-5 top-0 z-[2]"
    //           onClick={() => setIsOpen(true)}
    //         />
    //       )}

    //       <TabsList
    //         dir={locale == "ar" ? "rtl" : "ltr"}
    //         ref={tabsRef}
    //         className={`flex-shrink-0 flex flex-col gap-5 transition-all duration-200 bg-[#FFF] dark:bg-[#222831] min-h-screen overflow-hidden ${
    //           isMobile
    //             ? isOpen
    //               ? "absolute top-0 left-0 w-64"
    //               : "absolute top-0 -left-64"
    //             : "w-64"
    //         }`}
    //       >
            // <TabButton data={listTabs} />
    //       </TabsList>

    //       <div className="flex-1 pl-5">
    //         <TabsContent
    //           value="details"
    //           className="w-full"
    //           dir={locale == "ar" ? "rtl" : "ltr"}
    //         >
    //           <Details
    //             handleChange={handleChange}
    //             handleSubmit={handleSubmit}
    //             page="add"
    //             title={t("Lead_Details")}
    //             description={t("Lead_descriptions")}
    //           />
    //         </TabsContent>
    //         <TabsContent
    //           value="updates"
    //           className="w-full"
    //           dir={locale == "ar" ? "rtl" : "ltr"}
    //         >
    //           <Update />
    //         </TabsContent>
    //       </div>
    //     </Tabs>
    //   </div>
    // </div>
    <Box className="add-unit min-h-screen flex justify-center items-center px-0 md:px-2">

    <Grid container direction="row" dir="ltr" className="flex-nowrap gap-6">
        <Grid item xs={3} className="bg-Lightbg dark:bg-cardbgDark my-2 rounded-md">
            <Tabs
                orientation="vertical"
                className="bg-[#FFF] dark:bg-[#222831] "
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="Vertical tabs"
                TabIndicatorProps={{
                  style: {
                      backgroundColor: "#4CAF50",
                  }
              }}
                style={{ height: '100%', paddingTop: 16 }}
            >
                <Tab label="Lead Details" sx={{
            color: selectedTab === 0 ? "text.text_link_active" : "text.gray",
            "&.Mui-selected": {
                color: "#5be49b", 
            },
        }}/>
                {/* <Tab label="Update" /> */}
            </Tabs>
        </Grid>
        <Grid item xs={9} className=" bg-Lightbg dark:bg-cardbgDark rounded-md">
            {selectedTab === 0 && (
              <Details
                          handleChange={handleChange}
                          handleSubmit={handleSubmit}
                          page="add"
                          title={t("Lead_Details")}
                          description={t("Lead_descriptions")}
                        />
            )}
            {/* {selectedTab === 1 && <Typography variant="body1">Content for Update Tab</Typography>} */}
        </Grid>
    </Grid>
</Box>
  );
}

export default Page;
