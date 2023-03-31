import ToastDismissible from "@/components/toasts/toastDismissible";
import {getUniqueJobListing} from "@/services/jobListingService";
import {Area, JobApplicationStatus, JobListing, PositionScope, Prisma, Profession} from "@prisma/client";
import ApplyButton from "@/app/joblisting/components/applyButton";
import getHebrewDate from "@/lib/util/getHebrewDate";
import Link from "next/link";
import Breadcrumbs from "@/app/joblisting/[id]/components/breadcrumbs";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {findManyJobApplications} from "@/services/jobApplicationService";
import JobApplicationFindFirstArgs = Prisma.JobApplicationFindFirstArgs;



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
                        {/*@ts-expect-error server component*/}
                        <ApplicationButton jobListingId={id}/>
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
async function ApplicationButton({jobListingId}: { jobListingId: string }) {
    const session = await getServerSession(authOptions)
    //user is not logged in
    if (!session) {
        return (
            <Link
                href="/api/auth/signin"
                className="icon-box card bg-faded-dark flex-row align-items-center card-hover rounded-pill p-1 d-flex justify-content-start zindex-10 border-0 align-self-center"
            >
                <div
                    className="icon-box-media bg-faded-light text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
                    <i className="fi-arrow-right"/>
                </div>
                <h3 className="icon-box-title fs-sm text-light text-end pe-2 ps-1 pt-1">עליך להתחבר בכדי להמשיך</h3>
            </Link>
        )
    }
    /*
        user is logged in
        check if the user has a cv
     */
    if (!session.user.cv) {
        return (
            <Link
                href="/uploadcv"
                className="icon-box card bg-faded-dark flex-row align-items-center card-hover rounded-pill p-1 d-flex justify-content-start zindex-10 border-0 align-self-center"
            >
                <div
                    className="icon-box-media bg-faded-light text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
                    <i className="fi-arrow-right"/>
                </div>
                <h3 className="icon-box-title fs-sm text-light text-end pe-2 ps-1 pt-1">עליך להעלות קורות חיים בכדי
                    להמשיך</h3>
            </Link>
        )
    }
    const jobApplicationFindManyArgs: JobApplicationFindFirstArgs = {
        where: {
            appliedBy: {
                id: session.user.id
            },
            status   : {
                in: [JobApplicationStatus.PENDING, JobApplicationStatus.ACCEPTED]
            }
        },
    }
    const {data, error} = await findManyJobApplications(jobApplicationFindManyArgs)
    if (error) {
        return (
            <div
                className="icon-box-media text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
                <i className="fi-x"/>
            </div>
        )
    }
    //check if the user has already applied to this job listing
    const applied = data.jobApplications.find(jobApplication => jobApplication.jobListingId === jobListingId)
    if (applied) {
        return (
            <div
                className="icon-box card bg-faded-dark flex-row align-items-center card-hover rounded-pill p-1 d-flex justify-content-start zindex-10 border-0 align-self-center"
            >
                <div
                    className="icon-box-media bg-faded-light text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
                    <i className="fi-check"/>
                </div>
                <h3 className="icon-box-title fs-sm text-light text-end pe-2 ps-1 pt-1">הבקשה התקבלה</h3>
            </div>
        )
    }
    if (!applied) {
        return <ApplyButton jobListingId={jobListingId}/>
    }

}
