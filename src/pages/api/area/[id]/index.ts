import {NextApiRequest, NextApiResponse} from "next";
import {boolean, object, string} from "yup";
import {updateArea} from "@/services/areaService";

const areaUpdateArgsSchema = object({
    where: object({id: string().required()}),
    data : object({active: boolean().required()})
})
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const {areaUpdateArgs} = req.body;
        //validate areaUpdateArgs
        try {
            await areaUpdateArgsSchema.validate(areaUpdateArgs)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //update area
        const {data, error} = await updateArea(areaUpdateArgs)
        if (error) {
            return res.status(500).json({error})
        }
        res.json(data)
    }
}