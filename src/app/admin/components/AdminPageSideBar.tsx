'use client'
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import CardNav from '@/components/navbar/CardNav';
import {useState} from "react";
import {Col, SSRProvider} from "react-bootstrap";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {usePathname} from "next/navigation";

interface NavItem {
    href: string
    icon: string
    name: string
}

const navItems: NavItem[] = [
    {
        name: 'איזורים',
        href: '/admin/area',
        icon: 'fi-map'
    },
    {
        name: 'מקצועות',
        href: '/admin/profession',
        icon: 'fi-briefcase'
    },
    {
        name: 'היקף משרות',
        href: '/admin/positionscope',
        icon: 'fi-briefcase'
    },
    {
        name: 'משרות',
        href: '/admin/joblisting',
        icon: 'fi-briefcase'
    },
]
export default function AdminPageSideBar() {
    const accountPageTitle = 'title'
    return (
        <SSRProvider>
            <Col md={3} className='pe-xl-4 mb-5'>
                <div className='card card-body card-light border-0 shadow-sm pb-1 me-lg-1'>
                    {/*ACCOUNT DETAILS */}
                    <AccountDetails/>
                    {/*<Nav/>*/}
                    <Nav/>
                </div>
            </Col>
        </SSRProvider>
    )
}

function Nav() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    return (
        <>
            <Button
                variant='outline-light'
                className='d-block d-md-none w-100 mb-3'
                onClick={() => setOpen(!open)}
                aria-controls='account-menu'
                aria-expanded={open}
            >
                <i className='fi-align-justify me-2'></i>
                Menu
            </Button>
            <Collapse in={open} className='d-md-block'>
                <div id='account-menu'>
                    <CardNav className='pt-3'>
                        {
                            navItems.map((item, index) =>
                                (
                                    <CardNav.Item
                                        href={item.href}
                                        icon={item.icon}
                                        key={index}
                                        active={pathname === item.href}
                                    >
                                        {item.name}
                                    </CardNav.Item>
                                ))}
                    </CardNav>
                </div>
            </Collapse>
        </>
    )
}

function AccountDetails() {
    const session = useSession()
    const {user} = session.data ?? {}
    return (
        <>
            <div className='d-flex d-md-block d-lg-flex align-items-start pt-lg-2 mb-4'>
                {/*<Avatar img={{ src: '/images/avatars/01.jpg', alt: 'Robert Fox' }} size={[48, 48]} />*/}
                <div className='pt-md-2 pt-lg-0 ps-3 ps-md-0 ps-lg-3'>

                    {/*USER NAME*/}
                    <h2 className='text-light fs-lg mb-0'>{user?.name}</h2>

                    <ul className='list-unstyled fs-sm mt-3 mb-0'>

                        {/*USER ROLE*/}
                        <li>
                            <i className='fi-user opacity-75 ms-2'></i>
                            {user?.role}
                        </li>

                        {/*USER EMAIL*/}
                        <li>
                            <i className='fi-mail opacity-75 ms-2'></i>
                            {user?.email}
                        </li>
                    </ul>
                </div>
            </div>
            <Link href='/api/auth/signout' className='btn-primary btn w-100 mb-3'>
                <i className='fi-user me-2'></i>
                התנתק
            </Link>
        </>
    )
}