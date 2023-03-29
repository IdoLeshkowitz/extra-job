'use client';
import {FC, MouseEventHandler, useState} from "react";
import {fetcher} from "../../../../../libs/api/fetcher";
import {Prisma} from ".prisma/client";
import {useRouter} from "next/navigation";
import PillButton from "@/components/buttons/pillButtons";
import ProfessionUpdateArgs = Prisma.ProfessionUpdateArgs;

interface DeactivateProfessionButtonProps {
    id: string
}

const DeactivateProfession: FC<DeactivateProfessionButtonProps> = ({id}) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const onDeactivation: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const professionUpdateArgs: ProfessionUpdateArgs = {
            data : {active: false},
            where: {id}
        }
        try {
            setLoading(true)
            const {data} = await fetcher(
                {
                    url   : `/api/profession/${id}`,
                    method: 'PUT',
                    body  : {professionUpdateArgs},
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

export default DeactivateProfession