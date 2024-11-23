"use client";
import { createSettingsLeadDocument, getAllSettings, updateSettingsLeadDocument } from "@/actions/filterSettings";
import MainCardSetting from "@/app/components/administration/MainCardSetting";
import SettingsLead from "@/app/components/administration/utils/SettingsLead";
import SettingsUnits from "@/app/components/administration/utils/SettingsUnits";
import TabComponent from "@/app/components/TabComponent";
import { useTranslation } from "@/app/context/TranslationContext";
import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
const dummyData = {
  clientFollowUp: ["Follow Up 1", "Follow Up 2"],
  assignedTo: ["John Doe", "Jane Smith"],
  customerSource: ["Website", "Referral"],
  type: ["New", "Existing"],
  leadStatus: ["Open", "Closed"],
  class: ["Class A", "Class B"],
};
function Page() {
  const [options, setOptions] = useState({});
  const [newValues, setNewValues] = useState({});
  const { t } = useTranslation()
  const [selectedTab, setSelectedTab] = useState(0);
  useEffect(()=>{
    const fetchData = async()=>{
      const documents = await getAllSettings()
      console.log(JSON.parse(documents[0].leadSettings))
       console.log(documents[0].leadSettings)
       setOptions(JSON.parse(documents[0].leadSettings))
    }
    fetchData()
  }, [])
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
  
  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = async()=>{
    const data = JSON.stringify(options)
    const res = await updateSettingsLeadDocument({leadSettings:data})
    console.log(options)
    console.log(res)
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
            handleSubmit={handleSubmit}
              title={t("Units_Settings")}
              description={t("decripe_unit")}
              content={<SettingsUnits />}
            />
          )}
          {selectedTab === 1 && (
            <MainCardSetting
            handleSubmit={handleSubmit}
              title={t("Leads_Settings")}
              description={t("decripe_lead")}
              content={<SettingsLead options={options} newValues={newValues} handleDeleteOption={handleDeleteOption} setNewValues={setNewValues} handleAddOption={handleAddOption} />}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Page;
