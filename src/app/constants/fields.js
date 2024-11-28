export const LEAD_FIELDS = [
    { fieldId: 'number', fieldName: 'Number' },
    { fieldId: 'leadNumber', fieldName: 'Lead Number' },
    { fieldId: 'name', fieldName: 'Name' },
    { fieldId: 'description', fieldName: 'Description' },
    { fieldId: 'class', fieldName: 'Category' },
    { fieldId: 'clientFollowUp', fieldName: 'Client Follow-Up' },
    { fieldId: 'lastFollowUp', fieldName: 'Last Follow-Up' },
    { fieldId: 'assignedTo', fieldName: 'Assigned To' },
    { fieldId: 'customerSource', fieldName: 'Customer Source' },
    { fieldId: 'type', fieldName: 'Type' },
    { fieldId: 'leadStatus', fieldName: 'Lead Status' },
    { fieldId: 'modifiedTime', fieldName: 'Modified Time' },
    { fieldId: 'createdTime', fieldName: 'Created Time' }
  ];
  
  export const UNIT_FIELDS = [
    { fieldId: 'area', fieldName: 'Area' },
    { fieldId: 'unitFor', fieldName: 'Unit For' },
    { fieldId: 'propertyNumber', fieldName: 'Property Number' },
    { fieldId: 'rooms', fieldName: 'Rooms' },
    { fieldId: 'type', fieldName: 'Type' },
    { fieldId: 'phase', fieldName: 'Phase' },
    { fieldId: 'floors', fieldName: 'Floors' },
    { fieldId: 'compound', fieldName: 'Compound' },
    { fieldId: 'status', fieldName: 'Status' },
    { fieldId: 'activity', fieldName: 'Activity' },
    { fieldId: 'lastFollowUp', fieldName: 'Last Follow-Up' },
    { fieldId: 'unitNo', fieldName: 'Unit Number' },
    { fieldId: 'clientName', fieldName: 'Client Name' },
    { fieldId: 'tel', fieldName: 'Telephone' },
    { fieldId: 'mobileNo', fieldName: 'Mobile Number' },
    { fieldId: 'propertyOfferedBy', fieldName: 'Property Offered By' },
    { fieldId: 'updates', fieldName: 'Updates' },
    { fieldId: 'updateCalls', fieldName: 'Update Calls' },
    { fieldId: 'category', fieldName: 'Category' },
    { fieldId: 'sales', fieldName: 'Sales' },
    { fieldId: 'handler', fieldName: 'Handler' },
    { fieldId: 'landArea', fieldName: 'Land Area' },
    { fieldId: 'rentTo', fieldName: 'Rent To' },
    { fieldId: 'rentFrom', fieldName: 'Rent From' },
    { fieldId: 'modifiedTime', fieldName: 'Modified Time' },
    { fieldId: 'createdTime', fieldName: 'Created Time' },
    { fieldId: 'currency', fieldName: 'Currency' },
    { fieldId: 'propertyName', fieldName: 'Property Name' },
    { fieldId: 'pdfDetails', fieldName: 'PDF Details' }
  ];
  
  export const ENTITY_TITLES = {
    lead: 'Leads',
    unit: 'Units'
  };
  
  export const getFieldsByEntity = (entityType) => {
    switch (entityType) {
      case 'lead':
        return LEAD_FIELDS;
      case 'unit':
        return UNIT_FIELDS;
      default:
        return [];
    }
  };
  