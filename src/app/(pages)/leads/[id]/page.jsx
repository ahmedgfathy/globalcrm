"use client";
import Details from "@/app/components/user-components/Details";
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { Tabs, Tab, Box, Grid, IconButton, Tooltip } from "@mui/material";
import { getLeadById, updateLeadByID, uploadImageToBucket } from "@/actions/leadsAction";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from 'next/navigation';
import { WhatsApp, Call, Email, PictureAsPdf } from '@mui/icons-material';
import html2pdf from 'html2pdf.js';

function Page({ params }) { 
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
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
            onClick={() => router.back()}
          >
            Show Details
          </ToastAction>
        ),
      });
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

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${lead.number}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${lead.number}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${lead.email}`;
  };

  const generatePDF = async () => {
    if (!lead || !lead.leadNumber) {
      toast({
        variant: "destructive",
        title: "Error generating PDF",
        description: "Lead data is not available.",
      });
      return;
    }
  
    const content = `
      <div style="padding: 15px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px; padding: 10px; background-color: #f0f9f0;">
          <img src="${lead.leadImage || '/assets/logo/logo.png'}" alt="Lead Image" style="max-width: 150px; margin-bottom: 10px;"/>
          <div style="border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-bottom: 15px;">
            <h2 style="color: #1a1a1a; margin: 5px 0; font-size: 18px;">Lead Information</h2>
            <p style="color: #333333; font-size: 12px; margin: 3px 0;">Generated on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
        
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: 1px solid #e0e0e0;">
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px;">
            <tr style="background-color: #4CAF50;">
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; width: 30%; color: #ffffff;"><strong>Lead Number</strong></td>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #ffffff; color: #333333;">${lead.leadNumber}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #4CAF50; color: #ffffff;"><strong>Client Name</strong></td>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #ffffff; color: #333333;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #4CAF50; color: #ffffff;"><strong>Contact Number</strong></td>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #ffffff; color: #333333;">${lead.number}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #4CAF50; color: #ffffff;"><strong>Email</strong></td>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #ffffff; color: #333333;">${lead.email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #4CAF50; color: #ffffff;"><strong>Lead Status</strong></td>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #ffffff; color: #333333;">${lead.leadStatus || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #4CAF50; color: #ffffff;"><strong>Customer Source</strong></td>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #ffffff; color: #333333;">${lead.customerSource || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #4CAF50; color: #ffffff;"><strong>Assigned To</strong></td>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #ffffff; color: #333333;">${lead.assignedTo || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #4CAF50; color: #ffffff;"><strong>Last Follow Up</strong></td>
              <td style="padding: 12px 15px; border: 1px solid #e2e8f0; background-color: #ffffff; color: #333333;">${lead.lastFollowUp || 'N/A'}</td>
            </tr>
          </table>
  
          <div style="margin-top: 15px; background-color: #f0f9f0; padding: 15px; border-radius: 4px;">
            <h4 style="color: #2d3748; margin-bottom: 10px; font-size: 14px; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;">Description</h4>
            <div style="padding: 10px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 12px; color: #333333;">
              ${lead.description || 'No description available'}
            </div>
          </div>
  
          <div style="margin-top: 15px; background-color: #f0f9f0; padding: 15px; border-radius: 4px;">
            <h4 style="color: #2d3748; margin-bottom: 10px; font-size: 14px; border-bottom: 2px solid #4CAF50; padding-bottom: 5px;">Client Follow Up Notes</h4>
            <div style="padding: 10px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 12px; color: #333333;">
              ${lead.clientFollowUp || 'No follow up notes available'}
            </div>
          </div>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #666666; font-size: 10px; background-color: #f0f9f0; padding: 10px; border-radius: 4px;">
          <p>This is an automatically generated report from Global CRM System</p>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    `;
  
    const opt = {
      margin: 10,
      filename: `Lead-${lead.leadNumber}-${lead.name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };
  
    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we generate your PDF...",
      });
  
      const element = document.createElement('div');
      element.innerHTML = content;
      
      await html2pdf().set(opt).from(element).save();
      
      toast({
        title: "PDF Generated",
        description: "Your PDF has been generated successfully.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        variant: "destructive",
        title: "Error generating PDF",
        description: "There was an issue generating the PDF. Please try again.",
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
              actionIcons={
                <div className="flex gap-2 mt-2">
                  <Tooltip title="WhatsApp">
                    <IconButton onClick={handleWhatsApp} color="primary">
                      <WhatsApp />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Call">
                    <IconButton onClick={handleCall} color="primary">
                      <Call />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Email">
                    <IconButton onClick={handleEmail} color="primary">
                      <Email />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Generate PDF">
                    <IconButton onClick={generatePDF} color="primary">
                      <PictureAsPdf />
                    </IconButton>
                  </Tooltip>
                </div>
              }
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
              actionIcons={
                <div className="flex gap-2 mt-2">
                  <Tooltip title="WhatsApp">
                    <IconButton onClick={handleWhatsApp} color="primary">
                      <WhatsApp />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Call">
                    <IconButton onClick={handleCall} color="primary">
                      <Call />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Email">
                    <IconButton onClick={handleEmail} color="primary">
                      <Email />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Generate PDF">
                    <IconButton onClick={generatePDF} color="primary">
                      <PictureAsPdf />
                    </IconButton>
                  </Tooltip>
                </div>
              }
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Page;
