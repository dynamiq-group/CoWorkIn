"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./gallery.module.css";

// Premium workspace data configured with high-fidelity detail cards
const row1Spaces = [
  {
    id: 1,
    category: "Hot Desks",
    title: "The Radiant Suite",
    image: "/images/hot_desk.png",
    description: "Sunlit workspaces featuring premium sit-to-stand ergonomic desks, active noise cancelling, and fiber speeds.",
    capacity: "Flexible seating",
    amenity: "1 Gbps Fiber",
    tilt: "-1.5deg"
  },
  {
    id: 2,
    category: "Meeting Rooms",
    title: "The Boardroom",
    image: "/images/meeting_room.png",
    description: "Fully-integrated presentation room with massive 4K UHD smart monitor, high-res conferencing gear, and writeable whiteboard.",
    capacity: "8-10 Members",
    amenity: "4K Screen + Cam",
    tilt: "1.2deg"
  },
  {
    id: 3,
    category: "Private Offices",
    title: "Executive Suite 4",
    image: "/images/private_office.png",
    description: "Soundproofed custom-designed private layout configured for scaling teams, complete with ergonomic chairs and private storage.",
    capacity: "4-6 Desks",
    amenity: "Acoustic Walls",
    tilt: "-1deg"
  },
  {
    id: 4,
    category: "Amenities",
    title: "Artisan Cafe & Lounge",
    image: "/images/cafe_amenity.png",
    description: "Micro-roasted coffees, specialty herbal teas, organic fresh snacks, and comfortable lounge sofas for taking midday breaks.",
    capacity: "Shared Lounge",
    amenity: "Unlimited Coffee",
    tilt: "2deg"
  },
  {
    id: 5,
    category: "Collaboration",
    title: "The Greenhouse",
    image: "/images/hero_bg.png",
    description: "Lush, naturally lit open atrium optimized for creative brainstorm sessions, collaboration, and relaxed working postures.",
    capacity: "Open Atrium",
    amenity: "Lush Living Walls",
    tilt: "-2deg"
  }
];

const row2Spaces = [
  {
    id: 6,
    category: "Private Offices",
    title: "Zen Suite 2",
    image: "/images/private_office.png",
    description: "Minimalist workspace lined with natural oak accents, sound dampening acoustics, and warm dimmable ambient light.",
    capacity: "2-4 Desks",
    amenity: "Warm Mood Lighting",
    tilt: "1.5deg"
  },
  {
    id: 7,
    category: "Hot Desks",
    title: "The Skylight Studio",
    image: "/images/cafe_amenity.png",
    description: "A majestic double-height hot desk space illuminated by expansive overhead windows, promoting focus and productivity.",
    capacity: "Flexible seating",
    amenity: "1 Gbps Fiber",
    tilt: "-1.2deg"
  },
  {
    id: 8,
    category: "Focus Booths",
    title: "Quiet Pod B",
    image: "/images/hot_desk.png",
    description: "Comfortable, noise-isolated acoustic booth optimized for active client video calls, high-priority meetings, or deep focus work.",
    capacity: "1 Member",
    amenity: "Acoustic Phone Box",
    tilt: "2deg"
  },
  {
    id: 9,
    category: "Amenities",
    title: "The Cupping Lab",
    image: "/images/cafe_amenity.png",
    description: "Sleek barista bar featuring high-end espresso machinery, daily tastings, and premium organic snacks to keep you fueled.",
    capacity: "Cafe Style",
    amenity: "Espresso Bar",
    tilt: "-1.8deg"
  },
  {
    id: 10,
    category: "Collaboration",
    title: "Ideation Lab",
    image: "/images/meeting_room.png",
    description: "Designed for high-impact workshop sessions, featuring massive writable glass walls, magnetic pin boards, and acoustic felt.",
    capacity: "12 Members",
    amenity: "Writable Wall Grid",
    tilt: "1deg"
  }
];

