"use client";

import React from "react";
import styles from "./founderspen.module.css";

export default function FoundersPen() {
  return (
    <section className={styles.foundersPenSection} id="founders-pen">
      <div className={styles.foundersPenContainer}>
        <div className={styles.gridWrapper}>
          
          {/* Left Column: Founder Portrait */}
          <div className={styles.imageColumn}>
            <div className={styles.imageFrame}>
              <img
                src="/images/founder.png"
                alt="Vikram Aditya - Founder of CoWorkIn"
                className={styles.founderImage}
              />
              <div className={styles.imageOverlayBorder}></div>
            </div>
          </div>

          {/* Right Column: Letter / Vision */}
          <div className={styles.contentColumn}>
            <span className={styles.eyebrow}>Founders Pen</span>
            <h2 className={styles.title}>Shaping the Future of Collaborative Work</h2>
            
            <div className={styles.divider}></div>
            
            <div className={styles.letterContent}>
              <p>
                CoWorkIn was born out of a simple realization: the spaces we occupy shape the ideas we generate. 
                We didn&apos;t want to build just another shared office. We set out to design a living, breathing ecosystem 
                where founders, creators, and corporate teams can intersect, collaborate, and transcend traditional boundaries.
              </p>
              <p>
                Every detail in our spaces—from the layout of our open lounges that encourage spontaneous discussions, 
                to the state-of-the-art acoustics in our private suites—is crafted to spark your next big breakthrough.
              </p>
              <p>
                We believe that the future of work isn&apos;t just about high-speed internet and hot desks; it&apos;s about 
                the magic that happens when diverse minds gather under one roof. Welcome to the future of collaborative work.
              </p>
            </div>

            <div className={styles.founderSignature}>
              <h4 className={styles.founderName}>Sagar Sethi</h4>
              <p className={styles.founderRole}>Founder & CEO, CoWorkIn</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
