"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import FormFields from "../user-components/utils/FormFields";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import CardHeader from "./utils/CardHeader";
import VideoSection from "./utils/VideoSection";
import MultibleImages from "./utils/MultibleImages";
// import { uploadPropertyImages } from "@/actions/propertiesAction";



export default function UnitsInformation({ page, setIsDisabled, isDisabled, ...props }) {
    const { t } = useTranslation();
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState("/assets/videos/units-video.mp4");

    useEffect(() => {
        const defaultImage = ["/assets/images/unit-image.jpeg"];
        setImages(defaultImage);
        setIsDisabled(page === "add" ? false : isDisabled);
    }, [page, setIsDisabled, isDisabled]);

    // const handleImageChange = (e, index) => {
    //     const files = Array.from(e.target.files);
    //     if (files && files.length > 0) {
    //         const newImages = [...images];
    //         if (index >= 0 && index < images.length) {
    //             newImages[index] = URL.createObjectURL(files[0]);
    //         } else {
    //             files.forEach((file) => {
    //                 newImages.push(URL.createObjectURL(file));
    //             });
    //         }
    //         setImages(newImages);
    //     }
    // };

    // const handleImageChange = async (event, index = null) => {
    //     const files = event.target.files;
    //     if (files && files.length > 0) {
    //       const uploadedFiles = Array.from(files);
      
    //       try {
    //         const uploadedImages = await uploadPropertyImages(uploadedFiles);
      
    //         const imageUrls = uploadedImages.map((file) => file.fileUrl);
      
    //         setUnit((prevUnit) => ({
    //           ...prevUnit,
    //           UnitImages: index === null 
    //             ? [...(prevUnit.UnitImages || []), ...imageUrls] 
    //             : prevUnit.UnitImages.map((img, i) => (i === index ? imageUrls[0] : img)),
    //         }));
      
    //         const imagePreviews = uploadedFiles.map((file) => URL.createObjectURL(file));
    //         setImages((prevImages) => 
    //           index === null 
    //             ? [...prevImages, ...imagePreviews]
    //             : prevImages.map((img, i) => (i === index ? imagePreviews[0] : img))
    //         );
      
    //         setImagesFile((prevImagesFile) => 
    //           index === null 
    //             ? [...prevImagesFile, ...uploadedFiles]
    //             : prevImagesFile.map((file, i) => (i === index ? uploadedFiles[0] : file))
    //         );
      
    //         console.log("Images uploaded successfully:", uploadedImages);
    //       } catch (error) {
    //         console.error("Error uploading image:", error);
    //         toast({
    //           variant: "destructive",
    //           title: "Error Uploading Image",
    //           description: "There was an error uploading the images.",
    //         });
    //       }
    //     }
    //   };
      
    const handleDeleteImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };
    const handleVideoChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setVideo(URL.createObjectURL(file));
        }
    };

    const handleDeleteVideo = () => {
        setVideo("/assets/videos/units-video.mp4");
    };

    const fieldsData = [
        { id: 1, type: 'input', label: 'property_number', idField: 'propertyNumber', defaultValue: props?.unit?.propertyNumber },
        {
            id: 2,
            type: 'select',
            label: 'unit_for',
            idField: 'unitFor',
            defaultValue: props?.unit?.unitFor,
            options: props?.options?.UnitFor,
        },
        {
            id: 3,
            type: 'select',
            label: 'area',
            idField: 'area',
            defaultValue: props?.unit?.area,
            options: props?.options?.area,
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
        },
        { id: 7, type: 'input', label: 'building', idField: 'building', defaultValue: props?.unit?.building },
        { id: 8, type: 'input', label: 'the_floors', idField: 'theFloors', defaultValue: props?.unit?.theFloors },
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
        { id: 13, type: 'textarea', label: 'descriptions', idField: 'description', defaultValue: props?.unit?.description },
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
                </Card>
            </CardContent>
        </Card>
    );
}



