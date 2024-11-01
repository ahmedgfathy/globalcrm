"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import style from "./page.module.css";
import { useRouter } from "next/navigation";
import FormComponent from "@/app/components/FormComponent/FormComponent";

function Page() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const message = searchParams.get("msg");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevShow) => !prevShow);
  }, []);

  const handleChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  return (
    <div className="login">
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <FormComponent
          style={style}
          page="login"
          user={formData}
          // msg={message}
          show={showPassword}
          changeType={togglePasswordVisibility}
          handleChange={handleChange}
          //   handleSubmit={handleSubmit}
          disable={isSubmitting}
        />
      </div>
    </div>
  );
}

export default Page;
