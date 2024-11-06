"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUserAdd,
  AiOutlineWhatsApp,
} from "react-icons/ai";

const ClientDetails = [
  { id: 1, name: "Ahmed", phone: "01011001105", href: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 2, name: "ALi", phone: "01011424232", href: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, name: "Khalid", phone: "01014303103", href: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 4, name: "Khalid", phone: "01014303103", href: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 5, name: "Khalid", phone: "01014303103", href: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 6, name: "Khalid", phone: "01014303103", href: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 7, name: "Khalid", phone: "01014303103", href: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 8, name: "Khalid", phone: "01014303103", href: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 9, name: "Khalid", phone: "01014303103", href: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMHN0YXRlfGVufDB8fDB8fHww" },
  { id: 10, name: "Khalid", phone: "01014303103", href: "https://media.istockphoto.com/id/1899637807/photo/cityscape-of-a-residential-area-with-modern-apartment-buildings-new-sustainable-urban.webp?a=1&b=1&s=612x612&w=0&k=20&c=il_mc160U9aObhGQRfbZyUSqPOxzpX4F9ATaR9HQ7_c=" },
  { id: 11, name: "Khalid", phone: "01014303103", href: "https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 12, name: "Khalid", phone: "01014303103", href: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvbWV8ZW58MHx8MHx8fDA%3D" },
  { id: 13, name: "Khalid", phone: "01014303103", href: "https://media.istockphoto.com/id/1288886616/photo/modern-apartment-building.webp?a=1&b=1&s=612x612&w=0&k=20&c=K0dOBLItQAhXHNiL-Ch2jcbMr1cmoDOvYyqRqWTJ_nw=" },
  { id: 14, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1149958175/photo/modern-skyscrapers-in-midtown-manhattan.jpg?s=612x612&w=0&k=20&c=Q8y5mYKJKp2vm4g7VQsfTWKK6XdoLjVrXR4yBcNX724=" },
  { id: 15, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1437086785/photo/multi-color-leaves-in-neighbourhood-park-at-weston-road-and-major-mackenzie-dr-woodbridge.jpg?s=612x612&w=0&k=20&c=1t0OVT0dmjCVZQgnBBD6qLXpN9vBlhC92hL-dHKZTFQ=" },
  { id: 16, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1321598038/photo/modern-luxury-holiday-villa-at-seaside.jpg?s=612x612&w=0&k=20&c=teTOgGgaQaL3Et0-vUcFTKcGR5HegeBQjPfPC5Xo_o8=" },
  { id: 17, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1435149042/photo/cityscape-of-a-residential-area-with-modern-apartment-buildings.jpg?s=612x612&w=0&k=20&c=ueetSwQs9VJ_qFpKOKaoDF8_tEEQcYDTGv43WD5HKyc=" },
  { id: 18, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1990444472/photo/scandinavian-style-cozy-living-room-interior.jpg?s=612x612&w=0&k=20&c=qgzrs_4vKDrOVo6gVc0EVb9-PziE-REbV9DcM5ZAfig=" },
  { id: 19, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1421422160/photo/interior-of-living-room.jpg?s=612x612&w=0&k=20&c=r8Hyrk-1JtHSJS8TA5BfostSuIEd6-L2fLYMoyEBf_E=" },
  { id: 20, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1409181133/photo/large-home-exterior-nevada.jpg?s=612x612&w=0&k=20&c=BzNy8vfsAwfrRF_X9qhigJJUYTMqbcMEuA62LPGwi5o=" },
];

function Page() {
  const { t } = useTranslation();
  return (
    <div className="py-2">
      <div className="w-full flex flex-wrap justify-between items-start gap-3 max-md:gap-7 px-2 pt-2 max-[1200px]:px-7">
        <div className="bg-Lightbg dark:bg-cardbgDark rounded-xl w-full h-[60px] max-[450px]:h-max max-[450px]:py-2 flex max-[450px]:flex-wrap justify-between max-[450px]:justify-center items-center mb-5 max-[450px]:mb-0 gap-3 px-3 shadow-box_shadow dark:shadow-none">
          <div className="w-3/4 h-max max-[450px]:w-full shadow-box_shadow dark:shadow-none rounded-xl">
            <input
              type="text"
              className="w-full max-[450px]:w-full bg-Lightbg dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md p-2 max-[450px]:py-1"
              placeholder={`${t("search_client")} ...`}
            />
          </div>
          <div className="w-max max-[450px]:w-full">
            <Link
              href="/dashboard/leads/add-lead"
              className="GreenButton dark flex justify-between items-center gap-1"
            >
              <AiOutlineUserAdd /> {t("add_lead")}
            </Link>
          </div>
        </div>
        <div className="w-full gap-2 gap-y-5 max-lg:gap-2 max-lg:gap-y-5 px-5 max-lg:px-2 grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-[325px]:grid-cols-1">
          {ClientDetails.map((ele) => (
            <div
              key={ele.id}
              className="max-lg:h-[380px] max-sm:h-[300px] max-h-max bg-Lightbg dark:bg-cardbgDark flex flex-col justify-between items-center gap-4 rounded-2xl px-2 py-6 shadow-box_shadow dark:shadow-none hover:scale-105 duration-500  "
            >
              <div className="overflow-hidden w-full h-[140px]">
                <img
                  className="block bg-cover w-full h-full rounded-xl hover:scale-125 duration-500"
                  src={ele.href}
                  alt="Bold typography"
                />
              </div>
              <div className="w-full h-max flex flex-col justify-center items-start gap-2">
                <p className="font-bold text-sm capitalize">
                  {t("name")}: {ele.name}
                </p>
                <p className="font-bold text-xs capitalize">
                  {t("mobile_phone")}: {ele.phone}
                </p>
              </div>
              <div className="w-full flex justify-start items-center gap-2">
                <Link href="">
                  <AiOutlineWhatsApp className="text-[#08521d] dark:text-white  hover:scale-125 duration-300" />
                </Link>
                <Link href="">
                  <AiOutlineMail className="text-[#08521d] dark:text-white  hover:scale-125 duration-300" />
                </Link>
                <Link href="">
                  <AiOutlinePhone className="text-[#08521d] dark:text-white  hover:scale-125 duration-300" />
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
                    <path
                      d="m9.9 27.41a4.29 4.29 0 0 1 4.29 4.29v.38a4.47 4.47 0 0 1 -1.42 3.35 2.48 2.48 0 0 0 -.94 1.81c0 .58.24 1.16 1.5 1.81l1.29.58c1.81.89 3.39 1.81 3.44 3.62a2.39 2.39 0 0 1 -2.06 2.27h-11.95a2.39 2.39 0 0 1 -2.3-2.45c0-1.72 1.59-2.73 3.44-3.62l.67-.29.33-.16c1.57-.65 1.81-1.22 1.81-1.8a2.73 2.73 0 0 0 -.94-1.81 4.46 4.46 0 0 1 -1.42-3.39 4.3 4.3 0 0 1 3.94-4.62zm36.23-19.93a3.62 3.62 0 0 1 3.62 3.62v27.17a3.63 3.63 0 0 1 -3.62 3.63h-25.49a5.43 5.43 0 0 0 -2.64-3.63h27.15a.9.9 0 0 0 .9-.9v-23.55a.9.9 0 0 0 -.9-.9h-36.23a.9.9 0 0 0 -.9.9h-.02v11.09a6.51 6.51 0 0 0 -3.63 2.37v-16.18a3.63 3.63 0 0 1 3.63-3.62z"
                      fillRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="w-full flex justify-between items-center">
                <Link
                  href={`/dashboard/leads/${ele.id}`}
                  className="GreenButton dark"
                >
                  {t("button_to_client")}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default Page;
