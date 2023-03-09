'use client'
import {Prisma, Profession} from "@prisma/client";
import {FC} from "react";
import {useRouter} from "next/navigation";

interface DeleteProfessionButtonProps {
    profession: Profession
}

const DeleteProfessionButton: FC<DeleteProfessionButtonProps> = ({profession}) => {
    const handleDeactivation = async () => {
        const areaUpdateInput = Prisma.validator<Prisma.AreaUpdateInput>()({
            active: false,
            createdAt: profession.createdAt,
            name: profession.name,
        })
        const res = await fetch(`/api/profession/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: {...areaUpdateInput}})
        })
        if (res.status === 200) {
            return router.refresh()
        }
        router.push('/404')
    }
    const {id} = profession
    const router = useRouter()
    return (
        <button
            onClick={handleDeactivation}
            className="icon-box card card-light flex-row align-items-center card-hover rounded-pill py-2 ps-2 pe-4"
        >
            <div className="icon-box-media bg-faded-light text-light rounded-circle me-2">
                <i className="fi-trash text-end"/>
            </div>
            <h3 className="icon-box-title fs-sm text-light ps-1 mb-0">מחק</h3>
        </button>
    )
}

export default DeleteProfessionButton