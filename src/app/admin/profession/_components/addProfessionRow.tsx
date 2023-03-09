'use client'

import {useRouter} from "next/navigation";
import {useRef} from "react";
import {FormControl, InputGroup} from "react-bootstrap";

export default function AddProfessionRow() {
    const nameRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    async function handleAdd() {
        if (!nameRef.current?.value) {
            return
        }
        const res = await fetch('/api/profession', {
            method: "POST",
            body: JSON.stringify({data: {name: nameRef.current?.value}}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!res.ok) {
            return router.push('/404')
        }
        router.refresh()
    }

    return (
        <li className="list-group-item bg-dark border-bottom border-light text-white d-flex flex-row-reverse justify-content-between h-25 align-items-center">
            <InputGroup size="sm" className="w-50">
                <FormControl
                    ref={nameRef}
                    placeholder="שם המקצוע"
                    aria-label="שם המקצוע"
                    dir="rtl"
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            e.stopPropagation()
                            handleAdd()
                        }
                    }}
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
        </li>
    )
}