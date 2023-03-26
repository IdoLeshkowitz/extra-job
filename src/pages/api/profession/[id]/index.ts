import {NextApiRequest, NextApiResponse} from "next";
import {updateProfession} from "@/services/professionService";
import {boolean, object, string} from "yup";

const professionUpdateArgsSchema = object({
    where: object({id: string().required()}),
    data : object({active: boolean().required()})
})
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const {professionUpdateArgs} = req.body;
        console.log(professionUpdateArgs)
        //validate professionUpdateArgs
        try {
            await professionUpdateArgsSchema.validate(professionUpdateArgs)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //update profession
        const {data, error} = await updateProfession(professionUpdateArgs)
        if (error) {
            return res.status(500).json({error})
        }
        res.json(data)
    }
}