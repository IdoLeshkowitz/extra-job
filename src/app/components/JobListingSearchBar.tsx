'use client'
import {Col, Row, SSRProvider} from "react-bootstrap";
import {Area, PositionScope, Prisma, Profession} from "@prisma/client";
import {SyntheticEvent, useCallback, useRef} from "react";
import {useRouter} from "next/navigation";
import {fetcher} from "@/lib/api/fetcher";
import {useQueries} from "@tanstack/react-query";
import IconBox from "@/components/buttons/IconBox";
import DropdownSelect from "@/components/dropdown/dropdownSelect";

async function getAreas() {
    const areaFindManyArgs: Prisma.AreaFindManyArgs = {
        where: {active: true},
    }
    try {
        const {data} = await fetcher({
            url   : `/api/area?areaFindManyArgs=${JSON.stringify(areaFindManyArgs)}`,
            method: 'GET',
            json  : true,
        })
        return data.areas as Area[]
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
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
        return data.professions as Profession[]
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
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
        return data.positionScopes as PositionScope[]
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

export default function JobListingSearchBar() {
    const areaIdRef = useRef<string | null>(null)
    const professionIdRef = useRef<string | null>(null)
    const positionScopeIdRef = useRef<string | null>(null)
    const router = useRouter()
    const queries = useQueries({
            queries: [
                {
                    queryKey            : ['areas'],
                    queryFn             : getAreas,
                    staleTime           : 1000 * 60 * 60 * 24 * 7,
                    refetchOnMount      : false,
                    refetchOnWindowFocus: false
                },
                {
                    queryKey            : ['professions'],
                    queryFn             : getProfessions,
                    staleTime           : 1000 * 60 * 60 * 24 * 7,
                    refetchOnMount      : false,
                    refetchOnWindowFocus: false
                },
                {
                    queryKey            : ['positionScopes'],
                    queryFn             : getPositionScopes,
                    staleTime           : 1000 * 60 * 60 * 24 * 7,
                    refetchOnMount      : false,
                    refetchOnWindowFocus: false
                },
            ]
        },
    )
    const handleSubmit = useCallback((e: SyntheticEvent<HTMLButtonElement>) => {
        const areaId = areaIdRef.current
        const professionId = professionIdRef.current
        const positionScopeId = positionScopeIdRef.current
        const query = new URLSearchParams()
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
    }, [router])
    const allAreas = queries[0].data ?? []
    const allProfessions = queries[1].data ?? []
    const allPositionScopes = queries[2].data ?? []

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