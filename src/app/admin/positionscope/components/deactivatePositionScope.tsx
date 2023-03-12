'use client'
import {FC, MouseEventHandler} from "react";
import {useRouter} from "next/navigation";
import {Area, Prisma} from "@prisma/client";
import {fetcher} from "@/lib/api/fetcher";
import PillButton from "@/components/buttons/PillButtons";

interface DeactivatePositionScope {
    id: string
}

const DeactivatePositionScope: FC<DeactivatePositionScope> = ({id}) => {
    const router = useRouter()
    const onDeactivate: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const positionScopeUpdateInput :Prisma.PositionScopeUpdateInput = {active: false}

        /* send the request */
        const {data: {area}} = await fetcher(
            {
                url: `/api/positionscope/${id}`,
                method : "PUT",
                body : {...positionScopeUpdateInput},
                json: true,
            })as {data :{area:Area}}
        router.refresh()
    }

    return (
        <PillButton
            onClick={onDeactivate}
            icon ='fi-trash'
            text="מחק"
                />
    )
}
export default DeactivatePositionScope