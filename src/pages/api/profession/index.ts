import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from "@prisma/client";
import {createProfession} from "@/services/professionService";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST"){
        try {
            const professionCreateInput: Prisma.ProfessionCreateInput = req.body.data
            const addedProfession = await createProfession(professionCreateInput)
            res.json({data: addedProfession})
        }catch (e){
            res.status(400).json({error: {message: "unable to create profession"}})
        }
    }
}