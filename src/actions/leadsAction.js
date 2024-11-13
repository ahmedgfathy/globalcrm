import { databases, ID } from '@/services/appwrite/client'

export const addLead = async (lead) => {
  console.log(lead)
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Database ID
      process.env.NEXT_PUBLIC_LEADS, // Collection ID
      ID.unique(), // Unique document ID
      lead // Data
    )
    return response
  } catch (error) {
    console.error('Error creating lead:', error)
    throw error
  }
}

export const getAllLeads = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_LEADS 
    );

    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);

    return leads;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}

export const deleteLead = async (leadId) => {
  try {
    const response = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Database ID
      process.env.NEXT_PUBLIC_LEADS, // Collection ID
      leadId // Document ID
    );
    return response;
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
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
