'use client'
import {Breadcrumb, Col, Container, Row, SSRProvider} from "react-bootstrap";
import Link from "next/link";
import SideBar from "@/app/admin/_components/SideBar";

export default function JobSeekerLayout({children}: { children: React.ReactNode }) {
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
                    {/*SIDE BAR*/}
                    <SideBar/>

                    {/* Page content */}
                    <Col md={7} lg={8} className='mb-5 '>
                        {children}
                    </Col>
                </Row>
            </Container>
        </SSRProvider>
    )
}