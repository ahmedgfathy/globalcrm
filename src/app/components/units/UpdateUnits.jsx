"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import DeleteButton from "../delete-button/DeleteButton";
import SheetCalls from "./SheetsCalls";


export default function Create({ page, ...props }) {
  const { t } = useTranslation();
  const [image, setImage] = useState("/");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (page === "add") {
      // setImage("/assets/images/default-user.jpg");
      setIsDisabled(false);
    }
    setImage("/assets/home-images/form-image.png");
  }, [page]);
  const handleDeleteImage = () => {
    // setImage("/assets/images/default-user.jpg");
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const selectedOptions = [
    { value: "For Rent", label: "For Rent" },
    { value: "Naw Ranted", label: "Naw Ranted" },
    { value: "Hold Naw", label: "Hold Naw" },
    { value: "For Sale", label: "For Sale" },
    { value: "Sold Out", label: "Sold Out" },
    { value: "Recycle", label: "Recycle" },
  ];
  const status = [
    { value: "REIDENTIAL", label: "REIDENTIAL" },
    { value: "REIDENTIAL OFFICE", label: "REIDENTIAL OFFICE" },
    { value: "ADMIN", label: "ADMIN" },
    { value: "COMMERCIAL", label: "COMMERCIAL" },
    { value: "CLINICS", label: "CLINICS" },
  ];

  const compound = [
    { value: "Inside", label: "Inside" },
    { value: "Outside", label: "Outside" },
    { value: "Commercial Areas", label: "Commercial Areas" },

  ];


  return (
    <Card className="menu-drawer w-full min-h-screen h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-8 max-md:pt-4">
      <div className="header w-full flex justify-between items-center max-[450px]:flex-wrap gap-y-3 pb-2 px-6">
        <div>
          <p className="text-2xl font-bold mb-2">{props.title}</p>
          <CardDescription className="">{props.description}</CardDescription>
        </div>
        <div className="w-max flex justify-between items-center gap-2 buttons">
          {page === "add" ? (
            <Button> {t("add_unit")} </Button>
          ) : (
            <>
              <Button className="GreenButton dark" onClick={() => setIsDisabled(false)}>{t("Update")}</Button>
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
      <CardContent className="lg:grid gap-6 lg:grid-cols-4 md:gap-8 max-sm:flex max-sm:flex-col-reverse">
        <div className="space-y-4 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="mb-2">Last Follow in  </Label>
              <Input
                disabled={isDisabled}
                id="name"
                type="datetime-local"
                className="dark:bg-cardbgDark border-[1px]  border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="Pedro Duarte"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="mb-2">Property Number  </Label>
              <Input
                disabled={isDisabled}
                id="number"
                className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="@peduarte"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">{t("Number")}</Label>
              <Input
                disabled={isDisabled}
                id="number"
                className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="1111"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="LastFollowUp" className="mb-2">Mobile No.  </Label>
              <Input
                disabled={isDisabled}
                id="LastFollowUp"
                className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="30-08-2022"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="descriptions" className="mb-2">{t("descriptions")}</Label>
              <textarea
                disabled={isDisabled}
                id="descriptions"
                className="w-full h-[100px] py-2 px-3 resize-none dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="mb-2">Total Price</Label>
              <Input
                disabled={isDisabled}
                id="price"
                className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="0"
              />
            </div>

            <div className="space-y-2 w-full" >
              <Label htmlFor="price" className="mb-2">Select Option</Label>

              <select name="" id="" className=" shadow w-full rounded" >

                {
                  selectedOptions.map((item, index) => {
                    return (
                      <option value="" key={index}

                        className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"

                      >{item.label}</option>

                    )
                  })
                }
              </select>
            </div>

            <div className="w-full">
              <Label htmlFor="price" className="mb-4">Select Option</Label>

              <select name="" id="" className="shadow w-full rounded">

                {
                  status.map((item, index) => {
                    return (
                      <option value="" key={index}>{item.label}</option>

                    )
                  })
                }
              </select>
            </div>
            <div className="w-full">
              <Label htmlFor="price" className="mb-4">Select Option</Label>

              <select name="" id="" className="shadow w-full rounded">

                {
                  compound.map((item, index) => {
                    return (
                      <option value="" key={index}>{item.label}</option>

                    )
                  })
                }
              </select>
            </div>

          </div>
        </div>
        <Card className="overflow-hidden lg:col-span-1 h-48 lg:h-40">
          <CardContent className="p-0">
            <div className="relative w-full h-48 lg:h-40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55263.40908981412!2d31.415424782395363!3d30.03791738098742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583c1380cba7ef%3A0xd541260e9e06978d!2z2YXYr9mK2YbYqSDZhti12LHYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e0!3m2!1sar!2seg!4v1730961271161!5m2!1sar!2seg"
                width={600}
                height={450}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="flex space-x-2 gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() =>
                      document.getElementById("imageInput")?.click()
                    }
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit image</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={handleDeleteImage}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete image</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </CardContent>
      <input
        disabled={isDisabled}
        id="imageInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </Card>
  );
}
