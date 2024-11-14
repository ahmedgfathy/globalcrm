"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useState } from 'react';
import DetailsPageUnits from "@/app/components/units/DetailsPageUnits";
import { Box, Grid, Tab ,Tabs } from "@mui/material";
function Page({ params }) {
  const { locale, t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
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
            page="view"
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
