"use client"
import React, { useState } from 'react';
import styles from '../styles/components/contact.module.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleZipcodeChange = async (e) => {
    const zipcode = e.target.value;
    setZipcode(zipcode);

    if (zipcode.length === 5) {
      // Fetch the local police department name using Google Places API
      const response = await fetch(`/api/getPoliceDepartment?zipcode=${zipcode}`);
      const data = await response.json();
      setRecipient(data.policeDepartment);
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
    setRecipient('');
  };

  return (
    <div className={styles.contactContainer}>
      <h1>WRITE A LETTER TO <span>your</span> LOCAL LAW ENFORCEMENT</h1>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="zipcode">Zipcode</label>
          <input
            type="text"
            id="zipcode"
            value={zipcode}
            onChange={handleZipcodeChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
      {recipient && (
        <div className={styles.preWrittenLetter}>
          <h2>Pre-Written Letter</h2>
          <p>Dear {recipient},</p>
          <p>
            I am writing to express my concerns about the recent events in our community. As a resident of this area, I believe it is important to address these issues and work together to find solutions.
          </p>
          <p>Sincerely,</p>
          <p>{name}</p>
        </div>
      )}
    </div>
  );
}