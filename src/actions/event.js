import { account, databases, ID } from '../services/appwrite/client.js';
import { Query } from 'appwrite';

export const getCurrentUserId = () => {
  try {
    const currentUser = account.get()
    return currentUser.$id
  } catch (error) {
    console.error('Error fetching current user:', error)
    throw error
  }
}

export const addEvent = async (event) => {
  try {
    const id = getCurrentUserId();
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
      ID.unique(),
      {
        ...event,
        userId: id,
      }
    );
    console.log('Event created successfully:', response);
    return response;
  }
  catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

export const deleteEvent = async (eventId) => {
  try {
    const response = await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
      eventId
    );
    console.log('Event deleted successfully:', response);
    return response;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

export const updateEvent = async (eventId, event) => {
  try {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
      eventId,
      event
    );
    console.log('Event updated successfully:', response);
    return response;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

export const getEventById = async (eventId) => {
  try {
    const response = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
      eventId
    );
    return response;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
}

export const getEventsForUser = async (userId) => {
  try {
    const queries = [
      Query.equalTo('userId', userId),
      Query.orderDesc('$createdAt'),
    ]
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
      queries
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export const getAllEventsForAdmin = async () => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}