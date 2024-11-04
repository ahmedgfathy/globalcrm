"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import React from "react";

const ClientDetails = [
    { id: 1, name: "Ahmed", phone: "01011001105", href: "" },
    { id: 2, name: "ALi", phone: "01011424232", href: "" },
    { id: 3, name: "Khalid", phone: "01014303103", href: "" },
    { id: 4, name: "Khalid", phone: "01014303103", href: "" },
    { id: 5, name: "Khalid", phone: "01014303103", href: "" },
    { id: 6, name: "Khalid", phone: "01014303103", href: "" },
    { id: 7, name: "Khalid", phone: "01014303103", href: "" },
    { id: 8, name: "Khalid", phone: "01014303103", href: "" },
    { id: 9, name: "Khalid", phone: "01014303103", href: "" },
    { id: 10, name: "Khalid", phone: "01014303103", href: "" },
    { id: 11, name: "Khalid", phone: "01014303103", href: "" },
    { id: 12, name: "Khalid", phone: "01014303103", href: "" },
    { id: 13, name: "Khalid", phone: "01014303103", href: "" },
    { id: 14, name: "Khalid", phone: "01014303103", href: "" },
    { id: 15, name: "Khalid", phone: "01014303103", href: "" },
    { id: 16, name: "Khalid", phone: "01014303103", href: "" },
    { id: 17, name: "Khalid", phone: "01014303103", href: "" },
    { id: 18, name: "Khalid", phone: "01014303103", href: "" },
    { id: 19, name: "Khalid", phone: "01014303103", href: "" },
    { id: 20, name: "Khalid", phone: "01014303103", href: "" },
]

