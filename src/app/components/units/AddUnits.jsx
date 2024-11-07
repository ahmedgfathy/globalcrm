"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { Pencil, Trash2 } from "lucide-react";
import DeleteButton from "../delete-button/DeleteButton";

export default function AddUnits({ page, ...props }) {
  const { t } = useTranslation();
  const [image, setImage] = useState("/assets/home-images/form-image.png");
  const [isDisabled, setIsDisabled] = useState(page !== "add");
  const [haveVal, setHaveVal] = useState(page !== "add");

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => setImage("/assets/images/default-user.jpg");

  const selectedOptions = [
    { value: "For Rent", label: "For Rent" },
    { value: "Now Rented", label: "Now Rented" },
    { value: "On Hold", label: "On Hold" },
    { value: "For Sale", label: "For Sale" },
    { value: "Sold Out", label: "Sold Out" },
    { value: "Recycle", label: "Recycle" },
  ];
  const status = [
    { value: "RESIDENTIAL", label: "Residential" },
    { value: "RESIDENTIAL OFFICE", label: "Residential Office" },
    { value: "ADMIN", label: "Admin" },
    { value: "COMMERCIAL", label: "Commercial" },
    { value: "CLINICS", label: "Clinics" },
  ];
  const compound = [
    { value: "Inside", label: "Inside" },
    { value: "Outside", label: "Outside" },
    { value: "Commercial Areas", label: "Commercial Areas" },
  ];

  return (
    <Card className="menu-drawer w-full min-h-screen bg-Lightbg dark:bg-cardbgDark shadow-box_shadow py-8">
      <div className="header w-full flex justify-between items-center gap-2 pb-2 px-6">
        <div>
          <p className="text-2xl font-bold mb-2">{props.title}</p>
          <CardDescription>{props.description}</CardDescription>
        </div>
        <div className="flex gap-2">
          {page === "add" ? (
            <Button>{t("add_unit")}</Button>
          ) : (
            <>
              <Button className="GreenButton dark" onClick={() => setIsDisabled(false)}>
                {t("Update")}
              </Button>
              <DeleteButton
                handleDelete={() => console.log("deletes")}
                className="DeleteButton dark"
              >
                {t("Delete")}
              </DeleteButton>
            </>
          )}
        </div>
      </div>
      <CardContent className="lg:grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InputWithLabel
              id="name"
              label="Last Follow in"
              type="datetime-local"
              isDisabled={isDisabled}
              defaultValue={haveVal ? "Pedro Duarte" : ""}
            />
            <InputWithLabel
              id="username"
              label="Property Number"
              isDisabled={isDisabled}
              placeholder={haveVal ? "@peduarte" : ""}
            />
            <InputWithLabel
              id="number"
              label={t("Number")}
              isDisabled={isDisabled}
              defaultValue={haveVal ? "1111" : ""}
            />
            <InputWithLabel
              id="LastFollowUp"
              label="Mobile No."
              isDisabled={isDisabled}
              defaultValue={haveVal ? "30-08-2022" : ""}
            />
            <TextAreaWithLabel
              id="descriptions"
              label={t("descriptions")}
              isDisabled={isDisabled}
              defaultValue="..."
            />
            <InputWithLabel
              id="price"
              label="Total Price"
              isDisabled={isDisabled}
              defaultValue={haveVal ? "0" : ""}
            />
            <SelectWithLabel
              id="options"
              label="Select Option"
              options={selectedOptions}
            />
            <SelectWithLabel
              id="status"
              label="Status"
              options={status}
            />
            <SelectWithLabel
              id="compound"
              label="Compound"
              options={compound}
            />
          </div>
        </div>
        <ImageSection
          image={image}
          onImageChange={handleImageChange}
          onDeleteImage={handleDeleteImage}
        />
      </CardContent>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        className="hidden"
        disabled={isDisabled}
        onChange={handleImageChange}
      />
    </Card>
  );
}

function InputWithLabel({ id, label, type = "text", isDisabled, defaultValue, placeholder }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        disabled={isDisabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="shadow w-full h-[40px] px-3  dark:bg-cardbgDark border-[1px] rounded-md text-sm"
      />
    </div>
  );
}

function TextAreaWithLabel({ id, label, isDisabled, defaultValue }) {
  return (
    <div className="space-y-2 sm:col-span-2">
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        disabled={isDisabled}
        defaultValue={defaultValue}
        className="w-full h-[100px] py-2 px-3 resize-none dark:bg-cardbgDark border-[1px] rounded-md"
      />
    </div>
  );
}

function SelectWithLabel({ id, label, options }) {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        className="shadow w-full h-[40px] px-3  dark:bg-cardbgDark border-[1px] rounded-md text-sm"
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}


function ImageSection({ image, onImageChange, onDeleteImage }) {
  return (
    <Card className="overflow-hidden lg:col-span-1 h-48">
      <CardContent className="p-0">
        <div className="relative w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55263.40908981412!2d31.415424782395363!3d30.03791738098742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583c1380cba7ef%3A0xd541260e9e06978d!2z2YXYr9mK2YbYqSDZhti12LHYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e0!3m2!1sar!2seg!4v1730961271161!5m2!1sar!2seg"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex space-x-2 gap-2">
              <Button size="icon" variant="secondary" onClick={() => document.getElementById("imageInput")?.click()}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="destructive" onClick={onDeleteImage}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
