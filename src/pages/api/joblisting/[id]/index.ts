import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from ".prisma/client";
import {boolean, object, ObjectSchema, string} from "yup";
import {updateJobListing} from "@/services/jobListingService";
import JobListingUpdateArgs = Prisma.JobListingUpdateArgs;

const jobListingUpdateArgsSchema  = object({
    data : object({
        active: boolean(),
    }),
    where: object({
        id: string().required()
    }),
})
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const {jobListingUpdateArgs}: { jobListingUpdateArgs: Prisma.JobListingUpdateArgs } = req.body;
        console.log(jobListingUpdateArgs)
        //validate jobListingUpdateArgs
        try {
            await jobListingUpdateArgsSchema.validate(jobListingUpdateArgs)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //update jobListing
        const {data, error} = await updateJobListing(jobListingUpdateArgs)
        if (error) {
            if (error.code === "P2002") {
                return res.status(400).json({error: {message: error.message, code: error.code}})
            }
            return res.status(500).json({error: {message: "unable to update job listing"}})
        }
        return res.status(200).json({data})
    }
}