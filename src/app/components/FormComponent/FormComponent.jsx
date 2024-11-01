import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import PasswordInput from "../PasswordInput";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/app/context/TranslationContext";

function FormComponent({
  page,
  handleChange,
  user,
  show,
  handleSubmit,
  disable,
  changeType,
  style,
}) {
  const { t, changeLanguage } = useTranslation();

  return (
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div>
          <h1 className="text-xl xl:text-2xl font-extrabold text-main text-center">
            {t("welcome")}
          </h1>
        </div>
        <div className="mt-12 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">
            {page === "register" ? "Create an account" : "Welcome back"}
          </h1>
          <div className="w-full flex-1 mt-8">
            <div className="flex flex-col items-center"></div>
            <div className="my-12 border-b text-center"></div>
            <div className="mx-auto max-w-xs">
              <>
                {page === "register" && (
                  <>
                    <Input
                      name="firstName"
                      onChange={handleChange}
                      value={user.firstName}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="First Name"
                    />
                    <Input
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="text"
                      placeholder="Last Name"
                    />
                  </>
                )}
                <Input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Email"
                />
                <PasswordInput
                  changeType={changeType}
                  placeholder="Password"
                  name="password"
                  val={user.password}
                  show={show}
                  handleChange={handleChange}
                />
                {page === "login" ? (
                  <div className="text-right my-2">
                    <Link href="/user/forget-password">forget password ?</Link>
                  </div>
                ) : (
                  <PasswordInput
                    changeType={changeType}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    val={user.confirmPassword}
                    show={show}
                    handleChange={handleChange}
                  />
                )}
              </>

              <Button
                onClick={() => {}}
                disabled={disable}
                className="mt-5  tracking-wide font-semibold bg-black text-gray-100 w-full py-5 rounded-lg hover:bg-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                {disable ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy={7} r={4} />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>

                    <span className="ml-3">
                      {page == "register" ? "Create Account" : "Login"}
                    </span>
                  </>
                )}
              </Button>
              {page == "login" && (
                <div className="text-center mt-5">
                  <Link
                    href="/user/register"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Don&apos;t have an account? Sign up
                  </Link>
                </div>
              )}

              {page === "register" && (
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?
                  <Link
                    href="/login"
                    className="border-b border-gray-500 border-dotted"
                  >
                    login
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div
          className={`m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat ${style.img}`}
        />
      </div>
    </div>
  );
}

export default FormComponent;
