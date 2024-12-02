import axios from 'axios';
import { account, databases, ID } from '../services/appwrite/client.js';
// will use it later if needed
// import bcrypt from 'bcryptjs'; 

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

// User logs in and fetches role
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/signin', { email, password });
    console.log('User signed in successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const response = await axios.post('/api/auth/signout');
    console.log('User signed out successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Create a new user with a role and save it in the database
export const createUser = async (email, password, name, role) => {
  try {

    const userId = ID.unique();
    const userResponse = await account.create(userId, email, password, name);
    console.log('User created successfully:', userResponse);

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const userDocument = {
    //   userId,
    //   email,
    //   role,
    //   password,
    // };
    const userDocument = {
      // userId,
      // email,
      "61422_5_email": email,
      "61422_5_password": password,
      "61422_5_role": role,
      "61422_5_userId": userId,
      // role,
      // password,
    };
    const dbResponse = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // Database ID
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID, // Collection ID
      userId, // Use the same ID as the user account
      userDocument // Document data
    );

    console.log('User saved in database successfully:', dbResponse);
    console.log(userResponse, dbResponse)
    return { userResponse, dbResponse };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};



// Utility Functions
export const getCurrentUserRole = () => {
  return sessionStorage.getItem('userRole');
};

export const getSession = () => {
  const session = cookie.get('session');
  return session ? JSON.parse(session) : null;
};