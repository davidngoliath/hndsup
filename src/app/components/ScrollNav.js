import React, { useEffect, useRef, useState, useCallback} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import productStyles from "../styles/components/productscroll.module.css";
import Image from 'next/image';
import useIsomorphicLayoutEffect from '../helpers/useIsomorphicLayoutEffect';


export default function ScrollNav({active, ref}) {


    return (
        <>
            <div className={productStyles.productNav} ref={ref}>
                <div className={productStyles.productNavButton}>
                {/* <Image src="/images/spacer.svg" alt="spacer" width={28} height={46} className={`${active === index ? productStyles.setActive : ''}`}/> */}
                <Image src="/images/spacer.svg" alt="spacer" width={28} height={46} className={`${active === 0 ? productStyles.setActive : ''}`}/>
                <button onClick={() => handleNavToggle(0)} className={`${active === 0 ? productStyles.setActive : ''}`}></button>
                </div>
                <div className={productStyles.productNavButton}>
                <Image src="/images/watch.svg" alt="watch" width={28} height={46} className={`${active === 1 ? productStyles.setActive : ''}`}/>
                <button onClick={() => handleNavToggle(1)} className={`${active === 1 ? productStyles.setActive : ''}`}></button>
                </div>
                <div className={productStyles.productNavButton}>
                <Image src="/images/person.svg" alt="person" width={27} height={42} className={`${active === 2 ? productStyles.setActive : ''}`}/>
                <button onClick={() => handleNavToggle(2)} className={`${active === 2 ? productStyles.setActive : ''}`}></button>
                </div>
                <div className={productStyles.productNavButton}>
                <Image src="/images/eye.svg" alt="eye" width={42} height={26} className={`${active === 3 ? productStyles.setActive : ''}`} /> 
                <button onClick={() => handleNavToggle(3)} className={`${active === 3 ? productStyles.setActive : ''}`}></button>
                </div>
                <div className={productStyles.productNavButton}>
                <Image src="/images/notify.svg" alt="notify" width={33} height={29} className={`${active === 4 ? productStyles.setActive : ''}`}/>
                <button onClick={() => handleNavToggle(4)} className={`${active === 4 ? productStyles.setActive : ''}`}></button>
                </div>
                <div className={productStyles.productNavButton}>
                <Image src="/images/firstresponder.svg" alt="firstresponders" width={27} height={27} className={`${active === 5 ? productStyles.setActive : ''}`} />
                <button onClick={() => handleNavToggle(5)} className={`${active === 5 ? productStyles.setActive : ''}`}></button>
                </div>
            </div>
        </>
    )
}