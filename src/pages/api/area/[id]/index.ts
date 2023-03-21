import {NextApiRequest, NextApiResponse} from "next";
import {updateArea} from "@/services/areaService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const {id} = req.query as unknown as { id: string };
        const {name, active} = req.body;
        if (!id) {
            return res.status(400).json({error: {message: "id is required"}})
        }
        try {
            const area = await updateArea(id, {name, active})
            res.json(area)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to update area"}})
        }
    }
}