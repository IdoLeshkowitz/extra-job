'use client'
import {FC} from "react";
import {useRouter} from "next/navigation";
import {log} from "next/dist/server/typescript/utils";

interface DeleteAreaButtonParams {
    areaId: string
}

const DeleteAreaButton: FC<DeleteAreaButtonParams> = (props) => {
    const {areaId} = props
    const router = useRouter()
    const handleDelete = async () => {
        try {
            await fetch(`/api/areas/${areaId}`, {
                method: 'DELETE',
                headers: {'content-type': 'application/json'},
            })
            router.refresh()
        }catch (e){
            console.log(e)
        }
    }
    return (
        <button onClick={handleDelete}
           className="icon-box card card-light flex-row align-items-center card-hover rounded-pill py-2 ps-2 pe-4">
            <div className="icon-box-media bg-faded-light text-light rounded-circle me-2">
                <i className="fi-trash text-end"/>
            </div>
            <h3 className="icon-box-title fs-sm text-light ps-1 mb-0">מחק</h3>
        </button>
    )
}
export default DeleteAreaButton