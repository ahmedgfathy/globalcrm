"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import CustomButton from "../CustomButton";
import { useTranslation } from "@/app/context/TranslationContext";
import DeleteButton from "../delete-button/DeleteButton";

const availablePermissions = [
  { id: "add_lead", name: "اضافه عميل" },
  { id: "add_unit", name: "اضافه وحده" },
  { id: "delete_lead", name: "حذف عميل" },
  { id: "delete_unit", name: "حذف وحده" },
  { id: "edit_lead", name: "تعديل عميل" },
  { id: "edit_unit", name: "تعديل وحده" },
  { id: "manage_settings", name: "إدارة الإعدادات" },
];

export default function RoleManagement() {
  const {locale , t} = useTranslation()
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [editingRoleId, setEditingRoleId] = useState(null);

  const handleAddRole = () => {
    if (newRoleName && selectedPermissions.length > 0) {
      const newRole = {
        id: Date.now().toString(),
        name: newRoleName,
        permissions: selectedPermissions,
      };
      setRoles([...roles, newRole]);
      setNewRoleName("");
      setSelectedPermissions([]);
    }
  };

  const handleEditRole = (role) => {
    setEditingRoleId(role.id);
    setNewRoleName(role.name);
    setSelectedPermissions(role.permissions);
  };

  const handleUpdateRole = () => {
    if (editingRoleId && newRoleName && selectedPermissions.length > 0) {
      setRoles(
        roles.map((role) =>
          role.id === editingRoleId
            ? { ...role, name: newRoleName, permissions: selectedPermissions }
            : role
        )
      );
      setEditingRoleId(null);
      setNewRoleName("");
      setSelectedPermissions([]);
    }
  };

  const handleDeleteRole = (roleId) => {
    return new Promise((resolve) => {
      setRoles(roles.filter((role) => role.id !== roleId));
      resolve();
    });
  };
  

  const handlePermissionChange = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  return (
    <Card className="menu-drawer w-full h-max min-h-screen bg-transparent border-none shadow-none p-0 overflow-x-hidden" dir={locale === "ar"? "rtl" : "ltr"}>
      <CardHeader className="text-xl md:text-2xl flex justify-between w-full flex-row items-center p-1 ">
        <div>
          <CardTitle className="pb-1 font-bold">
            {t("Manage_roles_and_permissions")}
          </CardTitle>
        </div>
        <div>
          <CustomButton title={t("save")} />
        </div>
      </CardHeader>
      <CardContent className="p-1">
        <div className="container mx-auto p-1 space-y-6">
          <Card className="bg-Lightbg dark:bg-cardbgDark">
            <CardHeader>
              <CardTitle>
                {editingRoleId ? t("Edit_Role") : t("Add_New_Role")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="roleName">{t("Role_Name")}</Label>
                <Input
                  id="roleName"
                  className="dark:placeholder:text-gray-300"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder={t("Enter_Role_Name")}
                />
              </div>

              <div>
                <Label>{t("Permissions")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availablePermissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center ms-2 gap-2"
                    >
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={() =>
                          handlePermissionChange(permission.id)
                        }
                      />
                      <Label htmlFor={permission.id}>{permission.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={editingRoleId ? handleUpdateRole : handleAddRole}
                style={{
                  backgroundColor: "rgba(91, 228, 155, 0.1)",
                  color: "#5be49b",
                }}
              >
                {editingRoleId ? t("Edit_Role") : t("Add_New_Role")}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-Lightbg dark:bg-cardbgDark">
            <CardHeader>
              <CardTitle>{t("Current_roles")}</CardTitle>
            </CardHeader>
            <CardContent>
              {roles.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Role Name</TableHead>
                      {availablePermissions.map((permission) => (
                        <TableHead className="text-center" key={permission.id}>
                          {permission.name}
                        </TableHead>
                      ))}
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium text-center">
                          {role.name}
                        </TableCell>
                        {availablePermissions.map((permission) => (
                          <TableCell className="text-center" key={permission.id}>
                            {role.permissions.includes(permission.id)
                              ? "✓"
                              : "-"}
                          </TableCell>
                        ))}
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditRole(role)}
                              aria-label={`Edit role ${role.name}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <DeleteButton
                            handleDelete={() => handleDeleteRole(role.id)}
                            />
                            {/* <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeleteRole(role.id)}
                              aria-label={`Delete role ${role.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>{t("There_are_no_roles_added_yet")}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
