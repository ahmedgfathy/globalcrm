import { databases, ID, storage } from '@/services/appwrite/client';
import {Query} from "appwrite"


const dummyData = {
  settings: JSON.stringify({
    clientFollowUp: ["Follow Up 1", "Follow Up 2"],
    assignedTo: ["John Doe", "Jane Smith"],
    customerSource: ["Website", "Referral"],
    type: ["New", "Existing"],
    leadStatus: ["Open", "Closed"],
    class: ["Class A", "Class B"],
  })
};

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

export const updateSettingsLeadDocument = async (documentId, data) => {
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