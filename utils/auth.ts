
import { Auth0Client } from "@auth0/nextjs-auth0/server";

console.log("Initializing Auth0 client...", process.env.AUTH0_REDIRECT_URI);
export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: process.env.AUTH0_SCOPE,
    redirect_uri: process.env.AUTH0_REDIRECT_URI,
  }
});