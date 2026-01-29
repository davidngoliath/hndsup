"use client"
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import styles from "./styles/page.module.css";
import "./globals.css";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductScroll from "./components/ProductScroll";
import StatisticsScroll from "./components/StatisticsScroll";
import StatisticsSlider from "./components/StatisticsSlider";
import TakeAction from "./components/TakeAction";
import { ModalContext } from "./contexts/ModalContext";
import Modal from "./components/Modal";
import LoginScreen from "./components/LoginScreen";
import Nav from "./components/Nav";
import { Data } from "./data.js";
import { getAssetPath } from "./config";
import LoadingScreen from "./components/LoadingScreen";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Home() {
  const { state, setState, handleModal, video, setVideo  } = useContext(ModalContext);
  const videoDiv = useRef();
  const productDiv = useRef();
  const statsDiv = useRef();
  const actionDiv = useRef();
  const mainDiv = useRef();
  const fist = useRef();
  const fistMobile = useRef();
  const statValue1 = useRef();
  const statValue2 = useRef();
  const statValue3 = useRef();
  const statValue4 = useRef();
  const statContainer1 = useRef();
  const statContainer2 = useRef();
  const statContainer3 = useRef();
  const statContainer4 = useRef();
  const resultsQuotesContainer = useRef();
  const problemTextContainerRef = useRef();
  const resultsTextRef = useRef();
  const resultsImageRef = useRef();
  const resultsContentRef = useRef();
  const resultsContainerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);
  const vimeoId = Data[0].videoId;

  const scrollToSection = (ref) => {
  // Object mapping refs to labels
  const refLabels = new Map([
    [videoDiv, "Video/Hero Section"],
    [productDiv, "Product Section"],
    [statsDiv, "Statistics Section"],
    [actionDiv, "Take Action Section"],
  ]);

  const refEvents = new Map([
    [videoDiv, "click_nav_hero_section"],
    [productDiv, "click_nav_product_section"],
    [statsDiv, "click_nav_statistics_section"],
    [actionDiv, "click_nav_take_action"],
  ]);


  // Scroll to the section
  ref.current.scrollIntoView({ behavior: "smooth" });

  // Get the label for the ref
  const label = refLabels.get(ref) || "Unknown Section";
  const event = refEvents.get(ref) || "Unknown Event";
  // Push event to GTM's dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: event,
    category: "User Interaction",
    label: label,
    value: 1,
  });
  };

  const [isSocialBrowser, setIsSocialBrowser] = useState(false);

  useEffect(() => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      setIsSocialBrowser(/FBAN|FBAV|Instagram/.test(userAgent));
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth <= 500;

      if (!hasScrolledToTop) {
          if (isMobile){
            setTimeout(() => {
              gsap.to(window, {
                scrollTo:  (0),
                duration: 2,
                ease: "power3.inOut",
              })
            }, 1500);
          } else {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "instant"    
            })
          }

          setHasScrolledToTop(true);
      }
  }, [hasScrolledToTop]);

  // Results section viewport-triggered animations
  useEffect(() => {
    if (!loading && resultsContentRef.current && resultsTextRef.current && resultsImageRef.current && 
        statValue1.current && statValue2.current && statValue3.current && statValue4.current && 
        statContainer1.current && statContainer2.current && statContainer3.current && statContainer4.current &&
        resultsQuotesContainer.current) {
      
      const animateCounter = (element, endValue) => {
        const obj = { value: 0 };
        gsap.to(obj, {
          value: endValue,
          duration: 1.5,
          ease: "power1.out",
          onUpdate: () => {
            const formatted = Math.floor(obj.value).toLocaleString('en-US');
            element.textContent = formatted;
          }
        });
      };

      const statContainers = [statContainer1.current, statContainer2.current, statContainer3.current, statContainer4.current];
      const statValues = [
        { value: statValue1.current, end: 1173 },
        { value: statValue2.current, end: 340 },
        { value: statValue3.current, end: 164 },
        { value: statValue4.current, end: 410 }
      ];

      // Set initial state to hidden to prevent flash of content
      gsap.set(resultsTextRef.current, { opacity: 0, y: 30 });
      gsap.set(statContainers, { opacity: 0, y: 20 });
      gsap.set(resultsQuotesContainer.current.querySelectorAll('img'), { autoAlpha: 0, y: 30 });

      // Create a timeline that chains all animations with delays
      ScrollTrigger.create({
        trigger: resultsTextRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          
          // 1. Fade in resultsText with 1 second delay
          tl.fromTo(resultsTextRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.inOut',
              delay: 0.25
            }
          );

          // 2. Animate stat containers 1 second after resultsText completes
          tl.fromTo(statContainers,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.inOut',
              onStart: () => {
                statValues.forEach(stat => animateCounter(stat.value, stat.end));
              }
            },
            "+=0.5"
          );

          // 3. Animate resultsQuotesContainer 1 second after statContainers completes
          tl.fromTo(resultsQuotesContainer.current.querySelectorAll('img'),
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.inOut"
            },
            "+=0.5"
          );
        }
      });
    }
  }, [loading]);

  // Fade-in for problem text container
  useEffect(() => {
    if (!loading && problemTextContainerRef.current) {
      gsap.fromTo(
        problemTextContainerRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: problemTextContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Cleanup
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }
  }, [loading]);


  // login then load
  // const handleHomeFadeIn = () => {
  //   // console.log("handleHomeFadeIn");
  //   setLoading(false);
      
  //   const tl = gsap.timeline();
  //   tl.to(mainDiv.current, { autoAlpha: 1, duration: 1 })
  //     .fromTo(fist.current, { autoAlpha: 0 }, { autoAlpha: 1, ease: "power3.out", duration: 2 }, 0)
  // }


  // const handleLoad = () => {
  //   // Set a timeout to hide the loading screen after 5 seconds
  //   const timeout = setTimeout(handleHomeFadeIn, 5000);
  //   return () => clearTimeout(timeout);
  // };

  
  // Wait for all images to load - no login
  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
      
      const tl = gsap.timeline();
      tl.to(mainDiv.current, { autoAlpha: 1, duration: 1 })
        .fromTo(fist.current, { autoAlpha: 0 }, { autoAlpha: 1, ease: "power3.out", duration: 2 }, 0)
        
    };

    // Set a timeout to hide the loading screen after 5 seconds
    const timeout = setTimeout(handleLoad, 5000);

    // Wait for all images to load
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    
    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            clearTimeout(timeout); // Clear the timeout if all images load before 5 seconds
            handleLoad();
          }
        });
        img.addEventListener('error', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            clearTimeout(timeout); // Clear the timeout if all images load before 5 seconds
            handleLoad();
          }
        });
      }
    });

    if (loadedImages === images.length) {
      clearTimeout(timeout); // Clear the timeout if all images load before 5 seconds
      handleLoad();
    }

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      {/* <Nav scrollToSection={scrollToSection} videoRef={videoDiv} productRef={productDiv} statsRef={statsDiv} actionRef={actionDiv} /> */}
      <main ref={mainDiv} className={styles.main}>
        <section className={styles.heroContainer} ref={videoDiv}>
          <div className={styles.heroContent}>
            <div className={styles.titleContainer}>
              <h3>COURAGEOUS CONVERSATION<sup>®</sup></h3><h3>GLOBAL FOUNDATION</h3>
              <span>presents</span>
              <img src={getAssetPath('/images/hndsup_logo.svg')} alt="hndsup" width="319" height="209" className={styles.hndsup}/>


              {/* <div className={styles.fistContainerMobile}>
                <video src={getAssetPath('/images/fistheader.mp4')} ref={fistMobile} width="531" height="758" loop autoPlay playsInline muted 
                className={styles.fistImageMobile} >
                </video>
              </div> */}

              <div className={styles.fistContainerMobile}>
                  {isSocialBrowser ? (
                      <img
                          src={getAssetPath('/images/fistheader.jpg')}
                          alt="Fallback Image"
                          className={styles.fistImageMobile}
                      />
                  ) : (
                      <video
                          src={getAssetPath('/images/fistheader.mp4')}
                          ref={fistMobile}
                          width="531"
                          height="758"
                          loop
                          autoPlay
                          playsInline
                          muted
                          className={styles.fistImageMobile}
                      ></video>
                  )}
              </div>


              <h4 className={styles.titleSubline}>FIRST-OF-ITS-KIND CIVILIAN-WEARABLE CAMERA THAT RECORDS POLICE ENCOUNTERS.</h4>
              
              <div className={styles.heroButtonContainer}>
                <button className={styles.heroVideo} onClick={(e) => {
                        window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: "click_watch_video",
                      category: "Button Click",
                      label: "homepage_watch_video_button",
                      value: 1,
                    });
                    
                    setVideo(vimeoId,handleModal())

                  }} 
                >
                  <div className={styles.playGraphic}>
                    <span></span>
                  </div>
                  <div className={styles.videoText}>
                    <span>WATCH VIDEO</span>
                  </div>
                </button>
                <a href="https://ccglobalfoundation.org/donate/" className={styles.heroDonate} target="_blank" rel="noreferrer" aria-label="Donate"
                    onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            event: "click_hero_donate",
                            category: "Button Click",
                            label: "hero_donate_button",
                            value: 1,
                        });
                    }}
                
                >
                  <span>DONATE</span>
                </a>

              </div>
            </div>
            <div className={styles.fistContainer}>
              <video src={getAssetPath('/images/fistheader.mp4')} ref={fist} width="1062" height="1516" loop autoPlay playsInline muted 
              className={styles.fistImage} >
              </video>
            </div>
          </div>
        </section>
        <div className={styles.problemContainer}>
          {isSocialBrowser ? (
            <div className={styles.problemVideo} style={{ backgroundColor: '#000' }}></div>
          ) : (
            <video src={getAssetPath('/images/problem_video_1.mp4')} width="1920" height="1080" loop autoPlay playsInline muted 
              className={styles.problemVideo} >
            </video>
          )}
          <div className={styles.problemTextContainer} ref={problemTextContainerRef}>
            <h1 className={styles.problemText}>problem</h1>
            <p className={styles.problemSubtext}>
              With police killings reaching an alarming record of 326 fatalities in 2024 and with only 20% of fatal <br className={styles.breakVisible}/>police-civilian encounters being captured by police body cameras, there's an urgent need for transparency and accountability.
            </p>
          </div>
        </div>
        <TakeAction actionRef={actionDiv}/>
        <ProductScroll productRef={productDiv} hasScrolledToTop={hasScrolledToTop}/>
        <div id="horizontal-spacer" style={{ height: "100vh" }}></div>
        <div className={styles.screensContainer}>
          <p className={styles.screensText}>A series of short social videos teased the HndsUp innovation, building curiosity and momentum before the reveal.</p>
          <video src={getAssetPath('/images/screens.mp4')} loop autoPlay playsInline muted 
            className={styles.screensVideo} >
          </video>
          <h1 className={styles.twistText}>the twist</h1>
          <p className={styles.twistSubtext}>
            We surprised people by not actually launching HndsUp. Because technology is not the answer. Education is. 
          </p>
          <p className={styles.twistSubtext}>
            Instead, we invited them to support Courageous Conversation, an organization dedicated to equity and de-escalation training. Because while technology can record what happens, only education and conversation can prevent it from happening in the first place.
          </p>

        </div>
        <div className={styles.resultsContainer} ref={resultsContainerRef}>
            <div className={styles.resultsContent} ref={resultsContentRef}>
              <div className={styles.resultsText} ref={resultsTextRef}>
                <h1>results</h1>
                <p>
                  Despite $0 media budget, Courageous Conversation received a 1,173% increase in donations since the campaign launched.
                </p>
                <p>
                  The campaign spread quickly through culture. It was shared by voices in hip-hop like Doug E. Fresh and organically amplified within the Divine Nine, one of the most influential cultural networks in the US. Its significance is underscored by the fact that the Divine Nine includes members such as Kamala Harris and Alicia Keys, highlighting the level of cultural relevance and reach the campaign achieved.
                </p>
              </div>
              <img src={getAssetPath('/images/results/results_fist.png')} alt="results" width="853" height="1537" className={styles.resultsImage} ref={resultsImageRef}/>
              <div className={styles.resultsStats}>
                    <div className={styles.stat} ref={statContainer1}>
                      <h1 className={styles.statValue}><span ref={statValue1}></span><span>%</span></h1><h3>INCREASE<br/>IN DONATIONS</h3>
                    </div>
                    <div className={styles.stat} ref={statContainer2}>
                      <h1 className={styles.statValue}><span ref={statValue2}></span><span>%</span></h1><h3>INCREASE IN<br/>SOCIAL MEDIA IMPRESSIONS</h3>
                    </div>
                    <div className={styles.stat} ref={statContainer3}>
                      <h1 className={styles.statValue}><span ref={statValue3}></span><span>%</span></h1><h3>INCREASE IN SOCIAL MEDIA<br className={styles.breakVisible}/>ENGAGEMENT</h3>
                    </div>
                    <div className={styles.stat} ref={statContainer4}>
                      <h1 className={styles.statValue}><span ref={statValue4}></span><span>M+</span></h1><h3>TOTAL EARNED<br/>PR IMPRESSIONS</h3>
                    </div>
              </div>
            </div>
            <div className={styles.resultsQuotesContainer} ref={resultsQuotesContainer}>
                <img src={getAssetPath('/images/results/result1.png')} alt="results quotes" width="400" height="173" className={styles.resultsQuote}/>
                <img src={getAssetPath('/images/results/result2.png')} alt="results quotes" width="400" height="173" className={styles.resultsQuote}/>
                <img src={getAssetPath('/images/results/result3.png')} alt="results quotes" width="400" height="173" className={styles.resultsQuote}/>
                <img src={getAssetPath('/images/results/result4.png')} alt="results quotes" width="400" height="173" className={styles.resultsQuote}/>
                <img src={getAssetPath('/images/results/result5.png')} alt="results quotes" width="400" height="173" className={styles.resultsQuote}/>
                <img src={getAssetPath('/images/results/result6.png')} alt="results quotes" width="400" height="173" className={styles.resultsQuote}/>
                <img src={getAssetPath('/images/results/result7.png')} alt="results quotes" width="400" height="173" className={styles.resultsQuote}/>
                <img src={getAssetPath('/images/results/result8.png')} alt="results quotes" width="400" height="173" className={styles.resultsQuote}/>

            </div>
        </div>
        {/* <StatisticsSlider statsRef={statsDiv}/> */}
        {/* <StatisticsScroll statsRef={statsDiv}/>
        <div id="horizontal-spacer2" style={{ height: "100vh" }}></div> */}
        
        {/* <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerText}>
              <p><span className={styles.copyright}>{'\u00A9'}</span>2025 HNDSUP ALL RIGHTS RESERVED</p>
            </div>
            <div className={styles.footerLogoContainer}>
              <a href="https://www.facebook.com/OfficialCourageousConversation" target="_blank" rel="noreferrer" aria-label="Facebook"
                onClick={() => {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                    event: "click_social_facebook",
                    category: "Button Click",
                    label: "footer_social_icon_facebook",
                    value: 1,
                  });
                }}
              >
                <img src={getAssetPath('/images/facebook.svg')} alt="facebook" width="23" height="23" className={styles.footerLogos}/>
              </a>
              <a href="https://www.instagram.com/ccaboutrace/" target="_blank" rel="noreferrer" aria-label="Instagram"
                onClick={() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "click_social_instagram",
                    category: "Button Click",
                    label: "footer_social_icon_instagram",
                    value: 1,
                  });
                }}
              >
                <img src={getAssetPath('/images/instagram.svg')} alt="instagram" width="23" height="23" className={styles.footerLogos}/>  
              </a>
              <a href="https://x.com/CCAboutRace" target="_blank" rel="noreferrer" aria-label="X"
                      onClick={() => {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                          event: "click_social_x",
                          category: "Button Click",
                          label: "footer_social_icon_x",
                          value: 1,
                        });
                      }}
              >
                <img src={getAssetPath('/images/twitter.svg')} alt="twitter" width="23" height="23" className={styles.footerLogos}/>
              </a>
              <a href="https://www.linkedin.com/company/courageous-conversation-official/" target="_blank" rel="noreferrer" aria-label="Youtube"
                onClick={() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "click_social_linkedin",
                    category: "Button Click",
                    label: "footer_social_icon_linkedin",
                    value: 1,
                  });
                }}
              >
                <img src={getAssetPath('/images/linkedin.svg')} alt="linkedin" width="23" height="23" className={styles.footerLogos}/>
              </a>
            </div>
          </div>
        </footer> */}
      </main>
      
      <Modal/>
      {/* <LoginScreen setLoading={setLoading} handleLoad={handleLoad}/> */}
    </>
  );
}
