import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from './lib/mongodb'; 
import User from './models/User';


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user}) {
      try {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            role: 'student', 
            points: 0,       
          });
          user.role = 'student';
          user.id = existingUser._id.toString();
        } else {
          user.role = existingUser.role;
          user.id = existingUser._id.toString();
        }
        return true;
      } catch (error) {
        console.error('Error during signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      } else if (token.email && !token.role) {
        try {
          const dbUser = await User.findOne({ email: token.email });
          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser._id.toString();
          }
        } catch (error) {
          console.error('Error fetching user role for JWT:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};