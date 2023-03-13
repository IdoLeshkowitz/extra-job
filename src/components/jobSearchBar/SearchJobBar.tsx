'use client'


import InputGroup from "react-bootstrap/InputGroup";
import DropdownSelect from "@/components/dropdown/DropdownSelect";
import Button from "react-bootstrap/Button";
import {object, string} from "yup";
import {Form} from "react-bootstrap";
import {useFormik} from "formik";
import { getPositionScopes } from "@/services/positionScopeService";
import { getProfessions } from "@/services/professionService";
import { Area, Profession, PositionScope } from "@prisma/client";
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";


export default function SearchJobBar() {

    const validationSchema = object({
        text : string(),
        areaId: string(),
        professionId : string()
    })

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
            <InputGroup size='lg' className='border-end-md'>
                <InputGroup.Text className='text-muted ps-3'>
                    <i className='fi-search'/>
                </InputGroup.Text>
                <Form.Control
                    aria-label='Search field'
                    type='text'
                    name="text"
                    placeholder='חיפוש חופשי במאגר'
                    value={formik.values.text}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
            </InputGroup>
            <hr className='d-md-none my-2'/>

                <div className='d-sm-flex'>
                    <Col xs={12} md={6}>
                        <Form.Group controlId='sc-body' className='w-100 mb-sm-0 mb-3'>
                            <Form.Select
                                className='w-100 mb-sm-0 mb-3'
                                placeholder='בחר איזור'
                                name="areaId"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.areaId}
                            >
                                <option value='' disabled className="text-dark">בחר איזור</option>
                                {
                                    areas.map((area, index) =>
                                        <option key={index} value={area.id} className="text-dark">{area.name}</option>)
                                }
                            </Form.Select>
                            
                            {
                                formik.touched.areaId && formik.errors.areaId &&
                                <span className='form-text text-light opacity-50'>
                                    {formik.errors.areaId}
                                </span>
                            }
                        </Form.Group>
                    </Col>

                {/*AREA SELECT*/}
                <hr className='d-md-none my-2'/>

                {/*CATEGORY SELECT*/}
                <Col xs={12} md={6}>
                        <Form.Group controlId='sc-body' className='w-100 mb-sm-0 mb-3'>
                            <Form.Select
                                className='w-100 mb-sm-0 mb-3'
                                placeholder='בחר מקצוע'
                                name="professionId"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.professionId}
                            >
                                <option value='' disabled className="text-dark">בחר מקצוע</option>
                                {
                                    professions.map((profession, index) =>
                                        <option key={index} value={profession.id} className="text-dark">{profession.name}</option>)
                                }
                            </Form.Select>
                            {
                                formik.touched.professionId && formik.errors.professionId &&
                                <span className='form-text text-light opacity-50'>
                                    {formik.errors.professionId}
                                </span>
                            }
                        </Form.Group>
                    </Col>
                <Button size='lg' className='rounded-pill w-100 w-md-auto ms-sm-3' type="submit">Search</Button>
            </div>
        </Form>
    )
}