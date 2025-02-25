
"use client"
import React, { useEffect, useRef, useState, useCallback, useLayoutEffect} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import productStyles from "../styles/components/productscroll.module.css";
import "../globals.css";
import Image from 'next/image';
import ScrollNav from "./ScrollNav";
import { Data } from "../data.js";
import useIsomorphicLayoutEffect from '../helpers/useIsomorphicLayoutEffect';

export default function ProductScroll({productRef}) {
    const productNav = useRef();
    const panel = useRef([]);
    const wrapper = useRef();
    const [section, setSection] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const [wrap, setWrap] = useState(null);
    const [windowsize, setWindowsize] = useState(null);
    const ids = Data[0].productPanels.map((item, index) => item.id);

    const handleNavToggle = useCallback((e) => {
      setSection(e)
    }, [setSection]);
  
    const handleAnimation = useCallback((e) => {
      setTrigger(e)
    }, [setTrigger]);

    useLayoutEffect(() => {
      setWindowsize(window.innerWidth);
    }, []);
    
    const handleNavClick = useCallback((e) => {
      // e.preventDefault();
      setSection(e);
      setWrap(wrapper.current.offsetWidth);
      setWindowsize(window.innerWidth)
      const getId = Data[0].productPanels[e].id;
  
      gsap.to(window, {
        scrollTo:  ( document.getElementById(getId).offsetLeft * (wrap / (wrap - windowsize)) ),
        duration: 2
      })
    })

    // useEffect(() => {
    //   let timeout;
      
    //   const handleResize = () => {
    //     clearTimeout(timeout);
    //     timeout = setTimeout(() => {
    //       window.scrollTo({
    //         top: 0,
    //         left: 0,
    //         behavior: 'smooth'
    //       });
    //       setSection(0);
    //       handleNavClick(0);
    //       ScrollTrigger.refresh();
    //     }); // Wait 250ms after resize before refreshing
    //   };
    
    //   window.addEventListener("resize", handleResize);
      
    //   return () => {
    //     window.removeEventListener("resize", handleResize);
    //     clearTimeout(timeout);
    //   };
    // }, []);
    

    useEffect(() => {
      // const ctx = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        
        // const panels = gsap.utils.toArray(panel.current);
        const totalScroll = wrapper.current.scrollWidth - window.innerWidth;
      
        // Ensure enough space is left after pinning
        document.getElementById("horizontal-spacer").style.height = `${totalScroll}px`;
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

      // }, wrapper.current);
      return () => {
        // ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        // ScrollTrigger.refresh();
      }

    }, [windowsize]);
      
    const addPanel = useCallback((el) => {
      if (el && !panel.current.includes(el)) {
        panel.current.push(el);
      }
    }, []);

    return (
        <div className={productStyles.scrollWrapper} ref={productRef}>
          <section className={productStyles.productContainer}>
              <div className={productStyles.productSlideContainer} ref={wrapper}>
                  {Data[0].productPanels.map((item, index) => {
                    return (
                      <div className={productStyles.productSlide} key={index} ref={addPanel} id={item.id}>
                          <div className={`${item.title === true ? productStyles.productSlideContent : productStyles.productSlideContentRow}`}>
                            <Image src={item.content.heroVideo[0]} alt="hero" width={1512} height={1800}
                            className={`${ item.title === true ? productStyles.productImage100 : productStyles.productImage50}`} />
                            {item.title === true ? 
                              <div className={productStyles.productTitle} dangerouslySetInnerHTML={{ __html: item.content.titleCopy[0] }}></div> 
                              : 
                              <div dangerouslySetInnerHTML={{ __html: item.content.contentParagraph[0] }} className={productStyles.contentParagraph}></div>
                            }
                          </div>
                      </div>
                    )
                  })}
              </div>
          </section>
          <ScrollNav active={section} windowsize={windowsize} wrapsize={wrap} ref={productNav} markers={ids} scrolltype={"product"}/>
        </div>
    )
}