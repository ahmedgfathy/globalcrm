import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CustomButton from "../CustomButton"
import { FaFileExport, FaFileImport } from "react-icons/fa"
import { EllipsisVertical } from "lucide-react"
import { useTranslation } from "@/app/context/TranslationContext"

export function DropdownMenImportExport() {
    const { t } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent border-none" variant="outline"><EllipsisVertical /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-100 dark:bg-gray-900">
                <DropdownMenuGroup dir="rtl">
                    <DropdownMenuItem className="hover:bg-transparent">
                        <CustomButton title={t("import")} fun={() => alert("Importing...")} icon={() => <FaFileImport />} className="max-sm:w-1/3 GreenButton" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-transparent">
                        <CustomButton title={t("export")} fun={() => alert("Exporting...")} icon={() => <FaFileExport />} className="max-sm:w-1/3 GreenButton" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
