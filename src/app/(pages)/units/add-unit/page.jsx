"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useState } from 'react';
import { Box, Grid, Tab, Tabs } from "@mui/material";
import DetailsPageUnits from "@/app/components/units/DetailsPageUnits";

function Page({ params }) {
  const { locale, t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const [unit, setUnit] = useState({
    unitsInformation: {
      propertyNumber: "",
      unitFor: "",
      area: "",
      rooms: "",
      phase: "",
      type: "",
      building: "",
      theFloors: "",
      finished: "",
      propsOfUnit: "",
      Inside_Outside: "",
      totalPrice: "",
      descriptions: "",
      LastFollowUp: "",
      activity: "",
      status: "",
    },
    customInformation: {
      propertyOfferedBy: "",
      name: "",
      unitNo: "",
      update: "",
      mobileNo: "",
      tel: "",
      updateCalls: "",
    },
    salesInformation: {
      handeler: "",
      sales: "",
      category: "",
    },
    unitDetails: {
      createdTime: "",
      modifiedTime: "",
      landArea: "",
      currency: "",
      rentFrom: "",
      rentTo: "",
    },
    pricingInformation: {
      propertyNameCompoundName: "",
    },
    unitImageInformation: {
      linksPDFDetails: "",
    }
  });

  const handleChange = (section, field, value) => {
    setUnit((prevLead) => ({
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
    console.log(unit);
  };

  return (
    <Box className="add-unit min-h-screen flex justify-center items-center">
      <Grid container direction="row" wrap="nowrap" className="gap-6 max-sm:gap-1 py-6 px-4">
        <Grid item xs={3} md={2} className="bg-Lightbg dark:bg-cardbgDark my-2 rounded-md">
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="Vertical tabs"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#4CAF50",
              },
            }}
            style={{ height: '100%', paddingTop: 16 }}
          >
            <Tab
              label="Unit Details"
              sx={{
                "&.Mui-selected": {
                  color: "#5be49b",
                },
              }}
            />
          </Tabs>
        </Grid>

        {/* <Grid item xs={10} className="bg-Lightbg dark:bg-transparent rounded-md px-2">
          {selectedTab === 0 && (
            <DetailsPageUnits
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              page="add"
              title="Add Unit"
              description="add unit page"
            />
          )}
        </Grid> */}

        <Grid item xs={10} className="bg-Lightbg dark:bg-transparent rounded-md px-2">
          {selectedTab === 0 && (
            <DetailsPageUnits
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              page="add"
              title="Add Unit"
              description="Add Unit"
            />
          )}
        </Grid>

      </Grid>
    </Box>
  );
}

export default Page;
