import {useState} from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/app/context/TranslationContext";
const DropdownMenImportExport = ({ handleImportCSV, handleExportCSV }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {locale, t} = useTranslation()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="p-0 hover:bg-transparent">
          <Button className="bg-transparent border-none" variant="outline">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-max bg-gray-100 dark:bg-gray-900">
          <DropdownMenuGroup dir="rtl">
            <DropdownMenuItem
              className="hover:bg-transparent text-bold"
              onClick={() => setIsDialogOpen(true)}
            >
              {t("Import")}
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-transparent text-bold" onClick={handleExportCSV}>
              {t("Export")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
      <DialogContent locale={locale}>
    <DialogHeader>
      <DialogTitle>Upload Your File</DialogTitle>
      <DialogDescription>
        Choose a CSV file to import your data. Ensure the format is correct.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <Label
        htmlFor="file-upload"
        className="block p-4 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <span className="block text-center text-sm font-medium text-gray-600 dark:text-gray-300">
          Click to select a file
        </span>
        <Input
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleImportCSV}
        />
      </Label>
      {/* <Button
        className="w-full"
        variant="primary"
        onClick={() => {
          alert("File uploaded successfully!");
        }}
      >
        Upload File
      </Button> */}
    </div>
  </DialogContent>
      </Dialog>
    </>
  );
};



export default DropdownMenImportExport;


