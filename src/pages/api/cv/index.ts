//@ts-ignore
import {createRouter} from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import multer from "multer";
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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, callback) {
        callback(null, file.originalname)
    }
})
const upload = multer({storage: storage})
const router = createRouter<NextApiRequest, NextApiResponse>()
// @ts-ignore

router.post(async (req, res) => {
    const {user} = await getServerSession(req, res, authOptions) ?? {}
    if (!user) {
        res.status(401).json({message: "Unauthorized"})
        return
    }
    const file = Buffer.from(req.body)
    const cvToCreate: CvCreateInput = {
        file: file,
        User: {connect: {id: user.id}}
    }
    try {
        const createdCv = await prisma.cv.create({data: cvToCreate})
        res.status(200).json({message: "OK"})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error"})
    }
})
router.get(async (req, res) => {
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
})
export default router.handler({})