import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import PropTypes from "prop-types";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function MultibleImages({
    images,
    handleImageChange,
    handleDeleteImage,
    isDisabled,
}) {
    return (
        <Card className="overflow-hidden lg:col-span-1 h-48 lg:h-40">
            <CardContent className="p-0">
                {images && images.length > 0 ? (
                    <Carousel className="relative w-full h-40 lg:h-32" dir="ltr">
                        <CarouselContent>
                            {images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative w-full h-40 lg:h-32">
                                        <Image
                                            alt={`Image ${index + 1}`}
                                            fill
                                            className="object-cover w-full h-full"
                                            src={image}
                                            onLoadingComplete={() => console.log(`Image ${index + 1} loaded`)}
                                            onError={() => console.error(`Failed to load image ${index + 1}`)}
                                        />

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="absolute top-2 right-2 flex space-x-2 gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    onClick={() =>
                                                        document.getElementById(`imageInput-${index}`)?.click()
                                                    }
                                                    disabled={isDisabled}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Edit image</span>
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteImage(index)}
                                                    disabled={isDisabled}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete image</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <input
                                            id={`imageInput-${index}`}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleImageChange(e, index)}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNext className="absolute right-1 top-1/2">
                            <Button
                                size="icon"
                                variant="secondary"
                            >
                                <ChevronRight className="h-5 w-5" />
                                <span className="sr-only">Next</span>
                            </Button>
                        </CarouselNext>
                        <CarouselPrevious className="absolute left-1 top-1/2">
                            <Button
                                size="icon"
                                variant="secondary"
                                disabled={isDisabled}
                            >
                                <ChevronLeft className="h-5 w-5" />
                                <span className="sr-only">Previous</span>
                            </Button>
                        </CarouselPrevious>

                    </Carousel>
                ) : (
                    <div className="flex items-center justify-center w-full h-40 lg:h-32 bg-gray-200">
                        <span className="text-gray-500">No images selected</span>
                    </div>
                )}
            </CardContent>
            <div className="pb-1 bg-gray-100 dark:bg-slate-400 flex justify-center items-center">
                <Button
                    size="icon"
                    variant="primary"
                    onClick={() => document.getElementById("imageInput-new")?.click()}
                    disabled={isDisabled}
                >
                    <Plus className="h-6 w-6 text-gray-500" />
                    <span className="sr-only">Add image</span>
                </Button>
                <input
                    id="imageInput-new"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageChange(e, images.length)}
                    disabled={isDisabled}
                />
            </div>
        </Card>
    );
}

MultibleImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleImageChange: PropTypes.func.isRequired,
    handleDeleteImage: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};
