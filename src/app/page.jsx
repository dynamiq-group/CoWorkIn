import React from "react";
import Navbar from "../components/layout/navbar";
import Hero from "../components/herosection/hero";
import Locations from "../components/locations/locations";
import FoundersPen from "../components/founderspen/founderspen";
import Gallery from "../components/gallery/gallery";
import PerksSection from "../components/perks/perks";
import TestimonialsSection from "../components/testimonials/testimonials";
import FAQSection from "../components/faqs/faq";
import Footer from "../components/layout/footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <Locations />
        <PerksSection />
        <Gallery />
        <FoundersPen />
        <TestimonialsSection />
        <FAQSection />
      </main>

      <Footer />

    </div>
  );
}
