'use client'
import {FC, MouseEvent} from "react";
import Button from "react-bootstrap/Button";
import {fetcher} from "@/lib/api/fetcher";
import {useRouter} from "next/navigation";

interface ApplyButtonProps {
    jobListingId: string
    text: string
    icon?: string
}

const ApplyButton: FC<ApplyButtonProps> = ({href, text, icon, jobListingId}: any) => {
    const router = useRouter()

    async function handleClick(e: MouseEvent<HTMLButtonElement>) {
        try {
            await fetcher({json: true, method: 'POST', url: '/api/jobapplication', body: {jobListingId}})
            router.refresh()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Button
            onClick={handleClick}
            href={href}
            className="icon-box card card-light flex-row align-items-center card-hover rounded-pill p-1"
        >
            <div className="col d-flex justify-content-center align-items-center">
                <div className="icon-box-media bg-faded-light text-light rounded-circle ms-2">
                    <i className={`${icon && icon} text-end text-success`}/>
                </div>
                <h3 className="icon-box-title fs-sm text-light text-end px-1 pt-1">{text || ''}</h3>
            </div>
        </Button>
    )
}

export default ApplyButton