"use client"
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductScroll from "./components/ProductScroll";
import StatisticsScroll from "./components/StatisticsScroll";

export default function Home() {




  return (
    <>
        <nav className={styles.navContainer}>
          <div className={styles.pageLinks}>
            <div>
              <a href="/">VIDEO</a>
            </div>
            <div>
              <a href="/">EXPLORE PRODUCTS</a>
            </div>
            <div>
              <a href="/">STATISTICS</a>
            </div>
          </div>
          <div className={styles.takeAction}>
            <a href="/">TAKE ACTION</a>
          </div>
        </nav>
        <section className={styles.heroContainer}>
          <Image src="/images/circleblur.png" alt="hero" width={3024} height={2744} className={styles.blur}/>
          <div className={styles.heroContent}>
            <div className={styles.titleContainer}>
              <h4>THE COURAGEOUS CONVERSATIONS<sup>®</sup>GLOBAL FOUNDATION</h4>
              <span>presents</span>
              <Image src="/images/hndsup_logo.svg" alt="hndsup" width={319} height={209} className={styles.hndsup}/>
              <h4 className={styles.titleSubline}>FIRST OF ITS KIND CIVILIAN WEARABLE CAMERA THAT RECORDS POLICE ENCOUNTERS.</h4>
              <button className={styles.heroVideo}>
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

        <ProductScroll />
        <div id="horizontal-spacer" style={{ height: "100vh" }}></div>

        <StatisticsScroll />
        <div id="horizontal-spacer2" style={{ height: "100vh" }}></div>
        <footer className={styles.footer}>
        </footer>


</>
  );
}
