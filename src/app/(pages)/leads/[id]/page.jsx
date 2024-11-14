"use client";
import Details from "@/app/components/user-components/Details";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { Tabs, Tab, Box, Grid } from "@mui/material";
import { getLeadById, updateLeadByID } from "@/actions/leadsAction";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function Page({ params }) { 
  const { toast } = useToast()
  const { locale, t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [lead, setLead] = useState({}); 
  const router = useRouter();
  const handleChange = (_, field, value) => {
    setLead((prevLead) => ({
      ...prevLead,
      [field]: field === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const fetchLead = async () => {
    try {
      const leadsData = await getLeadById(params.id); 
      setLead(leadsData);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    if (params.id) fetchLead(); 
  }, [params]);

  const handleSubmit = async () => {
    const currentDateTime = new Date().toLocaleString();
    try {
      const response = await updateLeadByID(params.id,lead);
      console.log("Lead created successfully:", response);
      setLead({
        name: "",
        leadNumber: "",
        number: "",
        lastFollowUp: "",
        description: "",
        clientFollowUp: "",
        class: "",
        assignedTo: "",
        customerSource: "",
        type: "",
        leadStatus: "",
        modifiedTime: "",
        createdTime: "",
      });
      toast({
        title: "Lead Updated",
        description: `Lead Updated successfully on ${currentDateTime}`,
        action: (
          <ToastAction
            altText="ok"
            onClick={() => router.push(`/leads/${response.$id}`)}
          >
            Show Details
          </ToastAction>
        ),
      });
      router.push("/leads")
    } catch (error) {
      console.error("Error Updating lead:", error);

      toast({
        variant: "destructive",
        title: "Error Updating Lead",
        description: error.message || "There was an issue Updating the lead.",
        status: "error",
        action: (
          <ToastAction altText="ok" onClick={() => router.push(`/leads`)}>
            Try Again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <Box className="add-unit min-h-screen flex justify-center items-center" dir="ltr">
      <Grid container direction="row" wrap="nowrap" className="gap-6 max-sm:gap-1 py-6 px-4">
        <Grid item xs={3} md={2} className="bg-Lightbg dark:bg-cardbgDark my-2 rounded-md">
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="Vertical tabs"
            TabIndicatorProps={{
              style: { backgroundColor: "#4CAF50" },
            }}
            style={{ height: "100%", paddingTop: 16 }}
          >
            <Tab
              label={t("Lead_Details")} 
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
              lead={lead}
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
