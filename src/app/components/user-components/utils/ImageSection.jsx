import { Card, CardContent } from "@/components/ui/card";
import {Image} from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import "./style.css"
export default function ImageSection({ image, handleImageChange, handleDeleteImage, isDisabled }) {
  return (
    <Card className="overflow-hidden lg:col-span-1 h-48 lg:h-40">
      <CardContent className="p-0">
        <div className="relative w-full h-48 lg:h-40">
          <Image
            alt="Lead image"
            fill={true}
            className="object-cover w-full h-full"
            src={image}
          />
          {!isDisabled && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex space-x-2 gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => document.getElementById("imageInput")?.click()}
                disabled={isDisabled}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit image</span>
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={handleDeleteImage}
                disabled={isDisabled}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete image</span>
              </Button>
            </div>
          </div>
          )}
        </div>
      </CardContent>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        disabled={isDisabled}
      />
    </Card>
  );
}

ImageSection.propTypes = {
  image: PropTypes.string.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleDeleteImage: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
