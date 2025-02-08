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
    // console.log('trigger', e)
    setTrigger(e)
  }, [setTrigger]);




  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      setWrap(wrapper.current.offsetWidth);
      setWindowsize(window.innerWidth)

      console.log(wrapper.current.offsetWidth)

      // gsap.to(wrapper.current, { autoAlpha: 1, duration: 3, ease: 'power3.inOut'})

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panel.current.length - 1),
          start: "top top",
          // end: "+=20000",
          end: () => "+=" + wrap,
          invalidateOnRefresh: true,
        }
      })

      tl.to(panel.current, {
        xPercent: -100 * (panel.current.length - 1),
        duration: 3,
        ease: "none"
      });

      panel.current.forEach((sct, i) => {
        ScrollTrigger.create({
          trigger: sct,
          start: 'top top-=' + (sct.offsetLeft - windowsize/2) * (wrap/(sct.offsetWidth * (panel.current.length - 1))),
          end: '+=' + sct.offsetWidth * (wrap/(sct.offsetWidth * (panel.current.length - 1))),
          toggleClass: {targets: sct, className: "setActive"},
          onToggle: self => self.isActive && handleNavToggle(i),
          onEnter: self => handleAnimation(i),
          invalidateOnRefresh: true, 
          markers: {startColor: "green", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 20}
        })
      });

    }, wrapper.current);
      return () => {
        ctx.revert();
        ScrollTrigger.refresh();
      }

  }, [wrap, windowsize]);

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
            </div>
            <div className={styles.productSlide} ref={(el) => panel.current[1] = el}>
            </div>
            <div className={styles.productSlide} ref={(el) => panel.current[2] = el}>
            </div>
            <div className={styles.productSlide} ref={(el) => panel.current[3] = el}>
            </div>
            <div className={styles.productSlide} ref={(el) => panel.current[4] = el}>
            </div>
          </div>
        </section>

        <section className={styles.statisticsContainer}>
        </section>

      </main>
      <footer className={styles.footer}>
      </footer>

    </div>
  );
}
