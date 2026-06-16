"use client";

import React from "react";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.stickyFooterWrapper}>
      <footer className={styles.footerContainer} id="contact">
        <div className={styles.footerContent}>
        
        {/* Left Branding & Cinematic Statement Column */}
        <div className={styles.brandCol}>
          <p className={styles.statementText}>
            We design premium shared environments and private suites that foster deep focus, 
            collaborative synergy, and architectural craft, translating your scaling vision into 
            impact that lasts.
          </p>
          <a 
            href="https://wa.me/9828072172?text=Hi!%20I%20am%20interested%20in%20booking%20a%20tour%20at%20CoWorkIn." 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.speakToUsLink}
          >
            <span className={styles.speakLabel}>SPEAK TO US</span>
            <div className={styles.arrowCircle}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.speakArrowIcon}
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </a>
        </div>

        {/* Middle Navigation Column */}
        <div className={styles.navCol}>
          <span className={styles.colHeader}>NAVIGATION</span>
          <nav className={styles.navLinksList}>
            <a href="#locations" className={styles.massiveNavLink}>LOCATIONS</a>
            <a href="#gallery" className={styles.massiveNavLink}>GALLERY</a>
            <a href="#reviews" className={styles.massiveNavLink}>REVIEWS</a>
            <a href="#contact" className={styles.massiveNavLink}>CONTACT</a>
          </nav>
        </div>

        {/* Contact Information Column */}
        <div className={styles.contactCol}>
          <span className={styles.colHeader}>CONTACT</span>
          <div className={styles.contactDetails}>
            <a href="mailto:coworkinjaipur@gmail.com" className={styles.emailLink}>
              coworkinjaipur@gmail.com
            </a>
            <p className={styles.addressText}>
              CoworkIn Space Solutions Pvt. Ltd.<br />
              “Manoram”<br />
              #2, Ambeshwar Colony New Sanganer Road<br />
              Jaipur, Rajasthan, (302019).<br />
            </p>
          </div>
        </div>

        {/* Connect Social Column & Watermark */}
        <div className={styles.connectCol}>
          <span className={styles.colHeader}>CONNECT</span>
          <div className={styles.socialAndWatermark}>
            <div className={styles.socialRow}>
              {/* Instagram Block */}
              <a href="https://www.instagram.com/coworkinjaipur" target="_blank" rel="noopener noreferrer" className={styles.socialBox} aria-label="Instagram">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* LinkedIn Block */}
              <a href="https://www.linkedin.com/company/coworkinjaipur" target="_blank" rel="noopener noreferrer" className={styles.socialBox} aria-label="LinkedIn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              {/* Facebook Block */}
              <a href="https://www.facebook.com/coworkinjaipur" target="_blank" rel="noopener noreferrer" className={styles.socialBox} aria-label="Facebook">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Divider Line */}
      <div className={styles.footerDivider}></div>

      {/* Bottom Legal row */}
      <div className={styles.bottomRow}>
        <span className={styles.copyrightText}>
          © 2026 COPYRIGHT. ALL RIGHTS RESERVED.
        </span>
        <div className={styles.legalLinks}>
          <a href="#cookies">COOKIE POLICY</a>
          <a href="#preferences">COOKIE PREFERENCES</a>
          <span className={styles.authorTag}>WEBSITE BY DYNAMIQ GROUP.</span>
        </div>
      </div>

      {/* Massive Brand Title Banner spanning across viewport width */}
      <div className={styles.massiveBrandBanner}>
        COWORKIN
      </div>
    </footer>
  </div>
);
}
