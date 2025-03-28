"use client"
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import Image from "next/image";
import styles from "./styles/page.module.css";
import "./globals.css";
import { gsap } from "gsap";
import ProductScroll from "./components/ProductScroll";
import StatisticsScroll from "./components/StatisticsScroll";
import StatisticsSlider from "./components/StatisticsSlider";
import TakeAction from "./components/TakeAction";
import { ModalContext } from "./contexts/ModalContext";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import { Data } from "./data.js";
import LoadingScreen from "./components/LoadingScreen";


export default function Home() {
  const { state, setState, handleModal, video, setVideo  } = useContext(ModalContext);
  const videoDiv = useRef();
  const productDiv = useRef();
  const statsDiv = useRef();
  const actionDiv = useRef();
  const mainDiv = useRef();
  const fist = useRef();
  const fistMobile = useRef();
  const [loading, setLoading] = useState(true);

  const vimeoId = Data[0].videoId;

  const scrollToSection = (ref) => {
    // Object mapping refs to labels
    const refLabels = new Map([
      [videoDiv, "Video/Hero Section"],
      [productDiv, "Product Section"],
      [statsDiv, "Statistics Section"],
      [actionDiv, "Take Action Section"],
    ]);
  
    // Scroll to the section
    ref.current.scrollIntoView({ behavior: "smooth" });
  
    // Get the label for the ref
    const label = refLabels.get(ref) || "Unknown Section";
  
    // Push event to GTM's dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "button_click",
      category: "User Interaction",
      label: label,
      value: 1,
    });
  };

  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // }, []);


  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
      
      const tl = gsap.timeline();
      tl.to(mainDiv.current, { autoAlpha: 1, duration: 1 })
        .fromTo(fist.current, { autoAlpha: 0 }, { autoAlpha: 1, ease: "power3.out", duration: 2 }, 0)
        
    };

    // Set a timeout to hide the loading screen after 5 seconds
    const timeout = setTimeout(handleLoad, 5000);

    // Wait for all images to load
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    
    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            clearTimeout(timeout); // Clear the timeout if all images load before 5 seconds
            handleLoad();
          }
        });
        img.addEventListener('error', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            clearTimeout(timeout); // Clear the timeout if all images load before 5 seconds
            handleLoad();
          }
        });
      }
    });

    if (loadedImages === images.length) {
      clearTimeout(timeout); // Clear the timeout if all images load before 5 seconds
      handleLoad();
    }

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <Nav scrollToSection={scrollToSection} videoRef={videoDiv} productRef={productDiv} statsRef={statsDiv} actionRef={actionDiv} />
      <main ref={mainDiv} className={styles.main}>
        <section className={styles.heroContainer} ref={videoDiv}>
          <div className={styles.heroContent}>
            <div className={styles.titleContainer}>
              <h3>COURAGEOUS CONVERSATION<sup>®</sup></h3><h3>GLOBAL FOUNDATION</h3>
              <span>presents</span>
              <Image src="/images/hndsup_logo.svg" alt="hndsup" width={319} height={209} className={styles.hndsup}/>
              <div className={styles.fistContainerMobile}>
                <video src="/images/fistheader.mp4" ref={fistMobile} width="531" height="758" loop autoPlay playsInline muted 
                className={styles.fistImageMobile} >
                </video>
              </div>
              <h4 className={styles.titleSubline}>FIRST-OF-ITS-KIND CIVILIAN-WEARABLE CAMERA THAT RECORDS POLICE ENCOUNTERS.</h4>
              <button className={styles.heroVideo} onClick={(e) => {
                      window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "click_watch_video",
                    category: "Button Click",
                    label: "homepage_watch_video_button",
                    value: 1,
                  });
                  
                  setVideo(vimeoId,handleModal())

                }} 
              >
                <div className={styles.playGraphic}>
                  <span></span>
                </div>
                <div className={styles.videoText}>
                  <span>WATCH VIDEO</span>
                </div>
              </button>
            </div>
            <div className={styles.fistContainer}>
              <video src="/images/fistheader.mp4" ref={fist} width="1062" height="1516" loop autoPlay playsInline muted 
              className={styles.fistImage} >
              </video>
            </div>
          </div>
        </section>

        <ProductScroll productRef={productDiv}/>
        <div id="horizontal-spacer" style={{ height: "100vh" }}></div>
        <StatisticsSlider statsRef={statsDiv}/>
        {/* <StatisticsScroll statsRef={statsDiv}/>
        <div id="horizontal-spacer2" style={{ height: "100vh" }}></div> */}
        <TakeAction actionRef={actionDiv}/>
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerText}>
              <p><span className={styles.copyright}>{'\u00A9'}</span>2025 HNDSUP ALL RIGHTS RESERVED</p>
            </div>
            <div className={styles.footerLogoContainer}>
              <a href="https://www.facebook.com/OfficialCourageousConversation" target="_blank" rel="noreferrer" aria-label="Facebook"
                onClick={() => {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                    event: "click_social",
                    category: "Button Click",
                    label: "footer_social_icon_facebook",
                    value: 1,
                  });
                }}
              >
                <Image src="/images/facebook.svg" alt="facebook" width={23} height={23} className={styles.footerLogos}/>
              </a>
              <a href="https://www.instagram.com/ccaboutrace/" target="_blank" rel="noreferrer" aria-label="Instagram"
                onClick={() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "click_social",
                    category: "Button Click",
                    label: "footer_social_icon_instagram",
                    value: 1,
                  });
                }}
              >
                <Image src="/images/instagram.svg" alt="instagram" width={23} height={23} className={styles.footerLogos}/>  
              </a>
              <a href="https://x.com/CCAboutRace" target="_blank" rel="noreferrer" aria-label="X"
                      onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                          event: "click_social",
                          category: "Button Click",
                          label: "footer_social_icon_x",
                          value: 1,
                        });
                      }}
              >
                <Image src="/images/twitter.svg" alt="twitter" width={23} height={23} className={styles.footerLogos}/>
              </a>
              <a href="https://www.linkedin.com/company/courageous-conversation-official/" target="_blank" rel="noreferrer" aria-label="Youtube"
                onClick={() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "click_social",
                    category: "Button Click",
                    label: "footer_social_icon_linkedin",
                    value: 1,
                  });
                }}
              >
                <Image src="/images/youtube.svg" alt="youtube" width={23} height={23} className={styles.footerLogos}/>
              </a>
            </div>
          </div>
        </footer>
      </main>
      
      <Modal/>
    </>
  );
}
