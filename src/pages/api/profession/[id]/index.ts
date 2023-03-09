import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from ".prisma/client";
import {updateProfession} from "@/services/professionService";
import AreaUpdateInput = Prisma.AreaUpdateInput;

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const id = req.query.id as unknown as string
        const professionUpdateInput: AreaUpdateInput = req.body.data
        try {
            const updatedProfession = await updateProfession(id, professionUpdateInput)
            res.json({data: updatedProfession})
        } catch (e) {
            console.error(e)
            res.status(400).json({error: {message: 'unable to update profession'}})
        }
    }
}