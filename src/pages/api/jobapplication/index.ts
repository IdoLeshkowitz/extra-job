import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from ".prisma/client";
import {createJobApplication, findManyJobApplications} from "@/services/jobApplicationService";
import JobApplicationFindManyArgs = Prisma.JobApplicationFindManyArgs;
import {log} from "next/dist/server/typescript/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const jobApplicationCreateArgs: Prisma.JobApplicationCreateArgs = req.body.jobApplicationCreateArgs
        console.log("jobApplicationCreateArgs", jobApplicationCreateArgs)
        const {data, error} = await createJobApplication(jobApplicationCreateArgs)
        console.log("data", data)
        if (error) {
            return res.status(500).json({error: {message: "unable to create job application"}})
        }
        return res.status(200).json({data})
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