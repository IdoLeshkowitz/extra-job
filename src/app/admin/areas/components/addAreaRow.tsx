'use client'

import {useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {FormControl, InputGroup} from "react-bootstrap";

export default function AddAreaRow() {
    const nameRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleAdd() {
        try {
            setLoading(true)
            await fetch('/api/areas', {
                method: "POST",
                body: JSON.stringify({data: {name: nameRef.current?.value}}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setLoading(false)
            if (nameRef.current) {
                nameRef.current.value = ''
            }
            router.refresh()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <li className="list-group-item bg-dark border-bottom border-light text-white d-flex flex-row-reverse justify-content-between h-25 align-items-center">
            <InputGroup size="sm" className="w-50">
                <FormControl
                    ref={nameRef}
                    placeholder="שם האזור"
                    aria-label="שם האזור"
                    dir="rtl"
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            e.stopPropagation()
                            handleAdd()
                        }
                    }
                    }
                />
            </InputGroup>
            <button
                onClick={handleAdd}
                className="icon-box card card-light flex-row align-items-center card-hover rounded-pill py-2 ps-2 pe-4">
                <div className="icon-box-media bg-faded-light text-light rounded-circle me-2">
                    <i className="fi-plus-circle text-end"/>
                </div>
                <h3 className="icon-box-title fs-sm text-light ps-1 mb-0">הוסף</h3>
            </button>
            {/*<button
                disabled={loading}
                onClick={handleAdd}
                className="icon-box d-flex card flex-row align-items-center card-hover border-0 shadow-sm rounded-pill py-2  ">
                <div className="icon-box-media bg-faded-primary text-primary rounded-circle ">
                    <i className="fi-plus-circle"/>
                </div>
            </button>*/}
        </li>
    )
}