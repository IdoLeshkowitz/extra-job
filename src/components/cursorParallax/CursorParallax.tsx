'use client'
import {ReactNode, useEffect, useRef} from 'react'
import Parallax from 'parallax-js'
import Image from "next/image";

// Layer
interface LayerProps {
    depth: number
    children: ReactNode;
    className?: string;
}

interface CursorParallaxProps {
    children?: ReactNode;
    className?: string;
    variant?: '1' | '2'
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
const CursorParallax = ({children, className, variant}: CursorParallaxProps) => {
    const el = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (el.current) {
            const parallax = new Parallax(el.current)
            return (() => {
                parallax.disable()
            })
        }
    }, [children])
    variant = variant ? variant : '1'
    return (
        <div
            style={{maxWidth: '526px'}}
            ref={el}
            className={`parallax${className ? ` ${className}` : ''}`}
        >
            <Layer depth={0.1}>
                <Image priority src={`/images/job-board/hero-banner-${variant}/layer01.svg`} width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.16}>
                <Image priority src={`/images/job-board/hero-banner-${variant}/layer02.svg`} width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.38}>
                <Image priority src={`/images/job-board/hero-banner-${variant}/layer03.svg`} width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.16}>
                <Image priority src={`/images/job-board/hero-banner-${variant}/layer04.svg`} width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.16}>
                <Image priority src={`/images/job-board/hero-banner-${variant}/layer05.svg`} width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.45}>
                <Image priority src={`/images/job-board/hero-banner-${variant}/layer06.svg`} width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.3}>
                <Image priority src={`/images/job-board/hero-banner-${variant}/layer07.svg`} width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.2}>
                <Image priority src={`/images/job-board/hero-banner-${variant}/layer08.svg`} width={526}
                       height={353} alt='Layer'/>
            </Layer>
        </div>
    )
}

export default CursorParallax
