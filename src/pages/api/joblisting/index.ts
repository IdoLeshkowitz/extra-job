import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from "@prisma/client";
import {createJobListing} from "@/services/jobListingService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {name, active, positionScopeId, areaId, description, professionId, serialNumber} = req.body
        const jobListingToCreate: Prisma.JobListingCreateInput = {
            name, active, serialNumber, description, profession: {connect: {id: professionId}}, positionScope: {connect: {id: positionScopeId}}, area: {connect: {id: areaId}}
        }
        const responseFromDb = await createJobListing(jobListingToCreate)
        if ('error' in responseFromDb) {
            res.status(500).json(responseFromDb)
        } else {
            res.status(200).json(responseFromDb)
        }
    }
}