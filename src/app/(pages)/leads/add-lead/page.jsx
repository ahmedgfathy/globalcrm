"use client";
import Details from "@/app/components/user-components/Details";
import React, { useState } from 'react';
import { useTranslation } from '@/app/context/TranslationContext';
import { Grid, Tab, Tabs, Box } from '@mui/material';
import { addLead } from '@/actions/leadsAction'

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
  });
  console.log(setLead);

  const handleChange = (section, field, value) => {
    setLead((prevLead) => ({
      ...prevLead,
      [section]: {
        ...prevLead[section],
        [field]: field === 'number' ? parseInt(value, 10) : value, // Ensure number is parsed as an integer
      },
    }))
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = () => {
    addLead(lead.leadDetails)
      .then((response) => {
        console.log('Lead created successfully:', response);
        // Reset leadDetails to empty
        setLead((prevLead) => ({
          ...prevLead,
          leadDetails: {
            name: "",
            leadNumber: "",
            number: "",
            lastFollowUp: "",
            description: "",
            clientFollowUp: "",
            class: ""
          }
        }));
      })
      .catch((error) => {
        console.error('Error creating lead:', error);
      });
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
              label="Lead Details"
              sx={{
                "&.Mui-selected": {
                  color: "#5be49b",
                },
              }}
            />
          </Tabs>
        </Grid>

        <Grid item xs={10} className="bg-Lightbg dark:bg-transparent rounded-md px-2">
          {selectedTab === 0 && (
            <Details
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              page="add"
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
