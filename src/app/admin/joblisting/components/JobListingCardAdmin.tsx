'use client'
import Link from 'next/link'
import Dropdown from 'react-bootstrap/Dropdown'
import ImageLoader from '@/components/Image/ImageLoader'
import {FC} from "react";
import {Area, JobListing, PositionScope, Prisma, Profession} from "@prisma/client";
import {fetcher} from "@/lib/api/fetcher";
import {useRouter} from "next/navigation";

interface JobListingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    jobListing: string
    light?: boolean
    key?: number
}

const JobListingCardAdmin: FC<JobListingCardProps> = ({jobListing}) => {
    const router = useRouter()
    const light = true;
    const {name, area, profession, positionScope, active, createdAt,id} = JSON.parse(jobListing) as unknown as (JobListing & { area: Area, profession: Profession, positionScope: PositionScope })
    const img = {
        src: '/images/car-finder/icons/buyers.svg',
        alt: name
    }

    async function onDeactivate() {
        const positionScopeUpdateInput: Prisma.PositionScopeUpdateInput = {active: !active}
        /* send the request */
        const {data: {area}} = await fetcher(
            {
                url   : `/api/joblisting/${id}`,
                method: "PUT",
                body  : {...positionScopeUpdateInput},
                json  : true,
            }) as { data: { area: Area } }
        router.refresh()
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
                        <Dropdown className='position-relative zindex-10'>
                            <Dropdown.Toggle
                                variant={`${light ? 'translucent-light' : 'light shadow-sm'} btn-icon btn-xs rounded-circle`}>
                                <i className='fi-dots-vertical'></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant={light ? 'dark' : ''} className='my-1'>
                                <Dropdown.Item onClick={onDeactivate}>
                                    <i className="opacity-60 me-2 fi-minus-circle"></i>
                                    {active ? 'הפסק פרסום' : 'הפעל פרסום'}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobListingCardAdmin
