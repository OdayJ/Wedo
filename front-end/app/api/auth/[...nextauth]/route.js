import NextAuth from "next-auth/next";
import CredintialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const authOptions = {
  providers: [
    CredintialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          // Fetching the user from the backend API
          const response = await fetch(
            "http://localhost:3001/api/getUser?email=" + email
          );
          const user = await response.json();

          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("error");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
