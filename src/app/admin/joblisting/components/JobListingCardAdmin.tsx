import Link from 'next/link'
import ImageLoader from '@/components/Image/ImageLoader'
import {FC} from "react";
import {Area, JobListing, PositionScope, Profession} from "@prisma/client";
import ToggleJobListingActive from "@/app/admin/joblisting/components/ToggleJobListingButton";
import DropDownButtons from "@/components/dropdown/dropdownButtons";

interface JobListingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    jobListing: JobListing & { area: Area, profession: Profession, positionScope: PositionScope }
    light?: boolean
    key?: number
}

const JobListingCardAdmin: FC<JobListingCardProps> = ({jobListing}) => {
    const light = true;
    const {name, area, profession, positionScope, active, createdAt, id} = jobListing
    const img = {
        src: '/images/car-finder/icons/buyers.svg',
        alt: name
    }

    return (
        <div
            style={{maxWidth: '42rem'}}
            className="card card-light card-hover"
        >
            <div className='card-body'>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-start'>
                        <div
                            className='position-relative rounded-circle overflow-hidden flex-shrink-0 d-none d-sm-block'
                            style={{width: 100, height: 100}}
                        >
                            {/*ICON*/}
                            {img && <ImageLoader
                                style={{scale: .7}}
                                src={img.src}
                                layout='fill'
                                quality={90}
                                alt={img.alt}
                                light={light ? 1 : 0}
                            />}
                        </div>
                        <div className='ps-sm-3'>

                            {/*TITLE*/}
                            <h3 className='h6 card-title pb-1 mb-2'>
                                <Link href={`/joblisting/${id}`}
                                      className={`${light ? 'text-light opacity-80' : 'text-nav'} stretched-link text-decoration-none`}>
                                    {name}
                                </Link>
                                {/*ACTIVE INDICATOR*/}
                                <span
                                    className={`badge bg-faded-${active ? 'success' : 'danger'} rounded-pill fs-sm ms-2`}
                                >
                                    {active ? 'פעיל' : 'לא פעיל'}
                                </span>
                            </h3>
                            <div className='fs-sm'>
                                {/*AREA*/}
                                <div className='text-nowrap mb-2'>
                                    <i className={`fi-map-pin ${light ? 'text-light opacity-50' : 'text-muted'} me-1`}></i>
                                    <span className={light ? 'text-light opacity-60' : ''}>{area.name}</span>
                                </div>
                                {/*PROFESSION*/}
                                <div className='text-nowrap mb-2'>
                                    <i className={`fi-map-pin ${light ? 'text-light opacity-50' : 'text-muted'} me-1`}></i>
                                    <span className={light ? 'text-light opacity-60' : ''}>{profession.name}</span>
                                </div>
                                {/*POSITION SCOPE*/}
                                <div className='text-nowrap mb-2'>
                                    <i className={`fi-map-pin ${light ? 'text-light opacity-50' : 'text-muted'} me-1`}></i>
                                    <span className={light ? 'text-light opacity-60' : ''}>{positionScope.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-column align-items-end justify-content-between'>
                        <DropDownButtons light={light}>
                            <ToggleJobListingActive isActive={active} jobListingId={id}/>
                        </DropDownButtons>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobListingCardAdmin
