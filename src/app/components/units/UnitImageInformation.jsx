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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, VideoIcon as VideoPlus, X } from "lucide-react";
import { Image } from "antd";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function UnitImageInformation({
  handleImageChange,
  images,
  handleDeleteImage,
  unit,
  handleVideoUpload,
  videos,
  handleDeleteVideo,
  ...props
}) {
  const imagesUnit = typeof unit?.propertyImage === "string" 
  ? JSON.parse(unit.propertyImage)
  : unit?.propertyImage || images;

const videosUnit = typeof unit?.videos === "string"
  ? JSON.parse(unit.videos)
  : unit?.videos || videos;

  // setInterval(() => {
  //   console.log(imagesUnit)
  //   console.log(typeof imagesUnit)
  // }, 2000);

  return (
    <Card
      className="menu-drawer w-full bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden"
      dir="ltr"
    >
      <CardHeader>
        <CardTitle>Media Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <Label>Images</Label>
              <Image.PreviewGroup>
              <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                  {imagesUnit?.map((image, index) => (
                      <CarouselItem key={index}>
                    <div className="relative" >
                      <Image
                        src={image.fileUrl}
                        alt={`Uploaded image ${index + 1}`}
                        className="object-cover h-80 w-full"
                        />
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                        </CarouselItem>
                  ))}
              </CarouselContent>
              </Carousel>
              </Image.PreviewGroup>
              <label className="relative aspect-video rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/50 dark:border-[#5be49b33] dark:text-[#5be49b]">
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

            <div className="space-y-4">
              <Label>Videos</Label>
              <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {videosUnit?.map((video, index) => (
                   <CarouselItem key={index}>
                  <div className="relative group">
                    <video
                      src={video.fileUrl}
                      controls
                      className="w-full h-80 object-cover"
                    />
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1  opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  </CarouselItem>
                ))}
                </CarouselContent>
              </Carousel>

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
          <div className="space-y-2">
            <Label>Sales notes</Label>
            <Textarea
              placeholder="Enter Note"
              value={unit?.note}
              onChange={(e)=>props?.handleChange(null,"note", e.target.value)}
              id="note"
              name="note"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
