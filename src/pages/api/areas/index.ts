import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from "@prisma/client";
import prisma from '../../../../lib/prisma'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            res.json({data: await prisma.area.create({data: {name: req.body.data.name}})})
        } catch (e) {
            res.status(400).json({error: {message: 'unable to create area'}})
        }
    }
    if (req.method === "GET") {
        try {
            res.json({data: await prisma.area.findMany({})})
        } catch (e) {
            res.status(400).json({error: {message: 'unable to get areas'}})
        }
    }
}