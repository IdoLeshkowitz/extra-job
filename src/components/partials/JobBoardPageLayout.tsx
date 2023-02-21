'use client'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import StickyNavbar from '../StickyNavbar'
import ImageLoader from '../ImageLoader'
import SocialButton from '../SocialButton'
import MarketButton from '../MarketButton'
import SignInModalLight from './SignInModalLight'
import SignUpModalLight from './SignUpModalLight'
import NavBar from "@/components/partials/NavBar";

const JobBoardPageLayout = (props) => {

  // Sign in modal
  const [signinShow, setSigninShow] = useState(true)
  const handleSigninClose = () => setSigninShow(false)
  const handleSigninShow = () => setSigninShow(true)

  // Sign up modal
  const [signupShow, setSignupShow] = useState(false)
  const handleSignupClose = () => setSignupShow(false)

  // Swap modals
  const handleSignInToUp = (e) => {
    e.preventDefault()
    setSigninShow(false)
    setSignupShow(true)
  }
  const handleSignUpToIn = (e) => {
    e.preventDefault()
    setSigninShow(true)
    setSignupShow(false)
  }


  return (
    <div>
      {/* Sign in modal */}
      {!props.userLoggedIn && <SignInModalLight
        centered
        size='lg'
        pillButtons
        show={signinShow}
        onHide={handleSigninClose}
        onSwap={handleSignInToUp}
      />}

      {/* Sign up modal */}
      {!props.userLoggedIn && <SignUpModalLight
        centered
        size='lg'
        pillButtons
        show={signupShow}
        onHide={handleSignupClose}
        onSwap={handleSignUpToIn}
      />}
      {/*navbar*/}
      <NavBar userLoggedIn={true}/>
      {/* Page wrapper for sticky footer
      Wraps everything except footer to push footer to the bottom of the page if there is little content */}
      <main className='page-wrapper'>

        {/* Navbar (main site header with branding and navigation) */}



        {/* Page content */}
        {props.children}
      </main>


      {/* Footer */}
      <footer className='footer bg-dark pt-5'>
        <Container className='pb-2'>
          <Row className='align-items-center pb-4'>
            <Col md={6} xl={5}>

              {/* Links */}
              <Row xs={1} sm={3} className='gy-4'>
                <Col>
                  <h3 className='h6 mb-2 pb-1 fs-base text-light'>Finder</h3>
                  <ul className='list-unstyled fs-sm'>
                    <li><Link href='src/components/partials#' className='nav-link-light'>About us</Link></li>
                    <li><Link href='src/components/partials#' className='nav-link-light'>News</Link></li>
                    <li><Link href='src/components/partials#' className='nav-link-light'>Contacts</Link></li>
                  </ul>
                </Col>
                <Col>
                  <h3 className='h6 mb-2 pb-1 fs-base text-light'>For Job Seekers</h3>
                  <ul className='list-unstyled fs-sm'>
                    <li><Link href='src/components/partials#' className='nav-link-light'>Find job</Link></li>
                    <li><Link href='src/components/partials#' className='nav-link-light'>Post a resume</Link></li>
                    <li><Link href='src/components/partials#' className='nav-link-light'>Vacancy mailing</Link></li>
                  </ul>
                </Col>
                <Col>
                  <h3 className='h6 mb-2 pb-1 fs-base text-light'>For Employers</h3>
                  <ul className='list-unstyled fs-sm'>
                    <li><Link href='src/components/partials#' className='nav-link-light'>Find resume</Link></li>
                    <li><Link href='src/components/partials#' className='nav-link-light'>Post a job</Link></li>
                    <li><Link href='src/components/partials#' className='nav-link-light'>Resume mailing</Link></li>
                  </ul>
                </Col>
              </Row>

              {/* Socials */}
              <div className='text-nowrap border-top border-light mt-3 py-4'>
                <SocialButton href='#' brand='facebook' variant='translucent' roundedCircle light className='me-2' />
                <SocialButton href='#' brand='twitter' variant='translucent' roundedCircle light className='me-2' />
                <SocialButton href='#' brand='messenger' variant='translucent' roundedCircle light className='me-2' />
                <SocialButton href='#' brand='telegram' variant='translucent' roundedCircle light className='me-2' />
                <SocialButton href='#' brand='whatsapp' variant='translucent' roundedCircle light />
              </div>
            </Col>
            <Col md={6} xl={{offset: 1}}>
              <div className='d-flex align-items-center'>
                <Card className='card-light w-100' style={{maxWidth: '526px'}}>
                  <Card.Body className='p-4 p-xl-5 my-2 my-md-0'>
                    <div style={{maxWidth: '380px'}}>
                      <h3 className='h4 text-light'>Download Our App</h3>
                      <p className='fs-sm text-light opacity-70 mb-2 mb-lg-3'>Now finding the new job just got even easier with our new app!</p>
                      <div className='d-flex flex-column flex-sm-row ms-n3'>
                        <MarketButton href='#' market='apple' target='_blank' className='mt-3 ms-3' />
                        <MarketButton href='#' market='google' target='_blank' className='mt-3 ms-3' />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <div className='d-none d-xl-block ms-n4'>
                  <ImageLoader priority src='/images/job-board/footer-mobile.svg' width={116} height={233} alt='Mobile app' />
                </div>
              </div>
            </Col>
          </Row>

          {/* Copyright */}
          <p className='fs-sm text-center text-sm-start mb-4'>
            <span className='text-light opacity-50'>&copy; All rights reserved. Made by </span>
            <a href='https://createx.studio/' className='nav-link-light fw-bold' target='_blank' rel='noreferrer'>Createx Studio</a>
          </p>
        </Container>
      </footer>
    </div>
  )
}

export default JobBoardPageLayout
