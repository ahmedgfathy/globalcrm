import axios from 'axios';
import { account, databases, ID } from '../services/appwrite/client.js';
// will use it later if needed
// import bcrypt from 'bcryptjs'; 

// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const response = await account.create(ID.unique(), email, password);
    console.log('User created successfully:', response);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Sign In Function
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    
    const user = await account.get();
    const userId = user.$id;
    
    const userDocument = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID, // Your users collection ID
      userId
    );
    const { email:userEmail ,role } = userDocument
    const userData = {userEmail, role ,userId}
    console.log('User signed in successfully:');

    // Save session data and user document in localStorage
    localStorage.setItem('session', JSON.stringify({ userData }));

    return { userData };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign Out Function
export const signOut = async () => {
  try {
    await account.deleteSession('current');
    console.log('User signed out successfully');

    // Remove session data from localStorage
    localStorage.removeItem('session');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const createUser = async (email, password, name, role) => {
  try {
    const userId = ID.unique();
    const userResponse = await account.create(userId, email, password, name);
    console.log('User created successfully:', userResponse);

    // const hashedPassword = await bcrypt.hash(password, 10);

    const userDocument = {
      userId,
      email,
      role,
      password,
    };

    const dbResponse = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, 
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID, 
      userId, // Use the same ID as the user account
      userDocument 
    );

    console.log('User saved in database successfully:', dbResponse);
    return { userResponse, dbResponse };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getCurrentUserRole = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  return session ? session.userRole : null;
};

export const getSession = () => {
  const session = localStorage.getItem('session');
  return session ? JSON.parse(session) : null;
};