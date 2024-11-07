import Input from "../Input/Input";
import Link from "next/link";
import React from "react";
import PasswordInput from "../PasswordInput";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/app/context/TranslationContext";

export default function FormComponent({
  page,
  handleChange,
  user,
  show,
  handleSubmit,
  disable,
  changeType,
  style,
}) {
  const { t } = useTranslation();

  return (
<<<<<<< HEAD
    <div className="w-full m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1">
      <div className="w-3/4">
        <div>
          <h1 className="text-xl xl:text-2xl font-extrabold text-main ">
=======
    <div className="w-full m-0 sm:m-10 bg-white dark:bg-gray-900 sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-3/4 max-sm:w-full lg:px-0 max-sm:px-3">
        <div>
          <h1 className="text-xl xl:text-2xl font-extrabold text-main dark:text-anti-flash_white">
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
            {page === "register" ? (
              <h1 className="text-2xl font-bold">{t("create_account")}</h1>
            ) : (
              <h1 className="text-2xl font-bold">{t("login_title")}</h1>
            )}
          </h1>
        </div>
        <div className=" flex flex-col ">
<<<<<<< HEAD
          <h1 className="text-2xl xl:text-3xl font-extrabold">
            {page === "register" ? (
              <h2 className="text-xl font-semibold">
                {t("have_an_account")}
                <Link href="/login" className="text-blue-400">
                  {t("sign_in")}
                </Link>
              </h2>
            ) : (
              <h2 className="text-xl font-semibold">
                {t("not_have_an_account")}
                <Link href="/register" className="text-blue-400">
                  {t("sgn_up")}
                </Link>
              </h2>
            )}
          </h1>
=======
          <h1 className="text-2xl xl:text-3xl font-extrabold"></h1>
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
          <div className="w-full flex-1 mt-8">
            <div className="flex flex-col items-center"></div>
            <div className="">
              {page === "register" && (
                <div className="flex items-center justify-center gap-2">
                  <Input
                    name="firstName"
                    onChange={handleChange}
                    value={user.firstName}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder={t("first_name")}
                  />
                  <Input
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder={t("last_name")}
                  />
                </div>
              )}
              <Input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="email"
                placeholder={t("email")}
              />
              <PasswordInput
                changeType={changeType}
                placeholder={t("password")}
                name="password"
                val={user.password}
                show={show}
                handleChange={handleChange}
              />
              {page === "login" ? (
                <div className="text-right my-2">
                  <Link href="/">{t("forgot_password")}</Link>
                </div>
              ) : (
                <PasswordInput
                  changeType={changeType}
                  placeholder={t("confirm_password")}
                  name="confirmPassword"
                  val={user.confirmPassword}
                  show={show}
                  handleChange={handleChange}
                />
              )}

              <Button
<<<<<<< HEAD
                onClick={() => {}}
                disabled={disable}
                className="mt-5 tracking-wide font-black text-xl bg-[#333] py-2 text-gray-100 w-full py-5 rounded-lg hover:bg-[#444] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
=======
                onClick={handleSubmit}
                disabled={disable}
                className="mt-5 tracking-wide font-black text-xl bg-dark text-gray-100 w-full py-5 rounded-lg hover:bg-dark2 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
              >
                {disable ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <span className="ml-3">
<<<<<<< HEAD
                    {page == "register" ? "Create Account" : "Login"}
=======
                    {page == "register" ? t("btn_register") : t("btn_login")}
>>>>>>> aee03c118f7949eea3560d62351b461e661c0d8e
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
