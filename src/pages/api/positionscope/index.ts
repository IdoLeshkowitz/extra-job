import {NextApiRequest, NextApiResponse} from "next";
import {getPositionScopes, upsertPositionScope} from "@/services/positionScopeService";
import {boolean, number, object, string} from "yup";

const positionScopeFindManyArgsSchema = object({
    where: object({
        active: boolean().required()
    }),
    skip : number(),
    take : number()
})
const positionScopeUpsertArgsSchema = object({
    where : object({
        name: string().required()
    }),
    create: object({
        name: string().required(),
    }),
    update: object({
        active: boolean().required()
    })
})
export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        //todo : add admin check
        const {positionScopeUpsertArgs} = req.body;
        //validate positionScopeUpsertArgs
        try {
            await positionScopeUpsertArgsSchema.validate(positionScopeUpsertArgs)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //upsert positionScope
        const {data, error} = await upsertPositionScope(positionScopeUpsertArgs)
        if (error) {
            return res.status(500).json({error})
        }
        res.json(data)
    }
    if (req.method === "GET") {
        const positionScopeFindManyArgs = JSON.parse(req.query.positionScopeFindManyArgs as string);
        //validate positionScopeFindManyArgs
        try {
            await positionScopeFindManyArgsSchema.validate(positionScopeFindManyArgs)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //get positionScopes
        const {data, error} = await getPositionScopes(positionScopeFindManyArgs)
        if (error) {
            return res.status(500).json({error})
        }
        res.json({data})
    }
}