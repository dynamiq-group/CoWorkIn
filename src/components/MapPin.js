import React from 'react';

/**
 * MapPin - A highly optimized, high-fidelity SVG Map Pin icon component.
 * Designed with distinct SVG layers, customizable colors, and precise transform origins 
 * (12px, 22px for the pin/shadow; 12px, 10px for the inner circle) to support smooth, 
 * realistic bounce, squash-and-stretch, and inner-pulse animations.
 */
const MapPin = ({ 
  size = 22, 
  className = "", 
  style = {}, 
  pinColor = "currentColor", 
  innerColor = "#ff4f00" /* Default matches the Zapier orange badge background */
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ 
        display: 'inline-block', 
        verticalAlign: 'middle', 
        overflow: 'visible',
        ...style 
      }}
    >
      {/* Pin Shadow/Pulse Base */}
      <ellipse 
        cx="12" 
        cy="22" 
        rx="5" 
        ry="1.5" 
        fill={pinColor} 
        opacity="0.3"
        className="pin-shadow"
        style={{
          transformOrigin: '12px 22px',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
      />
      
      {/* Main Pin Geometry */}
      <g 
        className="pin-geom"
        style={{
          transformOrigin: '12px 22px',
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Pin Drop Outer Outline & Fill */}
        <path
          d="M12 2C7.58 2 4 5.58 4 10c0 4.5 5 10.5 8 12 3-1.5 8-7.5 8-12 0-4.42-3.58-8-8-8z"
          fill={pinColor}
        />
        
        {/* Pin Inner Circle (Large contrasting core) */}
        <circle
          cx="12"
          cy="10"
          r="4.5"
          fill={innerColor}
          className="pin-inner"
          style={{
            transformOrigin: '12px 10px',
            transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </g>
    </svg>
  );
};

export default MapPin;
