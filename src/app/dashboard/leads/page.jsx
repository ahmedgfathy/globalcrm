"use client";
import Link from "next/link";
import React from "react";

const ClientDetails = [
    { id: 1, name: "Ahmed", phone: "01011001105", href: "" },
    { id: 2, name: "ALi", phone: "01011424232", href: "" },
    { id: 3, name: "Khalid", phone: "01014303103", href: "" }
]

function Page() {
    return (
        <div className="py-10">
            <div className="w-full flex flex-wrap justify-between items-start gap-3 max-md:gap-7 px-2 pt-2 max-[1200px]:px-7">
                <div className="w-full h-[50px] flex justify-center items-center mb-5">
                    <input
                        type="text"
                        className="w-1/3 rounded-lg border-transparent bg-[#eaeaea] dark:bg-[#222831] focus:outline-none px-2 py-2"
                        placeholder="Search the client..."
                    />
                </div>

                <div className="w-full flex flex-wrap justify-between items-start gap-5 max-lg:gap-5 px-5 max-lg:px-2">
                    {ClientDetails.map((ele) => (
                        <div key={ele.id} className="w-[30.5%] max-lg:w-[47%] max-sm:w-[95%] max-sm:mx-auto h-[400px] max-h-max flex flex-col justify-between items-center gap-4  rounded-2xl px-6 py-6 shadow-box_shadow hover:scale-105 duration-500 bg-[#FFF] dark:bg-[#222831] ">
                            <div className="overflow-hidden w-full h-[140px]">
                                <img
                                    className="block bg-cover w-full h-full rounded-xl hover:scale-125 duration-500"
                                    src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                                    alt="Bold typography"
                                />
                            </div>
                            <div className="w-full h-2/5 flex flex-col justify-center items-start gap-2">
                                <p className="font-bold text-base capitalize">Name: {ele.name}</p>
                                <p className="font-bold text-base capitalize">Mobile Phone: {ele.phone}</p>
                            </div>
                            <div className="w-full flex justify-between items-center">
                                <Link href={`${ele.href}`} className="mx-auto px-5 py-2 font-bold rounded-xl hover:scale-105 duration-200 text-[#0fa439] hover:text-[#08521d] bg-[#c8fad6] dark:text-white dark:hover:text-[#08521d] dark:bg-[#5be49b] dark:hover:bg-[#ddfce6]">Go To Client</Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Page;
