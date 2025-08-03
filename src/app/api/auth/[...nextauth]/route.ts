import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/lib/auth";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserRole = "student" | "recruiter" | "admin";

interface ExtendedUser extends User {
  role?: UserRole;
  referralCode?: string;
}

interface ExtendedSession extends Session {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
    referralCode?: string;
  };
}

interface ExtendedJWT extends JWT {
  role?: UserRole;
  referralCode?: string;
}

const authOptions: NextAuthOptions = {
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
              role: user.role as UserRole,
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
    async jwt({ token, user }: { token: ExtendedJWT; user?: ExtendedUser }) {
      if (user) {
        token.role = user.role;
        token.referralCode = user.referralCode;
      }
      return token;
    },
    async session({ session, token }: { session: ExtendedSession; token: ExtendedJWT }) {
      if (token && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.referralCode = token.referralCode;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
