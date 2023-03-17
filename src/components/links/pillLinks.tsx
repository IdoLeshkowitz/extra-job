import {FC} from "react";
import Link from "next/link";

interface PillLinkProps {
    href: string
    text: string
    icon?: string
}

const PillLink: FC<PillLinkProps> = ({href, text, icon}) => {
    return (
        <Link
            href={href}
            className="icon-box card card-light flex-row align-items-center card-hover rounded-pill"
        >
            <div className="col d-flex justify-content-center align-items-center">
                <div className="icon-box-media bg-faded-light text-light rounded-circle">
                    <i className={`${icon && icon} text-end text-success`}/>
                </div>
                <h3 className="icon-box-title fs-sm text-light text-end px-1 pt-1">{text || ''}</h3>
            </div>
        </Link>
    )
}

export default PillLink