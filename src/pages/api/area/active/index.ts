import {NextApiRequest, NextApiResponse} from "next";
import {getAllActiveAreas} from "@/services/areaService";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        /*
        returns all active areas
        */
        try {
            const data = await getAllActiveAreas()
            res.status(200).json(data)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to get areas"}})
        }
    }
}