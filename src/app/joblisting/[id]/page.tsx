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
                    <div className="col-md-5 col">
                        <div className='card mb-4 p-2 shadow-sm card-light card-hover'>
                            <div className="card-body">
                                <div className='d-flex align-items-start mb-3 pb-2 border-bottom'>
                                    {/*IMAGE*/}
                                    <ImageLoader
                                        src='/images/car-finder/icons/buyers.svg'
                                        width={60}
                                        height={60}
                                        alt='Thumbnail'
                                        style={{transform: 'scale(.8)'}}
                                    />
                                    <div className='ps-2 ms-1'>
                                        <h3 className='h5 mb-2 me-2 text-light'>{jobListing?.name}</h3>
                                    </div>
                                </div>

                                {/* Place contacts */}
                                <div className='mb-4 pb-4 border-bottom'>
                                    <div className="me-n1">
                                        <div className='row g-2'>
                                            {/*AREA*/}
                                            <div className='col me-sm-1'>
                                                <div
                                                    className={`${'bg-dark text-light'} rounded text-center w-100 h-100 text-nowrap p-2`}>
                                                    <i className={`fi-geo text-light d-block h4 mb-0`}></i>
                                                    <span className='fs-xs'>{jobListing?.area.name}</span>
                                                </div>
                                            </div>
                                            {/*PROFESSION*/}
                                            <div className='col me-sm-1'>
                                                <div
                                                    className={`${'bg-dark text-light'} rounded text-center w-100 h-100 text-nowrap p-2`}>
                                                    <i className={`fi-briefcase text-light d-block h4 mb-0`}></i>
                                                    <span className='fs-xs'>{jobListing?.profession.name}</span>
                                                </div>
                                            </div>
                                            {/*POSITION SCOPE*/}
                                            <div className='col me-sm-1'>
                                                <div
                                                    className={`${'bg-dark text-light'} rounded text-center w-100 h-100 text-nowrap p-2`}>
                                                    <i className="fi-accounting text-light d-block h4 mb-0"></i>
                                                    <span className='fs-xs'>{jobListing?.positionScope.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*APPLY BUTTON*/}
                                <div className='mb-4 pb-4 border-bottom'>
                                    <ApplyButton jobListingId={id}/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}