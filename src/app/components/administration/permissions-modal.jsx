import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "@/app/context/TranslationContext";

function PermissionsModal({ isOpen, onClose, role }) {
  const { t } = useTranslation();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-Lightbg dark:bg-cardbgDark">
        <AlertDialogHeader>
          <AlertDialogTitle>{role?.name || t("Permissions")}</AlertDialogTitle>
          <AlertDialogDescription>
            <Tabs defaultValue="lead">
              <TabsList>
                <TabsTrigger value="lead">{t("leads")}</TabsTrigger>
                <TabsTrigger value="unit">{t("units")}</TabsTrigger>
              </TabsList>
              <TabsContent value="lead">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-start">{t("Field")}</TableHead>
                        <TableHead className="text-start">
                          {t("Permissions")}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {role?.permissions
                        .filter(
                          (p) => p.entityType === "lead" && (p.canView || p.canEdit)
                        )
                        .map((permission) => (
                          <TableRow key={permission.fieldId}>
                            <TableCell>{permission.fieldName}</TableCell>
                            <TableCell>
                              <div className="space-x-2 space-x-reverse">
                                {permission.canView && (
                                  <Badge variant="secondary">{t("view")}</Badge>
                                )}
                                {permission.canEdit && (
                                  <Badge variant="secondary">{t("edit")}</Badge>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="unit">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-start">{t("Field")}</TableHead>
                        <TableHead className="text-start">
                          {t("Permissions")}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {role?.permissions
                        .filter(
                          (p) => p.entityType === "unit" && (p.canView || p.canEdit)
                        )
                        .map((permission) => (
                          <TableRow key={permission.fieldId}>
                            <TableCell>{permission.fieldName}</TableCell>
                            <TableCell>
                              <div className="space-x-2 space-x-reverse">
                                {permission.canView && (
                                  <Badge variant="secondary">{t("view")}</Badge>
                                )}
                                {permission.canEdit && (
                                  <Badge variant="secondary">{t("edit")}</Badge>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
      
    </AlertDialog>
  );
}

export default PermissionsModal;
