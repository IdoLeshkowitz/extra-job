'use client'
import {FC, MutableRefObject, useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

interface Option {
    icon?: string
    text: string
    id: string
}

interface DropdownSelectProps {
    instructions: string
    icon?: string
    variant?: string
    options?: Option[]
    className?: string
    darkMenu?: boolean
    chosenIdRef: MutableRefObject<string | null>
}

const DropdownSelect: FC<DropdownSelectProps> = ({instructions, options, icon, variant, chosenIdRef, darkMenu, ...props}) => {
    const [selected, setSelected] = useState<Option | null>(null)
    const iconEl = icon ? <i className={`${icon} `}></i> : ''
    const handleSelect = (eventKey: string | null) => {
        const chosenOption = options?.find((option) => option.id === eventKey) ?? null
        setSelected(chosenOption)
        if (chosenIdRef) {
            chosenIdRef.current = chosenOption?.id ?? null
        }
    }

    return (
        <Dropdown {...props} onSelect={handleSelect}>
            <Dropdown.Toggle
                variant={variant ? variant : 'link'} style={{direction: 'rtl'}}
                className="gap-3 d-flex align-content-center text-start">
                <i className="d-flex justify-content-center align-items-center">{iconEl}</i>
                {selected ? selected.text : instructions}
            </Dropdown.Toggle>
            <Dropdown.Menu variant={darkMenu ? 'dark' : ''}>
                <Dropdown.Item key={-1} eventKey={undefined} style={{direction: 'rtl'}} className="text-end">
                    {iconEl}
                    <span className="me-2">{instructions}</span>
                </Dropdown.Item>
                {options ? options.map((option, indx) =>
                    <Dropdown.Item key={indx} eventKey={option.id} style={{direction: 'rtl'}} className="text-end">
                        {option.icon && <i className={`${option.icon} fs-lg opacity-60 ms-2`}></i>}
                        {option.text}
                    </Dropdown.Item>) : ''}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownSelect
