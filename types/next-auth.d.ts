import {Role} from "@prisma/client";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User{
        role: Role
        phone: string
        gender: string
    }
    interface Session {
        user: User
    }
}