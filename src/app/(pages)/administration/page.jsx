"use client";
import { getAllSettings, updateSettings } from "@/actions/filterSettings";
import MainCardSetting from "@/app/components/administration/MainCardSetting";
import RoleManagement from "@/app/components/administration/Role";
import SettingsLead from "@/app/components/administration/utils/SettingsLead";
import SettingsUnits from "@/app/components/administration/utils/SettingsUnits";
import TabComponent from "@/app/components/TabComponent";
import { useTranslation } from "@/app/context/TranslationContext";
import { useToast } from "@/hooks/use-toast";
import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";

function Page() {
  const [options, setOptions] = useState({});
  const [newValues, setNewValues] = useState({});
  const [newUnitsValues, setNewUnitsValues] = useState({});
  const [unitsOptions, setUnitsOptions] = useState({})
  const { t } = useTranslation()
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const documents = await getAllSettings()
      setOptions(JSON.parse(documents[0].leadSettings))
      setUnitsOptions(JSON.parse(documents[0].unitSettings))
    }
    fetchData()
  }, [])
  const handleAddOption = (boxName, section) => {
    if (section === "unit") {
      if (newUnitsValues[boxName]) {
        setUnitsOptions((prev) => ({
          ...prev,
          [boxName]: [...(prev[boxName] || []), newUnitsValues[boxName]],
        }));
        setNewUnitsValues((prev) => ({
          ...prev,
          [boxName]: "",
        }));
      }
    } else {
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
    }
  };

  const handleDeleteOption = (boxName, optionToDelete, section) => {
    console.log("delete");
    if (section === "unit") {
      setUnitsOptions((prev) => ({
        ...prev,
        [boxName]: prev[boxName].filter((option) => option !== optionToDelete),
      }));
    } else {

      setOptions((prev) => ({
        ...prev,
        [boxName]: prev[boxName].filter((option) => option !== optionToDelete),
      }));
    }
  };

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = async () => {
    try {
      const leadData = JSON.stringify(options);
      const unitData = JSON.stringify(unitsOptions);
      const response = await updateSettings({ leadSettings: leadData, unitSettings: unitData });

      const currentDateTime = new Date().toLocaleString();

      const entityType = selectedTab === 0 ? "Units" : "Leads";
      const entityPath = selectedTab === 0 ? "units" : "leads";

      toast({
        title: `${entityType} Updated`,
        description: `${entityType} settings updated successfully on ${currentDateTime}`
      });
    } catch (error) {
      console.error("Error updating settings:", error);

      toast({
        title: "Update Failed",
        description: `Failed to update ${selectedTab === 0 ? "Units" : "Leads"} settings. ${error?.message || "Please try again."
          }`
      });
    }
  };

  return (
    <Box className="add-unit min-h-screen flex justify-center items-center" dir="ltr">
      <Grid
        container
        direction="row"
        wrap="nowrap"
        className="gap-6 max-sm:gap-1 py-6 px-4 min-h-screen"
      >
        <TabComponent
          className="font-bold"
          ele={["units", "leads", "roles"]}
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
              content={<SettingsUnits options={unitsOptions} newValues={newUnitsValues} handleDeleteOption={handleDeleteOption} setNewValues={setNewUnitsValues} handleAddOption={handleAddOption} />}
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
          {selectedTab === 2 && ( <RoleManagement /> )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Page;
