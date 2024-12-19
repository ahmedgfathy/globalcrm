import { databases, ID, storage, account } from '@/services/appwrite/client';
import { Query } from "appwrite";

const getCurrentUserId = async () => {
  try {
    const currentUser = await account.get();
    return currentUser.$id || "";
  } catch (error) {
    console.warn('No user logged in, continuing without user ID.');
    return ""
  }
};


export const addLead = async (lead) => {
  try {
    const id = await getCurrentUserId();
    // Fetch the latest lead
    const latestLead = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [Query.orderDesc('$createdAt'), Query.limit(1)] // Sort by leadNumber descending
    );
    console.log(latestLead);
    let nextLeadNumber = 'LEA1';

    if (latestLead.total > 0) {
      const lastLeadNumber = latestLead.documents[0].leadNumber;
      const numericPart = parseInt(lastLeadNumber.replace('LEA', ''), 10);
      // Increment the number and create the next leadNumber
      nextLeadNumber = `LEA${numericPart + 1}`;
    }

    // Add the new lead document
    const leadWithNumber = { ...lead, leadNumber: nextLeadNumber, userId: [id] };

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

const fetchLeads = async (queries) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      queries
    );

    const totalResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      [Query.limit(1), Query.offset(0)]
    );

    const totalLeads = totalResponse.total;
    const leads = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);

    return { leads, totalLeads };
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

export const getAllLeads = async (limit = 10, offset = 0) => {
  const queries = [
    Query.limit(limit),
    Query.offset(offset),
    Query.orderDesc('$createdAt')
  ];
  return fetchLeads(queries);
};

export const getAllLeadsForUser = async (limit = 10, offset = 0) => {
  const id = await getCurrentUserId();
  const queries = [
    Query.equal('userId', id),
    Query.limit(limit),
    Query.offset(offset),
    Query.orderDesc('$createdAt')
  ];
  return fetchLeads(queries);
};

const searchLeadsGeneric = async (searchTerm, userId = null, field = 'name') => {
  try {
    console.log(`Searching for leads with term: ${searchTerm}`);

    const queries = [];

    if (userId) {
      queries.push(Query.equal('userId', userId)); // Ensure search is scoped to the user
    }

    if (searchTerm) {
      queries.push(
        Query.or([
          Query.contains(field, searchTerm),
          Query.contains('leadNumber', searchTerm),
          Query.contains('number', searchTerm),
        ])
      );
    }

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_LEADS,
      queries
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

export const searchLeads = async (searchTerm, userId = null) => {
  return searchLeadsGeneric(searchTerm, userId);
};

export const searchLeadsByType = async (searchTerm) => {
  return searchLeadsGeneric(searchTerm, null, 'type');
};

export const searchLeadsByCustomerSource = async (searchTerm) => {
  return searchLeadsGeneric(searchTerm, null, 'customerSource');
};

export const searchLeadsByLeadStatus = async (searchTerm) => {
  return searchLeadsGeneric(searchTerm, null, 'leadStatus');
};

export const searchLeadsByClass = async (searchTerm) => {
  return searchLeadsGeneric(searchTerm, null, 'class');
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

// Other functions remain unchanged...