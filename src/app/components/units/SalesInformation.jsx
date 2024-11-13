"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";



export default function SalesInformation({ page, setIsDisabled, isDisabled, ...props }) {
    const { t } = useTranslation();

    const fieldsData = [
        {
            id: 1,
            type: 'select',
            label: 'handler',
            idField: 'handeler',
            defaultValue: page !== "add" ? 'Group' : "",
            options: [
                { value: 'Group', label: 'Group' },
                { value: 'Users', label: 'Users' },
            ],
        },
        {
            id: 2,
            type: 'select',
            label: 'sales',
            idField: 'sales',
            defaultValue: page !== "add" ? 'alaa zaki' : "",
            options: [
                { value: 'basma', label: 'بسماء' },
                { value: 'EMAN', label: ' إيمان' },
                { value: 'ASHOR', label: 'أشرف' },
                { value: 'amgd', label: 'عماد' },
                { value: 'abd elrhman ra2ft', label: 'عبد الرحمن رفعت' },
                { value: 'romany magdy', label: 'روماني مجدي' },
                { value: 'rahma', label: 'رحمة' },
                { value: 'ahmed abd elatef', label: 'أحمد عبد العاطي' },
                { value: 'alaa zaki', label: 'علاء زكي' },
                { value: 'mohamed zaki', label: 'محمد زكي' },
                { value: 'abd elrhman zaki', label: 'عبد الرحمن زكي' },
                { value: 'abullah reda', label: 'عبد الله رضا' },
                { value: 'yousef mohamed', label: 'يوسف محمد' },
                { value: 'mustafa ashour', label: 'مصطفى أشرف' },
                { value: 'doaa reda', label: 'دعاء رضا' },
                { value: 'maii', label: 'مايا' },
                { value: 'shahd', label: 'شهد' },
                { value: 'ahmed hany', label: 'أحمد هاني' }
            ],
        },
        {
            id: 3,
            type: 'select',
            label: 'category',
            idField: 'category',
            defaultValue: page !== "add" ? 'Stars' : "",
            options: [
                { value: 'Stars', label: 'Stars' },
            ],
        },
    ];

    return (
        <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden">
            <div className="header w-full flex justify-between items-center pb-4">
                <p className="text-xl font-bold">{t("sales_information")}</p>
            </div>
            <CardContent className="w-full min-w-max overflow-x-auto" dir="rtl">
                <FormFields fields={fieldsData} isDisabled={isDisabled} handleChange={props.handleChange} section={props.section} />
            </CardContent>
        </Card>
    );
}
