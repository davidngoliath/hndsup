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
                    <div className={actionStyles.takeActionImageContainer}>
                        <Image src="/images/takeaction-bg.jpg" alt="takeaction" width={1544} height={877} className={actionStyles.takeActionImage}/>
                    </div>
                    <h1>TAKE ACTION</h1>
                </div>
                <div className={actionStyles.takeActionContent}>
                    <div className={actionStyles.donateContainer}>
                        <h2>Donate</h2>
                        <p>YOUR FINANCIAL SUPPORT ENABLES COMPREHENSIVE TRAINING FOR OFFICERS IN YOUR COMMUNITY, EQUIPPING THEM WITH ESSENTIAL SKILLS TO SERVE EFFECTIVELY AND JUSTLY.</p>
                        <a href="https://ccglobalfoundation.org/donate/" target="_blank" rel="noreferrer" aria-label="Donate">DONATE</a>
                    </div>
                    <div className={actionStyles.writeLetterContainer}>
                        <h2>Contact local law enforcement</h2>
                        <p>HERE YOU CAN AMPLIFY YOUR VOICE BY WRITING TO LOCAL LAW ENFORCEMENT AGENCIES, URGING THEM TO PRIORITIZE ADVANCED TRAINING FOR THEIR OFFICERS.</p>
                        <button onClick={(e) => setContact(true, handleModal())}>WRITE A LETTER</button>
                    </div>
                </div>
            </section>

        </>
    )
}
