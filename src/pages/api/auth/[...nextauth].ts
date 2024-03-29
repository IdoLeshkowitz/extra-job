import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "../../../../libs/prisma";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
    adapter  : PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId    : process.env.GOOGLE_CLIENT_ID as any,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as any,
        }),
        Auth0Provider({
            clientId    : process.env.AUTH0_CLIENT_ID as any,
            clientSecret: process.env.AUTH0_CLIENT_SECRET as any,
            issuer      : process.env.AUTH0_ISSUER as any,
        }),
    ],
    callbacks: {
        async session({session, user}) {
            session.user.role = user.role;
            session.user.id = user.id;
            session.user.phone = user.phone;
            session.user.gender = user.gender;
            const cvByUserId = await prisma.cv.findFirst({
                where: {
                    userId: user.id
                }
            });
            session.user.cv = !!cvByUserId;
            return session
        },
    }
}

export default NextAuth(authOptions);