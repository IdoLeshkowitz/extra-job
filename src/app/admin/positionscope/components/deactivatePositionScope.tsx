'use client'
import {FC, MouseEventHandler, useState} from "react";
import {useRouter} from "next/navigation";
import {Prisma} from "@prisma/client";
import {fetcher} from "../../../../../libs/api/fetcher";
import PillButton from "@/components/buttons/pillButtons";
import PositionScopeUpdateArgs = Prisma.PositionScopeUpdateArgs;

interface DeactivatePositionScope {
    id: string
}

const DeactivatePositionScope: FC<DeactivatePositionScope> = ({id}) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const onDeactivate: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const positionScopeUpdateArgs: PositionScopeUpdateArgs = {
            where: {id},
            data : {active: false},
        }
        try {
            setLoading(true)
            const {data} = await fetcher(
                {
                    url   : `/api/positionscope/${id}`,
                    method: 'PUT',
                    body  : {positionScopeUpdateArgs},
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
                    onClick={onDeactivate}
                    icon="fi-trash"
                    text="מחק"
                />
            }
        </>
    )
}
export default DeactivatePositionScope