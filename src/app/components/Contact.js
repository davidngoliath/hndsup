"use client"
import React, { useState, useEffect } from 'react';
import styles from '../styles/components/contact.module.css';
import "../globals.css";

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('Your Local Police Department');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const prewrittenLetter = `
    <p>Dear ${recipient},</p>
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

  const handleZipcodeChange = async (e) => {
    const zipcode = e.target.value;
    setZipcode(zipcode);

    if (zipcode.length === 5) {
      setLoading(true);
      setRecipient('Locating...');
      try {
        const response = await fetch(`/api/getpolicedepartment?zipcode=${zipcode}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecipient(data.policeDepartment);
      } catch (error) {
        setError('Failed to fetch police department');
        console.error('Error fetching police department:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message, recipient });
    // Reset form fields
    setName('');
    setEmail('');
    setZipcode('');
    setMessage('');
    setRecipient('Your Local Police Department');
  };

  return (
    <div className={styles.contactContainer}>
      <h1>WRITE A LETTER TO <span>your</span> LOCAL LAW ENFORCEMENT</h1>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
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
            <label htmlFor="zipcode">ZIPCODE</label>
            <input
              className={styles.input}
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={handleZipcodeChange}
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
          <button type="submit" className={styles.submitButton}>SUBMIT</button>
        </div>
        <div className={styles.messageContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="message">SAMPLE LETTER</label>
            <div
              id="message"
              className={styles.textarea}
              dangerouslySetInnerHTML={{ __html: message }}
            ></div>
          </div>
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}