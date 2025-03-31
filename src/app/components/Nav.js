"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/components/nav.module.css';
import "../globals.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Nav({ scrollToSection, videoRef, productRef, statsRef, actionRef }) {

    const [isOpen, setOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const mobileNavBg = useRef(null);
    const mobileButtons = useRef(null);
    const navContainer = useRef(null);
    const smalllogo = useRef(null);
    const logoSmallDesktopRef = useRef(null);

    const [state, setState] = useState({
        initial: false,
        clicked: null,
        menuName: 'Menu'
    });

    const [disabled, setDisabled] = useState(false);

    const handleMenu = () => {
        disableMenu();
        if (state.initial === false) {
            setState({
                initial: null,
                clicked: true,
                menuName: 'Close'
            });
        } else if (state.clicked === true) {
            setState({
                clicked: !state.clicked,
                menuName: 'Menu'
            });
        } else if (state.clicked === false) {
            setState({
                clicked: !state.clicked,
                menuName: 'Close'
            });
        }
    };

    const disableMenu = () => {
        setDisabled(!disabled);
        setTimeout(() => {
            setDisabled(false);
        }, 2500);
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: videoRef.current,
            start: "top 50%",
            end: "bottom 50%",
            // markers: true,
            onEnter: () => {
                gsap.to(logoSmallDesktopRef.current, { autoAlpha: 0, duration: 1, ease: 'Expo.easeOut' });
                gsap.to(smalllogo.current, { autoAlpha: 0, duration: 1, ease: 'Expo.easeOut' });
            },
            onLeave: () => {
                gsap.to(logoSmallDesktopRef.current, { autoAlpha: 1, duration: 1, ease: 'Expo.easeOut' });
                gsap.to(smalllogo.current, { autoAlpha: 1, duration: 1, ease: 'Expo.easeOut' });
            },
            onEnterBack: () => {
                gsap.to(logoSmallDesktopRef.current, { autoAlpha: 0, duration: 1, ease: 'Expo.easeOut' });
                gsap.to(smalllogo.current, { autoAlpha: 0, duration: 1, ease: 'Expo.easeOut' });
            },
            onLeaveBack: () => {
                gsap.to(logoSmallDesktopRef.current, { autoAlpha: 1, duration: 1, ease: 'Expo.easeOut' });
                gsap.to(smalllogo.current, { autoAlpha: 1, duration: 1, ease: 'Expo.easeOut' });
            }
        });

    }, [videoRef.current]);



    useEffect(() => {
        const tl = gsap.timeline();

        if (state.clicked === null) {
            // Initial state, do nothing
        }
        if (state.clicked === false) {
            setOpen(false);
            tl.to([mobileButtons.current, mobileNavBg.current], { display: 'none', autoAlpha: 0, duration: 2, ease: 'Expo.easeOut' });
            tl.set(navContainer.current, { css: { height: 'auto' } });
        } else if (state.clicked === true || (state.clicked === true && state.initial === null)) {
            setOpen(true);
            tl.set(navContainer.current, { css: { height: '100%' } });
            tl.to([mobileNavBg.current, mobileButtons.current], { display: 'flex', autoAlpha: 1, duration: 1, ease: 'Expo.easeOut' });
        }
    }, [state]);


    return (
        <nav className={styles.navContainer} ref={navContainer}>
            <div className={styles.mobileNavBackground} ref={mobileNavBg}></div>

            <div className={styles.mobileButtonContainer} ref={mobileButtons}>
                <div className={styles.mobilePageLinks}>
                    <div>
                        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(videoRef); handleMenu();}}>VIDEO</a>
                    </div>
                    <div>
                        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(productRef); handleMenu();}}>PRODUCT OVERVIEW</a>
                    </div>
                    <div>
                        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(statsRef); handleMenu();}}>STATISTICS</a>
                    </div>
                </div>
                <div className={styles.mobileTakeAction}>
                        <a href="https://ccglobalfoundation.org/donate/" target="_blank" rel="noreferrer" aria-label="Donate"
                            onClick={() => {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                    event: "click_donate",
                                    category: "Button Click",
                                    label: "homepage_donate_now_button",
                                    value: 1,
                                });
                            }}
                        
                        >DONATE</a>
                </div>
            </div>
            <div className={styles.mobileNavContainer}>
                <Image src="/images/logosmall.svg" alt="logo" width={77} height={51} className={styles.logoSmall} ref={smalllogo} />
                <button aria-label="Toggle main menu" disabled={disabled} className={styles.hamburger} onClick={handleMenu}>
                    <span className={`${styles.line} ${state.clicked ? styles.isActiveOne : ''}`}></span>
                    <span className={`${styles.line} ${state.clicked ? styles.isActiveTwo : ''}`}></span>
                </button>
            </div>
            <div className={styles.desktopButtonContainer}>
                <Image src="/images/logosmall.svg" alt="logo" width={77} height={51} className={styles.logoSmallDesktop} ref={logoSmallDesktopRef} />
                <div className={styles.desktopPageLinks}>
                    <div>
                        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(videoRef); }}>VIDEO</a>
                    </div>
                    <div>
                        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(productRef); }}>PRODUCT OVERVIEW</a>
                    </div>
                    <div>
                        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(statsRef); }}>STATISTICS</a>
                    </div>
                </div>
                <div className={styles.desktopTakeAction}>
                        <a href="https://ccglobalfoundation.org/donate/" target="_blank" rel="noreferrer" aria-label="Donate"
                            onClick={() => {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                    event: "click_donate",
                                    category: "Button Click",
                                    label: "homepage_donate_now_button",
                                    value: 1,
                                });
                            }}
                        
                        >DONATE</a>
                </div>
            </div>
        </nav>
    );
}
