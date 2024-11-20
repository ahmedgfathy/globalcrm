"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useState } from 'react';
import { Box, Grid, Tab, Tabs } from "@mui/material";
import DetailsPageUnits from "@/app/components/units/DetailsPageUnits";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addProperty, uploadPropertyImages } from "@/actions/propertiesAction";

function Page() {
  const { locale, t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const { toast } = useToast();
  const [images, setImages] = useState([]);
  const [imagesFile, setImagesFile] = useState({});

  const [unit, setUnit] = useState({
    building: "",
    unitFor: "",
    propertyNumber: "",
    theFloors: "",
    area: "",
    finished: "",
    rooms: 0,
    unitFeatures: "",
    phase: "",
    note: "",
    totalPrice: 0,
    inOrOutSideCompound: "",
    description: "",
    lastFollowIn: "",
    status: "",
    activity: "",
    propertyOfferedBy: "",
    mobileNo: 0,
    name: "",
    tel: 0,
    unitNo: "",
    callUpdate: "",
    forUpdate: "",
    handler: "",
    sales: "",
    category: "",
    // modifiedTime: 0,
    landArea: "",
    currency: "",
    rentFrom: "",
    rentTo: "",
    compoundName: "",
    propertyImage: [],
    links: [],
    UnitImages: []
  });

  const handleChange = (_, field, value) => {
    setUnit((prevLead) => ({
      ...prevLead,
      [field]: field === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const uploadedFiles = Array.from(files);

      try {
        const uploadedImages = await uploadPropertyImages(uploadedFiles);
        const imageUrls = uploadedImages.map((file) => file.fileUrl);

        setUnit((prevUnit) => ({
          ...prevUnit,
          UnitImages: imageUrls,
        }));

        const imagePreviews = uploadedFiles.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...imagePreviews]);

        setImagesFile((prevImagesFile) => [...prevImagesFile, ...uploadedFiles]);

        console.log("Images uploaded successfully:", uploadedImages);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({
          variant: "destructive",
          title: "Error Uploading Image",
          description: "There was an error uploading the images.",
        });
      }
    }
  };


  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagesFile((prevImageFiles) => prevImageFiles.filter((_, i) => i !== index));
  };


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
  const handleSubmit = async () => {
    const currentDateTime = new Date().toLocaleString();
    const modifiedUnit = { ...unit };
    modifiedUnit.rooms = parseInt(modifiedUnit.rooms, 10)
    modifiedUnit.totalPrice = parseInt(modifiedUnit.totalPrice, 10)
    modifiedUnit.mobileNo = parseInt(modifiedUnit.mobileNo, 10)
    modifiedUnit.tel = parseInt(modifiedUnit.tel, 10)
    modifiedUnit.links = Array.isArray(unit.links) ? unit.links.filter(isValidUrl) : [];
    try {
      const response = await addProperty(modifiedUnit);
      console.log("Unit created successfully:", response);
      console.log(response.$id);
      setUnit({
        building: "",
        unitFor: "",
        propertyNumber: "",
        theFloors: "",
        area: "",
        finished: "",
        rooms: 0,
        unitFeatures: "",
        phase: "",
        note: "",
        totalPrice: 0,
        inOrOutSideCompound: "",
        description: "",
        lastFollowIn: "",
        status: "",
        activity: "",
        propertyOfferedBy: "",
        mobileNo: 0,
        name: "",
        tel: 0,
        unitNo: "",
        callUpdate: "",
        forUpdate: "",
        handler: "",
        sales: "",
        category: "",
        // modifiedTime: 0,
        landArea: "",
        currency: "",
        rentFrom: "",
        rentTo: "",
        compoundName: "",
        propertyImage: [],
        links: []
      });

      toast({
        title: "Unit Created",
        description: `Unit created successfully on ${currentDateTime}`,
        action: (
          <ToastAction
            altText="ok"
            onClick={() => router.push(`/units/${response.$id}`)}
          >
            Show Details
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error creating unit:", error);

      toast({
        variant: "destructive",
        title: "Error Creating Unit",
        description: error.message || "There was an issue creating the unit.",
        status: "error",
        action: (
          <ToastAction altText="ok" onClick={() => router.push(`/units`)}>
            Try Again
          </ToastAction>
        ),
      });
    }
  };
  ;

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
              unit={unit}
              page="add"
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
