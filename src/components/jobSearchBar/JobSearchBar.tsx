'use client'


import DropdownSelect from "@/components/dropdown/dropdownSelect";
import {Col, Row, SSRProvider} from "react-bootstrap";
import {Area, PositionScope, Profession} from "@prisma/client";
import {SyntheticEvent, useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/Button";


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

const getPositionScopes = async (): Promise<{ data: { positionScopes: PositionScope[] } }> => {
    const res = await fetch('/api/positionscope')
    if (!res.ok) {
        return Promise.reject(await res.json())
    }
    return await res.json()
}
export default function JobSearchBar() {

    const areaIdRef = useRef<string | null>(null)
    const professionIdRef = useRef<string | null>(null)
    const positionScopeIdRef = useRef<string | null>(null)


    const [areas, setAreas] = useState<Area[]>([])
    const [professions, setProfessions] = useState<Profession[]>([])
    const [positionScopes, setPositionScopes] = useState<PositionScope[]>([])
    useEffect(() => {
        Promise.all([getAreas(), getProfessions(), getPositionScopes()])
            .then(([{data: {areas}}, {data: {professions}}, {data: {positionScopes}}]) => {
                setAreas(areas)
                setProfessions(professions)
                setPositionScopes(positionScopes)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    const handleSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
        console.log(areaIdRef.current);
        console.log(professionIdRef.current);
        console.log(positionScopeIdRef.current);
    };


    return (
        <SSRProvider>
            <div className='d-block rounded-md-pill form-group-light'>
                <Row className='py-2'>
                    <Col sm={10} md={3} className='d-sm-flex align-items-center justify-content-between'>
                        {/*AREA SELECT*/}
                        <DropdownSelect
                            darkMenu={true}
                            instructions='בחר אזור'
                            icon='fi-geo'
                            chosenIdRef={areaIdRef}
                            options={areas.map((area) => {
                                return {id: area.id, text: area.name, icon: 'fi-geo'}
                            })}
                            variant='link btn-lg ps-2 ps-sm-3'
                            className='text-center col-xs-10'
                        />
                    </Col>
                    <Col sm={10} md={3} className="d-sm-flex align-items-center justify-content-between">
                        <DropdownSelect
                            darkMenu={true}
                            instructions='בחר מקצוע'
                            icon='fi-briefcase'
                            chosenIdRef={professionIdRef}
                            options={professions.map((profession) => {
                                return {id: profession.id, text: profession.name, icon: 'fi-briefcase'}
                            })}
                            variant='link btn-lg ps-2 ps-sm-3'
                            className=' text-center'
                        />
                    </Col>
                    <Col sm={10} md={3} className="d-sm-flex align-items-center justify-content-between">

                        <DropdownSelect
                            darkMenu={true}
                            instructions='בחר היקף משרה'
                            icon='fi-briefcase'
                            chosenIdRef={positionScopeIdRef}
                            options={positionScopes.map(positionScope => {
                                return {id: positionScope.id, text: positionScope.name, icon: 'fi-briefcase'}
                            })}
                            variant="link btn-lg ps-2 ps-sm-3"
                            className='text-center'
                        />
                    </Col>
                    <Col md={3} sm={12} className='d-flex align-items-center justify-content-end pe-md-4'>
                        <Button size='lg' className='rounded-md-pill w-100' onClick={handleSubmit}>Search</Button>
                    </Col>
                </Row>
            </div>
        </SSRProvider>
    )
}