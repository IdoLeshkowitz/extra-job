import ImageLoader from "@/components/Image/ImageLoader";
import ApplyButton from "@/app/joblisting/components/ApplyButton";
import prisma from "@/lib/prisma";

export default async function JobListingPage({params: {id}}: { params: { id: string } }) {
    const jobListing = await prisma.jobListing.findUnique({
        where  : {id},
        include: {
            area         : true,
            profession   : true,
            positionScope: true,
        }
    })
    return (
        <>
            {/* Page header */}
            <div className='container pt-5 mt-5' style={{direction: 'rtl'}}>
                <div className='d-sm-flex align-items-center justify-content-between mb-4 pb-sm-2 py-4'>
                    <h1 className='h2 mb-sm-0 text-light'>{jobListing?.name}</h1>
                </div>
            </div>
            <div className='pb-5 mb-md-4 container'>
                <div className="row" style={{direction: 'rtl'}}>
                    {/* DESCRIPTION */}
                    <div className='col col-md-7 mb-md-0 mb-4 pb-md-0 pb-2'>
                        <h2 className='h4 text-light'>תיאור המשרה</h2>
                        <div className='mb-4 pb-md-3'>
                            <p className='mb-1'>{jobListing?.description}</p>
                        </div>
                    </div>
                    {/* DETAILS */}

                </div>
            </div>
        </>
    )

}