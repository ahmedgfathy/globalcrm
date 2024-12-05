import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "antd";
import React from "react";
import { Upload } from "lucide-react";

function ProjectForm({
  project,
  handleImageUpload,
  imagePreviews,
  handleLatitudeChange,
  coordinates,
  mapRef,
  handleLongitudeChange,
  handleChange,
  handleSubmit,
  buttonText // Added prop
}) {
  return (
    <form className="space-y-6 bg-Lightbg shadow-md dark:shadow-none dark:bg-cardbgDark p-6 rounded-lg w-full md:w-2/3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            name="projectName"
            placeholder="Enter project name"
            value={project?.projectName}
            onChange={handleChange}
            
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name (Developer)</Label>
          <Input
            id="companyName"
            name="companyName"
            placeholder="Enter company name"
            value={project?.companyName}
            onChange={handleChange}
            
          />
        </div>
      </div>

      <div className="space-y-2"> 
        <Label htmlFor="companyInfo">Company Information</Label>
        <Textarea
          id="companyInfo"
          name="companyInformation"
          placeholder="Enter company information"
          value={project?.companyInformation}
          onChange={handleChange}
          
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectInfo">Project Information</Label>
        <Textarea
          id="projectInfo"
          name="projectInformation"
          placeholder="Enter project information"
          value={project?.projectInformation}
          onChange={handleChange}
          
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Project Images</Label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-[#1a1f24] hover:bg-[#2a3138]"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {imagePreviews.map((src, idx) => (
                <Image
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Map</Label>
          <div
            ref={mapRef}
            style={{ height: "300px", width: "100%" }}
            className="bg-[#1a1f24] border border-gray-700 rounded-lg"
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            placeholder="Enter latitude"
            value={coordinates.lat}
            onChange={handleLatitudeChange}
            
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            placeholder="Enter longitude"
            value={coordinates.lng}
            onChange={handleLongitudeChange}
            
          />
        </div>
      </div>

      <Button
    type="submit"
    onClick={handleSubmit}
    className="w-full bg-[#5be49b1a] text-[#5be49b] hover:bg-[#5be49b33]"
  >
    {buttonText} {/* Use the buttonText prop */}
  </Button>
    </form>
  );
}

export default ProjectForm;
