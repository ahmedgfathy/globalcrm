"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";



export default function PricingInformation({ page, setIsDisabled, isDisabled, ...props }) {
    const { t } = useTranslation();

    const fieldsData = [
        { id: 1, type: 'textarea', label: 'property_name_compound_name', idField: 'propertyNameCompoundName', defaultValue: page !== "add" ? "عماره رقم ٨ اللوتس الشماليه" : "" },
    ];

    return (
        <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden" dir="rtl">
            <div className="header w-full flex justify-between items-center pb-4">
                <p className="text-xl font-bold">{t("pricing_information")}</p>
            </div>
            <CardContent className="w-5/6 min-w-max overflow-x-auto" dir="rtl">
                <FormFields fields={fieldsData} isDisabled={isDisabled} handleChange={props.handleChange} section={props.section} />
            </CardContent>
        </Card>
    );
}
