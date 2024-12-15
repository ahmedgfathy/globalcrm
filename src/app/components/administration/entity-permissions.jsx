import { ENTITY_TITLES, getFieldsByEntity } from '@/app/constants/fields';
import { useTranslation } from '@/app/context/TranslationContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function EntityPermissions({
  entityType,
  permissions,
  onPermissionChange,
  onSelectAll,
  canDelete,
  onDeletePermissionChange
}) {
  const fields = getFieldsByEntity(entityType);
  const { t } = useTranslation();

const allChecked = (type) => 
  fields.every(({ fieldId }) => 
    permissions.some(p => p.fieldId === fieldId && p.entityType === entityType && p[type])
  );
  const someChecked = (type) => permissions.some(p => p.entityType === entityType && p[type]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{t(`${ENTITY_TITLES[entityType]}`)} {t("Permissions")}</h3>
        <Separator className="mt-2" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">{t("Field_Name")}</TableHead>
            <TableHead className="text-start">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`selectAllView-${entityType}`}
                  checked={allChecked('canView')}
                  onCheckedChange={(checked) => onSelectAll(entityType, 'canView', checked)}
                  className="data-[state=checked]:dark:bg-[#5be49b1a] data-[state=checked]:dark:text-[#5be49b] dark:border-[#5be49b]"
                />
                <label htmlFor={`selectAllView-${entityType}`}>{t("view")}</label>
              </div>
            </TableHead>
            <TableHead className="text-start">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`selectAllEdit-${entityType}`}
                  checked={allChecked('canEdit')}
                  onCheckedChange={(checked) => onSelectAll(entityType, 'canEdit', checked)}
                  className="data-[state=checked]:dark:bg-[#5be49b1a] data-[state=checked]:dark:text-[#5be49b] dark:border-[#5be49b]"
                />
                <label htmlFor={`selectAllEdit-${entityType}`}>{t("edit")}</label>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map(({ fieldId, fieldName }) => {
            const permission = permissions.find(p => p.fieldId === fieldId && p.entityType === entityType);
            const canView = permission ? permission.canView : false;
            const canEdit = permission ? permission.canEdit : false;

            return (
              <TableRow key={fieldId}>
                <TableCell className="font-medium">{t(`${fieldName}`)}</TableCell>
                <TableCell className="text-start">
                  <Checkbox
                    checked={canView}
                    className="data-[state=checked]:dark:bg-[#5be49b1a] data-[state=checked]:dark:text-[#5be49b] dark:border-[#5be49b]"
                    onCheckedChange={(checked) =>
                      onPermissionChange(fieldId, 'canView', checked)
                    }
                  />
                </TableCell>
                <TableCell className="text-start">
                  <Checkbox
                    className="data-[state=checked]:dark:bg-[#5be49b1a] data-[state=checked]:dark:text-[#5be49b] dark:border-[#5be49b]"
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
      
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id={`canDelete-${entityType}`}
          checked={canDelete}
          onCheckedChange={onDeletePermissionChange}
          className="data-[state=checked]:dark:bg-[#5be49b1a] data-[state=checked]:dark:text-[#5be49b] dark:border-[#5be49b]"
        />
        <label htmlFor={`canDelete-${entityType}`}>{t(`Can Delete ${ENTITY_TITLES[entityType]}`)}</label>
      </div>
    </div>
  );
}

