'use client'
import {Breadcrumb, Col, Container, Row, SSRProvider} from "react-bootstrap";

export default function JobSeekerLayout({children}: { children: React.ReactNode }) {
    return (
        <SSRProvider>
            {/* <div className="position-absolute top-0 start-0 w-100 bg-dark" style={{height: "398px"}}></div> */}
            <Container className='container content-overlay mt-5 mb-md-4 py-5'>
                <div className="bg-light shadow-sm rounded-3 p-4 p-md-5 mb-2" style={{direction: 'rtl'}}>
                    {children}
                </div>
            </Container>
        </SSRProvider>
    )
}