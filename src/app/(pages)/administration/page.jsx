"use client";
import MainCardSetting from "@/app/components/administration/MainCardSetting";
import SettingsLead from "@/app/components/administration/utils/SettingsLead";
import TabComponent from "@/app/components/TabComponent";
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
const dummyData = {
  clientFollowUp: ["Follow Up 1", "Follow Up 2"],
  assignedTo: ["John Doe", "Jane Smith"],
  customerSource: ["Website", "Referral"],
  type: ["New", "Existing"],
  leadStatus: ["Open", "Closed"],
  class: ["Class A", "Class B"],
};
function Page() {
  const [options, setOptions] = useState(dummyData);
  const [newValues, setNewValues] = useState({});

  const handleAddOption = (boxName) => {
    if (newValues[boxName]) {
      setOptions((prev) => ({
        ...prev,
        [boxName]: [...(prev[boxName] || []), newValues[boxName]],
      }));
      setNewValues((prev) => ({
        ...prev,
        [boxName]: "",
      }));
    }
  };

  const handleDeleteOption = (boxName, optionToDelete) => {
    console.log("delete");
    setOptions((prev) => ({
      ...prev,
      [boxName]: prev[boxName].filter((option) => option !== optionToDelete),
    }));
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };
  const handleSubmit = async()=>{
    console.log(options)
  }
  return (
    <Box className="add-unit min-h-screen flex justify-center items-center" dir="ltr">
    <Grid
      container
      direction="row"
      wrap="nowrap"
      className="gap-6 max-sm:gap-1 py-6 px-4 min-h-screen"
    >
      <TabComponent
        ele={["units", "leads"]}
        handleTabChange={handleTabChange}
        selectedTab={selectedTab}
      />
      <Grid
        item
        xs={12}
        sm={10}
        className="bg-Lightbg dark:bg-transparent rounded-md px-2"
      >
        {selectedTab === 0 && (
          <MainCardSetting
            title="Units Settings"
            description="You can access the unit setting here"
            content={<p>Content for Units Setting</p>}
          />
        )}
        {selectedTab === 1 && (
          <MainCardSetting
            title="Leads Settings"
            handleSubmit={handleSubmit}
            description="You can access the lead setting here"
            content={<SettingsLead options={options} handleAddOption={handleAddOption} handleDeleteOption={handleDeleteOption} setNewValues={setNewValues} newValues={newValues}/>}
          />
        )}
      </Grid>
    </Grid>
    </Box>
  );
}

export default Page;
