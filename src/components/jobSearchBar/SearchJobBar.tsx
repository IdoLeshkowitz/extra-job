'use client'


import InputGroup from "react-bootstrap/InputGroup";
import DropdownSelect from "@/components/dropdown/DropdownSelect";
import Button from "react-bootstrap/Button";
import {object, string} from "yup";
import {Form} from "react-bootstrap";
import {useFormik} from "formik";
import { Area, Profession } from "@prisma/client";
import { useState, useEffect, useRef, SetStateAction } from "react";


export default function SearchJobBar() {

    const areaRef = useRef<any>(null)
    const proffRef = useRef<any>(null)
    const jobRef = useRef<any>(null)

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(areaRef.current);
        console.log(proffRef.current);
        console.log(jobRef.current);

      };


    return (
        <Form className='form-group d-block d-md-flex rounded-md-pill mb-2 mb-sm-4 w-75'
        onSubmit={handleSubmit}>

            {/*AREA SELECT*/}
            <div className='d-sm-flex'>
                <DropdownSelect 
                    darkMenu={true}
                    defaultValue='בחר אזור'
                    icon='fi-geo'
                    name="areaId"
                    state={areaRef}
                    options={areas.map((area) => ['fi-geo', area.name, area.id])}
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
                    state={proffRef}
                    options={professions.map((profession) => ['fi-geo', profession.name, profession.id])}
                    variant='link btn-lg ps-2 ps-sm-3'
                    className='w-100 mb-sm-0 mb-3'
                />
                <hr className='d-md-none my-2'/>

                {/*JOB SELECT*/}
                <DropdownSelect
                    darkMenu={true}
                    defaultValue='בחר היקף משרה'
                    icon='fi-list'
                    name="jobId"
                    state={jobRef}
                    options={[
                        ['fi-geo', 'משרה מלאה', '123'],
                        ['fi-geo', 'משרה חלקית', '124']
                    ]}
                    variant='link btn-lg ps-2 ps-sm-3'
                    className='w-100 mb-sm-0 mb-3'
                />

                <Button size='lg' className='rounded-pill w-100 w-md-auto ms-sm-3' type="submit" >Search</Button>
            </div>
        </Form>
    )
}