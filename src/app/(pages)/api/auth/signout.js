import { account } from '../../../services/appwrite/client';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await account.deleteSession('current');
      console.log('User signed out successfully:', response);

      // Clear the cookie
      res.setHeader('Set-Cookie', cookie.serialize('session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set secure flag in production
        maxAge: -1, // Expire the cookie immediately
        sameSite: 'strict',
        path: '/',
      }));

      res.status(200).json({ message: 'User signed out successfully' });
    } catch (error) {
      console.error('Error signing out:', error);
      res.status(500).json({ error: 'Error signing out' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}