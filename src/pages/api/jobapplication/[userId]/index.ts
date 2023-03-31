import {NextApiRequest, NextApiResponse} from "next";
import {findManyJobApplications} from "@/services/jobApplicationService";
import {Prisma} from ".prisma/client";
import JobApplicationFindManyArgs = Prisma.JobApplicationFindManyArgs;
import {string} from "yup";

const userIdSchema = string().required()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const {userId} = req.query as { userId: string }
        //validate userId
        try {
            await userIdSchema.validate(userId)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //get jobApplications
        const jobApplicationFindManyArgs: JobApplicationFindManyArgs = {
            where: {
                appliedById: userId
            }
        }
        const {data, error} = await findManyJobApplications(jobApplicationFindManyArgs)
        if (error) {
            res.status(500).json({error})
        }
        res.json({data})
    }
}