'use client'
import DropdownSelect from "@/components/dropdown/dropdownSelect";
import {Col, FormControl, FormGroup, InputGroup, Row, SSRProvider} from "react-bootstrap";
import {Area, PositionScope, Profession} from "@prisma/client";
import {SyntheticEvent, useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import {useRouter} from "next/navigation";


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
export default function JobListingSearchBar() {
    const areaIdRef = useRef<string | null>(null)
    const professionIdRef = useRef<string | null>(null)
    const positionScopeIdRef = useRef<string | null>(null)
    const statusRef = useRef<string | null>(null)
    const serialNumberRef = useRef<HTMLInputElement | null>(null)
    const [areas, setAreas] = useState<Area[]>([])
    const [professions, setProfessions] = useState<Profession[]>([])
    const [positionScopes, setPositionScopes] = useState<PositionScope[]>([])
    const router = useRouter()
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
        const areaId = areaIdRef.current
        const professionId = professionIdRef.current
        const positionScopeId = positionScopeIdRef.current
        const serialNumber = serialNumberRef.current
        const status = statusRef.current
        const query = new URLSearchParams()
        if (serialNumber) {
            query.append('serialNumber', serialNumber.value)
        }
        if (status) {
            query.append('status', status)
        }
        if (areaId) {
            query.append('areaId', areaId)
        }
        if (professionId) {
            query.append('professionId', professionId)
        }
        if (positionScopeId) {
            query.append('positionScopeId', positionScopeId)
        }
        const url = `/joblisting?${query.toString()}`
        router.push(url)
    };


    return (
        <SSRProvider>
            <FormGroup className='form-group form-group-light d-block' onSubmit={handleSubmit}>
                <Row className='g-0 ms-lg-n2 p-2 align-items-center'>
                    <Col lg={2}>
                        <InputGroup className='border-end-lg border-light'>
                            <InputGroup.Text id='search-icon' className='text-muted ps-2 ps-sm-3'>
                                <i className='fi-search'></i>
                            </InputGroup.Text>
                            <FormControl
                                ref={serialNumberRef}
                                placeholder='מספר משרה'
                                aria-label='Search'
                                aria-describedby='search-icon'
                            />
                        </InputGroup>
                    </Col>
                    <hr className='hr-light d-lg-none my-2'/>
                    <Col sm={6} md={3} lg={2}>
                        <DropdownSelect
                            chosenIdRef={areaIdRef}
                            instructions="איזור"
                            icon='fi-map-pin'
                            options={areas.map((area, index) => {
                                return {text: area.name, id: area.id}
                            })}
                            darkMenu
                            className='border-end-sm border-light'
                        />
                    </Col>
                    <hr className='hr-light d-sm-none my-2'/>
                    <Col sm={6} md={3} lg={2}>
                        <DropdownSelect
                            chosenIdRef={professionIdRef}
                            instructions="מקצוע"
                            icon='fi-briefcase'
                            options={professions.map((profession, index) => {
                                return {text: profession.name, id: profession.id}
                            })}
                            darkMenu
                            className='border-end-md border-light'
                        />
                    </Col>
                    <hr className='hr-light d-md-none my-2'/>
                    <Col sm={6} md={3} lg={2}>
                        <DropdownSelect
                            chosenIdRef={positionScopeIdRef}
                            instructions="משרה"
                            icon='fi-car'
                            options={positionScopes.map((positionScope, index) => {
                                return {text: positionScope.name, id: positionScope.id}
                            })}
                            darkMenu
                            className='border-end-sm border-light'
                        />
                    </Col>
                    <hr className='hr-light d-sm-none my-2'/>
                    <Col sm={6} md={3} lg={2}>
                        <DropdownSelect
                            chosenIdRef={statusRef}
                            instructions="סטאטוס"
                            icon='fi-map-pin'
                            options={[{text: 'פעיל', id: 'true'}, {text: 'לא פעיל', id: 'false'}]}
                            darkMenu
                        />
                    </Col>
                    <hr className='hr-light d-lg-none my-2'/>
                    <Col lg={2}>
                        <Button className='w-100' onClick={handleSubmit} type="submit">Search</Button>
                    </Col>
                </Row>
            </FormGroup>
        </SSRProvider>
    )
}