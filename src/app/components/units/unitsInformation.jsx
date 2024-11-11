"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";
import CardHeader from "./utils/CardHeader";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";


export default function UnitsInformation({ page, setIsDisabled, isDisabled, ...props }) {
    const { t } = useTranslation();
    const [image, setImage] = useState("/");

    const handleDeleteImage = () => {
        // setImage("/assets/images/default-user.jpg");
    };

    useEffect(() => {
        const defaultImage = page === "add"
            ? "/assets/images/default-user.jpg"
            : "/assets/home-images/form-image.png";
        setImage(defaultImage);
        setIsDisabled(page === "add" ? false : isDisabled);
    }, [page, setIsDisabled, isDisabled]);

    const fieldsData = [
        { id: 1, type: 'input', label: 'Property Number', idField: 'propertyNumber', defaultValue: page !== "add" ? "PRO11760" : "" },
        {
            id: 2,
            type: 'select',
            label: 'Unit-For',
            idField: 'unitFor',
            defaultValue: page !== "add" ? 'New rented' : "",
            options: [
                { value: 'New rented', label: 'New rented' },
                { value: 'Hold now', label: 'Hold now' },
                { value: 'For sale', label: 'For sale' },
                { value: 'Sold out', label: 'Sold out' },
                { value: 'Recycle', label: 'Recycle' },
            ],
        },
        {
            id: 3,
            type: 'select',
            label: 'Area',
            idField: 'area',
            defaultValue: page !== "add" ? '' : "",
            options: [
                { value: 'الرحاب', label: 'الرحاب' },
                { value: 'المعادي', label: 'المعادي' },
                { value: 'التجمع الاول', label: 'التجمع الاول' },
                { value: 'اللوتس الشمالية', label: 'اللوتس الشمالية' }
            ],
        },
        {
            id: 4,
            type: 'select',
            label: 'Rooms',
            idField: 'rooms',
            defaultValue: page !== "add" ? '3' : "",
            options: [
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
                { value: '7', label: '7' },
                { value: '8', label: '8' },
                { value: '9', label: '9' },
            ],
        },
        {
            id: 5,
            type: 'select',
            label: 'Phase',
            idField: 'phase',
            defaultValue: page !== "add" ? '3' : "",
            options: [
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
                { value: '7', label: '7' },
                { value: '8', label: '8' },
                { value: '9', label: '9' },
                { value: 'الحي الاول', label: 'الحي الاول' },
                { value: 'الحي الثاني', label: 'الحي الثاني' },
                { value: 'الحي الثالث', label: 'الحي الثالث' },
                { value: 'الحي الرابع', label: 'الحي الرابع' },
                { value: '20', label: '20' },
                { value: '21', label: '21' },
                { value: '22', label: '22' },
            ],
        },
        {
            id: 6,
            type: 'select',
            label: 'Type',
            idField: 'type',
            defaultValue: page !== "add" ? 'Twin House' : "",
            options: [
                { value: 'Stand alone Compound', label: 'Stand alone Compound' },
                { value: 'Twin House', label: 'Twin House' },
                { value: 'Town House CORNER', label: 'Town House CORNER' },
                { value: 'Town House . M', label: 'Town House . M' },
                { value: 'APARTMENT COMPOUND', label: 'APARTMENT COMPOUND' },
                { value: 'ViLLA OUT', label: 'ViLLA OUT' },
                { value: 'APARTMENT OUT', label: 'APARTMENT OUT' },
                { value: 'STUDIO', label: 'STUDIO' },
                { value: 'BESMENT', label: 'BESMENT' },
                { value: 'DUPLEX G+B', label: 'DUPLEX G+B' },
                { value: 'DUPLEX G+F', label: 'DUPLEX G+F' },
                { value: 'DUPLEX ROOF', label: 'DUPLEX ROOF' },
                { value: 'ROOF', label: 'ROOF' },
                { value: 'OFFICE SPACE', label: 'OFFICE SPACE' },
                { value: 'RETAIL', label: 'RETAIL' },
                { value: 'ADMIN BUILDING', label: 'ADMIN BUILDING' },
                { value: 'CLINIC', label: 'CLINIC' },
                { value: 'I VILLA G', label: 'I VILLA G' },
                { value: 'I VILLA R', label: 'I VILLA R' },
                { value: 'شاليه', label: 'شاليه' },
                { value: 'عماره', label: 'عماره' },
                { value: 'اراضي', label: 'اراضي' },
                { value: 'مبني تجاري', label: 'مبني تجاري' },
                { value: 'مبني تجاري - إداري', label: 'مبني تجاري - إداري' },
                { value: 'صيدليات', label: 'صيدليات' },
                { value: 'بنزينه', label: 'بنزينه' },
                { value: 'مستشفيات', label: 'مستشفيات' },
                { value: 'مصانع', label: 'مصانع' },
                { value: 'دوبلكس متكرر', label: 'دوبلكس متكرر' }
            ],
        },
        { id: 7, type: 'input', label: 'Building', idField: 'building', defaultValue: page !== "add" ? "" : "" },
        { id: 8, type: 'input', label: 'The Floors', idField: 'theFloors', defaultValue: page !== "add" ? "أول" : "" },
        {
            id: 9,
            type: 'select',
            label: 'Finished',
            idField: 'finished',
            defaultValue: page !== "add" ? 'SEMI FINISHED' : "",
            options: [
                { value: 'SEMI FINISHED', label: 'SEMI FINISHED' },
                { value: 'FULLY FINISHED', label: 'FULLY FINISHED' },
                { value: 'Skeleton هيكل خرساني', label: 'Skeleton هيكل خرساني' },
                { value: 'fully finished & furnished', label: 'fully finished & furnished' },
                { value: 'SEMI FURNITURE', label: 'SEMI FURNITURE' }

            ],
        },
        { id: 10, type: 'input', label: 'مميزات الوحده', idField: 'propsOfUnit', defaultValue: page !== "add" ? "غاز طبيعي" : "" },
        {
            id: 11,
            type: 'select',
            label: 'Inside / Outside the compound',
            idField: 'Inside/Outside',
            defaultValue: page !== "add" ? 'داخل كمبوند' : "",
            options: [
                { value: 'داخل كمبوند', label: 'داخل كمبوند' },
                { value: 'خارج كمبوند', label: 'خارج كمبوند' },
                { value: 'مناطق تجاريه', label: 'مناطق تجاريه' }
            ],
        },
        { id: 12, type: 'input', label: 'Total Price', idField: 'totalPrice', defaultValue: page !== "add" ? "20000" : "" },
        { id: 13, type: 'textarea', label: 'descriptions', idField: 'descriptions', defaultValue: page !== "add" ? '...' : "" },
        { id: 14, type: 'date', label: 'Last_Follow_up', idField: 'LastFollowUp', defaultValue: page !== "add" ? '2022-08-30' : "" },
        {
            id: 15,
            type: 'select',
            label: 'النشاط',
            idField: 'Activity',
            defaultValue: page !== "add" ? 'سكني' : "",
            options: [
                { value: 'سكني', label: 'سكني' },
                { value: 'اداري مرخص', label: 'اداري مرخص' },
                { value: 'اداري غير مرخص', label: 'اداري غير مرخص' },
                { value: 'تجاري', label: 'تجاري' },
                { value: 'طبي', label: 'طبي' }
            ],
        },
        { id: 16, type: 'input', label: 'Status', idField: 'status', defaultValue: page !== "add" ? 'Clinics' : "" },
    ];

    return (
        <Card className="menu-drawer w-full min-h-screen h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-8 max-md:pt-4 overflow-x-scroll">
            <CardHeader
                title={props.title}
                description={props.description}
                page={page}
                setIsDisabled={setIsDisabled}
                t={t}
            />
            <CardContent className="w-full lg:grid gap-6 lg:grid-cols-4 md:gap-8 max-sm:flex max-sm:flex-col-reverse pt-4" dir="rtl">
                <FormFields fields={fieldsData} isDisabled={isDisabled} />
                <Card className="lg:col-span-1 h-48 lg:h-40">
                    <CardContent className="p-0">
                        <div className="relative w-full h-48 lg:h-40">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55263.40908981412!2d31.415424782395363!3d30.03791738098742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583c1380cba7ef%3A0xd541260e9e06978d!2z2YXYr9mK2YbYqSDZhti12LHYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e0!3m2!1sar!2seg!4v1730961271161!5m2!1sar!2seg"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <div className="flex space-x-2 gap-2">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        onClick={() =>
                                            document.getElementById("imageInput")?.click()
                                        }
                                    >
                                        <Pencil className="h-4 w-4" />
                                        <span className="sr-only">Edit image</span>
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                    onClick={handleDeleteImage}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete image</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}



