"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import styles from "./hero.module.css";

export default function Hero() {
    const [scrollDir, setScrollDir] = useState("up");

    // Track scroll direction cleanly via state
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY !== lastScrollY) {
                const goingDown = scrollY > lastScrollY;
                setScrollDir(goingDown ? "down" : "up");
                lastScrollY = scrollY;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Logo data structures
    const row1Logos = [
        "/clients/Bajaj_Finserv_Logo.svg", "/clients/Flipkart_logo.svg", "/clients/Google_Pay_Logo.svg",
        "/clients/L&T.svg", "/clients/royal_enfield.svg", "/clients/IndiaMART_logo.svg",
        "/clients/Schneider_Electric.svg", "/clients/Zomato_Logo.svg", "/clients/Bosch-logo.svg"
    ];

    const row2Logos = [
        "/clients/aakash+byjus.svg", "/clients/credresolve.svg", "/clients/hyperface.svg",
        "/clients/samunnati.svg", "/clients/utkarsh_classes.svg", "/clients/olx_autos.svg",
        "/clients/toppr.svg", "/clients/deloitte.svg", "/clients/blinkit.svg"
    ];

    // Extended copies for seamless infinite scroll clipping bounds
    const extendedRow1 = [...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos];
    const extendedRow2 = [...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos];

    return (
        <section className={styles.heroSection} data-scroll-dir={scrollDir}>
            <div className={styles.heroBackground}></div>
            <div className={styles.heroOverlay}></div>

            <div className={styles.heroVisualArea}>
                <div className={styles.heroContainer}>
                    <div className={styles.contentWrapper}>
                        <h1 className={styles.mainTitle}>CoWork&apos;In</h1>
                    </div>
                </div>
            </div>

            {/* Bottom Logos Scrolling Area */}
            <div className={styles.logosArea}>
                <div className={styles.logosTitle}>TRUSTED BY LEADING BUILDERS</div>

                {/* Row 1: Scrolling Left */}
                <div className={styles.logosTrackContainer}>
                    <MarqueeRow logos={extendedRow1} baseSpeed={-0.8} isMovingDown={scrollDir === "down"} rowKey="row1" />
                </div>

                {/* Row 2: Scrolling Right */}
                <div className={styles.logosTrackContainer}>
                    <MarqueeRow logos={extendedRow2} baseSpeed={0.8} isMovingDown={scrollDir === "down"} rowKey="row2" />
                </div>
            </div>
        </section>
    );
}

/* ==========================================================================
   REUSABLE MARQUEE COMPONENT WITH INERTIA AND ON-THE-SPOT DIRECTION FIX
   ========================================================================== */
function MarqueeRow({ logos, baseSpeed, isMovingDown, rowKey }) {
    const baseX = useMotionValue(0);
    const trackRef = React.useRef(null);

    // Normalize speed so up and down are perfectly mirrored
    let currentSpeed = baseSpeed;
    if (isMovingDown) {
        currentSpeed = baseSpeed * -1;
    }

    useAnimationFrame((time, delta) => {
        if (!trackRef.current) return;

        // THE FIX: Dynamically calculate the exact wrapping threshold.
        // Because your array is duplicated 4 times, the seamless reset point 
        // is exactly half of the total rendered track width.
        const totalWidth = trackRef.current.scrollWidth;
        const halfWidth = totalWidth / 2;

        // Delta normalizes the frame rate variations across 60Hz - 144Hz screens
        let moveBy = currentSpeed * (delta / 16);
        let newX = baseX.get() + moveBy;

        // Pixel-perfect dynamic boundary checking (No more snapping/glitching)
        if (newX <= -halfWidth) {
            // If moving left past the seam, wrap around by adding the half-width
            newX += halfWidth;
        } else if (newX > 0) {
            // If moving right past 0, wrap around by subtracting the half-width
            newX -= halfWidth;
        }

        baseX.set(newX);
    });

    return (
        <motion.div
            className={styles.scrollWrapper}
            style={{ x: baseX }}
        >
            {/* We attach the ref here to measure the exact layout size of the track container */}
            <div ref={trackRef} className={styles.logosTrack}>
                {logos.map((logo, index) => (
                    <div key={`${rowKey}-${index}`} className={styles.logoItem}>
                        <Image src={logo} alt="Client Logo" className={styles.logoImage} width={120} height={40} priority />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}