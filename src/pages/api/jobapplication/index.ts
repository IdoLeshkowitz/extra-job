import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from ".prisma/client";
import {findManyJobApplications} from "@/services/jobApplicationService";
import JobApplicationFindManyArgs = Prisma.JobApplicationFindManyArgs;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {

    }
    if (req.method === "GET") {
        const jobApplicationFindManyArgs: JobApplicationFindManyArgs = JSON.parse(req.query.jobApplicationFindManyArgs as string)
        const {data, error} = await findManyJobApplications(jobApplicationFindManyArgs)
        if (error) {
            return res.status(500).json({error: {message: "unable to get job applications"}})
        }
        return res.status(200).json({data})
    }
}