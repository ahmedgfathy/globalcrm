import {
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function SheetCalls() {
    return (
        <div className="menu-drawer w-full h-max bg-[#FFF] dark:bg-[#222831] border-0">
            <div className="header w-full flex justify-between max-[450px]:justify-center items-center max-[450px]:flex-wrap gap-y-3">
                <div>
                    <p className="text-2xl font-bold">sheets calls</p>
                </div>
                <div className="w-max flex justify-between items-center gap-2 buttons">
                    <button className="text-sm max-[450px]:text-xs mx-auto px-4 py-2 max-[450px]:p-2 font-bold rounded-xl  duration-200 text-[#0fa439] hover:text-[#08521d] bg-[#c8fad6] dark:text-white dark:hover:text-[#08521d] dark:bg-[#5be49b] dark:hover:bg-[#ddfce6] capitalize">
                        Update
                    </button>
                    <button className="text-sm max-[450px]:text-xs mx-auto px-4 py-2 max-[450px]:p-2 font-bold rounded-xl duration-200 text-white bg-[#e63946] hover:bg-[#c53030] dark:bg-[#ff6b6b] dark:hover:bg-[#c53030] capitalize">
                        Delete
                    </button>
                </div>
            </div>
            <CardContent className="grid gap-2 md:grid-cols-2 md:gap-4">
                <div className="space-y-1 w-full">
                    <Label htmlFor="assigned" className="capitalize">Assigned To</Label>
                    <Input id="assigned" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="username" className="capitalize">مصدر العميل</Label>
                    <Input id="username" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="type" className="capitalize">Type</Label>
                    <Input id="type" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="سكني خارج كمبوند" />
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="leadStatus" className="capitalize">Lead Status</Label>
                    <Input id="leadStatus" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="Very interested" />
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="modifiedTime" className="capitalize">Modified Time</Label>
                    <Input id="modifiedTime" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="28-10-2024 11:15 PM" />
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="createdTime" className="capitalize">Created Time</Label>
                    <Input id="createdTime" className="bg-[#eaeaea] dark:bg-[#222831] dark:border-[#263138]" defaultValue="30-08-2022 2:43 PM" />
                </div>
            </CardContent>
        </div>
    );
}

export default SheetCalls;
