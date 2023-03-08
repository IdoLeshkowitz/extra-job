import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from "@prisma/client";
import {createArea, getAreasAndCount} from "../../../../lib/services/areaService";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const areaCreateInput: Prisma.AreaCreateInput = req.body.data
            const addedArea = await createArea(areaCreateInput)
            res.json({data: addedArea})
        } catch (e) {
            res.status(400).json({error: {message: 'unable to create area'}})
        }
    }
}