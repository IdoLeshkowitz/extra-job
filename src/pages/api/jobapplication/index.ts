import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Prisma} from ".prisma/client";
import prisma from "../../../../libs/prisma";
import JobApplicationCreateInput = Prisma.JobApplicationCreateInput;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        //get the user from session
        const {user} = await getServerSession(req, res, authOptions) ?? {};
        if (!user) return res.status(401).json({message: "Unauthorized"});
        //get the job listing id from the request body
        const {jobListingId} = req.body;
        //create the job application
        const jobApplicationCreateInput: JobApplicationCreateInput = {
            joblisting: {connect: {id: jobListingId}},
            appliedBy : {connect: {id: user.id}},
        }
        try {
            const createdJobApplication = await prisma.jobApplication.create({data: jobApplicationCreateInput})
            return res.status(200).json(createdJobApplication)
        } catch (e) {
            console.error(e)
            return res.status(500).json({error: {message: "unable to create job application"}})
        }
    }
    if (req.method === "GET") {
        //get the user from session
        const {user} = await getServerSession(req, res, authOptions) ?? {};
    }
}