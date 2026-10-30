import React from 'react'

export default function CosmosLogo({ size = 36, glow = true, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`cosmos-logo-svg ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        filter: glow ? 'drop-shadow(0 0 8px rgba(99, 179, 237, 0.45))' : 'none',
      }}
      aria-label="CosmosHub Logo"
      role="img"
    >
      <defs>
        <radialGradient id="cl-singularityAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#7dd3fc" />
          <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#a78bfa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#04080f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cl-orbitCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#63b3ed" />
          <stop offset="85%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="cl-orbitViolet" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <radialGradient id="cl-coreBlackHole" cx="42%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#020409" />
          <stop offset="70%" stopColor="#04080f" />
          <stop offset="100%" stopColor="#091224" />
        </radialGradient>
      </defs>

      {/* Outer Telemetry Reticle */}
      <circle cx="256" cy="256" r="208" stroke="#63b3ed" strokeWidth="2.5" strokeDasharray="4 14" opacity="0.4" fill="none" />
      <circle cx="256" cy="256" r="192" stroke="#a78bfa" strokeWidth="1.5" opacity="0.3" fill="none" />

      {/* Cardinal Ticks */}
      <line x1="256" y1="44" x2="256" y2="60" stroke="#38bdf8" strokeWidth="3" opacity="0.8" />
      <line x1="256" y1="452" x2="256" y2="468" stroke="#38bdf8" strokeWidth="3" opacity="0.8" />
      <line x1="44" y1="256" x2="60" y2="256" stroke="#38bdf8" strokeWidth="3" opacity="0.8" />
      <line x1="452" y1="256" x2="468" y2="256" stroke="#38bdf8" strokeWidth="3" opacity="0.8" />

      {/* Singularity Aura Glow */}
      <circle cx="256" cy="256" r="120" fill="url(#cl-singularityAura)" />

      {/* Orbit 1: "C" Sweeping Arc */}
      <g transform="rotate(-32 256 256)" className="cosmos-orbit-primary">
        <ellipse cx="256" cy="256" rx="180" ry="74" fill="none" stroke="url(#cl-orbitCyan)" strokeWidth="12" opacity="0.35" />
        <ellipse cx="256" cy="256" rx="180" ry="74" fill="none" stroke="url(#cl-orbitCyan)" strokeWidth="7" strokeLinecap="round" strokeDasharray="900 120" strokeDashoffset="60" />
        <ellipse cx="256" cy="256" rx="180" ry="74" fill="none" stroke="#e0f2fe" strokeWidth="2.2" opacity="0.9" strokeLinecap="round" strokeDasharray="350 200" strokeDashoffset="80" />
        {/* Satellite node */}
        <circle cx="76" cy="256" r="6" fill="#38bdf8" />
        <circle cx="76" cy="256" r="3" fill="#ffffff" />
      </g>

      {/* Orbit 2: "H" Intersecting Arc */}
      <g transform="rotate(38 256 256)" className="cosmos-orbit-secondary">
        <ellipse cx="256" cy="256" rx="166" ry="68" fill="none" stroke="url(#cl-orbitViolet)" strokeWidth="10" opacity="0.3" />
        <ellipse cx="256" cy="256" rx="166" ry="68" fill="none" stroke="url(#cl-orbitViolet)" strokeWidth="6" strokeLinecap="round" strokeDasharray="820 140" strokeDashoffset="40" />
        <ellipse cx="256" cy="256" rx="166" ry="68" fill="none" stroke="#f5d0fe" strokeWidth="2" opacity="0.85" strokeLinecap="round" strokeDasharray="300 240" strokeDashoffset="110" />
        {/* Satellite node */}
        <circle cx="422" cy="256" r="5" fill="#c084fc" />
        <circle cx="422" cy="256" r="2.5" fill="#ffffff" />
      </g>

      {/* The Event Horizon Core */}
      <circle cx="256" cy="256" r="62" fill="none" stroke="url(#cl-orbitCyan)" strokeWidth="4" opacity="0.9" />
      <circle cx="256" cy="256" r="54" fill="url(#cl-coreBlackHole)" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="256" cy="256" r="28" fill="#020408" />
      <circle cx="256" cy="256" r="22" fill="none" stroke="url(#cl-orbitViolet)" strokeWidth="2" opacity="0.75" />

      {/* Central Pulsar Star & Diffraction Flares */}
      <path d="M256 216 L258 254 L296 256 L258 258 L256 296 L254 258 L216 256 L254 254 Z" fill="url(#cl-orbitCyan)" opacity="0.95" />
      <path d="M256 230 L257 255 L282 256 L257 257 L256 282 L255 257 L230 256 L255 255 Z" fill="#ffffff" opacity="0.95" />
      <circle cx="256" cy="256" r="7" fill="#ffffff" />
    </svg>
  )
}
