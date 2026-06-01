"use client";

import React, { useState } from "react";
import styles from "./faq.module.css";

const faqData = [
  {
    id: 1,
    question: "What amenities are included in the coworking space?",
    answer: "Every membership includes access to ultra-fast fiber internet (up to 1Gbps), fully-equipped meeting rooms, unlimited micro-roasted coffee, premium tea, artisanal snacks, phone booths for private calls, business-class printing, and daily professional cleaning."
  },
  {
    id: 2,
    question: "Can I use the coworking space on weekends and after hours?",
    answer: "Yes! Residents and private office members enjoy secure 24/7 keycard access to the facility. For hot desk members, our general operating hours are Monday through Friday, 8:00 AM to 7:00 PM."
  },
  {
    id: 3,
    question: "How do I book meeting rooms, and is there an additional cost?",
    answer: "Meeting rooms can be easily reserved via our CoWorkIn member app or portal. Depending on your membership plan, you receive monthly booking credits. Additional hours can be booked at a discounted member rate of $25/hour."
  },
  {
    id: 4,
    question: "Are there any networking or community events held at the coworking space?",
    answer: "Absolutely! We host weekly community happy hours, expert panels, breakfast socials, and workshops designed to connect you with fellow founders, freelancers, and investors in the space."
  },
  {
    id: 5,
    question: "Can I bring guests or clients to the coworking space?",
    answer: "Yes, you are welcome to bring guests or clients for meetings. Guests must sign in at the front desk and can stay in your booked meeting room or the lounge area for up to two hours."
  },
  {
    id: 6,
    question: "Is parking available at the coworking space?",
    answer: "We offer secure on-site underground parking for members. Dedicated parking spaces can be added to your monthly membership, and there is also validated visitor parking for your clients."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <h2 className={styles.faqTitle}>FAQs</h2>
        <div className={styles.faqList}>
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={item.id} 
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
              >
                <button 
                  className={styles.faqQuestionRow} 
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.faqQuestion}>{item.question}</span>
                  <span className={styles.faqIconWrapper}>
                    <svg 
                      className={styles.faqIcon} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      {/* Down-right arrow matching the screenshot ↘ */}
                      <line x1="7" y1="7" x2="17" y2="17"></line>
                      <polyline points="17 7 17 17 7 17"></polyline>
                    </svg>
                  </span>
                </button>
                <div 
                  className={styles.faqAnswerWrapper}
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr"
                  }}
                >
                  <div className={styles.faqAnswer}>
                    <p className={styles.faqAnswerText}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
