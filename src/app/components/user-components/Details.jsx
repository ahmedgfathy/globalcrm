import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function Details() {
  return (
    <Card className="menu-drawer w-full min-h-screen h-max bg-[#FFF] dark:bg-[#222831] shadow-box_shadow py-20">
      <CardHeader>
        <div className="header flex justify-between items-center">
          <p className="text-2xl font-bold">Lead Details</p>
          <div className="w-max flex justify-between items-center gap-2 buttons">
            <button className="text-sm max-[450px]:text-xs mx-auto px-4 py-2 max-[450px]:p-2 font-bold rounded-xl  duration-200 text-[#0fa439] hover:text-[#08521d] bg-[#c8fad6] dark:text-white dark:hover:text-[#08521d] dark:bg-[#5be49b] dark:hover:bg-[#ddfce6] capitalize">
              Update
            </button>
            <button className="text-sm max-[450px]:text-xs mx-auto px-4 py-2 max-[450px]:p-2 font-bold rounded-xl duration-200 text-white bg-[#e63946] hover:bg-[#c53030] dark:bg-[#ff6b6b] dark:hover:bg-[#c53030] capitalize">
              Delete
            </button>
          </div>
        </div>
        <CardDescription className="">
          Make changes to your account here.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 md:grid-cols-2 md:gap-4">
        <div className="space-y-1 w-full">
          <Label htmlFor="name" className="capitalize">Name</Label>
          <Input id="name" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="Pedro Duarte" />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="username" className="capitalize">Lead Number</Label>
          <Input id="username" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="@peduarte" />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="number" className="capitalize">Number</Label>
          <Input id="number" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="1111" />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="LastFollowUp" className="capitalize">Last Follow up</Label>
          <Input id="LastFollowUp" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="30-08-2022" />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="descriptions" className="capitalize">Descriptions</Label>
          <textarea
            id="descriptions"
            className="w-full h-[250px] bg-[#eaeaea] dark:bg-[#222831] p-2 rounded-md resize-none dark:border-[#263138]"
            defaultValue="..."
          />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="clintFollowUp" className="capitalize">Client follow-up</Label>
          <Input id="clientFollowUp" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="Ashor" />
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="classType" className="capitalize">Class</Label>
          <Input id="classType" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="A" />
        </div>
      </CardContent>
    </Card>
  );
}

export default Details;
