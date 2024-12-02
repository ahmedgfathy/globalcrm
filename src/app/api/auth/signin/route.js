// import { account, databases } from '../../../../services/appwrite/client';
import { account, databases } from '@/services/appwrite/client';
import cookie from 'cookie';

export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Parse the JSON body
    // Your logic for signing in
    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    const userId = user.$id;

    const userDocument = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_USERS,
      userId
    );

    const userRole = userDocument.role;

    return new Response(
      JSON.stringify({
        message: 'User signed in successfully',
        session,
        userRole,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error signing in:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Error signing in' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET() {
  return new Response('GET requests are not allowed on this route.', {
    status: 405,
    headers: { 'Allow': 'POST' },
  });
}
