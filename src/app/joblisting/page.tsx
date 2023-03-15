import JobListingCard from "@/components/cards/JobListingCard";
import prisma from "@/lib/prisma";
import JobSearchBar from "@/components/jobSearchBar/JobSearchBar";

async function getJobListings({positionScopeId, areaId, professionId, skip, take}: SearchParams) {
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

interface SearchParams {
    positionScopeId?: string,
    professionId?: string,
    areaId?: string,
    skip?: string,
    take?: string
}

export default async function JobListingPage({searchParams}: { searchParams: SearchParams }) {
    const [skip, take]: number[] = [searchParams.skip ?? '0', searchParams.take ?? '10'].map((param) => parseInt(param))
    const jobListings = await getJobListings({...searchParams})
    return (
        <>
            <div className="row justify-content-center pb-3">
                <div className="col-10">
                    <h1 className='display-4 text-light pb-2 mb-4 mb-lg-5 text-center'>
                        המשרות<span className='text-primary'> שלנו</span>
                    </h1>
                    <JobSearchBar/>
                </div>
            </div>
            <div className="row">
                {
                    jobListings.map((jobListing, index) => (
                        <JobListingCard key={index} jobListing={jobListing}/>))
                }
            </div>
        </>
    )
}