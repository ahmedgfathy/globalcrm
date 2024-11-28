'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EntityPermissions } from './entity-permissions'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LEAD_FIELDS, UNIT_FIELDS } from '@/app/constants/fields'
import { useToast } from '@/hooks/use-toast'

const DEFAULT_PERMISSIONS = [
  ...LEAD_FIELDS.map(field => ({
    fieldId: field.fieldId,
    fieldName: field.fieldName,
    entityType: 'lead',
    canView: false,
    canEdit: false
  })),
  ...UNIT_FIELDS.map(field => ({
    fieldId: field.fieldId,
    fieldName: field.fieldName,
    entityType: 'unit',
    canView: false,
    canEdit: false
  }))
]

export default function RoleManagement() {
  const { toast } = useToast()
  const [roles, setRoles] = useState([])
  const [currentRole, setCurrentRole] = useState({
    id: '',
    name: '',
    permissions: [...DEFAULT_PERMISSIONS]
  })
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('lead')

  const handlePermissionChange = (fieldId, type, value) => {
    setCurrentRole(prev => ({
      ...prev,
      permissions: prev.permissions.map(permission => {
        if (permission.fieldId === fieldId && permission.entityType === activeTab) {
          if (type === 'canView' && !value) {
            return {
              ...permission,
              canView: false,
              canEdit: false
            }
          }
          return {
            ...permission,
            [type]: value
          }
        }
        return permission
      })
    }))
  }

  const handleSave = () => {
    if (!currentRole.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a role name",
        variant: "destructive"
      })
      return
    }

    if (isEditing) {
      setRoles(prev => prev.map(role => 
        role.id === currentRole.id ? currentRole : role
      ))
      toast({
        title: "Updated",
        description: "Role updated successfully",
        variant: "success"
      })
    } else {
      const newRole = {
        ...currentRole,
        id: crypto.randomUUID()
      }
      setRoles(prev => [...prev, newRole])
      toast({
        title: "Added",
        description: "Role added successfully",
        variant: "success"
      })
    }
    
    resetForm()
  }

  const handleEdit = (role) => {
    setCurrentRole(role)
    setIsEditing(true)
  }

  const handleDelete = (deleteRoleId) => {
    if (deleteRoleId) {
      setRoles(prev => prev.filter(role => role.id !== deleteRoleId))
      toast({
        title: "Deleted",
        description: "Role deleted successfully",
        variant: "success"
      })
    }
  }

  const resetForm = () => {
    setCurrentRole({
      id: '',
      name: '',
      permissions: [...DEFAULT_PERMISSIONS]
    })
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto">
      <Card className="bg-Lightbg dark:bg-cardbgDark">
        <CardHeader className="px-2">
          <CardTitle >{isEditing ? 'Edit Role' : 'Add New Role'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Role Name</label>
            <Input
              value={currentRole.name}
              onChange={(e) => setCurrentRole(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter role name"
              className="max-w-sm"
            />
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
            <TabsList>
              <TabsTrigger value="lead" className={`${activeTab === "lead" ? "bg-[#5be49b1a] text-[#5be49b]" : ""}`}>Leads</TabsTrigger>
              <TabsTrigger value="unit" className={`${activeTab === "unit" ? "bg-[#5be49b1a] text-[#5be49b]" : ""}`}>Units</TabsTrigger>
            </TabsList>
            <TabsContent value="lead">
              <EntityPermissions
                entityType="lead"
                permissions={currentRole.permissions}
                onPermissionChange={handlePermissionChange}
              />
            </TabsContent>
            <TabsContent value="unit">
              <EntityPermissions
                entityType="unit"
                permissions={currentRole.permissions}
                onPermissionChange={handlePermissionChange}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2">
            {isEditing && (
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
            <Button onClick={handleSave} className="bg-[#5be49b1a] text-[#5be49b]">
              {isEditing ? 'Update' : 'Save'} Permissions
            </Button>
          </div>
        </CardContent>
      </Card>

      {roles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Added Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roles.map(role => (
                <div key={role.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{role.name}</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={()=>handleDelete(role.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="lead">
                    <TabsList>
                      <TabsTrigger value="lead">Leads</TabsTrigger>
                      <TabsTrigger value="unit">Units</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lead">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-start">Field</TableHead>
                              <TableHead className="text-start">Permissions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {role.permissions
                              .filter(p => p.entityType === 'lead' && (p.canView || p.canEdit))
                              .map(permission => (
                                <TableRow key={permission.fieldId}>
                                  <TableCell>{permission.fieldName}</TableCell>
                                  <TableCell>
                                    <div className="space-x-2 space-x-reverse">
                                      {permission.canView && (
                                        <Badge variant="secondary">View</Badge>
                                      )}
                                      {permission.canEdit && (
                                        <Badge variant="secondary">Edit</Badge>
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
                              <TableHead className="text-start">Field</TableHead>
                              <TableHead className="text-start">Permissions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {role.permissions
                              .filter(p => p.entityType === 'unit' && (p.canView || p.canEdit))
                              .map(permission => (
                                <TableRow key={permission.fieldId}>
                                  <TableCell>{permission.fieldName}</TableCell>
                                  <TableCell>
                                    <div className="space-x-2 space-x-reverse">
                                      {permission.canView && (
                                        <Badge variant="secondary">View</Badge>
                                      )}
                                      {permission.canEdit && (
                                        <Badge variant="secondary">Edit</Badge>
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
