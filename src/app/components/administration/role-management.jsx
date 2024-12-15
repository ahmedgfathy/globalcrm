"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EntityPermissions } from "./entity-permissions";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/app/context/TranslationContext";
import PermissionsModal from "./permissions-modal";

import {
  LEAD_FIELDS,
  PROJECT_FIELDS,
  UNIT_FIELDS,
} from "@/app/constants/fields";
import { Label } from "@/components/ui/label";

const DEFAULT_PERMISSIONS = [
  ...LEAD_FIELDS.map((field) => ({
    fieldId: field.fieldId,
    fieldName: field.fieldName,
    entityType: "lead",
    canView: false,
    canEdit: false,
  })),
  ...UNIT_FIELDS.map((field) => ({
    fieldId: field.fieldId,
    fieldName: field.fieldName,
    entityType: "unit",
    canView: false,
    canEdit: false,
  })),
  ...PROJECT_FIELDS.map((field) => ({
    fieldId: field.fieldId,
    fieldName: field.fieldName,
    entityType: "project",
    canView: false,
    canEdit: false,
  })),
];

export default function RoleManagement() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [roles, setRoles] = useState([]);
  const [currentRole, setCurrentRole] = useState({
    id: "",
    name: "",
    permissions: [...DEFAULT_PERMISSIONS],
    canDeleteLead: false,
    canDeleteUnit: false,
    canDeleteProject: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("lead");
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectAll = (entityType, type) => {
    setCurrentRole((prev) => {
      const allChecked = prev.permissions
        .filter((permission) => permission.entityType === entityType)
        .every((permission) => permission[type]);
  
      return {
        ...prev,
        permissions: prev.permissions.map((permission) =>
          permission.entityType === entityType
            ? {
                ...permission,
                [type]: !allChecked,
                ...(type === "canView" && allChecked ? { canEdit: false } : {}),
                ...(type === "canEdit" && !allChecked ? { canView: true } : {}),
              }
            : permission
        ),
      };
    });
  };
  

  const handleDeletePermissionChange = (entityType, value) => {
    setCurrentRole((prev) => ({
      ...prev,
      [`canDelete${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`]: value,
    }));
  };

  const handleShowPermissions = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handlePermissionChange = (fieldId, type, value) => {
    setCurrentRole((prev) => ({
      ...prev,
      permissions: prev.permissions.map((permission) => {
        if (
          permission.fieldId === fieldId &&
          permission.entityType === activeTab
        ) {
          return type === "canView" && !value
            ? { ...permission, canView: false, canEdit: false }
            : { ...permission, [type]: value };
        }
        return permission;
      }),
    }));
  };

  const handleSave = () => {
    if (!currentRole.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a role name",
        variant: "destructive",
      });
      return;
    }

    setRoles((prev) =>
      isEditing
        ? prev.map((role) => (role.id === currentRole.id ? currentRole : role))
        : [...prev, { ...currentRole, id: crypto.randomUUID() }]
    );

    toast({
      title: isEditing ? "Updated" : "Added",
      description: isEditing
        ? "Role updated successfully"
        : "Role added successfully",
      variant: "success",
    });

    resetForm();
  };

  const handleEdit = (role) => {
    setCurrentRole(role);
    setIsEditing(true);
  };

  const handleDelete = (deleteRoleId) => {
    setRoles((prev) => prev.filter((role) => role.id !== deleteRoleId));
    toast({
      title: t("Deleted"),
      description: t("Role_Deleted"),
      variant: "success",
    });
  };

  const resetForm = () => {
    setCurrentRole({
      id: "",
      name: "",
      permissions: [...DEFAULT_PERMISSIONS],
      canDeleteLead: false,
      canDeleteUnit: false,
      canDeleteProject: false,
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto">
      <Card className="bg-Lightbg dark:bg-cardbgDark">
        <CardHeader>
          <CardTitle>
            {isEditing ? t("Edit_Role") : t("Add_New_Role")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <Label className="text-sm font-medium">{t("Role_Name")}</Label>
            <Input
              value={currentRole.name}
              onChange={(e) =>
                setCurrentRole((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder={t("Enter_Role_Name")}
            />
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList>
              <TabsTrigger
                value="lead"
                className="data-[state=active]:dark:bg-[#5be49b1a] data-[state=active]:dark:text-[#5be49b]"
              >
                {t("leads")}
              </TabsTrigger>
              <TabsTrigger
                value="unit"
                className="data-[state=active]:dark:bg-[#5be49b1a] data-[state=active]:dark:text-[#5be49b]"
              >
                {t("units")}
              </TabsTrigger>
              <TabsTrigger
                value="project"
                className="data-[state=active]:dark:bg-[#5be49b1a] data-[state=active]:dark:text-[#5be49b]"
              >
                {t("projects")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lead">
              <EntityPermissions
                entityType="lead"
                permissions={currentRole.permissions}
                onPermissionChange={handlePermissionChange}
                onSelectAll={handleSelectAll}
                canDelete={currentRole.canDeleteLead}
                onDeletePermissionChange={(value) => handleDeletePermissionChange("lead", value)}
              />
            </TabsContent>

            <TabsContent value="unit">
              <EntityPermissions
                entityType="unit"
                permissions={currentRole.permissions}
                onPermissionChange={handlePermissionChange}
                onSelectAll={handleSelectAll}
                canDelete={currentRole.canDeleteUnit}
                onDeletePermissionChange={(value) => handleDeletePermissionChange("unit", value)}
              />
            </TabsContent>

            <TabsContent value="project">
              <EntityPermissions
                entityType="project"
                permissions={currentRole.permissions}
                onPermissionChange={handlePermissionChange}
                onSelectAll={handleSelectAll}
                canDelete={currentRole.canDeleteProject}
                onDeletePermissionChange={(value) => handleDeletePermissionChange("project", value)}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2">
            {isEditing && <Button onClick={resetForm}>{t("Cancel")}</Button>}
            <Button
              onClick={handleSave}
              className="bg-[#5be49b1a] text-[#5be49b]"
            >
              {isEditing ? t("update") : t("save")} Permissions
            </Button>
          </div>
        </CardContent>
      </Card>

      {roles.length > 0 && (
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>{t("Added_Roles")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Role_Name")}</TableHead>
                  <TableHead>{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.name}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(role)}
                      >
                        <Edit size={14} /> {t("Edit")}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(role.id)}
                      >
                        <Trash2 size={14} /> {t("Delete")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShowPermissions(role)}
                      >
                        {t("View_Permissions")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <PermissionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={selectedRole}
      />
    </div>
  );
}

