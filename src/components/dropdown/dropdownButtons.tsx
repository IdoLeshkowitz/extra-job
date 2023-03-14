'use client'
import Dropdown from "react-bootstrap/Dropdown";
import {FC, ReactNode} from "react";

interface DropDownButtonsProps {
    light: boolean,
    children: ReactNode
}

const DropDownButtons: FC<DropDownButtonsProps> = ({light, children}) => {
    return (
        <Dropdown className='position-relative zindex-10'>
            <Dropdown.Toggle
                variant={`${light ? 'translucent-light' : 'light shadow-sm'} btn-icon btn-xs rounded-circle`}>
                <i className='fi-dots-vertical'></i>
            </Dropdown.Toggle>
            <Dropdown.Menu variant={light ? 'dark' : ''} className='my-1'>
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropDownButtons