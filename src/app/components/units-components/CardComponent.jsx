import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineBedroomChild } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { Heart, Home, ExternalLink, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

function CardProperty({ property, handleLike, handleShowHome,handleCheckUnits }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const defaultImage = "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600";

  let images;
  
  try {
    images = property?.propertyImage 
      ? JSON.parse(property.propertyImage) 
      : [defaultImage];
  } catch (error) {
    console.error("Error parsing property images:", error);
    images = Array.isArray(property?.propertyImage) 
      ? property.propertyImage 
      : [defaultImage];
  }
  

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
      onClick={() => {
        router.push(`units/${property.$id}`);
      }}
    >
      <div className="relative">
        {/* <img
          src={
            property?.propertyImage[0] ||
            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          alt={property?.name}
          className="w-full h-48 object-cover min-h-[240px]"
        /> */}
      <div className="relative w-full h-48 min-h-[240px] overflow-hidden rounded-lg">
      <img
        src={images[currentImageIndex]?.fileUrl || images[currentImageIndex]}
        alt={property?.name}
        className="w-full h-full object-cover"
      />


      <button
        onClick={(e)=>{e.stopPropagation();prevImage()}}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={(e)=>{e.stopPropagation(); nextImage()}}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ❯
      </button>
    </div>
        <Badge className="absolute top-2 left-2 bg-red-500 text-white dark:hover:text-dark">
          For sell
        </Badge>
        <div className="absolute top-2 right-2 flex space-x-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white bg-opacity-50 hover:bg-opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              handleShowHome(property.$id);
            }}
          >
            <Home
              className={`h-4 w-4 ${property.inHome && "text-red-600 text-xl"
                } `}
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white bg-opacity-50 hover:bg-opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                `https://global-website-two.vercel.app/home/area/${property.$id}`,
                "_blank"
              );
            }}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white bg-opacity-50 hover:bg-opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              handleLike(property.$id);
            }}
          >
            <Heart
              className={`h-4 w-4 ${property.liked && "text-red-600 text-xl"}`}
            />
          </Button>
          <div className="w-9 h-9 bg-white bg-opacity-50 hover:bg-[#3c3f49] rounded-[6px] flex justify-center items-center">
            <Checkbox className="h-4 w-4" onClick={(e)=>{e.stopPropagation(); handleCheckUnits(property.$id)}} />
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          <Badge
            variant="secondary"
            className="bg-white text-black dark:hover:text-white"
          >
            {property?.propertyOfferedBy}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 dark:text-dark">
          {property?.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 dark:text-dark">
          {property?.location}
        </p>
        <div className="flex justify-between mb-2 dark:text-dark">
          <div className="flex items-center">
            <HiMiniCurrencyDollar className="w-5 h-5 mr-1" />
            <span className="text-sm">{property?.currency}</span>
          </div>
          <div className="flex items-center">
            <MdOutlineBedroomChild className="w-5 h-5 mr-1" />
            <span className="text-sm">{property?.rooms} Rooms</span>
          </div>
          <div className="flex items-center">
            <CiLocationOn className="w-5 h-5 mr-1" />
            <span className="text-sm">{property?.area}</span>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-600">
            {/* {property.monthlyPrice.toLocaleString()} Monthly / {property.leaseDuration} Years */}
          </p>
          <p className="text-lg font-bold dark:text-dark">
            {property?.totalPrice?.toLocaleString()} EGP
          </p>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" className="flex-1 mr-2">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
          >
            <FaWhatsapp className="w-5 h-5 mr-1" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
export default CardProperty;
