'use client'
import {Breadcrumb, Col, Container, Row, SSRProvider} from "react-bootstrap";
import Link from "next/link";
import Nav from "@/app/admin/components/Nav";

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <SSRProvider>
            <Container className='pt-5 pb-lg-4 mt-5 mb-sm-2'>

                {/* Breadcrumb */}
                <Breadcrumb className='breadcrumb-light mb-4 pt-md-3'>
                    <Breadcrumb.Item linkAs={Link} href='/car-finder'>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} href='/car-finder/account-info'>Account</Breadcrumb.Item>
                    <Breadcrumb.Item active>Title</Breadcrumb.Item>
                </Breadcrumb>

                <Row>

                    {/* Sidebar (Account nav) */}
                    <Col md={5} lg={4} className='pe-xl-4 mb-5'>
                        <div className='card card-body card-light border-0 shadow-sm pb-1 me-lg-1'>
                            <div className='d-flex d-md-block d-lg-flex align-items-start pt-lg-2 mb-4'>
                                {/*<Avatar img={{ src: '/images/avatars/01.jpg', alt: 'Robert Fox' }} size={[48, 48]} />*/}
                                <div className='pt-md-2 pt-lg-0 ps-3 ps-md-0 ps-lg-3'>
                                    <h2 className='text-light fs-lg mb-0'>Robert Fox</h2>
                                    {/*<StarRating rating={4.8} light />*/}
                                    <ul className='list-unstyled fs-sm mt-3 mb-0'>
                                        <li>
                                            <a href='tel:4057329046' className='nav-link-light fw-normal p-0'>
                                                <i className='fi-phone opacity-75 me-2'></i>
                                                (405) 732-9046
                                            </a>
                                        </li>
                                        <li>
                                            <a href='mailto:robert_fox@email.com'
                                               className='nav-link-light fw-normal p-0'>
                                                <i className='fi-mail opacity-75 me-2'></i>
                                                robert_fox@email.com
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Link href='/api/auth/signout' className='btn-primary btn w-100 mb-3'>
                                <i className='fi-user me-2'></i>
                                התנתק
                            </Link>
                            <Nav/>
                        </div>
                    </Col>

                    {/* Page content */}
                    <Col md={7} lg={8} className='mb-5 '>
                        {children}
                    </Col>
                </Row>
            </Container>
        </SSRProvider>
    )
}