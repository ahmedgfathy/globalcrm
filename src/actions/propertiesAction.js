import { databases, ID, storage } from '@/services/appwrite/client'
import { Query } from 'appwrite'

export const addProperty = async (property) => {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Database ID
      process.env.NEXT_PUBLIC_PROPERTIES, // Collection ID
      ID.unique(), // Unique document ID
      property // Data
    )
    return response
  } catch (error) {
    console.error('Error creating property:', error)
    throw error
  }
}

export const getAllProperties = async (limit = 10, offset = 0) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      [Query.limit(limit), Query.offset(offset)]
    )

    const totalResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      [Query.limit(1), Query.offset(0)]
    )

    const totalProperties = totalResponse.total

    // Exclude collectionId and databaseId from each document
    const properties = response.documents.map(
      ({ collectionId, databaseId, ...rest }) => rest
    )
    return { properties, totalProperties }
  } catch (error) {
    console.error('Error fetching properties:', error)
    throw error
  }
}

export const deleteProperty = async (propertyId) => {
  try {
    const response = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Database ID
      process.env.NEXT_PUBLIC_PROPERTIES, // Collection ID
      propertyId // Document ID
    )
    return response
  } catch (error) {
    console.error('Error deleting property:', error)
    throw error
  }
}

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
    let offset = 0;

    while (hasMoreDocuments) {
      // Fetch a batch of documents
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROPERTIES,
        [Query.limit(limit), Query.offset(offset)]
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

      // Increase offset to fetch next batch
      offset += limit;
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
    const sanitizedData = { ...updatedData }
    delete sanitizedData.$collectionId
    delete sanitizedData.$databaseId
    delete sanitizedData.$id
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId,
      sanitizedData
    )
    return response
  } catch (error) {
    console.error('Error updating property:', error)
    throw error
  }
}

export const getPropertyById = async (propertyId) => {
  try {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId
    )
    return response
  } catch (error) {
    console.error('Error fetching property:', error)
    throw error
  }
}

export const searchPropertyByName = async (name) => {
  try {
    console.log('Searching for properties with name:', name)
    const queries = []

    if (name) {
      queries.push(
        Query.or([
          Query.contains('name', name),
          Query.contains('mobileNo', name),
        ])
      )
    }

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      queries
    )

    console.log('Raw response:', response)

    // Exclude collectionId and databaseId from each document
    const properties = response.documents.map(
      ({ collectionId, databaseId, ...rest }) => rest
    )
    console.log('Processed properties:', properties)
    return properties
  } catch (error) {
    console.error('Error searching for properties by name:', error)
    throw error
  }
}
export const searchPropertyByRange = async (from, to, page = 1, limit = 10) => {
  try {
    if (
      !process.env.NEXT_PUBLIC_DATABASE_ID ||
      !process.env.NEXT_PUBLIC_PROPERTIES
    ) {
      throw new Error('Missing environment variables')
    }

    if (from === undefined && to === undefined) {
      console.log('No range provided.')
      return { properties: [], total: 0 }
    }

    const queries = []

    if (from !== undefined && to !== undefined) {
      queries.push(Query.between('totalPrice', +from, +to))
    } else if (from !== undefined) {
      queries.push(Query.greaterThanEqual('totalPrice', +from))
    } else if (to !== undefined) {
      queries.push(Query.lessEqual('totalPrice', +to))
    }

    const offset = (page - 1) * limit
    queries.push(Query.limit(limit), Query.offset(offset))

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      queries
    )

    console.log('Raw response:', response)

    const properties = response.documents.map(
      ({ collectionId, databaseId, ...rest }) => rest
    )
    console.log('Processed properties:', properties)

    return { properties, total: response.total }
  } catch (error) {
    console.error('Error searching for properties by range:', {
      from,
      to,
      page,
      limit,
      error,
    })
    throw error
  }
}

// export const searchPropertyByRange = async (from, to) => {
//   try {
//     console.log('Searching for properties with totalPrice from:', from, 'to:', to);
//     const queries = [];

