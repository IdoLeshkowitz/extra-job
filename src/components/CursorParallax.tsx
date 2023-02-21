
import {ReactNode, useEffect, useRef} from 'react'
import Parallax from 'parallax-js'

// Layer
interface LayerProps {
    depth: number
    children: ReactNode;
    className?: string;
}

interface CursorParallaxProps {
    children: ReactNode;
    className?: string;

}

export const Layer = ({depth, children, className, ...props}: LayerProps) => (
    <div
        {...props}
        data-depth={depth ? depth : 0.1}
        className={`parallax-layer${className ? ` ${className}` : ''}`}
    >
        {children}
    </div>
)

// Main wrapper
const CursorParallax = ({children, className}: CursorParallaxProps) => {
    const el = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (el.current) {
            const parallax = new Parallax(el.current)
            return (() => {
                parallax.disable()
            })
        }
    }, [children])

    return (
        <div
            style={{maxWidth: '526px'}}
            ref={el}
            className={`parallax${className ? ` ${className}` : ''}`}
        >
            {children}
        </div>
    )
}

export default CursorParallax
