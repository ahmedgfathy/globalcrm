import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useTranslation } from "@/app/context/TranslationContext";

export function DropdownMenImportExport() {
  const { t } = useTranslation();

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild className="p-0 hover:bg-transparent">
        <Button className="bg-transparent border-none" variant="outline">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max bg-gray-100 dark:bg-gray-900">
        <DropdownMenuGroup dir="rtl">
          <DropdownMenuItem className="hover:bg-transparent text-bold">
            {t("Import")}
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-transparent text-bold">
            {t("Export")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
