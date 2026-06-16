"use client";

import React from "react";
import styles from "./perks.module.css";

const perksData = [
  {
    id: "perk-1",
    title: "1 Gbps Fiber Internet",
    description: "Ultra-fast, secure, and redundant enterprise-grade Wi-Fi to keep your workflows completely seamless.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    )
  },
  {
    id: "perk-2",
    title: "24/7 Global Access",
    description: "Work on your own terms. Seamless keycard access to all locations, day or night.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    id: "perk-3",
    title: "Artisanal Coffee & Lounges",
    description: "Unlimited micro-roasted espresso, premium teas, and styled spaces to refresh your mind.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    )
  },
  {
    id: "perk-4",
    title: "Curated Community Events",
    description: "Weekly networking panels, founder mixers, and skill-sharing sessions to grow your circle.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    id: "perk-5",
    title: "High-End Meeting Rooms",
    description: "Fully-equipped spaces with 4K displays, high-end audio, and smart boards for perfect pitches.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    id: "perk-6",
    title: "Flexible Membership plans",
    description: "From daily passes to private corporate suites—scale your space effortlessly as you build.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  }
];

export default function PerksSection() {
  return (
    <section className={styles.perksSection} id="perks">
      <div className={styles.perksContainer}>
        <div className={styles.perksHeader}>
          <span className={styles.perksEyebrow}>What We Offer</span>
          <h2 className={styles.perksTitle}>Everything You Need To Build</h2>
          <p className={styles.perksSubtitle}>
            A curated ecosystem designed to maximize focus, creativity, and connection for modern teams.
          </p>
        </div>

        <div className={styles.perksGrid}>
          {perksData.map((perk) => (
            <div key={perk.id} className={styles.perkCard} id={perk.id}>
              <div className={styles.perkIconWrapper}>
                {perk.icon}
              </div>
              <h3 className={styles.perkCardTitle}>{perk.title}</h3>
              <p className={styles.perkCardDescription}>{perk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
