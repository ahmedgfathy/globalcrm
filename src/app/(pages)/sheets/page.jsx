"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileIcon, UploadIcon, Download, Eye, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { deleteSheet, getUserSheets, uploadSheets } from "@/actions/sheetSetting";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default function FileManager() {
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [sheets, setSheets] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const allowedFileTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf'
  ];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => 
      allowedFileTypes.includes(file.type)
    );

    if (validFiles.length !== selectedFiles.length) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Only Excel, Word and PDF files are allowed.",
      });
    }

    setFiles(validFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const progress = ((i + 1) / files.length) * 100;
      setUploadProgress(progress);
      
      try {
        await uploadSheets({
          file,
          fileName: file.name,
          fileSize: file.size,
          uploadDate: new Date().toISOString(), // Ensure proper date format
          owner: 'Current User', // Simplified owner handling
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: `Error uploading ${file.name}`,
          description: error.message,
        });
      }
    }
    
    setUploading(false);
    setFiles([]);
    setUploadProgress(0);
    getSheets();
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
  const handleDelete = async (fileId, sheetId) => {
    try {
      await deleteSheet(fileId, sheetId);
      await getSheets();  
      console.log("Sheet deleted successfully.");
    } catch (error) {
      console.error("Error deleting sheet:", error);
      alert("Failed to delete the sheet. Please try again.");
    }
  };

  // Add this helper function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return 'Invalid Date';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Document Management
          </h1>
          <Button
            onClick={openFileDialog}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <UploadIcon className="mr-2 h-5 w-5" />
            Upload Documents
          </Button>
        </div>

        {files.length > 0 && (
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {files.length} file(s) selected
                  </p>
                  <Button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {uploading ? 'Uploading...' : 'Upload Files'}
                  </Button>
                </div>
                {uploading && (
                  <Progress value={uploadProgress} className="h-2" />
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sheets.map((file) => (
                  <TableRow key={file.$id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4 text-blue-500" />
                        {file.fileName}
                      </div>
                    </TableCell>
                    <TableCell>{file.owner}</TableCell>
                    <TableCell>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </TableCell>
                    <TableCell>
                      {formatDate(file.uploadDate)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(file.fileUrl)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(file.fileUrl.replace("view", "download"))}
                          className="text-green-500 hover:text-green-700"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(file.fileId, file.$id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".xlsx,.xls,.doc,.docx,.pdf"
      />
    </div>
  );
}
