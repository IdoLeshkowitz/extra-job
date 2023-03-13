import prisma from "@/lib/prisma";
import {JobListing, Prisma} from "@prisma/client";

export async function getJobListings({skip, take, active}: { skip: number | undefined, take: number | undefined, active: boolean | undefined }): Promise<{ data: { jobListings: JobListing[] } }> {
    const jobListings = await prisma.jobListing.findMany({
        skip,
        take,
        where: {active: active ? active : undefined}
    });
    return {data: {jobListings}}
}

export async function countJobListings({active = undefined}: { active?: boolean } = {}): Promise<{ data: { count: number } }> {
    const count = await prisma.jobListing.count({
        where: {active: active ? active : undefined}
    });
    return {data: {count}}
}

export async function createJobListing(jobListingToCreate: Prisma.JobListingCreateInput): Promise<{ data: { jobListing: JobListing } }> {
    const jobListing = await prisma.jobListing.create({
        data: jobListingToCreate,
    });
    return {data: {jobListing}};
}

export async function updateJobListing(id: string, data: Prisma.JobListingUpdateInput): Promise<{ data: { jobListing: JobListing } }> {
    const updatedJobListing = await prisma.jobListing.update({
        where: {id},
        data,
    });
    return {data: {jobListing: updatedJobListing}};
}

export async function getJobListingById(id: string): Promise<{ data: { jobListing: JobListing | null } }> {
    const jobListing = await prisma.jobListing.findUnique({
        where: {id}
    });
    return {data: {jobListing}}
}