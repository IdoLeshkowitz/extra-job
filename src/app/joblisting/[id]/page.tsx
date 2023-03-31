import ToastDismissible from "@/components/toasts/toastDismissible";
import {getUniqueJobListing} from "@/services/jobListingService";
import {Area, JobListing, PositionScope, Profession} from "@prisma/client";
import ApplyButton from "@/app/joblisting/components/applyButton";
import getHebrewDate from "@/lib/util/getHebrewDate";
import Link from "next/link";
import Breadcrumbs from "@/app/joblisting/[id]/components/breadcrumbs";

export default async function Page({params}: { params: { id: string } }) {
    const {id} = params
    const {data, error} = await getUniqueJobListing({
        where  : {
            id
        },
        include: {
            area         : true,
            positionScope: true,
            profession   : true,
        },
    })
    if (error) {
        return <ToastDismissible text="error in getUniqueJobListing" title="error"/>
    }
    const jobListing = data?.jobListing as JobListing & (JobListing & { area: Area, positionScope: PositionScope, profession: Profession })
    if (!jobListing) {
        return <ToastDismissible text="jobListing not found" title="error"/>
    }
    const {area, positionScope, profession, name, jobRequirements, description, createdAt, serialNumber} = jobListing
    return (
        <section className="container mt-5 mb-lg-5 mb-4 pt-5 pb-lg-5" style={{direction: 'rtl'}}>
            <Breadcrumbs/>
            <div className="row justify-content-evenly mt-2">
                <div className="col-lg-7 pt-lg-2 mb-5 mb-lg-0">
                    {/*Job Listing Name */}
                    <h1 className='h2 mb-2'>{name}</h1>
                    {/*Description*/}
                    <p className='mb-2 pb-1 '>{description}</p>
                </div>
                <div className="col-lg-5">
                    <div className="row my-3 w-auto mx-0">
                        <ApplyButton jobListingId={id}/>
                    </div>
                    {/*Requirements*/}
                    <div className="card border-0 bg-faded-light mb-4">
                        <div className="card-body">
                            <h5 className="mb-0 pb-3">דרישות המשרה</h5>
                            <ul className="list-unstyled mt-n2 mb-0">
                                {
                                    jobRequirements.map((jobRequirement, index) => {
                                        return (
                                            <li className="mt-2" key={index}>
                                                {jobRequirement}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    {/*Area Profession PositionScope*/}
                    <div className="card border-0 bg-faded-light mb-4">
                        <div className="card-body">
                            <h5 className="mb-0 pb-3">פרטי המשרה</h5>
                            <div className="row mt-2">
                                <div className="col-4">
                                     <span
                                         className='d-inline-block fs-sm text-black-50 ms-2 bg-faded-dark rounded-2 p-2 w-100 text-center'
                                     >
                                        <i className={`fi-map-pin ms-1 mt-n1 fs-lg text-black-50`}></i>
                                         {area.name}
                                     </span>
                                </div>
                                <div className="col-4">
                                        <span
                                            className='d-inline-block fs-sm text-black-50 ms-2 bg-faded-dark rounded-2 p-2 w-100 text-center'
                                        >
                                            <i className={`fi-pie-chart ms-1 mt-n1 fs-lg text-black-50`}></i>
                                            {positionScope.name}
                                        </span>
                                </div>
                                <div className="col-4">
                                        <span
                                            className='d-inline-block fs-sm text-black-50 ms-2 bg-faded-dark rounded-2 p-2 w-100 text-center'
                                        >
                                            <i className={`fi-briefcase ms-1 mt-n1 fs-lg text-black-50`}></i>
                                            {profession.name}
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex fs-sm justify-content-center'>
                        <span className="border-start ps-3">
                            פורסם ב:
                            <b> {getHebrewDate(createdAt)}</b>
                        </span>
                        <span className="pe-3">
                            מספר משרה:
                            <b> {serialNumber}</b>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}