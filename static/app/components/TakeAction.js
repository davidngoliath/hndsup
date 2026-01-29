import React, { useContext, useState, useEffect, useRef } from 'react';
import actionStyles from "../styles/components/takeaction.module.css";
import { ModalContext } from "../contexts/ModalContext";
import { getAssetPath } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TakeAction({actionRef}) {

    const { state, setState, handleModal, contact, setContact, donate, setDonate  } = useContext(ModalContext);

    const imageContainerRef = useRef(null);
    const [isSocialBrowser, setIsSocialBrowser] = useState(false);

    useEffect(() => {
        // Detect if the user is on Facebook or Instagram browser
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        setIsSocialBrowser(/FBAN|FBAV|Instagram/.test(userAgent));
    }, []);

    useEffect(() => {
        if (imageContainerRef.current) {
            gsap.fromTo(
                imageContainerRef.current,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: imageContainerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    }, []);

    return (
        <>
            <section className={actionStyles.takeActionContainer} ref={actionRef}>
                
                <div className={actionStyles.takeActionHeader}>
                    {/* <img src={getAssetPath('/images/foundation_logo.png')} alt="takeaction" width={562.5} height={176.5} className={actionStyles.foundationLogo}/> */}
                    <div className={actionStyles.takeActionImageContainer} ref={imageContainerRef}>
                        <h2>idea</h2>
                        <p>
                            We introduced HndsUp, a wearable camera prototype designed to protect Black civilians during police encounters. Like any major tech launch, we began with a mysterious teaser to spark curiosity and build anticipation.
                        </p>
                        <p>
                            The device was packed with life-saving features: it could livestream footage to local news outlets in real time, perform a body scan to confirm the user is unarmed, and even call for an ambulance—because every second counts.
                        </p>
                        
                        {/* <video src={getAssetPath('/images/takeaction-bg.mp4')} width="1544" height="876" loop autoPlay playsInline muted 
                            className={actionStyles.takeActionImage} >
                        </video> */}

                        {isSocialBrowser ? (
                            <img
                                src={getAssetPath('/images/takeaction-bg.jpg')} // Replace video with fallback image
                                alt="Take Action Background"
                                width={1544}
                                height={876}
                                className={actionStyles.takeActionImage}
                            />
                        ) : (
                            <video
                                src={getAssetPath('/images/takeaction-bg-2.mp4')}
                                width="1544"
                                height="750"
                                loop
                                autoPlay
                                playsInline
                                muted
                                className={actionStyles.takeActionImage}
                            ></video>
                        )}
                        {/* <h1 className={actionStyles.btmTagline}>ONLY<span> police training</span> CAN STOP IT<br className={actionStyles.brRef}/>FROM EVER STARTING.</h1> */}

                    </div>
                </div>

            </section>

        </>
    )
}
