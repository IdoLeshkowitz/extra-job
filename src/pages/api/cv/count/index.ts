import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Prisma} from ".prisma/client";
import CvCreateArgs = Prisma.CvCreateArgs;
import CvCountArgs = Prisma.CvCountArgs;
import {countCv} from "@/services/cvService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const {user} = await getServerSession(req, res, authOptions) ?? {}
        if (!user) {
            return res.status(401).json({message: "Unauthorized"})
        }
        const cvCountArgs: CvCountArgs = {
            where: {
                userId: user.id
            }
        }
        const {data, error} = await countCv(cvCountArgs)
        if (error) {
            return res
                .status(500).json({error})
        }
        return res.status(200).json({data})
    }
}