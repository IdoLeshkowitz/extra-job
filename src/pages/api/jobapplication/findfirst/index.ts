import {NextApiRequest, NextApiResponse} from "next";
import {object, string} from "yup";
import {JobApplicationStatus, Prisma} from "@prisma/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {findFirstJobApplication} from "@/services/jobApplicationService";
import JobApplicationFindFirstArgs = Prisma.JobApplicationFindFirstArgs;

export const jobApplicationFindFirstArgsSchema = object({
    where: object({
        appliedBy : object({
            id: string().required()
        }),
        jobListing: object({
            id: string().required()
        }),
        status    : object({
            equals: string().required().oneOf(Object.values(JobApplicationStatus))
        })
    })
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const jobApplicationFindFirstArgs: JobApplicationFindFirstArgs = JSON.parse(req.query.jobApplicationFindFirstArgs as string)
        // query validation
            try {
                await jobApplicationFindFirstArgsSchema.validate(jobApplicationFindFirstArgs)
            } catch (e: any) {
                return res.status(400).json({error: {message: e.message}})
            }
            //user validation
            const session = await getServerSession(req, res, authOptions)
            if (!session) {
                return res.status(401).json({error: {message: "unauthorized"}})
            }
            if (session.user.id !== jobApplicationFindFirstArgs?.where?.appliedBy?.id) {
                return res.status(401).json({error: {message: "unauthorized"}})
            }
            // get job application
            const {data,error} = await findFirstJobApplication(jobApplicationFindFirstArgs)
            if (error) {
                return res.status(500).json({error})
            }
            return res.status(200).json({data})
        }
}