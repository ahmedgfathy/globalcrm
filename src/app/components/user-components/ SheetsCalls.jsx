import {
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function SheetCalls() {
    return (
        <div className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark border-0">
            <div className="header w-full flex justify-between max-[450px]:justify-center items-center max-[450px]:flex-wrap gap-y-3">
                <div>
                    <p className="text-2xl font-bold">sheets calls</p>
                </div>
                <div className="w-max flex justify-between items-center gap-2 buttons">
                    <button className="GreenButton dark">
                        Update
                    </button>
                    <button className="DeleteButton">
                        Delete
                    </button>
                </div>
            </div>
            <CardContent className="grid gap-2 md:grid-cols-2 md:gap-4 pt-3">
                <div className="space-y-1 w-full">
                    <Label htmlFor="assigned" className="capitalize">Assigned To</Label>
                    <Input id="assigned" className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="username" className="capitalize">مصدر العميل</Label>
                    <Input id="username" className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="type" className="capitalize">Type</Label>
                    <Input id="type" className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md" defaultValue="سكني خارج كمبوند" />
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="leadStatus" className="capitalize">Lead Status</Label>
                    <Input id="leadStatus" className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md" defaultValue="Very interested" />
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="modifiedTime" className="capitalize">Modified Time</Label>
                    <Input id="modifiedTime" className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md" defaultValue="28-10-2024 11:15 PM" />
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="createdTime" className="capitalize">Created Time</Label>
                    <Input id="createdTime" className="dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md" defaultValue="30-08-2022 2:43 PM" />
                </div>
            </CardContent>
        </div>
    );
}

export default SheetCalls;
