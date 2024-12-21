"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import CardHeader from "./utils/CardHeader";
import FormFields from "./utils/FormFields";
import ImageSection from "./utils/ImageSection";
import { uploadImageToBucket } from "@/actions/leadsAction";



export default function LeadDetails({ page, setIsDisabled, isDisabled, refreshKey, actionIcons, ...props }) {
  const [defaultImage, setDefaultImage] = useState("/assets/images/default-user.jpg");
  const { t } = useTranslation();

  useEffect(() => {
    // const defaultImage = props.lead?.leadImage || "/assets/images/default-user.jpg";
    setDefaultImage(props.lead?.leadImage || "/assets/images/default-user.jpg")
    props?.setImage(defaultImage);
    console.log(defaultImage)
    setIsDisabled(page === "add" ? false : isDisabled);
  }, [page, setIsDisabled, isDisabled, props, defaultImage, refreshKey]);



  const fieldsData = [
    { id: 1, type: 'input', label: 'name_client', idField: 'name', defaultValue: props.lead?.name||"" },
    { id: 2, type: 'input', label: 'lead_number', idField: 'leadNumber', defaultValue: props.lead?.leadNumber||"" },
    { id: 3, type: 'input', label: 'Number', idField: 'number', defaultValue: props.lead?.number|| "" },
    { id: 5, type: 'textarea', label: 'descriptions', idField: 'description', defaultValue: props.lead?.description || ""},
    { id: 4, type: 'date', label: 'Last_Follow_up', idField: 'lastFollowUp', defaultValue: props.lead?.lastFollowUp || ""},
    {
      id: 6,
      type: 'select',
      label: 'Client_follow_up',
      idField: 'clientFollowUp',
      defaultValue: props.lead?.clientFollowUp || "",
      options: props?.options?.clientFollowUp,
    },
    {
      id: 7,
      type: 'select',
      label: 'class',
      idField: 'class',
      defaultValue: props.lead?.class || "",
      options: props?.options?.class,
    },
  ];

  return (
    <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-4 overflow-x-hidden">
      <CardHeader
        handleSubmit={props.handleSubmit}
        title={props.title}
        lead={props.lead}
        description={props.description}
        page={page}
        setIsDisabled={setIsDisabled}
        isDisabled={isDisabled}
        t={t}
      />

<CardContent className="lg:grid gap-6 lg:grid-cols-4 md:gap-8 max-sm:flex max-sm:flex-col-reverse pt-4 gap-y-4" dir="rtl">
<div className="lg:col-span-3 mb-4">

  <FormFields
    fields={fieldsData}
    isDisabled={isDisabled}
    handleChange={props.handleChange}
    />
    </div>
  <div className="lg:col-span-1">
  <ImageSection
    image={props.image}
    handleImageChange={props.handleImageChange}
    handleDeleteImage={props.handleDeleteImage}
    isDisabled={isDisabled}
  />
  <div className="mt-2 flex justify-center">
    {actionIcons}
  </div>
  </div>
</CardContent>

    </Card>
  );
}



