'use client'
import {fetcher} from "@/lib/api/fetcher";
import {FormEventHandler, useRef} from "react";
import {PositionScope, Prisma} from "@prisma/client";
import {useRouter} from "next/navigation";
import ListItemForm from "@/components/forms/ListItemForm";
import {FormControl, FormGroup} from "react-bootstrap";
import PillButton from "@/components/buttons/pillButtons";

export default function CreatePositionScope() {
    const nameRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        /*            validate the input        */
        if (!nameRef.current?.value) {
            return
        }
        /*            send the request        */
        const positionScopeCreateInput: Prisma.PositionScopeCreateInput = {name: nameRef.current?.value}
        const {data: {positionScope}} = await fetcher(
            {
                url   : '/api/positionscope',
                method: 'POST',
                body  : {...positionScopeCreateInput},
                json  : true,
            }) as { data: { positionScope: PositionScope } }
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
                    placeholder="שם היקף המשרה"
                    aria-label="שם היקף המשרה"
                    dir="rtl"
                />
            </FormGroup>
            <PillButton icon={'fi-plus-circle'} text={'הוסף'} type="submit"/>
        </ListItemForm>
    )
}
