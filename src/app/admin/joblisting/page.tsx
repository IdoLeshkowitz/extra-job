import {Area, JobListing, PositionScope, Profession} from "@prisma/client";
import {countJobListings} from "@/services/jobListingService";
import prisma from "@/lib/prisma";
import JobListingCardAdmin from "@/app/admin/joblisting/components/JobListingCardAdmin";
import PillLink from "@/components/links/pillLinks";
import CustomPagination from "@/components/pagination/customPagination";
import JobListingSearchBarAdmin from "./components/JobListingSearchBarAdmin";


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
        <>
            <div className="row">
                <div className ="d-flex align-items-center justify-content-between mb-3">
                    <h1 className="h2 text-light">משרות</h1>
                    <PillLink href="/admin/joblisting/create" text="הוסף משרה" icon="fi-plus"/>
                </div>
            </div>
            <div className="row pt-2">
                <JobListingSearchBarAdmin/>
            </div>
            <div className="row pt-2 bg-dark">
                {
                    jobListings.map((jobListing, index) => (
                        <JobListingCardAdmin key={index} jobListing={jobListing}/>
                    ))
                }
            </div>
            <div className="row pt-2 bg-dark"><CustomPagination count={count} skip={skip} take={take}/></div>
        </>
    )
}

