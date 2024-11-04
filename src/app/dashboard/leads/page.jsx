import Link from "next/link";
import React from "react";

function Page() {
    return (
        <div className="py-10">
            <div className="w-full flex flex-wrap justify-between items-start gap-3 max-md:gap-7 mx-auto px-2 pt-2 max-[1200px]:px-12">
                <div className="w-full h-[80px]">Search Input</div>

                <div className="w-full flex flex-wrap justify-between items-start gap-5 max-lg:gap-8">
                    <div className="w-[30%] max-lg:w-[47%] max-md:w-full h-[380px] max-h-max flex flex-col justify-between items-center gap-4 bg-[#1c252e] rounded-2xl px-6 py-6 shadow-box_shadow hover:scale-105 duration-500">
                        <img
                            className="block bg-cover w-full h-[140px] rounded-xl"
                            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                            alt="Bold typography"
                        />
                        <div className="w-full h-2/5 flex flex-col justify-betwen items-start gap-4">
                            <p className="font-bold text-[20px] capitalize">Name : Ahmed</p>
                            <p className="font-bold text-lg capitalize">Mobile Phone : 010000000</p>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <Link href="" className="mx-auto px-5 py-2 font-bold bg-[#5be49b] rounded-xl hover:scale-105 duration-200 hover:text-[#08521d] hover:bg-[#ddfce6]">Go To User</Link>
                        </div>
                    </div>
                    <div className="w-[30%] max-lg:w-[47%] max-md:w-full h-[380px] max-h-max flex flex-col justify-between items-center gap-4 bg-[#1c252e] rounded-2xl px-6 py-6 shadow-box_shadow hover:scale-105 duration-500">
                        <img
                            className="block bg-cover w-full h-[140px] rounded-xl"
                            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                            alt="Bold typography"
                        />
                        <div className="w-full h-2/5 flex flex-col justify-betwen items-start gap-4">
                            <p className="font-bold text-[20px] capitalize">Name : Ahmed</p>
                            <p className="font-bold text-lg capitalize">Mobile Phone : 010000000</p>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <Link href="" className="mx-auto px-5 py-2 font-bold bg-[#5be49b] rounded-xl hover:scale-105 duration-200 hover:text-[#08521d] hover:bg-[#ddfce6]">Go To User</Link>
                        </div>
                    </div>
                    <div className="w-[30%] max-lg:w-[47%] max-md:w-full h-[380px] max-h-max flex flex-col justify-between items-center gap-4 bg-[#1c252e] rounded-2xl px-6 py-6 shadow-box_shadow hover:scale-105 duration-500">
                        <img
                            className="block bg-cover w-full h-[140px] rounded-xl"
                            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                            alt="Bold typography"
                        />
                        <div className="w-full h-2/5 flex flex-col justify-betwen items-start gap-4">
                            <p className="font-bold text-[20px] capitalize">Name : Ahmed</p>
                            <p className="font-bold text-lg capitalize">Mobile Phone : 010000000</p>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <Link href="" className="mx-auto px-5 py-2 font-bold bg-[#5be49b] rounded-xl hover:scale-105 duration-200 hover:text-[#08521d] hover:bg-[#ddfce6]">Go To User</Link>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Page;