//     if (from !== undefined && to !== undefined) {
//       queries.push(Query.between('totalPrice', from, to));
//     } else if (from !== undefined) {
//       queries.push(Query.greaterThanEqual('totalPrice', from));
//     } else if (to !== undefined) {
//       queries.push(Query.lessEqual('totalPrice', to));
//     }

//     const response = await databases.listDocuments(
//       process.env.NEXT_PUBLIC_DATABASE_ID,
//       process.env.NEXT_PUBLIC_PROPERTIES,
//       queries
//     );

//     console.log('Raw response:', response);

//     // Exclude collectionId and databaseId from each document
//     const properties = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
//     console.log('Processed properties:', properties);
//     return {properties, total: response.total};
//   } catch (error) {
//     console.error('Error searching for properties by range:', error);
//     throw error;
//   }
// };

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
    )

    // Get the view URL
    const fileUrl = storage.getFileView(
      process.env.NEXT_PUBLIC_PROPERTIES_BUCKET, // Bucket ID
      response.$id // File ID
    )

    return { id: response.$id, fileUrl: fileUrl.href }
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const deletePropertyImage = async (fileId) => {
  try {
    const response = await storage.deleteFile(
      process.env.NEXT_PUBLIC_PROPERTIES_BUCKET, // Bucket ID
      fileId // File ID
    )
    return response
  } catch (error) {
    console.error('Error deleting property image:', error)
    throw error
  }
}


export const uploadPropertyVideo = async (file) => {
  try {
    const response = await storage.createFile(
      process.env.NEXT_PUBLIC_PROPERTIES_VIDEOS, 
      ID.unique(),
      file
    );

    const fileUrl = storage.getFileView(
      process.env.NEXT_PUBLIC_PROPERTIES_VIDEOS,
      response.$id
    );

    return { ...response, fileUrl }; 
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};


export const deletePropertyVideo = async (fileId) => {
  try {
    const response = await storage.deleteFile(
      process.env.NEXT_PUBLIC_PROPERTIES_VIDEOS,
      fileId
    )
    return response
  } catch (error) {
    console.error('Error deleting property video:', error)
    throw error
  }
}

export const togglePropertyLiked = async (propertyId) => {
  try {
    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId
    )

    const updatedLiked = !document.liked

    // Update the document with the new liked value
    const updatedDocument = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId,
      { liked: updatedLiked }
    )

    console.log('Updated document:', updatedDocument)
    return updatedDocument
  } catch (error) {
    console.error('Error toggling liked field:', error)
    throw error
  }
}

export const togglePropertyInHome = async (propertyId) => {
  try {
    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId
    )

    const updatedInHome = !document.inHome

    const updatedDocument = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      propertyId,
      { inHome: updatedInHome }
    )

    console.log('Updated document:', updatedDocument)
    return updatedDocument
  } catch (error) {
    console.error('Error toggling inHome field:', error)
    throw error
  }
}

export const importProperties = async (data) => {
  console.log('Starting to import properties:', data);

  const batchSize = 50;
  const batches = [];

  for (let i = 0; i < data.length; i += batchSize) {
    batches.push(data.slice(i, i + batchSize));
  }

  const errors = []; 

  for (const batch of batches) {
    for (const property of batch) {
      try {
        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_PROPERTIES,
          ID.unique(), 
          property
        );
        console.log('Document created:', response);
      } catch (error) {
        if (error.message.includes('Document with the requested ID already exists')) {
          console.warn(`Skipping duplicate document for propertyNumber: ${property.propertyNumber}`);
        } else {
          console.error('Error creating document:', property, error.message);
          errors.push({ property, error: error.message }); 
        }
      }
    }
    console.log(`Batch processed: ${batch.length} documents`);
  }

  if (errors.length > 0) {
    console.error('Import completed with errors:', errors);
    return { success: false, errors };
  }

  console.log('All batches processed successfully.');
  return { success: true };
};


