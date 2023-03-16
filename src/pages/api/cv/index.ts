import formidable from 'formidable'
import {NextApiRequest, NextApiResponse} from "next";
import fs from "fs";
import {Prisma} from ".prisma/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import CvCreateInput = Prisma.CvCreateInput;

export const config = {
    api: {
        bodyParser: false
    }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {user} = await getServerSession(req, res, authOptions) ?? {}
        if (!user) {
            res.status(401).end()
            return
        }
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
                const file = files.cv as formidable.File
                const buffer = fs.readFileSync(file.filepath)
                const cvCreateInput: CvCreateInput = {
                    file: buffer,
                    User: {connect: {id: user.id}},
                }
                try {
                    const cv = await prisma.cv.create({data: cvCreateInput})
                    res.status(200).json({cvCreateInput})
                } catch (e) {
                    console.log(e)
                    res.status(500).json({message: "Internal server error"})
                }
            }
        )
    }
    if (req.method === 'GET') {
        const {user} = await getServerSession(req, res, authOptions) ?? {}
        if (!user) {
            res.status(401).json({message: "Unauthorized"})
            return
        }
        const [cv] = await prisma.cv.findMany({where: {userId: user.id}, orderBy: {createdAt: "desc"}, take: 1})
        if (!cv) {
            res.status(404).json({message: "Not found"})
            return
        }
        res.setHeader("Content-Type", "application/pdf")
        res.setHeader("Content-Disposition", "attachment; filename=cv.pdf")
        res.send(cv.file)
    }
}