'use client'
import Link from "next/link";
import Avatar from "@/components/avatar/Avatar";
import {Button, Collapse, Placeholder} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import {useState} from "react";
import {useSession} from "next-auth/react";


export default function JobSeekerNavBar() {
    const [open, setOpen] = useState(false)
    const {data, status} = useSession()
    if (status === 'loading') {
        return (
            <Placeholder
                as={'div'}
                animation='glow'
            >
                <Placeholder
                    as={'div'}
                    animation='wave'
                    className='bg-faded-dark rounded'
                    style={{minHeight: '11rem'}}
                >
                </Placeholder>
            </Placeholder>
        )
    }
    if (status === "authenticated") {
        const {user} = data ?? {}
        return (
            <>
                {/*User Details*/}
                <div className='d-flex align-items-start justify-content-between pb-4 mb-2'>
                    <div className='d-flex align-items-start'>
                        <div className='position-relative flex-shrink-0'>
                            <Avatar
                                alt={user?.name ?? 'User'}
                                avatarUrl={user?.image ?? 'public/images/avatars/38.png'}
                                height={100}
                                width={100}
                            />
                        </div>
                        <div className='pe-3 ps-sm-4'>
                            <h3 className='h5'>{user?.name}</h3>
                            <ul className='list-unstyled fs-sm mb-0 pe-0'>
                                <li className='d-flex text-nav'>
                                    <i className='fi-mail opacity-60 mt-1 ms-2'></i>
                                    <span>{user?.email}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/*Sign Out*/}
                    <Link href='/api/auth/signout' className='nav-link p-0 d-none d-md-block'>
                        <i className='fi-logout mt-n1 ms-2'></i>
                        התנתק
                    </Link>
                </div>

                {/*Toggle Button*/}
                <Button size='lg' variant='outline-primary rounded-pill'
                        onClick={() => setOpen(!open)}
                        aria-controls='account-menu'
                        aria-expanded={open}
                        className='d-md-none w-100'
                >
                    <i className='fi-align-justify ms-2 pt-1'></i>
                    קטגוריות
                </Button>
                <Collapse in={open}>
                    <div id='account-menu-mobile' className='d-md-block'>
                        <Nav variant='pills'
                             className='flex-column flex-md-row pt-3 pt-md-0 pb-md-4 border-bottom-md'>
                            <Nav.Item className='mb-md-0 me-md-2 pe-md-1'>
                                <Nav.Link as={Link} href='/jobseeker/settings'>
                                    <i className='fi-settings mt-n1 ms-2 fs-base'></i>
                                    הגדרות
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='mb-md-0 me-md-2 pe-md-1'>
                                <Nav.Link as={Link} href='/job-board/account-resumes'>
                                    <i className='fi-file mt-n1 ms-2 fs-base'></i>
                                    קורות חיים
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='mb-md-0 me-md-2 pe-md-1'>
                                <Nav.Link as={Link} href='/job-board/account-saved-jobs'>
                                    <i className='fi-bell mt-n1 ms-2 fs-base'></i>
                                    בקשות
                                </Nav.Link>
                            </Nav.Item>
                            {/*Mobile Only Sign-Out Button*/}
                            <Nav.Item className='mb-md-0 me-md-2 pe-md-1 d-md-none'>
                                <Nav.Link as={Link} href='/signin-light'>
                                    <i className='fi-logout mt-n1 ms-2 fs-base'></i>
                                    התנתק
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </Collapse>
            </>
        )
    }
    return null
}