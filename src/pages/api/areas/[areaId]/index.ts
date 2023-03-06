import {NextApiRequest, NextApiResponse} from "next";
import prisma from '../../../../../lib/prisma'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        const areaId = req.query.areaId as unknown as string
        if (!areaId) {
            res.status(404)
        }
        res.json(await prisma.area.delete({where: {id: areaId}}))
    }
}