function Page() {

    const { t } = useTranslation();


    return (
        <div className="py-10">
            <div className="w-full flex flex-wrap justify-between items-start gap-3 max-md:gap-7 px-2 pt-2 max-[1200px]:px-7">
                <div className="w-full h-[50px] flex justify-center items-center mb-5">
                    <input
                        type="text"
                        className="w-1/3 max-[450px]:w-full rounded-lg border-transparent bg-[#eaeaea] dark:bg-[#222831] focus:outline-none px-2 py-2"
                        placeholder={`${t("search_client")}...`}

                    />
                </div>

                <div className="w-full flex flex-wrap justify-between items-center gap-2 gap-y-5 max-lg:gap-2 max-lg:gap-y-5 px-5 max-lg:px-2">
                    {ClientDetails.map((ele) => (
                        <div key={ele.id} className="w-[18.5%] max-xl:w-[22.5%] max-lg:w-[30%] max-[480px]:w-[48%] max-[300px]:w-full max-sm:mx-auto h-[380px] max-h-max flex flex-col justify-between items-center gap-4  rounded-2xl px-2 py-6 shadow-box_shadow hover:scale-105 duration-500 bg-[#FFF] dark:bg-[#222831] ">
                            <div className="overflow-hidden w-full h-[140px]">
                                <img
                                    className="block bg-cover w-full h-full rounded-xl hover:scale-125 duration-500"
                                    src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                                    alt="Bold typography"
                                />
                            </div>
                            <div className="w-full h-max flex flex-col justify-center items-start gap-2">
                                <p className="font-bold text-sm capitalize">{t("name")}: {ele.name}</p>
                                <p className="font-bold text-xs capitalize">{t("mobile_phone")}: {ele.phone}</p>
                            </div>
                            <div className="w-full flex justify-start items-center gap-3 ml-5">
                                <Link href="">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32 32"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-[#08521d] dark:text-white  hover:scale-125 duration-300"
                                >
                                    <path d="M16 0C7.164 0 0 7.164 0 16c0 2.826.738 5.568 2.142 7.986L0 32l8.196-2.13C10.461 31.262 13.198 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.371c-2.533 0-5.045-.676-7.228-1.957l-.518-.307-4.872 1.267 1.307-4.75-.335-.548A13.209 13.209 0 0 1 2.629 16c0-7.418 6.01-13.429 13.429-13.429S29.487 8.582 29.487 16 23.477 29.371 16 29.371zM22.406 18.977c-.357-.18-2.113-1.042-2.439-1.16-.325-.12-.562-.18-.798.18-.236.36-.92 1.16-1.125 1.395-.207.236-.412.266-.77.09-.357-.178-1.508-.558-2.872-1.778-1.062-.946-1.778-2.11-1.987-2.467-.207-.357-.022-.55.155-.73.16-.157.356-.412.534-.617.18-.207.236-.355.354-.592.12-.236.06-.445-.03-.624-.09-.18-.798-1.922-1.093-2.635-.285-.686-.576-.592-.797-.602-.207-.01-.445-.012-.684-.012-.24 0-.625.089-.955.446-.33.356-1.256 1.226-1.256 2.993s1.286 3.47 1.464 3.715c.18.237 2.53 3.855 6.142 5.4.857.37 1.525.59 2.046.755.86.274 1.642.236 2.26.143.688-.103 2.113-.863 2.414-1.697.3-.834.3-1.547.21-1.697-.087-.15-.325-.237-.682-.412z" />
                                </svg>
                                </Link>
                                <Link href="">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-[#08521d] dark:text-white  hover:scale-125 duration-300"
                                >
                                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.5-8 5-8-5V6l8 5 8-5v2.5z" />
                                </svg>
                                </Link>
                                <Link href="">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-[#08521d] dark:text-white  hover:scale-125 duration-300"
                                >
                                    <path d="M6.62 10.79a15.91 15.91 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1v3.61a1 1 0 0 1-1 1A16 16 0 0 1 3 4a1 1 0 0 1 1-1h3.61a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.24 1.05l-2.2 2.2z" />
                                </svg>
                                </Link>
                                <Link href="">
                                                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 52 52"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="text-[#08521d] dark:text-white  hover:scale-125 duration-300"
                                >
                                    <path d="m9.9 27.41a4.29 4.29 0 0 1 4.29 4.29v.38a4.47 4.47 0 0 1 -1.42 3.35 2.48 2.48 0 0 0 -.94 1.81c0 .58.24 1.16 1.5 1.81l1.29.58c1.81.89 3.39 1.81 3.44 3.62a2.39 2.39 0 0 1 -2.06 2.27h-11.95a2.39 2.39 0 0 1 -2.3-2.45c0-1.72 1.59-2.73 3.44-3.62l.67-.29.33-.16c1.57-.65 1.81-1.22 1.81-1.8a2.73 2.73 0 0 0 -.94-1.81 4.46 4.46 0 0 1 -1.42-3.39 4.3 4.3 0 0 1 3.94-4.62zm36.23-19.93a3.62 3.62 0 0 1 3.62 3.62v27.17a3.63 3.63 0 0 1 -3.62 3.63h-25.49a5.43 5.43 0 0 0 -2.64-3.63h27.15a.9.9 0 0 0 .9-.9v-23.55a.9.9 0 0 0 -.9-.9h-36.23a.9.9 0 0 0 -.9.9h-.02v11.09a6.51 6.51 0 0 0 -3.63 2.37v-16.18a3.63 3.63 0 0 1 3.63-3.62z" fill-rule="evenodd" />
                                </svg>
                                </Link>
                                
                                
                                

                            </div>
                            <div className="w-full flex justify-between items-center">
                                <Link href={`${ele.href}`} className="text-sm max-[450px]:text-xs mx-auto px-4 py-2 max-[450px]:p-2 font-bold rounded-xl hover:scale-105 duration-200 text-[#0fa439] hover:text-[#08521d] bg-[#c8fad6] dark:text-white dark:hover:text-[#08521d] dark:bg-[#5be49b] dark:hover:bg-[#ddfce6] capitalize">{t("button_to_client")}</Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Page;
