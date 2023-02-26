import {NextApiRequest, NextApiResponse} from "next";
import {createArea, getAllAreas} from "../../../../lib/models/area/crud";
import {Area} from "../../../../lib/models/area/schema";
import {connect} from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await connect()
        const {data: areaToAdd}: { data: Area } = req.body
        const addedArea = await createArea(areaToAdd)
        res.status(200).json({data: addedArea})
    }
    if (req.method === "GET") {
        await connect()
        const areas = await getAllAreas()
        res.status(200).json({data: areas})
    }
    // if (req.method === "DELETE"){
    //     const name = req.query.name as string
    //     await db.area.delete({where : {name}})
    // }
}