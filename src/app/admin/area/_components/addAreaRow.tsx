'use client'

import {FormEventHandler, useRef} from "react";
import {useRouter} from "next/navigation";
import {FormControl, FormGroup} from "react-bootstrap";
import PillButton from "@/components/buttons/PillButtons";
import ListItemForm from "@/components/forms/ListItemForm";


export default function AddAreaRow() {
    const nameRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {

    }

    return (
        <ListItemForm onSubmit={onSubmit}>
            <FormGroup className="w-50" controlId={'aaa'}>
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