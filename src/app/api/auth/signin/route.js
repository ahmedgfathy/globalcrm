import { account, databases } from "../../../../services/appwrite/client.js";
import cookie from "cookie";

export async function POST(req) {
  try {
    // Parse the JSON body to extract email and password
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    // Step 1: Create a session for the user
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session);

    // Step 2: Retrieve user details
    const user = await account.get();
    console.log("User details:", user);

    const userId = user.$id;

    // Step 3: Retrieve user's document from the database
    const userDocument = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
      userId
    );
    console.log("User document:", userDocument);

    const userRole = userDocument.role;

    // Step 4: Set an HTTP-only cookie to store session and role information
    const sessionCookie = cookie.serialize(
      "session",
      JSON.stringify({ session, userRole }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure flag only for production
        maxAge: 24 * 60 * 60, // Cookie expiration: 1 day
        sameSite: "strict",
        path: "/",
      }
    );

    // Set cookie in response headers
    return new Response(
      JSON.stringify({
        message: "User signed in successfully",
        session,
        userRole,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": sessionCookie,
        },
      }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);

    // Error response
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred during sign-in.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  return new Response("GET requests are not allowed on this route.", {
    status: 405,
    headers: { Allow: "POST" },
  });
}
