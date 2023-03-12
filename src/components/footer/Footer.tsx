'use client'
import {Col, Container, Row} from "react-bootstrap";
import SocialButton from "@/components/socialButton/SocialButton";


export default function Footer() {
    return (
        <footer className='footer bg-dark pt-5'>
            <Container className='pb-2'>
                <Row className='align-items-center pb-4'>
                    <Col md={6} xl={5}>

                        {/* Links */}

                        {/* Socials */}
                        <div className='text-nowrap border-top border-light mt-3 py-4'>
                            <SocialButton size="sm" href='#' brand='facebook' variant='translucent'
                                          roundedCircle light
                                          className='me-2'/>
                            <SocialButton size="sm" href='#' brand='twitter' variant='translucent' roundedCircle
                                          light
                                          className='me-2'/>
                            <SocialButton size="sm" href='#' brand='messenger' variant='translucent'
                                          roundedCircle light
                                          className='me-2'/>
                        </div>
                    </Col>
                </Row>


                {/*/!* Copyright *!/*/}
                {/*<p className='fs-sm text-center text-sm-start mb-4'>*/}
                {/*    <span className='text-light opacity-50'>&copy; All rights reserved. Made by </span>*/}
                {/*    <a href='https://createx.studio/' className='nav-link-light fw-bold' target='_blank'*/}
                {/*       rel='noreferrer'>Ido Leshkowitz</a>*/}
                {/*</p>*/}
            </Container>
        </footer>
    )
}