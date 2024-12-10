import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImagePlus, VideoIcon as VideoPlus, X } from "lucide-react";
import { Image } from "antd";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import "./Style.css";

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
  const imageInputRef = useRef(null); // Image input ref
  const videoInputRef = useRef(null); // Video input ref

  const imagesUnit =
    typeof unit?.propertyImage === "string"
      ? JSON.parse(unit.propertyImage)
      : unit?.propertyImage || images;

  const videosUnit =
    typeof unit?.videos === "string"
      ? JSON.parse(unit.videos)
      : unit?.videos || videos;

  return (
    <Card
      className="menu-drawer w-full bg-Lightbg dark:bg-cardbgDark shadow-box_shadow dark:shadow-none pb-2 pt-2 overflow-x-hidden"
      dir="ltr"
    >
      <CardHeader>
        <CardTitle>Media Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 select-none">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Images Section */}
            <div className="space-y-4">
              <Image.PreviewGroup>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {imagesUnit?.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative media-item">
                          <Image
                            src={image.fileUrl}
                            alt={`Uploaded image ${index + 1}`}
                            className="object-cover w-full media-content"
                            width={400} // Pass as a number
                            height={400} // Pass as a number
                          />

                          <button
                            onClick={() => {
                              !props?.isDisabled && handleDeleteImage(image.id);
                            }}
                            className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 opacity-100 transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </CarouselItem>
                    ))}
                    <CarouselItem>
                      <label className="upload-label border border-dashed dark:border-[#5be49b] cursor-pointer">
                        <div className="text-center space-y-2">
                          <ImagePlus className="w-8 h-8 mx-auto text-muted-foreground dark:text-[#5be49b]" />
                          <span className="text-sm text-muted-foreground dark:text-[#5be49b]">
                            Upload Images
                          </span>
                        </div>
                        <input
                          type="file"
                          disabled={props.isDisabled}
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          ref={imageInputRef} // Assign ref
                        />
                      </label>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </Image.PreviewGroup>
              {/* Add More Button for Images */}
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => {
                    if (!props?.isDisabled && imageInputRef.current) {
                      imageInputRef.current.click();
                    }
                  }}
                  className="bg-green-200 text-green-600 font-bold rounded-full px-4 py-2 transition"
                >
                  Add More Images
                </Button>
              </div>
            </div>

            {/* Videos Section */}
            <div className="space-y-4">
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {videosUnit?.map((video, index) => (
                    <CarouselItem key={index}>
                      <div className="relative media-item">
                        <video
                          src={video.fileUrl}
                          controls
                          className="media-content object-cover w-full h-auto"
                        />
                        <button
                          onClick={() => {
                            !props?.isDisabled && handleDeleteVideo(video.id);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-100 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </CarouselItem>
                  ))}
                  <CarouselItem>
                    <label className="upload-label border border-dashed dark:border-[#5be49b] cursor-pointer">
                      <div className="text-center space-y-2">
                        <VideoPlus className="w-8 h-8 mx-auto text-muted-foreground dark:text-[#5be49b]" />
                        <span className="text-sm text-muted-foreground dark:text-[#5be49b]">
                          Upload Videos
                        </span>
                      </div>
                      <input
                        type="file"
                        disabled={props.isDisabled}
                        className="hidden"
                        accept="video/*"
                        multiple
                        onChange={handleVideoUpload}
                        ref={videoInputRef} // Assign ref
                      />
                    </label>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              {/* Add More Button for Videos */}
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => {
                    if (!props?.isDisabled && videoInputRef.current) {
                      videoInputRef.current.click();
                    }
                  }}
                  className="bg-green-200 text-green-600 font-bold rounded-full px-4 py-2 transition"
                >
                  Add More Videos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
