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

const ApplyButton: FC<ApplyButtonProps> = ({jobListingId}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const session = useSession()
    // return (
    //     <Link
    //         href="/uploadcv"
    //         className="icon-box card bg-faded-dark flex-row align-items-center card-hover rounded-pill p-1 d-flex justify-content-start zindex-10 border-0 align-self-center"
    //     >
    //         <div
    //             className="icon-box-media bg-faded-light text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
    //             <i className="fi-lock"/>
    //         </div>
    //         <h3 className="icon-box-title fs-sm text-light text-end pe-2 ps-1 pt-1">הוסף קורות חיים כדי להמשיך</h3>
    //     </Link>
    // )
    async function onClick() {
        //set state to loading
        setLoading(true)
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
                            id: jobListingId
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
            setLoading(false)
        } catch (e) {
            console.error(e)
            setLoading(false)
            setError(true)
        }
    }

    if (loading) return (
        <div className="placeholder-glow">
            <div className="placeholder col-12 rounded-pill" style={{minHeight: '4rem'}}>
            </div>
        </div>
    )
    if (error) return (
        <div
            className="icon-box-media text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
            <i className="fi-x"/>
        </div>
    )
    return (
        <Button
            onClick={onClick}
            className="icon-box card bg-faded-dark flex-row align-items-center card-hover rounded-pill p-2 d-flex justify-content-start zindex-10 border-0 align-self-center"
        >
            <div
                className="icon-box-media bg-faded-light text-light rounded-circle d-flex justify-content-center align-items-center w-auto">
                <i className="fi-arrow-right"/>
            </div>
            <h3 className="icon-box-title fs-sm text-light text-end pe-2 ps-1 pt-1">הגש בקשה</h3>
        </Button>
    )
}

export default ApplyButton