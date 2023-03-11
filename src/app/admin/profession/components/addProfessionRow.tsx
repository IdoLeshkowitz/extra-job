'use client'
import {fetcher} from "@/lib/api/fetcher";
import {FormEventHandler, useRef} from "react";
import {Prisma, Profession} from "@prisma/client";
import {useRouter} from "next/navigation";
import PillButton from "@/components/buttons/PillButtons";
import {FormControl, FormGroup} from "react-bootstrap";
import ListItemForm from "@/components/forms/ListItemForm";

export default function AddProfessionRow(){
    const nameRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        /*            validate the input        */
        if (!nameRef.current?.value) {
            return
        }
        /*            send the request        */
        const professionCreateInput: Prisma.ProfessionCreateInput = {name: nameRef.current?.value}
        const {data: {profession}} = await fetcher(
            {
                url   : '/api/profession',
                method: 'POST',
                body  : {...professionCreateInput},
                json  : true,
            }) as { data: { profession: Profession } }
        /*            update the UI        */
        router.refresh()
        /*            reset the input        */
        nameRef.current.value = ''
    }
    return (
        <ListItemForm onSubmit={onSubmit}>
            <FormGroup className="w-50" controlId={'aaa'}>
                <FormControl
                    required={true}
                    ref={nameRef}
                    placeholder="שם המקצוע"
                    aria-label="שם המקצוע"
                    dir="rtl"
                />
            </FormGroup>
            <PillButton icon={'fi-plus-circle'} text={'הוסף'} type="submit"/>
        </ListItemForm>
    )
}