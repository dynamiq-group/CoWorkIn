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
            <div ref={overlayRef} className={styles.heroOverlay}></div>

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