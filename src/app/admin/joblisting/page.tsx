import {JobListing} from "@prisma/client";
import {countJobListings} from "@/services/jobListingService";
import prisma from "@/lib/prisma";
import JobListingCard from "@/components/card/JobListingCard";

const countAllActiveJobListings = (): Promise<{ data: { count: number } }> => {
    return countJobListings({active: true})
}
const getActiveJobListingsByRange = async ({skip, take}: { skip: number, take: number }): Promise<{ data: { jobListings: JobListing[] } }> => {
    const jobListings = await prisma.jobListing.findMany({
        where  : {
            active: true
        },
        skip   : skip,
        take   : take,
        include: {
            area           : true,
            profession     : true,
            positionScope  : true,
        }
    })
    return {data: {jobListings}}
}
export default async function JobListingPage({searchParams}: { searchParams: { skip?: string, take?: string } }) {
    const [skip, take]: number[] = [searchParams.skip ?? '0', searchParams.take ?? '5'].map((param) => parseInt(param))
    const [{data: {jobListings}}, {data: {count}}] = await Promise.all([getActiveJobListingsByRange({skip, take}), countAllActiveJobListings()])
    return (
        <div>
            <h1 className="h2 text-light">משרות</h1>
            <div className="row pt-2 bg-dark">

            </div>
        </div>
    )
}

