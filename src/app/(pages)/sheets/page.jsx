"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getUserSheets, uploadSheets } from "@/actions/sheetSetting";
import { useToast } from "@/hooks/use-toast";
import { FileCard } from "@/app/components/sheets/FileCard";
import { Trash2 } from "lucide-react";

export default function FileManager() {
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [sheets, setSheets] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const validFiles = Array.from(e.target.files).filter(
        (file) => file instanceof File
      );
      setFiles([...files, ...validFiles]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const uploadResults = [];
    let allUploaded = true;

    try {
      for (const file of files) {
        try {
          const response = await uploadSheets(file);
          uploadResults.push({
            fileName: file.name,
            status: "Uploaded",
            fileUrl: response.fileUrl,
          });
          console.log(`File ${file.name} uploaded successfully.`);
        } catch (error) {
          uploadResults.push({
            fileName: file.name,
            status: "Failed",
            error: error.message,
          });
          console.error(`Error uploading ${file.name}:`, error);
          toast({
            variant: "destructive",
            title: "Error upload files",
            description: error.message || "There was an issue uploading files.",
            status: "error",
          });
          allUploaded = false;
        }
      }

      if (allUploaded) {
        toast({
          variant: "success",
          title: "Success upload files",
          description: "All files uploaded successfully.",
          status: "success",
        });
      }
    } catch (error) {
      console.error("Error in uploading process:", error);
    }

    setUploading(false);
    setFiles([]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  const getSheets = async () => {
    try {
      const data = await getUserSheets();
      setSheets(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching sheets:", error);
    }
  };

  useEffect(() => {
    getSheets();
  }, []);

  return (
    <div className="min-h-screen dark:bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">File Manager</h1>
        </div>

        <Card className="dark:bg-gray-800/50 ">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-4 justify-between">
              <div className="flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                <Button
                  onClick={openFileDialog}
                  variant="outline"
                  className="w-full "
                >
                  Choose Files
                </Button>
              </div>
              <Button
                onClick={handleUpload}
                disabled={!files.length || uploading}
                className="bg-green-500 hover:bg-green-400 px-8"
              >
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </div>

            {uploading && (
              <Progress value={progress} className="h-2 bg-gray-700" />
            )}

            <div className="mt-6 space-y-4">
              {files.length > 0 && (
                <div className="flex flex-col gap-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-600/50 p-3 rounded-lg">
                          <FileIcon className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-200 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => removeFile(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete file</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800/50 dark:border-gray-700">
          <CardContent className="p-6 space-y-6">
            <div className="mt-6 space-y-4">
              {sheets.length > 0 &&
                sheets.map((file, index) => (
                  <FileCard
                    key={index}
                    name={file.fileName}
                    onDownload={() =>
                      window.open(file?.fileUrl?.replace("view", "download"))
                    }
                    onDelete={() => console.log("del")}
                    onPreview={() => console.log("prev")}
                  />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
