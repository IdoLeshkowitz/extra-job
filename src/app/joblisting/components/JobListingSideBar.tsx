'use client'
import {Button, Col, Form, Offcanvas, SSRProvider} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import {SyntheticEvent, useEffect, useMemo, useState} from "react";
import {Prisma} from ".prisma/client";
import {fetcher} from "@/lib/api/fetcher";
import {Area, PositionScope, Profession} from "@prisma/client";
import {notFound, usePathname, useRouter, useSearchParams} from "next/navigation";
import {useQueries} from "@tanstack/react-query";
import IconBox from "@/components/buttons/IconBox";
import AreaFindManyArgs = Prisma.AreaFindManyArgs;

async function getAreas() {
    console.log('getAreas')
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

function useSideBar() {
    const queries = useQueries(
        {
            queries: [
                {
                    queryKey            : ['areas'],
                    queryFn             : getAreas,
                    staleTime           : 1000 * 60 * 60 * 24,
                    refetchOnMount      : false,
                    refetchOnWindowFocus: false,
                },
                {
                    queryKey            : ['professions'],
                    queryFn             : getProfessions,
                    staleTime           : 1000 * 60 * 60 * 24,
                    refetchOnMount      : false,
                    refetchOnWindowFocus: false,
                },
                {
                    queryKey            : ['positionScopes'],
                    queryFn             : getPositionScopes,
                    staleTime           : 1000 * 60 * 60 * 24,
                    refetchOnMount      : false,
                    refetchOnWindowFocus: false,
                }
            ]
        }
    )
    const [selectedAreasIds, setSelectedAreasIds] = useState<string[]>([])
    const [selectedProfessions, setSelectedProfessions] = useState<Profession[]>([])
    const [selectedPositionScopes, setSelectedPositionScopes] = useState<PositionScope[]>([])
    const searchParams = useSearchParams()
    const router = useRouter()
    const [show, setShow] = useState(false);
    const url = usePathname()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
        const newSearchParams = new URLSearchParams()
        if (selectedAreasIds.length > 0) {
            newSearchParams.set('areaIds', selectedAreasIds.map(area => area.id.toString()).join(','))
        }
        if (selectedProfessions.length > 0) {
            newSearchParams.set('professionIds', selectedProfessions.map(profession => profession.id.toString()).join(','))
        }
        if (selectedPositionScopes.length > 0) {
            newSearchParams.set('positionScopeIds', selectedPositionScopes.map(positionScope => positionScope.id.toString()).join(','))
        }
        const urlToGo = `${url}?${newSearchParams.toString()}`
        router.push(urlToGo)
        handleClose()
    }
    const allAreas: Area[] = useMemo(() => queries[0].data ?? [], [queries])
    const allProfessions: Profession[] = useMemo(() => queries[1].data ?? [], [queries])
    const allPositionScopes: PositionScope[] = useMemo(() => queries[2].data ?? [], [queries])
    useEffect(() => {
        const areaIds = searchParams?.get('areaIds')
        if (areaIds) {
            const areaIdsArray = areaIds.split(',')
            setSelectedAreasIds(areaIdsArray)
        }
    }, [])
    return {allAreas, allProfessions, allPositionScopes, selectedAreasIds, setSelectedAreasIds, show, handleShow, handleClose, onSubmit}
}

const JobListingSideBar = () => {
    const {allAreas, allProfessions, allPositionScopes, show, handleShow, handleClose, onSubmit} = useSideBar()
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
                                    allAreas.map((area, indx) => (
                                        <Form.Check
                                            key={indx}
                                            id={`area-${indx}`}
                                        >
                                            <Form.Check.Input
                                                type='checkbox'
                                                checked={selectedA}
                                                className="border-dark"
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
                                    allProfessions.map((profession, indx) => (
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
                                    allPositionScopes.map((positionScope, indx) => (
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
                            {/*Reset Button*/}
                            <IconBox
                                media='fi-rotate-right'
                                title='אפס'
                                type='pill'
                                button={true}
                                onClick={onSubmit}
                                className='bg-secondary border-0 d-flex flex-row-reverse me-auto shadow mx-auto my-3'
                            />
                            {/*Submit Button*/}
                            <IconBox
                                media='fi-search'
                                title='חפש'
                                type='pill'
                                button={true}
                                onClick={onSubmit}
                                className='bg-secondary border-0 d-flex flex-row-reverse me-auto shadow mx-auto my-3'
                            />
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