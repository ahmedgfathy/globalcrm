// lib/appwrite/client.js
import { Client, Databases, ID } from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Your project ID

export const databases = new Databases(client);

export { ID };