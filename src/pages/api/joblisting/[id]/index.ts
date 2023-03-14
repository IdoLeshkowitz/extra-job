import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from ".prisma/client";
import {updateJobListing} from "@/services/jobListingService";
import JobListingUpdateInput = Prisma.JobListingUpdateInput;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const id = req.query.id as unknown as string;
        const jobListingUpdateInput: JobListingUpdateInput = req.body;
        try {
            const updatedJobListing = await updateJobListing(id, jobListingUpdateInput)
            res.status(200).json(updatedJobListing)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to update job listing"}})
        }
    }
}