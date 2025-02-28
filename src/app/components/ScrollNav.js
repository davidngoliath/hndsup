import React, { useEffect, useRef, useState, useCallback} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import scrollNavStyles from "../styles/components/scrollnav.module.css";
import Image from 'next/image';
import useIsomorphicLayoutEffect from '../helpers/useIsomorphicLayoutEffect';


export default function ScrollNav({active, ref, scrolltype, markers}) {


    return (
        <>
            <div className={scrollNavStyles.scrollNav} ref={ref}>
                {markers.map((marker, index) => {
                    return (
                        <div className={scrollNavStyles.scrollNavButton} key={index}  >
                        <Image src={`/images/scrollnav/${marker}.svg`} alt="spacer" width={28} height={46} className={`${active === index ? scrollNavStyles.setActive : ''}`}/>
                        <button className={`${active === index ? scrollNavStyles.setActive : ''}`} ></button>
                        {/* { scrolltype === "product" ? <div className={scrollNavStyles.scrollNavButtonSpacer}></div> : null } */}
                        </div>
                    )
                })}

            </div>
        </>
    )
}