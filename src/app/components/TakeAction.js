import React, { useEffect} from 'react';
import actionStyles from "../styles/components/takeaction.module.css";
import Image from 'next/image';


export default function ScrollNav() {


    return (
        <>
            <section className={actionStyles.takeActionContainer}>
                {/* <Image src="/images/takeaction-bg.jpg" alt="takeaction" width={1544} height={1108} className={actionStyles.takeActionImage}/> */}
                <h2>TAKE ACTION</h2>
                <div className={actionStyles.takeActionContent}>
                    <div className={actionStyles.donateContainer}>
                        <h4>DONATE</h4>
                        <p>YOUR FINANCIAL SUPPORT ENABLES COMPREHENSIVE TRAINING FOR OFFICERS IN YOUR COMMUNITY, EQUIPPING THEM WITH ESSENTIAL SKILLS TO SERVE EFFECTIVELY AND JUSTLY.</p>
                        <button>Donate</button>
                    </div>
                    <div className={actionStyles.writeLetterContainer}>
                        <h4>CONTACT LOCAL LAW ENFORCEMENT</h4>
                        <p>HERE YOU CAN AMPLIFY YOUR VOICE BY WRITING TO LOCAL LAW ENFORCEMENT AGENCIES, URGING THEM TO PRIORITIZE ADVANCED TRAINING FOR THEIR OFFICERS.</p>
                        <button>WRITE A LETTER</button>
                    </div>
                </div>
            </section>

        </>
    )
}
