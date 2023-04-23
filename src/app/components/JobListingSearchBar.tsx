'use client'
import {Col, Placeholder, Row, SSRProvider} from "react-bootstrap";
import {Area, PositionScope, Profession} from "@prisma/client";
import {SyntheticEvent, useEffect, useMemo, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {fetcher} from "@/lib/api/fetcher";
import {useQueries} from "@tanstack/react-query";
import IconBox from "@/components/buttons/IconBox";
import DropdownSelect from "@/components/dropdown/dropdownSelect";
import ToastDismissible from "@/components/toasts/toastDismissible";

async function getProfessions() {
    const professionFindManyArgs = {
        where: {
            active: true
        }
    }
    try {
        const {data} = await fetcher<{ professions: Profession[] }>({
            url   : `/api/profession?professionFindManyArgs=${JSON.stringify(professionFindManyArgs)}`,
            method: 'GET',
            json  : true
        })
        return data.professions
    } catch (e) {
        console.log('error')
        console.log(e)
        return []
    }
}

async function getAreas() {
    const areaFindManyArgs = {
        where: {
            active: true
        }
    }
    try {
        const {data} = await fetcher<{ areas: Area[] }>({
            url   : `/api/area?areaFindManyArgs=${JSON.stringify(areaFindManyArgs)}`,
            method: 'GET',
            json  : true
        })
        return data.areas
    } catch (e) {
        console.log(e)
        return []
    }
}

async function getPositionScopes() {
    const positionScopeFindManyArgs = {
        where: {
            active: true
        }
    }
    try {
        const {data} = await fetcher<{ positionScopes: PositionScope[] }>({
            url   : `/api/positionscope?positionScopeFindManyArgs=${JSON.stringify(positionScopeFindManyArgs)}`,
            method: 'GET',
            json  : true
        })
        return data.positionScopes
    } catch (e) {
        console.log(e)
        return []
    }
}

function useSearchBar() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
    const areaIdRef = useRef<string | null>(null)
    const professionIdRef = useRef<string | null>(null)
    const positionScopeIdRef = useRef<string | null>(null)
    const router = useRouter()
    const queries = useQueries(
        {
            queries: [
                {
                    queryKey            : ['professions'],
                    queryFn             : getProfessions,
                    staleTime           : 1000 * 60 * 60 * 24,
                    refetchOnWindowFocus: false,
                    refetchOnMount      : false
                },
                {
                    queryKey            : ['areas'],
                    queryFn             : getAreas,
                    staleTime           : 1000 * 60 * 60 * 24,
                    refetchOnWindowFocus: false,
                    refetchOnMount      : false
                },
                {
                    queryKey            : ['positionScopes'],
                    queryFn             : getPositionScopes,
                    staleTime           : 1000 * 60 * 60 * 24,
                    refetchOnWindowFocus: false,
                    refetchOnMount      : false
                }
            ]
        }
    )
    const allAreas: Area[] = useMemo(() => queries[1].data || [], [queries])
    const allProfessions: Profession[] = useMemo(() => queries[0].data || [], [queries])
    const allPositionScopes: PositionScope[] = useMemo(() => queries[2].data || [], [queries])
    useEffect(() => {
        if (queries.some(query => query.status === 'error')) {
            setStatus('error')
        }
        if (queries.some(query => query.status === 'loading')) {
            setStatus('loading')
        }
        if (queries.every(query => query.status === 'success')) {
            setStatus('success')
        }
    }, [queries])
    const handleSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
        const newSearchParams = new URLSearchParams()
        if (areaIdRef.current) {
            newSearchParams.append('areaId', areaIdRef.current)
        }
        if (professionIdRef.current) {
            newSearchParams.append('professionId', professionIdRef.current)
        }
        if (positionScopeIdRef.current) {
            newSearchParams.append('positionScopeId', positionScopeIdRef.current)
        }
        router.push(`/joblisting?${newSearchParams.toString()}`)
    }
    return {
        status,
        allAreas,
        allProfessions,
        allPositionScopes,
        handleSubmit,
        areaIdRef,
        professionIdRef,
        positionScopeIdRef
    }
}

export default function JobListingSearchBar() {
    const {
        allAreas,
        allProfessions,
        allPositionScopes,
        handleSubmit,
        areaIdRef,
        professionIdRef,
        positionScopeIdRef,
        status
    } = useSearchBar()
    if (status === 'loading' || status === "idle") {
        return (
            <SSRProvider>
                <Placeholder
                    as='div'
                    animation='glow'
                    className='d-block rounded-md-pill form-group p-0 bg-none border-0 shadow-none'
                >
                    <Placeholder className='rounded-md-pill w-100 h-100' bg="faded-dark" style={{minHeight :'5rem'}}/>
                </Placeholder>
            </SSRProvider>
        )
    } else if (status === 'error') {
        return (
            <SSRProvider>
                <div className="position-fixed top-0 m-5">
                    <ToastDismissible text={'ארעה שגיאה נסה לרענן את העמוד'} title={'שגיאה'}></ToastDismissible>
                </div>
            </SSRProvider>
        )
    }
    return (
        <SSRProvider>
            <div className='d-block rounded-md-pill form-group shadow-lg'>
                <Row className='py-2 justify-content-between' style={{direction: 'rtl'}}>
                    <Col sm={10} md={2} className='d-sm-flex align-items-center justify-content-between'>
                        {/*AREA SELECT*/}
                        <DropdownSelect
                            instructions='בחר אזור'
                            icon='fi-geo'
                            chosenIdRef={areaIdRef}
                            options={allAreas.map((area) => {
                                return {id: area.id, text: area.name, icon: 'fi-chevron-left'}
                            })}
                            variant='link btn-lg ps-2 ps-sm-3'
                            className='text-center col-xs-10'
                        />
                    </Col>
                    <Col sm={10} md={2} className="d-sm-flex align-items-center justify-content-between">
                        <DropdownSelect
                            instructions='בחר מקצוע'
                            icon='fi-briefcase'
                            chosenIdRef={professionIdRef}
                            options={allProfessions.map((profession) => {
                                return {id: profession.id, text: profession.name, icon: 'fi-chevron-left'}
                            })}
                            variant='link btn-lg ps-2 ps-sm-3'
                            className='text-center'
                        />
                    </Col>
                    <Col sm={10} md={2} className="d-sm-flex align-items-center justify-content-between">
                        <DropdownSelect
                            instructions='בחר היקף משרה'
                            icon='fi-briefcase'
                            chosenIdRef={positionScopeIdRef}
                            options={allPositionScopes.map(positionScope => {
                                return {id: positionScope.id, text: positionScope.name, icon: 'fi-chevron-left'}
                            })}
                            variant="link btn-lg ps-2 ps-sm-3"
                            className='text-center'
                        />
                    </Col>
                    <Col md={3} sm={12} className='d-flex justify-content-end align-items-center'>
                        <IconBox
                            href='#'
                            media='fi-search'
                            title='חפש'
                            type='pill'
                            button={true}
                            onClick={(e) => handleSubmit(e)}
                            className='bg-secondary border-0 d-flex flex-row-reverse me-auto shadow'
                        />
                    </Col>
                </Row>
            </div>
        </SSRProvider>
    )
}