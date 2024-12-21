"use client";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getUser, updateUser } from "@/actions/auth";
import { UserContext } from "@/app/context/UserContext";

function Page() {
  const { t } = useTranslation();
  const [state] = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const fetchUser = async()=>{
    try{
      const user = await getUser(state?.userData?.userId)
      console.log(user)
      setUserData(user)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchUser()
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("User Data Saved:", userData);
    const updatedData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      phone: userData.phone,
    };

    try{
      const data = await updateUser(state?.userData?.userId, updatedData)
    }catch(error){
      console.log(error)
    }
  };

  return (
    <div className="mt-5">
      <div className="container mx-auto p-5 bg-white dark:bg-cardbgDark shadow-md rounded-md max-w-lg">
        <h1 className="text-2xl font-bold mb-4">{t("account_settings")}</h1>
        <form>
          <div className="mb-4">
            <Label className="block text-gray-700 dark:text-gray-100 mb-2">{t("name")}</Label>
            <Input
              type="text"
              name="name"
              value={userData?.name || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 dark:text-gray-100 mb-2">{t("email")}</Label>
            <Input
              type="email"
              name="email"
              autofill="off"
              value={userData?.email || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 dark:text-gray-100 mb-2">{t("phone")}</Label>
            <Input
              type="text"
              name="phone"
              value={userData?.phone||""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 dark:text-gray-100 mb-2">{t("role")}</Label>
            <Input
              type="text"
              name="role"
              disabled
              readOnly
              value={userData?.role||""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 dark:text-gray-100 mb-2">{t("password")}</Label>
            <Input
              type="password"
              name="Enter New Password"
              value={userData?.password || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-[#5be49b1a] text-[#5be49b]"
          >
            {t("save_changes")}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
