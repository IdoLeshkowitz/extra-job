import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Prisma} from ".prisma/client";
import CvFindFirstArgs = Prisma.CvFindFirstArgs;
import {findFirstCv} from "@/services/cvService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        //get session
        const {user} = await getServerSession(req, res, authOptions) ?? {}
        if (!user) {
            return res.status(401).json({error: {message: "Unauthorized"}})
        }
        //get cv
        const cvFindFirstArgs: CvFindFirstArgs = {
            where  : {
                userId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
        }
        //todo : validate cvFindFirstArgs
        const {data, error} = await findFirstCv(cvFindFirstArgs)
        if (error) {
            return res.status(500).json({error})
        }
        //check if cv exists
        if (!data?.cv?.file) {
            //if not, return error
            return res.status(400).json({error: {message: 'No cv found'}})
        }
        //if cv exists, return it
        res.setHeader("Content-Type", "application/pdf")
        res.setHeader("Content-Disposition", `attachment; filename=${user?.name}.pdf`)
        res.send(data.cv.file)
    }
}