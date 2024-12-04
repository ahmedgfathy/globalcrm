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

  export const getProjects = async (limit = 10, offset = 0) => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECTS,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc('$createdAt')
        ]
      );
  
      const totalResponse = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECTS,
        [
          Query.limit(1),
          Query.offset(0)
        ]
      );
  
      const totalProjects = totalResponse.total;
  
      const projects = response.documents.map(({ collectionId, databaseId, ...rest }) => rest);
  
      console.log(projects);
      return { projects, totalProjects };
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  };

  export const getProjectById = async (projectId) => {
    try {
      const response = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECTS,
        projectId
      );
  
      // Destructure the response to exclude unwanted fields
      const { $collectionId, $createdAt,$databaseId,$permissions,$updatedAt, ...projectData } = response;
  
      console.log(projectData);
      return projectData;
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  };

export const deleteProject = async (projectId) => {
    try {
      const response = await databases.deleteDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECTS,
        projectId,
      );
      return response;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };
  
  export const updateProject = async (projectId, project) => {
    try {
      const response = await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECTS,
        projectId,
        project,
      );
      return response;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }