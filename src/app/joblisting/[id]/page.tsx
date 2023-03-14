import prisma from "@/lib/prisma";
import JobListingCard from "@/components/cards/JobListingCard";
import {notFound} from "next/navigation";

export default async function JobListingPage({params: {id}}: { params: { id: string } }) {
    const jobListing = await prisma.jobListing.findUnique({
        where  : {id},
        include: {
            area         : true,
            profession   : true,
            positionScope: true,
        }
    })
    if (!jobListing) return notFound()
    return (
        <div className='container mt-2 border border-light rounded-3 col-md-11' style={{direction: 'rtl'}}>
            <div className='row align-items-center'>
                <div className="col-md-4">
                    <div className='d-sm-flex align-items-center justify-content-between mb-4 pb-sm-2 py-2'>
                        <h1 className='h2 mb-sm-0 text-light'>{jobListing?.name}</h1>
                    </div>
                    <h2 className='h4 text-light'>תיאור המשרה</h2>
                    <div className='mb-4 pb-md-3'>
                        <p className='mb-1'>{jobListing?.description}</p>
                    </div>
                </div>
                <div className="col-md-8 p-2 justify-content-end d-flex" style={{direction: 'rtl'}}>
                    {/* DESCRIPTION */}
                    {/* DETAILS */}
                    <JobListingCard jobListing={jobListing}/>
                </div>
            </div>
        </div>
    )

}