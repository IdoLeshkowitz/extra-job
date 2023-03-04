import {useEffect, useRef} from 'react'
import {jarallax} from 'jarallax'

const BgParallax = ({
                        type,
                        speed,
                        imgSrc,
                        overlay,
                        children,
                        className,
                        contentWrapper,
                        ...props
                    }) => {
    const el = useRef()
    useEffect(() => {
        if (el.current) {
            jarallax(el.current, props);
        }

        // Destroy Jarallax.
        return function destroy() {
            if (el.current) {
                jarallax(el.current, 'destroy');
            }
        };
    }, []);

    // Update options.
    useEffect(() => {
        if (el.current) {
            jarallax(el.current, 'destroy');
            jarallax(el.current, props);
        }
    }, [props]) ;
    let overlayEl
    if (overlay === 'gradient') {
        overlayEl = <span className='img-overlay bg-transparent opacity-100'
                          style={{backgroundImage: 'linear-gradient(0deg, rgba(31, 27, 45, .7), rgba(31, 27, 45, .7)'}}></span>
    } else {
        overlayEl = <span className='img-overlay' style={{opacity: overlay + '%'}}></span>
    }

    // Render markup
    return (
        <div  {...props} className={`jarallax${className ? ` ${className}` : ''}`}>
            {overlay && overlayEl}
            <div className='jarallax-img' style={{backgroundImage: `url(${imgSrc})`}}></div>
            {contentWrapper ? <div {...contentWrapper}
                                   className={`content-overlay${contentWrapper.className ? ` ${contentWrapper.className}` : ''}`}>
                {children}
            </div> : <div className='content-overlay'>
                {children}
            </div>}

        </div>
    )
}

export default BgParallax
