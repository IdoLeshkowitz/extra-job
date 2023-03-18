'use client'
import {FC, Reducer, useEffect, useReducer, useState} from "react";
import Button from "react-bootstrap/Button";
import {notFound, usePathname, useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import {User} from "next-auth";
import {fetcher} from "@/lib/api/fetcher";

interface ApplyButtonProps {
    jobListingId: string
    applied: boolean
    LoggedIn: boolean
    MissingCV: boolean
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

function getState({applied, MissingCV, LoggedIn}: ApplyButtonProps): State {
    if (!LoggedIn) {
        return State.NOT_LOGGED_IN
    }
    if (MissingCV) {
        return State.MISSING_CV
    }
    if (applied) {
        return State.APPLIED
    }
    return State.NOT_APPLIED
}

const ApplyButton: FC<ApplyButtonProps> = (props) => {
    const {jobListingId, applied, MissingCV, LoggedIn} = props
    const [state, setState] = useState<State>(State.LOADING)
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        setState(getState(props))
    }, [props])

    async function onClick(state: State) {
        if (state === State.NOT_LOGGED_IN) {
            try {
                await signIn()
                router.push(pathname ?? '/joblisting')
            } catch (e) {
                console.error(e)
                notFound()
            }
        }
        if (state === State.MISSING_CV) {
            router.push('/uploadcv')
            router.refresh()
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

    if (state === State.LOADING) {
        return (
            <Button
                disabled
                className="icon-box card card-light flex-row align-items-center card-hover rounded-pill p-1"
            >
                    <div className="icon-box-media bg-faded-light text-light rounded-circle d-flex justify-content-center align-items-center">
                        <div className="spinner-grow" role="status">
                        </div>
                </div>
            </Button>
        )
    }
    return (
        <Button
            disabled={state === State.APPLIED}
            onClick={() => onClick(state)}
            className="icon-box card card-light flex-row align-items-center card-hover rounded-pill p-1"
        >
            <div className="col d-flex justify-content-center align-items-center">
                <div className="icon-box-media bg-faded-light text-light rounded-circle">
                    <i className={`${getIconByState(state)} text-end ${state === State.NOT_APPLIED ? 'text-success' : 'text-warning'}`}/>
                </div>
                <h3 className="icon-box-title fs-sm text-light text-end px-1 pt-1">{getTextByState(state)}</h3>
            </div>
        </Button>
    )
}

export default ApplyButton