import {useRouter} from "next/navigation";
import AddAreaCard from "@/app/admin/areas/components/AddAreaCard";
async function getAreas(){
    return await prisma?.area.findMany()
}
export default async function AreasPage() {
    return (
        <>
            <AddAreaCard/>
        </>
    )
}

// function AreaCard({areaName, areaId}: { areaName: string, areaId: string }) {
//     return (
//         <div className="card bg-secondary card-hover mb-2">
//             <div className="card-body">
//                 {/*AREA NAME*/}
//                 <div className="d-flex justify-content-between">
//                     <div className="d-flex align-items-start">
//                         <h3 className="h6 card-title pb-1 mb-2">
//                             {areaName}
//                         </h3>
//                     </div>
//                     {/*DELETE BUTTON*/}
//                     <div className="d-flex flex-column align-items-end justify-content-between">
//
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// 'use client'
// import {useState} from "react";
// import {useRouter} from "next/navigation";
//
// export default function DeleteAreaButton({areaId}: { areaId: string }) {
//     const [loading, setLoading] = useState(false)
//     const router = useRouter()
//     const handleDelete = async (areaId: string) => {
//         setLoading(true)
//         const res = await fetch(`/api/areas/${areaId}`, {
//             method: 'DELETE',
//         });
//         if (res.status === 200) {
//             setLoading(false)
//             router.refresh()
//         }
//     }
//
//     return (
//         <button onClick={() => handleDelete(areaId)}
//                 className="btn btn-sm btn-primary"><i className='fi-trash me-2'></i>מחק
//         </button>
//
//     )
// }