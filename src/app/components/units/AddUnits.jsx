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

export default function AddUnits({ page, ...props }) {
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
      setImage("/assets/images/default-user.jpg");
      setIsDisabled(false);
    }
    setImage("/assets/home-images/form-image.png");
  }, [page]);
  const handleDeleteImage = () => {
    setImage("/assets/images/default-user.jpg");
  };

  return (
    <Card className="menu-drawer w-full min-h-screen h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-8 max-md:pt-4">
      <div className="header w-full flex justify-between items-center max-[450px]:flex-wrap gap-y-3 pb-2 px-6">
        <div>
          <p className="text-2xl font-bold">{props.title}</p>
          <CardDescription className="">{props.description}</CardDescription>
        </div>
        <div className="w-max flex justify-between items-center gap-2 buttons">
          {page === "add" ? (
            <Button> {t("add_lead")} </Button>
          ) : (
            <>
              <Button className="GreenButton dark" onClick={()=>setIsDisabled(false)}>{t("Update")}</Button>
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
              <Label htmlFor="name">{t("name_client")}</Label>
              <Input
                disabled={isDisabled}
                id="name"
                className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="Pedro Duarte"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">{t("lead_number")}</Label>
              <Input
                disabled={isDisabled}
                id="username"
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
              <Label htmlFor="LastFollowUp">{t("Last_Follow_up")}</Label>
              <Input
                disabled={isDisabled}
                id="LastFollowUp"
                className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="30-08-2022"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="descriptions">{t("descriptions")}</Label>
              <textarea
              disabled={isDisabled}
                id="descriptions"
                className="w-full h-[100px] py-2 px-3 resize-none dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clintFollowUp">{t("Client_follow_up")}</Label>
              <Input
                disabled={isDisabled}
                id="clientFollowUp"
                className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="Ashor"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classType">{t("class")}</Label>
              <Input
                disabled={isDisabled}
                id="classType"
                className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md"
                defaultValue="A"
              />
            </div>
          </div>
        </div>
        <Card className="overflow-hidden lg:col-span-1 h-48 lg:h-40">
          <CardContent className="p-0">
            <div className="relative w-full h-48 lg:h-40">
              <Image
                alt="Lead image"
                fill={true}
                className="object-cover w-full h-full"
                src={image}
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
      <SheetCalls />
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