import {cache} from "react";
import prisma from "../prisma";
import {Prisma} from "@prisma/client";
import JobListingUpdateInput = Prisma.JobListingUpdateInput;

export enum JobListingErrorCodes {
    SERIAL_NUMBER_ALREADY_EXISTS = "P2002",
    SERVER_ERROR = "SERVER_ERROR"
}

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
})

export const updateJobListing = async (id: string, jobListingUpdateInput: JobListingUpdateInput) => {
    const jobListing = await prisma.jobListing.update({
        where: {id},
        data : jobListingUpdateInput
    })
    return {data: {jobListing}}
}


export const createJobListing = (jobListingToCreate: Prisma.JobListingCreateInput) => {
    return prisma.jobListing.create({
        data: jobListingToCreate
    })
}

export const countJobListings = cache(async (options: GetJobListingIdsOptions): Promise<{ data: { count: number } }> => {
    const {positionScopeId, areaId, professionId, active, serialNumber} = options;
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
})

export const getJobListingById = cache(async (id: string) => {
    const jobListing = await prisma.jobListing.findUnique({
        where  : {id},
        include: {
            area         : true,
            profession   : true,
            positionScope: true
        }
    })
    return {data: {jobListing}}
})



