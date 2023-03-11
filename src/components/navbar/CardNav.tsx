import Link from 'next/link'
import {FC, ReactNode} from "react";


interface CardNavItemProps {
    href?: string
    icon?: string
    active?: boolean
    className?: string
    children?: ReactNode
}

interface CardNavProps {
    children?: ReactNode
    className?: string
}

// Nav item
interface CardNavItem extends FC<CardNavItemProps> {
    Item: FC<CardNavItemProps>
}

const CardNavItem: FC<CardNavItemProps> = ({href, icon, children, active, className, ...props}) => (
    <>
        {href ? <Link href={href} {...props}
                      className={`card-nav-link${className ? ` ${className}` : ''}${active ? ' active' : ''}`}>
                {icon ? <i className={`${icon} me-2`}></i> : ''}
                {children}
            </Link> :
            <div {...props} className={`card-nav-link${className ? ` ${className}` : ''}${active ? ' active' : ''}`}>
                {icon ? <i className={`${icon} me-2`}></i> : ''}
                {children}
            </div>}
    </>
)

// Main wrapper
const CardNav: CardNavItem = ({children, className, ...props}) => (
    <nav {...props} className={`card-nav${className ? ` ${className}` : ''}`}>
        {children}
    </nav>
)

CardNav.Item = CardNavItem
export default CardNav
