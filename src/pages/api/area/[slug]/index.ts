import {NextApiRequest, NextApiResponse} from "next";
import {deleteAreaById} from "../../../../../lib/models/area/crud";
import {connect} from "../../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        await connect();
        const {slug} = req.query;
        const deleletedArea = await deleteAreaById(slug as string);
        res.status(200).json(deleletedArea);
    }
}