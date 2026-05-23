"use client";

import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.navBar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* Brand Logo & Icon */}
        <a href="#" className={styles.logoWrapper}>
          <svg
            className={styles.logoIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant shield/crown geometric shape resembling the reference image */}
            <path d="M12 3L3.5 8V16L12 21L20.5 16V8L12 3ZM12 5.5L18.5 9.3V14.7L12 18.5L5.5 14.7V9.3L12 5.5ZM12 8.5C10.6 8.5 9.5 9.6 9.5 11C9.5 12.4 10.6 13.5 12 13.5C13.4 13.5 14.5 12.4 14.5 11C14.5 9.6 13.4 8.5 12 8.5Z" />
          </svg>
          <span className={styles.logoText}>CoWorkIn</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>
            About
          </a>
          <a href="#showroom" className={styles.navLink}>
            Spaces
          </a>
          <a href="#locations" className={styles.navLink}>
            Locations
          </a>
          <a href="#contact" className={styles.navLink}>
            Contact
          </a>
        </nav>

        {/* Desktop CTA Button */}
        <div className={styles.navActions}>
          <a href="#contact" className={styles.ctaButton}>
            Book Tour
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""
          }`}
      >
        <nav className={styles.mobileNavLinks}>
          <a
            href="#about"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#showroom"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Spaces
          </a>
          <a
            href="#locations"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Locations
          </a>
          <a
            href="#contact"
            className={styles.mobileCtaButton}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
