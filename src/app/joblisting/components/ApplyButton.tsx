'use client'
import {FC, MouseEvent} from "react";
import Button from "react-bootstrap/Button";
import {fetcher} from "@/lib/api/fetcher";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {User} from "next-auth";

interface ApplyButtonProps {
    jobListingId: string
    applied: boolean
    href?: string
}

function getState(user: User | undefined, applied: boolean): ButtonStates {
    if (!user) {
        return ButtonStates.NOT_LOGGED_IN
    }
    if (!user.cv) {
        return ButtonStates.MISSING_CV
    }
    if (applied) {
        return ButtonStates.APPLIED
    }
    return ButtonStates.NOT_APPLIED
}

enum ButtonStates {
    NOT_LOGGED_IN,
    MISSING_CV,
    NOT_APPLIED,
    APPLIED
}

function getTextByState(state: ButtonStates): string {
    switch (state) {
        case ButtonStates.NOT_LOGGED_IN:
            return 'עלייך להתחבר כדי להמשיך'
        case ButtonStates.MISSING_CV:
            return 'הוסף קורות חיים כדי להמשיך'
        case ButtonStates.NOT_APPLIED:
            return 'הגש מועמדות'
        case ButtonStates.APPLIED:
            return 'המועמדות נשלחה'
    }
}

function getIconByState(state: ButtonStates): string {
    if (state === ButtonStates.APPLIED) {
        return 'fi-check'
    }
    if (state === ButtonStates.NOT_LOGGED_IN) {
        return 'fi-arrow-right'
    }
    if (state === ButtonStates.MISSING_CV) {
        return 'fi-lock'
    }
    return 'fi-plus'
}

const ApplyButton: FC<ApplyButtonProps> = (props) => {
    const {href, jobListingId, applied} = props
    const router = useRouter()
    const {data} = useSession()
    const {user} = data ?? {}
    const state = getState(user, applied)
    console.log(user)

    async function handleClick(e: MouseEvent<HTMLButtonElement>) {
        try {
            await fetcher({json: true, method: 'POST', url: '/api/jobapplication', body: {jobListingId}})
            router.refresh()
        } catch (e) {
            console.error(e)
        }
    }

    // if (user?.role === Role.ADMIN) {
    //     return null
    // }
    return (
        <Button
            onClick={handleClick}
            href={href}
            className="icon-box card card-light flex-row align-items-center card-hover rounded-pill p-1"
        >
            <div className="col d-flex justify-content-center align-items-center">
                <div className="icon-box-media bg-faded-light text-light rounded-circle">
                    <i className={`${getIconByState(state)} text-end ${state === ButtonStates.NOT_APPLIED ? 'text-success' : 'text-warning'}`}/>
                </div>
                <h3 className="icon-box-title fs-sm text-light text-end px-1 pt-1">{getTextByState(state)}</h3>
            </div>
        </Button>
    )
}

export default ApplyButton