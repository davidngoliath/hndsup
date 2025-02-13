import React, { useEffect, useRef, useState, useCallback} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import statsStyles from "../styles/components/statisticsscroll.module.css";
import Image from 'next/image';
import ScrollNav from './ScrollNav';


export default function StatisticsScroll() {

  const productNav = useRef();
  const panel = useRef([]);
  const wrapper = useRef();
  const [section, setSection] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [wrap, setWrap] = useState(null);
  const [windowsize, setWindowsize] = useState(window.innerWidth);

  
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
    document.getElementById("horizontal-spacer2").style.height = `${totalScroll}px`;
    setWrap(totalScroll);
    setWindowsize(window.innerWidth);


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

    gsap.to(productNav.current, {
      scrollTrigger: {
        trigger: productNav.current,
        start: "bottom bottom",
        end:`+=${totalScroll}`,
        pin: true,
      },
    });

  
    panel.current.forEach((el, index) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top-=' + (el.offsetLeft - windowsize/2) * (totalScroll/(el.offsetWidth * (panel.current.length - 1))),
        end: '+=' + el.offsetWidth * (totalScroll/(el.offsetWidth * (panel.current.length - 1))),
        toggleClass: {targets: el, className: "setActive"},
        onToggle: self => self.isActive && handleNavToggle(index),
        onEnter: self => handleAnimation(index),
      });
    });
    
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  }, []);
      
  const addPanel = useCallback((el) => {
    if (el && !panel.current.includes(el)) {
      panel.current.push(el);
    }
  }, []);

    return (
        <div className={statsStyles.scrollWrapper}>
            <section className={statsStyles.statsContainer}>
            <div className={statsStyles.statsSlideContainer} ref={wrapper}>
            <div className={statsStyles.statsSlide} ref={addPanel}>
                <h4>Slide 1</h4>
            </div>
            <div className={statsStyles.statsSlide} ref={addPanel}>
                <h4>Slide 2</h4>
            </div>
            <div className={statsStyles.statsSlide} ref={addPanel}>
                <h4>Slide 3</h4>
            </div>
            <div className={statsStyles.statsSlide} ref={addPanel}>
                <h4>Slide 4</h4>
            </div>
            <div className={statsStyles.statsSlide} ref={addPanel}>
                <h4>Slide 5</h4>
            </div>
            <div className={statsStyles.statsSlide} ref={addPanel}>
                <h4>Slide 6</h4>
            </div>
            </div>
            </section>
            <ScrollNav active={section} windowsize={windowsize} wrapsize={wrap} ref={productNav}/>
        </div>
    )
}