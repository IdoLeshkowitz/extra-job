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
    const iconEl = icon ? <i className={`${icon} me-2`}></i> : ''
    const handleSelect = (eventKey: string | null) => {
        const chosenOption = options?.find((option) => option.id === eventKey) ?? null
        setSelected(chosenOption)
        if (chosenIdRef) {
            chosenIdRef.current = chosenOption?.id ?? null
        }
    }

    return (
        <Dropdown {...props} onSelect={handleSelect}>
            <Dropdown.Toggle variant={variant ? variant : 'link'}>
                {iconEl}
                {selected ? selected.text : instructions}
            </Dropdown.Toggle>
            <Dropdown.Menu variant={darkMenu ? 'dark' : ''}>
                <Dropdown.Item key={-1} eventKey={undefined}>
                    {iconEl}
                    {instructions}
                </Dropdown.Item>
                {options ? options.map((option, indx) =>
                    <Dropdown.Item key={indx} eventKey={option.id}>
                        {option.icon && <i className={`${option.icon} fs-lg opacity-60 me-2`}></i>}
                        {option.text}
                    </Dropdown.Item>) : ''}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownSelect
