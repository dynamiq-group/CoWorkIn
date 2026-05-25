"use client";

import React, { useEffect, useRef } from "react";
import styles from "./hero.module.css";

export default function Hero() {
    const sectionRef = useRef(null);

    // Track page scroll to set high-performance CSS custom variable and scroll direction
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let isScrollingDown = null; // Initialize to null to guarantee first scroll updates the direction state

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const scrollY = window.scrollY;
            sectionRef.current.style.setProperty("--scroll-y", `${scrollY}`);

            // Detect scroll direction changes only when scroll position actually changes
            if (scrollY !== lastScrollY) {
                const goingDown = scrollY > lastScrollY;
                if (goingDown !== isScrollingDown) {
                    isScrollingDown = goingDown;
                    sectionRef.current.setAttribute("data-scroll-dir", goingDown ? "down" : "up");
                }
                lastScrollY = scrollY;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        
        // Setup initial default marquee scroll direction
        if (sectionRef.current) {
            sectionRef.current.setAttribute("data-scroll-dir", "up");
        }
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
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
        <section ref={sectionRef} className={styles.heroSection}>
            {/* Background & Overlay covering the entire 100vh */}
            <div className={styles.heroBackground}></div>
            <div className={styles.heroOverlay}></div>

            {/* Top Hero Visual Area (80vh) */}
            <div className={styles.heroVisualArea}>
                <div className={styles.heroContainer}>
                    <div className={styles.contentWrapper}>
                        <h1 className={styles.mainTitle}>CoWorkIn</h1>
                    </div>
                </div>
            </div>

            {/* Bottom Logos Scrolling Area (20vh) */}
            <div className={styles.logosArea}>
                <div className={styles.logosTitle}>TRUSTED BY LEADING BUILDERS</div>

                {/* Row 1: Scrolling Left */}
                <div className={styles.logosTrackContainer}>
                    <div 
                        className={styles.scrollWrapper}
                        style={{ transform: "translateX(calc(var(--scroll-y, 0) * -0.3px))" }}
                    >
                        <div className={`${styles.logosTrack} ${styles.scrollLeft}`}>
                            {doubledRow1.map((logo, index) => (
                                <div key={`row1-${index}`} className={styles.logoItem}>
                                    <img src={logo} alt="Client Logo" className={styles.logoImage} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Row 2: Scrolling Right */}
                <div className={styles.logosTrackContainer}>
                    <div 
                        className={styles.scrollWrapper}
                        style={{ transform: "translateX(calc(var(--scroll-y, 0) * 0.3px))" }}
                    >
                        <div className={`${styles.logosTrack} ${styles.scrollRight}`}>
                            {doubledRow2.map((logo, index) => (
                                <div key={`row2-${index}`} className={styles.logoItem}>
                                    <img src={logo} alt="Client Logo" className={styles.logoImage} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
