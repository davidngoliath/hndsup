import React, { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import statsStyles from "../styles/components/statisticsslider.module.css";
import "../globals.css";
import ScrollNav from './ScrollNav';
import { Data } from "../data.js";
import Image from 'next/image';

export default function StatisticsSlider({ statsRef }) {
    const panel = useRef([]);
    const contentParagraphRefs = useRef([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const ids = Data[0].statsPanels.map((item, index) => item.id);

    const handlePrevSlide = () => {
        const newSlide = currentSlide === 0 ? panel.current.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
        gsap.to(panel.current, { xPercent: -100 * newSlide, duration: 1, ease: 'power2.inOut' });
    };

    const handleNextSlide = () => {
        const newSlide = currentSlide === panel.current.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
        gsap.to(panel.current, { xPercent: -100 * newSlide, duration: 1, ease: 'power2.inOut' });
    };

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

    useEffect(() => {
        const handleResize = () => {
            // Reset the slides to the initial position
            setCurrentSlide(0);
            gsap.set(panel.current, { xPercent: 0 });
            // Refresh GSAP animations
            gsap.to(panel.current, { xPercent: 0, duration: 0 });
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={statsStyles.scrollWrapper} ref={statsRef}>
            <section className={statsStyles.statsContainer}>
                <div className={statsStyles.statsSlideContainer}>
                    {Data[0].statsPanels.map((item, index) => {
                        return (
                            <div
                                className={statsStyles.statsSlide}
                                key={index}
                                ref={addPanel}
                                id={item.id}
                                style={{ transform: `translateX(${100 * index}%)` }}
                            >
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
                <button onClick={handlePrevSlide} className={`${statsStyles.navButton} ${statsStyles.navButtonLeft}`}></button>
                <button onClick={handleNextSlide} className={`${statsStyles.navButton} ${statsStyles.navButtonRight}`}></button>
            </section>
            <ScrollNav active={currentSlide} markers={ids} scrolltype={"stats"} />
        </div>
    );
}