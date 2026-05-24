import React from "react";
import Navbar from "../components/layout/navbar";
import Hero from "../components/herosection/hero";
import Locations from "../components/locations/locations";
import Gallery from "../components/gallery/gallery";
import FAQSection from "../components/faqs/faq";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <Locations />
        <Gallery />
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
              <a href="#locations">Hot Desk</a>
              <a href="#locations">Private Suite</a>
              <a href="#locations">Meeting Room</a>
              <a href="#locations">Lounge Cafe</a>
            </div>
            <div className={styles.footerLinkCol}>
              <h5 className={styles.footerColTitle}>Company</h5>
              <a href="#locations">About Us</a>
              <a href="#locations">Careers</a>
              <a href="#locations">Press</a>
              <a href="#locations">Contact</a>
            </div>
            <div className={styles.footerLinkCol}>
              <h5 className={styles.footerColTitle}>Legal</h5>
              <a href="#locations">Privacy Policy</a>
              <a href="#locations">Terms of Service</a>
              <a href="#locations">House Rules</a>
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
