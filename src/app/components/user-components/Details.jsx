import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import SheetCalls from "./ SheetsCalls";
import { useTranslation } from "@/app/context/TranslationContext";

function Details() {
  const { t } = useTranslation();

  return (
    <Card className="menu-drawer w-full min-h-screen h-max bg-[#FFF] dark:bg-[#222831] shadow-box_shadow py-8 max-md:pt-4">
      <div className="header w-full flex justify-between max-[450px]:justify-center items-center max-[450px]:flex-wrap gap-y-3 pb-2">
        <div>
          <p className="text-2xl font-bold">{t("Lead_Details")}</p>
          <CardDescription className="">
            {t("Lead_descriptions")}
          </CardDescription>
        </div>
        <div className="w-max flex justify-between items-center gap-2 buttons">
          <button className="text-sm max-[450px]:text-xs mx-auto px-4 py-2 max-[450px]:p-2 font-bold rounded-xl  duration-200 text-[#0fa439] hover:text-[#08521d] bg-[#c8fad6] dark:text-white dark:hover:text-[#08521d] dark:bg-[#5be49b] dark:hover:bg-[#ddfce6] capitalize">
            {t("Update")}
          </button>
          <button className="text-sm max-[450px]:text-xs mx-auto px-4 py-2 max-[450px]:p-2 font-bold rounded-xl duration-200 text-white bg-[#e63946] hover:bg-[#c53030] dark:bg-[#ff6b6b] dark:hover:bg-[#c53030] capitalize">
            {t("Delete")}
          </button>
        </div>
      </div>
      <CardContent className="grid gap-2 md:grid-cols-2 md:gap-4">
        <div className="space-y-1 w-full">
          <Label htmlFor="name" className="capitalize">         {t("name_client")}
          </Label>
          <Input id="name" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="Pedro Duarte" />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="username" className="capitalize"> {t("lead_number")}</Label>
          <Input id="username" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="@peduarte" />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="number" className="capitalize">{t("Number")}</Label>
          <Input id="number" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="1111" />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="LastFollowUp" className="capitalize">{t("Last_Follow_up")}</Label>
          <Input id="LastFollowUp" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="30-08-2022" />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="descriptions" className="capitalize">{t("descriptions")}</Label>
          <textarea
            id="descriptions"
            className="w-full h-[150px] bg-[#eaeaea] dark:bg-[#222831] py-1 px-2 focus:outline-none rounded-md resize-none border-[1px] dark:border-[#263138] focus:border-black dark:focus:border-white"
            defaultValue="..."
          />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="clintFollowUp" className="capitalize">{t("Client_follow_up")}</Label>
          <Input id="clientFollowUp" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="Ashor" />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="classType" className="capitalize">{t("class")}</Label>
          <Input id="classType" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="A" />
        </div>
      </CardContent>
      {/* <SheetCalls /> */}
    </Card>
  );
}

export default Details;
