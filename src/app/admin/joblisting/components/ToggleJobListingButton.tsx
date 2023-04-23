'use client'
import Dropdown from "react-bootstrap/Dropdown";
import {fetcher} from "../../../../../libs/api/fetcher";
import {FC} from "react";
import {useRouter} from "next/navigation";
import {Prisma} from ".prisma/client";
import JobListingUpdateInput = Prisma.JobListingUpdateInput;
import JobListingUpdateArgs = Prisma.JobListingUpdateArgs;

interface DeactivateJobListingButtonProps {
    active: boolean
    jobListingId: string
}

const ToggleJobListingButton: FC<DeactivateJobListingButtonProps> = ({active, jobListingId: id}) => {
    const router = useRouter()
    async function onToggle() {
        try {
            const jobListingUpdateArgs: JobListingUpdateArgs = {
                where: {id},
                data : {active: !active} as JobListingUpdateInput
            }
            await fetcher({
                url   : `/api/joblisting/${id}`,
                method: 'PUT',
                body  : {jobListingUpdateArgs}
            })
            router.refresh()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Dropdown.Item onClick={onToggle} direction="rtl" className="d-flex justify-content-between align-items-center">
            <p className="m-auto my-0">{active ? 'הפסק פרסום' : 'הפעל פרסום'}</p>
            <i className="opacity-60 fi-minus-circle fs-sm m-auto"></i>
        </Dropdown.Item>
    )
}

export default ToggleJobListingButton