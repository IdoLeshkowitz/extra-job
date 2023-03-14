'use client'
import Dropdown from "react-bootstrap/Dropdown";
import {Area, Prisma} from "@prisma/client";
import {fetcher} from "@/lib/api/fetcher";
import {mockProviders} from "next-auth/client/__tests__/helpers/mocks";
import {FC} from "react";
import {useRouter} from "next/navigation";

interface DeactivateJobListingButtonProps {
    isActive: boolean
    jobListingId: string
}

const ToggleJobListingButton: FC<DeactivateJobListingButtonProps> = ({isActive, jobListingId: id}) => {
    const router = useRouter()

    async function onToggle() {
        const positionScopeUpdateInput: Prisma.PositionScopeUpdateInput = {active: !isActive}
        /* send the request */
        const {data: {area}} = await fetcher(
            {
                url   : `/api/joblisting/${id}`,
                method: "PUT",
                body  : {...positionScopeUpdateInput},
                json  : true,
            }) as { data: { area: Area } }
        router.refresh()
    }

    return (
        <Dropdown.Item onClick={onToggle}>
            <i className="opacity-60 me-2 fi-minus-circle"></i>
            {isActive ? 'הפסק פרסום' : 'הפעל פרסום'}
        </Dropdown.Item>
    )
}

export default ToggleJobListingButton