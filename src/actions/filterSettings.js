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

export const createSettingsLeadDocument = async (data) => {
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

export const updateSettingsLeadDocument = async (data) => {
  try {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_FILTER_SETTINGS, 
      "67423f230023da0f7bef", 
      data // Updated document data
    );

    console.log('Document updated successfully:', response);
    return response;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};