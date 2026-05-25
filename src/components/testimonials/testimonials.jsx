"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./testimonials.module.css";
import { defaultReviews } from "./reviews";

// Highly customizable premium inline icons
export function Icon({ name, size = 16, className = "", variant = "solid" }) {
  if (name === "SparklesIcon") {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={variant === "solid" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  if (name === "StarIcon") {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={variant === "solid" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }

  if (name === "UserIcon") {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={variant === "solid" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }

  if (name === "BookOpenIcon") {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={variant === "solid" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }

  if (name === "ArrowRightIcon") {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    );
  }

  return null;
}

// Splits the reviews array into balanced chunks for dynamic column mapping
const splitArray = (array, numParts) => {
  const result = Array.from({ length: numParts }, () => []);
  array.forEach((item, i) => {
    result[i % numParts].push(item);
  });
  return result;
};

// Generates initials from names for high-quality fallback avatars
const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name[0].toUpperCase();
};

export function ReviewCard({ review }) {
  // Gracefully adapt between the old testimonial props and the new review format
  const authorName = review.name || review.patient || "Anonymous Member";
  const reviewText = review.text || review.testimonial || "";
  const ratingCount = review.rating || 5;
  const roleText = review.treatment || review.role || "Verified Reviewer";
  const reviewDate = review.date || "May 2026";
  const reviewerLocation = review.location || "";

  // Dynamic pastel coloring system mapped consistently using the reviewer name hash
  const colors = [
    { bg: "#e2e8f0", text: "#334155" }, // Slate
    { bg: "#d1fae5", text: "#065f46" }, // Emerald/Green
    { bg: "#ffe4e6", text: "#9f1239" }, // Rose/Red
    { bg: "#fef3c7", text: "#92400e" }, // Amber/Gold
    { bg: "#ddd6fe", text: "#5b21b6" }, // Violet/Purple
    { bg: "#e0f2fe", text: "#0369a1" }, // Sky/Blue
    { bg: "#ffedd5", text: "#9a3412" }, // Orange
    { bg: "#fae8ff", text: "#86198f" }, // Fuchsia
  ];

  const nameHash = authorName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
  const chosenColor = colors[nameHash % colors.length];

  return (
    <div className={styles.reviewCard}>
      <div className={styles.cardHeader}>
        <div className={styles.authorRow}>
          {review.image ? (
            <div className={styles.avatarImageWrapper}>
              <Image
                src={review.image}
                alt={review.alt || authorName}
                width={48}
                height={48}
                className={styles.avatarImage}
              />
            </div>
          ) : (
            <div
              className={styles.avatarInitials}
              style={{ backgroundColor: chosenColor.bg, color: chosenColor.text }}
            >
              {getInitials(authorName)}
            </div>
          )}
          <div className={styles.authorMeta}>
            <h3 className={styles.authorName}>{authorName}</h3>
          </div>
        </div>
        <div className={styles.dateAndLoc}>
          <span className={styles.cardDate}>{reviewDate}</span>
          {reviewerLocation && <span className={styles.cardLoc}>{reviewerLocation}</span>}
        </div>
      </div>
      <p className={styles.cardText}>"{reviewText}"</p>
      <div className={styles.cardDivider}></div>
      <div className={styles.cardFooter}>
        <span className={styles.roleBadge}>{roleText}</span>
      </div>
    </div>
  );
}

// Vertical infinite marquee scroller with smart CSS hover pause
export function ReviewColumn({ reviews, durationClass = "", className = "" }) {
  // Triple the content array to ensure seamless visual loop with no dead zones
  const columnContent = [...reviews, ...reviews, ...reviews];

  return (
    <div className={`${styles.reviewColumn} ${className}`}>
      <div className={`${styles.columnTrack} ${styles[durationClass]}`}>
        {columnContent.map((review, idx) => (
          <ReviewCard key={`${review.id || idx}-${idx}`} review={review} />
        ))}
      </div>
    </div>
  );
}



export default function PatientReviews({
  reviews,
  badgeText = "Member Reviews",
  title = "What Our Members Say",
  subtitle = "Real stories from founders, creators, and teams about their workspace experience at CoWorkIn."
}) {
  const sectionRef = useRef(null);

  // Adapt to input array or load gorgeous defaults
  const reviewsToRender = reviews?.length > 0 ? reviews : defaultReviews;

  // Split reviews into 1, 2, and 3 columns for balanced scrollers on responsive viewports
  const reviews1Col = splitArray(reviewsToRender, 1);
  const reviews2Col = splitArray(reviewsToRender, 2);
  const reviews3Col = splitArray(reviewsToRender, 3);

  return (
    <section ref={sectionRef} className={styles.testimonialsSection} id="testimonials">
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>{badgeText}</span>

          <h2 className={`${styles.title} font-headline text-4xl md:text-5xl lg:text-7xl font-bold text-text-primary tracking-tight mb-8`}>
            {title}
          </h2>

          <p className={`${styles.subtitle} font-body text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mt-4`}>
            {subtitle}
          </p>
        </div>

        {/* 
          Main Grid Wrapper containing responsive marquee columns
        */}
        <div className={styles.gridWrapper}>
          
          {/* Mobile Only: 1 Scrolling Column */}
          <div className={styles.mobileOnly}>
            <ReviewColumn reviews={reviews1Col[0]} durationClass="marqueeDuration50" />
          </div>

          {/* Tablet Only: 2 Scrolling Columns */}
          <div className={styles.tabletOnly}>
            <ReviewColumn reviews={reviews2Col[0]} durationClass="marqueeDuration22" />
            <ReviewColumn 
              reviews={reviews2Col[1]} 
              durationClass="marqueeDuration20" 
              className={styles.columnShift20} 
            />
          </div>

          {/* Desktop Only: 3 Scrolling Columns */}
          <div className={styles.desktopOnly}>
            <ReviewColumn reviews={reviews3Col[0]} durationClass="marqueeDuration15" />
            <ReviewColumn 
              reviews={reviews3Col[1]} 
              durationClass="marqueeDuration12" 
              className={styles.columnShift32} 
            />
            <ReviewColumn 
              reviews={reviews3Col[2]} 
              durationClass="marqueeDuration8" 
              className={styles.columnShift10} 
            />
          </div>

        </div>
      </div>



    </section>
  );
}
