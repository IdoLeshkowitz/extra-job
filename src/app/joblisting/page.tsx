import JobListingSearchBar from "@/app/components/JobListingSearchBar";
import CustomPagination from "@/components/pagination/customPagination";
import {Fragment} from "react";
import {countJobListings, getJobListingIds} from "@/services/jobListingService";
import ToastDismissible from "@/components/toasts/toastDismissible";

interface JobListingsSearchParams {
    skip?: string,
    take?: string,
    serialNumber?: string,
    areaId?: string,
    positionScopeId?: string,
    professionId?: string,
}

export default async function JobListingPage({searchParams}: { searchParams: JobListingsSearchParams }) {

    const [skip, take] = [parseInt(searchParams.skip ?? '0'), parseInt(searchParams.take ?? '10')];
    const [{data: jobListingData, error: jobListingsIdsError}, {data: countData, error: countError}] = await Promise.all([
        getJobListingIds({
            skip,
            take,
            where  : {
                serialNumber   : searchParams.serialNumber ? searchParams.serialNumber : undefined,
                areaId         : searchParams.areaId ? searchParams.areaId : undefined,
                positionScopeId: searchParams.positionScopeId ? searchParams.positionScopeId : undefined,
                professionId   : searchParams.professionId ? searchParams.professionId : undefined,
            },
            orderBy: {createdAt: 'desc'},
        }),
        countJobListings({
            where: {
                serialNumber   : searchParams.serialNumber ? searchParams.serialNumber : undefined,
                areaId         : searchParams.areaId ? searchParams.areaId : undefined,
                positionScopeId: searchParams.positionScopeId ? searchParams.positionScopeId : undefined,
                professionId   : searchParams.professionId ? searchParams.professionId : undefined,
            },
        }),
    ])
    const jobListings = jobListingData?.jobListings ?? []
    const count = countData?.count ?? 0
    console.log({jobListings, count})
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
        <>
            <div className="row justify-content-center pb-3">
                <div className="col-10">
                    <h1 className='display-4 text-light pb-2 mb-4 mb-lg-5 text-center'>
                        המשרות<span className='text-primary'> שלנו</span>
                    </h1>
                    <JobListingSearchBar/>
                </div>
            </div>
            <div className="row gap-1 justify-content-center">
                {jobListings.map((jobListing, index) => {
                        // const applied = !!jobApplications.find((jobApplication) => jobApplication.jobListingId === jobListing.id)
                        return (
                            <Fragment key={index}>
                            </Fragment>
                        )
                    }
                )}
            </div>
            <CustomPagination count={count} take={take} skip={skip}/>
        </>
    )
}