"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";



export default function PropertyInformations({ page, setIsDisabled, isDisabled, ...props }) {
  const { t } = useTranslation();
  const [image, setImage] = useState("/");

//   useEffect(() => {
//     const defaultImage = page === "add" 
//       ? "/assets/images/default-user.jpg" 
//       : "/assets/home-images/form-image.png";
//     setImage(defaultImage);
//     setIsDisabled(page === "add" ? false : isDisabled);
//   }, [page, setIsDisabled, isDisabled]);

//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => setImage(e.target.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDeleteImage = () => setImage("/assets/images/default-user.jpg");

  const fieldsData = [
    { id: 1, type: 'input', label: 'Property Number', idField: 'property_number',  defaultValue: page !== "add" ? "PRO3722" : ""},
    { id: 2, type: 'input', label: 'Building', idField: 'building', defaultValue: page !== "add" ? '200' : "" },
    { id: 3, type: 'input', label: 'Unit For', idField: 'unit_for', defaultValue: page !== "add" ? 'For Rent': "" },
    { id: 4, type: 'select', label: 'Area', idField: 'area', defaultValue: page !== "add" ? 'NARGS VILLAS': "", options: [
        { value: 'NARGS EXTINCTON', label: 'NARGS EXTINCTON' },
        { value: 'EL A7YAA', label: 'EL A7YAA' },
        { value: 'NARGS VILLAS', label: 'NARGS VILLAS' },
        { value: 'الياسمين فيلات', label: 'الياسمين فيلات' },
    ] },
    { id: 5, type: 'select', label: 'Finished', idField: 'Finished', defaultValue: page !== "add" ? 'FULLY FINISHED': "", options: [
        { value: 'FULLY FINISHED', label: 'FULLY FINISHED' },
        { value: 'EL A7YAA', label: 'EL A7YAA' },
        { value: 'NARGS VILLAS', label: 'NARGS VILLAS' },
        { value: 'الياسمين فيلات', label: 'الياسمين فيلات' },
    ] },
    { id: 6, type: 'input', label: 'ROOMS', idField: 'ROOMS', defaultValue: page !== "add" ? '3': "" },
    { id: 7, type: 'input', label: 'ممبزات الوحده	', idField: 'ممبزات الوحده', defaultValue: page !== "add" ? '': "" },
    {
      id: 8,
      type: 'select',
      label: 'Phase',
      idField: 'Phase',
      defaultValue: page !== "add" ? 'mohamed' : "",
      options: [
        { value: 'ahmed', label: 'Ahmed' },
        { value: 'mohamed', label: 'Mohamed' },
        { value: 'ali', label: 'Ali' },
    ],
},
{ id: 9, type: 'textarea', label: 'NOTE', idField: 'NOTE', defaultValue: page !== "add" ? '...' : "" },
{ id: 10, type: 'input', label: 'Total Price', idField: 'Total Price', defaultValue: page !== "add" ? '3000': "" },
    { id: 4, type: 'date', label: 'Last_Follow_up', idField: 'LastFollowUp', defaultValue: page !== "add" ? '2022-08-30' : "" },
    { id: 5, type: 'textarea', label: 'descriptions', idField: 'descriptions', defaultValue: page !== "add" ? '...' : "" },
    {
      id: 6,
      type: 'select',
      label: 'Client_follow_up',
      idField: 'clintFollowUp',
      defaultValue: page !== "add" ? 'mohamed' : "",
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
      idField: 'classType',
      defaultValue: page !== "add" ? 'B' : "",
      options: [
        { value: 'A', label: 'Class A' },
        { value: 'B', label: 'Class B' },
        { value: 'C', label: 'Class C' },
      ],
    },
  ];
  
  return (
    <Card className="menu-drawer w-full min-h-screen h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-8 max-md:pt-4">
      {/* <CardHeader
        title={props.title}
        description={props.description}
        page={page}
        setIsDisabled={setIsDisabled}
        t={t}
      /> */}

      <CardContent className="lg:grid gap-6 lg:grid-cols-4 md:gap-8 max-sm:flex max-sm:flex-col-reverse" dir="rtl">
        <FormFields fields={fieldsData} isDisabled={isDisabled}  />
        {/* <ImageSection
          image={image}
          handleImageChange={handleImageChange}
          handleDeleteImage={handleDeleteImage}
          isDisabled={isDisabled}
        /> */}
      </CardContent>
    </Card>
  );
}



