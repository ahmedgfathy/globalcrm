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
    const defaultImage = page === "add" 
      ? "/assets/images/default-user.jpg" 
      : "/assets/home-images/form-image.png";
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

  return (
    <Card className="menu-drawer w-full min-h-screen h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-8 max-md:pt-4">
      <CardHeader
        title={props.title}
        description={props.description}
        page={page}
        setIsDisabled={setIsDisabled}
        t={t}
      />

      <CardContent className="lg:grid gap-6 lg:grid-cols-4 md:gap-8 max-sm:flex max-sm:flex-col-reverse">
        <FormFields isDisabled={isDisabled} t={t} />
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



