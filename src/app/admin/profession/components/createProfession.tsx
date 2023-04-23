'use client'
import {fetcher} from "../../../../../libs/api/fetcher";
import {FormEventHandler, useRef, useState} from "react";
import {Prisma} from "@prisma/client";
import {useRouter} from "next/navigation";
import PillButton from "@/components/buttons/pillButtons";
import {FormControl} from "react-bootstrap";
import ToastDismissible from "@/components/toasts/toastDismissible";

export default function CreateProfession() {
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
        const professionUpsertArgs: Prisma.ProfessionUpsertArgs = {
            where : {name: nameRef.current.value},
            create: {name: nameRef.current.value},
            update: {active: true},
        }
        try {
            setLoading(true)
            const res = await fetcher(
                {
                    url   : '/api/profession',
                    method: 'POST',
                    body  : {professionUpsertArgs},
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
                    ref={nameRef}
                    type="text"
                    placeholder="הכנס מקצוע"
                    required={true}
                    aria-label="הכנס מקצוע"
                    dir="rtl"
                    className="w-50"
                />
                <PillButton icon={'fi-plus-circle'} text={'הוסף'} type="submit" loading={loading}/>
            </form>
        </>
    )
}