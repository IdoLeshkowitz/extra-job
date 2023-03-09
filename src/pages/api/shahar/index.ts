import {NextApiRequest, NextApiResponse} from "next";

export default function index(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET"){
        res.status(200).json({message: "hello from Shahar"})
    }
}