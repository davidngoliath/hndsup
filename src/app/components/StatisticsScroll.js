import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import statsStyles from "../styles/components/statisticsscroll.module.css";
import "../globals.css";
import ScrollNav from './ScrollNav';
import { Data } from "../data.js";
import Image from 'next/image';
import useIsomorphicLayoutEffect from '../helpers/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function StatisticsScroll({ statsRef }) {
    const productNav = useRef();
    const panel = useRef([]);
    const wrapper = useRef();
    const contentParagraphRefs = useRef([]);
    const [section, setSection] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const [wrap, setWrap] = useState(null);
    const [windowsize, setWindowsize] = useState(null);
    const ids = Data[0].statsPanels.map((item, index) => item.id);

    const handleNavToggle = useCallback((e) => {
        setSection(e);
    }, [setSection]);

    const handleAnimation = useCallback((index) => {
      const element = contentParagraphRefs.current[index];
      gsap.fromTo(element, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, delay: 1 });
    }, []);

    const handleNavClick = useCallback((e) => {
        setSection(e);
        setWrap(wrapper.current.offsetWidth);
        setWindowsize(window.innerWidth);
        const getId = Data[0].statsPanels[e].id;

        gsap.to(window, {
            scrollTo: (document.getElementById(getId).offsetLeft * (wrap / (wrap - windowsize))),
            duration: 2
        });
    });

    useLayoutEffect(() => {
        setWindowsize(window.innerWidth);
    }, []);

    // useEffect(() => {
    //     let timeout;

    //     const handleResize = () => {
    //         clearTimeout(timeout);
    //         timeout = setTimeout(() => {
    //             setSection(0);
    //             handleNavClick(0);
    //             ScrollTrigger.refresh();
    //         }, 250); // Wait 250ms after resize before refreshing
    //     };

    //     window.addEventListener("resize", handleResize);

    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //         clearTimeout(timeout);
    //     };
    // }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
                    duration: 2,
                    ease: "power1.inOut",
                },
                end: `+=${totalScroll}`, // Ensures smooth exit
            },
        });

        gsap.to(productNav.current, {
            scrollTrigger: {
                trigger: productNav.current,
                start: "bottom bottom",
                end: `+=${totalScroll}`,
                pin: true,
            },
        });

        panel.current.forEach((el, index) => {
            ScrollTrigger.create({
                trigger: el,
                start: 'top top-=' + (el.offsetLeft - windowsize / 2) * (totalScroll / (el.offsetWidth * (panel.current.length - 1))),
                end: '+=' + el.offsetWidth * (totalScroll / (el.offsetWidth * (panel.current.length - 1))) * 6,
                toggleClass: { targets: el, className: "setActive" },
                onToggle: self => self.isActive && handleNavToggle(index),
                onEnter: self => handleAnimation(index),
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, [windowsize]);

    const addPanel = useCallback((el) => {
        if (el && !panel.current.includes(el)) {
            panel.current.push(el);
        }
    }, []);

    const addContentParagraph = useCallback((el) => {
      if (el && !contentParagraphRefs.current.includes(el)) {
          contentParagraphRefs.current.push(el);
      }
    }, []);

    return (
        <div className={statsStyles.scrollWrapper} ref={statsRef}>
            <section className={statsStyles.statsContainer}>
                <div className={statsStyles.statsSlideContainer} ref={wrapper}>
                    {Data[0].statsPanels.map((item, index) => {
                        return (
                            <div className={statsStyles.statsSlide} key={index} ref={addPanel} id={item.id}>
                                <div className={statsStyles.statsSlideContent}>
                                    <div
                                        className={statsStyles.statsImage100}
                                        style={{
                                            backgroundImage: `url(${item.content.heroVideo[0]})`
                                        }}
                                    ></div>
                                    <Image src={'/images/blueframe.svg'} alt="frame" fill={true} className={statsStyles.blueFrame} />
                                    <div ref={addContentParagraph} dangerouslySetInnerHTML={{ __html: item.content.contentParagraph[0] }} className={statsStyles.contentParagraph}></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
            <ScrollNav active={section} windowsize={windowsize} wrapsize={wrap} ref={productNav} markers={ids} scrolltype={"stats"} />
        </div>
    );
}