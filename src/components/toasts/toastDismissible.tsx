'use client'
import {FC, useState} from 'react'
import Toast from 'react-bootstrap/Toast'

{/* Dismisible toast example */}

interface ToastDismissibleProps {
    text: string
    title: string
}

const ToastDismissible: FC<ToastDismissibleProps> = ({text, title}) => {

    const [show, setShow] = useState(true)
    const toggleShow = () => setShow(!show)

    return (
        <>
            <Toast show={show} onClose={toggleShow} style={{direction: 'rtl'}}>
                <Toast.Header>
                    <div
                        className='d-inline-block align-middle bg-primary rounded-1 me-2'
                        style={{width: '1.25rem', height: '1.25rem'}}
                    ></div>
                    <h6 className='fs-sm mb-0 ms-auto me-1'>{title}</h6>
                </Toast.Header>
                <Toast.Body>{text}</Toast.Body>
            </Toast>
        </>
    )
}

export default ToastDismissible