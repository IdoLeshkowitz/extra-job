import {NextApiRequest, NextApiResponse} from "next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth";
import {Role} from "@prisma/client";
import {
    createPositionScope,
    getPositionScopeByName,
    getPositionScopes,
    updatePositionScope
} from "@/services/positionScopeService";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions)
        if (!session || session.user.role !== Role.ADMIN) {
            return res.status(403).json({error: {message: "unauthorized"}})
        }
        /*
        Required body params:
        {name : string}
        if a position scope  with the same name already exists, it is reactivated and returned
        else a new position scope is created and returned
         */
        const {name} = req.body;
        try {
            const positionScopeWithSameName = await getPositionScopeByName(name);
            if (positionScopeWithSameName.data.positionScope) {
                /*
                case position scope with the same name exists:
                    if inactive -> reactivate it
                    if active -> return it
                 */
                if (!positionScopeWithSameName.data.positionScope.active) {
                    const updatedPositionScope = await updatePositionScope(positionScopeWithSameName.data.positionScope.id, {active: true})
                    return res.status(200).json(updatedPositionScope)
                }
                return res.status(200).json(positionScopeWithSameName)
            }
            /*
            case position scope with the same name does not exist:
                create a new position scope and return it
             */
            const newPositionScope = await createPositionScope({name})
            res.status(200).json(newPositionScope)
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