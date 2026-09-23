import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const assetsDir = path.join(root, "src/assets/images");

function wrapStudioSvg(content, title = "", badge = "") {
  return `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="60%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#edf2f7" />
    </radialGradient>

    <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.22" />
      <stop offset="50%" stop-color="#334155" stop-opacity="0.09" />
      <stop offset="100%" stop-color="#64748b" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="metalChrome" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="25%" stop-color="#cbd5e1" />
      <stop offset="50%" stop-color="#94a3b8" />
      <stop offset="75%" stop-color="#e2e8f0" />
      <stop offset="100%" stop-color="#64748b" />
    </linearGradient>

    <linearGradient id="whitePolymer" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="60%" stop-color="#f1f5f9" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </linearGradient>

    <linearGradient id="blackPolymer" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="60%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <linearGradient id="solarCell" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#172554" />
    </linearGradient>

    <linearGradient id="strobeRed" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="50%" stop-color="#b91c1c" />
      <stop offset="100%" stop-color="#7f1d1d" />
    </linearGradient>

    <linearGradient id="lensGlass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>

    <filter id="objectShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.14" />
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.08" />
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#bgGlow)" />
  <rect width="800" height="800" fill="none" stroke="#e2e8f0" stroke-width="2" />
  <ellipse cx="400" cy="670" rx="270" ry="42" fill="url(#groundShadow)" />

  <g filter="url(#objectShadow)">
    ${content}
  </g>

  <g opacity="0.85">
    <rect x="36" y="36" width="130" height="28" rx="6" fill="#46454a" />
    <text x="101" y="55" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">GENUINE PART</text>
  </g>

  ${
    badge
      ? `
  <g opacity="0.95">
    <rect x="634" y="36" width="130" height="28" rx="6" fill="#7dba25" />
    <text x="699" y="55" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#1e293b" text-anchor="middle" letter-spacing="0.5">${badge}</text>
  </g>
  `
      : ""
  }
</svg>
  `.trim();
}

