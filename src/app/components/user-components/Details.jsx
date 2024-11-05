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

export default function Details({ page, ...props }) {
  const { t } = useTranslation();
  const [image, setImage] = useState("/");

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
    page === "add"
      ? setImage("/assets/images/default-user.jpg")
      : setImage("/assets/home-images/form-image.png");
  }, [page]);
  const handleDeleteImage = () => {
    setImage("/assets/images/default-user.jpg");
  };

  return (
    <Card className="menu-drawer w-full min-h-screen h-max bg-[#FFF] dark:bg-[#222831] shadow-box_shadow py-8 max-md:pt-4">
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
              <Button
                variant="outline"
                className="bg-[#c8fad6] hover:bg-[#a7f8c1] text-[#0fa439] hover:text-[#08521d] dark:bg-[#5be49b] dark:hover:bg-[#ddfce6] dark:text-white dark:hover:text-[#08521d]"
              >
                {t("Update")}
              </Button>
              <DeleteButton
                title={t("Delete")}
                handleDelete={() => console.log("deletes")}
              />
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
                id="name"
                className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]"
                defaultValue="Pedro Duarte"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">{t("lead_number")}</Label>
              <Input
                id="username"
                className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]"
                defaultValue="@peduarte"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">{t("Number")}</Label>
              <Input
                id="number"
                className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]"
                defaultValue="1111"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="LastFollowUp">{t("Last_Follow_up")}</Label>
              <Input
                id="LastFollowUp"
                className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]"
                defaultValue="30-08-2022"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="descriptions">{t("descriptions")}</Label>
              <textarea
                id="descriptions"
                className="w-full h-[100px] bg-[#eaeaea] dark:bg-[#222831] py-2 px-3 focus:outline-none rounded-md resize-none border border-input focus:border-ring"
                defaultValue="..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clintFollowUp">{t("Client_follow_up")}</Label>
              <Input
                id="clientFollowUp"
                className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]"
                defaultValue="Ashor"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classType">{t("class")}</Label>
              <Input
                id="classType"
                className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]"
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
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </Card>
  );
}
