'use client'

import {useRef, useState} from "react";
import {useRouter} from "next/navigation";

export default function AddAreaRow() {
    const nameRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    async function handleAdd() {
        try {
            setLoading(true)
            await fetch('http://localhost:3000/api/areas', {
                method: "POST",
                body: JSON.stringify({data: {name: nameRef.current?.value}}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setLoading(false)
            if (nameRef.current){
                nameRef.current.value = ''
            }
            router.refresh()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <tr>
            <td>
                <div className="input-group">
                    <input className="form-control" ref={nameRef}/>
                </div>
            </td>
            <td>
                <button
                    disabled={loading}
                    onClick={handleAdd}
                    className="icon-box d-flex card flex-row align-items-center card-hover border-0 shadow-sm rounded-pill py-2  ">
                    <div className="icon-box-media bg-faded-primary text-primary rounded-circle ">
                        <i className="fi-plus-circle"/>
                    </div>
                </button>
            </td>
        </tr>
    )
}