const newPartGraphics = {
  // 1. part-ha-01: Zigbee & Matter Smart Hub
  "part-ha-01": {
    badge: "ZIGBEE 3.0",
    svg: `
      <g transform="translate(240, 240)">
        <!-- Hub Base Chassis (Rounded Square) -->
        <rect x="0" y="0" width="320" height="320" rx="48" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="5" />
        <rect x="15" y="15" width="290" height="290" rx="38" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />

        <!-- Subtle Top Bevel Inset -->
        <rect x="40" y="40" width="240" height="240" rx="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />

        <!-- Status Light Ring -->
        <circle cx="160" cy="160" r="48" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="3" />
        <circle cx="160" cy="160" r="38" fill="none" stroke="#7dba25" stroke-width="6" opacity="0.9" />
        <circle cx="160" cy="160" r="18" fill="#46454a" />

        <!-- Smart Network Logo Marks -->
        <path d="M 160,118 A 42,42 0 0,1 190,132" fill="none" stroke="#7dba25" stroke-width="3" stroke-linecap="round" />
        <path d="M 160,106 A 54,54 0 0,1 198,124" fill="none" stroke="#7dba25" stroke-width="3" stroke-linecap="round" opacity="0.6" />

        <!-- Ports Indicator on Top Edge -->
        <rect x="110" y="0" width="40" height="12" rx="3" fill="#64748b" />
        <rect x="170" y="0" width="40" height="12" rx="3" fill="#334155" />
        <circle cx="230" cy="6" r="4" fill="#94a3b8" />
      </g>
    `,
  },

  // 2. part-ha-02: Smart 4-Gang Keypad Switch
  "part-ha-02": {
    badge: "4-GANG SCENE",
    svg: `
      <g transform="translate(245, 235)">
        <!-- Switch Wall Frame -->
        <rect x="0" y="0" width="310" height="310" rx="28" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="5" />
        <rect x="12" y="12" width="286" height="286" rx="20" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />

        <!-- 4 Tactile Rocker Buttons -->
        <!-- Button 1 (Top Left: Sun / Morning) -->
        <rect x="22" y="22" width="128" height="128" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" />
        <circle cx="86" cy="86" r="18" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
        <path d="M 86,54 L 86,60 M 86,112 L 86,118 M 54,86 L 60,86 M 112,86 L 118,86" stroke="#ca8a04" stroke-width="3" stroke-linecap="round" />

        <!-- Button 2 (Top Right: Night / Moon) -->
        <rect x="160" y="22" width="128" height="128" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" />
        <path d="M 230,70 A 20,20 0 1,1 210,102 A 16,16 0 0,0 230,70 Z" fill="#94a3b8" stroke="#475569" stroke-width="2" />

        <!-- Button 3 (Bottom Left: Blinds Up) -->
        <rect x="22" y="160" width="128" height="128" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" />
        <path d="M 86,72 L 68,96 L 104,96 Z" fill="#46454a" transform="translate(0, 140)" />
        <rect x="80" y="236" width="12" height="24" rx="2" fill="#46454a" />

        <!-- Button 4 (Bottom Right: Blinds Down) -->
        <rect x="160" y="160" width="128" height="128" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" />
        <path d="M 224,104 L 206,80 L 242,80 Z" fill="#7dba25" transform="translate(0, 140)" />
        <rect x="218" y="200" width="12" height="24" rx="2" fill="#7dba25" />

        <!-- Central LED indicator -->
        <circle cx="155" cy="155" r="5" fill="#7dba25" />
      </g>
    `,
  },

  // 3. part-ha-03: Solar Ambient Light & Temperature Sensor
  "part-ha-03": {
    badge: "SOLAR SENSOR",
    svg: `
      <g transform="translate(260, 210)">
        <!-- Suction Cup / Glass Bracket Behind -->
        <ellipse cx="140" cy="80" rx="90" ry="35" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="8 6" opacity="0.7" />
        <circle cx="140" cy="80" r="24" fill="#cbd5e1" stroke="#64748b" stroke-width="3" />

        <!-- Main Sensor Capsule Housing -->
        <rect x="40" y="90" width="200" height="300" rx="42" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="5" />
        <rect x="52" y="102" width="176" height="276" rx="34" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />

        <!-- Top Solar Panel Array -->
        <rect x="64" y="118" width="152" height="110" rx="16" fill="url(#solarCell)" stroke="#1e3a8a" stroke-width="3" />
        <!-- Photovoltaic Grid Lines -->
        <line x1="114" y1="118" x2="114" y2="228" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
        <line x1="166" y1="118" x2="166" y2="228" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
        <line x1="64" y1="173" x2="216" y2="173" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />

        <!-- Ambient Light Sensor Lens (Domed photodiode) -->
        <circle cx="140" cy="275" r="32" fill="url(#lensGlass)" stroke="#38bdf8" stroke-width="3" />
        <circle cx="134" cy="268" r="8" fill="#ffffff" opacity="0.7" />

        <!-- Temperature Vents -->
        <line x1="90" y1="335" x2="190" y2="335" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
        <line x1="105" y1="348" x2="175" y2="348" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
      </g>
    `,
  },

  // 4. part-sec-01: 2K Solar Security Camera
  "part-sec-01": {
    badge: "2K SOLAR CCTV",
    svg: `
      <g transform="translate(200, 200)">
        <!-- Top Solar Panel Unit -->
        <g transform="translate(30, 20) rotate(-12, 180, 40)">
          <rect x="40" y="0" width="280" height="90" rx="14" fill="url(#solarCell)" stroke="#0284c7" stroke-width="3" />
          <!-- Solar cell grid -->
          <line x1="110" y1="0" x2="110" y2="90" stroke="#38bdf8" stroke-width="2" opacity="0.5" />
          <line x1="180" y1="0" x2="180" y2="90" stroke="#38bdf8" stroke-width="2" opacity="0.5" />
          <line x1="250" y1="0" x2="250" y2="90" stroke="#38bdf8" stroke-width="2" opacity="0.5" />
          <line x1="40" y1="45" x2="320" y2="45" stroke="#38bdf8" stroke-width="2" opacity="0.5" />
          <!-- Connecting Bracket Arm -->
          <rect x="170" y="85" width="20" height="45" rx="4" fill="url(#metalChrome)" stroke="#475569" stroke-width="2" />
        </g>

        <!-- Camera Body Cylindrical Bullet -->
        <g transform="translate(60, 130)">
          <path d="M 60,60 L 220,60 C 240,60 255,75 255,95 L 255,235 C 255,255 240,270 220,270 L 60,270 C 40,270 25,255 25,235 L 25,95 C 25,75 40,60 60,60 Z" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="4" />

          <!-- Front Piano Black Faceplate -->
          <rect x="40" y="75" width="200" height="180" rx="24" fill="url(#blackPolymer)" stroke="#0f172a" stroke-width="3" />

          <!-- Spotlight LED Array on Top of Faceplate -->
          <rect x="90" y="90" width="100" height="24" rx="6" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />

          <!-- Main 2K Ultra Lens -->
          <circle cx="140" cy="170" r="42" fill="url(#lensGlass)" stroke="#38bdf8" stroke-width="3" />
          <circle cx="140" cy="170" r="22" fill="#0f172a" stroke="#0284c7" stroke-width="2" />
          <circle cx="132" cy="162" r="7" fill="#ffffff" opacity="0.8" />

          <!-- PIR Dome below Lens -->
          <circle cx="140" cy="230" r="14" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />

          <!-- Microphone & Status Dot -->
          <circle cx="85" cy="170" r="4" fill="#7dba25" />
          <circle cx="195" cy="170" r="3" fill="#64748b" />
        </g>

        <!-- Wall Mount Swivel Base -->
        <g transform="translate(160, 390)">
          <rect x="25" y="10" width="30" height="60" rx="8" fill="url(#metalChrome)" stroke="#475569" stroke-width="3" />
          <ellipse cx="40" cy="70" rx="55" ry="18" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        </g>
      </g>
    `,
  },

  // 5. part-sec-02: Window & Door Magnetic Contact Sensor Pair
  "part-sec-02": {
    badge: "WINDOW SENSOR",
    svg: `
      <g transform="translate(220, 220)">
        <!-- Transmitter Main Unit (Left) -->
        <g transform="translate(20, 30)">
          <rect x="0" y="0" width="140" height="310" rx="28" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="4" />
          <rect x="12" y="12" width="116" height="286" rx="20" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />

          <!-- LED Signal Indicator -->
          <circle cx="70" cy="50" r="8" fill="#7dba25" stroke="#4f781b" stroke-width="2" />
          <circle cx="68" cy="48" r="3" fill="#ffffff" opacity="0.8" />

          <!-- Alignment Arrow Notch on Right Edge -->
          <path d="M 134,145 L 140,155 L 134,165 Z" fill="#94a3b8" />

          <!-- TDC Brand Mark Subtext -->
          <rect x="40" y="240" width="60" height="12" rx="3" fill="#cbd5e1" />
        </g>

        <!-- Magnetic Reed Bar (Right) -->
        <g transform="translate(200, 70)">
          <rect x="0" y="0" width="70" height="230" rx="22" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="4" />
          <rect x="10" y="10" width="50" height="210" rx="15" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />

          <!-- Matching Alignment Arrow Notch on Left Edge -->
          <path d="M 6,105 L 0,115 L 6,125 Z" fill="#94a3b8" />

          <!-- Internal Magnet Silhouette Indicator -->
          <rect x="22" y="55" width="26" height="120" rx="8" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2" />
        </g>
      </g>
    `,
  },

  // 6. part-sec-03: Outdoor Solar Warning Siren with Strobe
  "part-sec-03": {
    badge: "115DB SIREN",
    svg: `
      <g transform="translate(230, 200)">
        <!-- Siren Main Housing (Trapezoid Box) -->
        <path d="M 50,70 L 290,70 L 320,380 L 20,380 Z" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="5" />
        <path d="M 65,85 L 275,85 L 300,365 L 40,365 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />

        <!-- Top Angled Solar Panel -->
        <g transform="translate(65, 95)">
          <rect x="10" y="0" width="190" height="85" rx="10" fill="url(#solarCell)" stroke="#0284c7" stroke-width="3" />
          <line x1="73" y1="0" x2="73" y2="85" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
          <line x1="136" y1="0" x2="136" y2="85" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
          <line x1="10" y1="42" x2="200" y2="42" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
        </g>

        <!-- Red Translucent Strobe Lens Array -->
        <g transform="translate(65, 200)">
          <rect x="10" y="0" width="190" height="70" rx="12" fill="url(#strobeRed)" stroke="#991b1b" stroke-width="3" />
          <!-- Faceted prism cuts -->
          <line x1="30" y1="0" x2="30" y2="70" stroke="#fca5a5" stroke-width="2" opacity="0.5" />
          <line x1="60" y1="0" x2="60" y2="70" stroke="#fca5a5" stroke-width="2" opacity="0.5" />
          <line x1="90" y1="0" x2="90" y2="70" stroke="#fca5a5" stroke-width="2" opacity="0.5" />
          <line x1="120" y1="0" x2="120" y2="70" stroke="#fca5a5" stroke-width="2" opacity="0.5" />
          <line x1="150" y1="0" x2="150" y2="70" stroke="#fca5a5" stroke-width="2" opacity="0.5" />
          <line x1="180" y1="0" x2="180" y2="70" stroke="#fca5a5" stroke-width="2" opacity="0.5" />
        </g>

        <!-- Acoustic Horn Speaker Grille -->
        <g transform="translate(90, 290)">
          <ellipse cx="80" cy="40" rx="70" ry="25" fill="#334155" stroke="#1e293b" stroke-width="3" />
          <line x1="30" y1="35" x2="130" y2="35" stroke="#64748b" stroke-width="3" />
          <line x1="40" y1="45" x2="120" y2="45" stroke="#64748b" stroke-width="3" />
        </g>
      </g>
    `,
  },

  // 7. part-sec-04: Pet-Immune PIR Motion Detector
  "part-sec-04": {
    badge: "PET IMMUNE",
    svg: `
      <g transform="translate(250, 220)">
        <!-- Wall Swivel Bracket behind -->
        <path d="M 120,40 L 180,40 L 165,110 L 135,110 Z" fill="url(#metalChrome)" stroke="#64748b" stroke-width="3" />
        <ellipse cx="150" cy="40" rx="40" ry="12" fill="#94a3b8" />

        <!-- PIR Sensor Main Body Housing -->
        <path d="M 60,70 L 240,70 C 265,70 280,90 280,115 L 260,310 C 260,335 240,350 215,350 L 85,350 C 60,350 40,335 40,310 L 20,115 C 20,90 35,70 60,70 Z" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="5" />

        <!-- Segmented Fresnel Convex Lens Array -->
        <g transform="translate(60, 115)">
          <rect x="0" y="0" width="180" height="150" rx="22" fill="#f8fafc" stroke="#94a3b8" stroke-width="3" />
          
          <!-- Fresnel Facet Matrix -->
          <!-- Row 1 -->
          <rect x="12" y="12" width="46" height="36" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2" />
          <rect x="67" y="12" width="46" height="36" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2" />
          <rect x="122" y="12" width="46" height="36" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2" />

          <!-- Row 2 -->
          <rect x="12" y="56" width="46" height="36" rx="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
          <rect x="67" y="56" width="46" height="36" rx="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
          <rect x="122" y="56" width="46" height="36" rx="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />

          <!-- Row 3 -->
          <rect x="12" y="100" width="46" height="36" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2" />
          <rect x="67" y="100" width="46" height="36" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2" />
          <rect x="122" y="100" width="46" height="36" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2" />
        </g>

        <!-- Status Pulse LED -->
        <circle cx="150" cy="295" r="7" fill="#7dba25" stroke="#4f781b" stroke-width="2" />
        <circle cx="148" cy="293" r="2.5" fill="#ffffff" opacity="0.8" />
      </g>
    `,
  },
};

console.log("Generating 7 new high-res studio PNG assets in src/assets/images/...");
await fs.mkdir(assetsDir, { recursive: true });

for (const [partId, { svg, badge }] of Object.entries(newPartGraphics)) {
  const fullSvg = wrapStudioSvg(svg, partId, badge);
  const targetPng = path.join(assetsDir, `${partId}.png`);

  await sharp(Buffer.from(fullSvg))
    .resize(800, 800)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(targetPng);

  console.log(`✓ Rendered ${partId}.png (800x800)`);
}

console.log("All 7 new parts PNG images generated successfully!");
