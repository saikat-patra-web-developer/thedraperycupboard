/**
 * Product Variations: Blinds Types & Coordinated Color Swatches
 * Comprehensive taxonomy for all 15 The Drapery Cupboard products.
 */

export const PRODUCT_VARIATIONS = {
  // 1. Roller Blinds
  "roller-blinds": {
    typeLabel: "Blinds Type & Fabric",
    types: [
      {
        id: "blockout",
        name: "Blockout Fabric",
        badge: "Most Popular",
        description: "100% room darkening and maximum privacy for bedrooms and media rooms.",
        colors: [
          { name: "Chalk White", hex: "#FBFBF9", code: "RB-01" },
          { name: "Warm Linen", hex: "#E8DFD1", code: "RB-02" },
          { name: "Soft Greige", hex: "#D4CDC5", code: "RB-03" },
          { name: "Desert Sand", hex: "#C4B5A0", code: "RB-04" },
          { name: "Slate Grey", hex: "#707784", code: "RB-05" },
          { name: "Gunmetal", hex: "#4B515D", code: "RB-06" },
          { name: "Midnight Black", hex: "#18191B", code: "RB-07" },
        ],
      },
      {
        id: "light-filtering",
        name: "Light Filtering",
        badge: "Soft Daylight",
        description: "Diffuses direct harsh sun into a gentle, ambient room glow without darkness.",
        colors: [
          { name: "Crisp Cotton", hex: "#FFFFFF", code: "LF-01" },
          { name: "Pearl Cream", hex: "#F6F2E9", code: "LF-02" },
          { name: "Natural Birch", hex: "#DFD5C3", code: "LF-03" },
          { name: "Oatmeal", hex: "#CCC0AD", code: "LF-04" },
          { name: "Dove Grey", hex: "#A39E99", code: "LF-05" },
          { name: "Sage Tint", hex: "#B9C4B5", code: "LF-06" },
        ],
      },
      {
        id: "sunfilter",
        name: "Sunfilter Screen",
        badge: "UV & View",
        description: "Cuts 95% UV radiation and glare while preserving your panoramic outdoor view.",
        colors: [
          { name: "Polar White", hex: "#F8F8F6", code: "SF-01" },
          { name: "Birch White", hex: "#E5E0D5", code: "SF-02" },
          { name: "Sandstone", hex: "#C2B5A2", code: "SF-03" },
          { name: "Bronze Charcoal", hex: "#484138", code: "SF-04" },
          { name: "Midnight Charcoal", hex: "#252627", code: "SF-05" },
        ],
      },
      {
        id: "thermal-bonded",
        name: "Thermal Insulating",
        badge: "Energy Saver",
        description: "Foam-bonded acrylic barrier layer stops glass drafts and reduces heating bills.",
        colors: [
          { name: "Frost White", hex: "#FAFAFA", code: "TH-01" },
          { name: "Oat Latte", hex: "#E1D4C0", code: "TH-02" },
          { name: "Ash Grey", hex: "#8E9298", code: "TH-03" },
          { name: "Deep Navy", hex: "#1F2B3E", code: "TH-04" },
          { name: "Espresso", hex: "#3D2F28", code: "TH-05" },
        ],
      },
    ],
  },

  // 2. Sunfilter Blinds
  "sunfilter-blinds": {
    typeLabel: "Screen Weave & Openness",
    types: [
      {
        id: "screen-5",
        name: "5% Balanced Weave",
        badge: "All-Rounder",
        description: "Optimal balance between solar heat rejection and daytime outward clarity.",
        colors: [
          { name: "Pure White", hex: "#FFFFFF", code: "SN-01" },
          { name: "Chalk Grey", hex: "#E2DFD7", code: "SN-02" },
          { name: "Dune Beige", hex: "#CFC4B2", code: "SN-03" },
          { name: "Slate Charcoal", hex: "#4A4D51", code: "SN-04" },
          { name: "Midnight Black", hex: "#1B1C1D", code: "SN-05" },
        ],
      },
      {
        id: "screen-3",
        name: "3% High Heat Block",
        badge: "97% UV Block",
        description: "Tighter micro-weave providing higher UV defense for harsh afternoon sun.",
        colors: [
          { name: "White Linen", hex: "#EDE8DE", code: "S3-01" },
          { name: "Grey Sand", hex: "#B8B0A2", code: "S3-02" },
          { name: "Charcoal Grey", hex: "#52565B", code: "S3-03" },
          { name: "Jet Charcoal", hex: "#222426", code: "S3-04" },
          { name: "Bronze Metal", hex: "#3D3731", code: "S3-05" },
        ],
      },
      {
        id: "screen-10",
        name: "10% Clear Vision",
        badge: "Max View",
        description: "Looser open weave for panoramic window views with gentle glare protection.",
        colors: [
          { name: "Snow Screen", hex: "#F5F5F3", code: "S1-01" },
          { name: "Birch Mist", hex: "#DFD8CB", code: "S1-02" },
          { name: "Warm Stone", hex: "#A89F91", code: "S1-03" },
          { name: "Ebony Vision", hex: "#2E3033", code: "S1-04" },
        ],
      },
    ],
  },

  // 3. Vertical Blinds
  "vertical-blinds": {
    typeLabel: "Vane Width & System",
    types: [
      {
        id: "vanes-89",
        name: "89mm Slimline Vanes",
        badge: "Contemporary",
        description: "Narrow modern blade width designed for standard window depths and reveals.",
        colors: [
          { name: "Pure White", hex: "#FFFFFF", code: "VB-01" },
          { name: "Alabaster", hex: "#F4F0E6", code: "VB-02" },
          { name: "Wheat Cream", hex: "#DED2BC", code: "VB-03" },
          { name: "Mist Grey", hex: "#A6ACB3", code: "VB-04" },
          { name: "Deep Charcoal", hex: "#3C3F44", code: "VB-05" },
        ],
      },
      {
        id: "vanes-127",
        name: "127mm Patio Vanes",
        badge: "Ranch Sliders",
        description: "Classic wide vanes offering broad coverage for patio ranch sliders and doors.",
        colors: [
          { name: "Crisp White", hex: "#FAFAFA", code: "VB-06" },
          { name: "Cream Linen", hex: "#EDE5D5", code: "VB-07" },
          { name: "Greige Dune", hex: "#BCB3A4", code: "VB-08" },
          { name: "Iron Grey", hex: "#585C63", code: "VB-09" },
          { name: "Ink Black", hex: "#1E2022", code: "VB-10" },
        ],
      },
      {
        id: "chainless",
        name: "Chainless Weighted",
        badge: "Pet & Child Safe",
        description: "Sewn-in bottom weights eliminate tangled bottom link chains for safe family flow.",
        colors: [
          { name: "White Cloud", hex: "#FFFFFF", code: "CW-01" },
          { name: "Warm Sand", hex: "#D5C9B3", code: "CW-02" },
          { name: "Silver Birch", hex: "#8D9198", code: "CW-03" },
          { name: "Dark Charcoal", hex: "#33373D", code: "CW-04" },
        ],
      },
    ],
  },

  // 4. Venetian Blinds
  "venetian-blinds": {
    typeLabel: "Slat Material & Profile",
    types: [
      {
        id: "faux-wood-50",
        name: "Visionwood Faux Wood 50mm",
        badge: "100% Waterproof",
        description: "Engineered composite slats that never warp or crack in wet bathrooms or kitchens.",
        colors: [
          { name: "Gloss White", hex: "#FFFFFF", code: "VW-01" },
          { name: "Silk Off-White", hex: "#F7F7F4", code: "VW-02" },
          { name: "Natural Cream", hex: "#F0E9DC", code: "VW-03" },
          { name: "Bleached Oak", hex: "#D9CEBB", code: "VW-04" },
          { name: "Smoked Greige", hex: "#968E82", code: "VW-05" },
        ],
      },
      {
        id: "real-timber",
        name: "Basswood Hardwood 50mm",
        badge: "Real Timber",
        description: "Lightweight authentic timber featuring organic woodgrain texture.",
        colors: [
          { name: "Natural Maple", hex: "#E3C598", code: "TM-01" },
          { name: "Honey Teak", hex: "#C99A5E", code: "TM-02" },
          { name: "Golden Oak", hex: "#A8733D", code: "TM-03" },
          { name: "Rich Walnut", hex: "#65432B", code: "TM-04" },
          { name: "Dark Espresso", hex: "#382417", code: "TM-05" },
        ],
      },
      {
        id: "aluminium-25",
        name: "Slimline Aluminium 25mm",
        badge: "Ultra Slim",
        description: "Crisp, rust-proof micro-slats for clean minimalist window aesthetics and offices.",
        colors: [
          { name: "Brushed Silver", hex: "#C5C8CC", code: "AL-01" },
          { name: "Gloss White", hex: "#FFFFFF", code: "AL-02" },
          { name: "Matte Black", hex: "#202124", code: "AL-03" },
          { name: "Gunmetal Grey", hex: "#50545C", code: "AL-04" },
          { name: "Champagne Gold", hex: "#D6C4A5", code: "AL-05" },
        ],
      },
    ],
  },

  // 5. Curtains
  "curtains": {
    typeLabel: "Drape Style & Lining",
    types: [
      {
        id: "s-fold-sheer",
        name: "S-Fold Sheer Fabric",
        badge: "Hotel Luxe",
        description: "Undulating continuous soft waves providing daytime glare diffusion and elegance.",
        colors: [
          { name: "Snow White Sheer", hex: "#FDFCFA", code: "CU-01" },
          { name: "Soft Ivory", hex: "#F5EFE4", code: "CU-02" },
          { name: "Oatmeal Sheer", hex: "#DDD3C1", code: "CU-03" },
          { name: "Silver Mist", hex: "#C3C9CE", code: "CU-04" },
          { name: "Charcoal Veil", hex: "#5A5D62", code: "CU-05" },
        ],
      },
      {
        id: "blockout-drape",
        name: "3-Pass Blockout Drapes",
        badge: "Thermal & Dark",
        description: "Heavily lined thermal drapes preventing winter heat loss and morning daylight.",
        colors: [
          { name: "Warm Chalk", hex: "#EFECE4", code: "CU-06" },
          { name: "Natural Linen", hex: "#D4C7B0", code: "CU-07" },
          { name: "Eucalyptus Green", hex: "#7C8D77", code: "CU-08" },
          { name: "Navy Blue", hex: "#1E293B", code: "CU-09" },
          { name: "Deep Charcoal", hex: "#33363B", code: "CU-10" },
          { name: "Ochre Gold", hex: "#BFA263", code: "CU-11" },
        ],
      },
      {
        id: "textured-linen",
        name: "Textured Linen Blend",
        badge: "Organic Slub",
        description: "Tactile slub yarn with natural textured movement and relaxed, effortless drape.",
        colors: [
          { name: "Raw Flax", hex: "#D9CDBC", code: "CU-12" },
          { name: "Vintage Chalk", hex: "#EDE8DE", code: "CU-13" },
          { name: "Sea Salt Grey", hex: "#ACB3B7", code: "CU-14" },
          { name: "Terracotta", hex: "#A45D48", code: "CU-15" },
          { name: "Forest Pine", hex: "#405043", code: "CU-16" },
        ],
      },
    ],
  },

  // 6. Roman Curtains
  "roman-curtains": {
    typeLabel: "Fold Style & Fabric",
    types: [
      {
        id: "classic-flat",
        name: "Tailored Flat Fold",
        badge: "Clean Lines",
        description: "Structured rear horizontal battens create tidy, architectural stacked pleats.",
        colors: [
          { name: "Crisp Cotton", hex: "#FFFFFF", code: "RC-01" },
          { name: "Champagne", hex: "#F2E8D7", code: "RC-02" },
          { name: "Sandstone", hex: "#C8BCAB", code: "RC-03" },
          { name: "Steel Grey", hex: "#686E77", code: "RC-04" },
          { name: "Onyx Black", hex: "#232426", code: "RC-05" },
        ],
      },
      {
        id: "cascading-hobbled",
        name: "Cascading Hobbled Fold",
        badge: "Soft Volume",
        description: "Overlapping fabric soft loops add rich dimensional texture even when lowered.",
        colors: [
          { name: "Pearl Ivory", hex: "#F7F3EA", code: "RC-06" },
          { name: "Warm Biscuit", hex: "#DBCDB6", code: "RC-07" },
          { name: "Sage Heather", hex: "#8F9C8B", code: "RC-08" },
          { name: "Dark Slate", hex: "#40464E", code: "RC-09" },
        ],
      },
      {
        id: "thermal-lined",
        name: "Thermal Lined Fabric",
        badge: "Draft Barrier",
        description: "Coated blackout interlining blocks window drafts and cold glass transfer.",
        colors: [
          { name: "Chalk White", hex: "#FBFBF9", code: "RC-10" },
          { name: "Almond Cream", hex: "#E6DAC5", code: "RC-11" },
          { name: "Storm Grey", hex: "#595E66", code: "RC-12" },
          { name: "Deep Navy", hex: "#1D283A", code: "RC-13" },
        ],
      },
    ],
  },

  // 7. Zebra Blinds
  "zebra-blinds": {
    typeLabel: "Fabric Stripe & Density",
    types: [
      {
        id: "dual-dimout",
        name: "Day & Night Dimout Stripe",
        badge: "Most Popular",
        description: "Alternating sheer and dimout horizontal bands for precision daylight alignment.",
        colors: [
          { name: "Optical White", hex: "#FFFFFF", code: "ZB-01" },
          { name: "Vanilla Cream", hex: "#F6EFE2", code: "ZB-02" },
          { name: "Stone Taupe", hex: "#B5A896", code: "ZB-03" },
          { name: "Slate Charcoal", hex: "#4D525A", code: "ZB-04" },
          { name: "Jet Black", hex: "#1B1C1E", code: "ZB-05" },
        ],
      },
      {
        id: "blockout-band",
        name: "Blockout Banded",
        badge: "Higher Privacy",
        description: "Dense solid bands provide darker room conditions when closed.",
        colors: [
          { name: "Pure White", hex: "#FAFAFA", code: "ZB-06" },
          { name: "Natural Oatmeal", hex: "#CFC3B0", code: "ZB-07" },
          { name: "Ash Grey", hex: "#7E848D", code: "ZB-08" },
          { name: "Espresso", hex: "#3A3029", code: "ZB-09" },
        ],
      },
      {
        id: "textured-weave",
        name: "Textured Metallic Weave",
        badge: "Luxe Finish",
        description: "Woven multi-tone yarns with subtle light-catching metallic luster.",
        colors: [
          { name: "Pearl Silver", hex: "#D6D9DE", code: "ZB-10" },
          { name: "Champagne Gold", hex: "#D8CBB6", code: "ZB-11" },
          { name: "Bronze Smoke", hex: "#544D45", code: "ZB-12" },
        ],
      },
    ],
  },

  // 8. Honeycomb Blinds
  "honeycomb-blinds": {
    typeLabel: "Cell Structure & Opacity",
    types: [
      {
        id: "single-blockout",
        name: "Single Cell Blockout (Foil Lined)",
        badge: "Max R-Value",
        description: "Cellular air pockets with inner foil barrier stop cold drafts and 100% light.",
        colors: [
          { name: "White Lily", hex: "#FFFFFF", code: "HC-01" },
          { name: "Vanilla Bean", hex: "#F5EFE3", code: "HC-02" },
          { name: "Linen Grey", hex: "#BEB9AF", code: "HC-03" },
          { name: "Charcoal Ash", hex: "#4A4D53", code: "HC-04" },
          { name: "Midnight", hex: "#1C1E21", code: "HC-05" },
        ],
      },
      {
        id: "single-translucent",
        name: "Single Cell Translucent",
        badge: "Ambient Glow",
        description: "Gentle daylight diffusion while locking in insulating cellular warmth.",
        colors: [
          { name: "Snow White", hex: "#FFFFFF", code: "HC-06" },
          { name: "Buttercream", hex: "#F9F4E8", code: "HC-07" },
          { name: "Sand Drift", hex: "#D2C6B3", code: "HC-08" },
          { name: "Dove Grey", hex: "#A1A6AD", code: "HC-09" },
        ],
      },
      {
        id: "top-down-bottom-up",
        name: "Top-Down / Bottom-Up",
        badge: "Ultimate Control",
        description: "Lower from top or raise from bottom to protect privacy while welcoming sky daylight.",
        colors: [
          { name: "Pure White", hex: "#FFFFFF", code: "HC-10" },
          { name: "Natural Cream", hex: "#EFE8DC", code: "HC-11" },
          { name: "Slate Grey", hex: "#5A6069", code: "HC-12" },
        ],
      },
    ],
  },

  // 9. Verishade
  "verishade": {
    typeLabel: "Fabric Blade Style",
    types: [
      {
        id: "smart-fold",
        name: "Smart Soft-Fold Vanes",
        badge: "Walk-Through",
        description: "Seamless fabric vanes you can walk right through while they remain closed.",
        colors: [
          { name: "Pure White", hex: "#FFFFFF", code: "VS-01" },
          { name: "Ivory Mist", hex: "#F3EFE7", code: "VS-02" },
          { name: "Neutral Birch", hex: "#D6CCC0", code: "VS-03" },
          { name: "Slate Grey", hex: "#6C727B", code: "VS-04" },
          { name: "Charcoal", hex: "#2B2D31", code: "VS-05" },
        ],
      },
      {
        id: "darkening-blade",
        name: "Room Darkening Insert",
        badge: "Night Privacy",
        description: "High-density weave inserts designed to enhance evening privacy and room dimming.",
        colors: [
          { name: "White Frost", hex: "#FBFBFB", code: "VS-06" },
          { name: "Soft Greige", hex: "#C4BAAA", code: "VS-07" },
          { name: "Shadow Grey", hex: "#4E545D", code: "VS-08" },
          { name: "Jet Black", hex: "#191A1C", code: "VS-09" },
        ],
      },
    ],
  },

  // 10. Roman Shades
  "roman-shades": {
    typeLabel: "Shade Fold & Texture",
    types: [
      {
        id: "flat-fold",
        name: "Flat Fold Linen",
        badge: "Minimalist",
        description: "Clean unbroken fabric face with crisp structured stacking on lift.",
        colors: [
          { name: "Chalk White", hex: "#FFFFFF", code: "RS-01" },
          { name: "Oyster Linen", hex: "#E9E2D4", code: "RS-02" },
          { name: "Natural Tan", hex: "#C2B097", code: "RS-03" },
          { name: "Pewter Grey", hex: "#7B818A", code: "RS-04" },
          { name: "Midnight", hex: "#212327", code: "RS-05" },
        ],
      },
      {
        id: "relaxed-curve",
        name: "European Relaxed Fold",
        badge: "Casual Drape",
        description: "Soft curved bottom swag offering a relaxed, romantic tailored presence.",
        colors: [
          { name: "Bleached Flax", hex: "#F5F0E6", code: "RS-06" },
          { name: "Wheatfield", hex: "#DFD2BC", code: "RS-07" },
          { name: "Olive Fog", hex: "#8C9585", code: "RS-08" },
          { name: "Deep Indigo", hex: "#263345", code: "RS-09" },
        ],
      },
    ],
  },

  // 11. Shutters
  "shutters": {
    typeLabel: "Shutter Material & Louvres",
    types: [
      {
        id: "poly-shutter",
        name: "PolyShutter Composite",
        badge: "100% Waterproof",
        description: "Aluminium-reinforced polymer core impervious to steam, moisture, and UV warping.",
        colors: [
          { name: "Vivid White", hex: "#FFFFFF", code: "SH-01" },
          { name: "Bright White", hex: "#F7F7F6", code: "SH-02" },
          { name: "Off White Cream", hex: "#F0E9DC", code: "SH-03" },
          { name: "French Grey", hex: "#9E9B95", code: "SH-04" },
        ],
      },
      {
        id: "basswood-hardwood",
        name: "Basswood Hardwood",
        badge: "Real Timber",
        description: "Premium organic timber offering wide panel spans and furniture-grade finish.",
        colors: [
          { name: "Pure White Painted", hex: "#FFFFFF", code: "SH-05" },
          { name: "Warm White", hex: "#F6F3EC", code: "SH-06" },
          { name: "Natural Basswood", hex: "#D4B384", code: "SH-07" },
          { name: "Warm Walnut", hex: "#6A4930", code: "SH-08" },
          { name: "Rich Mahogany", hex: "#4A2B20", code: "SH-09" },
        ],
      },
      {
        id: "exterior-aluminium",
        name: "Exterior Weather Aluminium",
        badge: "Weather & Security",
        description: "Heavy-duty powdercoated architectural aluminium for exterior decks and balconies.",
        colors: [
          { name: "Surfmist White", hex: "#E5E6E0", code: "SH-10" },
          { name: "Dune Sand", hex: "#B9B0A3", code: "SH-11" },
          { name: "Monument Grey", hex: "#3A3B3C", code: "SH-12" },
          { name: "Matte Black", hex: "#1E1F21", code: "SH-13" },
        ],
      },
    ],
  },

  // 12. Pergola
  "pergola": {
    typeLabel: "Roof System & Frame",
    types: [
      {
        id: "motorised-louvre",
        name: "Motorised Aerofoil Louvres",
        badge: "All-Weather",
        description: "135° rotating aluminium louvres with hidden motor and automatic rain sensor.",
        colors: [
          { name: "Matte Monument", hex: "#383B3E", code: "PG-01" },
          { name: "Pearl White", hex: "#FBFBFB", code: "PG-02" },
          { name: "Charcoal Grey", hex: "#4E5259", code: "PG-03" },
          { name: "Architectural Black", hex: "#1C1D1F", code: "PG-04" },
          { name: "Anodised Silver", hex: "#B4B9BF", code: "PG-05" },
        ],
      },
      {
        id: "retractable-canopy",
        name: "Retractable Waterproof Canopy",
        badge: "Retractable",
        description: "Heavy-duty PVC tensile canopy that glides back for open blue-sky entertaining.",
        colors: [
          { name: "Cream Canvas", hex: "#EFE9DD", code: "PG-06" },
          { name: "Sandstone Mesh", hex: "#CBBFA8", code: "PG-07" },
          { name: "Slate Roof Grey", hex: "#535860", code: "PG-08" },
          { name: "Pitch Black", hex: "#1B1C1D", code: "PG-09" },
        ],
      },
    ],
  },

  // 13. Outdoor Shades
  "outdoor-shades": {
    typeLabel: "Track System & Mesh",
    types: [
      {
        id: "zipscreen-heavy",
        name: "Zipscreen Wind-Lock Track",
        badge: "Wind Rated",
        description: "Patented side channels lock the fabric firmly in place against strong coastal winds.",
        colors: [
          { name: "White Screen", hex: "#FFFFFF", code: "OS-01" },
          { name: "Sand Dune", hex: "#C2B5A0", code: "OS-02" },
          { name: "Charcoal Bronze", hex: "#453F39", code: "OS-03" },
          { name: "Midnight Black", hex: "#1D1E20", code: "OS-04" },
        ],
      },
      {
        id: "wire-guide",
        name: "Stainless Wire Guide",
        badge: "Architectural",
        description: "Marine-grade 316 stainless cables guide the drop rail for slimline openness.",
        colors: [
          { name: "Birch White", hex: "#E8E3D8", code: "OS-05" },
          { name: "Stone Grey", hex: "#878D96", code: "OS-06" },
          { name: "Dark Charcoal", hex: "#35383E", code: "OS-07" },
        ],
      },
      {
        id: "clear-pvc",
        name: "Bistro Clear PVC Shield",
        badge: "Rain Shield",
        description: "Japanese optical-grade clear PVC shields from rain and wind while retaining view.",
        colors: [
          { name: "Clear with Black Border", hex: "#222222", code: "OS-08" },
          { name: "Clear with White Border", hex: "#FFFFFF", code: "OS-09" },
          { name: "Clear with Grey Border", hex: "#5E636A", code: "OS-10" },
        ],
      },
    ],
  },

  // 14. Home Automation
  "home-automation": {
    typeLabel: "Motor System & Smart Control",
    types: [
      {
        id: "rechargeable-motor",
        name: "Lithium-Ion Wire-Free Motor",
        badge: "Wire-Free DIY",
        description: "Quiet tubular motor with USB-C rechargeable battery. No electrician needed.",
        colors: [
          { name: "Pure White Head", hex: "#FFFFFF", code: "HA-01" },
          { name: "Matte Black Head", hex: "#1F2022", code: "HA-02" },
          { name: "Brushed Silver", hex: "#BCC1C8", code: "HA-03" },
        ],
      },
      {
        id: "mains-hardwired",
        name: "240V Mains Hardwired Motor",
        badge: "Heavy Duty",
        description: "Continuous power motor designed for large curtain tracks and heavy commercial blinds.",
        colors: [
          { name: "Clean White", hex: "#F7F7F7", code: "HA-04" },
          { name: "Industrial Charcoal", hex: "#3C3F45", code: "HA-05" },
        ],
      },
      {
        id: "smart-bridge",
        name: "Smart Bridge Hub & Remotes",
        badge: "App & Voice",
        description: "Bridges motors to Apple HomeKit, Google Home, Amazon Alexa, and mobile app.",
        colors: [
          { name: "Crisp White", hex: "#FFFFFF", code: "HA-06" },
          { name: "Stealth Black", hex: "#1E1E1E", code: "HA-07" },
        ],
      },
    ],
  },

  // 15. Alarm & CCTV
  "alarm-cctv": {
    typeLabel: "Camera & Sensor Hardware",
    types: [
      {
        id: "cctv-colorvu",
        name: "4K ColorVu NightVision Camera",
        badge: "Color 24/7",
        description: "F1.0 lens captures full color high definition video 24 hours a day in pitch darkness.",
        colors: [
          { name: "Polar White Housing", hex: "#FFFFFF", code: "SC-01" },
          { name: "Stealth Matte Black", hex: "#202124", code: "SC-02" },
          { name: "Anthracite Grey", hex: "#484B52", code: "SC-03" },
        ],
      },
      {
        id: "smart-hub-kit",
        name: "Wireless Alarm Hub & Sensors",
        badge: "Smart Hub Kit",
        description: "Encrypted wireless perimeter sensors, door/window contacts and indoor siren.",
        colors: [
          { name: "Architectural White", hex: "#FFFFFF", code: "SC-04" },
          { name: "Modern Slate Grey", hex: "#50545C", code: "SC-05" },
        ],
      },
      {
        id: "video-doorbell",
        name: "Smart 2K Video Doorbell",
        badge: "Doorbell",
        description: "Wide angle 2K video doorbell with two-way talk, chime, and instant smartphone alert.",
        colors: [
          { name: "Satin Nickel Trim", hex: "#D0D4DA", code: "SC-06" },
          { name: "Matte Black Trim", hex: "#1E1E20", code: "SC-07" },
        ],
      },
    ],
  },
};

