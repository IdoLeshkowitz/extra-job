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
            <Layer depth={0.1}>
                <Image priority src='/images/job-board/hero-banner-1/layer01.svg' width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.16}>
                <Image priority src='/images/job-board/hero-banner-1/layer02.svg' width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.38}>
                <Image priority src='/images/job-board/hero-banner-1/layer03.svg' width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.16}>
                <Image priority src='/images/job-board/hero-banner-1/layer04.svg' width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.16}>
                <Image priority src='/images/job-board/hero-banner-1/layer05.svg' width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.45}>
                <Image priority src='/images/job-board/hero-banner-1/layer06.svg' width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.3}>
                <Image priority src='/images/job-board/hero-banner-1/layer07.svg' width={526}
                       height={353} alt='Layer'/>
            </Layer>
            <Layer depth={0.2}>
                <Image priority src='/images/job-board/hero-banner-1/layer08.svg' width={526}
                       height={353} alt='Layer'/>
            </Layer>
        </div>
    )
}

export default CursorParallax
