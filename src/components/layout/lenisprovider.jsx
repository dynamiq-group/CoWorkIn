"use client";

import React from "react";
import { ReactLenis } from "lenis/react";

export default function LenisProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        smoothTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
