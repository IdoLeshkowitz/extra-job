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
interface NavbarProps extends HTMLAttributes<HTMLDivElement>{
    userLoggedIn : boolean;
}
export default function NavBar ({userLoggedIn}:NavbarProps){
    const handleSigninShow=()=>{

    }
    const activeNav :string= 'Home'
    return (
        <Navbar as={StickyNavbar}
                expand='lg'
                className='fixed-top navbar-dark bg-dark'
        >
            <Container>
                <Navbar.Brand as={Link} href='/' className='me-3 me-xl-4'>
                    <Image src='/images/logo/extra-job.png' alt='extra job' width={100} height={100} style={{"height" : "80px"}}></Image>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarNav' className='ms-auto' />

                {/* Display content depending on user auth status  */}
                {userLoggedIn ? <Dropdown className='d-none d-lg-block order-lg-3 my-n2 me-3'>
                        <Dropdown.Toggle as={Link} href='/job-board/account-profile' className='nav-link dropdown-toggle-flush d-flex py-1 px-0' style={{width: '40px'}}>
                            <ImageLoader src='/images/avatars/35.png' width={80} height={80} placeholder={false} className='rounded-circle' alt='Annette Black' />
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant='dark' renderOnMount align='end'>
                            <div className='d-flex align-items-start border-bottom border-light px-3 py-1 mb-2' style={{width: '16rem'}}>
                                <ImageLoader src='/images/avatars/25.png' width={48} height={48} placeholder={false} className='rounded-circle' alt='Annette Black' />
                                <div className='ps-2'>
                                    <h6 className='fs-base mb-0 text-light'>גל אוחיון השבור</h6>
                                    <div className='fs-xs py-2'>
                                        (302) 555-0107<br/>annette_black@email.com
                                    </div>
                                </div>
                            </div>
                            <Dropdown.Item as={Link} href='/job-board/account-profile'>
                                <i className='fi-settings me-2'></i>
                                Profile Settings
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} href='/job-board/account-resumes'>
                                <i className='fi-file me-2'></i>
                                My Resumes
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} href='/job-board/account-saved-jobs'>
                                <i className='fi-heart me-2'></i>
                                Saved Jobs
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} href='/job-board/account-notifications'>
                                <i className='fi-bell me-2'></i>
                                Notifications
                            </Dropdown.Item>
                            <Dropdown.Divider as='div' />
                            <Dropdown.Item as={Link} href='/signin-light'>
                                <i className='fi-logout me-2'></i>
                                Sign Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> :
                    <>
                        <Button size='sm' variant='link btn-light d-none d-lg-block order-lg-3' onClick={handleSigninShow}>
                            <i className='fi-user me-2'></i>
                            Sign in
                        </Button>
                    </>
                }
                <Button href='/job-board/post-resume-1' size='sm' className='rounded-pill order-lg-3 ms-2'>
                    <i className='fi-plus me-2'></i>
                    Post resume
                </Button>
                <Navbar.Collapse id='navbarNav' className='order-md-2'>
                    <Nav navbarScroll style={{maxHeight: '35rem'}}>
                        <Nav.Item as={Dropdown} className='me-lg-2'>
                            <Dropdown.Toggle as={Nav.Link} className='align-items-center pe-lg-4'>
                                <i className='fi-layers me-2'></i>
                                Demos
                                <span className='d-none d-lg-block position-absolute top-50 end-0 translate-middle-y border-end border-light' style={{width: '1px', height: '30px'}}></span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant='dark' renderOnMount>
                                <Dropdown.Item as={Link} href='/real-estate'>
                                    <i className='fi-building fs-base me-2'></i>
                                    Real Estate Demo
                                </Dropdown.Item>
                                <Dropdown.Divider as='div' />
                                <Dropdown.Item as={Link} href='/car-finder'>
                                    <i className='fi-car fs-base me-2'></i>
                                    Car Finder Demo
                                </Dropdown.Item>
                                <Dropdown.Divider as='div' />
                                <Dropdown.Item as={Link} href='/job-board'>
                                    <i className='fi-briefcase fs-base me-2'></i>
                                    Job Board Demo
                                </Dropdown.Item>
                                <Dropdown.Divider as='div' />
                                <Dropdown.Item as={Link} href='/city-guide'>
                                    <i className='fi-map-pin fs-bas me-2'></i>
                                    City Guide Demo
                                </Dropdown.Item>
                                <Dropdown.Divider as='div' />
                                <Dropdown.Item as={Link} href='/'>
                                    <i className='fi-home fs-base me-2'></i>
                                    Main Page
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} href='/components/typography'>
                                    <i className='fi-list fs-base me-2'></i>
                                    Components
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} href='/docs'>
                                    <i className='fi-file fs-base me-2'></i>
                                    Documentation
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Nav.Item>
                        <Nav.Item as={Dropdown}>
                            <Dropdown.Toggle as={Nav.Link} active={activeNav==='Home'}>Home</Dropdown.Toggle>
                            <Dropdown.Menu variant='dark' renderOnMount>
                                <Dropdown.Item as={Link} href='/job-board'>For Job Seekers</Dropdown.Item>
                                <Dropdown.Item as={Link} href='/job-board/index-2'>For Employers</Dropdown.Item>
                            </Dropdown.Menu>
                        </Nav.Item>
                        <Nav.Item as={Dropdown}>
                            <Dropdown.Toggle as={Nav.Link} active={activeNav==='Catalog'}>Catalog</Dropdown.Toggle>
                            <Dropdown.Menu variant='dark' renderOnMount>
                                <Dropdown.Item as={Link} href='/job-board/catalog'>List of Jobs</Dropdown.Item>
                                <Dropdown.Item as={Link} href='/job-board/single'>Single Job Page</Dropdown.Item>
                            </Dropdown.Menu>
                        </Nav.Item>
                        <Nav.Item as={Dropdown}>
                            <Dropdown.Toggle as={Nav.Link} active={activeNav==='Account'}>Account</Dropdown.Toggle>
                            <Dropdown.Menu variant='dark' renderOnMount>
                                <Dropdown>
                                    <Dropdown.Toggle as={Dropdown.Item}>Account Pages</Dropdown.Toggle>
                                    <Dropdown.Menu variant='dark' renderOnMount>
                                        <Dropdown.Item as={Link} href='/job-board/account-profile'>Profile Settings</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/job-board/account-resumes'>My Resumes</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/job-board/account-saved-jobs'>Saved Jobs</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/job-board/account-notifications'>Notifications</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/signin-light'>Sign in</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/signup-light'>Sign up</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Toggle as={Dropdown.Item}>Post Resume</Dropdown.Toggle>
                                    <Dropdown.Menu variant='dark' renderOnMount>
                                        <Dropdown.Item as={Link} href='/job-board/post-resume-1'>Step 1: Basic Info</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/job-board/post-resume-2'>Step 2: Education</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/job-board/post-resume-3'>Step 3: Work Experience</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/job-board/post-resume-4'>Step 4: Skills</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/job-board/post-resume-5'>Step 5: Review</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown.Item as={Link} href='/job-board/promotion'>Ad Promotion Page</Dropdown.Item>
                                <Dropdown.Item as={Link} href='/job-board/employer-single'>Employer / Company Page</Dropdown.Item>
                            </Dropdown.Menu>
                        </Nav.Item>
                        <Nav.Item as={Dropdown}>
                            <Dropdown.Toggle as={Nav.Link} active={activeNav==='Pages'}>Pages</Dropdown.Toggle>
                            <Dropdown.Menu variant='dark' renderOnMount>
                                <Dropdown.Item as={Link} href='/job-board/about'>About</Dropdown.Item>
                                <Dropdown>
                                    <Dropdown.Toggle as={Dropdown.Item}>Blog</Dropdown.Toggle>
                                    <Dropdown.Menu variant='dark' renderOnMount>
                                        <Dropdown.Item as={Link} href='/job-board/blog'>Blog Grid</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/job-board/blog-single'>Blog Single</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown.Item as={Link} href='/job-board/contacts'>Contacts</Dropdown.Item>
                                <Dropdown>
                                    <Dropdown.Toggle as={Dropdown.Item}>Help Center</Dropdown.Toggle>
                                    <Dropdown.Menu variant='dark' renderOnMount>
                                        <Dropdown.Item as={Link} href='/job-board/help-center'>Help Topics</Dropdown.Item>
                                        <Dropdown.Item as={Link} href='/job-board/help-center-single'>Single Topic</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown.Item as={Link} href='/job-board/404-not-found'>404 Not Found</Dropdown.Item>
                            </Dropdown.Menu>
                        </Nav.Item>

                        {/* Display content depending on user auth satus  */}
                        {userLoggedIn ?<Nav.Item as={Dropdown} className='d-lg-none'>
                                <Dropdown.Toggle as={Nav.Link} className='d-flex align-items-center'>
                                    <ImageLoader src='/images/avatars/35.png' width={30} height={30} placeholder={false} className='rounded-circle' alt='Annette Black' />
                                    <span className='ms-2'>Annette Black</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant='dark'>
                                    <div className='fs-xs ps-3 py-2'>
                                        (302) 555-0107<br/>annette_black@email.com
                                    </div>
                                    <Dropdown.Item as={Link} href='/job-board/account-profile'>
                                        <i className='fi-settings me-2'></i>
                                        Profile Settings
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} href='/job-board/account-resumes'>
                                        <i className='fi-file me-2'></i>
                                        My Resumes
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} href='/job-board/account-saved-jobs'>
                                        <i className='fi-heart me-2'></i>
                                        Saved Jobs
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} href='/job-board/account-notifications'>
                                        <i className='fi-bell me-2'></i>
                                        Notifications
                                    </Dropdown.Item>
                                    <Dropdown.Divider as='div' />
                                    <Dropdown.Item as={Link} href='/signin-light'>Sign Out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Nav.Item> :

                            <Nav.Item className='d-lg-none'>
                                <Nav.Link onClick={handleSigninShow}>
                                    <i className='fi-user me-2'></i>
                                    Sign in
                                </Nav.Link>
                            </Nav.Item>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}