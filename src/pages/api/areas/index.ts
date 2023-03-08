import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from "@prisma/client";
import prisma from '../../../../lib/prisma'
import {createArea} from "../../../../lib/services/areaService";

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
    if (req.method === "GET") {
        try {
            res.json({data: await prisma.area.findMany({}), count: await prisma.area.count()})
        } catch (e) {
            res.status(400).json({error: {message: 'unable to get areas'}})
        }
    }
}