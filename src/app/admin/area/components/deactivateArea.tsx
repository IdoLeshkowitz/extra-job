'use client'
import {FC, MouseEventHandler} from "react";
import {useRouter} from "next/navigation";
import {Area, Prisma} from "@prisma/client";
import PillButton from "@/components/buttons/pillButtons";
import {fetcher} from "@/lib/api/fetcher";
import AreaUpdateInput = Prisma.AreaUpdateInput;

interface DeactivateAreaProps {
    id: string
}

const DeactivateArea: FC<DeactivateAreaProps> = ({id}) => {
    const router = useRouter()
    const onDeactivation: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()

        const areaUpdateInput: AreaUpdateInput = {active: false}

        /*            send the request        */
        const {data: {area}} = await fetcher(
            {
                url   : `/api/area/${id}`,
                method: 'PUT',
                body  : {...areaUpdateInput},
                json  : true,
            }) as { data: { area: Area } }

        /*            update the UI        */
        router.refresh()
    }

    return (
        <PillButton
            onClick={onDeactivation}
            icon="fi-trash"
            text="מחק"
        />
    )
}
export default DeactivateArea