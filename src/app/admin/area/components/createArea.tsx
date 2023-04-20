'use client'

import {FormEventHandler, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {FormControl} from "react-bootstrap";
import {Prisma} from "@prisma/client";
import {fetcher} from "@/lib/api/fetcher";
import ToastDismissible from "@/components/toasts/toastDismissible";
import PillButton from "@/components/buttons/pillButtons";
import AreaUpsertArgs = Prisma.AreaUpsertArgs;


export default function CreateArea() {
    const nameRef = useRef<HTMLInputElement>(null)
    const [errors, setErrors] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        /*            validate the input        */
        if (!nameRef.current?.value) {
            return
        }
        /*            send the request        */
        const areaUpsertArgs: AreaUpsertArgs = {
            where : {name: nameRef.current.value},
            create: {name: nameRef.current.value},
            update: {active: true},
        }
        try {
            setLoading(true)
            await fetcher(
                {
                    url   : '/api/area',
                    method: 'POST',
                    body  : {areaUpsertArgs},
                    json  : true,
                })
            router.refresh()
            setLoading(false)
        } catch (e: any) {
            const {message} = e.error
            setErrors([message])
            setLoading(false)
        }
        /*            reset the input        */
        nameRef.current.value = ''
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
                    required={true}
                    ref={nameRef}
                    placeholder="שם האזור"
                    aria-label="שם האזור"
                    dir="rtl"
                    className="w-50"
                />
                <PillButton icon={'fi-plus-circle'} text={'הוסף'} type="submit" loading={loading}/>
            </form>
        </>
    )
}