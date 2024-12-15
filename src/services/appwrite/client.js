import { Client, Databases, ID , Storage,Account} from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Your project ID

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export { ID };

