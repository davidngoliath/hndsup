import React, { useEffect, useRef, useState, useCallback} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import productStyles from "../styles/components/productscroll.module.css";
import Image from 'next/image';
import ScrollNav from "./ScrollNav";
import { Data } from "../data.js";

export default function ProductScroll() {
    const productNav = useRef();
    const panel = useRef([]);
    const wrapper = useRef();
    const [section, setSection] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const [wrap, setWrap] = useState(null);
    const [windowsize, setWindowsize] = useState(window.innerWidth);
    const ids = Data[0].productPanels.map((item, index) => item.id);

    const handleNavToggle = useCallback((e) => {
      setSection(e)
    }, [setSection]);
  
    const handleAnimation = useCallback((e) => {
      setTrigger(e)
    }, [setTrigger]);

    // useEffect(() => {
    //   const resizeReset = () => {
    //     ScrollTrigger.refresh();
    //   }
    //   window.addEventListener('resize', resizeReset)
    //     return () => window.removeEventListener('resize', resizeReset)
    // }, [])


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
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
      
        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    }, []);
      
    const addPanel = useCallback((el) => {
      if (el && !panel.current.includes(el)) {
        panel.current.push(el);
      }
    }, []);

    return (
        <div className={productStyles.scrollWrapper}>
          <section className={productStyles.productContainer}>
              <div className={productStyles.productSlideContainer} ref={wrapper}>
                  {Data[0].productPanels.map((item, index) => {
                    return (
                      <div className={productStyles.productSlide} key={index} ref={addPanel}>
                          <div className={`${item.title === true ? productStyles.productSlideContent : productStyles.productSlideContentRow}`}>
                            <Image key={index} src={item.content.heroVideo[0]} alt="hero" width={3024} height={2744}
                            className={`${ item.title === true ? productStyles.productImage100 : productStyles.productImage50}`} />
                            {item.title === true ? 
                              <h2 className={productStyles.productTitle} dangerouslySetInnerHTML={{__html: item.content.titleCopy[0]}}></h2> 
                              : 
                              <p dangerouslySetInnerHTML={{__html: item.content.contentParagraph[0]}} className={productStyles.contentParagraph}></p>
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