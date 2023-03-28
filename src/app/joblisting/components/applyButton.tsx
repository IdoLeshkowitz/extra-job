'use client'
import {FC, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {notFound, usePathname, useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import {fetcher} from "../../../../libs/api/fetcher";
import {JobApplication, Prisma} from ".prisma/client";
import JobApplicationFindFirstArgs = Prisma.JobApplicationFindFirstArgs;
import {log} from "next/dist/server/typescript/utils";
import {JobApplicationStatus} from "@prisma/client";
import Link from "next/link";

interface ApplyButtonProps {
    jobListingId: string
}

enum State {
    NOT_LOGGED_IN,
    MISSING_CV,
    NOT_APPLIED,
    APPLIED,
    LOADING
}

function getTextByState(state: State): string {
    switch (state) {
        case State.NOT_LOGGED_IN:
            return 'עלייך להתחבר כדי להמשיך'
        case State.MISSING_CV:
            return 'הוסף קורות חיים כדי להמשיך'
        case State.NOT_APPLIED:
            return 'הגש מועמדות'
        case State.APPLIED:
            return 'המועמדות נשלחה'
        default:
            return 'טוען...'
    }
}

function getIconByState(state: State): string {
    if (state === State.APPLIED) {
        return 'fi-check'
    }
    if (state === State.NOT_LOGGED_IN) {
        return 'fi-arrow-right'
    }
    if (state === State.MISSING_CV) {
        return 'fi-lock'
    }
    return 'fi-plus'
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
        console.log(data)
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
        //count cv
        const count = countCv(session.data.user.id).then((count: number) => {
            //user doesnt have cv
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
    }, [jobListingId, session?.data?.user, session?.data?.user.cv, session.status])

    async function onClick(state: State) {
        //if user not logged in
        if (state === State.NOT_LOGGED_IN) {
            try {
                //sign in
                router.push('/api/auth/signin')
            } catch (e) {

            }
        }
        if (state === State.MISSING_CV) {
            await router.push('/uploadcv')
        }
        if (state === State.NOT_APPLIED) {
            try {
                setState(State.LOADING)
                await fetcher({url: 'api/jobapplication', method: 'POST', body: {jobListingId}})
                router.push(pathname ?? '/joblisting')
                router.refresh()
                setState(State.APPLIED)
            } catch (e) {
                console.error(e)
                notFound()
            }
        }
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
    return (
        <Button
            disabled={state === State.APPLIED}
            onClick={() => onClick(state)}
            className="icon-box card bg-faded-dark flex-row align-items-center card-hover rounded-pill p-1 d-flex justify-content-start zindex-10 border-0 align-self-center"
        >
            <div className="icon-box-media bg-faded-light text-light rounded-circle fs-6">
                <i className={`${getIconByState(state)} text-end ${state === State.NOT_APPLIED ? 'text-success' : 'text-warning'}`}/>
            </div>
            <h3 className="icon-box-title fs-sm text-light text-end pe-2 ps-1 pt-1">{getTextByState(state)}</h3>
        </Button>
    )
}

export default ApplyButton