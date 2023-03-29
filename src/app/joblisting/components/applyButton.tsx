'use client'
import {FC, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {notFound, usePathname, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {fetcher} from "../../../../libs/api/fetcher";
import {JobApplication, Prisma} from ".prisma/client";
import {JobApplicationStatus} from "@prisma/client";
import Link from "next/link";
import JobApplicationFindFirstArgs = Prisma.JobApplicationFindFirstArgs;
import JobApplicationCreateArgs = Prisma.JobApplicationCreateArgs;

interface ApplyButtonProps {
    jobListingId: string
}

enum State {
    NOT_LOGGED_IN,
    MISSING_CV,
    NOT_APPLIED,
    APPLIED,
    LOADING,
    ERROR
}

async function getJobApplication(jobListingId: string, appliedById: string) {
    const jobApplicationFindFirstArgs: JobApplicationFindFirstArgs = {
        where     : {
            jobListingId,
            appliedById,
        }, orderBy: {
            createdAt: 'desc'
        },
    }
    try {
        const {data} = await fetcher({
            url   : `/api/jobapplication/first?jobApplicationFindFirstArgs=${JSON.stringify(jobApplicationFindFirstArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data?.jobApplication ?? null
    } catch (e) {
        console.error(e)
        notFound()
    }
}

async function countCv(userId: string) {
    try {
        const {data} = await fetcher({
            url   : `/api/cv/count`,
            method: 'GET',
            json  : true,
        })
        return data?.cvCount ?? 0
    } catch (e) {
        console.error(e)
        notFound()
    }
}

const ApplyButton: FC<ApplyButtonProps> = ({jobListingId}) => {
    const [state, setState] = useState<State>(State.LOADING)
    const router = useRouter()
    const pathname = usePathname()
    const session = useSession()
    useEffect(() => {
        if (state === State.ERROR) {
            return
        }
        //loading
        if (session.status === 'loading') {
            setState(State.LOADING)
            return
        }
        //user not logged in
        if (!session?.data?.user) {
            setState(State.NOT_LOGGED_IN)
            return
        }
        //check if user has cv
        countCv(session.data.user.id).then((count: number) => {
            if (count === 0) {
                setState(State.MISSING_CV)
                return
            }
        })
        //fetch job application
        const jobApplication = getJobApplication(jobListingId, session.data.user.id).then((jobApplication: JobApplication | null) => {
            //user already applied
            if (jobApplication) {
                //check job application status
                if (jobApplication.status === JobApplicationStatus.PENDING) {
                    //if status is pending - show applied
                    setState(State.APPLIED)
                    return
                }
                //if status is not pending - show not applied
                setState(State.NOT_APPLIED)
                return
            }
            //user didnt apply
            else {
                setState(State.NOT_APPLIED)
                return
            }
        })
    }, [jobListingId, session?.data?.user, session?.data?.user?.cv, session.status, state])
    if (state === State.ERROR) {
        return (
            <div
                className="icon-box-media text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
                <i className="fi-x"/>
            </div>
        )
    }

    if (state === State.MISSING_CV) {
        return (
            <Link
                href="/uploadcv"
                className="icon-box card bg-faded-dark flex-row align-items-center card-hover rounded-pill p-1 d-flex justify-content-start zindex-10 border-0 align-self-center"
            >
                <div
                    className="icon-box-media bg-faded-light text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
                    <i className="fi-lock"/>
                </div>
                <h3 className="icon-box-title fs-sm text-light text-end pe-2 ps-1 pt-1">הוסף קורות חיים כדי להמשיך</h3>
            </Link>
        )
    }
    if (state === State.NOT_LOGGED_IN) {
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
    if (state === State.LOADING) {
        return (
            <div
                className="icon-box-media text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
                <div className="spinner-grow" role="status">
                </div>
            </div>
        )
    }
    if (state === State.APPLIED) {
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
    if (state === State.NOT_APPLIED) {
        async function onClick() {
            //set state to loading
            setState(State.LOADING)
            try {
                const jobApplicationCreateArgs: JobApplicationCreateArgs = {
                    data: {
                        appliedBy : {
                            connect: {
                                id: session!.data!.user!.id
                            }
                        },
                        jobListing: {
                            connect: {
                                id: jobListingId,
                            }
                        }
                    }
                }
                //create job application
                const {data} = await fetcher({
                    url   : `/api/jobapplication`,
                    method: 'POST',
                    json  : true,
                    body  : {jobApplicationCreateArgs},
                })
                //set state to applied
                setState(State.APPLIED)
            } catch (e) {
                console.error(e)
                setState(State.ERROR)
            }
        }

        return (
            <Button
                onClick={onClick}
                className="icon-box card bg-faded-dark flex-row align-items-center card-hover rounded-pill p-1 d-flex justify-content-start zindex-10 border-0 align-self-center"
            >
                <div
                    className="icon-box-media bg-faded-light text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
                    <i className="fi-arrow-right"/>
                </div>
                <h3 className="icon-box-title fs-sm text-light text-end pe-2 ps-1 pt-1">הגש בקשה</h3>
            </Button>
        )
    }

    return null
}

export default ApplyButton