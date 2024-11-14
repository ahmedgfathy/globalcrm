"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import CardHeader from "./utils/CardHeader";
import FormFields from "./utils/FormFields";
import ImageSection from "./utils/ImageSection";



export default function LoadDetails({ page, setIsDisabled, isDisabled, ...props }) {
  const { t } = useTranslation();
  const [image, setImage] = useState("/");

  useEffect(() => {
    const defaultImage = "/assets/images/default-user.jpg"
    setImage(defaultImage);
    setIsDisabled(page === "add" ? false : isDisabled);
  }, [page, setIsDisabled, isDisabled]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => setImage("/assets/images/default-user.jpg");

  const fieldsData = [
    { id: 1, type: 'input', label: 'name_client', idField: 'name', defaultValue: props.lead?.name },
    { id: 2, type: 'input', label: 'lead_number', idField: 'leadNumber', defaultValue: props.lead?.leadNumber },
    { id: 3, type: 'input', label: 'Number', idField: 'number', defaultValue: props.lead?.number },
    { id: 5, type: 'textarea', label: 'descriptions', idField: 'description', defaultValue: props.lead?.description},
    { id: 4, type: 'date', label: 'Last_Follow_up', idField: 'lastFollowUp', defaultValue: props.lead?.lastFollowUp },
    {
      id: 6,
      type: 'select',
      label: 'Client_follow_up',
      idField: 'clientFollowUp',
      defaultValue: props.lead?.clientFollowUp,
      options: [
        { value: 'ahmed', label: 'Ahmed' },
        { value: 'mohamed', label: 'Mohamed' },
        { value: 'ali', label: 'Ali' },
      ],
    },
    {
      id: 7,
      type: 'select',
      label: 'class',
      idField: 'class',
      defaultValue: props.lead?.class,
      options: [
        { value: 'A', label: 'Class A' },
        { value: 'B', label: 'Class B' },
        { value: 'C', label: 'Class C' },
      ],
    },
  ];

  return (
    <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-4 overflow-x-hidden">
      <CardHeader
        handleSubmit={props.handleSubmit}
        title={props.title}
        description={props.description}
        page={page}
        setIsDisabled={setIsDisabled}
        isDisabled={isDisabled}
        t={t}
      />

      <CardContent className="lg:grid gap-6 lg:grid-cols-4 md:gap-8 max-sm:flex max-sm:flex-col-reverse pt-4 gap-y-4" dir="rtl">
        <FormFields fields={fieldsData} isDisabled={isDisabled} handleChange={props.handleChange} className="mb-4" />
        <ImageSection
          image={image}
          handleImageChange={handleImageChange}
          handleDeleteImage={handleDeleteImage}
          isDisabled={isDisabled}
        />
      </CardContent>
    </Card>
  );
}



