'use client'


import InputGroup from "react-bootstrap/InputGroup";
import DropdownSelect from "@/components/dropdown/DropdownSelect";
import Button from "react-bootstrap/Button";
import {object, string} from "yup";
import {Form} from "react-bootstrap";
import {useFormik} from "formik";
import { Area, Profession } from "@prisma/client";
import { useState, useEffect } from "react";

const validationSchema = object({
    text : string(),
    areaId: string(),
    professionId: string()

})
export default function SearchJobBar() {
    const formik = useFormik({
        initialValues: {
            text: '',
            areaId: '',
            professionId: ''
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const getAreas = async (): Promise<{ data: { areas: Area[] } }> => {
        const res = await fetch('/api/area?active=true')
        if (!res.ok) {
            return Promise.reject(await res.json())
        }
        return await res.json()
    }

    const getProfessions = async (): Promise<{ data: { professions: Profession[] } }> => {
        const res = await fetch('/api/profession')
        if (!res.ok) {
            return Promise.reject(await res.json())
        }
        return await res.json()
    }

    const [areas, setAreas] = useState<Area[]>([])
    const [professions, setProfessions] = useState<Profession[]>([])
    useEffect(() => {
        Promise.all([getAreas(), getProfessions()])
            .then(([{data: {areas}}, {data: {professions}}]) => {
                setAreas(areas)
                setProfessions(professions)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])


    return (
        <Form className='form-group d-block d-md-flex rounded-md-pill mb-2 mb-sm-4'
        onSubmit={formik.handleSubmit}>

            {/*TEXT INPUT*/}
            <InputGroup size='lg' className='border-end-md' >
                <InputGroup.Text className='text-muted ps-3'>
                    <i className='fi-search'/>
                </InputGroup.Text>
                <Form.Control
                    aria-label='Search field'
                    type='text'
                    name="text"
                    placeholder='חיפוש חופשי במאגר'
                    value={formik.values.text}
                    onBlur = {formik.handleBlur}
                    onChange = {formik.handleChange}
                />
            </InputGroup>
            <hr className='d-md-none my-2'/>

            {/*AREA SELECT*/}
            <div className='d-sm-flex'>
                <DropdownSelect
                    name="areaId"
                    value={formik.values.areaId}
                    darkMenu={true}
                    defaultValue='בחר איזור'
                    icon='fi-list'
                    options={areas.map((area) => ['fi-map-pin', area.name])}
                    onBlur = {formik.handleBlur}
                    onChange = {(selected: any) => {
                        formik.setFieldValue('areaId', selected)
                    }}
                    selected={formik.values.areaId}
                    variant='link btn-lg ps-2 ps-sm-3'
                    className='w-100 mb-sm-0 mb-3'
                />
                <hr className='d-md-none my-2'/>

                {/*CATEGORY SELECT*/}
                <DropdownSelect
                    darkMenu={true}
                    defaultValue='בחר מקצוע'
                    icon='fi-list'
                    name="professionId"
                    value={formik.values.professionId}
                    onBlur = {formik.handleBlur}
                    onChange = {formik.handleChange}
                    options={professions.map((profession) => ['fi-geo', profession.name])}
                    variant='link btn-lg ps-2 ps-sm-3'
                    className='w-100 mb-sm-0 mb-3'
                />
                <Button size='lg' className='rounded-pill w-100 w-md-auto ms-sm-3' type="submit" >Search</Button>
            </div>
        </Form>
    )
}