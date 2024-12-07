// "use client";
// import { Card, CardContent } from "@/components/ui/card";
// import { useTranslation } from "@/app/context/TranslationContext";
// import FormFields from "../user-components/utils/FormFields";

// export default function UnitImageInformation({ page, setIsDisabled, isDisabled, ...props }) {
//     const { t } = useTranslation();
//     const fieldsData = [
//         { id: 1, type: 'taginput', label: 'links_pdf_details', idField: 'links', defaultValue: props?.unit?.links || []},
//     ];

//     return (
//         <Card className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden" dir="rtl">
//             <div className="header w-full flex justify-between items-center pb-4" dir="rtl">
//                 <p className="text-xl font-bold">{t("unit_image_information")}</p>
//             </div>
//             <CardContent className="w-11/12 max-sm:w-full  overflow-x-auto" >
//                 <FormFields fields={fieldsData} isDisabled={isDisabled} handleChange={props.handleChange} section={props.section} />
//             </CardContent>
//         </Card>
//     );
// }

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, VideoIcon as VideoPlus, X } from "lucide-react";
import { Image } from "antd";

export default function UnitImageInformation({
  handleImageChange,
  images,
  handleDeleteImage,
  unit,
}) {
  //   const [images, setImages] = useState([])
  const [videos, setVideos] = useState([]);

  //   const handleImageChange = (e) => {
  //     const files = e.target.files
  //     if (files) {
  //       const newImages = Array.from(files).map(file => URL.createObjectURL(file))
  //       setImages(prev => [...prev, ...newImages])
  //     }
  //   }

  const handleVideoUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newVideos = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setVideos((prev) => [...prev, ...newVideos]);
    }
  };
  const imagesUnit = unit?.propertyImage || images;
  //   const handleImageDelete = (index) => {
  //     setImages(images.filter((_, i) => i !== index))
  //   }

  return (
    <Card
      className="menu-drawer w-full h-max bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden"
      dir="rtl"
    >
      <CardHeader>
        <CardTitle>Media Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <Label>Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                >
                  {imagesUnit?.map((image, index) => (
                    <div
                      className="relative aspect-square rounded-lg overflow-hidden border group"
                      key={index}
                    >
                      <Image
                        src={image}
                        alt={`Uploaded image ${index + 1}`}
                        fill
                        className="object-cover h-full"
                      />
                      <button
                        onClick={() => handleDeleteImage()}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </Image.PreviewGroup>

                <label className="relative aspect-square rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/50 dark:border-[#5be49b33] dark:text-[#5be49b]">
                  <div className="text-center space-y-2">
                    <ImagePlus className="w-8 h-8 mx-auto text-muted-foreground dark:text-[#5be49b]" />
                    <span className="text-sm text-muted-foreground dark:text-[#5be49b]">
                      Upload Images
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            <div className="space-y-4">
              <Label>Videos</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden border"
                  >
                    <video
                      src={video}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                <label className="relative aspect-video rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/50 dark:border-[#5be49b33]">
                  <div className="text-center space-y-2">
                    <VideoPlus className="w-8 h-8 mx-auto text-muted-foreground dark:text-[#5be49b]" />
                    <span className="text-sm text-muted-foreground dark:text-[#5be49b]">
                      Upload Videos
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    multiple
                    onChange={handleVideoUpload}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Links PDF Details</Label>
            <Textarea placeholder="Enter PDF links or details" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
