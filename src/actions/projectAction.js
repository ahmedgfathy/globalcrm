import { databases, ID, storage } from '@/services/appwrite/client';
import {Query} from "appwrite"
export const addProject = async (project) => {
    console.log(project)
    try {
      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECTS, 
        ID.unique(), 
        project 
      );
      return response;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };