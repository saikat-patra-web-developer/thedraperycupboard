import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const assetsDir = path.join(root, "src/assets/images");

/**
 * Creates studio background SVG wrapper with soft radial lighting and ground shadow
 */
function wrapStudioSvg(content, title = "", badge = "") {
  return `
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Studio backdrop gradient -->
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="60%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#edf2f7" />
    </radialGradient>

    <!-- Ground reflection shadow -->
    <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.22" />
      <stop offset="50%" stop-color="#334155" stop-opacity="0.09" />
      <stop offset="100%" stop-color="#64748b" stop-opacity="0" />
    </radialGradient>

    <!-- Material Shaders -->
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

    <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#eab308" />
      <stop offset="80%" stop-color="#ca8a04" />
      <stop offset="100%" stop-color="#854d0e" />
    </linearGradient>

    <linearGradient id="limeAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7dba25" />
      <stop offset="100%" stop-color="#4f781b" />
    </linearGradient>

    <!-- Soft drop shadow filter -->
    <filter id="objectShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.14" />
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="800" fill="url(#bgGlow)" />
  <rect width="800" height="800" fill="none" stroke="#e2e8f0" stroke-width="2" />

  <!-- Ground Contact Shadow -->
  <ellipse cx="400" cy="670" rx="270" ry="42" fill="url(#groundShadow)" />

  <!-- Rendered Object with Shadow -->
  <g filter="url(#objectShadow)">
    ${content}
  </g>

  <!-- Corner Watermark / Spec Tag -->
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

/**
 * 23 Detailed Part Graphic Visuals
 */
const partGraphics = {
  // 1. part-rb-01: 38mm Heavy Duty Roller Clutch
  "part-rb-01": {
    badge: "38MM FIT",
    svg: `
      <!-- Barrel Splines -->
      <g transform="translate(180, 240)">
        <rect x="180" y="80" width="220" height="180" rx="8" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="3" />
        <!-- Spline Ribs -->
        <rect x="200" y="65" width="18" height="210" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
        <rect x="240" y="65" width="18" height="210" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
        <rect x="280" y="65" width="18" height="210" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
        <rect x="320" y="65" width="18" height="210" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
        <rect x="360" y="65" width="18" height="210" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />

        <!-- Main Clutch Head -->
        <circle cx="150" cy="170" r="115" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        <circle cx="150" cy="170" r="92" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3" />
        <circle cx="150" cy="170" r="54" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3" />
        
        <!-- Center Axle Pin -->
        <circle cx="150" cy="170" r="22" fill="url(#metalChrome)" stroke="#475569" stroke-width="2" />
        <rect x="144" y="150" width="12" height="40" rx="2" fill="#334155" />

        <!-- Ball Chain Loop -->
        <path d="M 85,240 C 65,340 70,440 95,490 C 115,530 145,530 165,490 C 190,440 195,340 175,240" fill="none" stroke="url(#metalChrome)" stroke-width="12" stroke-dasharray="10 6" stroke-linecap="round" />
        
        <!-- Gear Teeth Indicators -->
        <circle cx="150" cy="170" r="82" fill="none" stroke="#64748b" stroke-width="4" stroke-dasharray="6 8" />
      </g>
    `,
  },

  // 2. part-rb-02: 32mm Roller Clutch
  "part-rb-02": {
    badge: "32MM FIT",
    svg: `
      <g transform="translate(190, 250)">
        <!-- 32mm Barrel -->
        <rect x="170" y="95" width="210" height="150" rx="6" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="3" />
        <!-- Splines -->
        <rect x="190" y="80" width="15" height="180" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
        <rect x="230" y="80" width="15" height="180" rx="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
        <rect x="270" y="80" width="15" height="180" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
        <rect x="310" y="80" width="15" height="180" rx="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
        <rect x="350" y="80" width="15" height="180" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />

        <!-- Clutch Head -->
        <circle cx="140" cy="170" r="98" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        <circle cx="140" cy="170" r="76" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3" />
        <circle cx="140" cy="170" r="42" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3" />
        <circle cx="140" cy="170" r="18" fill="url(#metalChrome)" stroke="#475569" stroke-width="2" />

        <!-- White Resin Chain Loop -->
        <path d="M 80,230 C 60,320 65,420 90,470 C 110,510 135,510 155,470 C 180,420 185,320 165,230" fill="none" stroke="#f8fafc" stroke-width="12" stroke-dasharray="8 6" stroke-linecap="round" />
      </g>
    `,
  },

  // 3. part-rb-03: Heavy Duty Mounting Brackets Pair
  "part-rb-03": {
    badge: "PAIR SET",
    svg: `
      <!-- Left Bracket (Control End) -->
      <g transform="translate(140, 220)">
        <path d="M 20,40 L 160,40 C 175,40 185,50 185,65 L 185,280 C 185,295 175,305 160,305 L 20,305 Z" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        <!-- Projection Arm -->
        <path d="M 185,130 L 260,130 C 275,130 285,140 285,155 L 285,250 C 285,265 275,275 260,275 L 185,275 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4" />
        <!-- Star / Cross Mounting Slot -->
        <rect x="220" y="175" width="28" height="55" rx="6" fill="#334155" />
        <rect x="207" y="188" width="54" height="28" rx="6" fill="#334155" />
        <!-- Fixing Holes -->
        <circle cx="65" cy="85" r="14" fill="#334155" />
        <circle cx="65" cy="260" r="14" fill="#334155" />
      </g>

      <!-- Right Bracket (Idle End) -->
      <g transform="translate(420, 260)">
        <path d="M 20,40 L 160,40 C 175,40 185,50 185,65 L 185,280 C 185,295 175,305 160,305 L 20,305 Z" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        <!-- Projection Arm -->
        <path d="M 185,130 L 260,130 C 275,130 285,140 285,155 L 285,250 C 285,265 275,275 260,275 L 185,275 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4" />
        <!-- Round Pin Hole -->
        <circle cx="235" cy="202" r="20" fill="#334155" />
        <!-- Fixing Holes -->
        <circle cx="65" cy="85" r="14" fill="#334155" />
        <circle cx="65" cy="260" r="14" fill="#334155" />
      </g>
    `,
  },

  // 4. part-rb-04: Spring-Loaded Idler Pin End 38mm
  "part-rb-04": {
    badge: "RETRACTABLE",
    svg: `
      <g transform="translate(190, 260)">
        <!-- Ribbed Cylinder Plug -->
        <rect x="140" y="80" width="260" height="180" rx="8" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="3" />
        <rect x="170" y="65" width="20" height="210" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
        <rect x="230" y="65" width="20" height="210" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
        <rect x="290" y="65" width="20" height="210" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
        <rect x="350" y="65" width="20" height="210" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />

        <!-- Face Collar -->
        <rect x="100" y="60" width="40" height="220" rx="6" fill="#cbd5e1" stroke="#64748b" stroke-width="3" />

        <!-- Chrome Spring-Loaded Pin -->
        <rect x="20" y="145" width="80" height="50" rx="10" fill="url(#metalChrome)" stroke="#475569" stroke-width="3" />
        <circle cx="45" cy="170" r="16" fill="#94a3b8" />

        <!-- Spring icon lines inside shaft -->
        <path d="M 50,170 L 95,170" stroke="#334155" stroke-width="6" stroke-linecap="round" />
      </g>
    `,
  },

  // 5. part-rb-05: Dual Day/Night Double Bracket Set
  "part-rb-05": {
    badge: "DAY / NIGHT",
    svg: `
      <g transform="translate(180, 210)">
        <!-- Heavy Gauge Double Cantilever Plate -->
        <path d="M 40,40 L 140,40 L 140,420 L 40,420 Z" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        
        <!-- Top Arm (Sunscreen Position) -->
        <path d="M 140,80 L 320,80 C 340,80 350,95 350,115 L 350,200 C 350,220 340,235 320,235 L 140,235 Z" fill="#f1f5f9" stroke="#94a3b8" stroke-width="4" />
        <circle cx="280" cy="155" r="28" fill="#334155" />
        <rect x="274" y="130" width="12" height="50" fill="#64748b" />

        <!-- Bottom Arm (Blockout Position) -->
        <path d="M 140,260 L 420,260 C 440,260 450,275 450,295 L 450,380 C 450,400 440,415 420,415 L 140,415 Z" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        <circle cx="380" cy="335" r="28" fill="#334155" />
        <rect x="360" y="329" width="40" height="12" fill="#64748b" />

        <!-- Wall Mount Holes -->
        <circle cx="90" cy="80" r="14" fill="#334155" />
        <circle cx="90" cy="230" r="14" fill="#334155" />
        <circle cx="90" cy="380" r="14" fill="#334155" />
      </g>
    `,
  },

  // 6. part-rb-06: Tear-Drop Bottom Rail End Caps
  "part-rb-06": {
    badge: "PAIR CAPS",
    svg: `
      <!-- Left Cap -->
      <g transform="translate(190, 260)">
        <path d="M 50,70 C 130,70 180,130 180,210 C 180,290 130,330 50,330 C 20,330 0,310 0,280 L 0,120 C 0,90 20,70 50,70 Z" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        <!-- Insert Spigot -->
        <rect x="180" y="110" width="70" height="160" rx="6" fill="#cbd5e1" stroke="#64748b" stroke-width="3" />
        <!-- Rubber Bumper Dot -->
        <circle cx="45" cy="200" r="18" fill="#64748b" />
      </g>

      <!-- Right Cap -->
      <g transform="translate(430, 260)">
        <path d="M 130,70 C 50,70 0,130 0,210 C 0,290 50,330 130,330 C 160,330 180,310 180,280 L 180,120 C 180,90 160,70 130,70 Z" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        <!-- Insert Spigot -->
        <rect x="-70" y="110" width="70" height="160" rx="6" fill="#cbd5e1" stroke="#64748b" stroke-width="3" />
        <!-- Rubber Bumper Dot -->
        <circle cx="135" cy="200" r="18" fill="#64748b" />
      </g>
    `,
  },

  // 7. part-vn-01: Venetian Gear Cord Tilter
  "part-vn-01": {
    badge: "BRASS GEAR",
    svg: `
      <g transform="translate(220, 220)">
        <!-- Headrail Bracket Body -->
        <rect x="60" y="60" width="240" height="180" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="4" />
        
        <!-- Brass Worm Gear Window -->
        <circle cx="180" cy="150" r="62" fill="url(#brassGold)" stroke="#854d0e" stroke-width="3" />
        <circle cx="180" cy="150" r="44" fill="#ca8a04" stroke="#713f12" stroke-width="2" />
        <rect x="160" y="130" width="40" height="40" rx="6" fill="#fef08a" />

        <!-- Horizontal Shaft Receiver -->
        <rect x="20" y="135" width="40" height="30" rx="4" fill="url(#metalChrome)" stroke="#475569" stroke-width="2" />
        <rect x="300" y="135" width="40" height="30" rx="4" fill="url(#metalChrome)" stroke="#475569" stroke-width="2" />

        <!-- Braided Tilt Cords with Acorn Tassels -->
        <line x1="150" y1="240" x2="150" y2="440" stroke="#94a3b8" stroke-width="6" stroke-dasharray="6 3" />
        <line x1="210" y1="240" x2="210" y2="470" stroke="#94a3b8" stroke-width="6" stroke-dasharray="6 3" />
        
        <!-- Wood/Polymer Acorn Tassels -->
        <path d="M 135,440 L 165,440 L 158,490 C 155,505 145,505 142,490 Z" fill="url(#whitePolymer)" stroke="#64748b" stroke-width="3" />
        <path d="M 195,470 L 225,470 L 218,520 C 215,535 205,535 202,520 Z" fill="url(#whitePolymer)" stroke="#64748b" stroke-width="3" />
      </g>
    `,
  },

  // 8. part-vn-02: Clear Acrylic Venetian Tilt Wand
  "part-vn-02": {
    badge: "ACRYLIC",
    svg: `
      <g transform="translate(370, 140)">
        <!-- Chrome Swivel Hook at Top -->
        <path d="M 30,30 C 50,0 80,10 80,45 C 80,75 50,90 30,120 L 30,150" fill="none" stroke="url(#metalChrome)" stroke-width="12" stroke-linecap="round" />
        <circle cx="30" cy="155" r="14" fill="#475569" />

        <!-- Hexagonal Clear Wand Shaft -->
        <polygon points="12,165 48,165 48,560 12,560" fill="#e0f2fe" opacity="0.85" stroke="#7dd3fc" stroke-width="3" />
        <line x1="30" y1="165" x2="30" y2="560" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />

        <!-- Handle Grip at Base -->
        <rect x="6" y="560" width="48" height="70" rx="8" fill="#bae6fd" stroke="#0284c7" stroke-width="3" />
        <line x1="12" y1="580" x2="48" y2="580" stroke="#ffffff" stroke-width="3" />
        <line x1="12" y1="600" x2="48" y2="600" stroke="#ffffff" stroke-width="3" />
      </g>
    `,
  },

  // 9. part-vn-03: Venetian Hold Down Brackets Pair
  "part-vn-03": {
    badge: "PAIR",
    svg: `
      <!-- Left Sill Bracket -->
      <g transform="translate(190, 270)">
        <path d="M 20,40 L 120,40 C 135,40 145,50 145,65 L 145,180 L 190,180 C 205,180 215,190 215,205 L 215,260 L 20,260 Z" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        <!-- Retaining Stud / Pin -->
        <circle cx="175" cy="220" r="16" fill="url(#metalChrome)" stroke="#475569" stroke-width="3" />
        <!-- Screw Hole -->
        <circle cx="70" cy="100" r="15" fill="#334155" />
      </g>

      <!-- Right Sill Bracket -->
      <g transform="translate(420, 270)">
        <path d="M 195,40 L 95,40 C 80,40 70,50 70,65 L 70,180 L 25,180 C 10,180 0,190 0,205 L 0,260 L 195,260 Z" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        <!-- Retaining Stud / Pin -->
        <circle cx="40" cy="220" r="16" fill="url(#metalChrome)" stroke="#475569" stroke-width="3" />
        <!-- Screw Hole -->
        <circle cx="145" cy="100" r="15" fill="#334155" />
      </g>
    `,
  },

  // 10. part-vn-04: Heavy-Duty Venetian Cord Lock
  "part-vn-04": {
    badge: "BRASS ROLLER",
    svg: `
      <g transform="translate(230, 240)">
        <!-- Heavy Zinc / Chrome Housing -->
        <path d="M 30,30 L 280,30 C 300,30 310,45 310,65 L 310,230 C 310,250 295,265 275,265 L 30,265 Z" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        
        <!-- Knurled Brass Roller Wheel -->
        <circle cx="130" cy="145" r="55" fill="url(#brassGold)" stroke="#854d0e" stroke-width="3" />
        <!-- Knurling pattern -->
        <circle cx="130" cy="145" r="42" fill="#ca8a04" stroke="#713f12" stroke-width="2" stroke-dasharray="4 4" />
        <circle cx="130" cy="145" r="18" fill="#451a03" />

        <!-- Stationary Pin Guide -->
        <circle cx="235" cy="145" r="28" fill="url(#metalChrome)" stroke="#475569" stroke-width="3" />

        <!-- Cord Paths Exiting Bottom -->
        <line x1="175" y1="180" x2="165" y2="380" stroke="#64748b" stroke-width="8" stroke-dasharray="8 4" />
        <line x1="195" y1="180" x2="190" y2="380" stroke="#94a3b8" stroke-width="8" stroke-dasharray="8 4" />
      </g>
    `,
  },

  // 11. part-vt-01: Vertical Vane Top Hangers (Pack 20)
  "part-vt-01": {
    badge: "PACK OF 20",
    svg: `
      <g transform="translate(240, 200)">
        <!-- Stack of 3 Fanned Top Hangers -->
        <g transform="rotate(-12, 160, 240)">
          <rect x="60" y="100" width="200" height="240" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3" />
          <path d="M 160,40 C 120,40 120,95 160,100" fill="none" stroke="#64748b" stroke-width="12" stroke-linecap="round" />
        </g>
        <g transform="rotate(8, 160, 240)">
          <rect x="60" y="100" width="200" height="240" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="3" />
          <path d="M 160,40 C 120,40 120,95 160,100" fill="none" stroke="#64748b" stroke-width="12" stroke-linecap="round" />
        </g>
        <!-- Foremost Hanger -->
        <rect x="60" y="110" width="200" height="250" rx="8" fill="url(#whitePolymer)" stroke="#475569" stroke-width="4" />
        <!-- Precision Suspension Hook -->
        <path d="M 160,45 C 110,45 110,105 160,110" fill="none" stroke="url(#whitePolymer)" stroke-width="14" stroke-linecap="round" />
        <path d="M 160,45 C 110,45 110,105 160,110" fill="none" stroke="#475569" stroke-width="3" stroke-linecap="round" />
        
        <!-- Vane fabric slot -->
        <rect x="85" y="150" width="150" height="16" rx="4" fill="#cbd5e1" />
        <line x1="85" y1="200" x2="235" y2="200" stroke="#cbd5e1" stroke-width="4" />
        <line x1="85" y1="240" x2="235" y2="240" stroke="#cbd5e1" stroke-width="4" />
        <line x1="85" y1="280" x2="235" y2="280" stroke="#cbd5e1" stroke-width="4" />
      </g>
    `,
  },

  // 12. part-vt-02: Vertical Blind Bottom Weights (Pack 10)
  "part-vt-02": {
    badge: "PACK OF 10",
    svg: `
      <g transform="translate(220, 240)">
        <!-- Stack of Heavy Slotted Weights -->
        <g transform="translate(30, -30)">
          <rect x="60" y="80" width="240" height="250" rx="8" fill="#cbd5e1" stroke="#94a3b8" stroke-width="3" />
        </g>
        <g transform="translate(15, -15)">
          <rect x="60" y="80" width="240" height="250" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3" />
        </g>
        <!-- Topmost Weight -->
        <rect x="60" y="80" width="240" height="250" rx="8" fill="url(#whitePolymer)" stroke="#475569" stroke-width="4" />
        
        <!-- Side Chain Holding Ears -->
        <path d="M 35,115 C 35,100 55,100 60,115 L 60,145 C 55,160 35,160 35,145 Z" fill="#e2e8f0" stroke="#475569" stroke-width="3" />
        <circle cx="48" cy="130" r="6" fill="#334155" />

        <path d="M 325,115 C 325,100 305,100 300,115 L 300,145 C 305,160 325,160 325,145 Z" fill="#e2e8f0" stroke="#475569" stroke-width="3" />
        <circle cx="312" cy="130" r="6" fill="#334155" />

        <!-- Embossed Weight Texture -->
        <rect x="90" y="120" width="180" height="170" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
        <text x="180" y="215" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#94a3b8" text-anchor="middle">127mm</text>
      </g>
    `,
  },

  // 13. part-vt-03: Vertical Link Chain Roll (10m)
  "part-vt-03": {
    badge: "10M ROLL",
    svg: `
      <g transform="translate(200, 200)">
        <!-- Coiled Spool of Bead Chain -->
        <circle cx="200" cy="200" r="180" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        <circle cx="200" cy="200" r="140" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="14 12" />
        <circle cx="200" cy="200" r="100" fill="#ffffff" stroke="#94a3b8" stroke-width="4" stroke-dasharray="12 10" />
        <circle cx="200" cy="200" r="60" fill="url(#metalChrome)" stroke="#475569" stroke-width="4" />
        <circle cx="200" cy="200" r="28" fill="#1e293b" />

        <!-- Unfurling Chain with Clips -->
        <path d="M 200,20 C 320,20 400,100 400,220 L 400,380" fill="none" stroke="#475569" stroke-width="8" stroke-dasharray="10 8" stroke-linecap="round" />
        
        <!-- Link Clips -->
        <rect x="385" y="260" width="30" height="20" rx="4" fill="#7dba25" />
        <rect x="385" y="320" width="30" height="20" rx="4" fill="#7dba25" />
      </g>
    `,
  },

  // 14. part-ct-01: Wheeled Track Gliders (Pack 30)
  "part-ct-01": {
    badge: "PACK OF 30",
    svg: `
      <g transform="translate(190, 220)">
        <!-- Dual Wheeled Carrier Unit 1 -->
        <g transform="translate(40, 20)">
          <!-- Left Wheel -->
          <circle cx="60" cy="90" r="45" fill="url(#whitePolymer)" stroke="#64748b" stroke-width="4" />
          <circle cx="60" cy="90" r="20" fill="url(#metalChrome)" stroke="#334155" stroke-width="3" />

          <!-- Right Wheel -->
          <circle cx="200" cy="90" r="45" fill="url(#whitePolymer)" stroke="#64748b" stroke-width="4" />
          <circle cx="200" cy="90" r="20" fill="url(#metalChrome)" stroke="#334155" stroke-width="3" />

          <!-- Central Bridge Axle -->
          <rect x="50" y="75" width="160" height="30" rx="6" fill="url(#metalChrome)" stroke="#334155" stroke-width="3" />

          <!-- Drop Eyelet Shank -->
          <path d="M 115,105 L 145,105 L 145,210 C 145,230 115,230 115,210 Z" fill="url(#whitePolymer)" stroke="#64748b" stroke-width="4" />
          <circle cx="130" cy="220" r="24" fill="#ffffff" stroke="#475569" stroke-width="5" />
        </g>

        <!-- Secondary Carrier Unit in Background -->
        <g transform="translate(180, 100) scale(0.85)" opacity="0.9">
          <circle cx="60" cy="90" r="45" fill="url(#whitePolymer)" stroke="#64748b" stroke-width="4" />
          <circle cx="200" cy="90" r="45" fill="url(#whitePolymer)" stroke="#64748b" stroke-width="4" />
          <rect x="50" y="75" width="160" height="30" rx="6" fill="url(#metalChrome)" stroke="#334155" stroke-width="3" />
          <circle cx="130" cy="220" r="24" fill="#ffffff" stroke="#475569" stroke-width="5" />
        </g>
      </g>
    `,
  },

  // 15. part-ct-02: 4-Prong Pinch Pleat Hooks
  "part-ct-02": {
    badge: "STAINLESS STEEL",
    svg: `
      <g transform="translate(250, 160)">
        <!-- 4 Prongs -->
        <path d="M 60,120 L 60,340 C 60,380 90,380 90,340 L 90,120" fill="none" stroke="url(#metalChrome)" stroke-width="14" stroke-linecap="round" />
        <path d="M 110,90 L 110,360 C 110,400 140,400 140,360 L 140,90" fill="none" stroke="url(#metalChrome)" stroke-width="14" stroke-linecap="round" />
        <path d="M 160,90 L 160,360 C 160,400 190,400 190,360 L 190,90" fill="none" stroke="url(#metalChrome)" stroke-width="14" stroke-linecap="round" />
        <path d="M 210,120 L 210,340 C 210,380 240,380 240,340 L 240,120" fill="none" stroke="url(#metalChrome)" stroke-width="14" stroke-linecap="round" />

        <!-- Central Suspension Shank / Hook -->
        <path d="M 150,260 L 150,470 C 150,510 180,510 180,470 L 180,410" fill="none" stroke="url(#metalChrome)" stroke-width="16" stroke-linecap="round" />
        
        <!-- Base Joining Bar -->
        <rect x="50" y="320" width="200" height="24" rx="6" fill="url(#metalChrome)" stroke="#334155" stroke-width="3" />
      </g>
    `,
  },

  // 16. part-ct-03: Double Curtain Track Brackets (Pack 3)
  "part-ct-03": {
    badge: "DOUBLE TRACK",
    svg: `
      <g transform="translate(190, 240)">
        <!-- Wall Mounting Backplate -->
        <path d="M 40,40 L 130,40 L 130,360 L 40,360 Z" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        
        <!-- Cantilever Dual Arm -->
        <rect x="130" y="110" width="290" height="36" rx="4" fill="url(#whitePolymer)" stroke="#94a3b8" stroke-width="4" />
        
        <!-- Front Track Clamp (Blackout) -->
        <path d="M 370,146 L 370,220 C 370,235 390,235 390,220 L 390,146 Z" fill="#e2e8f0" stroke="#475569" stroke-width="3" />
        <circle cx="380" cy="180" r="10" fill="#334155" />

        <!-- Rear Track Clamp (Sheer) -->
        <path d="M 220,146 L 220,220 C 220,235 240,235 240,220 L 240,146 Z" fill="#e2e8f0" stroke="#475569" stroke-width="3" />
        <circle cx="230" cy="180" r="10" fill="#334155" />

        <!-- Mounting Screw Holes -->
        <circle cx="85" cy="80" r="14" fill="#334155" />
        <circle cx="85" cy="320" r="14" fill="#334155" />
      </g>
    `,
  },

  // 17. part-mt-01: 25mm Tubular Motor Kit
  "part-mt-01": {
    badge: "RECHARGEABLE",
    svg: `
      <g transform="translate(150, 240)">
        <!-- Long Motor Cylinder -->
        <rect x="100" y="120" width="370" height="100" rx="8" fill="url(#blackPolymer)" stroke="#475569" stroke-width="3" />
        <rect x="140" y="120" width="280" height="100" fill="#1e293b" />
        
        <!-- Crown & Drive Wheel on Left -->
        <rect x="50" y="95" width="50" height="150" rx="8" fill="#475569" stroke="#334155" stroke-width="3" />
        <!-- Drive Wheel Teeth -->
        <rect x="20" y="105" width="30" height="130" rx="6" fill="#334155" />

        <!-- Motor Head on Right (Antenna & USB-C) -->
        <rect x="470" y="110" width="60" height="120" rx="8" fill="#0f172a" stroke="#475569" stroke-width="3" />
        <!-- Magnetic USB-C port -->
        <circle cx="500" cy="170" r="14" fill="url(#brassGold)" />
        <circle cx="500" cy="170" r="8" fill="#0f172a" />

        <!-- Setting Button with Green LED -->
        <circle cx="430" cy="170" r="10" fill="#7dba25" />
        
        <!-- Antenna Wire hanging -->
        <path d="M 530,170 C 580,180 560,260 590,320" fill="none" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round" />
        
        <text x="280" y="180" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#94a3b8" letter-spacing="2">TDC 25MM 1.1NM</text>
      </g>
    `,
  },

  // 18. part-mt-02: 15-Channel LCD Remote Control
  "part-mt-02": {
    badge: "15 CHANNEL",
    svg: `
      <g transform="translate(280, 160)">
        <!-- Sleek Remote Body -->
        <rect x="40" y="40" width="160" height="420" rx="28" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="4" />

        <!-- Backlit LCD Display -->
        <rect x="65" y="80" width="110" height="80" rx="10" fill="#0f172a" stroke="#334155" stroke-width="3" />
        <text x="120" y="132" font-family="monospace" font-size="32" font-weight="900" fill="#7dba25" text-anchor="middle">01</text>
        <text x="120" y="152" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#94a3b8" text-anchor="middle">CHANNEL</text>

        <!-- Up Button -->
        <circle cx="120" cy="210" r="28" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" />
        <polygon points="120,196 108,218 132,218" fill="#334155" />

        <!-- Stop Button -->
        <circle cx="120" cy="285" r="28" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" />
        <rect x="110" y="275" width="20" height="20" rx="3" fill="#334155" />

        <!-- Down Button -->
        <circle cx="120" cy="360" r="28" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" />
        <polygon points="120,374 108,352 132,352" fill="#334155" />

        <!-- Left / Right Channel Toggle Buttons -->
        <circle cx="85" cy="420" r="14" fill="#cbd5e1" />
        <circle cx="155" cy="420" r="14" fill="#cbd5e1" />
      </g>
    `,
  },

  // 19. part-mt-03: Smart Wi-Fi Bridge Gateway Hub
  "part-mt-03": {
    badge: "SMART WI-FI",
    svg: `
      <g transform="translate(250, 220)">
        <!-- Minimalist Square IoT Hub -->
        <rect x="40" y="40" width="220" height="220" rx="40" fill="url(#whitePolymer)" stroke="#cbd5e1" stroke-width="4" />
        
        <!-- Glowing Lime Center Status Ring -->
        <circle cx="150" cy="150" r="50" fill="#f8fafc" stroke="#7dba25" stroke-width="6" />
        
        <!-- Wi-Fi Wave Icon in Center -->
        <path d="M 125,130 C 140,115 160,115 175,130" fill="none" stroke="#7dba25" stroke-width="5" stroke-linecap="round" />
        <path d="M 135,145 C 145,135 155,135 165,145" fill="none" stroke="#7dba25" stroke-width="5" stroke-linecap="round" />
        <circle cx="150" cy="162" r="6" fill="#7dba25" />

        <!-- Power cable exiting base -->
        <rect x="135" y="260" width="30" height="40" rx="4" fill="#334155" />
        <path d="M 150,300 L 150,420" stroke="#64748b" stroke-width="8" stroke-linecap="round" />
      </g>
    `,
  },

  // 20. part-mt-04: Magnetic USB-C Charging Cable (3m)
  "part-mt-04": {
    badge: "3 METRES",
    svg: `
      <g transform="translate(200, 180)">
        <!-- Coiled Braided Cable -->
        <circle cx="200" cy="220" r="160" fill="none" stroke="#334155" stroke-width="18" />
        <circle cx="200" cy="220" r="120" fill="none" stroke="#475569" stroke-width="18" stroke-dasharray="12 6" />

        <!-- Magnetic Circular Connector Tip (Left) -->
        <g transform="translate(60, 120)">
          <circle cx="40" cy="40" r="32" fill="url(#metalChrome)" stroke="#334155" stroke-width="4" />
          <circle cx="40" cy="40" r="18" fill="url(#brassGold)" />
          <!-- Blue LED indicator ring -->
          <circle cx="40" cy="40" r="26" fill="none" stroke="#38bdf8" stroke-width="4" />
        </g>

        <!-- Standard USB Plug (Right) -->
        <g transform="translate(300, 300)">
          <rect x="0" y="0" width="80" height="45" rx="8" fill="#0f172a" stroke="#334155" stroke-width="3" />
          <rect x="80" y="8" width="45" height="29" fill="url(#metalChrome)" stroke="#475569" stroke-width="2" />
        </g>
      </g>
    `,
  },

  // 21. part-cs-01: Stainless Ball Chain Continuous Loop
  "part-cs-01": {
    badge: "NO JOINER",
    svg: `
      <g transform="translate(200, 180)">
        <!-- Large Oval Continuous Loop -->
        <path d="M 120,80 C 240,20 280,20 320,80 C 370,180 370,360 320,440 C 260,490 180,490 120,440 C 70,360 70,180 120,80 Z" fill="none" stroke="url(#metalChrome)" stroke-width="22" stroke-dasharray="16 10" stroke-linecap="round" />
        <!-- Internal Reflection Highlight Loop -->
        <path d="M 120,80 C 240,20 280,20 320,80 C 370,180 370,360 320,440 C 260,490 180,490 120,440 C 70,360 70,180 120,80 Z" fill="none" stroke="#ffffff" stroke-width="6" stroke-dasharray="16 10" stroke-linecap="round" opacity="0.8" />
      </g>
    `,
  },

  // 22. part-cs-02: Child Safety Chain Tensioner P-Clips
  "part-cs-02": {
    badge: "NZ SAFETY",
    svg: `
      <!-- 2 Overlapping Clear P-Clips with Chain -->
      <g transform="translate(240, 200)">
        <!-- Background P-Clip -->
        <g transform="translate(80, 40)" opacity="0.75">
          <path d="M 40,40 L 100,40 C 140,40 160,70 160,110 C 160,150 140,180 100,180 L 70,180 L 70,340 C 70,360 40,360 40,340 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="4" />
          <circle cx="55" cy="280" r="14" fill="#334155" />
        </g>

        <!-- Foremost P-Clip -->
        <path d="M 40,40 L 100,40 C 140,40 160,70 160,110 C 160,150 140,180 100,180 L 70,180 L 70,340 C 70,360 40,360 40,340 Z" fill="#f0fdf4" stroke="#7dba25" stroke-width="4" opacity="0.9" />
        <!-- Central Guide Hole for Chain -->
        <circle cx="100" cy="110" r="35" fill="#ffffff" stroke="#7dba25" stroke-width="4" />
        <!-- Fastening Screw Hole -->
        <circle cx="55" cy="280" r="14" fill="url(#metalChrome)" stroke="#334155" stroke-width="3" />
        <line x1="47" y1="280" x2="63" y2="280" stroke="#0f172a" stroke-width="4" />

        <!-- Taut Chain Running Through -->
        <line x1="100" y1="0" x2="100" y2="400" stroke="url(#metalChrome)" stroke-width="16" stroke-dasharray="12 8" stroke-linecap="round" />
      </g>
    `,
  },

  // 23. part-cs-03: Ball Chain Joiners & Stop Balls
  "part-cs-03": {
    badge: "PACK OF 10",
    svg: `
      <g transform="translate(200, 230)">
        <!-- 3 Open Snap Connectors -->
        <g transform="translate(20, 40)">
          <rect x="0" y="0" width="120" height="55" rx="27" fill="url(#metalChrome)" stroke="#334155" stroke-width="4" />
          <!-- Open snap slot -->
          <rect x="30" y="22" width="60" height="12" rx="4" fill="#1e293b" />
          <circle cx="35" cy="28" r="12" fill="#0f172a" />
          <circle cx="85" cy="28" r="12" fill="#0f172a" />
        </g>

        <g transform="translate(180, 80)">
          <rect x="0" y="0" width="120" height="55" rx="27" fill="url(#metalChrome)" stroke="#334155" stroke-width="4" />
          <rect x="30" y="22" width="60" height="12" rx="4" fill="#1e293b" />
        </g>

        <g transform="translate(80, 160)">
          <rect x="0" y="0" width="120" height="55" rx="27" fill="url(#metalChrome)" stroke="#334155" stroke-width="4" />
          <rect x="30" y="22" width="60" height="12" rx="4" fill="#1e293b" />
        </g>

        <!-- Stop Beads -->
        <circle cx="260" cy="220" r="32" fill="url(#metalChrome)" stroke="#334155" stroke-width="4" />
        <circle cx="260" cy="220" r="12" fill="#334155" />

        <circle cx="330" cy="180" r="26" fill="url(#metalChrome)" stroke="#334155" stroke-width="4" />
      </g>
    `,
  },
};

// Execution routine
console.log("Generating 23 high-res studio PNG assets in src/assets/images/...");
await fs.mkdir(assetsDir, { recursive: true });

for (const [partId, { svg, badge }] of Object.entries(partGraphics)) {
  const fullSvg = wrapStudioSvg(svg, partId, badge);
  const targetPng = path.join(assetsDir, `${partId}.png`);
  
  await sharp(Buffer.from(fullSvg))
    .resize(800, 800)
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(targetPng);

  console.log(`✓ Rendered ${partId}.png (800x800)`);
}

console.log("All 23 parts PNG images generated successfully!");
