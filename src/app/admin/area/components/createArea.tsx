'use client'

import {FormEventHandler, useRef} from "react";
import {useRouter} from "next/navigation";
import {FormControl, FormGroup} from "react-bootstrap";
import PillButton from "@/components/buttons/pillButtons";
import ListItemForm from "@/components/forms/ListItemForm";
import {Area, Prisma} from "@prisma/client";
import {fetcher} from "@/lib/api/fetcher";


export default function CreateArea() {
    const nameRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        /*            validate the input        */
        if (!nameRef.current?.value) {
            return
        }

        /*            send the request        */
        const areaCreateInput: Prisma.AreaCreateInput = {name: nameRef.current?.value}
        const {data: {area}} = await fetcher(
            {
                url   : '/api/area',
                method: 'POST',
                body  : {...areaCreateInput},
                json  : true,
            }) as { data: { area: Area } }

        /*            update the UI        */
        router.refresh()

        /*            reset the input        */
        nameRef.current.value = ''
    }

    return (
        <ListItemForm onSubmit={onSubmit}>
            <FormGroup className="w-50">
                <FormControl
                    required={true}
                    ref={nameRef}
                    placeholder="שם האזור"
                    aria-label="שם האזור"
                    dir="rtl"
                />
            </FormGroup>
            <PillButton icon={'fi-plus-circle'} text={'הוסף'} type="submit"/>
        </ListItemForm>
    )
}