import React from 'react'
import ChartComponentTwo from './ChartTwo'

const CardInfo = [
    { id: 1, title: "عدد الموظفين", number: "١٬٥٠٠", time: "آخر 7 أيام", percent: "+٢٫٦%" },
    { id: 2, title: "عدد الموظفين", number: "١٬٥٠٠", time: "آخر 1 أيام", percent: "+٢٫٦%" },
    { id: 3, title: "عدد الموظفين", number: "١٬٥٠٠", time: "آخر 12 أيام", percent: "+٢٫٦%" },
]


export default function CardsComponentTwo() {
    return (
        <>
            {CardInfo.map((ele) => (
                <div key={ele.id} className="h-[179px] min-h-max w-[24%] max-[1200px]:w-[32%] max-[900px]:w-full min-w-max bg-[#1c252e] rounded-2xl flex justify-between items-center px-2 pt-2 shadow-box_shadow">
                    <div className="w-max h-full flex flex-col justify-between items-start gap-2 p-4">
                        <p className="text-xl">{ele.title}</p>
                        <p className="text-4xl max-sm:text-2xl">{ele.number}</p>
                        <div className="flex justify-between items-center gap-2" dir="rtl">
                            <span className="text-base w-max text-[#637381]">{ele.time}</span>
                            <div className="size-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="img"
                                    className="iconify iconify--solar mnl__icon__root MuiBox-root rtl-3klo79 text-green-400"
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75z"
                                        opacity=".5"
                                    ></path>
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M4.43 13.488a.75.75 0 0 0 1.058.081L12 7.988l6.512 5.581a.75.75 0 1 0 .976-1.138l-7-6a.75.75 0 0 0-.976 0l-7 6a.75.75 0 0 0-.081 1.057"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <span className="text-base text-[#637381]">{ele.percent}</span>
                        </div>
                    </div>

                    <div className="w-max pl-5 flex justify-between items-center text-end">
                        <ChartComponentTwo />
                    </div>
                </div>
            ))}

        </>
    )
}
