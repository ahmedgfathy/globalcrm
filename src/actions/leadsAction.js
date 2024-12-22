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

export const getAllLeadsForTeamLead = async (limit = 10, offset = 0) => {
  try {
    // Step 1: Get the current user's ID
    const id = await getCurrentUserId();
    
    // Step 2: Fetch the current user document to get their salesmen array
    const res = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
      id
    );

    // Step 3: Extract the salesMen array from the user's document
    const salesMenArr = res.salesMen;
    salesMenArr.push(id) // important to get also the lead created by the team lead
    const allLeads = [];  
    let totalLeads = 0;   

    // Step 4: Loop over each salesman and fetch leads for them
    for (let i = 0; i < salesMenArr.length; i++) {
      const salesmanId = salesMenArr[i];  // Assuming salesmanId is used to filter leads

      // Step 5: Create query for each salesman
      const queries = [
        Query.equal('userId', salesmanId),  
        Query.limit(limit),                 
        Query.offset(offset),               
        Query.orderDesc('$createdAt')       
      ];

      // Step 6: Fetch leads for the current salesman using the fetchLeads helper function
      const { leads, totalLeads: leadsCount } = await fetchLeads(queries);


      allLeads.push(...leads);


      totalLeads += leadsCount;


      console.log(`Total leads for salesman ${salesmanId}:`, leadsCount);
    }

    // Step 8: Remove duplicates using a Map (lead.id as key)
    const uniqueLeads = Array.from(
      new Map(allLeads.map(lead => [lead.$id, lead])).values()
    );


    console.log('Unique leads for team lead:', uniqueLeads);
    return { allLeads: uniqueLeads, totalLeads };

  } catch (error) {
    console.error('Error fetching leads for team lead:', error);
    throw new Error('Failed to fetch leads');
  }
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

export const searchLeadsByType = async (searchTerm ,userId = null) => {
  return searchLeadsGeneric(searchTerm, userId, 'type');
};

export const searchLeadsByCustomerSource = async (searchTerm ,userId = null) => {
  return searchLeadsGeneric(searchTerm, userId, 'customerSource');
};

export const searchLeadsByLeadStatus = async (searchTerm ,userId = null) => {
  return searchLeadsGeneric(searchTerm, userId, 'leadStatus');
};

export const searchLeadsByClass = async (searchTerm ,userId = null) => {
  return searchLeadsGeneric(searchTerm, userId, 'class');
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
    console.log(leadsBySource);
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
    console.log(`Total leads added in the last month: ${totalLeadsLastMonth}`);
    return totalLeadsLastMonth;
  } catch (error) {
    console.error("Error fetching leads from the last month:", error);
    throw error;
  }
};



export const deleteAllLeads = async () => {
  try {
    let hasMoreDocuments = true;
    const limit = 1000; // Maximum items per request

    while (hasMoreDocuments) {
      // Fetch a batch of documents
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_LEADS,
        [Query.limit(limit)]
      );

      // Check if there are documents to delete
      if (response.documents.length === 0) {
        hasMoreDocuments = false;
        break;
      }

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
    }

    console.log('All leads deleted successfully.');
    return { success: true };
  } catch (error) {
    console.error('Error deleting all leads:', error);
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

    return { id: response.$id, fileUrl }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};




export const transferLead = async (leadIds, targetUserIds) => {
  try {
    // Ensure `leadIds` and `targetUserIds` are arrays of strings
    if (
      !Array.isArray(leadIds) ||
      !leadIds.every((id) => typeof id === 'string')
    ) {
      throw new Error('Invalid leadIds: All elements must be strings');
    }

    if (
      !Array.isArray(targetUserIds) ||
      !targetUserIds.every((id) => typeof id === 'string')
    ) {
      throw new Error('Invalid targetUserIds: All elements must be strings');
    }

    // Step 1: Get the current user's account
    const currentUserId = await getCurrentUserId();

    // Step 2: Update each lead document
    for (const leadId of leadIds) {
      const leadDoc = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_LEADS,
        leadId
      );

      // Remove the current user from the lead's userId array
      const updatedUserIds = leadDoc.userId.filter((id) => id !== currentUserId);

      // Add the target users to the lead's userId array
      const newUserIds = [...new Set([...updatedUserIds, ...targetUserIds])]; // Prevent duplicates

      console.log('Updated Users for Lead:', leadId, newUserIds);

      await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_LEADS,
        leadId,
        { userId: newUserIds } // Use a flat array of strings
      );
    }

    console.log('Leads transferred successfully.');
  } catch (error) {
    console.error('Error transferring leads:', error);
    throw error;
  }
};