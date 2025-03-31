"use client"
import React, { useState } from "react";
import styles from "../styles/components/loginscreen.module.css";

export default function LoginScreen({ setLoading, handleLoad }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "hndsup") {
            setIsLoggedIn(true); // Hide the login screen
            setError(""); // Clear any previous error
            handleLoad(); // Call the loading function
            // setLoading(true); // Trigger the loading screen
            //setTimeout(() => setLoading(false), 3000); // Simulate loading for 3 seconds
        } else {
            setError("Incorrect password"); // Show error message
        }
    };

    if (isLoggedIn) {
        return null; // Hide the login screen when logged in
    }

    return (
        <div className={styles.loginscreen}>
            <form onSubmit={handleLogin} className={styles.form}>
                <input
                    className={styles.formInput}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.formButton} type="submit">Login</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}