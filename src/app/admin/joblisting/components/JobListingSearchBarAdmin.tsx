'use client'
import DropdownSelect from "@/components/dropdown/dropdownSelect";
import {Col, FormControl, FormGroup, InputGroup, Row, SSRProvider} from "react-bootstrap";
import {Area, PositionScope, Prisma, Profession} from "@prisma/client";
import {SyntheticEvent, useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import {usePathname, useRouter} from "next/navigation";
import {fetcher} from "@/lib/api/fetcher";
import AreaFindManyArgs = Prisma.AreaFindManyArgs;


const getAreas = async () => {
    const areaFindManyArgs: AreaFindManyArgs = {
        where: {active: true},
    }
    try {
        const {data} = await fetcher<{ areas: Area[] }>({
            url   : `/api/area?areaFindManyArgs=${JSON.stringify(areaFindManyArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data.areas
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

const getProfessions = async () => {
    const professionFindManyArgs: Prisma.ProfessionFindManyArgs = {
        where: {active: true},
    }
    try {
        const {data} = await fetcher<{ professions: Profession[] }>({
            url   : `/api/profession?professionFindManyArgs=${JSON.stringify(professionFindManyArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data.professions
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

const getPositionScopes = async () => {
    const positionScopeFindManyArgs: Prisma.PositionScopeFindManyArgs = {
        where: {active: true},
    }
    try {
        const {data} = await fetcher<{ positionScopes: PositionScope[] }>({
            url   : `/api/positionscope?positionScopeFindManyArgs=${JSON.stringify(positionScopeFindManyArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data.positionScopes
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

const useSearchBar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const serialNumberRef = useRef<HTMLInputElement>(null)
    const activeRef = useRef<string>(null)
    const professionIdRef = useRef<string>(null)
    const positionScopeIdRef = useRef<string>(null)
    const areaIdRef = useRef<string>(null)
    const [positionScopes, setPositionScopes] = useState<PositionScope[]>([])
    const [areas, setAreas] = useState<Area[]>([])
    const [professions, setProfessions] = useState<Profession[]>([])
    useEffect(() => {
        getAreas().then(setAreas)
        getProfessions().then(setProfessions)
        getPositionScopes().then(setPositionScopes)
    }, [])
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const serialNumber = serialNumberRef.current?.value
        const active = activeRef.current
        const professionId = professionIdRef.current
        const positionScopeId = positionScopeIdRef.current
        const areaId = areaIdRef.current
        const query = new URLSearchParams()
        if (serialNumber) {
            query.append('serialNumber', serialNumber)
        }
        if (active) {
            query.append('active', active)
        }
        if (professionId) {
            query.append('professionId', professionId)
        }
        if (positionScopeId) {
            query.append('positionScopeId', positionScopeId)
        }
        if (areaId) {
            query.append('areaId', areaId)
        }
        router.push(`${pathname}?${query.toString()}`)
    }
    return {
        serialNumberRef,
        activeRef,
        professionIdRef,
        positionScopeIdRef,
        positionScopes,
        areaIdRef,
        areas,
        professions,
        handleSubmit,
    }
}

export default function JobListingSearchBarAdmin() {
    const {serialNumberRef, activeRef, professionIdRef, positionScopeIdRef, positionScopes, areaIdRef, areas, professions, handleSubmit} = useSearchBar()
    return (
        <SSRProvider>
            <FormGroup className='form-group form-group-light d-block' onSubmit={handleSubmit}>
                <Row className='g-0 ms-lg-n2 p-2' style={{direction: 'rtl'}}>
                    <Col lg={2} className='d-sm-flex align-items-center justify-content-between'>
                        <InputGroup className='border-end-lg border-light'>
                            <FormControl
                                ref={serialNumberRef}
                                placeholder='מספר משרה'
                                aria-label='Search'
                                aria-describedby='search-icon'
                                className="pe-2"
                            />
                            <InputGroup.Text id='search-icon' className='ps-sm-3'>
                                <i className='fi-search jus'></i>
                            </InputGroup.Text>
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
                            className='border-end-sm border-light'
                        />
                    </Col>
                    <hr className='hr-light d-sm-none my-2'/>
                    <Col sm={6} md={3} lg={2}>
                        <DropdownSelect
                            chosenIdRef={activeRef}
                            instructions="סטאטוס"
                            icon='fi-map-pin'
                            options={[{text: 'פעיל', id: 'true'}, {text: 'לא פעיל', id: 'false'}]}
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