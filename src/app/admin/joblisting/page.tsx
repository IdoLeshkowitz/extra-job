import {countJobListing, findManyJobListings} from "@/services/jobListingService";
import ToastDismissible from "@/components/toasts/toastDismissible";
import JobListingCardAdmin from "@/app/admin/joblisting/components/JobListingCardAdmin";
import CustomPagination from "@/components/pagination/customPagination";
import PillLink from "@/components/links/pillLinks";
import {Fragment} from "react";
import JobListingSearchBarAdmin from "./components/JobListingSearchBarAdmin";

interface JobListingsSearchParams {
    skip?: string,
    take?: string,
    active?: string,
    serialNumber?: string,
    areaId?: string,
    positionScopeId?: string,
    professionId?: string,
}

export default async function JobListingAdminPage({searchParams}: { searchParams: JobListingsSearchParams }) {
    const [skip, take] = [parseInt(searchParams.skip ?? '0'), parseInt(searchParams.take ?? '10')];
    const [{data: jobListingData, error: jobListingsIdsError}, {data: countData, error: countError}] = await Promise.all([
        findManyJobListings({
            skip,
            take,
            where  : {
                active         : searchParams.active ? searchParams.active === 'true' : undefined,
                serialNumber   : searchParams.serialNumber ? searchParams.serialNumber : undefined,
                areaId         : searchParams.areaId ? searchParams.areaId : undefined,
                positionScopeId: searchParams.positionScopeId ? searchParams.positionScopeId : undefined,
                professionId   : searchParams.professionId ? searchParams.professionId : undefined,
            },
            orderBy: {createdAt: 'desc'},
        }),
        countJobListing({
            where: {
                active         : searchParams.active ? searchParams.active === 'true' : undefined,
                serialNumber   : searchParams.serialNumber ? searchParams.serialNumber : undefined,
                areaId         : searchParams.areaId ? searchParams.areaId : undefined,
                positionScopeId: searchParams.positionScopeId ? searchParams.positionScopeId : undefined,
                professionId   : searchParams.professionId ? searchParams.professionId : undefined,
            },
        }),
    ]);
    const jobListings = jobListingData?.jobListings ?? []
    const count = countData?.count;
    if (jobListings === undefined || count === undefined) {
        if (jobListingsIdsError) {
            return <ToastDismissible text='error in getJobListingIds' title='שגיאה'/>;
        }
        if (countError) {
            return <ToastDismissible text='error in countJobListings' title='שגיאה'/>;
        }
        return <ToastDismissible text='unknown error' title='שגיאה'/>;
    }
    return (
        <>
            <div className="row">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    {/*TITLE*/}
                    <h1 className="h2 text-light">משרות</h1>
                    {/*ADD BUTTON*/}
                    <PillLink href="/admin/joblisting/create" text="הוסף משרה" icon="fi-plus"/>
                </div>
            </div>
            {/*SEARCH BAR*/}
            <div className="row pt-2">
                <JobListingSearchBarAdmin/>
            </div>
            {/*CARDS*/}
            <div className="row pt-2 gap-1 d-flex justify-content-evenly">
                {
                    jobListings.map(jobListing => (
                        <Fragment key={jobListing.id}>
                            {/* @ts-expect-error server component */}
                            <JobListingCardAdmin jobListingId={jobListing.id}/>
                        </Fragment>
                    ))
                }
            </div>
            <div className="row pt-2">
                {/*Pagination*/}
                <CustomPagination
                    count={count}
                    skip={parseInt(searchParams.skip ?? '0')}
                    take={parseInt(searchParams.take ?? '10')}
                />
            </div>
        </>
    )
}

