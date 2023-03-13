'use client'
import Link from 'next/link'
import Dropdown from 'react-bootstrap/Dropdown'
import ImageLoader from '@/components/Image/ImageLoader'
import {FC} from "react";
import {Area, JobListing, PositionScope, Prisma, Profession} from "@prisma/client";

interface Dropdown {
    href?: string
    label: string
    icon?: string
}

interface JobListingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    href: string
    jobListing: (JobListing & { area: Area, profession: Profession, positionScope: PositionScope })[]
    img?: {
        src: string
        alt: string
    }
    title?: string
    location?: string
    salary?: string
    badges?: [string, string][]
    dropdown?: Dropdown[]
    views?: number
    light?: boolean
    className?: string
    key?: number
    active: boolean
}

const JobListingCard: FC<JobListingCardProps> = ({
                                                     jobListing,
                                                     active,
                                                     href,
                                                     img,
                                                     title,
                                                     location,
                                                     salary,
                                                     views,
                                                     className,
                                                 }) => {

    const extraClass = className ? ` ${className}` : ''
    const light = true;
    return (
        <div
            style={{maxWidth: '42rem'}}
            className={`card card-light card-hover${extraClass}`}
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
                                <Link href={href}
                                      className={`${light ? 'text-light opacity-80' : 'text-nav'} stretched-link text-decoration-none`}>
                                    {title}
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
                                    <span className={light ? 'text-light opacity-60' : ''}></span>
                                </div>
                                {salary && <div className='text-nowrap'>
                                    <i className={`fi-cash fs-base ${light ? 'text-light opacity-50' : 'text-muted'} me-1`}></i>
                                    <span className={light ? 'text-light opacity-60' : ''}>{salary}</span>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-column align-items-end justify-content-between'>
                        {/*{dropdown ?*/}
                        {/*    <Dropdown className='position-relative zindex-10'>*/}
                        {/*        <Dropdown.Toggle*/}
                        {/*            variant={`${light ? 'translucent-light' : 'light shadow-sm'} btn-icon btn-xs rounded-circle`}>*/}
                        {/*            <i className='fi-dots-vertical'></i>*/}
                        {/*        </Dropdown.Toggle>*/}
                        {/*        <Dropdown.Menu variant={light ? 'dark' : ''} className='my-1'>*/}
                        {/*            /!*{dropdown.map((item, indx) => {*!/*/}
                        {/*            /!*    if (item.href) {*!/*/}
                        {/*            /!*        return <Dropdown.Item key={indx} as={Link} href={item.href} {...item.props}>*!/*/}
                        {/*            /!*            <i className={`${item.icon} opacity-60 me-2`}></i>*!/*/}
                        {/*            /!*            {item.label}*!/*/}
                        {/*            /!*        </Dropdown.Item>*!/*/}
                        {/*            /!*    } else {*!/*/}
                        {/*            /!*        return <Dropdown.Item key={indx} as='button' {...item.props}>*!/*/}
                        {/*            /!*            <i className={`${item.icon} opacity-60 me-2`}></i>*!/*/}
                        {/*            /!*            {item.label}*!/*/}
                        {/*            /!*        </Dropdown.Item>*!/*/}
                        {/*            /!*    }*!/*/}
                        {/*            /!*})}*!/*/}
                        {/*        </Dropdown.Menu>*/}
                        {/*    /!*</Dropdown> : badges && <div>*!/*/}
                        {/*    /!*{badges.map((badge, indx) => {*!/*/}
                        {/*    /!*    return <span key={indx}*!/*/}
                        {/*    /!*                 className={`badge bg-faded-${badge[0]} rounded-pill fs-sm ms-2`}>{badge[1]}</span>*!/*/}
                        {/*    /!*})}*!/*/}
                        {/*</div>}*/}
                        <strong className={light ? 'text-light opacity-70' : 'fs-sm'}>{views}</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobListingCard
