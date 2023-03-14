'use client'
import {Breadcrumb, Col, Container, Row, SSRProvider} from "react-bootstrap";
import Link from "next/link";
import AdminPageSideBar from "@/app/admin/components/AdminPageSideBar";

export default function JobSeekerLayout({children}: { children: React.ReactNode }) {
    return (
        <SSRProvider>
            <div className="position-absolute top-0 start-0 w-100 bg-dark" style={{height: "398px"}}></div>
            <Container className='container content-overlay mt-5 mb-md-4 py-5'>

                {/* Breadcrumb */}
                <Breadcrumb className='breadcrumb-light mb-4 pt-md-3'>
                    <Breadcrumb.Item linkAs={Link} href='/car-finder'>Home</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} href='/car-finder/account-info'>Account</Breadcrumb.Item>
                    <Breadcrumb.Item active>Details</Breadcrumb.Item>
                </Breadcrumb>

                <div className="bg-light shadow-sm rounded-3 p-4 p-md-5 mb-2">
                    {children}
                </div>
            </Container>
        </SSRProvider>
    )
}