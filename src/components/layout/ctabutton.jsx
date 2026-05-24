"use client";

import React from "react";
import styles from "./ctabutton.module.css";

export default function CtaButton({ text = "Book Tour", href = "#contact", className = "" }) {
  return (
    <a href={href} className={`${styles.ctaButton} ${className}`}>
      {text}
    </a>
  );
}
