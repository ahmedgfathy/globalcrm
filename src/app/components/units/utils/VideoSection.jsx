import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

export default function VideoSection({ video, handleVideoChange, handleDeleteVideo, isDisabled }) {
    return (
        <Card className="overflow-hidden lg:col-span-1 h-48 lg:h-40">
            <CardContent className="p-0">
            <div className="relative w-full h-48 lg:h-40">
    {video ? (
        <video
            controls
            className="object-cover w-full h-full"
            src={video}
        />
    ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <span className="text-gray-500">No video selected</span>
        </div>
    )}
    <div className="absolute top-2 right-2 flex space-x-2 gap-2">
        <Button
            size="icon"
            variant="secondary"
            onClick={() => document.getElementById("videoInput")?.click()}
            disabled={isDisabled}
        >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit video</span>
        </Button>
        <Button
            size="icon"
            variant="destructive"
            onClick={handleDeleteVideo}
            disabled={isDisabled}
        >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete video</span>
        </Button>
    </div>
</div>

            </CardContent>
            <input
                id="videoInput"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoChange}
                disabled={isDisabled}
            />
        </Card>
    );
}

VideoSection.propTypes = {
    video: PropTypes.string,
    handleVideoChange: PropTypes.func.isRequired,
    handleDeleteVideo: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};
