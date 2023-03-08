'use client'
import StickyNavbar from "@/components/StickyNavbar";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import ImageLoader from "@/components/ImageLoader";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import {HTMLAttributes} from "react";
import Image from 'next/image'
import {signIn, signOut, useSession} from "next-auth/react";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
}

export default function NavBar() {
    const session = useSession()
    const activeNav: string = 'Home'
    return (
        <Navbar as={StickyNavbar}
                expand='lg'
                className='fixed-top navbar-dark bg-dark'
        >
            <Container>

                {/*HOME BUTTON*/}
                <Navbar.Brand as={Link} href='/' className='me-3 me-xl-4'>
                    <ImageLoader src='/images/logo/extra-job.png' alt='extra job' width={100} height={32}></ImageLoader>
                </Navbar.Brand>

                {/*NAVBAR TOGGLE BUTTON*/}
                <Navbar.Toggle aria-controls='navbarNav' className='ms-auto'/>

                <Desktop/>

                {/*SIGN IN BUTTON*/}
                {session.status === "unauthenticated" &&
                    <Button size='sm' variant='link btn-light d-none d-lg-block order-lg-3' onClick={() => signIn()}>
                        <i className='fi-user me-2'></i>
                        הכנס
                    </Button>}

                <Navbar.Collapse id='navbarNav' className='order-md-2'>
                    <Nav navbarScroll style={{maxHeight: '35rem'}}>
                        <Nav.Item as={Nav.Link} href="/all-jobs">
                            <Nav.Link active={false}>כל המשרות</Nav.Link>
                        </Nav.Item>
                        <MobileDropDown/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

function MobileDropDown() {
    const session = useSession()
    const user = session?.data?.user ?? null
    return (
        <>
            {session.status === 'authenticated' ? <Nav.Item as={Dropdown} className='d-lg-none'>
                    <Dropdown.Toggle as={Nav.Link} className='d-flex align-items-center'>
                        <ImageLoader src='/images/avatars/35.png' width={30} height={30} placeholder={false}
                                     className='rounded-circle' alt={user?.name}/>
                        <span className='ms-2'>{user?.name}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant='dark'>
                        <div className='fs-xs ps-3 py-2'>
                            {user?.email}
                        </div>
                        <Dropdown.Item as={Link} href='/job-board/account-profile'>
                            <i className='fi-settings me-2'></i>
                            החשבון שלי
                        </Dropdown.Item>
                        <Dropdown.Divider as='div'/>
                        <Dropdown.Item onClick={(e)=> {
                            e.stopPropagation()
                            signOut()
                        }}>
                            <i className='fi-logout me-2'>
                            </i>
                                התנתק
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Nav.Item> :

                <Nav.Item  className='d-lg-none' onClick={() => signIn()}>
                    <Nav.Link>
                        <i className='fi-user me-2' > התחבר</i>
                    </Nav.Link>
                </Nav.Item>}
        </>
    )
}


function Desktop() {
    const session = useSession()
    const user = session?.data?.user ?? null
    return (
        <>
            {session.status === 'authenticated' &&
                <Dropdown className='d-none d-lg-block order-lg-3 my-n2 me-3'>
                    <Dropdown.Toggle as={Link} href='/job-board/account-profile'
                                     className='nav-link dropdown-toggle-flush d-flex py-1 px-0'
                                     style={{width: '40px'}}>
                        <ImageLoader src='/images/avatars/35.png' width={80} height={80} placeholder={false}
                                     className='rounded-circle' alt={user?.name}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant='dark' renderOnMount align='end'>
                        <div className='d-flex align-items-start border-bottom border-light px-3 py-1 mb-2'
                             style={{width: '16rem'}}>
                            <ImageLoader src='/images/avatars/25.png' width={48} height={48} placeholder={false}
                                         className='rounded-circle' alt='Annette Black'/>
                            <div className='ps-2'>
                                <h6 className='fs-base mb-0 text-light'>{user?.name}</h6>
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