import React from "react";
import "./Style.css"

import UnitsInformation from "./unitsInformation";
import CustomInformation from "./CustomInformation";
import SalesInformation from "./SalesInformation";
import UnitsDetails from "./UnitsDetails";
import PricingInformation from "./PricingInformation";
import UnitImageInformation from "./UnitImageInformation";
import CollapsibleComponent from "../CollapsibleComponent";

const DetailsPageUnits = ({
    page,
    handleChange,
    handleSubmit,
    title,
    unit,
    handleImageChange,
    handleDeleteImage,
    images
}) => {
    const items = [
        {
            key: "1",
            label: "Unit Informations",
            children: <UnitsInformation
                page={page}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                title={title}
                unit={unit}
                images={images}
                handleImageChange={handleImageChange}
                handleDeleteImage={handleDeleteImage}

            />,
        },
        {
            key: "2",
            label: "Custom Information",
            children: <CustomInformation page={page} handleChange={handleChange} unit={unit} />,
        },
        {
            key: "3",
            label: "Sales Information",
            children: <SalesInformation page={page} handleChange={handleChange} unit={unit} />,
        },
        {
            key: "4",
            label: "Unit Details",
            children: <UnitsDetails page={page} handleChange={handleChange} unit={unit} />,
        },
        {
            key: "5",
            label: "Pricing Information",
            children: <PricingInformation page={page} handleChange={handleChange} unit={unit} />,
        },
        {
            key: "6",
            label: "Unit Image Information",
            children: <UnitImageInformation page={page} handleChange={handleChange} unit={unit} />,
        },
    ];

    return <CollapsibleComponent items={items} />;
};

export default DetailsPageUnits;
