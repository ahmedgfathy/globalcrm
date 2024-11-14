"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import React from "react";
import { ClientDetails, filterData } from "./data";
import { CardUnitComponent } from "@/app/components/units-components/CardComponent";
import { IoMdAddCircle } from "react-icons/io";
import Filter from "@/app/components/Filter";
import { Pagination } from "antd";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomButton from "@/app/components/CustomButton";
import { DropdownMenImportExport } from "@/app/components/leadImport-Export/ImportExport";
function Page() {
  const router = useRouter()
  const { t } = useTranslation();
  return (
    <div className="py-2">
      <div className="w-full flex flex-wrap justify-between items-start gap-3 px-2 pt-2 max-[1200px]:px-7">
        <Grid container className="flex justify-center gap-1 w-full mt-5 mb-3 " dir="ltr">
          <Grid item xs={12} sm={7} md={11.3} lg={11.4} className="flex items-center justify-end gap-2" >
            <div className="w-3/4 h-max max-[450px]:w-full  dark:shadow-none rounded-xl">
              <input
                type="text"
                className="w-full  bg-Lightbg dark:bg-cardbgDark border-[1px] border-borderSearchInputLight dark:border-borderSearchInputDark hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md p-2 max-[450px]:py-1"
                placeholder={`${t("search_unit")} ...`}
              />
            </div>
            <div className="">
              <CustomButton
              fun={()=>router.push("/units/add-unit")}
              title={t("add_unit")}
              icon={()=><IoMdAddCircle />}
              />
            </div>
          </Grid>
        </Grid>


        <div className="filter bg-Lightbg dark:bg-transparent rounded-xl w-full h-[60px] max-[450px]:h-max max-[450px]:py-2 flex justify-end max-[450px]:flex-wrap items-center mb-5 max-[450px]:mb-0 gap-3 px-3 shadow-box_shadow dark:shadow-none" dir="ltr">
        <div className="filter w-full md:w-3/4">
          <Filter data={filterData} />
        </div>
        <DropdownMenImportExport />
      </div>

        <Grid container className="flex justify-center gap-5">
          {ClientDetails.map((ele, index) => {

            return (
              <Grid item xs={12} sm={7} md={5.5} lg={3.7} key={index}>
                <CardUnitComponent key={ele.id} ele={ele} />
              </Grid>

            )

          })}

        </Grid>

        <div className="flex justify-center mt-4 w-full">
          <Pagination className="dark:bg-gray-800 px-3 py-2 rounded-md" defaultCurrent={1} total={500} />
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}
export default Page;





// "use client";
// import { useTranslation } from "@/app/context/TranslationContext";
// import { Button } from "@/components/ui/button";
// import { Grid } from "@mui/material";
// import Link from "next/link";
// import React from "react";
// import {
//   AiOutlineUserAdd,
//   AiOutlineWhatsApp,
// } from "react-icons/ai";
// import { FaWhatsapp } from "react-icons/fa";
// import { FiPhoneCall } from "react-icons/fi";
// import { MdOutlineMail } from "react-icons/md";

// // import imgg from "@/puplic/assets/images/default-user.jpg"

// const ClientDetails = [
//   { id: 1, href: '/path/to/image.jpg', name: 'Client 1', phone: '+123456789' },
//   { id: 2, href: '/path/to/image2.jpg', name: 'Client 2', phone: '+987654321' },
// ];

// export default function Page() {
//   const { t } = useTranslation();

//   const ClientDetails = [
//     { id: 1, name: "Ahmed", phone: "01011001105", href: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" },
//   { id: 2, name: "ALi", phone: "01011424232", href: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600" },
//   { id: 3, name: "Khalid", phone: "01014303103", href: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600" },
//   { id: 4, name: "Khalid", phone: "01014303103", href: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600" },
//   { id: 5, name: "Khalid", phone: "01014303103", href: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600" },
//   { id: 6, name: "Khalid", phone: "01014303103", href: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600" },
//   { id: 7, name: "Khalid", phone: "01014303103", href: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=600" },
//   { id: 8, name: "Khalid", phone: "01014303103", href: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlYWwlMjBzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" },
//   { id: 9, name: "Khalid", phone: "01014303103", href: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMHN0YXRlfGVufDB8fDB8fHww" },
//   { id: 10, name: "Khalid", phone: "01014303103", href: "https://media.istockphoto.com/id/1899637807/photo/cityscape-of-a-residential-area-with-modern-apartment-buildings-new-sustainable-urban.webp?a=1&b=1&s=612x612&w=0&k=20&c=il_mc160U9aObhGQRfbZyUSqPOxzpX4F9ATaR9HQ7_c=" },
//   { id: 11, name: "Khalid", phone: "01014303103", href: "https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D" },
//   { id: 12, name: "Khalid", phone: "01014303103", href: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvbWV8ZW58MHx8MHx8fDA%3D" },
//   { id: 13, name: "Khalid", phone: "01014303103", href: "https://media.istockphoto.com/id/1288886616/photo/modern-apartment-building.webp?a=1&b=1&s=612x612&w=0&k=20&c=K0dOBLItQAhXHNiL-Ch2jcbMr1cmoDOvYyqRqWTJ_nw=" },
//   { id: 14, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1149958175/photo/modern-skyscrapers-in-midtown-manhattan.jpg?s=612x612&w=0&k=20&c=Q8y5mYKJKp2vm4g7VQsfTWKK6XdoLjVrXR4yBcNX724=" },
//   { id: 15, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1437086785/photo/multi-color-leaves-in-neighbourhood-park-at-weston-road-and-major-mackenzie-dr-woodbridge.jpg?s=612x612&w=0&k=20&c=1t0OVT0dmjCVZQgnBBD6qLXpN9vBlhC92hL-dHKZTFQ=" },
//   { id: 16, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1321598038/photo/modern-luxury-holiday-villa-at-seaside.jpg?s=612x612&w=0&k=20&c=teTOgGgaQaL3Et0-vUcFTKcGR5HegeBQjPfPC5Xo_o8=" },
//   { id: 17, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1435149042/photo/cityscape-of-a-residential-area-with-modern-apartment-buildings.jpg?s=612x612&w=0&k=20&c=ueetSwQs9VJ_qFpKOKaoDF8_tEEQcYDTGv43WD5HKyc=" },
//   { id: 18, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1990444472/photo/scandinavian-style-cozy-living-room-interior.jpg?s=612x612&w=0&k=20&c=qgzrs_4vKDrOVo6gVc0EVb9-PziE-REbV9DcM5ZAfig=" },
//   { id: 19, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1421422160/photo/interior-of-living-room.jpg?s=612x612&w=0&k=20&c=r8Hyrk-1JtHSJS8TA5BfostSuIEd6-L2fLYMoyEBf_E=" },
//   { id: 20, name: "Khalid", phone: "01014303103", href: "https://media.gettyimages.com/id/1409181133/photo/large-home-exterior-nevada.jpg?s=612x612&w=0&k=20&c=BzNy8vfsAwfrRF_X9qhigJJUYTMqbcMEuA62LPGwi5o=" },
//   ]
//   return (
//     <div className="py-2">
//       <Grid container className="p-6 w-full">
//         <Grid item className="flex gap-5 w-full">
//           <input
//             type="text"
//             className="bg-white bg-Lightbg dark:bg-cardbgDark border border-[1px] hover:border-black focus:border-black dark:hover:border-white dark:focus:border-white focus:outline-none rounded-md p-2 max-[450px]:py-1"
//             style={{ borderColor: '#ccc', flexGrow: "1" }}
//             placeholder={`${t("search_client")} ...`}
//           />
//           <Link
//             href="/dashboard/leads/add-lead"
//             className="GreenButton dark md:w-[130px] flex justify-between rounded items-center gap-1"
//             style={{ borderRadius: "3px" }}
//           >
//             <AiOutlineUserAdd className="text-xl" /> {t("add_lead")}
//           </Link>
//         </Grid>
//       </Grid>

//       <Grid container className="flex gap-5 justify-between p-6" style={{ flexWrap: "wrap" }}>
//         {ClientDetails.map((ele) => (
//           <Grid item xs={12} sm={5.7} lg={2.8} key={ele.id}>
//             <div className="rounded-t max-h-max hover:shadow duration-300 bg-Lightbg dark:bg-cardbgDark flex flex-col justify-between items-center gap-4 rounded-b">
//               <div className="overflow-hidden w-full lg:h-[200px] sm:h-[230px]">
//               <img className="rounded-t block bg-cover w-full h-full hover:scale-105 duration-500" src={ele.href} alt="User Image" />

//                 {/* <img
//                   className="rounded-t block bg-cover w-full h-full hover:scale-105 duration-500"
//                   src={imgg.src}
//                   alt="Bold typography"
//                 /> */}
//                 {/* <img
//                   className="rounded-t block bg-cover w-full h-full hover:scale-105 duration-500"
//                   src={ele.href || '/path/to/default-image.jpg'}
//                   alt="Bold typography"
//                 /> */}
//               </div>
//               <div className="w-full h-max flex flex-col justify-center items-start gap-2 p-3">
//                 <p className="font-bold text-sm capitalize">{t("name")} : {ele.name}</p>
//                 <p className="font-bold text-xs capitalize">{t("mobile_phone")}: {ele.phone}</p>
//               </div>

//               <div className="w-full flex justify-between items-center p-3">
//                 <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded border-gray-400 shadow">
//                   {t("more_details")}
//                 </button>

//                 <div className="flex justify-start items-center gap-2">
//                   <Link href={`tel:${ele.phone}`}>
//                     <FaWhatsapp className="text-[#08521d] text-xl dark:text-white hover:scale-125 duration-300" />
//                   </Link>
//                   <Link href={`tel:${ele.phone}`}>
//                     <FiPhoneCall className="text-[#08521d] dark:text-white text-xl hover:scale-125 duration-300" />
//                   </Link>
//                   <Link href={`mailto:${ele.email}`}>
//                     <MdOutlineMail className="text-[#08521d] dark:text-white text-xl hover:scale-125 duration-300" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// }