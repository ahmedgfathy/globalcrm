"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";



export default function UnitImageInformation({ page, setIsDisabled, isDisabled, ...props }) {
    const { t } = useTranslation();
    const fieldsData = [
        { id: 1, type: 'textarea', label: 'links_pdf_details', idField: 'linksPDFDetails', defaultValue: page !== "add" ? "Link" : "" },
    ];

    return (
        <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden">
            <div className="header w-full flex justify-between items-center pb-4">
                <p className="text-xl font-bold">{t("unit_image_information")}</p>
            </div>
            <CardContent className="w-5/6  overflow-x-auto" dir="rtl">
                <FormFields fields={fieldsData} isDisabled={isDisabled} handleChange={props.handleChange} section={props.section} />
            </CardContent>
        </Card>
    );
}
