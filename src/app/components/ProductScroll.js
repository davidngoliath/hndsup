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
    const [wrap, setWrap] = useState(null);
    const [windowsize, setWindowsize] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const ids = Data[0].productPanels.map((item, index) => item.id);

    const lastTriggeredIndex = useRef(null); // Track the last triggered index


    const handleNavToggle = useCallback(
        (index) => {

            // Prevent triggering the same event twice
            if (lastTriggeredIndex.current === index) {
                return;
            }

            // Update the last triggered index
            lastTriggeredIndex.current = index;
            // Map panel indices to labels
            const panelLabels = [
                "slide 0 - Intro Animation",
                "slide 1 - wrist-positioned for safety",
                "slide 2 - clear identification",
                "slide 3 - real-time uploads",
                "slide 4 - emergency medical alerts",
            ];
    
            const panelEvents = [
                "view_product_slide_0",
                "view_product_slide_1",
                "view_product_slide_2",
                "view_product_slide_3",
                "view_product_slide_4",
            ];

            // Get the label for the current index
            const label = panelLabels[index] || "Unknown Panel";
            const event = panelEvents[index] || "Unknown Event";
            // Push event to GTM's dataLayer
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: event,
                category: "Section View",
                label: label,
                value: index + 1, // Optional: Numeric value for the panel index
            });
    
            // Update the section state
            setSection(index);
        },
        [setSection]
    );

    const handleButtonClick = (marker) => {
        // Scroll to the corresponding panel
        // console.log('scroll to panel', marker);
        gsap.to(window, {
            scrollTo:  ( document.getElementById(marker).offsetLeft * (wrap / (wrap - windowsize)) ),
            duration: 2
        })
    };


    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowsize(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [windowsize]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
            const isMobile = window.innerWidth <= 900;
            const totalScroll = wrapper.current.scrollWidth - window.innerWidth;

            // Ensure enough space is left after pinning
            // const ctx = gsap.context(() => {
                document.getElementById("horizontal-spacer").style.height = `${totalScroll}px`;
                setWrap(totalScroll);

                gsap.to(panel.current, {
                    xPercent: -100 * (panel.current.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: wrapper.current,
                        pin: true,
                        pinSpacing: false,
                        start: "top top",
                        scrub: 1,
                        snap: {
                            snapTo: 1 / (panel.current.length - 1),
                            // duration: 0.5,
                            // ease: "none",
                            // delay: 0,
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
                        }
                    });
                });
            // }, wrapper.current);

            const handleResize = () => {
                ScrollTrigger.refresh();
            };

            // Add resize listener only for desktop
            if (!isMobile) {
                window.addEventListener('resize', handleResize);
            }

            return () => {
                // ctx.revert();
                window.removeEventListener('resize', handleResize);
                ScrollTrigger.refresh();
            };
        }
    }, [windowsize]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Image sequence animation
            const images = [];
            const isMobile = window.innerWidth <= 900;
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
            };

            // Add resize listener only for desktop
            if (!isMobile) {
                window.addEventListener('resize', resizeCanvas);
            }

            resizeCanvas(); // Initial resize

            const imageSequence = gsap.timeline({
                scrollTrigger: {
                    trigger: canvas,
                    start: window.innerWidth <= 900 ? "top-=150% top" : "top-=100% top",
                    end: "bottom top", // Adjust the duration as needed
                    scrub: true,
                    pin: true,
                    markers: false,
                    anticipatePin: 1,
                    pinSpacing: false,
                    onUpdate: self => {
                        const progress = self.progress.toFixed(2);
                        const frameIndex = Math.floor(progress * (frameCount - 1));
                        render(frameIndex);
                    }
                }
            });
        

            return () => {
                window.removeEventListener('resize', resizeCanvas);
                imageSequence.kill();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        }
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
            <ScrollNav click={handleButtonClick} active={section} windowsize={windowsize} wrapsize={wrap} ref={productNav} markers={ids} scrolltype={"product"} />
        </div>
    );
}