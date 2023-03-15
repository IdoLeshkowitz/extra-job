'use client'
import StickyNavbar from "@/components/navbar/StickyNavbar";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import ImageLoader from "@/components/Image/ImageLoader";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import {HTMLAttributes} from "react";
import Image from 'next/image'
import {signIn, signOut, useSession} from "next-auth/react";
import {Session} from "next-auth";
import Avatar from "@/components/avatar/Avatar";
import {SSRProvider} from "react-bootstrap";
import {Shalimar} from "@next/font/google";

const SIGNIN_URL = '/api/auth/signin'
const SIGNOUT_URL = '/api/auth/signout'
const ME_URL = '/api/me'
const DEFAULT_AVATAR_URL = '/images/avatars/38.png'
const JOB_LISTING_URL = '/joblisting'
export default function MainLayoutNavBar() {
    const {data} = useSession()
    const {user} = data ?? {}
    const avatarUrl = user?.image ?? DEFAULT_AVATAR_URL
    return (
        <SSRProvider>
            <Navbar as={StickyNavbar}
                    expand='lg'
                    className='fixed-top navbar-dark bg-dark'
            >
                <Container>
                    {/*HOME BUTTON*/}
                    <Navbar.Brand as={Link} href='/' className='me-3 me-xl-4'>
                        {/*<ImageLoader src='/images/extra-job-svg.svg' alt='extra job' width={100} height={32} />*/}
                        <Image width={100} height={32} src='/images/extra-job-svg.svg' alt='extra job' style={{height:'32px',objectFit:'contain'}}/>
                    </Navbar.Brand>


                    {/* AVATAR */}
                    {/*DESKTOP AVATAR*/}
                    <DesktopAvatar avatarUrl={avatarUrl}/>


                    <Navbar.Collapse id='navbarNav' className='order-md-2'>
                        <Nav navbarScroll style={{maxHeight: '35rem'}}>
                            <Nav.Item as={Nav.Link} href={JOB_LISTING_URL} >
                                <Nav.Link active={false} href={JOB_LISTING_URL} className="text-light">כל המשרות</Nav.Link>
                            </Nav.Item>
                            <MobileAvatar avatarUrl={avatarUrl}/>
                        </Nav>
                    </Navbar.Collapse>

                    {/*NAVBAR TOGGLE BUTTON FOR MOBILE*/}
                    <Navbar.Toggle aria-controls='navbarNav' className='ms-auto'/>
                </Container>
            </Navbar>
        </SSRProvider>
    )
}

function MobileAvatar({avatarUrl}: { avatarUrl: string }) {
    const {status, data} = useSession()
    const {user} = data ?? {}
    return (
        <>
            {status === 'authenticated'
                ?
                <Nav.Item as={Dropdown} className='d-lg-none'>
                    {/*DROPDOWN TOGGLE BUTTON*/}
                    <Dropdown.Toggle as={Nav.Link} className='d-flex align-items-center'>
                        <Avatar avatarUrl={avatarUrl} alt={user?.name ?? ''} width={30} height={30}/>
                        <span className='ms-2'>{user?.name}</span>
                    </Dropdown.Toggle>
                    {/*USER CARD*/}
                    <Dropdown.Menu variant='dark'>
                        <div className='fs-xs ps-3 py-2'>
                            {user?.email}
                        </div>
                        {/*PROFILE LINK*/}
                        <Dropdown.Item as={Link} href={ME_URL}>
                            <i className='fi-settings me-2'/>
                            החשבון שלי
                        </Dropdown.Item>
                        <Dropdown.Divider as='div'/>
                        {/*SIGN OUT LINK*/}
                        <Dropdown.Item href={SIGNOUT_URL}>
                            <i className='fi-logout me-2'/>
                            התנתק
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Nav.Item>
                :
                <Nav.Item className='d-lg-none'>
                    <Nav.Link href={SIGNIN_URL}>
                        <i className='fi-user me-2'> התחבר</i>
                    </Nav.Link>
                </Nav.Item>}
        </>
    )

}


function DesktopAvatar({avatarUrl}: { avatarUrl: string }) {
    const {status, data} = useSession()
    const {user} = data ?? {}
    return (
        <>
            {status === "unauthenticated" ?
                /* SIGN IN LINK */
                <Link className='btn btn-link btn-light d-none d-lg-block order-lg-3 btn-sm' href={SIGNIN_URL}>
                    <i className='fi-user me-2'></i>
                    הכנס
                </Link>
                :
                <Dropdown className='d-none d-lg-block order-lg-3 my-n2 me-3'>
                    {/*PROFILE LINK*/}
                    <Dropdown.Toggle
                        as={Link}
                        href={ME_URL}
                        className='nav-link dropdown-toggle-flush d-flex py-1 px-0'
                        style={{width: '40px'}}
                    >
                        {/*AVATAR IMAGE*/}
                        <Avatar avatarUrl={avatarUrl} alt={user?.name ?? ''} width={80} height={80}/>
                    </Dropdown.Toggle>

                    {/*USER CARD*/}
                    <Dropdown.Menu
                        variant='dark'
                        renderOnMount align='end'
                    >
                        <div
                            className='d-flex align-items-start border-bottom border-light px-3 py-1 mb-2'
                            style={{width: '16rem'}}>
                            <Avatar avatarUrl={avatarUrl} alt={user?.name ?? ''} width={80} height={80}/>
                            <div className='ps-2'>
                                <h6 className='fs-base mb-0 text-light'>
                                    {user?.name}
                                </h6>
                                <div className='fs-xs py-2'>
                                    {user?.email}
                                </div>
                            </div>
                        </div>
                        <Dropdown.Item as={Link} href='/api/auth/signout'>
                            <i className='fi-logout me-2' onClick={() => signOut()}></i>
                            התנתק
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            }
        </>
    )
}


