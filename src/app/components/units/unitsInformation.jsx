"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";
import { IconButton, Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { Button } from "@/components/ui/button";
// import { Pencil, Trash2 } from "lucide-react";
import CardHeader from "./utils/CardHeader";
import { getProjects } from "@/actions/projectAction";

export default function UnitsInformation({ page, setIsDisabled, isDisabled, handleWhatsApp, handleCall, handleEmail, handlePDF, ...props }) {
    const { t } = useTranslation();
    const [images, setImages] = useState([]);
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const defaultImage = ["/assets/images/unit-image.jpeg"];
        setImages(defaultImage);
        setIsDisabled(page === "add" ? false : isDisabled);
    }, [page, setIsDisabled, isDisabled]);
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await getProjects();
            setProjects(res.projects)
        }
        fetchData()
    },[])
    const fieldsData = [
        { id: 25, type: 'input', label: 'property_name_compound_name', idField: 'compoundName', defaultValue: props?.unit?.compoundName, required:true },
        { id: 1, type: 'input', label: 'property_number', idField: 'propertyNumber', defaultValue: props?.unit?.propertyNumber },
        { id: 17, type: 'input', label: 'unit_no', idField: 'unitNo', defaultValue: props?.unit?.unitNo },
        {
            id: 2,
            type: 'select',
            label: 'unit_for',
            idField: 'unitFor',
            defaultValue: props?.unit?.unitFor,
            options: props?.options?.UnitFor,
            required:true
        },
        {
            id: 3,
            type: 'select',
            label: 'area',
            idField: 'area',
            defaultValue: props?.unit?.area,
            options: props?.options?.area,
            required:true
        },
        {
            id: 4,
            type: 'select',
            label: 'rooms',
            idField: 'rooms',
            defaultValue: props?.unit?.rooms,
            options: props?.options?.rooms,
        },
        {
            id: 5,
            type: 'select',
            label: 'phase',
            idField: 'phase',
            defaultValue: props?.unit?.phase,
            options: props?.options?.phase,
        },
        {
            id: 6,
            type: 'select',
            label: 'type',
            idField: 'type',
            defaultValue: props?.unit?.type,
            options: props?.options?.type,
            required:true
        },
        { id: 7, type: 'input', label: 'building', idField: 'building', defaultValue: props?.unit?.building },
        {
            id: 8,
            type: "multiselect",
            label: "the_floors",
            idField: "theFloors",
            defaultValue: props?.unit?.theFloors,
            options: props?.options?.theFloors,
        },
        {
            id: 9,
            type: 'select',
            label: 'finished',
            idField: 'finished',
            defaultValue: props?.unit?.finished,
            options: props?.options?.finished,
        },
        { id: 10, type: 'input', label: 'props_of_unit', idField: 'unitFeatures', defaultValue: props?.unit?.unitFeatures },
        {
            id: 11,
            type: 'select',
            label: 'inside_outside',
            idField: 'inOrOutSideCompound',
            defaultValue: props?.unit?.inOrOutSideCompound,
            options: props?.options?.inOrOutSideCompound,
        },
        { id: 12, type: 'input', label: 'total_price', idField: 'totalPrice', defaultValue: props?.unit?.totalPrice },
        { id: 24, type: 'input', label: 'Meter price', idField: 'PricePerMeter', defaultValue: props?.unit?.totalPrice },
        {
            id: 21,
            type: 'select',
            label: 'currency',
            idField: 'currency',
            defaultValue: props?.unit?.currency,
            options: props?.options?.currency,
        },
        {
            id: 26,
            type: 'select',
            label: 'project',
            idField: 'project',
            defaultValue: props?.unit?.project,
            options: projects.map((project)=> project.projectName),
        },
        { id: 14, type: 'date', label: 'last_follow_up', idField: 'lastFollowIn', defaultValue: props?.unit?.lastFollowIn },
        {
            id: 15,
            type: 'select',
            label: 'activity',
            idField: 'activity',
            defaultValue: props?.unit?.activity,
            options: props?.options?.activity,
        },
        { id: 16, type: 'input', label: 'status', idField: 'status', defaultValue: props?.unit?.status },
       
        { id: 22, type: 'date', label: 'rent_from', idField: 'rentFrom', defaultValue: props?.unit?.rentFrom },
        { id: 23, type: 'date', label: 'rent_to', idField: 'rentTo', defaultValue: props?.unit?.rentTo },
        { id: 20, type: 'input', label: 'land_area', idField: 'landArea', defaultValue: props?.unit?.landArea },
        { id: 18, type: 'date', label: 'created_time', idField: 'createdTime', defaultValue: props?.unit?.createdTime },
        { id: 19, type: 'date', label: 'modified_time', idField: 'modifiedTime', defaultValue: props?.unit?.modifiedTime },
        { id: 13, type: 'textarea', label: 'descriptions', idField: 'description', defaultValue: props?.unit?.description },
    ];

    return (
        <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-4 overflow-x-hidden" >
            <CardHeader
                handleSubmit={props.handleSubmit}
                title={props.title}
                isDisabled={isDisabled}
                description={props.description}
                unit={props.unit}
                page={page}
                setIsDisabled={setIsDisabled}
                handleWhatsApp={handleWhatsApp}
                handleCall={handleCall}
                handleEmail={handleEmail}
                handlePDF={handlePDF}
                t={t}
            />
            <CardContent className="w-full overflow-x-hidden d gap-2 gap-y-8 md:gap-3 max-sm:flex max-sm:flex-col-reverse pt-4" dir="rtl">
                <FormFields fields={fieldsData} isDisabled={isDisabled} handleChange={props.handleChange} section={props.section} col={true} />
                {/* <Card className="h-max bg-transparent pt-5">
                    <CardContent className="bg-transparent p-0 space-y-2">
                        <div className="relative h-48 lg:h-40 p-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55263.40908981412!2d31.415424782395363!3d30.03791738098742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583c1380cba7ef%3A0xd541260e9e06978d!2z2YXYr9mK2YbYqSDZhti12LHYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e0!3m2!1sar!2seg!4v1730961271161!5m2!1sar!2seg"
                                width="100%"
                                height="100%"
                                className="object-cover h-full rounded-sm"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
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
                        <MultibleImages
                            images={props?.unit?.propertyImage || images}
                            handleImageChange={props?.handleImageChange}
                            handleDeleteImage={handleDeleteImage}
                            isDisabled={isDisabled}
                        />
                        <VideoSection
                            video={video}
                            handleVideoChange={handleVideoChange}
                            handleDeleteVideo={handleDeleteVideo}
                            isDisabled={isDisabled}
                        />
                    </CardContent>
                </Card> */}
            </CardContent>
        </Card>
    );
}



