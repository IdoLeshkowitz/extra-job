import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "../../../../lib/prisma";
import Auth0Provider from "next-auth/providers/auth0";
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as any,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as any,
        }),
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID as any,
            clientSecret: process.env.AUTH0_CLIENT_SECRET as any,
            issuer: process.env.AUTH0_ISSUER as any,
        }),
    ]
}

export default NextAuth(authOptions);