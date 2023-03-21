import PillLink from "@/components/links/pillLinks";
import CustomPagination from "@/components/pagination/customPagination";
import JobListingSearchBarAdmin from "./components/JobListingSearchBarAdmin";
import {countJobListings, getJobListingIds} from "@/services/jobListingService";
import JobListingCardAdmin from "./components/JobListingCardAdmin";
import {Fragment} from "react";

const countJobListingsByOptions = async (searchParams: Options): Promise<{ data: { count: number } }> => {
    const {professionId, areaId, positionScopeId, active, serialNumber} = searchParams
    return await countJobListings({
        active: active ? active === 'true' : undefined,
        serialNumber,
        areaId,
        positionScopeId,
        professionId
    })
}

const getJobListingIdsByOptions = async (searchParams: Options): Promise<{ data: { jobListingIds: string[] } }> => {
    const {professionId, areaId, positionScopeId, active, serialNumber, skip, take} = searchParams
    return await getJobListingIds({
        active: active ? active === 'true' : undefined,
        serialNumber,
        areaId,
        positionScopeId,
        professionId,
        skip,
        take,
    })
}

interface Options {
    serialNumber?: string,
    positionScopeId?: string,
    professionId?: string,
    areaId?: string,
    skip?: string,
    take?: string
    active?: string | boolean
}

export default async function JobListingPage({searchParams}: { searchParams: Options }) {
    const [{data: {jobListingIds}}, {data: {count}}] = await Promise.all([getJobListingIdsByOptions(searchParams), countJobListingsByOptions(searchParams)])
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
            <div className="row pt-2">
                {
                    jobListingIds.map((jobListingId, index) => (
                        <Fragment key={index}>
                            {/* @ts-expect-error Async Server Component */}
                            <JobListingCardAdmin key={jobListingId} jobListingId={jobListingId}/>
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
export const revalidate = 0;
