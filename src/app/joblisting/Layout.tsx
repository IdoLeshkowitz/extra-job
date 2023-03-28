'use client'
import {Button, Col, Container, Form, Pagination, Row, SSRProvider} from "react-bootstrap";
import {ReactNode, useState} from "react";
import JobListingSideBar from "@/app/joblisting/components/JobListingSideBar";
import CustomPagination from "@/components/pagination/customPagination";

export default function Layout({children}: { children: ReactNode }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <SSRProvider>
            <Container fluid className='mt-5 pt-5 p-0'>
                <Row className='mt-n3' style={{direction: "rtl"}}>
                    {/* Filters sidebar (Offcanvas on screens < 992px) */}
                    <JobListingSideBar show={show} handleClose={handleClose}/>
                    {/* Content */}
                   
                </Row>
            </Container>

            {/* Filters sidebar toggle button (visible < 991px) */}
            <Button size='sm' className='w-100 rounded-0 fixed-bottom d-lg-none' onClick={handleShow}>
                <i className='fi-filter me-2'></i>
                Filters
            </Button>
        </SSRProvider>
    )
}
