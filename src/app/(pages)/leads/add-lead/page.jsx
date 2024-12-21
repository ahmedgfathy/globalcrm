"use client";
import Details from "@/app/components/user-components/Details";
import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { Grid, Tab, Tabs, Box } from "@mui/material";
import { addLead, uploadImageToBucket } from "@/actions/leadsAction";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";

function Page() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const [image, setImage] = useState("/");
  const [state] = useContext(UserContext)
  const [refreshKey, setRefreshKey] = useState(0);
  const [imageFile, setImageFile] = useState(null); 
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
    leadImage:""
  });

  const handleChange = (_, field, value) => {
    setLead((prevLead) => ({
      ...prevLead,
      [field]:  value,
    }));
  };

  const handleDeleteImage = () => {
    setImage("/assets/images/default-user.jpg");
    setLead({...lead, leadImage: "/assets/images/default-user.jpg"})
    setImageFile(null); 
  };

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmit = async () => {
    const currentDateTime = new Date().toLocaleString();
    try {
      const response = await addLead(lead);
      setLead((prevLead) => ({
        ...prevLead,
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
      }));
      
      setRefreshKey((prevKey) => prevKey + 1);

      toast({
        title: "Lead Created",
        description: `Lead created successfully on ${currentDateTime}`,
        duration: 60000,
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
  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
      setImageFile(file);
      try {
        const response = await uploadImageToBucket(file);
        setLead({...lead, leadImage: response.fileUrl});
        console.log("Image uploaded successfully:", response);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
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
        <Grid
          item
          xs={3}
          md={2}
          className="bg-Lightbg dark:bg-cardbgDark my-2 rounded-md max-sm:hidden"
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
              label={t("Lead_Details")}
              sx={{
                color: "#5be49b",
                "&.Mui-selected": {
                  color: "#5be49b",
                  backgroundColor: "rgba(91, 228, 155, 0.1)"
                },
              }}
            />
            <Tab
              label={t("Lead_History")}
              sx={{
                color: "#5be49b",
                "&.Mui-selected": {
                  color: "#5be49b",
                  backgroundColor: "rgba(91, 228, 155, 0.1)"
                },
              }}
            />
          </Tabs>
        </Grid>

        <Grid
          item
          xs={12} sm={10}
          className="bg-Lightbg dark:bg-transparent rounded-md px-2"
        >
          {selectedTab === 0 && (
            <Details
              handleChange={handleChange}
              image={lead.leadImage || image}
              setImage={setImage}
              lead={lead}
              imageFile={imageFile}
              setImageFile={setImageFile}
              handleSubmit={handleSubmit}
              handleDeleteImage={handleDeleteImage}
              handleImageChange={handleImageChange}
              page="add"
              title={t("Lead_Details")}
              description={t("Lead_descriptions")}
            />
          )}
          {selectedTab === 1 && (
            <Details
              handleChange={handleChange}
              key={refreshKey} 
              handleSubmit={handleSubmit}
              image={image}
              setImage={setImage}
              imageFile={imageFile}
              setImageFile={setImageFile}
              handleImageChange={handleImageChange}
              handleDeleteImage={handleDeleteImage}
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
