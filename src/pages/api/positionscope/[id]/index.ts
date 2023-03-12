import {NextApiRequest, NextApiResponse} from "next";
import {updatePositionScope} from "@/services/positionScopeService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const id = req.query.id as unknown as string
        const positionScopeUpdateInput = req.body
        try {
            const updatedPositionScope = await updatePositionScope(id, positionScopeUpdateInput)
            res.json({data: updatedPositionScope})
        } catch (e) {
            console.error(e)
            res.status(400).json({error: {message: 'unable to update position scope'}})
        }
    }
}