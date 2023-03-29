'use client'

import {FC, MouseEventHandler} from "react";

interface PillButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>
    type?: 'submit' | 'button'
    text?: string
    icon?: string
    loading?: boolean
    disabled?: boolean
}

const PillButton: FC<PillButtonProps> = (props) => {
    const {onClick, type, text, icon, loading, disabled} = props
    return (
        <button
            dir='ltr'
            onClick={onClick && onClick}
            type={type ? type : 'button'}
            className={`icon-box card card-light flex-row align-items-center rounded-pill py-2 ps-2 pe-4 card-hover`}
        >
            <div
                className="icon-box-media bg-faded-light text-light rounded-circle me-2 justify-content-center align-items-center d-flex">
                {
                    loading ?
                        <div className="spinner-grow text-light" role="status"/>
                        :
                        <i className={`${icon && icon} text-end`}/>
                }
            </div>
            <h3 className="icon-box-title fs-sm text-light ps-1 mb-0">{text || ''}</h3>
        </button>
    )
}

export default PillButton