import React from "react";
import ShowroomSection from "../components/ShowroomSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      
      {/* Sticky Header Nav Bar */}
      <header className={styles.navBar}>
        <div className={styles.navContainer}>
          <div className={styles.logoWrapper}>
            <span className={styles.logoDot}></span>
            <span className={styles.logoText}>CoWorkIn</span>
          </div>
          
          <nav className={styles.nav}>
            <a href="#showroom" className={styles.navLink}>Workspaces</a>
            <a href="#amenities" className={styles.navLink}>Amenities</a>
            <a href="#events" className={styles.navLink}>Community</a>
            <a href="#locations" className={styles.navLink}>Locations</a>
          </nav>

          <div className={styles.navActions}>
            <a href="#showroom" className={styles.navBtnSecondary}>Sign In</a>
            <a href="#showroom" className={styles.navBtnPrimary}>Book Tour</a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className={styles.main}>
        
        {/* Placeholder Hero Section - To be fully constructed in the next step */}
        <section className={styles.heroPlaceholder}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>NOW OPEN IN 12 CITIES</span>
            <h1 className={styles.heroTitle}>
              Where collective genius builds the future.
            </h1>
            <p className={styles.heroSubtitle}>
              A network of high-fidelity, warm-designed workspace environments engineered 
              for deep focus, seamless collaboration, and elite networking.
            </p>
            <div className={styles.heroCtas}>
              <a href="#showroom" className={styles.heroBtnPrimary}>Explore Workspaces</a>
              <a href="#showroom" className={styles.heroBtnSecondary}>View Live Status</a>
            </div>
          </div>
          <div className={styles.heroVisualPlaceholder}>
            <div className={styles.heroDottedPattern}></div>
            <span className={styles.heroPlaceholderText}>[ Premium Hero Visual To Be Constructed Here ]</span>
          </div>
        </section>

        {/* Workspace Showroom Section - Active */}
        <ShowroomSection />

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
