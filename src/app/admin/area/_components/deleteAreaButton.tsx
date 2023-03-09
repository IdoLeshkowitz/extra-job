'use client'
import {FC} from "react";
import {useRouter} from "next/navigation";
import {Area, Prisma} from "@prisma/client";

interface DeleteAreaButtonProps {
    area: Area
}

const DeleteAreaButton: FC<DeleteAreaButtonProps> = ({area}) => {
    const {id} = area
    const router = useRouter()
    const handleDeactivation = async () => {
        const areaUpdateInput = Prisma.validator<Prisma.AreaUpdateInput>()({
            active: false,
            createdAt: area.createdAt,
            name: area.name,
        })
        const res = await fetch(`/api/area/${id}`, {
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
export default DeleteAreaButton