"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function CreateUser() {
  return (
    <div className="w-full p-6 min-h-screen">
      <Card className="max-w-2xl mx-auto bg-Lightbg dark:bg-cardbgDark">
        <CardHeader className="px-1">
          <CardTitle className="text-xl p-0">Create New User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-cardbgDark dark:text-Lightbg"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                className=""
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-cardbgDark dark:text-Lightbg"
              >
                Last Name
              </Label>
              <Input id="lastName" placeholder="Enter last name" className="" />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-cardbgDark dark:text-Lightbg"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              className=""
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-cardbgDark dark:text-Lightbg"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              className=""
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-cardbgDark dark:text-Lightbg">
              Role
            </Label>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-cardbgDark dark:text-Lightbg"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              className=""
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-cardbgDark dark:text-Lightbg"
            >
              Address
            </Label>
            <Input id="address" placeholder="Enter address" className="" />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="gender"
              className="text-cardbgDark dark:text-Lightbg"
            >
              Gender
            </Label>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end pt-4">
            <Button className="bg-[#5be49b1a] text-[#5be49b]">
              Create User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
