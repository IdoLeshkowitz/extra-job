import {NextApiRequest, NextApiResponse} from "next";
import {createArea, getAreas} from "@/services/areaService";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        //todo : add admin check
        const {name} = req.body;
        if (!name) {
            res.status(400).json({error: {message: "name is required"}})
        }
        try {
            const area = await createArea({name})
            res.json(area)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to create area"}})
        }
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
        const active = req.query.active ? Boolean(req.query.active) : undefined;
        try {
            const areas = await getAreas({skip, take, active})
            res.json(areas)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to get areas"}})
        }
    }
}