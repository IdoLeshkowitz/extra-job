'use client'
import {fetcher} from "../../../../../libs/api/fetcher";
import {FormEventHandler, useRef, useState} from "react";
import {Prisma} from "@prisma/client";
import {useRouter} from "next/navigation";
import {FormControl} from "react-bootstrap";
import PillButton from "@/components/buttons/pillButtons";
import ToastDismissible from "@/components/toasts/toastDismissible";

export default function CreatePositionScope() {
    const nameRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const [errors, setErrors] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        /*            validate the input        */
        if (!nameRef.current?.value) {
            return
        }
        /*            send the request        */
        const positionScopeUpsertArgs: Prisma.PositionScopeUpsertArgs = {
            where : {name: nameRef.current.value},
            create: {name: nameRef.current.value},
            update: {active: true},
        }
        try {
            setLoading(true)
            const res = await fetcher(
                {
                    url   : '/api/positionscope',
                    method: 'POST',
                    body  : {positionScopeUpsertArgs},
                    json  : true,
                })
            router.refresh()
            setLoading(false)
        } catch (e: any) {
            const {message} = e.error
            setErrors([message])
            setLoading(false)
        }
    }
    return (
        <>
            {errors.map((error, index) => (
                <ToastDismissible text={error} title='שגיאה' key={index}/>
            ))}
            <form
                className="list-group-item bg-faded-dark shadow-sm rounded border-light d-flex justify-content-between  align-items-center p-3"
                style={{direction: 'rtl'}}
                onSubmit={onSubmit}
            >
                <FormControl
                    ref={nameRef}
                    type="text"
                    placeholder="הכנס שם"
                    className="w-50"
                    required={true}
                />
                <PillButton type="submit" loading={loading} text="הוסף" icon="fi-plus-circle"/>
            </form>
        </>
    )
}
