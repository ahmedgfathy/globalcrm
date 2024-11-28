import { ENTITY_TITLES, getFieldsByEntity } from '@/app/constants/fields';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function EntityPermissions({
  entityType,
  permissions,
  onPermissionChange
}) {
  const fields = getFieldsByEntity(entityType);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{ENTITY_TITLES[entityType]} Permissions</h3>
        <Separator className="mt-2" />
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">Field Name</TableHead>
            <TableHead className="text-start">View</TableHead>
            <TableHead className="text-start">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map(({ fieldId, fieldName }) => {
            const permission = permissions.find(p => p.fieldId === fieldId && p.entityType === entityType);
            const canView = permission ? permission.canView : false;
            const canEdit = permission ? permission.canEdit : false;

            return (
              <TableRow key={fieldId}>
                <TableCell className="font-medium">{fieldName}</TableCell>
                <TableCell className="text-start">
                    <Checkbox
                      checked={canView}
                      onCheckedChange={(checked) => 
                        onPermissionChange(fieldId, 'canView', checked)
                      }
                    />
                </TableCell>
                <TableCell className="text-start">
                    <Checkbox
                      checked={canEdit}
                      disabled={!canView}
                      onCheckedChange={(checked) => 
                        onPermissionChange(fieldId, 'canEdit', checked)
                      }
                    />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
