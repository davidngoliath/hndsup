import React, { useContext, useState, useEffect } from 'react';
import actionStyles from "../styles/components/takeaction.module.css";
import { ModalContext } from "../contexts/ModalContext";
import { getAssetPath } from '../config';

export default function TakeAction({actionRef}) {

    const { state, setState, handleModal, contact, setContact, donate, setDonate  } = useContext(ModalContext);


    const [isSocialBrowser, setIsSocialBrowser] = useState(false);

    useEffect(() => {
        // Detect if the user is on Facebook or Instagram browser
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        setIsSocialBrowser(/FBAN|FBAV|Instagram/.test(userAgent));
    }, []);

    return (
        <>
            <section className={actionStyles.takeActionContainer} ref={actionRef}>
                
                <div className={actionStyles.takeActionHeader}>
                    {/* <img src={getAssetPath('/images/foundation_logo.png')} alt="takeaction" width={562.5} height={176.5} className={actionStyles.foundationLogo}/> */}
                    <div className={actionStyles.takeActionImageContainer}>
                        <h2>idea</h2>
                        <p>
                            We introduced HndsUp, a wearable camera prototype designed to protect Black civilians during police encounters. Like any major tech launch, we began with a mysterious teaser to spark curiosity and build anticipation.
                        </p>
                        <p>
                            The device was packed with life-saving features: it could livestream footage to local news outlets in real time, perform a body scan to confirm the user is unarmed, and even call for an ambulance—because every second counts.
                        </p>
                        <p>
                            But here’s the twist: HndsUp was never meant to hit the market.
                            Because in the end, technology isn’t the answer. Conversation is.
                        </p>
                        <p>
                            We asked people to support Courageous Conversation, an organization offering racial equity and de-escalation training. Their programs give officers the tools to build trust and handle difficult situations with care.
                            Because while technology can record what happens, only education and conversation can prevent it from happening in the first place.
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
