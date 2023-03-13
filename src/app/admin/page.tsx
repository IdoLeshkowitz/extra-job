import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Role} from "@prisma/client";
import {redirect} from "next/navigation";

export default async function AdminPage() {
    const {user} = await getServerSession(authOptions) ?? {}
    return (
        <div>
            <h1 className="h1 text-white text-center">Hello <br/>{user?.name}</h1>
        </div>
    )
}

