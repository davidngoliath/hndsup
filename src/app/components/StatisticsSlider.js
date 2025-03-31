import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import statsStyles from "../styles/components/statisticsslider.module.css";
import "../globals.css";

import ScrollNav from './ScrollNav';
import { Data } from "../data.js";
import Image from 'next/image';


export default function StatisticsSlider({ statsRef }) {
    const swiperRef = useRef(null);
    const contentParagraphRefs = useRef([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const ids = Data[0].statsPanels.map((item, index) => item.id);
    
    // Map slide indices to labels
    const slideLabels = [
        "Slide 1 - Police Stop Fatality Stats",
        "Slide 2 - Racial Disparity Stats",
        "Slide 3 - Police Encounter Injury Stats",
    ];

    const slideEvents = [
        "click_nav_statistics_slide_1",
        "click_nav_statistics_slide_2",
        "click_nav_statistics_slide_3",
    ];

    const handleSlideChange = (swiper) => {
        const newIndex = swiper.realIndex;

        // Update the current slide state
        setCurrentSlide(newIndex);

        // Get the label for the current slide
        const label = slideLabels[newIndex] || "Unknown Slide";
        const event = slideEvents[newIndex] || "Unknown Event";
        // Push event to GTM's dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: event,
            category: "Button Click",
            label: label,
            value: newIndex + 1, // Optional: Numeric value for the slide index
        });
    };

    const handlePrevSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleNextSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const addContentParagraph = useCallback((el) => {
        if (el && !contentParagraphRefs.current.includes(el)) {
            contentParagraphRefs.current.push(el);
        }
    }, []);

    // useEffect(() => {
    //     const handleResize = () => {
    //         console.log('resize');
    //         // Reset the slides to the initial position
    //         setCurrentSlide(0);
    //         panel.current.forEach(el => {
    //             el.style.transform = ''; // Clear the inline transform style
    //         });
    //         panel.current.forEach((el, index) => {
    //             gsap.set(el, { xPercent: 100 * index });
    //         });
    //         ScrollTrigger.refresh();
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    // useEffect(() => {
    //     // Initial setup of the slides
    //     panel.current.forEach((el, index) => {
    //         gsap.set(el, { xPercent: 100 * index });
    //     });
    // }, []);

    return (
        <div className={statsStyles.scrollWrapper} ref={statsRef}>
            <section className={statsStyles.statsContainer}>
                <Swiper
                    className={`${statsStyles.statsSlideContainer} mySwiper`}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={handleSlideChange} // Use the updated callback
                    modules={[Navigation]}
                    navigation={{
                        prevEl: `.${statsStyles.navButtonLeft}`,
                        nextEl: `.${statsStyles.navButtonRight}`,
                    }}
                    speed={800}
                    effect="slide"
                    loop={true}
                >
                    {Data[0].statsPanels.map((item, index) => {
                        return (
                            <SwiperSlide className={statsStyles.statsSlide} key={index} id={item.id}>
                                <div className={statsStyles.statsSlideContent}>
                                    <div
                                        className={statsStyles.statsImage100}
                                        style={{
                                            backgroundImage: `url(${item.content.heroVideo[0]})`
                                        }}
                                    ></div>
                                    <div ref={addContentParagraph} dangerouslySetInnerHTML={{ __html: item.content.contentParagraph[0] }} className={statsStyles.contentParagraph}></div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <button onClick={handlePrevSlide} className={`${statsStyles.navButton} ${statsStyles.navButtonLeft}`}></button>
                <button onClick={handleNextSlide} className={`${statsStyles.navButton} ${statsStyles.navButtonRight}`}></button>
            </section>
            <ScrollNav active={currentSlide} markers={ids} scrolltype={"stats"} />
        </div>
    );
}