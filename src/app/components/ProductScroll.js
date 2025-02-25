"use client"
import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import productStyles from "../styles/components/productscroll.module.css";
import "../globals.css";
import ScrollNav from "./ScrollNav";
import { Data } from "../data.js";
import useIsomorphicLayoutEffect from '../helpers/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ProductScroll({ productRef }) {
    const productNav = useRef();
    const panel = useRef([]);
    const wrapper = useRef();
    const canvasRef = useRef();
    const contentParagraphRefs = useRef([]);
    const productTitleRefs = useRef([]);
    const [section, setSection] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const [wrap, setWrap] = useState(null);
    const [windowsize, setWindowsize] = useState(null);
    const ids = Data[0].productPanels.map((item, index) => item.id);

    const handleNavToggle = useCallback((e) => {
        setSection(e);
    }, [setSection]);

    const handleAnimation = useCallback((index) => {
        const element = contentParagraphRefs.current[index];
        gsap.fromTo(element, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 });
    }, []);

    useLayoutEffect(() => {
        setWindowsize(window.innerWidth);
    }, []);

    const handleNavClick = useCallback((e) => {
        setSection(e);
        setWrap(wrapper.current.offsetWidth);
        setWindowsize(window.innerWidth);
        const getId = Data[0].productPanels[e].id;

        gsap.to(window, {
            scrollTo: (document.getElementById(getId).offsetLeft * (wrap / (wrap - windowsize))),
            duration: 2
        });
    });

    useEffect(() => {
        let timeout;

        const handleResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setSection(0);
                handleNavClick(0);
                ScrollTrigger.refresh();
            }, 250); // Wait 250ms after resize before refreshing
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeout);
        };
    }, []);

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
                end: '+=' + el.offsetWidth * (totalScroll / (el.offsetWidth * (panel.current.length - 1))),
                toggleClass: { targets: el, className: "setActive" },
                onToggle: self => self.isActive && handleNavToggle(index),
                onEnter: self => handleAnimation(index),
            });
        });

        // Image sequence animation
        const images = [];
        for (let i = 1; i <= 60; i++) {
            const img = new Image();
            img.src = `https://dng-com.s3.amazonaws.com/clients/hndsup/images/panels/product/sequence/hndsup_${i}.jpg`;
            images.push(img);
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const frameCount = images.length;

        const render = (index) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
        };

        const imageSequence = gsap.timeline({
            scrollTrigger: {
                trigger: canvas,
                start: "top top",
                end: "bottom-=20% top", // Adjust the duration as needed
                scrub: true,
                pin: true,
                anticipatePin: 1,
                onUpdate: self => {
                    const progress = self.progress.toFixed(2);
                    const frameIndex = Math.floor(progress * (frameCount - 1));
                    render(frameIndex);
                }
            }
        });

        // Fade-in animations for productTitle
        productTitleRefs.current.forEach((element) => {
            gsap.fromTo(element, { autoAlpha: 0 }, {
                autoAlpha: 1,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: true,
                    // markers: true
                }
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

    const addProductTitle = useCallback((el) => {
        if (el && !productTitleRefs.current.includes(el)) {
            productTitleRefs.current.push(el);
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
                                    <>
                                    <canvas ref={canvasRef} width={1512} height={1800} className={productStyles.imageSequence}></canvas>
                                    <div ref={addProductTitle} className={productStyles.productTitle} dangerouslySetInnerHTML={{ __html: item.content.titleCopy[0] }}></div>
                                    </>
                                ) : (
                                    <div className={`${item.title === true ? productStyles.productSlideContent : productStyles.productSlideContentRow}`}>
                                        <video
                                            src={item.content.heroVideo[0]}
                                            width="960"
                                            height="1080"
                                            loop
                                            autoPlay
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