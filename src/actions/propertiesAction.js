import { databases, ID, storage } from '@/services/appwrite/client';
import {Query} from "appwrite"

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

// export const deleteAllProperties = async () => {
//   try {
//     // Fetch all properties
//     const response = await databases.listDocuments(
//       process.env.NEXT_PUBLIC_DATABASE_ID,
//       process.env.NEXT_PUBLIC_PROPERTIES
//     );
//     console.log(response)
//     // Delete each property individually
//     // const deletePromises =  response.documents.map((document) =>
//     //   databases.deleteDocument(
//     //     process.env.NEXT_PUBLIC_DATABASE_ID,
//     //     process.env.NEXT_PUBLIC_PROPERTIES,
//     //     document.$id
//     //   )
//     // );

//     // Wait for all delete operations to complete
//     // await Promise.all(deletePromises);

//     console.log(deletePromises)
//     return { success: true };
//   } catch (error) {
//     console.error('Error deleting all properties:', error);
//     throw error;
//   }
// };
export const deleteAllProperties = async () => {
  try {
    let hasMoreDocuments = true;
    const limit = 100; // الحد الأقصى للعناصر لكل طلب

    while (hasMoreDocuments) {
      // Fetch a batch of documents
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROPERTIES,
      );

      // Check if there are documents to delete
      if (response.documents.length === 0) {
        hasMoreDocuments = false; 
        break;
      }

      // Delete each property individually
      const deletePromises = response.documents.map((document) =>
        databases.deleteDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_PROPERTIES,
          document.$id
        )
      );

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);
    }

    console.log('All properties deleted successfully.');
    return { success: true };
  } catch (error) {
    console.error('Error deleting all properties:', error);
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

export const searchPropertyByName = async (name) => {
  try {
    console.log('Searching for properties with name:', name);
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      [
        Query.contains('name', name)
      ]
    );

    console.log('Raw response:', response);

    // Exclude collectionId and databaseId from each document
    const properties = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
    console.log('Processed properties:', properties);
    return properties;
  } catch (error) {
    console.error('Error searching for properties by name:', error);
    throw error;
  }
};



// export const uploadPropertyImages = async (files) => {
//   try {
//     const uploadPromises = files.map(async (file) => {
//       const response = await storage.createFile(
//         process.env.NEXT_PUBLIC_PROPERTIES_BUCKET, 
//         ID.unique(), 
//         file 
//       );

//       // Get the view URL
//       const fileUrl = storage.getFileView(
//         process.env.NEXT_PUBLIC_PROPERTIES_BUCKET, // Bucket ID
//         response.$id // File ID
//       );

//       return { id: response.$id, fileUrl: fileUrl.href };
//     });

//     const uploadedFiles = await Promise.all(uploadPromises);
//     return uploadedFiles;
//   } catch (error) {
//     console.error('Error uploading property images:', error);
//     throw error;
//   }
// };

export const uploadPropertyImages = async (files) => {
  try {
    const response = await storage.createFile(
      process.env.NEXT_PUBLIC_PROPERTIES_BUCKET, // Bucket ID
      ID.unique(), // Unique file ID
      files // File to upload
    );

    // Get the view URL
    const fileUrl = storage.getFileView(
      process.env.NEXT_PUBLIC_PROPERTIES_BUCKET, // Bucket ID
      response.$id // File ID
    );

    return { id: response.$id, fileUrl: fileUrl.href };
  } catch (error) {
    console.error('Error uploading image:', error);
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


export const togglePropertyLiked = async (propertyId) => {
  try {

    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId
    );


    const updatedLiked = !document.liked;

    // Update the document with the new liked value
    const updatedDocument = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId,
      { liked: updatedLiked }
    );

    console.log('Updated document:', updatedDocument);
    return updatedDocument;
  } catch (error) {
    console.error('Error toggling liked field:', error);
    throw error;
  }
};

