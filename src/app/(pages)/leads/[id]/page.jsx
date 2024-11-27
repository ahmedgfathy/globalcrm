"use client";
import Details from "@/app/components/user-components/Details";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { Tabs, Tab, Box, Grid } from "@mui/material";
import { getLeadById, updateLeadByID, uploadImageToBucket } from "@/actions/leadsAction";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function Page({ params }) { 
  const { toast } = useToast()
  const { locale, t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [lead, setLead] = useState({}); 
  const router = useRouter();
  const [image, setImage] = useState("/");
  const [imageFile, setImageFile] = useState(null); 
  const handleChange = (_, field, value) => {
    setLead((prevLead) => ({
      ...prevLead,
      [field] : value,
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
  const handleDeleteImage = () => {
    setImage("/assets/images/default-user.jpg");
    setImageFile(null);
  };
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
        <Grid item xs={3} md={2} className="bg-Lightbg dark:bg-cardbgDark my-2 rounded-md max-sm:hidden">
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

        <Grid item xs={12} sm={10} className="bg-Lightbg dark:bg-transparent rounded-md px-2">
          {selectedTab === 0 && (
            <Details
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleDeleteImage={handleDeleteImage}
              setImage={setImage}
              imageFile={imageFile}
              image={image}
              setImageFile={setImageFile}
              handleImageChange={handleImageChange}
              lead={lead}
              page="view"
              title={t("Lead_Details")}
              description={t("Lead_descriptions")}
            />
          )}
          {selectedTab === 1 && (
            <Details
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleDeleteImage={handleDeleteImage}
              setImage={setImage}
              imageFile={imageFile}
              setImageFile={setImageFile}
              handleImageChange={handleImageChange}
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
