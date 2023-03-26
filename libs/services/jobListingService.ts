import prisma from "../prisma";
import {Prisma} from "@prisma/client";
import {CustomError} from "@/types/error";
import JobListingCountArgs = Prisma.JobListingCountArgs;
import JobListingFindManyArgs = Prisma.JobListingCountArgs;
import JobListingFindUniqueArgs = Prisma.JobListingFindUniqueArgs;
import JobListingUpdateArgs = Prisma.JobListingUpdateArgs;
import JobListingCreateArgs = Prisma.JobListingCreateArgs;

export enum JobListingErrorCodes {
    SERIAL_NUMBER_ALREADY_EXISTS = "P2002",
}

export const getJobListingIds = async (jobListingFindManyArgs: JobListingFindManyArgs) => {
    try {
        const jobListings = await prisma.jobListing.findMany({...jobListingFindManyArgs, select: {id: true}})
        return {data: {jobListings}}
    } catch (e: any) {
        console.error(e)
        return {error: {message: e.message} as CustomError}
    }
}

export const updateJobListing = async (jobListingUpdateArgs: JobListingUpdateArgs) => {
    try {
        const jobListing = await prisma.jobListing.update(jobListingUpdateArgs)
        return {data: {jobListing}}
    } catch (e: any) {
        console.error(e)
        return {error: {message: e.message} as CustomError}
    }
}


export const createJobListing = async (jobListingToCreate: JobListingCreateArgs) => {
    try {
        const jobListing = await prisma.jobListing.create(jobListingToCreate)
        return {data: {jobListing}}
    } catch (e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === JobListingErrorCodes.SERIAL_NUMBER_ALREADY_EXISTS) {
            return {error: {code: JobListingErrorCodes.SERIAL_NUMBER_ALREADY_EXISTS, message: 'קיימת מודעה עם מספר סידורי זהה'}}
        }
        console.error(e)
        return {error: {message: e.message} as CustomError}
    }
}

export const countJobListings = async (jobListingCountArgs: JobListingCountArgs) => {
    try {
        const count = await prisma.jobListing.count(jobListingCountArgs)
        return {data: {count}}
    } catch (e: any) {
        console.error(e)
        return {error: {message: e.message} as CustomError}
    }
}

export const getUniqueJobListing = async (jobListingFindUniqueArgs: JobListingFindUniqueArgs) => {
    try {
        const jobListing = await prisma.jobListing.findUnique(jobListingFindUniqueArgs)
        return {data: {jobListing}}
    } catch (e: any) {
        console.error(e)
        return {error: {message: e.message} as CustomError}
    }
}



