export const LEAD_FIELDS = [
    { fieldId: 'number', fieldName: 'Number' },
    { fieldId: 'leadNumber', fieldName: 'lead_number' },
    { fieldId: 'name', fieldName: 'Client_name' },
    { fieldId: 'description', fieldName: 'descriptions' },
    { fieldId: 'class', fieldName: 'class' },
    { fieldId: 'clientFollowUp', fieldName: 'Client_follow_up' },
    { fieldId: 'lastFollowUp', fieldName: 'Last_Follow_up' },
    { fieldId: 'assignedTo', fieldName: 'Assigned_To' },
    { fieldId: 'customerSource', fieldName: 'Customer_Source' },
    { fieldId: 'type', fieldName: 'type' },
    { fieldId: 'leadStatus', fieldName: 'Lead_Status' },
    { fieldId: 'modifiedTime', fieldName: 'modified_time' },
    { fieldId: 'createdTime', fieldName: 'created_time' }
  ];
export const PROJECT_FIELDS = [
    { fieldId: 'projectInfo', fieldName: 'projectInformation' },
    { fieldId: 'projectName', fieldName: 'projectName' },
    { fieldId: 'companyName', fieldName: 'companyName' },
    { fieldId: 'companyInfo', fieldName: 'companyInformation' },
  ];
  
  export const UNIT_FIELDS = [
    { fieldId: 'area', fieldName: 'area' },
    { fieldId: 'unitFor', fieldName: 'unit_for' },
    { fieldId: 'propertyNumber', fieldName: 'property_number' },
    { fieldId: 'rooms', fieldName: 'rooms' },
    { fieldId: 'type', fieldName: 'type' },
    { fieldId: 'phase', fieldName: 'phase' },
    { fieldId: 'floors', fieldName: 'the_floors' },
    { fieldId: 'compound', fieldName: 'Compound' },
    { fieldId: 'status', fieldName: 'status' },
    { fieldId: 'activity', fieldName: 'activity' },
    { fieldId: 'lastFollowUp', fieldName: 'last_follow_up' },
    { fieldId: 'unitNo', fieldName: 'unit_no' },
    { fieldId: 'clientName', fieldName: 'Client_name' },
    { fieldId: 'tel', fieldName: 'Telephone' },
    { fieldId: 'mobileNo', fieldName: 'mobile_phone' },
    { fieldId: 'propertyOfferedBy', fieldName: 'property_offered_by' },
    { fieldId: 'updates', fieldName: 'update' },
    { fieldId: 'updateCalls', fieldName: 'update_calls' },
    { fieldId: 'category', fieldName: 'category' },
    { fieldId: 'sales', fieldName: 'sales' },
    { fieldId: 'handler', fieldName: 'handler' },
    { fieldId: 'landArea', fieldName: 'land_area' },
    { fieldId: 'rentTo', fieldName: 'rent_to' },
    { fieldId: 'rentFrom', fieldName: 'rent_from' },
    { fieldId: 'modifiedTime', fieldName: 'modified_time' },
    { fieldId: 'createdTime', fieldName: 'created_time' },
    { fieldId: 'currency', fieldName: 'currency' },
    { fieldId: 'propertyName', fieldName: 'property_name_compound_name' },
    { fieldId: 'pdfDetails', fieldName: 'links_pdf_details' }
  ];
  
  export const ENTITY_TITLES = {
    lead: 'leads',
    unit: 'units',
    project: 'project'
  };
  
  export const getFieldsByEntity = (entityType) => {
    switch (entityType) {
      case 'lead':
        return LEAD_FIELDS;
      case 'unit':
        return UNIT_FIELDS;
      case 'project':
        return PROJECT_FIELDS;
      default:
        return [];
    }
  };
  