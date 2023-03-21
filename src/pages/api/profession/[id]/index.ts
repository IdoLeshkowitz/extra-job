import {NextApiRequest, NextApiResponse} from "next";
import {updateProfession} from "@/services/professionService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const {id} = req.query as { id: string };
        const {name, active} = req.body;
        try {
            const updatedProfession = await updateProfession(id, {name, active});
            res.status(200).json(updatedProfession)
        } catch (e) {
            console.error(e);
            res.status(404).json({error: "Not Found"})
        }
    }
}