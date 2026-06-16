"use client";

import React from "react";
import styles from "./ctabutton.module.css";

export default function CtaButton({ 
  text = "Book Tour", 
  href = "https://wa.me/9828072172?text=Hi!%20I%20am%20interested%20in%20booking%20a%20tour%20at%20CoWorkIn.", 
  className = "",
  ...props
}) {
  const isExternal = href.startsWith("http") || href.startsWith("https") || href.startsWith("//");

  return (
    <a 
      href={href} 
      className={`${styles.ctaButton} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {text}
    </a>
  );
}
