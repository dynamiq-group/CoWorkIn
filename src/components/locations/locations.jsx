"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./locations.module.css";
import MapPin from "./MapPin";
import MainMapPin from "./MainMapPin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Locations() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const sourceRef = useRef(null);
  const destRef = useRef(null);

  const coordsRef = useRef({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const flyingPinRef = useRef(null);
  const landedPinRef = useRef(null);
  const staticPinRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    const updateCoords = () => {
      if (!sourceRef.current || !destRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const sourceRect = sourceRef.current.getBoundingClientRect();
      const destRect = destRef.current.getBoundingClientRect();

      coordsRef.current = {
        startX: sourceRect.left - containerRect.left + sourceRect.width / 2,
        startY: sourceRect.top - containerRect.top + sourceRect.height / 2,
        endX: destRect.left - containerRect.left + destRect.width / 2,
        endY: destRect.top - containerRect.top + destRect.height / 2,
      };

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.refresh();
      }
    };

    // Recalculate after mount
    const timer = setTimeout(updateCoords, 250);

    // Docked Pins selection
    const dockedPins = containerRef.current.querySelectorAll(`.${styles.dockedPin}`);

    // GSAP clean implementation context
    const ctx = gsap.context(() => {
      const obj = { progress: 0 };

      // Pin flight tracking animation
      const tl = gsap.to(obj, {
        progress: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 10%",
          scrub: 1.2, // smoothing factor for momentum scroll
          onUpdate: (self) => {
            const p = self.progress;
            const flightThreshold = 0.60;
            const { startX, startY, endX, endY } = coordsRef.current;

            if (startX === 0 && endX === 0) return;

            if (p > flightThreshold) {
              const flightProgress = (p - flightThreshold) / (1 - flightThreshold);

              // 1. Crossfade static header pin
              if (staticPinRef.current) {
                const opacity = Math.max(0, 1 - flightProgress * 6);
                staticPinRef.current.style.opacity = opacity;
                staticPinRef.current.style.width = `${opacity * 22}px`;
                staticPinRef.current.style.marginRight = `${opacity * 4}px`;
              }

              // 2. Flying pin coordinates calculations
              if (flightProgress < 0.98) {
                if (flyingPinRef.current) {
                  flyingPinRef.current.style.display = "block";
                  const currentX = startX + (endX - startX) * flightProgress;
                  const currentY = startY + (endY - startY) * flightProgress;
                  const archHeight = 120; // 3D arc height
                  const arcY = currentY - Math.sin(flightProgress * Math.PI) * archHeight;
                  const size = 22 + (46 - 22) * flightProgress;
                  const scale = size / 22;

                  flyingPinRef.current.style.left = `${currentX}px`;
                  flyingPinRef.current.style.top = `${arcY}px`;
                  flyingPinRef.current.style.transform = `translate(-50%, -100%) scale(${scale})`;
                }

                if (landedPinRef.current) {
                  landedPinRef.current.style.opacity = 0;
                  landedPinRef.current.style.transform = "translate(-50%, -100%) scale(0)";
                }
              } else {
                // Landed Jaipur Pin!
                if (flyingPinRef.current) {
                  flyingPinRef.current.style.display = "none";
                }

                if (landedPinRef.current) {
                  landedPinRef.current.style.opacity = 1;
                  landedPinRef.current.style.transform = "translate(-50%, -100%) scale(1)";
                }
              }
            } else {
              // Below flight threshold
              if (staticPinRef.current) {
                staticPinRef.current.style.opacity = 1;
                staticPinRef.current.style.width = "22px";
                staticPinRef.current.style.marginRight = "4px";
              }

              if (flyingPinRef.current) {
                flyingPinRef.current.style.display = "none";
              }

              if (landedPinRef.current) {
                landedPinRef.current.style.opacity = 0;
                landedPinRef.current.style.transform = "translate(-50%, -100%) scale(0)";
              }
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger;

      // 3. Staggered reveal of secondary city pins
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 35%",
        onEnter: () => {
          gsap.to(dockedPins, {
            scale: 1,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "back.out(1.5)",
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(dockedPins, {
            scale: 0,
            opacity: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: "power2.in",
            overwrite: "auto",
          });
        },
      });
    });

    window.addEventListener("resize", updateCoords);
    window.addEventListener("load", updateCoords);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("load", updateCoords);
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = () => {
    if (sourceRef.current && destRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const sourceRect = sourceRef.current.getBoundingClientRect();
      const destRect = destRef.current.getBoundingClientRect();
      coordsRef.current = {
        startX: sourceRect.left - containerRect.left + sourceRect.width / 2,
        startY: sourceRect.top - containerRect.top + sourceRect.height / 2,
        endX: destRect.left - containerRect.left + destRect.width / 2,
        endY: destRect.top - containerRect.top + destRect.height / 2,
      };
    }
  };

  return (
    <section ref={sectionRef} className={styles.section} id="locations">
      <div ref={containerRef} className={styles.container} style={{ position: "relative" }}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>CHOOSE YOUR ENVIRONMENT</span>
          <h2 className={styles.title}>A Workspace Network That Grows With You</h2>
          <p className={styles.subtitle}>
            Whether you&apos;re a freelancer, startup, or growing team, our coworking spaces are built to support the way you work. With flexible, inspiring environments designed for productivity and collaboration, we help businesses connect and scale effortlessly — now powering professionals across India in{" "}
            <span
              className={styles.highlightCities}
              onMouseEnter={handleMouseEnter}
            >
              {/* Static target representing the start point */}
              <span
                ref={sourceRef}
                className={styles.sourcePoint}
                style={{
                  width: "22px",
                  marginRight: "4px",
                  opacity: 1,
                  overflow: "hidden",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span ref={staticPinRef} style={{ display: "inline-flex" }}>
                  <MainMapPin className={styles.pinIcon} size={22} />
                </span>
              </span>
              30+ cities
            </span>.
          </p>
        </div>

        {/* India Map Visualization */}
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
            {/* Jaipur Pin (The main landing map pin destination) */}
            <div
              ref={destRef}
              className={styles.destPoint}
              style={{ left: "25%", top: "46%" }}
            >
              <div
                ref={landedPinRef}
                className={styles.landedMainPin}
                style={{ opacity: 0, transform: "translate(-50%, -100%) scale(0)" }}
              >
                <div className={styles.dockedPinInner}>
                  <MainMapPin size={46} pinColor="#ff4f00" innerColor="#fffefb" />
                  <span className={`${styles.pinLabel} ${styles.mainPinLabel}`}>Jaipur</span>
                </div>
              </div>
            </div>

            {/* Docked Network Pins */}
            <div className={styles.dockedPin} style={{ left: "31%", top: "38%" }}>
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Chandigarh</span>
              </div>
            </div>

            <div className={styles.dockedPin} style={{ left: "15%", top: "52%" }}>
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Ahmedabad</span>
              </div>
            </div>

            <div className={styles.dockedPin} style={{ left: "20%", top: "59%" }}>
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Mumbai</span>
              </div>
            </div>

            <div className={styles.dockedPin} style={{ left: "23%", top: "66%" }}>
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Goa</span>
              </div>
            </div>

            <div className={styles.dockedPin} style={{ left: "36%", top: "49%" }}>
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Indore</span>
              </div>
            </div>

            <div className={styles.dockedPin} style={{ left: "32%", top: "70%" }}>
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Bengaluru</span>
              </div>
            </div>

            <div className={styles.dockedPin} style={{ left: "40%", top: "78%" }}>
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Chennai</span>
              </div>
            </div>

            <div className={styles.dockedPin} style={{ left: "34%", top: "43%" }}>
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Delhi-NCR</span>
              </div>
            </div>

            <div className={styles.dockedPin} style={{ left: "85%", top: "40%" }}>
              <div className={styles.dockedPinInner}>
                <MapPin size={24} pinColor="#ff4f00" innerColor="#fffefb" />
                <span className={styles.pinLabel}>Guwahati</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Flying Map Pin (Active overlay on page scroll, fully managed by GSAP) */}
        <div
          ref={flyingPinRef}
          className={styles.flyingPinContainer}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: "translate(-50%, -100%) scale(1)",
            display: "none",
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          <MainMapPin size={22} pinColor="#ff4f00" innerColor="#fffefb" />
        </div>

      </div>
    </section>
  );
}
