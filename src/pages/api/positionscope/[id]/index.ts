import {NextApiRequest, NextApiResponse} from "next";
import {updatePositionScope} from "@/services/positionScopeService";
import {object, string} from "yup";

const positionScopeUpdateArgsSchema = object({
    where: object({id: string().required()}),
    data : object({active: string().required()})
})
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const {positionScopeUpdateArgs} = req.body;
        //validate positionScopeUpdateArgs
        try {
            await positionScopeUpdateArgsSchema.validate(positionScopeUpdateArgs)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //update positionScope
        const {data, error} = await updatePositionScope(positionScopeUpdateArgs)
        if (error) {
            return res.status(500).json({error})
        }
        res.json(data)
    }
}