"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useState } from 'react';
import { Box, Grid, Tab, Tabs } from "@mui/material";
import DetailsPageUnits from "@/app/components/units/DetailsPageUnits";

function Page() {
  const { locale, t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const [unit, setUnit] = useState({
  building: "",
  unitFor: "",
  propertyNumber: "",
  theFloors: "",
  area: "",
  finished: "",
  rooms: 0,
  unitFeatures: "",
  phase: "",
  note: "",
  totalPrice: 0,
  inOrOutSideCompound: "",
  description: "",
  lastFollowIn: 0,
  status: "",
  activity: "",
  propertyOfferedBy: "",
  mobileNo: 0,
  name: "",
  tel: 0,
  unitNo: "",
  callUpdate: "",
  forUpdate: "",
  handler: "",
  sales: "",
  category: "",
  createdTime: 0,
  modifiedTime: 0,
  landArea: "",
  currency: "",
  rentFrom: 0,
  rentTo: 0,
  compoundName: "",
  propertyImage: [],
  links: []
  });

  const handleChange = (_, field, value) => {
    setUnit((prevLead) => ({
      ...prevLead,
      [field]: field === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = () => {
    console.log(unit);
  };

  return (
    <Box className="add-unit min-h-screen flex justify-center items-center" dir="ltr">
      <Grid container direction="row" wrap="nowrap" className="gap-6 max-sm:gap-1 py-6 px-4">
        <Grid item xs={3} md={2} className="bg-Lightbg dark:bg-cardbgDark my-2 rounded-md max-sm:hidden">
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
              label={t("unit_details")}
              sx={{
                "&.Mui-selected": {
                  color: "#5be49b",
                },
              }}
            />
          </Tabs>
        </Grid>

        <Grid item xs={12} sm={10} className="bg-Lightbg dark:bg-transparent rounded-md px-2">
          {selectedTab === 0 && (
            <DetailsPageUnits
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              unit={unit}
              page="add"
              title={t("unit_details")}
              description="Add Unit"
            />
          )}
        </Grid>

      </Grid>
    </Box>
  );
}

export default Page;
