'use client'

import {useState} from "react";
import AddAreaModal from "@/partials/AddAreaModal";
import Row from "react-bootstrap/Row";
import {Button, Col} from "react-bootstrap";
import Link from "next/link";

export default function AreasLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    const [addAreaModalActive, setAddAreaModalActive] = useState(false)
    return (
        <>
            Page title
            <div className='d-flex align-items-center justify-content-between py-4 mt-3 mb-2'>
                <h1 className='h3 mb-0'>אזורים</h1>
            </div>
            <Row>
                {/* Sidebar */}
                <Col as='aside' xs={12} md={3} className='mb-4 pb-3 pb-md-0'>
                    <div style={{maxWidth: '13rem'}}>
                        <Link href='/admin/areas/create' className= "button-primary rounded-pill w-100 btn btn-primary">
                            <i className='fi-plus fs-sm me-2'></i>
                            הוסף אזור
                        </Link>
                    </div>
                </Col>
                {/*List of areas*/}
                <div className="col-md-9">
                    {children}
                </div>
            </Row>
        </>
    )
}


