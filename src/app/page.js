"use client"
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import Image from "next/image";
import styles from "./styles/page.module.css";
import "./globals.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductScroll from "./components/ProductScroll";
import StatisticsScroll from "./components/StatisticsScroll";
import TakeAction from "./components/TakeAction";
import { ModalContext } from "./contexts/ModalContext";
import Modal from "./components/Modal";

export default function Home() {
  const { state, setState, handleModal, video, setVideo  } = useContext(ModalContext);
  const videoDiv = useRef();
  const productDiv = useRef();
  const statsDiv = useRef();
  const actionDiv = useRef();

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        <nav className={styles.navContainer}>
          <div className={styles.pageLinks}>
            <div>
              <a href="#" onClick={() => scrollToSection(videoDiv)}>VIDEO</a>
            </div>
            <div>
              <a href="#" onClick={() => scrollToSection(productDiv)}>EXPLORE PRODUCTS</a>
            </div>
            <div>
              <a href="#" onClick={() => scrollToSection(statsDiv)}>STATISTICS</a>
            </div>
          </div>
          <div className={styles.takeAction}>
            <a href="#" onClick={() => scrollToSection(actionDiv)}>TAKE ACTION</a>
          </div>
        </nav>
        <section className={styles.heroContainer} ref={videoDiv}>
          <Image src="/images/circleblur.png" alt="hero" width={3024} height={2744} className={styles.blur}/>
          <div className={styles.heroContent}>
            <div className={styles.titleContainer}>
              <h4>THE COURAGEOUS CONVERSATIONS<sup>®</sup>GLOBAL FOUNDATION</h4>
              <span>presents</span>
              <Image src="/images/hndsup_logo.svg" alt="hndsup" width={319} height={209} className={styles.hndsup}/>
              <h4 className={styles.titleSubline}>FIRST OF ITS KIND CIVILIAN WEARABLE CAMERA THAT RECORDS POLICE ENCOUNTERS.</h4>
              <button className={styles.heroVideo} onClick={(e) => setVideo('1033298354',handleModal())}>
                <div className={styles.playGraphic}>
                  <span></span>
                </div>
                <div className={styles.videoText}>
                  <span>WATCH VIDEO</span>
                </div>
              </button>
            </div>
            <div className={styles.fistContainer}>
              <Image src="/images/fist.png" alt="fist" width={3024} height={2744} className={styles.fistImage}/>
            </div>
          </div>
        </section>

        <ProductScroll productRef={productDiv}/>
        <div id="horizontal-spacer" style={{ height: "100vh" }}></div>

        <StatisticsScroll statsRef={statsDiv}/>
        <div id="horizontal-spacer2" style={{ height: "100vh" }}></div>
        <TakeAction actionRef={actionDiv}/>
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerText}>
              <p>© 2025 HNDSUP ALL RIGHTS RESERVED</p>
            </div>
            <div className={styles.footerLogoContainer}>
              <Image src="/images/facebook.svg" alt="facebook" width={23} height={23} className={styles.footerLogos}/>
              <Image src="/images/instagram.svg" alt="instagram" width={23} height={23} className={styles.footerLogos}/>  
              <Image src="/images/twitter.svg" alt="twitter" width={23} height={23} className={styles.footerLogos}/>
              <Image src="/images/youtube.svg" alt="youtube" width={23} height={23} className={styles.footerLogos}/>
            </div>
          </div>
        </footer>
      </main>
      <Modal/>
    </>
  
  );
}
