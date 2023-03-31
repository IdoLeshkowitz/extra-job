'use client'
import {Breadcrumb} from "react-bootstrap";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Nav from "react-bootstrap/Nav";

export default function Breadcrumbs() {
    const router = useRouter()
    return (
        <Nav navbarScroll className="pe-3">
            <Nav.Item className='d-flex align-items-center'>
                <Link className="nav-link px-0" href='/'>
                    <i className="fi-home pb-1"></i>
                </Link>
                <i className="fi-chevron-left fs-xxs pt-1 me-2 ms-1 pb-1"></i>
            </Nav.Item>
            <Nav.Item className='d-flex align-items-center'>
                <span onClick={() => router.back()} className="nav-link px-0 cursor-pointer">
                    כל המשרות
                </span>
                <i className="fi-chevron-left fs-xxs pt-1 me-2 ms-1 pb-1"></i>
            </Nav.Item>
        </Nav>
    )
}