import formidable from 'formidable'
import {NextApiRequest, NextApiResponse} from "next";
import fs from "fs";
import {Prisma} from ".prisma/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "../../../../libs/prisma";
import CvCreateInput = Prisma.CvCreateInput;
import CvCreateArgs = Prisma.CvCreateArgs;

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
                const cvCreateArgs: CvCreateArgs = {
                    data: {
                        file: buffer,
                        User: {
                            connect: {
                                id: user.id
                            }
                        }
                    }
                }
                try {

                } catch (e) {
                    console.log(e)
                    res.status(500).json({message: "Internal server error"})
                }
            }
        )
    }
}