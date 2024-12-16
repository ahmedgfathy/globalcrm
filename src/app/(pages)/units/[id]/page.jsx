"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useState, useEffect } from 'react';
import DetailsPageUnits from "@/app/components/units/DetailsPageUnits";
import { Box, Grid, Tab ,Tabs } from "@mui/material";
import { deletePropertyImage, deletePropertyVideo, getPropertyById, updatePropertyByID, uploadPropertyImages, uploadPropertyVideo } from "@/actions/propertiesAction";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2pdf from 'html2pdf.js';

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

  const handleWhatsApp = () => {
    // Check both mobile and tel fields
    const phoneNumber = unit.mobile || unit.tel || unit.phoneNumber;
    
    if (phoneNumber) {
      const formattedNumber = phoneNumber.toString().replace(/\D/g, ''); // Remove non-digits
      // Add country code if not present
      const numberWithCountryCode = formattedNumber.startsWith('2') ? formattedNumber : `2${formattedNumber}`;
      window.open(`https://wa.me/${numberWithCountryCode}`, '_blank');
    } else {
      toast({
        variant: "warning",
        title: "No Contact Number",
        description: "No mobile or telephone number available for this unit",
      });
    }
  };

  const handleCall = () => {
    if (unit.phoneNumber) {
      window.location.href = `tel:${unit.phoneNumber}`;
    } else {
      toast({
        variant: "warning",
        title: "No Phone Number",
        description: "No phone number available for this unit",
      });
    }
  };

  const handleEmail = () => {
    if (unit.email) {
      window.location.href = `mailto:${unit.email}`;
    } else {
      toast({
        variant: "warning",
        title: "No Email",
        description: "No email address available for this unit",
      });
    }
  };

  const handlePDF = () => {
    try {
      const mainContent = document.createElement('div');
      const imagesContent = document.createElement('div');
      const logo = '/assets/logo/logo.png';
      
      mainContent.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${logo}" alt="Company Logo" style="width: 300px; margin-bottom: 20px;" />
            <h2 style="color: #333; margin: 0;">Unit Details Report</h2>
            <p style="color: #666; margin: 5px 0;">Generated on: ${new Date().toLocaleString()}</p>
          </div>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2196F3; margin-top: 0;">Property Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; width: 40%;"><strong>Property Name:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.compoundName || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Property Number:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.propertyNumber || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Unit Number:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.unitNo || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Unit For:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.unitFor || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Activity:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.activity || 'N/A'}</td>
              </tr>
            </table>
          </div>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2196F3; margin-top: 0;">Unit Specifications</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; width: 40%;"><strong>Area:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.area || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Rooms:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.rooms || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Type:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.type || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Building:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.building || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Floor:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.theFloors || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Finished:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.finished || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Features:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.unitFeatures || 'N/A'}</td>
              </tr>
            </table>
          </div>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2196F3; margin-top: 0;">Pricing Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; width: 40%;"><strong>Total Price:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.totalPrice ? `${unit.totalPrice} ${unit.currency || ''}` : 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Price Per Meter:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${unit.PricePerMeter || 'N/A'}</td>
              </tr>
            </table>
          </div>

          ${unit.description ? `
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #2196F3; margin-top: 0;">Description</h3>
              <p style="margin: 0; line-height: 1.6;">${unit.description}</p>
            </div>
          ` : ''}
        </div>
      `;

      // Create separate page for images if they exist
      if (unit.propertyImage && unit.propertyImage.length > 0) {
        imagesContent.innerHTML = `
          <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h2 style="color: #2196F3; margin-bottom: 20px; text-align: center;">Unit Images</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; justify-items: center;">
              ${unit.propertyImage.map(img => `
                <div style="text-align: center;">
                  <img src="${img.fileUrl}" alt="Unit Image" style="width: 100%; max-width: 400px; height: auto; border-radius: 8px; margin-bottom: 10px;" />
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      const opt = {
        margin: [10, 10],
        filename: `unit-${unit.propertyNumber || 'details'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait'
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // Combine content with page break
      const fullContent = document.createElement('div');
      fullContent.appendChild(mainContent);
      if (unit.propertyImage && unit.propertyImage.length > 0) {
        const pageBreak = document.createElement('div');
        pageBreak.style.pageBreakBefore = 'always';
        fullContent.appendChild(pageBreak);
        fullContent.appendChild(imagesContent);
      }

      html2pdf().set(opt).from(fullContent).save().then(() => {
        toast({
          variant: "success",
          title: "PDF Generated",
          description: "Unit details have been exported to PDF",
        });
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        variant: "destructive",
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF",
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
            handleWhatsApp={handleWhatsApp}
            handleCall={handleCall}
            handleEmail={handleEmail}
            handlePDF={handlePDF}
          />
        )}
      </Grid>

    </Grid>
  </Box>
  );
}

export default Page;
