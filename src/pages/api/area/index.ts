import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        /*
        creates a new area or activate an existing area
        */

    }
    if (req.method === 'GET') {
        /*
        Optional query params:
        {skip: number, take: number, active: boolean}
        If skip and take are specified, the areas are returned in the range of skip to skip + take
        If active is specified, only active or inactive areas are returned
        else all areas are returned
         */
        const skip = req.query.skip ? Number(req.query.skip) : undefined;
        const take = req.query.take ? Number(req.query.take) : undefined;
        const active = req.query.active ? req.query.active : undefined;
        const areas = await prisma.area.findMany({
            skip : undefined,
            take : undefined,
            where: {active: active ? active === 'true' : undefined}
        });
        res.json(areas)
    }
}