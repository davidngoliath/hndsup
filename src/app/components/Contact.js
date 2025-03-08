"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/components/contact.module.css';
import "../globals.css";
import Image from 'next/image';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('Your Local Police Department');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [showMessageContainer, setShowMessageContainer] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const messageContainerRef = useRef(null);
  const clippy = useRef(null);

  const prewrittenLetter = `
    <p>Dear <span>${recipient}</span>,</p>
    <br>
    <p>In the United States, only 20% of killings by police are captured on body cameras. In 92% of cases, when footage is available, it is used to prosecute civilians. Will these incidents continue to go unwitnessed, with cameras going dark and your office remaining silent?</p>
    <br>
    <p>Will police brutality cases be left for the victims to solve? Will we have to protect ourselves from those whose job it is to protect us?</p>
    <br>
    <p>Courageous Conversation Global Foundation reluctantly presents to you: HndsUp.com—a first-of-its-kind civilian wearable camera that records police encounters. It is motion- and speech-activated, designed for the safety of both civilians and officers. It detects racial profiling from 100 feet away and uploads footage in real time to local news stations, so everyone can be an eyewitness.</p>
    <br>
    <p>So, really, Chief of Police of New York, has it come to this?</p>
    <br>
    <p>We urge you to take action. Schedule your training with Courageous Conversation today so we can train officers in your community. Someday, this technology may be able to capture everything. For now, let’s start by preventing it.</p>
    <br>
    <p>Only education and conversation can stop it from ever starting. Take action today, and set the standard for a safer, more just tomorrow.</p>
    <br>
    <p>Sincerely,<br>${name}</p>
  `;

  useEffect(() => {
    setMessage(prewrittenLetter);
  }, [name, recipient]);

  useEffect(() => {
    // if (showMessageContainer && window.innerWidth <= 800 && messageContainerRef.current) {
    //   clippy.current.scrollIntoView({ behavior: 'smooth' });
    // }
    clippy.current.scrollIntoView({ behavior: 'smooth', block: "end" });
  }, [showMessageContainer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (zipcode.length === 5) {
      setLoading(true);
      setShowLoadingScreen(true);
      setRecipient('Locating...');
      try {
        const response = await fetch(`/api/getpolicedepartment?zipcode=${zipcode}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipient(data.policeDepartment);
        setShowMessageContainer(true);
        setFormSubmitted(true);
      } catch (error) {
        setError('Failed to fetch police department');
        console.error('Error fetching police department:', error);
      } finally {
        setLoading(false);
        setShowLoadingScreen(false);
        setShowMessageContainer(true);
      }
    }
  };


  const handleCopyToClipboard = () => {
    const textToCopy = messageContainerRef.current.innerHTML.replace(/<br\s*\/?>/gi, '\n');
    const tempElement = document.createElement('div');
    tempElement.innerHTML = textToCopy;
    const plainText = tempElement.innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(plainText).then(() => {
        alert('Letter copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback method for older browsers and mobile devices
      const textarea = document.createElement('textarea');
      textarea.value = plainText;
      textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        alert('Letter copied to clipboard!');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textarea);
    }
  };

  const handleFormClear = (e) => {
    e.preventDefault();
    // Reset form fields
    setName('');
    setEmail('');
    setZipcode('');
    setMessage('');
    setRecipient('Your Local Police Department');
    // Hide step 2 and show step 1
    setFormSubmitted(false);
    setShowMessageContainer(false);
    
  };

  return (
    <div className={styles.contactContainer}>
      {showLoadingScreen && (
        <div className={styles.loadingScreen}>
          <h2>LOCATING LOCAL LAW ENFORCEMENT...</h2>
        </div>
      )}
      
      <form ref={clippy} onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.headlineContainer}>
        {!formSubmitted && <h1>WRITE A LETTER TO <span>your</span> LOCAL LAW ENFORCEMENT</h1> }
        </div>
        <div className={styles.stepsContainer}>
            {!formSubmitted && (
            <div className={styles.stepOne}>
              <h5>STEP 1/2:</h5><br></br><h5>ENTER YOUR INFO TO CREATE A PREWRITTEN LETTER.</h5>
            </div>
            )}
            {formSubmitted && (
            <div className={styles.stepTwo}>
              <h5>STEP 2/2:</h5><br></br><h5>COPY LETTER BELOW AND EMAIL TO YOUR LOCAL LAW ENFORCEMENT.</h5>
              <div className={styles.copyClipboardContainer}>
                <Image src="/images/copy.svg" alt="copy to clipboard" width={21} height={23} />
                <button onClick={handleCopyToClipboard} className={styles.copyButton}>COPY TO CLIPBOARD</button>
              </div>
            </div>
            )}
        </div>
        <div className={styles.inputContainer}>
        {!formSubmitted && (
          <div className={styles.userContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="name">NAME</label>
              <input
                className={styles.input}
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="zipcode">ZIP CODE</label>
              <input
                className={styles.input}
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">EMAIL</label>
              <input
                className={styles.input}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>GENERATE LETTER</button>
          </div>
        )}
          {showMessageContainer && (
            <div className={styles.messageContainer} ref={messageContainerRef}>
              <div className={styles.formGroup}>
                {/* <label htmlFor="message">SAMPLE LETTER</label> */}
                <div
                  id="message"
                  className={styles.textarea}
                  dangerouslySetInnerHTML={{ __html: message }}
                ></div>
              </div>
              <button onClick={handleCopyToClipboard} className={styles.copyButtonBtm}>COPY TO CLIPBOARD</button>
              
                <button onClick={handleFormClear} className={styles.backButton}>
                  <Image src="/images/arrowback.svg" alt="back" width={12} height={13} />
                  BACK
                </button>
              
            </div>
          )}
        </div>
      </form>
    
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}