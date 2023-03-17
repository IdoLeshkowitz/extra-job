import {Area, JobListing, PositionScope, Profession} from "@prisma/client";
import prisma from "@/lib/prisma";
import JobListingCardAdmin from "@/app/admin/joblisting/components/JobListingCardAdmin";
import PillLink from "@/components/links/pillLinks";
import CustomPagination from "@/components/pagination/customPagination";
import JobListingSearchBarAdmin from "./components/JobListingSearchBarAdmin";


const countAllJobListings = async (searchParams: SearchParams): Promise<{ data: { count: number } }> => {
    const {skip, take, professionId, areaId, positionScopeId, active, serialNumber} = searchParams
    const count = await prisma.jobListing.count({
        where: {
            active: active === "false" ? false : true,
            serialNumber,
            areaId,
            positionScopeId,
            professionId
        },
    })
    return {data: {count}}
}
const getJobListings = async (searchParams: SearchParams): Promise<{ data: { jobListings: (JobListing & { area: Area, profession: Profession, positionScope: PositionScope })[] } }> => {
    const {skip, take, professionId, areaId, positionScopeId, active, serialNumber} = searchParams
    console.log(searchParams)
    const jobListings = await prisma.jobListing.findMany({
        skip   : parseInt(skip ?? '0'),
        take   : parseInt(take ?? '10'),
        include: {
            area         : true,
            profession   : true,
            positionScope: true,
        },
        where  : {
            serialNumber,
            active: active === 'false' ? false : true,
            areaId,
            positionScopeId,
            professionId
        }
    })
    return {data: {jobListings}}
}

interface SearchParams {
    serialNumber?: string,
    positionScopeId?: string,
    professionId?: string,
    areaId?: string,
    skip?: string,
    take?: string
    active?: string
}

export default async function JobListingPage({searchParams}: { searchParams: SearchParams }) {
    const [{data: {jobListings}}, {data: {count}}] = await Promise.all([getJobListings(searchParams), countAllJobListings(searchParams)])
    console.log(count)
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
            <div className="row pt-2 bg-dark">
                {jobListings.map((jobListing, index) => (
                    <JobListingCardAdmin key={index} jobListing={jobListing}/>
                ))}
            </div>
            <div className="row pt-2 bg-dark">
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

