import {cache} from "react";
import prisma from "../prisma";
import {notFound} from "next/navigation";
import {Prisma} from "@prisma/client";
import JobListingUpdateInput = Prisma.JobListingUpdateInput;

interface GetJobListingIdsOptions {
    positionScopeId?: string;
    areaId?: string;
    professionId?: string;
    skip?: string;
    take?: string;
    active?: boolean;
    serialNumber?: string;
}

export const getJobListingIds = cache(async (options: GetJobListingIdsOptions): Promise<{ data: { jobListingIds: string[] } }> => {
    function getSkip(skip: string | undefined): number {
        /*
        If skip is undefined or cannot be converted to int, return 0
         */
        return parseInt(skip ?? "0") || 0
    }

    function getTake(take: string | undefined) {
        const defaultTake = 10;
        /*
        If take is undefined or cannot be converted to int, return defaultTake
         */
        return parseInt(take ?? defaultTake.toString()) || defaultTake;
    }

    const [skip, take] = [getSkip(options.skip), getTake(options.take)];
    const {positionScopeId, areaId, professionId, active, serialNumber} = options;
    try {
        const jobListings = await prisma.jobListing.findMany({
            where : {
                positionScopeId: positionScopeId,
                active         : active,
                areaId         : areaId,
                professionId   : professionId,
                serialNumber   : serialNumber
            },
            select: {
                id: true,
            },
            skip  : skip,
            take  : take
        })
        return {data: {jobListingIds: jobListings.map(jobListing => jobListing.id)}}

    } catch (e) {
        console.log(e)
        return notFound()
    }
})

export const updateJobListing = async (id: string, jobListingUpdateInput: JobListingUpdateInput) => {
    try {
        const jobListing = await prisma.jobListing.update({
            where: {id},
            data : jobListingUpdateInput
        })
        return {data: {jobListing}}
    } catch (e) {
        console.error(e)
        return notFound()
    }
}

export const createJobListing = async (jobListingToCreate: Prisma.JobListingCreateInput) => {
    try {
        const jobListing = await prisma.jobListing.create({
            data: jobListingToCreate
        })
        return {data: {jobListing}}
    } catch (e) {
        console.error(e)
        return notFound()
    }
}

export const countJobListings = cache(async (options: GetJobListingIdsOptions): Promise<{ data: { count: number } }> => {
    const {positionScopeId, areaId, professionId, active, serialNumber} = options;
    try {
        const count = await prisma.jobListing.count({
            where: {
                positionScopeId: positionScopeId,
                areaId         : areaId,
                professionId   : professionId,
                active         : active,
                serialNumber   : serialNumber
            }
        })
        return {data: {count}}
    } catch (e) {
        console.error(e)
        return notFound()
    }
})

export const getJobListingById = cache(async (id: string) => {
    try {
        const jobListing = await prisma.jobListing.findUnique({
            where  : {id},
            include: {
                area         : true,
                profession   : true,
                positionScope: true
            }
        })
        return {data: {jobListing}}
    } catch (e) {
        console.error(e)
        return notFound()
    }
})