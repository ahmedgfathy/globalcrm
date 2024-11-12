"use client";
import Details from "@/app/components/user-components/Details";
import React, { useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { Tabs, Tab, Box, Grid } from "@mui/material";
function Page({ params }) {
  const { locale, t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const [lead, setLead] = useState({
    leadDetails: {
      name: "",
      leadNumber: "",
      number: "",
      lastFollowUp: "",
      description: "",
      clientFollowUp: "",
      class: "",
    },
    sheetsCalls: {
      assignedTo: "",
      customerSource: "",
      type: "",
      leadStatus: "",
      modifiedTime: "",
      createdTime: "",
    },
  });
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

  const handleSubmit = () => {
    console.log(lead);
  };

  return (
    <Box className="add-unit min-h-screen flex justify-center items-center px-0 md:px-2">
      <Grid container direction="row" dir="ltr" wrap="nowrap" className="gap-6">
        <Grid
          item
          xs={3}
          md={2}
          className="bg-Lightbg dark:bg-cardbgDark my-2 rounded-md"
        >
          <Tabs
            orientation="vertical"
            className="bg-[#FFF] dark:bg-[#222831] "
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="Vertical tabs"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#4CAF50",
              },
            }}
            style={{ height: "100%", paddingTop: 16 }}
          >
            <Tab
              label="Lead Details"
              sx={{
                color:
                  selectedTab === 0 ? "text.text_link_active" : "text.gray",
                "&.Mui-selected": {
                  color: "#5be49b",
                },
              }}
            />
          </Tabs>
        </Grid>
        <Grid item xs={9} className=" bg-Lightbg dark:bg-cardbgDark rounded-md">
          {selectedTab === 0 && (
            <Details
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              page="view"
              title={t("Lead_Details")}
              description={t("Lead_descriptions")}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Page;
