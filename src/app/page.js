"use client"
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const panel = useRef([]);
  panel.current = [];

  const wrapper = useRef();
  const [section, setSection] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [wrap, setWrap] = useState();
  const [windowsize, setWindowsize] = useState();

  const handleNavToggle = useCallback((e) => {
    setSection(e)
  }, [setSection]);

  const handleAnimation = useCallback((e) => {
    setTrigger(e)
  }, [setTrigger]);

  useEffect(() => {
    // setTimeout(()=> {
    gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {

        const combinedWidth = panel.current.reduce((totalWidth, slide) => {
          return totalWidth + slide.offsetWidth;
        }, 0);

        setWrap(combinedWidth);
        setWindowsize(window.innerWidth)

        console.log(wrap, windowsize, panel.current.length)
        
        const panels = gsap.utils.toArray(panel.current);
        gsap.to(panels, {
          xPercent: -100 * ( panels.length - 1 ),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper.current,
            pin: true,
            start: "top top",
            scrub: 1,
            markers: true,
            snap: {
              snapTo: 1 / (panels.length - 1),
              inertia: false,
              duration: {min: 0.1, max: 0.1}
            },
            end: () => "+=" + (combinedWidth * (panels.length - 1))
          }
        });


      }, wrapper.current);
        return () => {
          ctx.revert();
          ScrollTrigger.refresh();
        }
    // }, 1000)
  },[wrap, windowsize])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
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

        <section className={styles.productContainer}>
          <div className={styles.productSlideContainer} ref={wrapper}>
            <div className={styles.productSlide} ref={(el) => panel.current[0] = el}>
              <h4>Slide 1</h4>
            </div>
            <div className={styles.productSlide} ref={(el) => panel.current[1] = el}>
              <h4>Slide 2</h4>
            </div>
            <div className={styles.productSlide} ref={(el) => panel.current[2] = el}>
              <h4>Slide 3</h4>
            </div>
            <div className={styles.productSlide} ref={(el) => panel.current[3] = el}>
              <h4>Slide 4</h4>
            </div>
            <div className={styles.productSlide} ref={(el) => panel.current[4] = el}>
              <h4>Slide 5</h4>
            </div>
          </div>
        </section>

        <section className={styles.statisticsContainer}>
        </section>
        <footer className={styles.footer}>
        </footer>
      </main>


    </div>
  );
}
