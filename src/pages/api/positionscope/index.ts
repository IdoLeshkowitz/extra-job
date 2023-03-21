import {NextApiRequest, NextApiResponse} from "next";
import {createPositionScope, getPositionScopes} from "@/services/positionScopeService";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        //todo : add admin check
        /*
        Required body params:
        {name : string}
        */
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({error: {message: "name is required"}})
        }
        try {
            const positionScope = await createPositionScope({name})
            res.json(positionScope)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to create position scope"}})
        }
    }
    if (req.method === "GET") {
        /*
        Optional query params:
        {skip: number, take: number, active: boolean}
        If skip and take are specified, the position scopes are returned in the range of skip to skip + take
        If active is specified, only active or inactive position scopes are returned
        else all position scopes are returned
         */
        const skip = req.query.skip ? Number(req.query.skip) : undefined;
        const take = req.query.take ? Number(req.query.take) : undefined;
        const active = req.query.active ? Boolean(req.query.active) : undefined;
        try {
            const positionScopes = await getPositionScopes({skip, take, active})
            res.json(positionScopes)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to get position scopes"}})
        }
    }
}