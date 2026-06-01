"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./hero.module.css";

export default function Hero() {
    const titleRef = useRef(null);
    const logosRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // 1. Fade in the background overlay smoothly
            tl.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.8 }
            );

            // 2. Cinematic slide-up and soft scale for main branding text
            tl.fromTo(titleRef.current,
                { y: 60, opacity: 0, scale: 0.96 },
                { y: 0, opacity: 1, scale: 1, duration: 1.4 },
                "-=1.4"
            );

            // 3. Staggered fade in and slide up for bottom client logos track
            tl.fromTo(logosRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.0 },
                "-=0.9"
            );
        });

        return () => ctx.revert();
    }, []);

    // Split the 11 client logos into two distinct rows
    const row1Logos = [
        "/clients/Bajaj_Finserv_Logo.svg",
        "/clients/Flipkart_logo.svg",
        "/clients/Google_Pay_Logo.svg",
        "/clients/L&T.svg",
        "/clients/royal_enfield.svg",
        "/clients/IndiaMART_logo.svg",
        "/clients/Schneider_Electric.svg",
        "/clients/Zomato_Logo.svg",
        "/clients/Bosch-logo.svg"
    ];

    const row2Logos = [
        "/clients/aakash+byjus.svg",
        "/clients/credresolve.svg",
        "/clients/hyperface.svg",
        "/clients/samunnati.svg",
        "/clients/utkarsh_classes.svg",
        "/clients/olx_autos.svg",
        "/clients/toppr.svg",
        "/clients/deloitte.svg",
        "/clients/blinkit.svg"
    ];

    // To make it infinite scrolling seamless, we double each list
    const doubledRow1 = [...row1Logos, ...row1Logos];
    const doubledRow2 = [...row2Logos, ...row2Logos];

    return (
        <section className={styles.heroSection}>
            {/* Background & Overlay covering the entire 100vh */}
            <div className={styles.heroBackground}></div>
            <div ref={overlayRef} className={styles.heroOverlay}></div>

            {/* Top Hero Visual Area (80vh) */}
            <div className={styles.heroVisualArea}>
                <div className={styles.heroContainer}>
                    <div className={styles.contentWrapper}>
                        <h1 ref={titleRef} className={styles.mainTitle}>CoWorkIn</h1>
                    </div>
                </div>
            </div>

            {/* Bottom Logos Scrolling Area (20vh) */}
            <div ref={logosRef} className={styles.logosArea}>
                <div className={styles.logosTitle}>TRUSTED BY LEADING BUILDERS</div>

                {/* Row 1: Scrolling Left */}
                <div className={styles.logosTrackContainer}>
                    <div className={`${styles.logosTrack} ${styles.scrollLeft}`}>
                        {doubledRow1.map((logo, index) => (
                            <div key={`row1-${index}`} className={styles.logoItem}>
                                <img src={logo} alt="Client Logo" className={styles.logoImage} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Scrolling Right */}
                <div className={styles.logosTrackContainer}>
                    <div className={`${styles.logosTrack} ${styles.scrollRight}`}>
                        {doubledRow2.map((logo, index) => (
                            <div key={`row2-${index}`} className={styles.logoItem}>
                                <img src={logo} alt="Client Logo" className={styles.logoImage} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
