import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/lib/auth";
import type { NextAuthOptions, User, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

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
              referralCode: user.referralCode
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
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;
        token.referralCode = user.referralCode;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.referralCode = typeof token.referralCode === "string" ? token.referralCode : undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      role?: "student" | "recruiter" | "admin";
      referralCode?: string;
    };
  }
}

export type { Session } from "next-auth";
export type { JWT } from "next-auth/jwt";