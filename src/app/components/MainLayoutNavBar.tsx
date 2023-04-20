'use client'
import StickyNavbar from "@/components/navbar/StickyNavbar";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import {signOut, useSession} from "next-auth/react";
import Avatar from "@/components/avatar/Avatar";
import {SSRProvider} from "react-bootstrap";
import {usePathname} from "next/navigation";

const SIGNIN_URL = '/api/auth/signin'
const SIGNOUT_URL = '/api/auth/signout'
const ME_URL = '/api/me'
const DEFAULT_AVATAR_URL = '/images/avatars/38.png'
const JOB_LISTING_URL = '/joblisting'
export default function MainLayoutNavBar() {
    const {data} = useSession()
    const pathName = usePathname()
    const {user} = data ?? {}
    const avatarUrl = user?.image ?? DEFAULT_AVATAR_URL
    return (
        <SSRProvider>
            <Navbar as={StickyNavbar}
                    expand='lg'
                    className='fixed-top navbar-expand-lg navbar-stuck p-0 sticky-top'
                    style={{background: "none"}}
            >
                <Container className="pt-1 gap-4">
                    {/*HOME BUTTON*/}
                    <Navbar.Brand as={Link} href='/' className='d-flex flex-column'>
                        {/*<ImageLoader src='/images/extra-job-svg.svg' alt='extra job' width={100} height={32} />*/}
                        <i className="fi-home text-dark fs-5 card-hover bg-faded-dark rounded px-2 mx-auto"/>
                        <span className="fs-xs text-dark fw-light">דף הבית</span>
                    </Navbar.Brand>

                    {/*DESKTOP AVATAR*/}
                    <DesktopAvatar avatarUrl={avatarUrl}/>

                    <Navbar.Toggle aria-controls='navbarNav' className='me-auto ms-0'/>
                    <Navbar.Collapse id='navbarNav' className='order-md-2'>
                        <Nav navbarScroll style={{maxHeight: '35rem'}}>
                            {/*MOBILE NAV ITEMS*/}
                            <Link
                                href={JOB_LISTING_URL}
                                className="d-lg-none card-hover bg-faded-dark rounded text-dark text-decoration-none nav-item me-lg-5 border-0 px-2  my-1"
                            >
                                <i className="fi-briefcase ms-2 mb-1 fs-6 text-dark"/>
                                כל המשרות
                            </Link>
                            <MobileAvatar avatarUrl={avatarUrl}/>
                            {/*DESKTOP NAV ITEMS*/}
                            <Link
                                href={JOB_LISTING_URL}
                                className="d-none d-lg-flex flex-column text-decoration-none">
                                <i className="fi-briefcase text-dark fs-5 card-hover bg-faded-dark rounded px-2 mx-auto text-decoration-none"/>
                                <span className="fs-xs text-dark">כל המשרות</span>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>

                    {/*NAVBAR TOGGLE BUTTON FOR MOBILE*/}
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
                <Nav.Item as={Dropdown} className='d-lg-none border-0 bg-faded-dark shadow-sm'>
                    {/*DROPDOWN TOGGLE BUTTON*/}
                    <Dropdown.Toggle as={Nav.Link} className='d-flex align-items-center'>
                        <Avatar avatarUrl={avatarUrl} alt={user?.name ?? ''} width={30} height={30}/>
                        <span className='mx-2'>{user?.name}</span>
                    </Dropdown.Toggle>
                    {/*USER CARD*/}
                    <Dropdown.Menu variant="dark border-0">
                        <div className='fs-xs pe-1 py-2 text-end'>
                            {user?.email}
                        </div>
                        {/*PROFILE LINK*/}
                        <Dropdown.Item as={Link} href={ME_URL} className="text-end text-dark">
                            <i className='fi-settings ms-2'/>
                            החשבון שלי
                        </Dropdown.Item>
                        <Dropdown.Divider as='div'/>
                        {/*SIGN OUT LINK*/}
                        <Dropdown.Item href={SIGNOUT_URL} className="text-dark text-end">
                            <i className='fi-logout ms-2'/>
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
                        className='nav-link dropdown-toggle-flush d-flex py-1 px-1'
                        style={{width: '40px'}}
                    >
                        {/*AVATAR IMAGE*/}
                        <Avatar avatarUrl={avatarUrl} alt={user?.name ?? ''} width={80} height={80}/>
                    </Dropdown.Toggle>

                    {/*USER CARD*/}
                    <Dropdown.Menu
                        variant='dark'
                        renderOnMount align='start'
                    >
                        <div
                            className='d-flex align-items-center border-bottom border-light px-3 py-2 py-1 mb-2'
                            style={{width: '16rem'}}
                        >
                            <Avatar avatarUrl={avatarUrl} alt={user?.name ?? ''} width={80} height={80}/>
                            <div className='pe-2'>
                                <h6 className='fs-base mb-0 text-light'>
                                    {user?.name}
                                </h6>
                                <div className='fs-xs py-2'>
                                    {user?.email}
                                </div>
                            </div>
                        </div>
                        <Dropdown.Item as={Link} href='/api/auth/signout'>
                            <i className='fi-logout ms-2' onClick={() => signOut()}></i>
                            התנתק
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            }
        </>
    )
}


