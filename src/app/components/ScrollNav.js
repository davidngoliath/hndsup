import React, { useEffect, useRef, useState, useCallback} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import scrollNavStyles from "../styles/components/scrollnav.module.css";
import Image from 'next/image';
import useIsomorphicLayoutEffect from '../helpers/useIsomorphicLayoutEffect';


export default function ScrollNav({active, ref, scrolltype, markers}) {

    console.log(active, ref, scrolltype, markers);

    return (
        <>
            <div className={scrollNavStyles.productNav} ref={ref}>
                <div className={scrollNavStyles.productNavButton}>
                {/* <Image src="/images/scrollnav/spacer.svg" alt="spacer" width={28} height={46} className={`${active === index ? scrollNavStyles.setActive : ''}`}/> */}
                <Image src="/images/scrollnav/spacer.svg" alt="spacer" width={28} height={46} className={`${active === 0 ? scrollNavStyles.setActive : ''}`}/>
                <button onClick={() => handleNavToggle(0)} className={`${active === 0 ? scrollNavStyles.setActive : ''}`}></button>
                </div>
                <div className={scrollNavStyles.productNavButton}>
                <Image src="/images/scrollnav/watch.svg" alt="watch" width={28} height={46} className={`${active === 1 ? scrollNavStyles.setActive : ''}`}/>
                <button onClick={() => handleNavToggle(1)} className={`${active === 1 ? scrollNavStyles.setActive : ''}`}></button>
                </div>
                <div className={scrollNavStyles.productNavButton}>
                <Image src="/images/scrollnav/person.svg" alt="person" width={27} height={42} className={`${active === 2 ? scrollNavStyles.setActive : ''}`}/>
                <button onClick={() => handleNavToggle(2)} className={`${active === 2 ? scrollNavStyles.setActive : ''}`}></button>
                </div>
                <div className={scrollNavStyles.productNavButton}>
                <Image src="/images/scrollnav/eye.svg" alt="eye" width={42} height={26} className={`${active === 3 ? scrollNavStyles.setActive : ''}`} /> 
                <button onClick={() => handleNavToggle(3)} className={`${active === 3 ? scrollNavStyles.setActive : ''}`}></button>
                </div>
                <div className={scrollNavStyles.productNavButton}>
                <Image src="/images/scrollnav/notify.svg" alt="notify" width={33} height={29} className={`${active === 4 ? scrollNavStyles.setActive : ''}`}/>
                <button onClick={() => handleNavToggle(4)} className={`${active === 4 ? scrollNavStyles.setActive : ''}`}></button>
                </div>
                <div className={scrollNavStyles.productNavButton}>
                <Image src="/images/scrollnav/firstresponder.svg" alt="firstresponders" width={27} height={27} className={`${active === 5 ? scrollNavStyles.setActive : ''}`} />
                <button onClick={() => handleNavToggle(5)} className={`${active === 5 ? scrollNavStyles.setActive : ''}`}></button>
                </div>
            </div>
        </>
    )
}