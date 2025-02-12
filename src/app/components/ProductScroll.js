import React, { useEffect, useRef, useState, useCallback} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from "../page.module.css";
// import styles from './Horizontal.module.css';



export default function ProductScroll() {

    const panel = useRef([]);
    const addPanel = useCallback((el) => {
      if (el && !panel.current.includes(el)) {
        panel.current.push(el);
      }
    }, []);
  
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
        gsap.registerPlugin(ScrollTrigger);
      
        // const panels = gsap.utils.toArray(panel.current);
        const totalScroll = wrapper.current.scrollWidth - window.innerWidth;
      
        // Ensure enough space is left after pinning
        document.getElementById("horizontal-spacer").style.height = `${totalScroll}px`;
      
        gsap.to(panel.current, {
          xPercent: -100 * (panel.current.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper.current,
            pin: true,
            start: "top top",
            scrub: 1,
            snap: {
              snapTo: 1 / (panel.current.length - 1),
              duration: 0.5,
              ease: "power1.inOut",
            },
            end: `+=${totalScroll}`, // Ensures smooth exit
          },
        });
      
      }, []);
      

    return (
        <>
            <section className={styles.productContainer}>
            <div className={styles.productSlideContainer} ref={wrapper}>
            <div className={styles.productSlide} ref={addPanel}>
                <h4>Slide 1</h4>
            </div>
            <div className={styles.productSlide} ref={addPanel}>
                <h4>Slide 2</h4>
            </div>
            <div className={styles.productSlide} ref={addPanel}>
                <h4>Slide 3</h4>
            </div>
            <div className={styles.productSlide} ref={addPanel}>
                <h4>Slide 4</h4>
            </div>
            <div className={styles.productSlide} ref={addPanel}>
                <h4>Slide 5</h4>
            </div>
            </div>
            </section>

        </>
    )
}