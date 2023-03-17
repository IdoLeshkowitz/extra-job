import {NextApiHandler} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Role} from "@prisma/client";

const handler: NextApiHandler = async (req, res) => {
    const {user} = await getServerSession(req, res, authOptions) ?? {}
    /*     if user is not authenticated, redirect to signin page    */
    if (!user) {
        return res.redirect("/api/auth/signin")
    }
    /*     if user is authenticated, check role    */
    const {role} = user
    /*     if role is admin, redirect to admin page    */
    if (role === Role.ADMIN) {
        return res.redirect("/admin")
    }
    /*     if role is jobseeker, redirect to jobseeker page    */
    if (role === Role.JOBSEEKER) {
        return res.redirect("/job-seeker")
    }
}

export default handler