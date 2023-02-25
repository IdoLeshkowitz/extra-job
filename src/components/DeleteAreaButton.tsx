'use client'
import {FC} from "react";
import {useRouter} from "next/navigation";
interface DeleteAreaButtonParams {
    areaId: string
}

const DeleteAreaButton: FC<DeleteAreaButtonParams> = (props) => {
    const {areaId} = props
    const router = useRouter()
    const handleDelete = async () => {
        const res = await fetch(`http://localhost:3001/api/area/${areaId}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
        })
        if (!res.ok) {
            throw new Error('failed to delete area')
        }
        return router.refresh()
    }
    return (
        <button onClick={handleDelete}
                className="icon-box d-flex card flex-row align-items-center card-hover border-0 shadow-sm rounded-pill py-2  ">
            <div className="icon-box-media bg-faded-primary text-primary rounded-circle ">
                <i className="fi-trash"/>
            </div>
        </button>
    )
}
export default DeleteAreaButton