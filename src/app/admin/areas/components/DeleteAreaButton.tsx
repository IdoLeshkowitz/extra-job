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
            await fetch(`http://localhost:3000/api/areas/${areaId}`, {
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
                className="icon-box d-flex card flex-row align-items-center card-hover border-0 shadow-sm rounded-pill py-2  ">
            <div className="icon-box-media bg-faded-primary text-primary rounded-circle ">
                <i className="fi-trash"/>
            </div>
        </button>
    )
}
export default DeleteAreaButton