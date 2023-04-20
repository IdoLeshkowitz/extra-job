import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import {JobApplicationStatus, Prisma} from "@prisma/client";
import {findManyJobApplications} from "@/services/jobApplicationService";
import ApplyButton from "@/app/joblisting/components/applyButton";
import JobApplicationFindFirstArgs = Prisma.JobApplicationFindFirstArgs;

export default async function ApplicationButton({jobListingId}: { jobListingId: string }) {
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
                href={`/uploadcv?redirectTo=/joblisting/${jobListingId}`}
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


export const dynamic = true;