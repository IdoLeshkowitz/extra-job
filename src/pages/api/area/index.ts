import {NextApiRequest, NextApiResponse} from "next";
import {getAreas, upsertArea} from "@/services/areaService";
import {Prisma} from ".prisma/client";
import {boolean, number, object, string} from "yup";
import AreaUpsertArgs = Prisma.AreaUpsertArgs;

const areaUpsertArgsSchema = object({
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
const areaFindManyArgsSchema = object({
    where: object({
        active: boolean().required()
    }),
    skip : number(),
    take : number()
})

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        //todo : add admin check
        const {areaUpsertArgs}: { areaUpsertArgs: AreaUpsertArgs } = req.body;
        //validate areaUpsertArgs
        try {
            await areaUpsertArgsSchema.validate(areaUpsertArgs)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //upsert area
        const {data, error} = await upsertArea(areaUpsertArgs)
        if (error) {
            return res.status(500).json({error})
        }
        res.json(data)
    }
    if (req.method === 'GET') {
        console.log('im here')
        const areaFindManyArgs = JSON.parse(req.query.areaFindManyArgs as string);
        //validate areaFindManyArgs
        try {
            await areaFindManyArgsSchema.validate(areaFindManyArgs)
        } catch (e: any) {
            return res.status(400).json({error: {message: e.message}})
        }
        //get areas
        const {data, error} = await getAreas(areaFindManyArgs)
        if (error) {
            return res.status(500).json({error})
        }
        res.json({data})
    }
}