'use client'

import {useState} from "react";
import AddAreaModal from "@/partials/AddAreaModal";
import Row from "react-bootstrap/Row";
import {Button, Col} from "react-bootstrap";

export default function AreasLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    const [addAreaModalActive, setAddAreaModalActive] = useState(false)
    return (
        <>
            {addAreaModalActive && <AddAreaModal
                onAdd={() => {
                }}

                areas={[]}
                pillButtons={true}
                show={() => {
                }}

                onHide={() => setAddAreaModalActive(false)}
            />}
            Page title
            <div className='d-flex align-items-center justify-content-between py-4 mt-3 mb-2'>
                <h1 className='h3 mb-0'>אזורים</h1>
            </div>

            <Row>
                {/* Sidebar */}
                <Col as='aside' xs={12} md={3} className='mb-4 pb-3 pb-md-0'>
                    <div style={{maxWidth: '13rem'}}>
                        <Button onClick={() => setAddAreaModalActive(true)} variant='primary rounded-pill w-100'>
                            <i className='fi-plus fs-sm me-2'></i>
                            הוסף אזור
                        </Button>
                    </div>
                </Col>

                     List of areas
                    {children}
            </Row>
        </>
    )
}
