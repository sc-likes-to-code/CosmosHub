import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// ── SVG Artwork Generator ─────────────────────────────────────
function generateSvgArtwork({ transparent = false, paddingScale = 1.0 } = {}) {
  // If paddingScale < 1, scale inner art from center (256, 256) for maskable safe zones
  const transform = paddingScale !== 1.0
    ? `transform="translate(256 256) scale(${paddingScale}) translate(-256 -256)"`
    : '';

  const backgroundRect = transparent
    ? ''
    : `<rect width="512" height="512" rx="104" fill="url(#cosmicBg)" />
       <rect width="512" height="512" rx="104" fill="url(#starfieldGlow)" />
       <circle cx="256" cy="256" r="230" stroke="url(#borderGlow)" stroke-width="1.5" fill="none" opacity="0.6"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradients -->
    <radialGradient id="cosmicBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#0a152e"/>
      <stop offset="55%" stop-color="#060c1b"/>
      <stop offset="100%" stop-color="#03060c"/>
    </radialGradient>
    <radialGradient id="starfieldGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#63b3ed" stop-opacity="0.18"/>
      <stop offset="45%" stop-color="#a78bfa" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#04080f" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="borderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#63b3ed" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#a78bfa" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.3"/>
    </linearGradient>

    <!-- Celestial & Orbital Gradients -->
    <linearGradient id="orbitCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="40%" stop-color="#63b3ed"/>
      <stop offset="85%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
    <linearGradient id="orbitViolet" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="50%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>

    <!-- Singularity Core Gradients -->
    <radialGradient id="singularityAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#7dd3fc"/>
      <stop offset="55%" stop-color="#38bdf8" stop-opacity="0.8"/>
      <stop offset="80%" stop-color="#a78bfa" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#04080f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="coreBlackHole" cx="42%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#020409"/>
      <stop offset="70%" stop-color="#04080f"/>
      <stop offset="100%" stop-color="#091224"/>
    </radialGradient>

    <!-- Filters for High-Tech Bloom -->
    <filter id="bloomSoft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="bloomIntense" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="16" result="blur1"/>
      <feGaussianBlur stdDeviation="6" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur1"/>
        <feMergeNode in="blur2"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  ${backgroundRect}

  <g ${transform}>
    <!-- Outer Telemetry Reticle -->
    <circle cx="256" cy="256" r="208" stroke="#63b3ed" stroke-width="1" stroke-dasharray="4 14" opacity="0.25" fill="none"/>
    <circle cx="256" cy="256" r="192" stroke="#a78bfa" stroke-width="0.8" opacity="0.18" fill="none"/>

    <!-- Cardinal Coordinates Ticks -->
    <line x1="256" y1="44" x2="256" y2="58" stroke="#38bdf8" stroke-width="2" opacity="0.7"/>
    <line x1="256" y1="454" x2="256" y2="468" stroke="#38bdf8" stroke-width="2" opacity="0.7"/>
    <line x1="44" y1="256" x2="58" y2="256" stroke="#38bdf8" stroke-width="2" opacity="0.7"/>
    <line x1="454" y1="256" x2="468" y2="256" stroke="#38bdf8" stroke-width="2" opacity="0.7"/>

    <!-- Subtle Deep Space Micro Stars -->
    <circle cx="118" cy="142" r="1.5" fill="#ffffff" opacity="0.6"/>
    <circle cx="398" cy="122" r="1.8" fill="#7dd3fc" opacity="0.7"/>
    <circle cx="132" cy="382" r="1.2" fill="#a78bfa" opacity="0.5"/>
    <circle cx="384" cy="374" r="1.6" fill="#ffffff" opacity="0.65"/>
    <circle cx="210" cy="98" r="1" fill="#7dd3fc" opacity="0.4"/>
    <circle cx="330" cy="410" r="1" fill="#c084fc" opacity="0.5"/>

    <!-- Atmospheric Singularity Glow -->
    <circle cx="256" cy="256" r="130" fill="url(#singularityAura)" filter="url(#bloomIntense)"/>

    <!-- ── ORBIT 1: The Sweeping "C" Orbital Arc (Inclined -32deg) ── -->
    <g transform="rotate(-32 256 256)">
      <!-- Back Orbital Path (Subtle Shadow) -->
      <ellipse cx="256" cy="256" rx="180" ry="74" fill="none" stroke="#04080f" stroke-width="14" opacity="0.6"/>
      <!-- Glow Underlay -->
      <ellipse cx="256" cy="256" rx="180" ry="74" fill="none" stroke="url(#orbitCyan)" stroke-width="12" opacity="0.3" filter="url(#bloomSoft)"/>
      <!-- Main Core Arc -->
      <ellipse cx="256" cy="256" rx="180" ry="74" fill="none" stroke="url(#orbitCyan)" stroke-width="6.5" stroke-linecap="round" stroke-dasharray="900 120" stroke-dashoffset="60"/>
      <!-- Inner High-Velocity Filament -->
      <ellipse cx="256" cy="256" rx="180" ry="74" fill="none" stroke="#e0f2fe" stroke-width="1.8" opacity="0.9" stroke-linecap="round" stroke-dasharray="350 200" stroke-dashoffset="80"/>
      <!-- Telemetry Probe Node A -->
      <circle cx="76" cy="256" r="6" fill="#38bdf8" filter="url(#bloomSoft)"/>
      <circle cx="76" cy="256" r="3" fill="#ffffff"/>
      <circle cx="76" cy="256" r="12" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.5"/>
    </g>

    <!-- ── ORBIT 2: Intersecting Counter-Orbit "H" Bridge (Inclined 38deg) ── -->
    <g transform="rotate(38 256 256)">
      <!-- Glow Underlay -->
      <ellipse cx="256" cy="256" rx="166" ry="68" fill="none" stroke="url(#orbitViolet)" stroke-width="10" opacity="0.28" filter="url(#bloomSoft)"/>
      <!-- Main Violet Arc -->
      <ellipse cx="256" cy="256" rx="166" ry="68" fill="none" stroke="url(#orbitViolet)" stroke-width="5.5" stroke-linecap="round" stroke-dasharray="820 140" stroke-dashoffset="40"/>
      <!-- Core Light Filament -->
      <ellipse cx="256" cy="256" rx="166" ry="68" fill="none" stroke="#f5d0fe" stroke-width="1.6" opacity="0.85" stroke-linecap="round" stroke-dasharray="300 240" stroke-dashoffset="110"/>
      <!-- Telemetry Probe Node B -->
      <circle cx="422" cy="256" r="5" fill="#c084fc" filter="url(#bloomSoft)"/>
      <circle cx="422" cy="256" r="2.5" fill="#ffffff"/>
      <circle cx="422" cy="256" r="10" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.45"/>
    </g>

    <!-- ── THE SINGULARITY / EVENT HORIZON ── -->
    <!-- Accretion Lens Halo -->
    <circle cx="256" cy="256" r="62" fill="none" stroke="url(#orbitCyan)" stroke-width="3" opacity="0.85" filter="url(#bloomSoft)"/>
    <circle cx="256" cy="256" r="54" fill="url(#coreBlackHole)" stroke="#38bdf8" stroke-width="1.8"/>

    <!-- Central Event Horizon Aperture (Cosmic Eye) -->
    <circle cx="256" cy="256" r="28" fill="#020408"/>
    <circle cx="256" cy="256" r="22" fill="none" stroke="url(#orbitViolet)" stroke-width="1.5" opacity="0.7"/>

    <!-- Stellar Pulsar Core Point -->
    <circle cx="256" cy="256" r="9" fill="#ffffff" filter="url(#bloomSoft)"/>
    <circle cx="256" cy="256" r="5" fill="#f0f9ff"/>

    <!-- Diffraction Spikes (4-Point Pulsar Flare) -->
    <path d="M256 216 L258 254 L296 256 L258 258 L256 296 L254 258 L216 256 L254 254 Z" fill="url(#orbitCyan)" opacity="0.9" filter="url(#bloomSoft)"/>
    <path d="M256 230 L257 255 L282 256 L257 257 L256 282 L255 257 L230 256 L255 255 Z" fill="#ffffff" opacity="0.95"/>
  </g>
</svg>`;
}

