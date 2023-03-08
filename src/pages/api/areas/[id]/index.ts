import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from ".prisma/client";
import {updateArea} from "../../../../../lib/services/areaService";
import AreaUpdateInput = Prisma.AreaUpdateInput;

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const id = req.query.id as unknown as string
        const areaUpdateInput: AreaUpdateInput = req.body.data
        try {
            const updatedArea = await updateArea(id, areaUpdateInput)
            res.json({data : updatedArea})
        }catch (e){
            console.error(e)
            res.status(400).json({error:{message : 'unable to update area'}})
        }
    }
}