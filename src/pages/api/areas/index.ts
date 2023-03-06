import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from "@prisma/client";
import prisma from '../../../../lib/prisma'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const createArea = (name: string) => {
            return Prisma.validator<Prisma.AreaCreateInput>()({
                name
            })
        }
        const createdArea = await prisma?.area.create({data: createArea(req.body.data.name)});
        res.json({data: createdArea})
    }
}