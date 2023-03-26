'use client'
import {FC, MouseEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {Prisma} from "@prisma/client";
import PillButton from "@/components/buttons/pillButtons";
import {fetcher} from "../../../../../libs/api/fetcher";
import AreaUpdateArgs = Prisma.AreaUpdateArgs;

interface DeactivateAreaProps {
    id: string
}

const DeactivateArea: FC<DeactivateAreaProps> = ({id}) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const onDeactivation: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const areaUpdateArgs: AreaUpdateArgs = {
            where: {id},
            data : {active: false},
        }
        try {
            setLoading(true)
            const {data} = await fetcher(
                {
                    url   : `/api/area/${id}`,
                    method: 'PUT',
                    body  : {areaUpdateArgs},
                    json  : true,
                })

            router.refresh()
            setLoading(false)
        } catch (e: any) {
            console.log(e)
            setLoading(false)
            setError(true)
        }
    }
    return (
        <>
            {error ?
                <PillButton
                    loading={loading}
                    disabled={true}
                    icon="fi-alert-circle"
                    text="שגיאה"
                />
                :
                <PillButton
                    loading={loading}
                    onClick={onDeactivation}
                    icon="fi-trash"
                    text="מחק"
                />
            }
        </>
    )
}
export default DeactivateArea