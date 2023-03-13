import {Area, JobListing, PositionScope, Profession} from "@prisma/client";
import {countJobListings} from "@/services/jobListingService";
import prisma from "@/lib/prisma";
import JobListingCard from "@/components/card/JobListingCard";

const countAllJobListings = (): Promise<{ data: { count: number } }> => {
    return countJobListings()
}
const getJobListingsByRange = async ({skip, take}: { skip: number, take: number }): Promise<{ data: { jobListings: (JobListing & { area: Area, profession: Profession, positionScope: PositionScope })[] } }> => {
    const jobListings = await prisma.jobListing.findMany({
        skip   : skip,
        take   : take,
        include: {
            area         : true,
            profession   : true,
            positionScope: true,
        }
    })
    return {data: {jobListings}}
}
export default async function JobListingPage({searchParams}: { searchParams: { skip?: string, take?: string } }) {
    const [skip, take]: number[] = [searchParams.skip ?? '0', searchParams.take ?? '5'].map((param) => parseInt(param))
    const [{data: {jobListings}}, {data: {count}}] = await Promise.all([getJobListingsByRange({skip, take}), countAllJobListings()])
    return (
        <div>
            <h1 className="h2 text-light">משרות</h1>
            <div className="row pt-2 bg-dark">
                {
                    jobListings.map((jobListing, index) => (
                        <JobListingCard key={index} jobListing={JSON.stringify(jobListing)} href='#'/>
                    ))
                }
            </div>
        </div>
    )
}

