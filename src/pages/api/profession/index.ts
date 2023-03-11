import {NextApiRequest, NextApiResponse} from "next";
import {Role} from "@prisma/client";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {createProfession, getProfessionByName, getProfessions, updateProfession} from "@/services/professionService";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions)
        if (!session || session.user.role !== Role.ADMIN) {
            return res.status(403).json({error: {message: "unauthorized"}})
        }
        /*
        Required body params:
        {name : string}
        if an area with the same name already exists, it is reactivated and returned
        else a new area is created and returned
        */
        const {name} = req.body;
        try {
            const professionWithSameName = await getProfessionByName(name);
            if (professionWithSameName.data.profession) {
                /*
                case profession with the same name exists:
                    if inactive -> reactivate it
                    if active -> return it
                */
                if (!professionWithSameName.data.profession.active) {
                    const updatedProfession = await updateProfession(professionWithSameName.data.profession.id, {active: true})
                    return res.status(200).json(updatedProfession)
                }
                return res.status(200).json(professionWithSameName)
            }
            /*
            case profession with the same name does not exist:
                create a new profession and return it
             */
            const newProfession = await createProfession({name})
            res.status(200).json(newProfession)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to create profession"}})
        }

    }
    if (req.method === "GET") {
        /*
        Optional query params:
        {skip: number, take: number, active: boolean}
        If skip and take are specified, the professions are returned in the range of skip to skip + take
        If active is specified, only active or inactive professions are returned
        else all professions are returned
         */
        const skip = req.query.skip ? Number(req.query.skip) : undefined;
        const take = req.query.take ? Number(req.query.take) : undefined;
        const active = req.query.active ? Boolean(req.query.active) : undefined;
        try {

            const professions = await getProfessions({skip, take, active})
            res.json(professions)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to get professions"}})
        }
    }
}