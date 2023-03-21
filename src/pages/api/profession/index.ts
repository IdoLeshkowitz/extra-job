import {NextApiRequest, NextApiResponse} from "next";
import {createProfession, getProfessions} from "@/services/professionService";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        //todo : add admin check
        /*
        Required body params:
        {name : string}
        if an area with the same name already exists, it is reactivated and returned
        else a new area is created and returned
        */
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({error: {message: "name is required"}})
        }
        try {
            const profession = await createProfession({name})
            res.json(profession)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to create profession"}})
        }
    }
    if (req.method === "GET") {
        /*
        Optional query params:
        {skip: number, take: number, active: boolean}
        If skip and take are specified, the professions are returned in the range of skip to skip + take
        If active is specified, only active or inactive professions are returned
        else all professions are returned
         */
        const skip = req.query.skip ? Number(req.query.skip) : undefined;
        const take = req.query.take ? Number(req.query.take) : undefined;
        const active = req.query.active ? Boolean(req.query.active) : undefined;
        try {
            const professions = await getProfessions({skip, take, active})
            res.json(professions)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to get professions"}})
        }
    }
}