import { account, databases } from '../../../services/appwrite/client';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const session = await account.createEmailPasswordSession(email, password);
      console.log('User signed in successfully:', session);

      const user = await account.get();
      const userId = user.$id;

      const userDocument = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID, // Your users collection ID
        userId
      );

      const userRole = userDocument.role;

      // Set HttpOnly cookie with session details and role
      res.setHeader('Set-Cookie', cookie.serialize('session', JSON.stringify({ session, userRole }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 24 * 60 * 60, // 1 day
        sameSite: 'strict',
        path: '/',
      }));

      // Return session data in the response
      res.status(200).json({ message: 'User signed in successfully', session, userRole });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ error: 'Error signing in' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}