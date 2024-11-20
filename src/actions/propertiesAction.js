import { databases, ID,  } from '@/services/appwrite/client';
import {Query} from "appwrite"
import { deleteProperty } from '@/actions/propertiesAction';

export const addProperty = async (property) => {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Database ID
      process.env.NEXT_PUBLIC_PROPERTIES, // Collection ID
      ID.unique(), // Unique document ID
      property // Data
    );
    return response;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};

export const getAllProperties = async (limit = 10, offset = 0) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_PROPERTIES,
      [
        Query.limit(limit),
        Query.offset(offset)
      ]
    );

    const totalResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_PROPERTIES,
      [
        Query.limit(1),
        Query.offset(0)
      ]
    );

    const totalProperties = totalResponse.total;

    // Exclude collectionId and databaseId from each document
    const properties = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    return { properties, totalProperties };
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const deleteProperty = async (propertyId) => {
  try {
    const response = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Database ID
      process.env.NEXT_PUBLIC_PROPERTIES, // Collection ID
      propertyId // Document ID
    );
    return response;
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};

export const updatePropertyByID = async (propertyId, updatedData) => {
  try {
    const sanitizedData = { ...updatedData };
    delete sanitizedData.$collectionId;
    delete sanitizedData.$databaseId; 
    delete sanitizedData.$id; 
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_PROPERTIES, 
      propertyId, 
      sanitizedData 
    );
    return response;
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  } 
};

export const getPropertyById = async (propertyId) => {
  try {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId
    );
    return response;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};
export const uploadPropertyImages = async (files) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_PROPERTIES_BUCKET, 
        ID.unique(), 
        file 
      );

      // Get the view URL
      const fileUrl = storage.getFileView(
        process.env.NEXT_PUBLIC_PROPERTIES_BUCKET, // Bucket ID
        response.$id // File ID
      );

      return { id: response.$id, fileUrl: fileUrl.href };
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    return uploadedFiles;
  } catch (error) {
    console.error('Error uploading property images:', error);
    throw error;
  }
};

export const deletePropertyImage = async (fileId) => {
  try {
    const response = await storage.deleteFile(
      process.env.NEXT_PUBLIC_PROPERTIES_BUCKET, // Bucket ID
      fileId // File ID
    );
    return response;
  } catch (error) {
    console.error('Error deleting property image:', error);
    throw error;
  }
}
// Mock data for testing
// const mockProperty = {
//   name: "Example Property",
//   propertyNumber: "12345",
//   number: 1,
//   lastFollowUp: "2024-11-12T10:30:00Z",
//   description: "Property description",
//   clientFollowUp: "Follow-up notes",
//   class: "Class type",
//   assignedTo: "Assigned person",
//   customerSource: "Source of customer",
//   type: "Property type",
//   propertyStatus: "Status of property",
//   modifiedTime: "2024-11-12T10:30:00Z",
//   createdTime: "2024-11-12T09:00:00Z"
// };

// // Example usage
// addProperty(mockProperty)
//   .then((response) => {
//     console.log('Property created successfully:', response);
//   })
//   .catch((error) => {
//     console.error('Error creating property:', error);
//   });

















































//mock data for testing 
// {
//   "building": "",
//   "unitFor": "",
//   "propertyNumber": "",
//   "theFloors": "",
//   "area": "",
//   "finished": "",
//   "rooms": 0,
//   "unitFeatures": "",
//   "phase": "",
//   "note": "",
//   "totalPrice": 0,
//   "inOrOutSideCompound": "1000",
//   "description": "",
//   "lastFollowIn": "11-15-2024",
//   "status": "",
//   "activity": "",
//   "propertyOfferedBy": "",
//   "mobileNo": 0,
//   "name": "",
//   "tel": 0,
//   "unitNo": "",
//   "callUpdate": "",
//   "forUpdate": "",
//   "handler": "",
//   "sales": "",
//   "category": "",
//   "createdTime": "11-15-2024",
//   "modifiedTime": "11-15-2024",
//   "landArea": "",
//   "currency": "",
//   "rentFrom": "11-15-2024",
//   "rentTo": "11-15-2024",
//   "compoundName": "",
//   "propertyImage": [],
//   "links": []
// }
