import { databases, ID ,storage } from '@/services/appwrite/client';
import {Query} from "appwrite"
export const addLead = async (lead) => {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Database ID
      process.env.NEXT_PUBLIC_LEADS, // Collection ID
      ID.unique(), // Unique document ID
      lead // Data
    );
    return response;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

export const getAllLeads = async (limit = 10, offset = 0) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_LEADS,
      [
        Query.limit(limit),
        Query.offset(offset)
      ]
    );


    const totalResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_LEADS,
      [
        Query.limit(1),
        Query.offset(0)
      ]
    );

    const totalLeads = totalResponse.total;

    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    console.log(leads)
    return { leads, totalLeads };
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

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

export const updateLeadByID = async (leadId, updatedData) => {
  try {
    const sanitizedData = { ...updatedData };
    delete sanitizedData.$collectionId;
    delete sanitizedData.$databaseId; 
    delete sanitizedData.$id; 
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_LEADS, 
      leadId, 
      sanitizedData 
    );
    return response;
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
};

export const getLeadById = async (leadId) => {
  try {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      leadId
    );
    return response;
  } catch (error) {
    console.error('Error fetching lead:', error);
    throw error;
  }
};

export const uploadImageToBucket = async (file) => {
  try {
    const response = await storage.createFile(
      process.env.NEXT_PUBLIC_LEADS_BUCKET, // Bucket ID
      ID.unique(), // Unique file ID
      file // File to upload
    );

    // Get the view URL
    const fileUrl = storage.getFileView(
      process.env.NEXT_PUBLIC_LEADS_BUCKET, // Bucket ID
      response.$id // File ID
    );

    return { id: response.$id, fileUrl: fileUrl.href };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};



export const searchLeads = async (searchTerm) => {                                                                       
  try {
    console.log('Searching for leads with term:', searchTerm);
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [
        Query.or([
          Query.contains('name', searchTerm),
          Query.contains('leadNumber', searchTerm),
          Query.contains('number', searchTerm),

        ])
      ]
    );

    console.log('Raw response:', response);

    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    console.log('Processed leads:', leads);
    return leads;
  } catch (error) {
    console.error('Error searching for leads:', error);
    throw error;
  }
};

export const searchLeadsByType = async (searchTerm) => {
  try {
    console.log('Searching for leads with type:', searchTerm);
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [
        Query.contains('type', searchTerm)
      ]
    );

    console.log('Raw response:', response);

    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    console.log('Processed leads:', leads);
    return leads;
  } catch (error) {
    console.error('Error searching for leads by type:', error);
    throw error;
  } 
};

export const searchLeadsByCustomerSource = async (searchTerm) => {
  try {
    console.log('Searching for leads with type:', searchTerm);
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [
        Query.contains('customerSource', searchTerm)
      ]
    );

    console.log('Raw response:', response);

    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    console.log('Processed leads:', leads);
    return leads;
  } catch (error) {
    console.error('Error searching for leads by type:', error);
    throw error;
  }
};



// Mock data for testing
// const mockLead = {
//   name: "Example Name",
//   leadNumber: "12345",
//   number: 1,
//   lastFollowUp: "2024-11-12T10:30:00Z",
//   description: "Lead description",
//   clientFollowUp: "Follow-up notes",
//   class: "Class type",
//   assignedTo: "Assigned person",
//   customerSource: "Source of customer",
//   type: "Lead type",
//   leadStatus: "Status of lead",
//   modifiedTime: "2024-11-12T10:30:00Z",
//   createdTime: "2024-11-12T09:00:00Z"
// };

// // Example usage
// addLead(mockLead)
//   .then((response) => {
//     console.log('Lead created successfully:', response);
//   })
//   .catch((error) => {
//     console.error('Error creating lead:', error);
//   });