export const togglePropertyInHome = async (propertyId) => {
  try {
    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId
    );

    const updatedInHome = !document.inHome;

    const updatedDocument = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId,
      { inHome: updatedInHome }
    );

    console.log('Updated document:', updatedDocument);
    return updatedDocument;
  } catch (error) {
    console.error('Error toggling inHome field:', error);
    throw error;
  }
}; 
export const importProperties = async (data) => {
  try {
    console.log('Importing properties:', data);

    const batchSize = 50; 
    const batches = [];
    for (let i = 0; i < data.length; i += batchSize) {
      batches.push(data.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const responses = await Promise.all(
        batch.map(async (property) => {
          console.log(property)
          try {
            const response = await databases.createDocument(
              process.env.NEXT_PUBLIC_DATABASE_ID,
              process.env.NEXT_PUBLIC_PROPERTIES,
              ID.unique(), // Unique document ID
              property // Property data
            );
            return response;
          } catch (error) {
            console.error('Error creating document:', property, error.message);
            return null; // تجاهل الأخطاء الفردية واستمر
          }
        })
      );

      console.log(`Batch processed: ${responses.filter(Boolean).length} documents`);
    }

    console.log('All batches processed successfully.');
    return { success: true };
  } catch (error) {
    console.error('Error importing properties:', error);
    throw error;
  }
};

export const searchUnitByTypes = async (searchTerm) => {
  try {
    console.log('Searching for leads with type:', searchTerm);
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
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
export const searchUnitByCategory = async (searchTerm) => {
  try {
    console.log('Searching for leads with type:', searchTerm);
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      [
        Query.contains('category', searchTerm)
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

export const exportProperties = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      [
        Query.orderDesc('$createdAt')
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

    const properties = response.documents.map(({ 
      $collectionId, 
      $databaseId, 
      $id, 
      $permissions, 
      $updatedAt, 
      ...rest 
    }) => rest);

    console.log(properties);
    return { properties, totalProperties };
  } catch (error) {
    console.error('Error exporting properties:', error);
    throw error;
  }
};
// export const getPropertiesActivity = async () => {
//   try {
//     let allProperties = [];
//     let lastBatchSize = 0;
//     let offset = 0;
//     const limit = 100;

//     do {
//       const response = await databases.listDocuments(
//         process.env.NEXT_PUBLIC_DATABASE_ID,
//         process.env.NEXT_PUBLIC_PROPERTIES,
//         [
//           Query.limit(limit),
//           Query.offset(offset),
//         ]
//       );

//       allProperties = [...allProperties, ...response.documents];

//       lastBatchSize = response.documents.length;
//       offset += lastBatchSize;
//     } while (lastBatchSize > 0); 

//     const propertyActivity = allProperties.reduce((acc, property) => {
//       const activity = property.activity || "Unknown";
//       acc[activity] = (acc[activity] || 0) + 1;
//       return acc;
//     }, {});

//     console.log(propertyActivity);
//     return propertyActivity;
//   } catch (error) {
//     console.error("Error fetching leads by source:", error);
//     throw error;
//   }
// };
export const getPropertiesActivity = async () => {
  try {
    let allProperties = [];
    let lastDocument = null;
    const limit = 100;

    while (true) {
      const query = lastDocument
        ? [Query.limit(limit), Query.cursorAfter(lastDocument.$id)]
        : [Query.limit(limit)];

      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROPERTIES,
        query
      );

      allProperties = [...allProperties, ...response.documents];

      if (response.documents.length < limit) {
        break;
      }

      lastDocument = response.documents[response.documents.length - 1];
    }

    const propertyActivity = allProperties.reduce((acc, property) => {
      const activity = property.activity || "Unknown";
      acc[activity] = (acc[activity] || 0) + 1;
      return acc;
    }, {});

    console.log(propertyActivity);
    return propertyActivity;
  } catch (error) {
    console.error("Error fetching property activity:", error);
    throw error;
  }
};


//

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
