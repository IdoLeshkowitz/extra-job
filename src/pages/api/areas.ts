import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from "@prisma/client";
import prisma from '../../../lib/prismadb'
export default async  function handler(req : NextApiRequest,res : NextApiResponse){
    if (req.method === 'POST'){
        const createArea =(name : string)=>{
            return Prisma.validator<Prisma.AreaCreateInput>()({
            name
            })
        }
        const createdArea = await prisma?.area.create({data: createArea(req.body.data.name)});
        res.json({data : createdArea})
    }
    if (req.method === 'GET'){
        return res.json('helllllooooo')
    }
}