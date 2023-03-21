import {NextApiRequest, NextApiResponse} from "next";
import {updatePositionScope} from "@/services/positionScopeService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const {id} = req.query as { id: string };
        const {name, active} = req.body;
        try {
            const updatedPositionScope = await updatePositionScope(id, {name, active});
            res.status(200).json(updatedPositionScope)
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Not Found"})
        }
    }
}