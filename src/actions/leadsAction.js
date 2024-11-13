import { databases, ID } from '@/services/appwrite/client'

export const addLead = async (lead) => {
  try {
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Database ID
      process.env.NEXT_PUBLIC_LEADS, // Collection ID
      ID.unique(), // Unique document ID
      lead // Data
    )
    return response
  } catch (error) {
    console.error('Error creating lead:', error)
    throw error
  }
}

// Mock data for testing
const mockLead = {
  name: 'John Doe',
  leadNumber: 'LN123456',
  number: 1234567890,
  lastFollowUp: new Date().toISOString(),
  description: 'This is a test lead',
  clientFollowUp: 'Pending',
  class: 'A',
}

// Example usage
addLead(mockLead)
  .then((response) => {
    console.log('Lead created successfully:', response)
  })
  .catch((error) => {
    console.error('Error creating lead:', error)
  })
