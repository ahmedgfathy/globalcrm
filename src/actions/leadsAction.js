import { databases, ID } from '@/services/appwrite/client'


const handleDatabaseOperation = async (operation, ...args) => {
  try {
    const response = await operation(...args);
    return response;
  } catch (error) {
    console.error(`Error during database operation:`, error);
    throw error;
  }
};


export const addLead = async (lead) => {
  return handleDatabaseOperation(
    databases.createDocument,
    process.env.NEXT_PUBLIC_DATABASE_ID, // Database ID
    process.env.NEXT_PUBLIC_LEADS, // Collection ID
    ID.unique(), // Unique document ID
    lead // Data
  );
};

export const getAllLeads = async () => {
  const response = await handleDatabaseOperation(
    databases.listDocuments,
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_LEADS
  );

  // Exclude collectionId and databaseId from each document
  const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
  return leads;
};

export const deleteLead = async (leadId) => {
  return handleDatabaseOperation(
    databases.deleteDocument,
    process.env.NEXT_PUBLIC_DATABASE_ID, 
    process.env.NEXT_PUBLIC_LEADS, 
    leadId 
  );
};

/*
provide the fields you want to change and the provided fields only
*/ 
export const updateLeadByID = async (leadId, updatedData) => {
  return handleDatabaseOperation(
    databases.updateDocument,
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_LEADS,
    leadId,
    updatedData
  );
};

export const getLeadById = async (leadId) => {
  return handleDatabaseOperation(
    databases.getDocument,
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_LEADS,
    leadId
  );
};

// Mock data for testing
const mockLead = {
    name: "Example Name",
    leadNumber: "12345",
    number: 1,
    lastFollowUp: "2024-11-12T10:30:00Z",
    description: "Lead description",
    clientFollowUp: "Follow-up notes",
    class: "Class type",
    assignedTo: "Assigned person",
    customerSource: "Source of customer",
    type: "Lead type",
    leadStatus: "Status of lead",
    modifiedTime: "2024-11-12T10:30:00Z",
    createdTime: "2024-11-12T09:00:00Z"
}

// Example usage
addLead(mockLead)
  .then((response) => {
    console.log('Lead created successfully:', response)
  })
  .catch((error) => {
    console.error('Error creating lead:', error)
  })
