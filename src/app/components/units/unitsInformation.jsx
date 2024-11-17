"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import ImageSection from "../user-components/utils/ImageSection";
import CardHeader from "./utils/CardHeader";
import VideoSection from "./utils/VideoSection";



export default function UnitsInformation({ page, setIsDisabled, isDisabled, ...props }) {
    const { t } = useTranslation();
    const [image, setImage] = useState("/assets/images/unit-image.jpeg");
    const [video, setVideo] = useState("/assets/videos/units-video.mp4");  // Default video path
  
    useEffect(() => {
      const defaultImage = "/assets/images/unit-image.jpeg";
      setImage(defaultImage);
      setIsDisabled(page === "add" ? false : isDisabled);
    }, [page, setIsDisabled, isDisabled]);
  
    const handleImageChange = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
      }
    };
  
    const handleDeleteImage = () => setImage("/assets/images/unit-image.jpeg");
  
    const handleVideoChange = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        setVideo(URL.createObjectURL(file));
      }
    };
  
    const handleDeleteVideo = () => {
      setVideo("/assets/videos/units-video.mp4");  // Reset to default video
    };
  
    const fieldsData = [
        { id: 1, type: 'input', label: 'property_number', idField: 'propertyNumber', defaultValue: props?.unit?.propertyNumber },
        {
            id: 2,
            type: 'select',
            label: 'unit_for',
            idField: 'unitFor',
            defaultValue: props?.unit?.unitFor,
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
            label: 'area',
            idField: 'area',
            defaultValue: props?.unit?.area,
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
            label: 'rooms',
            idField: 'rooms',
            defaultValue: props?.unit?.rooms,
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
            label: 'phase',
            idField: 'phase',
            defaultValue: props?.unit?.phase,
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
            label: 'type',
            idField: 'type',
            defaultValue: props?.unit?.type,
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
        { id: 7, type: 'input', label: 'building', idField: 'building', defaultValue: props?.unit?.building },
        { id: 8, type: 'input', label: 'the_floors', idField: 'theFloors', defaultValue: props?.unit?.theFloors },
        {
            id: 9,
            type: 'select',
            label: 'finished',
            idField: 'finished',
            defaultValue: props?.unit?.finished,
            options: [
                { value: 'SEMI FINISHED', label: 'SEMI FINISHED' },
                { value: 'FULLY FINISHED', label: 'FULLY FINISHED' },
                { value: 'Skeleton هيكل خرساني', label: 'Skeleton هيكل خرساني' },
                { value: 'fully finished & furnished', label: 'fully finished & furnished' },
                { value: 'SEMI FURNITURE', label: 'SEMI FURNITURE' }

            ],
        },
        { id: 10, type: 'input', label: 'props_of_unit', idField: 'unitFeatures', defaultValue: props?.unit?.unitFeatures},
        {
            id: 11,
            type: 'select',
            label: 'inside_outside',
            idField: 'inOrOutSideCompound',
            defaultValue: props?.unit?.inOrOutSideCompound,
            options: [
                { value: 'inside', label: 'داخل كمبوند' },
                { value: 'outside', label: 'خارج كمبوند' },
                { value: 'مناطق تجاريه', label: 'مناطق تجاريه' }
            ],
        },
        { id: 12, type: 'input', label: 'total_price', idField: 'totalPrice', defaultValue: props?.unit?.totalPrice },
        { id: 13, type: 'textarea', label: 'descriptions', idField: 'description', defaultValue: props?.unit?.description },
        { id: 14, type: 'date', label: 'last_follow_up', idField: 'lastFollowIn', defaultValue: props?.unit?.lastFollowIn },
        {
            id: 15,
            type: 'select',
            label: 'activity',
            idField: 'activity',
            defaultValue: props?.unit?.activity,
            options: [
                { value: 'سكني', label: 'سكني' },
                { value: 'اداري مرخص', label: 'اداري مرخص' },
                { value: 'اداري غير مرخص', label: 'اداري غير مرخص' },
                { value: 'تجاري', label: 'تجاري' },
                { value: 'طبي', label: 'طبي' }
            ],
        },
        { id: 16, type: 'input', label: 'status', idField: 'status', defaultValue: props?.unit?.status },
    ];

    return (
        <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none py-4 overflow-x-hidden">
            <CardHeader
                handleSubmit={props.handleSubmit}
                title={props.title}
                isDisabled={isDisabled}
                description={props.description}
                unit={props.unit}
                page={page}
                setIsDisabled={setIsDisabled}
                t={t}
            />

            <CardContent className="w-full overflow-x-hidden lg:grid gap-2 gap-y-8 lg:grid-cols-4 md:gap-3 max-sm:flex max-sm:flex-col-reverse pt-4" dir="rtl">
                <FormFields fields={fieldsData} isDisabled={isDisabled} handleChange={props.handleChange} section={props.section} />
                <Card className="h-max bg-transparent pt-5">
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
                        <ImageSection
                            image={image}
                            handleImageChange={handleImageChange}
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
                </Card>
            </CardContent>
        </Card>
    );
}



