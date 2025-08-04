import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/lib/auth";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await authenticateUser(credentials.email, credentials.password);
          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              referralCode: user.referralCode,
            };
          }
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  events: {
    async signOut() {
    
      console.log("User signed out");
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const allowedRoles = ["student", "recruiter", "admin"] as const;
        const userRole = (user as { role?: string }).role;
        if (userRole && allowedRoles.includes(userRole as typeof allowedRoles[number])) {
          token.role = userRole as typeof allowedRoles[number];
        }
        token.referralCode = (user as { referralCode?: string }).referralCode;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
        (session.user as { role?: string }).role = (token as { role?: string }).role;
        (session.user as { referralCode?: string }).referralCode = (token as { referralCode?: string }).referralCode;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
