"use client"

import styles from "../styles/components/modal.module.css";

export default function Video({ videoId }) {
    return (
        <div className={styles.videoContainer}>
            <div className={styles.videoBg}></div>
            <div className={styles.vimeoContainer}>
                {videoId && (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=1`}
                        allow="autoplay; fullscreen"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
        </div>
    );
}