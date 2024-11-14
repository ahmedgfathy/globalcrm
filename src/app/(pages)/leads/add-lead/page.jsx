"use client";
import Details from "@/app/components/user-components/Details";
import React, { useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { Grid, Tab, Tabs, Box } from "@mui/material";
import { addLead } from "@/actions/leadsAction";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

function Page() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const [lead, setLead] = useState({
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
  const handleChange = (_, field, value) => {
    setLead((prevLead) => ({
      ...prevLead,
      [field]: field === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = async () => {
    const currentDateTime = new Date().toLocaleString();
    try {
      const response = await addLead(lead);
      console.log("Lead created successfully:", response);
      console.log(response.$id);
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
        title: "Lead Created",
        description: `Lead created successfully on ${currentDateTime}`,
        action: (
          <ToastAction
            altText="ok"
            onClick={() => router.push(`/leads/${response.$id}`)}
          >
            Show Details
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error creating lead:", error);

      toast({
        variant: "destructive",
        title: "Error Creating Lead",
        description: error.message || "There was an issue creating the lead.",
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
      <Grid
        container
        direction="row"
        wrap="nowrap"
        className="gap-6 max-sm:gap-1 py-6 px-4"
      >
        <Grid
          item
          xs={3}
          md={2}
          className="bg-Lightbg dark:bg-cardbgDark my-2 rounded-md"
        >
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
            style={{ height: "100%", paddingTop: 16 }}
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

        <Grid
          item
          xs={10}
          className="bg-Lightbg dark:bg-transparent rounded-md px-2"
        >
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
