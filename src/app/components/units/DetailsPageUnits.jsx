import React,{useState, useEffect} from "react";
import "./Style.css"

import UnitsInformation from "./unitsInformation";
import CustomInformation from "./CustomInformation";
import SalesInformation from "./SalesInformation";
import UnitsDetails from "./UnitsDetails";
import PricingInformation from "./PricingInformation";
import UnitImageInformation from "./UnitImageInformation";
import CollapsibleComponent from "../CollapsibleComponent";
import { getAllSettings } from "@/actions/filterSettings";

const DetailsPageUnits = ({ 
    page,
    handleChange,
    handleSubmit,
    title,
    unit,
    handleImageChange,
    handleDeleteImage,
    images,
    handleVideoUpload,
    videos,
    handleDeleteVideo
}) => {
    const [options, setOptions] = useState("")
  useEffect(()=>{
    const fetchOptions = async ()=>{
      const res = await getAllSettings()
      setOptions(JSON.parse(res[0].unitSettings))
    }
    fetchOptions()
  }, [])
    const items = [
        {
            key: "1",
            label: "Unit Informations",
            children: <UnitsInformation
            options={options}
            page={page}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            title={title}
            unit={unit}
            // images={images}
            // handleImageChange={handleImageChange}
            // handleDeleteImage={handleDeleteImage}

            />,
        },
        {
            key: "2",
            label: "Custom Information",
            children: <CustomInformation page={page} handleChange={handleChange} unit={unit} options={options}/>,
        },
        {
            key: "3",
            label: "Sales Information",
            children: <SalesInformation page={page} handleChange={handleChange} unit={unit} options={options}/>,
        },
        // {
        //     key: "4",
        //     label: "Unit Details",
        //     children: <UnitsDetails page={page} handleChange={handleChange} unit={unit} options={options}/>,
        // },
        // {
        //     key: "5",
        //     label: "Notes",
        //     children: <PricingInformation page={page} handleChange={handleChange} unit={unit} />,
        // },
        {
            key: "6",
            label: "Unit Image Information",
            children: <UnitImageInformation page={page} handleDeleteVideo={handleDeleteVideo} handleChange={handleChange} unit={unit} handleImageChange={handleImageChange} images={images} handleVideoUpload={handleVideoUpload} videos={videos} handleDeleteImage={handleDeleteImage} />,
        },
    ];

    return <CollapsibleComponent items={items} />;
};

export default DetailsPageUnits;