/**
 * Get variations for any product by slug.
 * Returns tailored types and multiple colors, with reliable fallback.
 */
export function getProductVariations(productSlug) {
  if (PRODUCT_VARIATIONS[productSlug]) {
    return PRODUCT_VARIATIONS[productSlug];
  }

  // Graceful fallback for any custom or newly added products
  return {
    typeLabel: "Product Type & Finish",
    types: [
      {
        id: "premium-blockout",
        name: "Premium Blockout",
        badge: "Popular",
        description: "Maximum light blocking and privacy tailored to your window measurements.",
        colors: [
          { name: "Pure White", hex: "#FFFFFF", code: "DF-01" },
          { name: "Warm Linen", hex: "#E8DFD1", code: "DF-02" },
          { name: "Soft Greige", hex: "#D4CDC5", code: "DF-03" },
          { name: "Slate Grey", hex: "#707784", code: "DF-04" },
          { name: "Charcoal", hex: "#374151", code: "DF-05" },
        ],
      },
      {
        id: "light-filtering",
        name: "Light Filtering",
        badge: "Soft Light",
        description: "Diffuses harsh glare into soft, ambient illumination.",
        colors: [
          { name: "Crisp Cotton", hex: "#FFFFFF", code: "DF-06" },
          { name: "Natural Birch", hex: "#DFD5C3", code: "DF-07" },
          { name: "Oatmeal", hex: "#CCC0AD", code: "DF-08" },
          { name: "Dove Grey", hex: "#A39E99", code: "DF-09" },
        ],
      },
    ],
  };
}
