import prisma from "@/lib/prisma";
import JobListingSearchBar from "@/app/components/JobListingSearchBar";
import JobListingCard from "@/app/joblisting/components/JobListingCard";
import CustomPagination from "@/components/pagination/customPagination";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession, User} from "next-auth";
import ApplyButton from "@/app/joblisting/components/ApplyButton";
import {Fragment, Key} from "react";

function getJobListings({positionScopeId, areaId, professionId, skip, take}: SearchParams) {
    return prisma.jobListing.findMany({
        where  : {
            active         : true,
            areaId         : areaId,
            positionScopeId: positionScopeId,
            professionId   : professionId
        },
        skip   : skip ? parseInt(skip) : undefined,
        take   : take ? parseInt(take) : undefined,
        include: {
            area         : true,
            profession   : true,
            positionScope: true,
        }
    });
}

async function getUserJobApplications(user: User | undefined) {
    if (!user) return []
    return prisma.jobApplication.findMany({
        where: {
            appliedById : user.id,
            jobListingId: {}
        }
    })
}

function countJobListings({positionScopeId, areaId, professionId}: SearchParams) {
    return prisma.jobListing.count({
        where: {
            active         : true,
            areaId         : areaId,
            positionScopeId: positionScopeId,
            professionId   : professionId
        }
    })
}

interface SearchParams {
    positionScopeId?: string,
    professionId?: string,
    areaId?: string,
    skip?: string,
    take?: string
}

export default async function JobListingPage({searchParams}: { searchParams: SearchParams }) {
    const {user} = await getServerSession(authOptions) ?? {}
    const [skip, take]: string[] = [searchParams.skip ?? '0', searchParams.take ?? '10'].map((param) => param)
    const [jobListings, count, jobApplications] = await Promise.all([getJobListings({...searchParams, skip, take}), countJobListings({...searchParams, skip, take}), getUserJobApplications(user)])
    // console.log(user)
    console.log('running')
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
            <div className="row align-items-stretch">
                {jobListings.map((jobListing, index) => {
                        const applied = !!jobApplications.find((jobApplication) => jobApplication.jobListingId === jobListing.id)
                        return (
                            <Fragment key={index}>
                                {/* @ts-expect-error Async Server Component */}
                                <JobListingCard
                                    key={index}
                                    jobListing={{...jobListing}}
                                    className="col-md-4"
                                >
                                    <ApplyButton
                                        key={`${index}_apply_button`}
                                        jobListingId={jobListing.id}
                                        applied={applied}
                                        LoggedIn={!!user}
                                        MissingCV={!user?.cv}
                                    />
                                </JobListingCard>
                            </Fragment>
                        )
                    }
                )}
            </div>
            <CustomPagination count={count} take={parseInt(take)} skip={parseInt(skip)}/>
        </>
    )
}

export const dynamic = true