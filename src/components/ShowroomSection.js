"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ShowroomSection.module.css";
import MapPin from "./MapPin";
import MainMapPin from "./MainMapPin";

// Each secondary map pin is defined explicitly in the JSX below so you can customize
// sizes, coordinates, colors, and animations for each city individually.

export default function ShowroomSection() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const sourceRef = useRef(null);
  const destRef = useRef(null);

  const [coords, setCoords] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const updateCoords = () => {
      if (!sourceRef.current || !destRef.current || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const sourceRect = sourceRef.current.getBoundingClientRect();
      const destRect = destRef.current.getBoundingClientRect();
      
      setCoords({
        startX: sourceRect.left - containerRect.left + sourceRect.width / 2,
        startY: sourceRect.top - containerRect.top + sourceRect.height / 2,
        endX: destRect.left - containerRect.left + destRect.width / 2,
        endY: destRect.top - containerRect.top + destRect.height / 2,
      });
    };

    // Calculate coordinates once components have completed rendering
    const timer = setTimeout(updateCoords, 250);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const viewportHeight = window.innerHeight;

      // Start calculating scroll progress as the section enters the viewport
      const start = viewportHeight * 0.8;
      const end = viewportHeight * 0.1;
      
      let progress = (start - sectionTop) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateCoords);
    window.addEventListener("load", updateCoords);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("load", updateCoords);
    };
  }, []);

  // Safe coordination recalculation trigger
  const handleMouseEnter = () => {
    if (sourceRef.current && destRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const sourceRect = sourceRef.current.getBoundingClientRect();
      const destRect = destRef.current.getBoundingClientRect();
      setCoords({
        startX: sourceRect.left - containerRect.left + sourceRect.width / 2,
        startY: sourceRect.top - containerRect.top + sourceRect.height / 2,
        endX: destRect.left - containerRect.left + destRect.width / 2,
        endY: destRect.top - containerRect.top + destRect.height / 2,
      });
    }
  };

  // 1. Flight start threshold: The pin remains perfectly static inside the text 
  // until the user scrolls further down (progress > 0.60). This matches the user's 
  // request to delay the flight further until the header is even higher up on the screen.
  const flightThreshold = 0.60;
  
  const flightProgress = scrollProgress > flightThreshold 
    ? (scrollProgress - flightThreshold) / (1 - flightThreshold)
    : 0;

  // Interpolate flight coordinates using the flightProgress ratio
  const currentX = coords.startX + (coords.endX - coords.startX) * flightProgress;
  const currentY = coords.startY + (coords.endY - coords.startY) * flightProgress;

  // Parabolic vertical curve calculation for natural 3D flight paths
  const archHeight = 120;
  const arcY = currentY - Math.sin(flightProgress * Math.PI) * archHeight;

  // Dynamic sizing (pin scales up from inline size to landing size as it approaches the map)
  const pinSize = 22 + (46 - 22) * flightProgress;

  // Render the flying overlay pin only after crossing the flight start threshold and before landing
  const showFlyingPin = isMounted && scrollProgress > flightThreshold && coords.startX !== 0 && flightProgress < 0.98;

  // Staggered network pins pop in when the main pin is 90% of the way to landing
  const showNetwork = isMounted && flightProgress >= 0.90;

  // Calculate inline static pin opacity (starts solid, fades out smoothly as flight initiates)
  const staticPinOpacity = scrollProgress > flightThreshold
    ? Math.max(0, 1 - (scrollProgress - flightThreshold) * 6) // Quick, seamless crossfade
    : 1;

  // Collapse width smoothly as flight initiates to let the text badge dynamically shrink
  const staticPinWidthScale = staticPinOpacity;

  return (
    <section ref={sectionRef} className={styles.section} id="showroom">
      <div ref={containerRef} className={styles.container} style={{ position: "relative" }}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>CHOOSE YOUR ENVIRONMENT</span>
          <h2 className={styles.title}>A Workspace Network That Grows With You</h2>
          <p className={styles.subtitle}>
            Whether you're a freelancer, startup, or growing team, our coworking spaces are built to support the way you work. With flexible, inspiring environments designed for productivity and collaboration, we help businesses connect and scale effortlessly — now powering professionals across India in{" "}
            <span 
              className={styles.highlightCities} 
              onMouseEnter={handleMouseEnter}
            >
              {/* Static target representing the start point - collapses smoothly to shrink the badge */}
              <span 
                ref={sourceRef} 
                className={styles.sourcePoint}
                style={{
                  width: `${staticPinWidthScale * 22}px`,
                  marginRight: `${staticPinWidthScale * 4}px`,
                  opacity: staticPinOpacity,
                  overflow: "hidden",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), margin-right 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s ease"
                }}
              >
                <MainMapPin 
                  className={styles.pinIcon} 
                  size={22} 
                />
              </span>
              30+ cities
            </span>.
          </p>
        </div>

        {/* Massive Centered Animated Map of India below header */}
        <div className={styles.mapContainer}>
          <div className={styles.mapWrapper}>
            <Image 
              src="/images/India_maps.png"
              alt="Workspace Network Map of India"
              width={750}
              height={750}
              className={styles.mapImage}
              priority
            />
            {/* Jaipur Pin (The main landing map pin destination - editable here!) */}
            <div 
              ref={destRef} 
              className={styles.destPoint}
              style={{ left: "22%", top: "39%" }}
            >
              {/* Show the landed main pin inside the floating wrapper once flight is complete! */}
              {isMounted && flightProgress >= 0.98 && (
                <div className={`${styles.landedMainPin} ${styles.popIn}`}>
                  <div className={styles.dockedPinInner}>
                    <MainMapPin size={46} pinColor="#ff4f00" innerColor="#fffefb" />
                    <span className={`${styles.pinLabel} ${styles.mainPinLabel}`}>Jaipur</span>
                  </div>
                </div>
              )}
            </div>

            {/* Docked Network Pins - Individually written for granular editing */}
            
            {/* Chandigarh Pin */}
            <div 
              className={`${styles.dockedPin} ${showNetwork ? styles.popIn : ""}`}
              style={{ left: "33%", top: "34%", transitionDelay: "60ms" }}
            >
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Chandigarh</span>
              </div>
            </div>

            {/* Ahmedabad Pin */}
            <div 
              className={`${styles.dockedPin} ${showNetwork ? styles.popIn : ""}`}
              style={{ left: "15%", top: "52%", transitionDelay: "120ms" }}
            >
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Ahmedabad</span>
              </div>
            </div>

            {/* Mumbai Pin */}
            <div 
              className={`${styles.dockedPin} ${showNetwork ? styles.popIn : ""}`}
              style={{ left: "20%", top: "59%", transitionDelay: "180ms" }}
            >
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Mumbai</span>
              </div>
            </div>

            {/* Goa Pin */}
            <div 
              className={`${styles.dockedPin} ${showNetwork ? styles.popIn : ""}`}
              style={{ left: "23%", top: "66%", transitionDelay: "240ms" }}
            >
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Goa</span>
              </div>
            </div>

            {/* Indore Pin */}
            <div 
              className={`${styles.dockedPin} ${showNetwork ? styles.popIn : ""}`}
              style={{ left: "36%", top: "49%", transitionDelay: "300ms" }}
            >
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Indore</span>
              </div>
            </div>

            {/* Bengaluru Pin */}
            <div 
              className={`${styles.dockedPin} ${showNetwork ? styles.popIn : ""}`}
              style={{ left: "32%", top: "70%", transitionDelay: "360ms" }}
            >
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Bengaluru</span>
              </div>
            </div>

            {/* Chennai Pin */}
            <div 
              className={`${styles.dockedPin} ${showNetwork ? styles.popIn : ""}`}
              style={{ left: "40%", top: "78%", transitionDelay: "420ms" }}
            >
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Chennai</span>
              </div>
            </div>

            {/* Delhi Pin */}
            <div 
              className={`${styles.dockedPin} ${showNetwork ? styles.popIn : ""}`}
              style={{ left: "34%", top: "39%", transitionDelay: "480ms" }}
            >
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Delhi-NCR</span>
              </div>
            </div>

            {/* Guwahati Pin */}
            <div 
              className={`${styles.dockedPin} ${showNetwork ? styles.popIn : ""}`}
              style={{ left: "85%", top: "40%", transitionDelay: "540ms" }}
            >
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Guwahati</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Flying Map Pin (Active overlay on page scroll) */}
        {showFlyingPin && (
          <div
            className={styles.flyingPinContainer}
            style={{
              position: "absolute",
              left: `${currentX}px`,
              top: `${arcY}px`,
              transform: "translate(-50%, -100%)", /* Anchor pin tip */
              pointerEvents: "none",
              zIndex: 100,
            }}
          >
            <MainMapPin 
              size={pinSize} 
              pinColor="#ff4f00" 
              innerColor="#fffefb"
              className={flightProgress >= 0.98 ? styles.landedPinAnimation : ""}
            />
          </div>
        )}

      </div>
    </section>
  );
}
