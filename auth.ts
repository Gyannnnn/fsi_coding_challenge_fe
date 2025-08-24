import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import axios from "axios";




export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
    
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // Validate input
          if (!credentials?.email || !credentials?.password) return null;
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // Call  backend API
          const res = await axios.post(
            "https://fsi-coding-challenge-api.vercel.app/api/v1/auth/signin",
            {
              userEmail: email,
              userPassword: password,
            }
          );

          // If no user returned, fail login
          const { user, token } = res.data;

          if (!user) return null;

          return {
            id: user.id,
            email: user.userEmail, 
            name: user.userName, // optional
            role: user.role,
            address: user.userAddress,
            accessToken: token, 
          };
        } catch (error: any) {
          console.error(
            "Authorize error:",
            error.response?.data || error.message || error
          );
          return null; // Always return null on failure
        }
      },
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
        token.name = (user as any).name;
        token.email = (user as any).email;
        token.address = (user as any).address;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).id = token.id;
      (session.user as any).role = token.role;
      (session.user as any).name = token.name;
      (session.user as any).email = token.email;
      (session.user as any).addres = token.address;
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handlers as GET, handlers as POST };
