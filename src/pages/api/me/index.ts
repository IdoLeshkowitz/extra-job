import {NextApiHandler} from "next";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
    const {user} = await getServerSession(req, res, authOptions) ?? {}
    /*     if user is not authenticated, redirect to signin page    */
    if (!user) {
        return res.redirect("/api/auth/signin")
    }
    /*     if user is authenticated, check role    */
    const {role} = user
    /*     if role is not admin, redirect to admin page    */
    if (role === "ADMIN") {
        return res.redirect("/admin")
    }
}

export default handler