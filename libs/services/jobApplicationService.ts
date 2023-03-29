import {Prisma} from ".prisma/client";
import prisma from "@/lib/prisma";
import JobApplicationFindManyArgs = Prisma.JobApplicationFindManyArgs;
import JobListingFindFirstArgs = Prisma.JobListingFindFirstArgs;
import JobApplicationFindFirstArgs = Prisma.JobApplicationFindFirstArgs;

export async function findManyJobApplications(jobApplicationFindManyArgs: JobApplicationFindManyArgs) {
    try {
        const jobApplications = await prisma.jobApplication.findMany(jobApplicationFindManyArgs)
        return {data: {jobApplications}}
    } catch (e: any) {
        console.error(e)
        return {error: {message: e.message}}
    }
}


export async function findFirstJobApplication(jobApplicationFindFirstArgs: JobApplicationFindFirstArgs) {
    try {
        const jobApplication = await prisma.jobApplication.findFirst(jobApplicationFindFirstArgs)
        return {data: {jobApplication}}
    } catch (e: any) {
        console.error(e)
        return {error: {message: e.message}}
    }
}

export async function createJobApplication(jobApplicationCreateArgs: Prisma.JobApplicationCreateArgs) {
    try {
        const jobApplication = await prisma.jobApplication.create(jobApplicationCreateArgs)
        return {data: {jobApplication}}
    } catch (e: any) {
        console.error(e)
        return {error: {message: e.message}}
    }
}