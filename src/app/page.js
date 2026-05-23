import React from "react";
import Navbar from "../components/layout/navbar";
import Hero from "../components/herosection/hero";
import ShowroomSection from "../components/ShowroomSection";
import FAQSection from "../components/faqs/faq";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <ShowroomSection />
        <FAQSection />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <div className={styles.logoWrapper}>
              <span className={styles.logoDot}></span>
              <span className={styles.logoText}>CoWorkIn</span>
            </div>
            <p className={styles.footerBrandText}>
              Premium shared environments and private suites for scaling builders.
            </p>
          </div>

          <div className={styles.footerLinksGrid}>
            <div className={styles.footerLinkCol}>
              <h5 className={styles.footerColTitle}>Spaces</h5>
              <a href="#showroom">Hot Desk</a>
              <a href="#showroom">Private Suite</a>
              <a href="#showroom">Meeting Room</a>
              <a href="#showroom">Lounge Cafe</a>
            </div>
            <div className={styles.footerLinkCol}>
              <h5 className={styles.footerColTitle}>Company</h5>
              <a href="#showroom">About Us</a>
              <a href="#showroom">Careers</a>
              <a href="#showroom">Press</a>
              <a href="#showroom">Contact</a>
            </div>
            <div className={styles.footerLinkCol}>
              <h5 className={styles.footerColTitle}>Legal</h5>
              <a href="#showroom">Privacy Policy</a>
              <a href="#showroom">Terms of Service</a>
              <a href="#showroom">House Rules</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 CoWorkIn Inc. Inspired by the warm design language of Zapier.</p>
        </div>
      </footer>

    </div>
  );
}
