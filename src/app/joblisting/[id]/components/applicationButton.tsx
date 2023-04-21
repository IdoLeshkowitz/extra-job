'use client'
import {Placeholder} from "react-bootstrap";
import {FC, useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {JobApplicationStatus, Prisma} from "@prisma/client";
import {fetcher} from "@/lib/api/fetcher";
import Link from "next/link";
import {JobApplication} from ".prisma/client";
import JobApplicationFindFirstArgs = Prisma.JobApplicationFindFirstArgs;

enum State {
    NOT_LOGGED_IN,
    MISSING_CV,
    NOT_APPLIED,
    LOADING,
    APPLIED,
    ERROR,
}

async function hasPendingApplication(jobListingId: string, userId: string) {
    const jobApplicationFindFirstArgs: JobApplicationFindFirstArgs = {
        where: {
            appliedBy : {
                id: userId
            },
            jobListing: {
                id: jobListingId
            },
            status    : {
                equals: JobApplicationStatus.PENDING
            }
        }
    }
    try {
        const {data}: { data: { jobApplication: JobApplication | null } } = await fetcher({
            url   : `/api/jobapplication/findfirst?jobApplicationFindFirstArgs=${JSON.stringify(jobApplicationFindFirstArgs)}`,
            method: 'GET',
            json  : true,
        })
        const {jobApplication} = data
        return !!jobApplication
    } catch (e) {
        console.error(e)
        return undefined
    }
}

export default function ApplicationButton({jobListingId}: { jobListingId: string }) {
    const [state, setState] = useState<State>(State.LOADING)
    const {status, data} = useSession()
    useEffect(() => {
        if (status === "loading") {
            setState(State.LOADING)
        }
        if (status === 'unauthenticated') {
            setState(State.NOT_LOGGED_IN)
        }
        if (status === 'authenticated') {
            if (!data.user.cv) {
                setState(State.MISSING_CV)
            } else {
                hasPendingApplication(jobListingId, data.user.id).then(hasPendingApplication => {
                    if (hasPendingApplication) {
                        setState(State.APPLIED)
                    } else {
                        setState(State.NOT_APPLIED)
                    }
                })
            }
        }
    }, [status])

    async function onApply() {
        setState(State.LOADING)
        const jobApplicationCreateArgs: Prisma.JobApplicationCreateArgs = {
            data: {
                appliedBy : {
                    connect: {
                        id: data?.user.id
                    }
                },
                jobListing: {
                    connect: {
                        id: jobListingId
                    }
                }
            }
        }
        try {
            await fetcher({
                url   : `/api/jobapplication`,
                method: 'POST',
                json  : true,
                body  : {jobApplicationCreateArgs}
            })
            setState(State.APPLIED)
        } catch (e) {
            console.error(e)
            setState(State.ERROR)
        }
    }

    // CASE LOADING
    if (state === State.LOADING) {
        return (
            <Placeholder as="div" animation="glow" className="w-100 h-100 px-0">
                <Placeholder xs={12} bg="faded-dark" className="rounded-pill" style={{minHeight: "3.5rem"}}/>
            </Placeholder>
        )
    }

    // CASE NOT LOGGED IN
    if (state === State.NOT_LOGGED_IN) {
        return (
            <PillButton
                onClick={async () => {
                    await signIn()
                }}
                text="עליך להתחבר בכדי להמשיך"
                icon="fi-arrow-right"
            />
        )
    }
    if (state === State.MISSING_CV) {
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
    if (state === State.NOT_APPLIED) {
        return (
            <PillButton
                onClick={onApply}
                text="הגש בקשה"
                icon="fi-arrow-right"
            />
        )
    }
    if (state === State.APPLIED) {
        return (
            <PillButton
                text="הבקשה בתהליך"
                icon="fi-check"
                disabled={true}
                textMode="success"
            />
        )
    }
    return null;
}


interface PillButtonProps {
    onClick?: () => void
    text: string
    icon: string
    disabled?: boolean
    textMode?: 'success' | 'danger' | 'light'
}

const PillButton: FC<PillButtonProps> = (props) => {
    const {onClick, text, icon, disabled, textMode} = props
    return (
        <button
            disabled={!!disabled}
            className="icon-box card bg-faded-dark flex-row align-items-center card-hover rounded-pill p-1 d-flex justify-content-start zindex-10 border-0 align-self-center"
            onClick={onClick}
        >
            <div
                className="icon-box-media bg-faded-light text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
                <i className={icon}/>
            </div>
            <h3
                className={`icon-box-title fs-sm text-end pe-2 ps-1 pt-1 text-success`}
            >{text}</h3>
        </button>
    )
}
