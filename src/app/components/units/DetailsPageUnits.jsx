import React from "react";
import "./Style.css"

import UnitsInformation from "./unitsInformation";
import CollapsibleComponent from "../CollapsibleComponent";
import CustomInformation from "./CustomInformation";
import SalesInformation from "./SalesInformation";
import UnitsDetails from "./UnitsDetails";
import PricingInformation from "./PricingInformation";
import UnitImageInformation from "./UnitImageInformation";

const DetailsPageUnits = ({ page }) => {
    const items = [
        {
            key: "1",
            label: "Unit Informations",
            children: <UnitsInformation page={page} />,
        },
        {
            key: "2",
            label: "Custom Information",
            children: <CustomInformation page={page} />,
        },
        {
            key: "3",
            label: "Sales Information",
            children: <SalesInformation page={page} />,
        },
        {
            key: "4",
            label: "Unit Details",
            children: <UnitsDetails page={page} />,
        },
        {
            key: "5",
            label: "Pricing Information",
            children: <PricingInformation page={page} />,
        },
        {
            key: "6",
            label: "Unit Image Information",
            children: <UnitImageInformation page={page} />,
        },
    ];

    return <CollapsibleComponent items={items} />;
};

export default DetailsPageUnits;
