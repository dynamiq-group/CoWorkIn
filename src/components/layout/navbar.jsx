"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./navbar.module.css";
import CtaButton from "./ctabutton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for sticky header backdrop styling
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Smart Hide/Show behavior
      if (currentScrollY < 80) {
        // Always show navbar at the absolute top of the page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> hide navbar (only if mobile menu is not active)
        if (!mobileMenuOpen) {
          setIsVisible(false);
        }
      } else {
        // Scrolling up -> drop down navbar
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <header className={`${styles.navBar} ${isScrolled ? styles.scrolled : ""} ${!isVisible ? styles.hidden : ""}`}>
      <div className={styles.navContainer}>
        {/* Brand Logo & Icon */}
        <a href="#" className={styles.logoWrapper}>
          <Image
            src="/images/CoWorkIn.png"
            alt="CoWorkIn Logo"
            width={200}
            height={60}
            className={styles.logoImage}
            priority
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className={styles.navLinks}>
          <a href="#locations" className={styles.navLink}>
            Locations
          </a>
          <a href="#gallery" className={styles.navLink}>
            Gallery
          </a>
          <a href="#about" className={styles.navLink}>
            About
          </a>
          <a href="#contact" className={styles.navLink}>
            Contact
          </a>
        </nav>

        {/* Desktop CTA Button */}
        <div className={styles.navActions}>
          <CtaButton />
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
            href="#locations"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Locations
          </a>
          <a
            href="#gallery"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
          </a>
          <a
            href="#about"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
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
