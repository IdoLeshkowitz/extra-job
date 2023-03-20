'use client';

import {useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import {useAccordionButton} from 'react-bootstrap/AccordionButton'
import FormControl from 'react-bootstrap/FormControl'
import FormSelect from 'react-bootstrap/FormSelect'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import {Button, SSRProvider} from 'react-bootstrap';


const UserProfileInfo = () => {
    // Get session
    const {data: session, status} = useSession()
    // Custom accordion toggle
    const CustomToggle = ({eventKey}: { eventKey: string }) => {
        const handleClick = useAccordionButton(eventKey, (e) => e.preventDefault())
        return (
            <OverlayTrigger
                placement='top'
                overlay={<Tooltip>Edit</Tooltip>}
            >
                <a
                    href='#'
                    className='nav-link py-0'
                    onClick={handleClick}
                >
                    <i className='fi-edit'></i>
                </a>
            </OverlayTrigger>
        )
    }

    // Name field state
    const [name, setName] = useState<string>('')

    // Gender field state
    const [gender, setGender] = useState<string>('')

    // Phone field state
    const [phone, setPhone] = useState<string>('')

    // Handle name field change
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        if (session?.user != undefined) {
            session.user.name = e.target.value
        }
    }

    // Handle gender field change
    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value)
        if (session?.user != undefined) {
            session.user.gender = e.target.value
        }
    }

    // Handle phone field change
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
        if (session?.user != undefined) {
            session.user.phone = e.target.value
        }
        console.log(session?.user)
    }

    return (

        <SSRProvider>
            {/* Personal details */}
            <Row className='pt-4 mt-3'>
                <Col xs={12} lg={3}>
                    <h2 className='h4'>Personal details</h2>
                </Col>
                <Col xs={12} lg={9}>
                    <Accordion>
                        <div className='border rounded-3 p-3'>

                            {/* Name */}
                            <div className='border-bottom pb-3 mb-3'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='pe-2'>
                                        <h2 className='form-label fw-bold'>Full name</h2>
                                        <p className='mb-0'>{session?.user?.name ? session?.user?.name : 'Not specified'}</p>
                                    </div>
                                    <CustomToggle eventKey='name'/>
                                </div>
                                <Accordion.Collapse eventKey='name'>
                                    <FormControl
                                        className='mt-3'
                                        value={name}
                                        onChange={handleNameChange}
                                        placeholder='Your full name'
                                    />
                                </Accordion.Collapse>
                            </div>

                            {/* Gender */}
                            <div className='border-bottom pb-3 mb-3'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='pe-2'>
                                        <h2 className='form-label fw-bold'>Gender</h2>
                                        <p className='mb-0'>{session?.user?.gender ? session?.user?.gender : 'Not specified'}</p>
                                    </div>
                                    <CustomToggle eventKey='gender'/>
                                </div>
                                <Accordion.Collapse eventKey='gender'>
                                    <FormSelect className='mt-3' value={gender} onChange={handleGenderChange}>
                                        <option value='Not specified'>Choose gender</option>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                    </FormSelect>
                                </Accordion.Collapse>
                            </div>

                            {/* Phone number */}
                            {/* <div className='border-bottom pb-3 mb-3'> */}
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='pe-2'>
                                    <h2 className='form-label fw-bold'>Phone number</h2>
                                    <p className='mb-0'>{session?.user?.phone ? session?.user?.phone : 'Not specified'}</p>
                                </div>
                                <CustomToggle eventKey='phone'/>
                            </div>
                            <Accordion.Collapse eventKey='phone'>
                                <FormControl
                                    type='tel'
                                    className='mt-3'
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder='Enter your phone number'
                                />
                            </Accordion.Collapse>
                        </div>

                        {/* </div> */}
                    </Accordion>
                </Col>
            </Row>
            <Row className='pt-4 mt-3'>
                <Col xs={12} lg={3}>
                    <h2 className='h4'>CV</h2>
                </Col>
                <Col xs={12} lg={9}>
                    <Accordion>
                        <div className='border rounded-3 p-3'>
                            {/* CV */}
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='pe-2'>
                                    <h2 className='form-label fw-bold'>{session?.user?.cv ? 'CV uploaded successfully' : 'No matching CV'}</h2>
                                </div>
                                {
                                    !session?.user?.cv &&
                                    <Link href="uploadcv" className='form-label fw-bold'><Button>Upload
                                        CV</Button></Link>
                                }
                                {
                                    session?.user?.cv &&

                                    <i className='fi-check' style={{color: "green"}}></i>
                                }
                            </div>
                            {
                                session?.user?.cv &&
                                <>
                                    <div className="border-bottom pb-3 mb-3"></div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='pe-2'>
                                            <Link href="uploadcv" className='form-label fw-bold'><Button>Download
                                                CV</Button></Link>
                                        </div>
                                        <Link href="uploadcv" className='form-label fw-bold'><Button>Reupload
                                            CV</Button></Link>
                                    </div>
                                </>
                            }
                        </div>
                    </Accordion>
                </Col>
            </Row>
        </SSRProvider>
    )
}

export default UserProfileInfo