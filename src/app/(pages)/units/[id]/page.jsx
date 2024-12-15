"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useState, useEffect } from 'react';
import DetailsPageUnits from "@/app/components/units/DetailsPageUnits";
import { Box, Grid, Tab ,Tabs } from "@mui/material";
import { deletePropertyImage, deletePropertyVideo, getPropertyById, updatePropertyByID, uploadPropertyImages, uploadPropertyVideo } from "@/actions/propertiesAction";
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
  const [videos, setVideos] = useState([]);
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
      
      const images = typeof unitData.propertyImage === "string"
        ? JSON.parse(unitData.propertyImage || "[]")
        : unitData.propertyImage;
  
      const videos = typeof unitData.videos === "string"
        ? JSON.parse(unitData.videos || "[]")
        : unitData.videos;
  
      setUnit({ ...unitData, propertyImage: images, videos });
  
      console.log(unitData);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };
  
  const handleImageChange = async (event) => {
    const files = event.target.files;
  
    if (files.length > 0) {
      let updatedPropertyImage = [];

      try {
        if (typeof unit?.propertyImage === "string") {
          updatedPropertyImage = JSON.parse(unit.propertyImage);
        } else if (Array.isArray(unit?.propertyImage)) {
          updatedPropertyImage = [...unit.propertyImage];
        }
      } catch (error) {
        console.error("Error parsing propertyImage:", error);
        updatedPropertyImage = [];
      }
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
  
          updatedPropertyImage.push({
            id: response.id,
            fileUrl: response.fileUrl,
          });
  
          setUnit((prevUnit) => ({
            ...prevUnit,
            propertyImage: updatedPropertyImage,
          }));
  
          console.log("Image uploaded successfully:", response);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
  
      setImagesFile((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  
  const handleDeleteVideo = async (id) => {
    try {
      await deletePropertyVideo(id);
      setUnit((prevUnit) => ({
        ...prevUnit,
        videos: prevUnit.videos.filter((video) => video.id !== id),
      }));
      
      console.log("Video deleted successfully");
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleDeleteImage = async ( id) => {
    try {
      await deletePropertyImage(id);
      setUnit((prevUnit) => ({
        ...prevUnit,
        propertyImage: prevUnit.propertyImage.filter((image) => image.id !== id),
      }));
      
      console.log("image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  const handleVideoUpload = async (e) => {
    const files = e.target.files;
  
    if (files.length > 0) {
      let updatedVideos = [];
  
      try {
        if (typeof unit?.videos === "string") {
          updatedVideos = JSON.parse(unit.videos);
        } else if (Array.isArray(unit?.videos)) {
          updatedVideos = [...unit.videos];
        }
      } catch (error) {
        console.error("Error parsing videos:", error.message);
        updatedVideos = [];
      }
  
      const newFiles = [];
  
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setVideos((prevVideos) => [...prevVideos, e.target.result]);
        };
        reader.readAsDataURL(file);
  
        newFiles.push(file);
  
        try {
          const response = await uploadPropertyVideo(file);
  
          if (response && response.$id && response.fileUrl) {
            updatedVideos.push({
              id: response.$id,
              fileUrl: response.fileUrl,
            });
  
            setUnit((prevUnit) => ({
              ...prevUnit,
              videos: updatedVideos,
            }));
  
            console.log("Video uploaded successfully:", response);
          } else {
            console.error("Unexpected response format:", response);
          }
        } catch (error) {
          console.error("Error uploading video:", error.message || error);
        }
      }
  
      setImagesFile((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  
  
  useEffect(() => {
    if (params.id) fetchUnit(); 
  }, [params]);

  const handleSubmit = async () => {
    const currentDateTime = new Date().toLocaleString();
    const modifiedUnit = { ...unit };
    modifiedUnit.rooms = parseInt(modifiedUnit.rooms, 10)
    modifiedUnit.totalPrice = parseInt(modifiedUnit.totalPrice, 10)
    modifiedUnit.PricePerMeter = parseInt(modifiedUnit.PricePerMeter, 10)
    modifiedUnit.videos = JSON.stringify(modifiedUnit.videos)
    modifiedUnit.propertyImage = JSON.stringify(modifiedUnit.propertyImage)
    try {
      const response = await updatePropertyByID(params.id,modifiedUnit);
      console.log("Unit updated successfully:", response)
      toast({
        variant: "success",
        title: "Unit Updated",
        description: `Unit Updated successfully on ${currentDateTime}`,
        action: (
          <ToastAction
            altText="ok"
            
          >
            Show Details
          </ToastAction>
        ),
      });
      router.back();
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
      }

    );
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
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            videos={videos}
            handleVideoUpload={handleVideoUpload}
            handleDeleteVideo={handleDeleteVideo}
            unit={unit}
            title={t("Unit_Informations")}
            description="Add Unit"
            images={images}
            handleImageChange={handleImageChange}
            handleDeleteImage={handleDeleteImage}
          />
        )}
      </Grid>

    </Grid>
  </Box>
  );
}

export default Page;
