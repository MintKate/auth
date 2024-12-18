import NextAuth from "next-auth";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    },
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                msv: {},
                password:{},
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ msv: credentials?.msv });
                    if (!user) {
                        throw new Error("")
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password ?? "", user.password as string
                    ); 
                    if (!isValidPassword) {
                        throw new Error ("")
                    }
                    return user;
                }
                catch {
                    return null
                }
            }
        })

    ],

    pages: {
       signIn: "/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET
    

  
});
export { handler as GET, handler as POST };
