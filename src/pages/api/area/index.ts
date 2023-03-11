import {NextApiRequest, NextApiResponse} from "next";
import {createArea, getAreaByName, getAreas, updateArea} from "@/services/areaService";
import {cookies} from "next/headers";
import {session} from "next-auth/core/routes";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Role} from "@prisma/client";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
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
            const areaWithSameName = await getAreaByName(name);
            if (areaWithSameName.data.area) {
                /*
                case area with the same name exists:
                    if inactive -> reactivate it
                    if active -> return it
                */
                if (!areaWithSameName.data.area.active) {
                    const updatedArea = await updateArea(areaWithSameName.data.area.id, {active: true})
                    return res.status(200).json(updatedArea)
                }
                return res.status(200).json(areaWithSameName)
            }
            /*
            case area with the same name does not exist:
                create a new area and return it
             */
            const newArea = await createArea({name})
            res.status(200).json(newArea)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to create area"}})
        }

    }
    if (req.method === 'GET') {
        /*
        Optional query params:
        {skip: number, take: number, active: boolean}
        If skip and take are specified, the areas are returned in the range of skip to skip + take
        If active is specified, only active or inactive areas are returned
        else all areas are returned
         */
        const skip = req.query.skip ? Number(req.query.skip) : undefined;
        const take = req.query.take ? Number(req.query.take) : undefined;
        const active = req.query.active ? Boolean(req.query.active) : undefined;
        try {

            const areas = await getAreas({skip, take, active})
            res.json(areas)
        } catch (e) {
            console.error(e)
            res.status(500).json({error: {message: "unable to get areas"}})
        }
    }
}