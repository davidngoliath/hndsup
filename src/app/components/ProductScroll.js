"use client"
import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import productStyles from "../styles/components/productscroll.module.css";
import "../globals.css";
import ScrollNav from "./ScrollNav";
import { Data } from "../data.js";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ProductScroll({ productRef }) {
    const productNav = useRef();
    const panel = useRef([]);
    const wrapper = useRef();
    const canvasRef = useRef();
    const contentParagraphRefs = useRef([]);
    const [section, setSection] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const [wrap, setWrap] = useState(null);
    const [windowsize, setWindowsize] = useState(null);
    const ids = Data[0].productPanels.map((item, index) => item.id);

    const handleNavToggle = useCallback((e) => {
        setSection(e);
    }, [setSection]);

    useLayoutEffect(() => {
        setWindowsize(window.innerWidth);
    }, []);

    const handleScrollReset = useCallback(() => {
        setSection(0);
        setWrap(wrapper.current.offsetWidth);
        setWindowsize(window.innerWidth);
        const getId = Data[0].productPanels[0].id;

        gsap.to(window, {
            scrollTo: (document.getElementById(getId).offsetLeft * (wrap / (wrap - windowsize))),
            duration: 2
        });
    });


    
    // useEffect(() => {
    //     // let timeout;

    //     const handleResize = () => {
    //         // console.log('resize');
    //         // clearTimeout(timeout);
    //         // timeout = setTimeout(() => {
    //             setSection(0);
    //             handleNavClick(0);
    //             ScrollTrigger.refresh();
    //         // }, 250); // Wait 250ms after resize before refreshing
    //     };

    //     window.addEventListener("resize", handleResize);

    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //         // clearTimeout(timeout);
    //     };
    // }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
                    ease: "none",
                    delay: 0,
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
                end: '+=' + el.offsetWidth * (totalScroll / (el.offsetWidth * (panel.current.length - 1))),
                toggleClass: { targets: el, className: "setActive" },
                onToggle: self => self.isActive && handleNavToggle(index),
                onEnter: () => {
                    handleNavToggle(index);
                    const element = contentParagraphRefs.current[index];
                    gsap.to(element, { autoAlpha: 1, duration: 1 });
                },
                onEnterBack: () => {
                    handleNavToggle(index);
                    const element = contentParagraphRefs.current[index];
                    gsap.to(element, { autoAlpha: 1, duration: 1 });
                },
                // onLeave: () => {
                //   const element = contentParagraphRefs.current[index];
                //   gsap.fromTo(element, { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, delay: 0.25 }); 
                // },
                // onEnterBack: () => {
                //   const element = contentParagraphRefs.current[index];
                //   gsap.fromTo(element, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, delay: 0.25 }); 
                // },
                // onLeaveBack: () => {
                //   const element = contentParagraphRefs.current[index];
                //   gsap.fromTo(element, { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, delay: 0.25 }); 
                // }
            });
        });

        // Image sequence animation
        const images = [];
        const isMobile = window.innerWidth <= 900;
        // const imagePath = isMobile ? '/mobile' : '/mobile';
        const imagePath = '/mobile';

        for (let i = 1; i <= 121; i++) {
            const img = new Image();
            img.src = `https://dng-com.s3.amazonaws.com/clients/hndsup/images/panels/product/sequence${imagePath}/hndsup_${i}.jpg`;
            images.push(img);
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const frameCount = images.length;

        const render = (index) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
        };

        const resizeCanvas = () => {
          const aspectRatio = isMobile ? 800 / 1080 : 800 / 1080; // Replace with your canvas aspect ratio
            const containerWidth = canvas.parentElement.offsetWidth;
            const containerHeight = canvas.parentElement.offsetHeight;

            if (isMobile) {
                canvas.height = containerHeight;
                canvas.width = canvas.height * aspectRatio;
            } else {
                if (containerWidth / containerHeight > aspectRatio) {
                    canvas.width = containerHeight * aspectRatio;
                    canvas.height = containerHeight;
                } else {
                    canvas.width = containerWidth;
                    canvas.height = containerWidth / aspectRatio;
                }
            }

             // Render the first frame after resizing
            render(0);
            ScrollTrigger.refresh();
            
            // console.log('resize');
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Initial resize

        const imageSequence = gsap.timeline({
            scrollTrigger: {
                trigger: canvas,
                start: window.innerWidth <= 900 ? "top-=150% top" : "top-=100% top",
                end: "bottom+=20% top", // Adjust the duration as needed
                scrub: true,
                pin: true,
                markers: false,
                anticipatePin: 1,
                onUpdate: self => {
                    const progress = self.progress.toFixed(2);
                    const frameIndex = Math.floor(progress * (frameCount - 1));
                    render(frameIndex);
                }
            }
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
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
        <div className={productStyles.scrollWrapper} ref={productRef}>
            <section className={productStyles.productContainer}>
                <div className={productStyles.productSlideContainer} ref={wrapper}>
                    {Data[0].productPanels.map((item, index) => {
                        return (
                            <div className={productStyles.productSlide} key={index} ref={addPanel} id={item.id}>
                                {index === 0 ? (
                                    <div className={productStyles.productSlideContent}>
                                        <canvas ref={canvasRef} className={productStyles.imageSequence}></canvas>
                                        <div ref={addContentParagraph} className={productStyles.productTitle} dangerouslySetInnerHTML={{ __html: item.content.titleCopy[0] }}></div>
                                    </div>
                                ) : (
                                    <div className={`${item.title === true ? productStyles.productSlideContent : productStyles.productSlideContentRow}`}>
                                        <video
                                            src={item.content.heroVideo[0]}
                                            width="960"
                                            height="1080"
                                            loop
                                            autoPlay
                                            playsInline
                                            muted
                                            className={`${item.title === true ? productStyles.productImage100 : productStyles.productImage50}`}
                                        ></video>
                                        <div ref={addContentParagraph} dangerouslySetInnerHTML={{ __html: item.content.contentParagraph[0] }} className={productStyles.contentParagraph}></div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </section>
            <ScrollNav active={section} windowsize={windowsize} wrapsize={wrap} ref={productNav} markers={ids} scrolltype={"product"} />
        </div>
    );
}