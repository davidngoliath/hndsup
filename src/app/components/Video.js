"use client"

import styles from "../styles/components/modal.module.css";
export default function Video({videoId}) {

    return (
        <div className={styles.videoContainer}>
            <div className={styles.videoBg}></div>
                <div className={styles.vimeoContainer}>
                { videoId &&
                <iframe src={`https://player.vimeo.com/video/${videoId}?background=0&autoplay=1&loop=1&byline=0&title=0&controls=1&speed=1`}  allow="autoplay; fullscreen;" frameBorder="0" ></iframe>
                }
            </div>
        </div>
    )
}