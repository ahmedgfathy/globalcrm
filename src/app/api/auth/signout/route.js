import {account,databases} from "../../../../services/appwrite/client.js"
import cookie from 'cookie';

export async function POST(req) {
  try {
    // Delete the current session
    const response = await account.deleteSession('current');
    console.log('User signed out successfully:', response);

    // Clear the session cookie
    return new Response(
      JSON.stringify({ message: 'User signed out successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;',
        },
      }
    );
  } catch (error) {
    console.error('Error signing out:', error);

    return new Response(
      JSON.stringify({ error: error.message || 'Error signing out' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
