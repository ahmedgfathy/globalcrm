import { account, databases, ID, storage } from "@/services/appwrite/client";
import { Query } from "appwrite";

const getCurrentUserId = async () => {
    try {
      const currentUser = await account.get();
      return currentUser.$id;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  };
  
  export const uploadSheets = async (file) => {
    const userId = await getCurrentUserId();
    if (!(file instanceof File)) {
      file = new File([file], file.name);
    }
  
    try {
      const fileResponse = await storage.createFile(
        process.env.NEXT_PUBLIC_SHEETS, 
        ID.unique(),
        file
      );
  
      const fileUrl = storage.getFileView(
        process.env.NEXT_PUBLIC_SHEETS,
        fileResponse.$id
      );
  
      const sheetResponse = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID, 
        process.env.NEXT_PUBLIC_SHEETS_COLLECTION_ID, 
        ID.unique(),
        {
          users: [userId],
          fileId: fileResponse.$id,
          fileName: file.name,
          fileUrl,
        }
      );
  
      const userDocument = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,  
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,  
        userId
      );
  
      const updatedSheets = Array.isArray(userDocument.sheets)
        ? [...userDocument.sheets, sheetResponse.$id] 
        : [sheetResponse.$id];
  
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,  
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,  
        userId,  
        { sheets: updatedSheets }
      );
  
      return { ...fileResponse, fileUrl };
    } catch (error) {
      console.error("Error uploading sheets:", error);
      throw error;
    }
  };
  
  export const getUserSheets = async () => {
    const userId = await getCurrentUserId();
  
    try {
      const userDocument = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,  
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,  
        userId
      );
  
      const sheetsArray = Array.isArray(userDocument.sheets) 
        ? userDocument.sheets 
        : [];
  
      if (sheetsArray.length === 0) {
        console.log("No sheets found for this user.");
        return [];
      }
        return sheetsArray;
    } catch (error) {
      console.error('Error fetching user sheets:', error);
      throw error;
    }
  };
  
  export const deleteSheet = async (fileId, sheetId) => {
    const userId = await getCurrentUserId();
  
    try {
      await storage.deleteFile(
        process.env.NEXT_PUBLIC_SHEETS, 
        fileId
      );
  
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID, 
        process.env.NEXT_PUBLIC_SHEETS_COLLECTION_ID, 
        sheetId
      );
  
      const userDocument = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID, 
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID, 
        userId
      );
  
      const updatedSheets = userDocument.sheets.filter(id => id !== sheetId);
  
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID, 
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID, 
        userId, 
        { sheets: updatedSheets }
      );
  
      console.log("File and sheet deleted successfully.");
    } catch (error) {
      console.error("Error deleting sheet:", error);
      throw error;
    }
  };
  
  