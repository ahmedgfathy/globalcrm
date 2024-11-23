import { databases, ID, storage } from '@/services/appwrite/client';
import {Query} from "appwrite"


const dummyData = {
  leadSettings: JSON.stringify({
    clientFollowUp: ["Follow Up 1", "Follow Up 2"],
    assignedTo: ["John Doe", "Jane Smith"],
    customerSource: ["Website", "Referral"],
    type: ["New", "Existing"],
    leadStatus: ["Open", "Closed"],
    class: ["Class A", "Class B"],
  }),
  unitSettings: JSON.stringify({
    unitType: ["Type 1", "Type 2"],
    unitStatus: ["Available", "Occupied"],
    unitLocation: ["Location 1", "Location 2"],
  })
};

// Parse the JSON strings back into objects
// const leadSettings = JSON.parse(response.leadSettings);
// const unitSettings = JSON.parse(response.unitSettings);


const dummyDataProperties = {
  unitSettings: JSON.stringify({
    // put your data here like the previous example
  })
};

export const getAllSettings = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_FILTER_SETTINGS, 
    );

    console.log('Documents retrieved successfully:', response);
    return response.documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
}

export const createSettings = async (data) => {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_FILTER_SETTINGS, 
      ID.unique(), 
      data // Document data
    );

    console.log('Document created successfully:', response);
    return response;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const updateSettings = async (documentId, data) => {
  try {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_FILTER_SETTINGS, 
      documentId, 
      data // Updated document data
    );

    console.log('Document updated successfully:', response);
    return response;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};