import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import {Prisma} from ".prisma/client";
import CvCreateInput = Prisma.CvCreateInput;
import {fromBase64, toBase64} from "js-base64";
import * as fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        //get the user from session
        const {user} = await getServerSession(req, res, authOptions) ?? {}
        if (!user) {
            return res.status(403).json({error: {message: "unauthorized"}})
        }
        const pdfFile = req.body as string
        console.log(typeof pdfFile)
        try {
            const cvCreateInput: CvCreateInput = {
                file: pdfFile,
                User: {connect: {id: user.id}}
            }
            const createdCv = await prisma.cv.create({data: cvCreateInput})
            res.json({data: createdCv})
        } catch (e) {
            console.error(e)
            res.status(400).json({error: {message: 'unable to create cv'}})
        }

    }
    if (req.method === "GET") {
        const pdfFile = fs.readFileSync('/users/mymacbook/downloads')
        console.log(pdfFile)
        // res.setHeader('Content-Type', 'application/pdf')
        // res.setHeader('Content-Disposition', 'attachment; filename=CV.pdf')

    }
}