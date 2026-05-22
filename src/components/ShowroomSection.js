"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./ShowroomSection.module.css";

export default function ShowroomSection() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "pass"
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [successBooking, setSuccessBooking] = useState(false);

  const workspaces = [
    {
      id: "hot-desk",
      title: "Hot Desk Access",
      tag: "NOMADS & FREELANCERS",
      image: "/images/hot_desk.png",
      description: "Access any open seat in our warm, plant-filled common zones. Ideal for individual builders.",
      monthlyPrice: "$250",
      passPrice: "$19",
      priceUnit: { monthly: "/mo", pass: "/day" },
      amenities: ["High-speed Wi-Fi 6", "Unlimited barista espresso", "Ergonomic shared desks"],
      popular: true,
    },
    {
      id: "private-suite",
      title: "Private Suite",
      tag: "SCALING TEAMS",
      image: "/images/private_office.png",
      description: "A fully furnished, soundproofed glass office for teams of 1 to 8. Complete physical privacy.",
      monthlyPrice: "$850",
      passPrice: "$75",
      priceUnit: { monthly: "/mo", pass: "/day" },
      amenities: ["Biometric lock system", "Acoustic wall panels", "Dedicated whiteboard & TV"],
      popular: false,
    },
    {
      id: "meeting-space",
      title: "Meeting Room",
      tag: "COLLABORATION",
      image: "/images/meeting_room.png",
      description: "State-of-the-art conference and podcast rooms equipped with elite collaboration tech.",
      monthlyPrice: "$320",
      passPrice: "$45",
      priceUnit: { monthly: "/10h pack", pass: "/hr" },
      amenities: ["4K studio smart displays", "Professional studio microphones", "Adjustable climate zones"],
      popular: false,
    },
    {
      id: "cafe-pass",
      title: "Lounge & Cafe Pass",
      tag: "CASUAL BUILDERS",
      image: "/images/cafe_amenity.png",
      description: "Work from our premium designer lounge directly connected to our in-house micro-roastery.",
      monthlyPrice: "$99",
      passPrice: "$12",
      priceUnit: { monthly: "/mo", pass: "/day" },
      amenities: ["Premium artisan coffee", "Plush modular lounge seats", "Weekly networking events"],
      popular: false,
    },
  ];

  const handleBook = (workspace) => {
    setSelectedWorkspace(workspace);
    setSuccessBooking(false);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    setSuccessBooking(true);
    setTimeout(() => {
      setSelectedWorkspace(null);
      setSuccessBooking(false);
    }, 2500);
  };

  return (
    <section className={styles.section} id="showroom">
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>CHOOSE YOUR ENVIRONMENT</span>
          <h2 className={styles.title}>Workspaces tailored to your daily flow</h2>
          <p className={styles.subtitle}>
            Select the setup that fuels your momentum. All tiers feature hyper-secure networks, 
            premium barista-crafted coffee, and full access to our creative events calendar.
          </p>

          {/* Billing Cycle Toggle */}
          <div className={styles.toggleContainer}>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`${styles.toggleBtn} ${billingCycle === "monthly" ? styles.toggleActive : ""}`}
            >
              Monthly Residency
            </button>
            <button
              onClick={() => setBillingCycle("pass")}
              className={`${styles.toggleBtn} ${billingCycle === "pass" ? styles.toggleActive : ""}`}
            >
              Daily & Hourly Passes
            </button>
          </div>
        </div>

        {/* Workspaces Grid */}
        <div className={styles.grid}>
          {workspaces.map((space) => {
            const price = billingCycle === "monthly" ? space.monthlyPrice : space.passPrice;
            const unit = billingCycle === "monthly" ? space.priceUnit.monthly : space.priceUnit.pass;

            return (
              <div 
                key={space.id} 
                className={`${styles.card} ${space.popular ? styles.cardPopular : ""}`}
              >
                {space.popular && <span className={styles.popularBadge}>MOST SELECTED</span>}
                <div className={styles.imageWrapper}>
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className={styles.image}
                    priority={space.popular}
                  />
                </div>
                
                <div className={styles.cardBody}>
                  <span className={styles.cardTag}>{space.tag}</span>
                  <h3 className={styles.cardTitle}>{space.title}</h3>
                  
                  <div className={styles.priceContainer}>
                    <span className={styles.priceNumber}>{price}</span>
                    <span className={styles.priceUnit}>{unit}</span>
                  </div>

                  <p className={styles.cardDescription}>{space.description}</p>

                  <ul className={styles.amenityList}>
                    {space.amenities.map((amenity, i) => (
                      <li key={i} className={styles.amenityItem}>
                        <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {amenity}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleBook(space)}
                    className={space.popular ? styles.btnPrimary : styles.btnSecondary}
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Premium Amenities & Tech Grid */}
        <div className={styles.amenitiesSection}>
          <div className={styles.amenitiesHeader}>
            <span className={styles.eyebrow}>INFRASTRUCTURE & INTEGRITY</span>
            <h3 className={styles.amenitiesTitle}>The CoWorkIn Standard</h3>
          </div>
          
          <div className={styles.amenitiesGrid}>
            <div className={styles.amenityCard}>
              <div className={styles.amenityIconWrapper}>
                <svg className={styles.amenityIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className={styles.amenityCardTitle}>Enterprise Network</h4>
              <p className={styles.amenityCardText}>
                Dual ISP failover setup running on dedicated symmetrical fiber with smart bandwidth distribution.
              </p>
              <div className={styles.networkStatus}>
                <span className={styles.pulseDot}></span>
                <span className={styles.statusText}>980 Mbps / Symmetrical Online</span>
              </div>
            </div>

            <div className={styles.amenityCard}>
              <div className={styles.amenityIconWrapper}>
                <svg className={styles.amenityIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className={styles.amenityCardTitle}>Micro-Roastery & Cafe</h4>
              <p className={styles.amenityCardText}>
                Enjoy unlimited barista-poured espresso and coffee selections roasted weekly in-house.
              </p>
              <div className={styles.badgeLine}>
                <span className={styles.coffeeBadge}>Organic Beans</span>
              </div>
            </div>

            <div className={styles.amenityCard}>
              <div className={styles.amenityIconWrapper}>
                <svg className={styles.amenityIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className={styles.amenityCardTitle}>Biometric Security</h4>
              <p className={styles.amenityCardText}>
                24/7 keyless secure vault entry via encrypted mobile app credentials or touch biometrics.
              </p>
              <div className={styles.badgeLine}>
                <span className={styles.secureBadge}>Fully Compliant</span>
              </div>
            </div>

            <div className={styles.amenityCard}>
              <div className={styles.amenityIconWrapper}>
                <svg className={styles.amenityIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className={styles.amenityCardTitle}>Expert Communities</h4>
              <p className={styles.amenityCardText}>
                Join curated expert roundtables, creator feedback sessions, and pitch nights every Tuesday.
              </p>
              <div className={styles.badgeLine}>
                <span className={styles.eventBadge}>Next: May 26</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Booking Drawer */}
        {selectedWorkspace && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button onClick={() => setSelectedWorkspace(null)} className={styles.closeBtn}>×</button>
              
              {!successBooking ? (
                <form onSubmit={submitBooking} className={styles.modalForm}>
                  <span className={styles.modalEyebrow}>SECURE YOUR SPACE</span>
                  <h3 className={styles.modalTitle}>Request Booking for {selectedWorkspace.title}</h3>
                  <p className={styles.modalText}>
                    Fill in your details below and a site host will verify real-time availability in under 15 minutes.
                  </p>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Full Name</label>
                    <input required type="text" className={styles.input} placeholder="Jane Doe" />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Work Email</label>
                    <input required type="email" className={styles.input} placeholder="jane@company.com" />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Access Period</label>
                    <select className={styles.input}>
                      {billingCycle === "monthly" ? (
                        <>
                          <option>1 Month Residency</option>
                          <option>3 Months Residency (5% off)</option>
                          <option>12 Months Residency (12% off)</option>
                        </>
                      ) : (
                        <>
                          <option>Single Day Pass</option>
                          <option>5-Day Bundle Pass</option>
                          <option>Single Hourly Booking</option>
                        </>
                      )}
                    </select>
                  </div>

                  <button type="submit" className={styles.modalSubmit}>
                    Submit Request
                  </button>
                </form>
              ) : (
                <div className={styles.successWrapper}>
                  <div className={styles.successIconWrapper}>
                    <svg className={styles.successIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Request Received!</h3>
                  <p className={styles.successText}>
                    We have reserved your draft slot. A community host will text or email you in a moment!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