// export const importProperties = async (data) => {
//   try {
//     console.log('Importing properties:', data)

//     const batchSize = 50
//     const batches = []
//     for (let i = 0; i < data.length; i += batchSize) {
//       batches.push(data.slice(i, i + batchSize))
//     }

//     for (const batch of batches) {
//       const responses = await Promise.all(
//         batch.map(async (property) => {
//           console.log(property)
//           try {
//             const response = await databases.createDocument(
//               process.env.NEXT_PUBLIC_DATABASE_ID,
//               process.env.NEXT_PUBLIC_PROPERTIES,
//               ID.unique(), // Unique document ID
//               property // Property data
//             )
//             return response
//           } catch (error) {
//             console.error('Error creating document:', property, error.message)
//             return null // تجاهل الأخطاء الفردية واستمر
//           }
//         })
//       )

//       console.log(
//         `Batch processed: ${responses.filter(Boolean).length} documents`
//       )
//     }

//     console.log('All batches processed successfully.')
//     return { success: true }
//   } catch (error) {
//     console.error('Error importing properties:', error)
//     throw error

//   }
// }
// export const importProperties = async (data) => {
//   try {
//     console.log('Starting to import properties:', data);

//     const batchSize = 50;
//     const batches = [];

//     for (let i = 0; i < data.length; i += batchSize) {
//       batches.push(data.slice(i, i + batchSize));
//     }

//     for (const batch of batches) {
//       for (const property of batch) {
//         try {
//           const response = await databases.createDocument(
//             process.env.NEXT_PUBLIC_DATABASE_ID,
//             process.env.NEXT_PUBLIC_PROPERTIES,
//             ID.unique(), 
//             property
//           );
//           console.log('Document created:', response);
//         } catch (error) {
//           if (
//             error.message.includes(
//               'Document with the requested ID already exists'
//             )
//           ) {
//             console.warn(
//               `Skipping duplicate document for propertyNumber: ${property.propertyNumber}`
//             );
//           } else {
//             console.error('Error creating document:', property, error.message);
//             throw error;
//           }
//         }
//       }
//       console.log(`Batch processed: ${batch.length} documents`);
//     }

//     console.log('All batches processed successfully.');
//     return { success: true };
//   } catch (error) {
//     console.error('Error importing properties:', error);
//     throw error;
//   }
// };

export const searchUnitByTypes = async (searchTerm) => {
  try {
    console.log('Searching for leads with type:', searchTerm)
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      [Query.contains('type', searchTerm)]
    )

    console.log('Raw response:', response)

    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(
      ({ collectionId, databaseId, ...rest }) => rest
    )
    console.log('Processed leads:', leads)
    return leads
  } catch (error) {
    console.error('Error searching for leads by type:', error)
    throw error
  }
}

export const searchUnitByCategory = async (searchTerm) => {
  try {
    console.log('Searching for leads with type:', searchTerm)
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      [Query.contains('category', searchTerm)]
    )

    console.log('Raw response:', response)

    // Exclude collectionId and databaseId from each document
    const leads = response.documents.map(
      ({ collectionId, databaseId, ...rest }) => rest
    )
    console.log('Processed leads:', leads)
    return leads
  } catch (error) {
    console.error('Error searching for leads by type:', error)
    throw error
  }
}

// export const exportProperties = async () => {
//   try {
//     const response = await databases.listDocuments(
//       process.env.NEXT_PUBLIC_DATABASE_ID,
//       process.env.NEXT_PUBLIC_PROPERTIES,
//       [Query.orderDesc('$createdAt')]
//     )

//     const totalResponse = await databases.listDocuments(
//       process.env.NEXT_PUBLIC_DATABASE_ID,
//       process.env.NEXT_PUBLIC_PROPERTIES,
//       [Query.limit(1), Query.offset(0)]
//     )

//     const totalProperties = totalResponse.total

//     const properties = response.documents.map(
//       ({
//         $collectionId,
//         $databaseId,
//         $id,
//         $permissions,
//         $updatedAt,
//         ...rest
//       }) => rest
//     )

