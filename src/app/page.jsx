import React from "react";
import Navbar from "../components/layout/navbar";
import Hero from "../components/herosection/hero";
import Locations from "../components/locations/locations";
import Gallery from "../components/gallery/gallery";
import FAQSection from "../components/faqs/faq";
import TestimonialsSection from "../components/testimonials/testimonials";
import Footer from "../components/layout/footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <Locations />
        <Gallery />
        <TestimonialsSection />
        <FAQSection />
      </main>

      <Footer />

    </div>
  );
}
