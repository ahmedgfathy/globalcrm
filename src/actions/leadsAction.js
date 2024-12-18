import { databases, ID ,storage } from '@/services/appwrite/client';
import {Query} from "appwrite"

export const addLead = async (lead) => {
  try {
    // Fetch the latest lead
    const latestLead = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [Query.orderDesc('leadNumber'), Query.limit(1)] // Sort by leadNumber descending
    );

    let nextLeadNumber = 'LEA1'; 

    if (latestLead.total > 0) {

      const lastLeadNumber = latestLead.documents[0].leadNumber;
      const numericPart = parseInt(lastLeadNumber.replace('LEA', ''), 10);
      
      // Increment the number and create the next leadNumber
      nextLeadNumber = `LEA${numericPart + 1}`;
    }

    // Add the new lead document
    const leadWithNumber = { ...lead, leadNumber: nextLeadNumber };

    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      ID.unique(),
      leadWithNumber
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
        Query.offset(offset),
        Query.orderDesc('$createdAt')
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

    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    return { leads, totalLeads };
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

export const getLeadsBySource = async () => {
  try {
    let allLeads = [];
    let lastBatchSize = 0;
    let offset = 0;
    const limit = 100;

    do {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_LEADS,
        [
          Query.limit(limit),
          Query.offset(offset),
        ]
      );

      allLeads = [...allLeads, ...response.documents];

      lastBatchSize = response.documents.length;
      offset += lastBatchSize;
    } while (lastBatchSize > 0); 

    const leadsBySource = allLeads.reduce((acc, lead) => {
      const source = lead.customerSource || "Unknown";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    return leadsBySource;
  } catch (error) {
    console.error("Error fetching leads by source:", error);
    throw error;
  }
};

export const getLastMonthLeadsCount = async () => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const oneMonthAgoISO = oneMonthAgo.toISOString();

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_LEADS, 
      [
        Query.greaterThan("$createdAt", oneMonthAgoISO),
      ]
    );

    const totalLeadsLastMonth = response.total;

    return totalLeadsLastMonth;
  } catch (error) {
    console.error("Error fetching leads from the last month:", error);
    throw error;
  }
};

export const exportLeads = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [
        Query.orderDesc('$createdAt')
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

    const leads = response.documents.map(({ 
      $collectionId, 
      $databaseId, 
      $id, 
      $permissions, 
      $updatedAt, 
      ...rest 
    }) => rest);

    return { leads, totalLeads };
  } catch (error) {
    console.error('Error exporting leads:', error);
    throw error;
  }
};

export const deleteLead = async (leadId) => {
  try {
    const response = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_LEADS, 
      leadId 
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
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [
        Query.contains('type', searchTerm)
      ]
    );

    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    return leads;
  } catch (error) {
    console.error('Error searching for leads by type:', error);
    throw error;
  } 
};

export const searchLeadsByCustomerSource = async (searchTerm) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [
        Query.contains('customerSource', searchTerm)
      ]
    );


    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    return leads;
  } catch (error) {
    console.error('Error searching for leads by type:', error);
    throw error;
  }
};

export const importLeads = async (data) => {
  try {
    const responses = await Promise.all(
      data.map(async (lead) => {
        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_LEADS,
          ID.unique(), // Unique document ID
          lead // Lead data
        );
        return response;
      })
    );
    return responses;
  } catch (error) {
    console.error('Error importing leads:', error);
    throw error;
  }
};

export const deleteAllLeads = async () => {
  try {
    // Fetch all leads
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS
    );

    // Delete each lead individually
    const deletePromises = response.documents.map((document) =>
      databases.deleteDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_LEADS,
        document.$id
      )
    );

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    return { success: true };
  } catch (error) {
    console.error('Error deleting all leads:', error);
    throw error;
  }
};

export const searchLeadsByLeadStatus = async (searchTerm) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [
        Query.contains('leadStatus', searchTerm)
      ]
    );


    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    return leads;
  } catch (error) {
    console.error('Error searching for leads by lead status:', error);
    throw error;
  }
};


export const searchLeadsByClass = async (searchTerm) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [
        Query.contains('class', searchTerm)
      ]
    );


    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    return leads;
  } catch (error) {
    console.error('Error searching for leads by class:', error);
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