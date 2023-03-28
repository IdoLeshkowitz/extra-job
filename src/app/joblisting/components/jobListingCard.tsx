import {getUniqueJobListing} from "@/services/jobListingService";
import {Area, JobListing, PositionScope, Profession} from "@prisma/client";
import Link from 'next/link'
import ApplyButton from "@/app/joblisting/components/applyButton";

function getDateString(date: Date) {
    const d = new Date(date)
    const year = d.toLocaleString('he-IL', {year: 'numeric'})
    const month = d.toLocaleString('he-IL', {month: 'long'})
    const day = d.toLocaleString('he-IL', {day: 'numeric'})
    return `${year} ${month} ${day}`.split(' ').reverse().join(' ')
}

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
    const href = `/joblisting`
    return (
        <div className="col-auto">
            <div
                className="card card-light card-hover h-100"
            >
                <div className='card-body position-relative pb-3 d-flex justify-content-between flex-column'>
                    <h3 className='h6 mb-2 fs-base'>
                        <Link href={href}
                              className="nav-link stretched-link text-dark"
                        >
                            {name}
                        </Link>
                    </h3>
                    <p className={`mb-2 fs-sm text-black-50 opacity-50' `}>{getDateString(createdAt)}</p>
                        <ApplyButton jobListingId={jobListingId}/>
                    {/*{price && <div className='fw-bold'>*/}
                    {/*    <i className={`fi-cash mt-n1 me-2 lead align-middle${light ? ' opacity-50' : ' opacity-70'}`}></i>*/}
                    {/*    <span className={light ? 'opacity-70' : ''}>{price}</span>*/}
                    {/*</div>}*/}
                </div>
                <>
                    <div
                        className='card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap flex-wrap gap-2'>
                        <span className='d-inline-block fs-sm text-black-50 ms-2 bg-faded-dark rounded-2 p-2'>
                            <i className={`fi-map-pin ms-1 mt-n1 fs-lg text-black-50`}></i>
                            {area.name}
                        </span>
                        {/*POSITION SCOPE*/}
                        <span className='d-inline-block fs-sm text-black-50 ms-2 bg-faded-dark rounded-2 p-2'>
                            <i className={`fi-pie-chart ms-1 mt-n1 fs-lg text-black-50`}></i>
                            {positionScope.name}
                        </span>
                        {/*PROFESSION*/}
                        <span className='d-inline-block fs-sm text-black-50 bg-faded-dark rounded-2 p-2'>
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