export default function Gallery() {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorHovered, setCursorHovered] = useState(false);

  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  // Buttery-smooth performance cursor tracker bypassing React state renders
  const handleMouseMove = (e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  };

  const handleMouseEnterSection = () => {
    setCursorVisible(true);
  };

  const handleMouseLeaveSection = () => {
    setCursorVisible(false);
    setCursorHovered(false);
  };

  const handleMouseEnterCard = () => {
    setCursorHovered(true);
  };

  const handleMouseLeaveCard = () => {
    setCursorHovered(false);
  };

  // Scroll linkage listener for smooth scroll parallax row movements
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollOffset = rect.top; // Viewport top delta
      sectionRef.current.style.setProperty("--scroll-offset", `${scrollOffset}`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially to set starting custom scroll variable offset
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={styles.gallerySection} 
      id="gallery"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnterSection}
      onMouseLeave={handleMouseLeaveSection}
    >
      {/* Premium Magnetic Cursor Follower */}
      <div 
        ref={cursorRef}
        className={`${styles.customCursor} ${
          cursorVisible ? styles.customCursorVisible : ""
        } ${cursorHovered ? styles.customCursorHovered : ""}`}
      >
        <span>Explore</span>
      </div>

      <div className={styles.container}>
        {/* Elegant Centered Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>Curated Spaces</span>
          <h2 className={styles.title}>Environments designed for deep focus.</h2>
          <p className={styles.subtitle}>
            Explore a virtual showcase of our architectural coworking zones, silent hot desks, fully premium suites, and barista bars.
          </p>
        </div>
      </div>

      {/* Infinite Parallax Marquee Grid */}
      <div className={styles.marqueeContainer}>
        
        {/* Row 1 - Leftward scrolling row */}
        <div className={styles.marqueeRow}>
          <div 
            className={styles.scrollParallaxTrack}
            style={{ transform: "translateX(calc(var(--scroll-offset, 0) * -0.15px))" }}
          >
            {/* Infinite scroller track (contains two duplicates for perfect loop) */}
            <div className={`${styles.marqueeTrack} ${styles.trackLeft}`}>
              {/* Duplicate 1 */}
              {row1Spaces.map((space) => (
                <div 
                  key={space.id} 
                  className={styles.card}
                  style={{ "--hover-tilt": space.tilt }}
                  onMouseEnter={handleMouseEnterCard}
                  onMouseLeave={handleMouseLeaveCard}
                >
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={space.image}
                      alt={space.title}
                      fill
                      sizes="360px"
                      className={styles.cardImage}
                      priority={space.id <= 3}
                    />
                  </div>
                  
                  {/* Glassmorphic detailed overlay */}
                  <div className={styles.cardOverlay}>
                    <div className={styles.overlayHeader}>
                      <div className={styles.titleGroup}>
                        <span className={styles.cardCategory}>{space.category}</span>
                        <h4 className={styles.cardTitle}>{space.title}</h4>
                      </div>
                      <svg
                        className={styles.arrowIcon}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                    
                    <div className={styles.divider}></div>
                    
                    <div className={styles.overlayContent}>
                      <p className={styles.cardDescription}>{space.description}</p>
                      <div className={styles.metricsRow}>
                        {/* Seating Capacity Metric */}
                        <div className={styles.metric}>
                          <svg
                            className={styles.metricIcon}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>{space.capacity}</span>
                        </div>
                        {/* Features Metric */}
                        <div className={styles.metric}>
                          <svg
                            className={styles.metricIcon}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <span>{space.amenity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate 2 (essential for smooth seamless infinite wrap) */}
              {row1Spaces.map((space) => (
                <div 
                  key={`${space.id}-dup`} 
                  className={styles.card}
                  style={{ "--hover-tilt": space.tilt }}
                  onMouseEnter={handleMouseEnterCard}
                  onMouseLeave={handleMouseLeaveCard}
                >
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={space.image}
                      alt={space.title}
                      fill
                      sizes="360px"
                      className={styles.cardImage}
                    />
                  </div>
                  
                  <div className={styles.cardOverlay}>
                    <div className={styles.overlayHeader}>
                      <div className={styles.titleGroup}>
                        <span className={styles.cardCategory}>{space.category}</span>
                        <h4 className={styles.cardTitle}>{space.title}</h4>
                      </div>
                      <svg
                        className={styles.arrowIcon}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                    
                    <div className={styles.divider}></div>
                    
                    <div className={styles.overlayContent}>
                      <p className={styles.cardDescription}>{space.description}</p>
                      <div className={styles.metricsRow}>
                        <div className={styles.metric}>
                          <svg
                            className={styles.metricIcon}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>{space.capacity}</span>
                        </div>
                        <div className={styles.metric}>
                          <svg
                            className={styles.metricIcon}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <span>{space.amenity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 - Rightward scrolling row */}
        <div className={styles.marqueeRow}>
          <div 
            className={styles.scrollParallaxTrack}
            style={{ transform: "translateX(calc(var(--scroll-offset, 0) * 0.15px))" }}
          >
            <div className={`${styles.marqueeTrack} ${styles.trackRight}`}>
              {/* Duplicate 1 */}
              {row2Spaces.map((space) => (
                <div 
                  key={space.id} 
                  className={styles.card}
                  style={{ "--hover-tilt": space.tilt }}
                  onMouseEnter={handleMouseEnterCard}
                  onMouseLeave={handleMouseLeaveCard}
                >
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={space.image}
                      alt={space.title}
                      fill
                      sizes="360px"
                      className={styles.cardImage}
                    />
                  </div>
                  
                  <div className={styles.cardOverlay}>
                    <div className={styles.overlayHeader}>
                      <div className={styles.titleGroup}>
                        <span className={styles.cardCategory}>{space.category}</span>
                        <h4 className={styles.cardTitle}>{space.title}</h4>
                      </div>
                      <svg
                        className={styles.arrowIcon}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                    
                    <div className={styles.divider}></div>
                    
                    <div className={styles.overlayContent}>
                      <p className={styles.cardDescription}>{space.description}</p>
                      <div className={styles.metricsRow}>
                        <div className={styles.metric}>
                          <svg
                            className={styles.metricIcon}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>{space.capacity}</span>
                        </div>
                        <div className={styles.metric}>
                          <svg
                            className={styles.metricIcon}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <span>{space.amenity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate 2 (essential for smooth seamless infinite wrap) */}
              {row2Spaces.map((space) => (
                <div 
                  key={`${space.id}-dup`} 
                  className={styles.card}
                  style={{ "--hover-tilt": space.tilt }}
                  onMouseEnter={handleMouseEnterCard}
                  onMouseLeave={handleMouseLeaveCard}
                >
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={space.image}
                      alt={space.title}
                      fill
                      sizes="360px"
                      className={styles.cardImage}
                    />
                  </div>
                  
                  <div className={styles.cardOverlay}>
                    <div className={styles.overlayHeader}>
                      <div className={styles.titleGroup}>
                        <span className={styles.cardCategory}>{space.category}</span>
                        <h4 className={styles.cardTitle}>{space.title}</h4>
                      </div>
                      <svg
                        className={styles.arrowIcon}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                    
                    <div className={styles.divider}></div>
                    
                    <div className={styles.overlayContent}>
                      <p className={styles.cardDescription}>{space.description}</p>
                      <div className={styles.metricsRow}>
                        <div className={styles.metric}>
                          <svg
                            className={styles.metricIcon}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span>{space.capacity}</span>
                        </div>
                        <div className={styles.metric}>
                          <svg
                            className={styles.metricIcon}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                          <span>{space.amenity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
