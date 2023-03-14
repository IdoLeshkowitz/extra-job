'use client'

import {FC, MouseEventHandler} from "react";

interface PillButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>
    type?: 'submit' | 'button'
    text?: string
    icon?: string
}

const PillButton: FC<PillButtonProps> = ({text, type, onClick, icon}) => {
    return (
        <button
            onClick={onClick ? onClick : () => {}}
            type={type ? type : 'button'}
            className="icon-box card card-light flex-row align-items-center card-hover rounded-pill py-2 ps-2 pe-4"
        >
            <div className="icon-box-media bg-faded-light text-light rounded-circle me-2 text-end">
                <i className={`${icon && icon} text-end`}/>
            </div>
            <h3 className="icon-box-title fs-sm text-light ps-1 mb-0">{text || ''}</h3>
        </button>
    )
}

export default PillButton