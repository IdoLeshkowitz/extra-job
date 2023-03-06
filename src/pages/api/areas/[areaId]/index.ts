import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from "@prisma/client";
import prisma from '../../../../../lib/client'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        const areaId = req.query.areaId as unknown as string
        if (!areaId){
            res.status(404)
        }
        res.json(await prisma.area.delete({where: {id : areaId}}))
    }
}