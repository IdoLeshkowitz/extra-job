import {NextApiRequest, NextApiResponse} from "next";
import {findFirstJobApplication, findManyJobApplications} from "@/services/jobApplicationService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const jobApplicationFindFirstArgs = JSON.parse(req.query.jobApplicationFindFirstArgs as string)
        const {data, error} = await findFirstJobApplication(jobApplicationFindFirstArgs)
        if (error) {
            return res.status(500).json({error})
        }
        return res.status(200).json({data})
    }
}