'use client'
import Dropdown from "react-bootstrap/Dropdown";
import {fetcher} from "@/lib/api/fetcher";
import {FC} from "react";
import {notFound, useRouter} from "next/navigation";
import {Prisma} from ".prisma/client";
import JobListingUpdateInput = Prisma.JobListingUpdateInput;

interface DeactivateJobListingButtonProps {
    isActive: boolean
    jobListingId: string
}

const ToggleJobListingButton: FC<DeactivateJobListingButtonProps> = ({isActive, jobListingId: id}) => {
    const router = useRouter()

    async function onToggle() {
        try {
            const jobListingUpdateInput: JobListingUpdateInput = {
                active: !isActive
            }
            const res = await fetcher(
                {
                    method: 'PUT',
                    url   : `/api/joblisting/${id}`,
                    body  : jobListingUpdateInput,
                    json  : true
                })
            router.refresh()
        } catch (e) {
            console.error(e)
            notFound()
        }
    }

    return (
        <Dropdown.Item onClick={onToggle}>
            <i className="opacity-60 me-2 fi-minus-circle"></i>
            {isActive ? 'הפסק פרסום' : 'הפעל פרסום'}
        </Dropdown.Item>
    )
}

export default ToggleJobListingButton