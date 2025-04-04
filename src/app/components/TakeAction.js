import React, { useContext, useState, useEffect } from 'react';
import actionStyles from "../styles/components/takeaction.module.css";
import Image from 'next/image';
import { ModalContext } from "../contexts/ModalContext";

export default function TakeAction({actionRef}) {

    const { state, setState, handleModal, contact, setContact, donate, setDonate  } = useContext(ModalContext);

    return (
        <>
            <section className={actionStyles.takeActionContainer} ref={actionRef}>
                
                <div className={actionStyles.takeActionHeader}>
                    {/* <Image src="/images/foundation_logo.png" alt="takeaction" width={562.5} height={176.5} className={actionStyles.foundationLogo}/> */}
                    <div className={actionStyles.takeActionImageContainer}>
                        <h1>TAKE ACTION</h1>
                        <video src="/images/takeaction-bg.mp4" width="1544" height="876" loop autoPlay playsInline muted 
                            className={actionStyles.takeActionImage} >
                        </video>
                    </div>
                </div>
                <div className={actionStyles.takeActionContent}>
                    <div className={actionStyles.foundationLogoContainer}>
                        <Image src="/images/foundation_logo.png" alt="takeaction" width={562.5} height={176.5} className={actionStyles.foundationLogo}/>
                    </div>
                    <div className={actionStyles.donateContainer}>
                        <h1>Donate Now</h1>
                        <p>YOUR FINANCIAL SUPPORT ENABLES COMPREHENSIVE TRAINING FOR OFFICERS IN YOUR COMMUNITY, EQUIPPING THEM WITH ESSENTIAL SKILLS TO SERVE EFFECTIVELY AND JUSTLY.</p>
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
                    <div className={actionStyles.singletonContainer}>
                        <Image src="/images/singleton.png" alt="singleton" width={102} height={102} className={actionStyles.desktopSingleton}/>
                        <div className={actionStyles.singletonText}>
                            <div className={actionStyles.singletonProfileContainer}>
                                <Image src="/images/singleton.png" alt="singleton" width={102} height={102} className={actionStyles.mobileSingleton}/>
                                <h1>Founded by Glenn E. Singleton</h1>
                            </div>
                            <p>A LIFELONG ADVOCATE FOR RACIAL EQUITY AND CREATOR OF THE COURAGEOUS CONVERSATION<span className={actionStyles.copyright}>{'\u00A9'}</span> FRAMEWORK. THE COURAGEOUS CONVERSATION<span className={actionStyles.copyright}>{'\u00A9'}</span> GLOBAL FOUNDATION PARTNERS WITH COMMUNITIES AND POLICE TO DRIVE TRANSFORMATIVE DIALOGUE, HEALING, AND LASTING SYSTEMIC CHANGE.</p>
                            <a href="https://ccglobalfoundation.org/" target="_blank" rel="noreferrer" aria-label="Donate"
                                onClick={() => {
                                    window.dataLayer = window.dataLayer || [];
                                    window.dataLayer.push({
                                        event: "click_donate",
                                        category: "Button Click",
                                        label: "homepage_donate_now_button",
                                        value: 1,
                                    });
                                }}
                            
                            >LEARN MORE</a>
                        </div>
                    </div>
                    {/* <div className={actionStyles.writeLetterContainer}>
                        <h2>Contact local law enforcement</h2>
                        <p>HERE YOU CAN AMPLIFY YOUR VOICE BY WRITING TO LOCAL LAW ENFORCEMENT AGENCIES, URGING THEM TO PRIORITIZE ADVANCED TRAINING FOR THEIR OFFICERS.</p>
                        <button onClick={(e) => setContact(true, handleModal())}>WRITE A LETTER</button>
                    </div> */}
                </div>
            </section>

        </>
    )
}
