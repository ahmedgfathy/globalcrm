// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { EllipsisVertical } from "lucide-react";
// import { useTranslation } from "@/app/context/TranslationContext";

// export function DropdownMenImportExport() {
//   const { t } = useTranslation();

//   return (
//     <DropdownMenu >
//       <DropdownMenuTrigger asChild className="p-0 hover:bg-transparent">
//         <Button className="bg-transparent border-none" variant="outline">
//           <EllipsisVertical />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-max bg-gray-100 dark:bg-gray-900">
//         <DropdownMenuGroup dir="rtl">
//           <DropdownMenuItem className="hover:bg-transparent text-bold">
//             {t("Import")}
//           </DropdownMenuItem>
//           <DropdownMenuItem className="hover:bg-transparent text-bold">
//             {t("Export")}
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import Papa from "papaparse";
import { getAllLeads } from "@/actions/leadsAction";

const DropdownMenImportExport = ({ t }) => {
  const handleExportCSV = async () => {
    try {
      const { leads } = await getAllLeads(10000, 0);
      if (!leads || leads.length === 0) {
        alert("No leads available to export.");
        return;
      }

      const csv = Papa.unparse(leads);

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "leads.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting leads:", error);
      alert("Failed to export leads.");
    }
  };

  return (
    <DropdownMenu>
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
          <DropdownMenuItem
            className="hover:bg-transparent text-bold"
            onClick={handleExportCSV}
          >
            {t("Export")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenImportExport;
