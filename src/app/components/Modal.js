"use client"
import React, { useContext, useRef, useEffect, useCallback } from "react";
import { ModalContext } from "../contexts/ModalContext";
import styles from "../styles/components/modal.module.css";
import "../globals.css";
import Video from "./Video";
import Contact from "./Contact";
import Donate from "./Donate";
import { gsap } from 'gsap';


export default function Modal() {
    const { state, handleModal, video, contact, donate} = useContext(ModalContext);

	const modalWrapper = useRef(null);

    useEffect(()=> {
    	const tl = gsap.timeline()	
    	// const mainTag = document.getElementsByTagName('main')[0];
    	if(state.clicked === false){
    		
    		tl.set(modalWrapper.current, { autoAlpha: 0})
            document.body.classList.remove('no-scroll');
    	} else if ( state.clicked === true || (state.clicked === true && state.initial === null)){
    		
            document.body.classList.add('no-scroll');
    		tl.to(modalWrapper.current, { autoAlpha: 1, duration: 0.5, ease: 'Expo.easeInOut'})
    	}
    })

    return (
        <div ref={modalWrapper} className={styles.modalContainer}>
            { video && <Video videoId={video}/> }
            { contact && <Contact /> }
            { donate && <Donate /> }
            <div className={styles.closeContainer}>
                <button aria-label="Toggle video modal" className={styles.closeBtn} onClick={handleModal}>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </button>
            </div>
        </div>
    )
}   