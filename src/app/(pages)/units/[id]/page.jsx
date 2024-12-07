"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useState, useEffect } from 'react';
import DetailsPageUnits from "@/app/components/units/DetailsPageUnits";
import { Box, Grid, Tab ,Tabs } from "@mui/material";
import { getPropertyById, updatePropertyByID, uploadPropertyImages } from "@/actions/propertiesAction";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
function Page({ params }) {
  const router = useRouter();
  const {toast} = useToast()
  const { locale, t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [unit, setUnit] = useState({})
  const [images, setImages] = useState([]);
  const [imagesFile, setImagesFile] = useState([]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleChange = (_, field, value) => {
    setUnit((prevLead) => ({
      ...prevLead,
      [field]: field === "number" ? parseInt(value, 10) : value,
    }));
  };
  const fetchUnit = async () => {
    try {
      const unitData = await getPropertyById(params.id); 
      setUnit(unitData);
      console.log(unitData)
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };
  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newImages = [];
      const newFiles = [];
  
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages((prevImages) => [...prevImages, e.target.result]);
        };
        reader.readAsDataURL(file);
  
        newFiles.push(file);
        try {
          const response = await uploadPropertyImages(file);
          setUnit((prevLead) => ({
            ...prevLead,
            propertyImage: [...prevLead.propertyImage, response.fileUrl],
          }));
          console.log("Image uploaded successfully:", response);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
  
      setImagesFile((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  const handleDeleteImage = async (index, id) => {
    console.log(index, id)
  };
  useEffect(() => {
    if (params.id) fetchUnit(); 
  }, [params]);

  const handleSubmit = async () => {
    const currentDateTime = new Date().toLocaleString();
    const modifiedUnit = { ...unit };
    modifiedUnit.rooms = parseInt(modifiedUnit.rooms, 10)
    modifiedUnit.totalPrice = parseInt(modifiedUnit.totalPrice, 10)
    modifiedUnit.mobileNo = parseInt(modifiedUnit.mobileNo, 10)
    modifiedUnit.tel = parseInt(modifiedUnit.tel, 10)
    // modifiedUnit.links = modifiedUnit.links.split(" ")
    try {
      const response = await updatePropertyByID(params.id,modifiedUnit);
      console.log("Unit updated successfully:", response)
      toast({
        title: "Unit Updated",
        description: `Unit Updated successfully on ${currentDateTime}`,
        action: (
          <ToastAction
            altText="ok"
            onClick={() => router.push(`/units/${response.$id}`)}
          >
            Show Details
          </ToastAction>
        ),
      });
      router.push("/units")
    } catch (error) {
      console.error("Error Updating unit:", error);

      toast({
        variant: "destructive",
        title: "Error Updating Unit",
        description: error.message || "There was an issue Updating the unit.",
        status: "error",
        action: (
          <ToastAction altText="ok" onClick={() => router.push(`/units`)}>
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
            unit={unit}
            page="view"
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            handleDeleteImage={handleDeleteImage}
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