async function main() {
  console.log('Generating CosmosHub "The Orbital Singularity" Brand Assets...');

  // 1. Master SVG (full branding)
  const fullSvg = generateSvgArtwork({ transparent: false, paddingScale: 1.0 });
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), fullSvg, 'utf8');

  // 2. Transparent SVG (for UI headers, components, overlays)
  const markSvg = generateSvgArtwork({ transparent: true, paddingScale: 1.0 });
  fs.writeFileSync(path.join(publicDir, 'logo-mark.svg'), markSvg, 'utf8');

  // 3. Maskable SVG (safe zone scaled 0.8 for Android rounded/squircle icons)
  const maskableSvg = generateSvgArtwork({ transparent: false, paddingScale: 0.8 });
  fs.writeFileSync(path.join(publicDir, 'logo-maskable.svg'), maskableSvg, 'utf8');

  // 4. Favicon SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), markSvg, 'utf8');

  // Generate PNGs using Sharp
  const svgBuffer = Buffer.from(fullSvg);
  const maskableBuffer = Buffer.from(maskableSvg);

  // PWA 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✓ Created pwa-192x192.png');

  // PWA 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✓ Created pwa-512x512.png');

  // Maskable 512x512
  await sharp(maskableBuffer)
    .resize(512, 512)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('✓ Created pwa-maskable-512x512.png');

  // Apple Touch Icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created apple-touch-icon.png');

  // Favicon PNG 32x32 and 16x16
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('✓ Created favicon-32x32.png & favicon-16x16.png');

  // Favicon ICO (standard 32x32 png saved as ico or direct sharp)
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✓ Created favicon.ico');

  console.log('All brand assets successfully generated in /public!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
