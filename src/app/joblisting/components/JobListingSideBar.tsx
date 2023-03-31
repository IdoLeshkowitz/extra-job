'use client'
import {Button, Col, Form, Offcanvas, SSRProvider} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import {FC, MouseEventHandler, useEffect, useState} from "react";
import {Prisma} from ".prisma/client";
import {fetcher} from "@/lib/api/fetcher";
import {Area, PositionScope, Profession} from "@prisma/client";
import {notFound, usePathname, useRouter, useSearchParams} from "next/navigation";
import AreaFindManyArgs = Prisma.AreaFindManyArgs;

async function getAreas() {
    const areaFindManyArgs: AreaFindManyArgs = {
        where: {active: true},
    }
    try {
        const {data} = await fetcher({
            url   : `/api/area?areaFindManyArgs=${JSON.stringify(areaFindManyArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data.areas
    } catch (e) {
        console.log(e)
        return notFound()
    }
}

async function getProfessions() {
    const professionFindManyArgs: Prisma.ProfessionFindManyArgs = {
        where: {active: true},
    }
    try {
        const {data} = await fetcher({
            url   : `/api/profession?professionFindManyArgs=${JSON.stringify(professionFindManyArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data.professions
    } catch (e) {
        console.log(e)
        return notFound()
    }
}

async function getPositionScopes() {
    const positionScopeFindManyArgs: Prisma.PositionScopeFindManyArgs = {
        where: {active: true},
    }
    try {
        const {data} = await fetcher({
            url   : `/api/positionscope?positionScopeFindManyArgs=${JSON.stringify(positionScopeFindManyArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data.positionScopes
    } catch (e) {
        console.log(e)
        return notFound()
    }
}

const JobListingSideBar = () => {
    const [areas, setAreas] = useState<Area[]>([])
    const [professions, setProfessions] = useState<Profession[]>([])
    const [positionScopes, setPositionScopes] = useState<PositionScope[]>([])
    const [selectedAreas, setSelectedAreas] = useState<Area[]>([])
    const [selectedProfessions, setSelectedProfessions] = useState<Profession[]>([])
    const [selectedPositionScopes, setSelectedPositionScopes] = useState<PositionScope[]>([])
    const searchParams = useSearchParams()
    const url = usePathname()
    const router = useRouter()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        Promise.all([getAreas(), getProfessions(), getPositionScopes()])
            .then(([areas, professions, positionScopes]) => {
                setAreas(areas)
                setProfessions(professions)
                setPositionScopes(positionScopes)
            })
    }, [areas, professions, positionScopes])
    useEffect(() => {
        const areaIds = searchParams?.get('areaIds')
        const professionIds = searchParams?.get('professionIds')
        const positionScopeIds = searchParams?.get('positionScopeIds')
        if (areaIds) {
            const areaIdsArray = areaIds.split(',')
            console.log(areaIds)
            const selectedAreas = areas.filter(area => areaIdsArray.includes(area.id.toString()))
            setSelectedAreas(selectedAreas)
        }
        if (professionIds) {
            const professionIdsArray = professionIds.split(',')
            const selectedProfessions = professions.filter(profession => professionIdsArray.includes(profession.id.toString()))
            setSelectedProfessions(selectedProfessions)
        }
        if (positionScopeIds) {
            const positionScopeIdsArray = positionScopeIds.split(',')
            const selectedPositionScopes = positionScopes.filter(positionScope => positionScopeIdsArray.includes(positionScope.id.toString()))
            setSelectedPositionScopes(selectedPositionScopes)
        }
    }, [])
    const onSubmit: MouseEventHandler = (e) => {
        const newSearchParams = new URLSearchParams()
        if (selectedAreas.length > 0) {
            newSearchParams.set('areaIds', selectedAreas.map(area => area.id.toString()).join(','))
        }
        if (selectedProfessions.length > 0) {
            newSearchParams.set('professionIds', selectedProfessions.map(profession => profession.id.toString()).join(','))
        }
        if (selectedPositionScopes.length > 0) {
            newSearchParams.set('positionScopeIds', selectedPositionScopes.map(positionScope => positionScope.id.toString()).join(','))
        }
        const urlToGo = `${url}?${newSearchParams.toString()}`
        router.push(urlToGo)
        router.refresh()
    }

    return (
        <SSRProvider>
            <Col
                as='aside'
                lg={3}
                xl={2}
                className='shadow-sm px-3 px-xl-4 px-xxl-5 pt-lg-2 bg-faded-light rounded me-2 mb-3'
            >
                <Offcanvas
                    show={show}
                    onHide={handleClose}
                    responsive='lg'
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title as='h5'>Filters</Offcanvas.Title>
                    </Offcanvas.Header>

                    {/* Offcanvas body */}
                    <Offcanvas.Body className='py-lg-4'>
                        <div className='pb-4 mb-2'>
                            <h3 className='h6'>איזורים</h3>
                            <SimpleBar autoHide={false} className='simplebar-no-autohide'
                                       style={{maxHeight: '11rem'}}>
                                {
                                    areas.map((area, indx) => (
                                        <Form.Check
                                            key={indx}
                                            id={`area-${indx}`}
                                        >
                                            <Form.Check.Input
                                                type='checkbox'
                                                checked={(() => {
                                                    return selectedAreas.some(a => a.id === area.id)
                                                })()}
                                                className="border-dark"
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setSelectedAreas([...selectedAreas, area])
                                                    } else {
                                                        setSelectedAreas(selectedAreas.filter(a => a.id !== area.id))
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label>
                                                <span className='fs-sm text-dark'>{area.name}</span>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    ))
                                }
                            </SimpleBar>
                        </div>
                        <div className='pb-4 mb-2'>
                            <h3 className='h6'>מקצועות</h3>
                            <SimpleBar
                                autoHide={false}
                                className='simplebar-no-autohide'
                                style={{maxHeight: '11rem'}}
                            >
                                {
                                    professions.map((profession, indx) => (
                                        <Form.Check
                                            key={indx}
                                            id={profession.id}
                                        >
                                            <Form.Check.Input
                                                type='checkbox'
                                                className="border-dark"
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setSelectedProfessions([...selectedProfessions, profession])
                                                    } else {
                                                        setSelectedProfessions(selectedProfessions.filter(p => p.id !== profession.id))
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label>
                                                <span className='fs-sm text-dark'>{profession.name}</span>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    ))
                                }
                            </SimpleBar>
                        </div>
                        <div className='pb-4 mb-2'>
                            <h3 className='h6'>סוגי משרות</h3>
                            <SimpleBar
                                autoHide={false}
                                className='simplebar-no-autohide'
                                style={{maxHeight: '11rem'}}
                            >
                                {
                                    positionScopes.map((positionScope, indx) => (
                                        <Form.Check
                                            key={indx}
                                            id={positionScope.id}
                                        >
                                            <Form.Check.Input
                                                type='checkbox'
                                                className="border-dark"
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setSelectedPositionScopes([...selectedPositionScopes, positionScope])
                                                    } else {
                                                        setSelectedPositionScopes(selectedPositionScopes.filter(p => p.id !== positionScope.id))
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label>
                                                <span className='fs-sm text-dark'>{positionScope.name}</span>
                                            </Form.Check.Label>
                                        </Form.Check>
                                    ))
                                }
                            </SimpleBar>
                        </div>
                        <div className='border-top py-4'>
                            <Button variant='outline-primary'>
                                <i className='fi-rotate-right me-2'></i>
                                <span>איפוס</span>
                            </Button>
                        </div>
                        {/*Submit Button*/}
                        <div className='border-top py-4'>
                            <Button variant='primary' onClick={onSubmit}>
                                <span>חפש</span>
                                <i className='fi-arrow-right ms-2'></i>
                            </Button>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </Col>
            <Button size='sm' className='w-100 rounded-0 fixed-bottom d-lg-none' onClick={handleShow}>
                <i className='fi-filter me-2'></i>
                Filters
            </Button>
        </SSRProvider>
    )
}
export default JobListingSideBar