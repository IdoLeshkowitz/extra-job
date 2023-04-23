import {NextApiRequest, NextApiResponse} from "next";
import {boolean, number, object, string} from "yup";
import {getProfessions, upsertProfession} from "@/services/professionService";

const professionFindManyArgsSchema = object({
    where: object({
        active: boolean().required()
    }),
    skip : number(),
    take : number()
})
const professionUpsertArgsSchema = object({
    where : object({
        name: string().required()
    }),
    create: object({
        name: string().required(),
    }),
    update: object({
        active: boolean().required()
    })
})
export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        //todo : add admin check
        const {professionUpsertArgs} = req.body;
        //validate professionUpsertArgs
        try {
            await professionUpsertArgsSchema.validate(professionUpsertArgs)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //upsert profession
        const {data, error} = await upsertProfession(professionUpsertArgs)
        if (error) {
            return res.status(500).json({error})
        }
        res.json(data)
    }
    if (req.method === "GET") {
        const professionFindManyArgs = JSON.parse(req.query.professionFindManyArgs as string);
        //validate professionFindManyArgs
        try {
            await professionFindManyArgsSchema.validate(professionFindManyArgs)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //get professions
        const {data, error} = await getProfessions(professionFindManyArgs)
        if (error) {
            return res.status(500).json({error})
        }
        res.json({data})
    }
}