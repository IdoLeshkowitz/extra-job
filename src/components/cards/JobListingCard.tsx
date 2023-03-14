import Image from "next/image";
import {Area, JobListing, PositionScope, Profession} from "@prisma/client";
import {FC} from "react";
import PillLink from "@/components/links/pillLinks";
import PillButton from "@/components/buttons/pillButtons";

interface JobListingCardProps {
    jobListing: JobListing & { area: Area, profession: Profession, positionScope: PositionScope }
}

function getDateString(date: Date) {
    const d = new Date(date)
    const year = d.toLocaleString('he-IL', {year: 'numeric'})
    const month = d.toLocaleString('he-IL', {month: 'long'})
    const day = d.toLocaleString('he-IL', {day: 'numeric'})
    return `${year} ${month} ${day}`.split(' ').reverse().join(' ')
}

const JobListingCard: FC<JobListingCardProps> = ({jobListing}) => {
    const {name, area, profession, positionScope, active, createdAt, id, serialNumber} = jobListing
    const dateString = getDateString(createdAt)
    const jobListingLink = `/joblisting/${id}`
    //todo add like button
    return (
        <div className="col-sm-6">
            <div className="card card-light card-hover">
                {/*IMAGE CARD*/}
                <div className="card-img-top card-img-hover justify-content-center d-flex p-5">
                    <a href={jobListingLink} className="img-overlay"></a>
                    <div className="position-absolute start-0 top-0 pt-3 ps-3">
                        {/*SERIAL NUMBER*/}
                        <span className="d-table badge bg-info">{`#${serialNumber}`}</span>
                    </div>
                    {/*LIKE BUTTON*/}
                    <div className="content-overlay end-0 top-0 pt-3 pe-3">
                        <button type="button" className="btn btn-icon btn-light btn-xs text-primary rounded-circle"
                                data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Wishlist">
                            <i className="fi-heart"></i>
                        </button>
                    </div>
                    {/*IMAGE*/}
                    <Image width={100} height={100} src="/images/car-finder/icons/buyers.svg" alt="Image"/>
                </div>
                <div className="card-body" style={{direction: 'rtl'}}>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex align-items-center justify-content-between pb-1">
                                {/*CREATE DATE*/}
                                <span className="fs-sm text-light" style={{direction: 'rtl'}}>{dateString}</span>
                            </div>
                            {/*TITLE*/}
                            <h3 className="h6 mb-1">
                                <a href="#" className="nav-link-light">{name}</a>
                            </h3>
                        </div>
                        <div className="col-auto">
                            <PillLink href='/' text='הגש מועמדות' icon='fi-briefcase' />
                        </div>
                    </div>
                </div>
                <div className="card-footer border-0 pt-0">
                    <div className="border-top border-light pt-3">
                        <div className="row g-2">
                            <div className="col me-sm-1">
                                {/*AREA*/}
                                <div className="bg-dark rounded text-center w-100 h-100 p-2">
                                    <i className="fi-geo d-block h4 text-light mb-0 mx-center"></i>
                                    <span className="fs-xs text-light">{area.name}</span>
                                </div>
                            </div>
                            {/*PROFESSION*/}
                            <div className="col me-sm-1">
                                <div className="bg-dark rounded text-center w-100 h-100 p-2">
                                    <i className="fi-briefcase d-block h4 text-light mb-0 mx-center"></i>
                                    <span className="fs-xs text-light">{profession.name}</span>
                                </div>
                            </div>
                            {/*POSITION SCOPE*/}
                            <div className="col">
                                <div className="bg-dark rounded text-center w-100 h-100 p-2">
                                    <i className="fi-pie-chart d-block h4 text-light mb-0 mx-center"></i>
                                    <span className="fs-xs text-light">{positionScope.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JobListingCard