//     console.log(properties)
//     return { properties, totalProperties }
//   } catch (error) {
//     console.error('Error exporting properties:', error)
//     throw error
//   }
// }

export const exportProperties = async () => {
  try {
    const properties = []
    let totalProperties = 0
    let offset = 0
    const limit = 100

    const totalResponse = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PROPERTIES,
      [Query.limit(1), Query.offset(0)]
    )
    totalProperties = totalResponse.total

    while (offset < totalProperties) {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROPERTIES,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc('$createdAt')
        ]
      )

      properties.push(
        ...response.documents.map(
          ({
            $collectionId,
            $databaseId,
            $id,
            $permissions,
            $updatedAt,
            ...rest
          }) => rest
        )
      )

      offset += limit
    }

    console.log(properties)
    return { properties, totalProperties }
  } catch (error) {
    console.error('Error exporting properties:', error)
    throw error
  }
}


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
    let allProperties = []
    let lastDocument = null
    const limit = 100

    while (true) {
      const query = lastDocument
        ? [Query.limit(limit), Query.cursorAfter(lastDocument.$id)]
        : [Query.limit(limit)]

      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROPERTIES,
        query
      )

      allProperties = [...allProperties, ...response.documents]

      if (response.documents.length < limit) {
        break
      }

      lastDocument = response.documents[response.documents.length - 1]
    }

    const propertyActivity = allProperties.reduce((acc, property) => {
      const activity = property.activity || 'Unknown'
      acc[activity] = (acc[activity] || 0) + 1
      return acc
    }, {})

    console.log(propertyActivity)
    return propertyActivity
  } catch (error) {
    console.error('Error fetching property activity:', error)
    throw error
  }
}







export const transferUnit = async (unitsId, targetUserIds) => {
  try {
    // Ensure `unitsId` and `targetUserIds` are arrays of strings
    console.log(unitsId)
    if (!Array.isArray(unitsId) || !unitsId.every((id) => typeof id === "string")) {
      throw new Error("Invalid unitsId: All elements must be strings");
    }

    if (!Array.isArray(targetUserIds) || !targetUserIds.every((id) => typeof id === "string")) {
      throw new Error("Invalid targetUserIds: All elements must be strings");
    }

    // Step 1: Get the current user's account
    const currentUserId = await getCurrentUserId();

    // Step 2: Fetch the current user's document
    const currentUserDoc = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
      currentUserId
    );

    // Step 3: Remove the specified units from the current user's document
    const updatedCurrentUserUnits = currentUserDoc.properties.filter(
      (unitId) => !unitsId.includes(unitId)
    );

    // Log updated properties for debugging
    console.log("Updated Current User Units:", updatedCurrentUserUnits);

    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
      currentUserId,
      { properties: updatedCurrentUserUnits } // Use a flat array of strings
    );

    // Step 4: Add the specified units to each target user's document
    for (const targetUserId of targetUserIds) {
      const targetUserDoc = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        targetUserId
      );

      const updatedTargetUserUnits = [
        ...new Set([...targetUserDoc.properties, ...unitsId]),
      ]; // Prevent duplicates

      console.log("Updated Target User Units:", updatedTargetUserUnits);

      await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        targetUserId,
        { properties: updatedTargetUserUnits } // Use a flat array of strings
      );
    }

    // Step 5: Update the `users` field in each unit document
    for (const unitId of unitsId) {
      const unitDoc = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROPERTIES,
        unitId
      );

      const updatedUsers = [
        ...new Set([...unitDoc.users.filter((id) => id !== currentUserId), ...targetUserIds]),
      ]; // Prevent duplicates

      console.log("Updated Users for Unit:", unitId, updatedUsers);

      await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROPERTIES,
        unitId,
        { users: updatedUsers } // Use a flat array of strings
      );
    }

    console.log("Units transferred successfully.");
  } catch (error) {
    console.error("Error transferring units:", error);
    throw error;
  }
};
