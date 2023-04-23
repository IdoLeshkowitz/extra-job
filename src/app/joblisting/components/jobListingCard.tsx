import {getUniqueJobListing} from "@/services/jobListingService";
import {Area, JobListing, PositionScope, Profession} from "@prisma/client";
import Link from 'next/link'
import ApplyButton from "@/app/joblisting/components/applyButton";
import getHebrewDate from "@/lib/util/getHebrewDate";


const JobListingCard = async ({jobListingId}: { jobListingId: string }) => {
    const {data, error} = await getUniqueJobListing({
        where  : {
            id: jobListingId
        },
        include: {
            area           : true,
            profession     : true,
            positionScope  : true,
            JobApplications: true,
        },
    })
    if (error) {
        return <div>error</div>
    }
    const {serialNumber, name, description, area, profession, createdAt, positionScope} = data?.jobListing as JobListing & (JobListing & { area: Area, positionScope: PositionScope, profession: Profession })
    const horizontal = false
    const light = true;
    const href = `/joblisting/${jobListingId}`
    return (
        <div className="col" tabIndex={0}>
            <div
                className="card bg-none shadow-lg card-hover h-100 mx-md-3 border-0 rounded-5"
            >
                <div className='card-body position-relative pb-3 d-flex justify-content-between flex-column'>
                    <h3 className='h6 mb-2 fs-base'>
                        <Link href={href}
                              className="nav-link stretched-link text-dark"
                        >
                            {name}
                        </Link>
                    </h3>
                    <p className={`mb-0 fs-sm text-black-50 opacity-50' `}>{getHebrewDate(createdAt)}</p>
                </div>
                <>
                    <div
                        className='d-flex d-lg-none d-xl-none d-xxl-flex card-footer align-items-center justify-content-center text-nowrap flex-wrap px-1 border-0 gap-2 py-1 mb-1'>
                        <span className='d-inline-block fs-sm text-black-50 ms-2 bg-faded-dark rounded-2 p-2 fs-xs'>
                            <i className={`fi-map-pin ms-1 mt-n1 fs-lg text-black-50`}></i>
                            {area.name}
                        </span>
                        {/*POSITION SCOPE*/}
                        <span className='d-inline-block fs-sm text-black-50 ms-2 bg-faded-dark rounded-2 p-2 fs-xs'>
                            <i className={`fi-pie-chart ms-1 mt-n1 fs-lg text-black-50`}></i>
                            {positionScope.name}
                        </span>
                        {/*PROFESSION*/}
                        <span className='d-inline-block fs-sm text-black-50 bg-faded-dark rounded-2 p-2 fs-xs'>
                            <i className={`fi-briefcase ms-1 mt-n1 fs-lg text-black-50`}></i>
                            {profession.name}
                        </span>
                    </div>
                </>
            </div>
        </div>
    )
}

export default JobListingCard