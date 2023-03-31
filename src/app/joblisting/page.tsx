import {countJobListing, findManyJobListings} from "@/services/jobListingService";
import ToastDismissible from "@/components/toasts/toastDismissible";
import JobListingCard from "./components/jobListingCard";
import CustomPagination from "@/components/pagination/customPagination";
import JobListingSideBar from "@/app/joblisting/components/JobListingSideBar";
import {cache} from "react";
import {Prisma} from ".prisma/client";
import JobListingFindManyArgs = Prisma.JobListingFindManyArgs;
import JobListingCountArgs = Prisma.JobListingCountArgs;

interface JobListingsSearchParams {
    skip?: string,
    take?: string,
    serialNumber?: string,
    areaIds?: string,
    positionScopeIds?: string,
    professionIds?: string,
}


const getJobListingIds = cache(async (jobListingFindManyArgs: JobListingFindManyArgs) => {
    return await findManyJobListings(jobListingFindManyArgs)
})

const countAllJobListings = cache(async (jobListingCountArgs: JobListingCountArgs) => {
    return await countJobListing(jobListingCountArgs)
})

export default async function JobListingPage({searchParams}: { searchParams: JobListingsSearchParams }) {
    const [skip, take] = [parseInt(searchParams.skip ?? '0'), parseInt(searchParams.take ?? '9')];
    const [{data: jobListingData, error: jobListingsIdsError}, {data: countData, error: countError}] = await Promise.all([
        getJobListingIds({
            skip,
            take,
            where  : {
                serialNumber : searchParams.serialNumber ? searchParams.serialNumber : undefined,
                area         : {OR: searchParams.areaIds ? searchParams.areaIds.split(',').map(areaId => ({id: areaId})) : undefined},
                positionScope: {OR: searchParams.positionScopeIds ? searchParams.positionScopeIds.split(',').map(positionScopeId => ({id: positionScopeId})) : undefined},
                profession   : {OR: searchParams.professionIds ? searchParams.professionIds.split(',').map(professionId => ({id: professionId})) : undefined},
            },
            orderBy: {createdAt: 'desc'},
        }),
        countJobListing({
            where: {
                serialNumber : searchParams.serialNumber ? searchParams.serialNumber : undefined,
                area         : {OR: searchParams.areaIds ? searchParams.areaIds.split(',').map(areaId => ({id: areaId})) : undefined},
                positionScope: {OR: searchParams.positionScopeIds ? searchParams.positionScopeIds.split(',').map(positionScopeId => ({id: positionScopeId})) : undefined},
                profession   : {OR: searchParams.professionIds ? searchParams.professionIds.split(',').map(professionId => ({id: professionId})) : undefined},
            }
        }),
    ])
    const jobListings = jobListingData?.jobListings ?? []
    const count = countData?.count ?? 0
    if (jobListingsIdsError || countError) {
        if (jobListingsIdsError) {
            return <ToastDismissible text="error in getJobListingIds" title="error"/>
        }
        if (countError) {
            return <ToastDismissible text="error in countJobListings" title="error"/>
        }
        return <ToastDismissible text="unknown error" title="error"/>
    }
    return (
        <div className='mt-5 pt-5 p-0 container-fluid'>
            <div className='row mt-n3'>
                <JobListingSideBar/>
                <div className='pb-5 pt-4 me-lg-5 col-lg-8 col-xl-9 col'>
                    <div className="row g-4 py-4 row-cols-md-1 row-cols-lg-3 row-cols-xl-3">
                        {
                            jobListings.map((jobListing, indx) => {
                                {/* @ts-expect-error server comonent */}
                                return <JobListingCard jobListingId={jobListing.id} key={indx}/>
                            })
                        }
                    </div>
                    <div className="row mt-3">
                        <CustomPagination count={count} take={take} skip={skip}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const dynamic = "force-dynamic"