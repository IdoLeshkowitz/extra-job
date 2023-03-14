import {FC} from "react";
import Link from "next/link";

interface PillLinkProps{
    href: string
    text: string
    icon?: string
}

const PillLink: FC<PillLinkProps> = ({href, text, icon}) => {
    return (
        <Link
            href={href}
            className="icon-box card card-light flex-row align-items-center card-hover rounded-pill py-2 ps-2 pe-4"
        >
            <div className="icon-box-media bg-faded-light text-light rounded-circle me-2">
                <i className={`${icon && icon} text-end`}/>
            </div>
            <h3 className="icon-box-title fs-sm text-light ps-1 mb-0">{text || ''}</h3>
        </Link>
    )
}

export default PillLink