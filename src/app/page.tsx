'use client';
import Image from 'next/image'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import {Col, Form, InputGroup} from "react-bootstrap";
import CursorParallax, {Layer} from '@/components/CursorParallax'

import DropdownSelect from '@/components/DropdownSelect'
import FormGroup from '@/components/FormGroup'

export default function Home() {
    return (
        <main className='page-wrapper'>
            {/* Hero */}
            <section className='bg-dark pb-4 pt-5'>
                <Container className='py-5'>
                    <Row className='align-items-center mt-2 mt-md-0 pt-md-4 pt-lg-5 pb-5'>
                        <Col xs={12} md={{span: 5, order: 'last'}} className='mb-5 mb-md-0'>
                            <CursorParallax className='mx-auto'>
                                <Layer depth={0.1}>
                                    <Image priority src='/images/job-board/hero-banner-1/layer01.svg' width={526}
                                           height={353} alt='Layer'/>
                                </Layer>
                                <Layer depth={0.16}>
                                    <Image priority src='/images/job-board/hero-banner-1/layer02.svg' width={526}
                                           height={353} alt='Layer'/>
                                </Layer>
                                <Layer depth={0.38}>
                                    <Image priority src='/images/job-board/hero-banner-1/layer03.svg' width={526}
                                           height={353} alt='Layer'/>
                                </Layer>
                                <Layer depth={0.16}>
                                    <Image priority src='/images/job-board/hero-banner-1/layer04.svg' width={526}
                                           height={353} alt='Layer'/>
                                </Layer>
                                <Layer depth={0.16}>
                                    <Image priority src='/images/job-board/hero-banner-1/layer05.svg' width={526}
                                           height={353} alt='Layer'/>
                                </Layer>
                                <Layer depth={0.45}>
                                    <Image priority src='/images/job-board/hero-banner-1/layer06.svg' width={526}
                                           height={353} alt='Layer'/>
                                </Layer>
                                <Layer depth={0.3}>
                                    <Image priority src='/images/job-board/hero-banner-1/layer07.svg' width={526}
                                           height={353} alt='Layer'/>
                                </Layer>
                                <Layer depth={0.2}>
                                    <Image priority src='/images/job-board/hero-banner-1/layer08.svg' width={526}
                                           height={353} alt='Layer'/>
                                </Layer>
                            </CursorParallax>
                        </Col>
                        <Col xs={12} md={{span: 7, order: 'first'}}>
                            <h1 className='display-4 text-light pb-2 mb-4 mb-lg-5' style={{maxWidth: '29.5rem'}}>
                                הקריירה שלך זאת העבודה<span className='text-primary'> שלנו</span>
                            </h1>
                        </Col>
                    </Row>

                    חיפוש משרה
                    <FormGroup light={true}
                               className='form-group-light d-block rounded-xl-pill mt-n3 mt-md-4 mt-xl-5 mb-md-4'>
                        <Row className='align-items-center g-0 ms-n2'>
                            <Col xs={12} md={5} xl={3}>
                                <InputGroup size='lg' className='border-end-md border-light'>
                                    <InputGroup.Text className='text-light rounded-pill opacity-50 ps-3'>
                                        <i className='fi-search'></i>
                                    </InputGroup.Text>
                                    <Form.Control placeholder='חפש לפי שם'/>
                                </InputGroup>
                            </Col>
                            <hr className='hr-light d-md-none my-2'/>
                            <Col xs={12} md={7} xl={4} className='d-sm-flex'>
                                <DropdownSelect
                                    defaultValue='מיקום'
                                    icon='fi-map-pin'
                                    darkMenu
                                    options={[
                                        ['', 'Dallas'],
                                        ['', 'Chicago'],
                                        ['', 'Houston'],
                                        ['', 'Las Vegas'],
                                        ['', 'Los Angeles'],
                                        ['', 'New York'],
                                        ['', 'San Francisco']
                                    ]}
                                    variant='link'
                                    className='w-sm-50 border-end-sm border-light'
                                />
                                <hr className='hr-light d-sm-none my-2'/>
                                <DropdownSelect
                                    defaultValue='קטגוריה'
                                    icon='fi-geo'
                                    darkMenu
                                    options={[
                                        ['', '10 miles'],
                                        ['', '20 miles'],
                                        ['', '30 miles'],
                                        ['', '40 miles'],
                                        ['', '50 miles']
                                    ]}
                                    variant='link'
                                    className='w-sm-50 border-end-xl border-light'
                                />
                            </Col>
                            <hr className='hr-light d-xl-none mt-2 mb-3'/>
                        </Row>
                    </FormGroup>
                </Container>
            </section>
        </main>
    )
}
