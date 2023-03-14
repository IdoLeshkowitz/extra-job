'use client';
import {FC, MouseEventHandler} from "react";
import {fetcher} from "@/lib/api/fetcher";
import {Prisma} from ".prisma/client";
import {Profession} from "@prisma/client";
import {useRouter} from "next/navigation";
import PillButton from "@/components/buttons/pillButtons";
import ProfessionUpdateInput = Prisma.ProfessionUpdateInput;

interface DeactivateProfessionButtonProps {
    id: string
}

const DeactivateProfession: FC<DeactivateProfessionButtonProps> = ({id}) => {
    const router = useRouter()
    const onDeactivation: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()

        const professionUpdateInput: ProfessionUpdateInput = {active: false}

        /*            send the request        */
        const {data: {profession}} = await fetcher(
            {
                url   : `/api/profession/${id}`,
                method: 'PUT',
                body  : {...professionUpdateInput},
                json  : true,
            }) as { data: { profession: Profession } }

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

export default DeactivateProfession