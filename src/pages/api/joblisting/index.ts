import {NextApiRequest, NextApiResponse} from "next";
import {Prisma} from "@prisma/client";
import {array, object, string, ValidationError} from "yup";
import {createJobListing} from "@/services/jobListingService";
import {instanceOf} from "prop-types";

const jobListingCreateArgsSchema = object({
    data: object({
        name           : string().required(),
        description    : string().required(),
        jobRequirements: array().of(string().required()),
        serialNumber   : string().required(),
        area           : object({
            connect: object({
                id: string().required()
            })
        }),
        profession     : object({
            connect: object({
                id: string().required()
            })
        }),
        positionScope  : object({
            connect: object({
                id: string().required()
            })
        }),
    })
})
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {jobListingCreateArgs}: { jobListingCreateArgs: Prisma.JobListingCreateArgs } = req.body;
        //validate jobListingCreateArgs
        try {
            await jobListingCreateArgsSchema.validate(jobListingCreateArgs)
        } catch (e) {
            if (e instanceof ValidationError) {
                return res.status(400).json({error: {message: e.errors.join(", "), code: "VALIDATION_ERROR"}})
            }
        }
        //create jobListing
        const {data, error} = await createJobListing(jobListingCreateArgs)
        if (error) {
            if (error.code === "P2002") {
                return res.status(400).json({error: {message: error.message, code: error.code}})
            }
            return res.status(500).json({error: {message: "unable to create job listing"}})
        }
        return res.status(200).json({data})
    }
}