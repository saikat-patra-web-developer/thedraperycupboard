import { useState, useRef, useEffect, useCallback } from "react";
import Arrow from "../components/ui/Arrow.jsx";
import Hero from "../components/sections/Hero.jsx";

const PRODUCTS = [
  { id: "roller", name: "Roller Blinds", image: "/images/roller-480.webp", treatmentImage: "/images/products/roller-treatment.webp", defaultCoverage: 70, quoteSlug: "roller-blinds" },
  { id: "sunfilter", name: "Sunfilter", image: "/images/sunscreen-480.webp", treatmentImage: "/images/products/sunfilter-treatment.webp", defaultCoverage: 85, quoteSlug: "sunfilter-blinds" },
  { id: "vertical", name: "Vertical Blinds", image: "/images/vertical-480.webp", treatmentImage: "/images/products/vertical-treatment.webp", defaultCoverage: 95, quoteSlug: "vertical-blinds" },
  { id: "venetian", name: "Venetian Blinds", image: "/images/venetian-480.webp", treatmentImage: "/images/products/venetian-treatment.webp", defaultCoverage: 90, quoteSlug: "venetian-blinds" },
  { id: "roman_shades", name: "Roman Shades", image: "/images/roman-480.webp", treatmentImage: "/images/products/roman_shades-treatment.webp", defaultCoverage: 65, quoteSlug: "roman-shades" },
  { id: "zebra", name: "Zebra Blinds", image: "/images/vision-480.webp", treatmentImage: "/images/products/zebra-treatment.webp", defaultCoverage: 80, quoteSlug: "zebra-blinds" },
  { id: "honeycomb", name: "Honeycomb", image: "/images/cellular-480.webp", treatmentImage: "/images/products/honeycomb-treatment.webp", defaultCoverage: 75, quoteSlug: "honeycomb-blinds" },
  { id: "curtains", name: "Curtains", image: "/images/curtains-480.webp", treatmentImage: "/images/products/curtains-treatment.webp", defaultCoverage: 60, quoteSlug: "curtains" },
  { id: "shutters", name: "Shutters", image: "/images/shutters-480.webp", treatmentImage: "/images/products/shutters-treatment.webp", defaultCoverage: 100, quoteSlug: "shutters" },
  { id: "outdoor", name: "Outdoor Shades", image: "/images/pergola-480.webp", treatmentImage: "/images/products/outdoor-treatment.webp", defaultCoverage: 85, quoteSlug: "outdoor-shades" },
];

const FABRIC_SWATCHES = [
  { name: "Oyster Linen", hex: "#eeeae1" },
  { name: "Chalk White", hex: "#ffffff" },
  { name: "Warm Sand", hex: "#cfc2b2" },
  { name: "Slate Grey", hex: "#7d8583" },
  { name: "Charcoal", hex: "#2c2f30" },
];

const CONTROL_TYPES = [
  { id: "chain", label: "Chain", icon: "link" },
  { id: "motorised", label: "Motorised", icon: "motor" },
  { id: "smart", label: "Smart", icon: "wifi" },
];

const MOUNT_TYPES = [
  { id: "inside", label: "Inside Reveal", icon: "inside" },
  { id: "outside", label: "Outside Mount", icon: "outside" },
];

const OPACITY_OPTIONS = [
  { id: "light-filter", label: "Light Filter", opacity: 75 },
  { id: "blockout", label: "Blockout", opacity: 95 },
  { id: "sunscreen", label: "Sunscreen", opacity: 70 },
];

const DEFAULT_CORNERS = [
  { x: 18, y: 12 },
  { x: 82, y: 12 },
  { x: 82, y: 84 },
  { x: 18, y: 84 },
];

const lerp = (start, end, amount) => ({
  x: start.x + (end.x - start.x) * amount,
  y: start.y + (end.y - start.y) * amount,
});

function getHomography1000(dst) {
  const [p0, p1, p2, p3] = dst;
  const dx1 = p1.x - p2.x;
  const dx2 = p3.x - p2.x;
  const sx = p0.x - p1.x + p2.x - p3.x;
  const dy1 = p1.y - p2.y;
  const dy2 = p3.y - p2.y;
  const sy = p0.y - p1.y + p2.y - p3.y;

  const z = dx1 * dy2 - dy1 * dx2;
  if (Math.abs(z) < 1e-7) return null;

  const g = ((sx * dy2 - sy * dx2) / z) / 1000;
  const h = ((dx1 * sy - dy1 * sx) / z) / 1000;

  const a = (p1.x - p0.x + (g * 1000) * p1.x) / 1000;
  const b = (p3.x - p0.x + (h * 1000) * p3.x) / 1000;
  const c = p0.x;
  const d = (p1.y - p0.y + (g * 1000) * p1.y) / 1000;
  const e = (p3.y - p0.y + (h * 1000) * p3.y) / 1000;
  const f = p0.y;

  return [a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, 1];
}

function drawAffineTriangle(ctx, img, p0, p1, p2, u0, v0, u1, v1, u2, v2) {
  const delta = u0 * (v1 - v2) + u1 * (v2 - v0) + u2 * (v0 - v1);
  if (Math.abs(delta) < 1e-7) return;
  const a = (p0.x * (v1 - v2) + p1.x * (v2 - v0) + p2.x * (v0 - v1)) / delta;
  const b = (p0.y * (v1 - v2) + p1.y * (v2 - v0) + p2.y * (v0 - v1)) / delta;
  const c = (p0.x * (u2 - u1) + p1.x * (u0 - u2) + p2.x * (u1 - u0)) / delta;
  const d = (p0.y * (u2 - u1) + p1.y * (u0 - u2) + p2.y * (u1 - u0)) / delta;
  const e = (p0.x * (u1 * v2 - u2 * v1) + p1.x * (u2 * v0 - u0 * v2) + p2.x * (u0 * v1 - u1 * v0)) / delta;
  const f = (p0.y * (u1 * v2 - u2 * v1) + p1.y * (u2 * v0 - u0 * v2) + p2.x * (u0 * v1 - u1 * v0)) / delta;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.closePath();
  ctx.clip();
  ctx.transform(a, b, c, d, e, f);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}

function drawWarpedImage(ctx, img, p0, p1, p2, p3, opacity, tintColor, tintOpacity) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  ctx.save();
  ctx.globalAlpha = opacity;
  drawAffineTriangle(ctx, img, p0, p1, p3, 0, 0, iw, 0, 0, ih);
  drawAffineTriangle(ctx, img, p1, p2, p3, iw, 0, iw, ih, 0, ih);

  if (tintColor && tintOpacity > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.fillStyle = tintColor;
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = opacity * tintOpacity;
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function RealBlindTreatment({ imageSrc, corners, coverage, color, opacity, lighting, shadow, stageSize, product }) {
  const [tl, tr, br, bl] = corners;
  const amount = coverage / 100;
  const isVertical = product === "vertical";

  const p1 = isVertical ? lerp(tl, tr, amount) : tr;
  const p2 = isVertical ? lerp(bl, br, amount) : lerp(tr, br, amount);
  const p3 = isVertical ? bl : lerp(tl, bl, amount);

  if (!stageSize?.width || !stageSize?.height) return null;

  const dstPixels = [
    { x: (tl.x * stageSize.width) / 100, y: (tl.y * stageSize.height) / 100 },
    { x: (p1.x * stageSize.width) / 100, y: (p1.y * stageSize.height) / 100 },
    { x: (p2.x * stageSize.width) / 100, y: (p2.y * stageSize.height) / 100 },
    { x: (p3.x * stageSize.width) / 100, y: (p3.y * stageSize.height) / 100 },
  ];

  const matrix = getHomography1000(dstPixels);
  if (!matrix) return null;

  const isWhite = color?.toLowerCase() === "#ffffff";
  const tintOpacity = isWhite ? 0 : 0.58;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "1000px",
          height: "1000px",
          transformOrigin: "0 0",
          transform: `matrix3d(${matrix.map((n) => n.toFixed(7)).join(",")})`,
          opacity: opacity / 100,
          filter: `drop-shadow(0px ${Math.max(1, Math.round(shadow / 5))}px ${Math.max(2, Math.round(shadow / 3))}px rgba(0, 0, 0, 0.45)) brightness(${lighting}%)`,
        }}
      >
        <img
          src={imageSrc}
          alt="Real window blind covering"
          className="h-full w-full object-fill select-none pointer-events-none"
        />
        {tintOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: color,
              mixBlendMode: "multiply",
              opacity: tintOpacity,
            }}
          />
        )}
      </div>
    </div>
  );
}

function PerspectiveTreatment({ product, corners, coverage, color, opacity, lighting, shadow, slatAngle }) {
  const [tl, tr, br, bl] = corners;
  const amount = coverage / 100;
  const leftEnd = lerp(tl, bl, amount);
  const rightEnd = lerp(tr, br, amount);
  const points = (items) => items.map((p) => `${p.x},${p.y}`).join(" ");

  const horizontal = (position) => {
    const left = lerp(tl, bl, position * amount);
    const right = lerp(tr, br, position * amount);
    return <line key={position} x1={left.x} y1={left.y} x2={right.x} y2={right.y} />;
  };

  const treatmentShape = points([tl, tr, rightEnd, leftEnd]);
  const topDownProducts = ["roller", "sunfilter", "venetian", "roman_shades", "zebra", "honeycomb", "outdoor"];
  const verticalTopEnd = lerp(tl, tr, amount);
  const verticalBottomEnd = lerp(bl, br, amount);
  const verticalShape = points([tl, verticalTopEnd, verticalBottomEnd, bl]);
  const curtainPanel = 0.08 + (0.42 * amount);
  const leftCurtainTop = lerp(tl, tr, curtainPanel);
  const leftCurtainBottom = lerp(bl, br, curtainPanel);
  const rightCurtainTop = lerp(tl, tr, 1 - curtainPanel);
  const rightCurtainBottom = lerp(bl, br, 1 - curtainPanel);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ opacity: opacity / 100, filter: `brightness(${lighting}%)` }}
    >
      <defs>
        <linearGradient id="tc-preview-fabric" x1="0" x2="1">
          <stop stopColor={color} />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <linearGradient id="tc-preview-metal" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f8fafc" />
          <stop offset="0.35" stopColor="#94a3b8" />
          <stop offset="0.65" stopColor="#475569" />
          <stop offset="1" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="tc-preview-slat" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="0.3" stopColor={color} />
          <stop offset="0.75" stopColor={color} />
          <stop offset="1" stopColor="#57534e" stopOpacity="0.35" />
        </linearGradient>
        <pattern id="tc-preview-mesh" width="2" height="2" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill={color} fillOpacity="0.55" />
          <path d="M0 0L2 2M2 0L0 2" stroke="#334155" strokeOpacity="0.28" strokeWidth="0.2" />
        </pattern>
        <pattern id="tc-preview-zebra" width="4" height="8" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill={color} />
          <rect y="4" width="4" height="4" fill="#334155" fillOpacity="0.22" />
        </pattern>
        <filter id="tc-preview-shadow">
          <feDropShadow dx="0" dy={shadow / 35} stdDeviation={Math.max(0.2, shadow / 45)} floodOpacity={Math.min(0.65, shadow / 100)} />
        </filter>
        <filter id="tc-preview-texture" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="8" result="noise" />
          <feColorMatrix in="noise" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" result="softNoise" />
          <feBlend in="SourceGraphic" in2="softNoise" mode="multiply" />
          <feDropShadow dx="0" dy="1.2" stdDeviation="0.8" floodColor="#0f172a" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#tc-preview-shadow)" strokeLinejoin="round">
        {topDownProducts.includes(product) && <polygon points={treatmentShape} fill={color} />}

        {(product === "roller" || product === "roman_shades" || product === "honeycomb") && (
          <>
            <polygon
              points={treatmentShape}
              fill="url(#tc-preview-fabric)"
              stroke="#64748b"
              strokeWidth="0.35"
              vectorEffect="non-scaling-stroke"
              filter="url(#tc-preview-texture)"
            />
            {(product === "roman_shades" || product === "honeycomb") && (
              <g stroke="#78716c" strokeOpacity="0.45" strokeWidth="0.35" vectorEffect="non-scaling-stroke">
                {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map(horizontal)}
              </g>
            )}
            <line x1={tl.x} y1={tl.y} x2={tr.x} y2={tr.y} stroke="url(#tc-preview-metal)" strokeWidth="3.5" vectorEffect="non-scaling-stroke" />
            <line x1={leftEnd.x} y1={leftEnd.y} x2={rightEnd.x} y2={rightEnd.y} stroke="url(#tc-preview-metal)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <line
              x1={lerp(tl, tr, 0.97).x}
              y1={lerp(tl, tr, 0.97).y}
              x2={lerp(leftEnd, rightEnd, 0.97).x}
              y2={lerp(leftEnd, rightEnd, 0.97).y}
              stroke="#64748b"
              strokeWidth="0.65"
              strokeOpacity="0.75"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}

        {product === "sunfilter" && (
          <>
            <polygon points={treatmentShape} fill="url(#tc-preview-mesh)" stroke="#475569" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <line x1={tl.x} y1={tl.y} x2={tr.x} y2={tr.y} stroke="#475569" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            <line x1={leftEnd.x} y1={leftEnd.y} x2={rightEnd.x} y2={rightEnd.y} stroke="#475569" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </>
        )}

        {product === "zebra" && (
          <polygon points={treatmentShape} fill="url(#tc-preview-zebra)" stroke="#64748b" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        )}

        {product === "vertical" && (
          <>
            <polygon points={verticalShape} fill={color} />
            <g stroke="#78716c" strokeWidth="0.65" vectorEffect="non-scaling-stroke">
              {Array.from({ length: Math.max(1, Math.round(12 * amount)) }, (_, index) => {
                const position = ((index + 1) / Math.max(1, Math.round(12 * amount))) * amount;
                const top = lerp(tl, tr, position);
                const bottom = lerp(bl, br, position);
                return <line key={position} x1={top.x} y1={top.y} x2={bottom.x} y2={bottom.y} />;
              })}
            </g>
            <line x1={tl.x} y1={tl.y} x2={tr.x} y2={tr.y} stroke="#64748b" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          </>
        )}

        {product === "venetian" && (
          <>
            <polygon points={treatmentShape} fill="rgba(15, 23, 42, 0.22)" />
            <g>
              {Array.from({ length: 17 }, (_, index) => {
                const start = 0.09 + index * 0.053;
                const end = Math.min(start + (0.014 + (slatAngle / 90) * 0.034), 0.985);
                const leftTop = lerp(tl, leftEnd, start);
                const rightTop = lerp(tr, rightEnd, start);
                const leftBottom = lerp(tl, leftEnd, end);
                const rightBottom = lerp(tr, rightEnd, end);
                return (
                  <polygon
                    key={index}
                    points={points([leftTop, rightTop, rightBottom, leftBottom])}
                    fill="url(#tc-preview-slat)"
                    stroke="#a8a29e"
                    strokeWidth="0.45"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#tc-preview-shadow)"
                  />
                );
              })}
            </g>
            <g stroke="#a8a29e" strokeWidth="0.7" strokeOpacity="0.9" vectorEffect="non-scaling-stroke">
              {[0.18, 0.5, 0.82].map((position) => {
                const top = lerp(tl, tr, position);
                const bottom = lerp(leftEnd, rightEnd, position);
                return <line key={position} x1={top.x} y1={top.y} x2={bottom.x} y2={bottom.y} />;
              })}
            </g>
            <polygon
              points={points([tl, tr, lerp(tr, rightEnd, 0.085), lerp(tl, leftEnd, 0.085)])}
              fill={color}
              stroke="#a8a29e"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              filter="url(#tc-preview-shadow)"
            />
            <polygon
              points={points([lerp(tl, leftEnd, 0.965), lerp(tr, rightEnd, 0.965), rightEnd, leftEnd])}
              fill="url(#tc-preview-metal)"
              stroke="#94a3b8"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}

        {product === "curtains" && (
          <>
            <polygon points={points([tl, leftCurtainTop, leftCurtainBottom, bl])} fill={color} />
            <polygon points={points([rightCurtainTop, tr, br, rightCurtainBottom])} fill={color} />
            <g stroke="#78716c" strokeOpacity="0.55" strokeWidth="0.5" vectorEffect="non-scaling-stroke">
              {Array.from({ length: 12 }, (_, index) => {
                const side = index < 6;
                const local = ((index % 6) + 1) / 7;
                const position = side ? curtainPanel * local : 1 - curtainPanel + curtainPanel * local;
                const top = lerp(tl, tr, position);
                const bottom = lerp(bl, br, position);
                return <line key={index} x1={top.x} y1={top.y} x2={bottom.x} y2={bottom.y} />;
              })}
            </g>
            <line x1={tl.x} y1={tl.y} x2={tr.x} y2={tr.y} stroke="#64748b" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          </>
        )}

        {product === "shutters" && (
          <>
            <polygon points={points([tl, tr, br, bl])} fill={color} stroke="#cbd5e1" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <line
              x1={lerp(tl, tr, 0.5).x}
              y1={lerp(tl, tr, 0.5).y}
              x2={lerp(bl, br, 0.5).x}
              y2={lerp(bl, br, 0.5).y}
              stroke="#94a3b8"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <g stroke="#cbd5e1" strokeWidth="3.2" vectorEffect="non-scaling-stroke">
              {[0.08, 0.17, 0.26, 0.35, 0.44, 0.53, 0.62, 0.71, 0.8, 0.89].map((position) => {
                const left = lerp(tl, bl, position);
                const right = lerp(tr, br, position);
                return <line key={position} x1={left.x} y1={left.y} x2={right.x} y2={right.y} />;
              })}
            </g>
          </>
        )}

        {product === "outdoor" && (
          <>
            <polygon points={treatmentShape} fill="url(#tc-preview-mesh)" fillOpacity="0.75" stroke="#334155" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            <line x1={tl.x} y1={tl.y} x2={tr.x} y2={tr.y} stroke="#334155" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <line x1={leftEnd.x} y1={leftEnd.y} x2={rightEnd.x} y2={rightEnd.y} stroke="#334155" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function LivePreviewPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("roller");
  const [corners, setCorners] = useState(DEFAULT_CORNERS);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [draggedCorner, setDraggedCorner] = useState(null);

  const [selectedFabric, setSelectedFabric] = useState(FABRIC_SWATCHES[0]);
  const [treatmentColor, setTreatmentColor] = useState(FABRIC_SWATCHES[0].hex);
  const [controlType, setControlType] = useState("chain");
  const [mountType, setMountType] = useState("inside");
  const [opacityOption, setOpacityOption] = useState("blockout");

  const [coverage, setCoverage] = useState(70);
  const [opacity, setOpacity] = useState(95);
  const [slatAngle, setSlatAngle] = useState(58);
  const [lighting, setLighting] = useState(100);
  const [shadow, setShadow] = useState(35);
  const [showTreatment, setShowTreatment] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [renderMode, setRenderMode] = useState("photo"); // "photo" (real product image) | "vector"

  // Camera State
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const imageStageRef = useRef(null);
  const previewImageRef = useRef(null);
  const originalThumbnailRef = useRef(null);

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
  }, []);

  // Camera stream lifecycle
  useEffect(() => {
    if (!cameraOpen) return undefined;
    let active = true;

    const startCamera = async () => {
      setCameraError("");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        setCameraError("Camera access was denied or is unavailable. Please check your browser permissions or upload an image.");
      }
    };

    startCamera();

    return () => {
      active = false;
      stopCamera();
    };
  }, [cameraOpen, stopCamera]);

  // Clean up object URLs on change/unmount
  useEffect(() => {
    return () => {
      if (imageUrl && !imageUrl.startsWith("/images/")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // Keep stage size in sync for real blind perspective projection
  useEffect(() => {
    const el = imageStageRef.current;
    if (!el) return undefined;
    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setStageSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [imageUrl]);

  // Set new preview file
  const setPreviewFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCorners(DEFAULT_CORNERS);
    setIsAdjusting(true);
    setShowTreatment(true);
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewFile(file);
    }
    event.target.value = "";
  };

  const captureCameraPhoto = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `window-photo-${Date.now()}.jpg`, { type: "image/jpeg" });
          setPreviewFile(file);
        }
        stopCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  // Corner movement
  const moveCorner = (event) => {
    if (draggedCorner === null || !imageStageRef.current) return;
    const rect = imageStageRef.current.getBoundingClientRect();
    let x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    let y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));

    const current = corners;
    if (draggedCorner === 0) {
      x = Math.min(x, current[1].x - 5);
      y = Math.min(y, current[3].y - 5);
    }
    if (draggedCorner === 1) {
      x = Math.max(x, current[0].x + 5);
      y = Math.min(y, current[2].y - 5);
    }
    if (draggedCorner === 2) {
      x = Math.max(x, current[3].x + 5);
      y = Math.max(y, current[1].y + 5);
    }
    if (draggedCorner === 3) {
      x = Math.min(x, current[2].x - 5);
      y = Math.max(y, current[0].y + 5);
    }

    setCorners((prev) => prev.map((corner, index) => (index === draggedCorner ? { x, y } : corner)));
  };

  // Room lighting & contrast analysis
  const analyzeRoomLighting = () => {
    const image = previewImageRef.current;
    if (!image?.naturalWidth || !image?.naturalHeight) return;

    try {
      const canvas = document.createElement("canvas");
      const width = 160;
      const height = Math.max(1, Math.round((width * image.naturalHeight) / image.naturalWidth));
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(image, 0, 0, width, height);

      const minCornerX = Math.min(...corners.map((c) => c.x));
      const maxCornerX = Math.max(...corners.map((c) => c.x));
      const minCornerY = Math.min(...corners.map((c) => c.y));
      const maxCornerY = Math.max(...corners.map((c) => c.y));

      const left = Math.floor((minCornerX / 100) * width);
      const top = Math.floor((minCornerY / 100) * height);
      const sampleWidth = Math.max(1, Math.floor(((maxCornerX - minCornerX) / 100) * width));
      const sampleHeight = Math.max(1, Math.floor(((maxCornerY - minCornerY) / 100) * height));

      const pixels = context.getImageData(left, top, Math.min(sampleWidth, width - left), Math.min(sampleHeight, height - top)).data;
      let total = 0;
      let totalSquared = 0;
      let count = 0;

      for (let i = 0; i < pixels.length; i += 16) {
        const lum = 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
        total += lum;
        totalSquared += lum * lum;
        count += 1;
      }

      if (!count) return;
      const avg = total / count;
      const contrast = Math.sqrt(Math.max(0, totalSquared / count - avg * avg));
      setLighting(Math.round(Math.max(70, Math.min(130, 75 + (avg / 255) * 55))));
      setShadow(Math.round(Math.max(15, Math.min(60, 18 + contrast * 0.6))));
    } catch {
      // Ignore cross-origin canvas security exceptions gracefully
    }
  };

  // Product selection handler
  const handleSelectProduct = (prodId) => {
    setSelectedProduct(prodId);
    const prodDef = PRODUCTS.find((p) => p.id === prodId);
    if (prodDef) {
      setCoverage(prodDef.defaultCoverage);
    }
    if (prodId === "sunfilter") {
      setOpacityOption("sunscreen");
      setOpacity(70);
    } else if (opacityOption === "sunscreen") {
      setOpacityOption("blockout");
      setOpacity(95);
    }
    setShowTreatment(true);
  };

  // Fabric selection handler
  const handleSelectFabric = (swatch) => {
    setSelectedFabric(swatch);
    setTreatmentColor(swatch.hex);
  };

  // Opacity change handler
  const handleSelectOpacity = (opId) => {
    setOpacityOption(opId);
    const found = OPACITY_OPTIONS.find((o) => o.id === opId);
    if (found) {
      setOpacity(found.opacity);
    }
  };

  // Reset handler
  const handleReset = () => {
    setCorners(DEFAULT_CORNERS);
    setSelectedProduct("roller");
    setSelectedFabric(FABRIC_SWATCHES[0]);
    setTreatmentColor(FABRIC_SWATCHES[0].hex);
    setControlType("chain");
    setMountType("inside");
    setOpacityOption("blockout");
    setCoverage(70);
    setOpacity(95);
    setSlatAngle(58);
    setShowTreatment(true);
    setIsAdjusting(false);
  };

  // Save Image: composite download
  const handleSaveImage = async () => {
    const imgEl = previewImageRef.current;
    if (!imgEl) return;
    setIsSaving(true);

    try {
      const naturalW = imgEl.naturalWidth || 1200;
      const naturalH = imgEl.naturalHeight || 900;
      const canvas = document.createElement("canvas");
      canvas.width = naturalW;
      canvas.height = naturalH;
      const ctx = canvas.getContext("2d");

      // Draw original image
      ctx.drawImage(imgEl, 0, 0, naturalW, naturalH);

      if (showTreatment) {
        if (renderMode === "photo" && activeProductObj?.treatmentImage) {
          const blindImg = new Image();
          blindImg.crossOrigin = "anonymous";
          await new Promise((resolve) => {
            blindImg.onload = () => resolve();
            blindImg.onerror = () => resolve();
            blindImg.src = activeProductObj.treatmentImage;
          });

          if (blindImg.complete && blindImg.naturalWidth) {
            const amount = coverage / 100;
            const isVertical = selectedProduct === "vertical";

            const p0 = { x: (corners[0].x * naturalW) / 100, y: (corners[0].y * naturalH) / 100 };
            const p1 = {
              x: ((isVertical ? lerp(corners[0], corners[1], amount).x : corners[1].x) * naturalW) / 100,
              y: ((isVertical ? lerp(corners[0], corners[1], amount).y : corners[1].y) * naturalH) / 100,
            };
            const p2 = {
              x: ((isVertical ? lerp(corners[3], corners[2], amount).x : lerp(corners[1], corners[2], amount).x) * naturalW) / 100,
              y: ((isVertical ? lerp(corners[3], corners[2], amount).y : lerp(corners[1], corners[2], amount).y) * naturalH) / 100,
            };
            const p3 = {
              x: ((isVertical ? corners[3].x : lerp(corners[0], corners[3], amount).x) * naturalW) / 100,
              y: ((isVertical ? corners[3].y : lerp(corners[0], corners[3], amount).y) * naturalH) / 100,
            };

            const isWhite = treatmentColor?.toLowerCase() === "#ffffff";
            drawWarpedImage(ctx, blindImg, p0, p1, p2, p3, opacity / 100, treatmentColor, isWhite ? 0 : 0.58);
          }
        } else {
          // Serialize SVG overlay
          const svgEl = imageStageRef.current?.querySelector("svg");
          if (svgEl) {
            const svgClone = svgEl.cloneNode(true);
            svgClone.setAttribute("width", naturalW);
            svgClone.setAttribute("height", naturalH);
            const svgData = new XMLSerializer().serializeToString(svgClone);
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const svgUrl = URL.createObjectURL(svgBlob);

            const overlayImg = new Image();
            overlayImg.crossOrigin = "anonymous";
            await new Promise((resolve) => {
              overlayImg.onload = () => {
                ctx.drawImage(overlayImg, 0, 0, naturalW, naturalH);
                URL.revokeObjectURL(svgUrl);
                resolve();
              };
              overlayImg.onerror = () => {
                URL.revokeObjectURL(svgUrl);
                resolve();
              };
              overlayImg.src = svgUrl;
            });
          }
        }
      }

      // Add elegant watermark badge
      ctx.fillStyle = "rgba(70, 69, 74, 0.88)";
      const badgeW = 240;
      const badgeH = 46;
      ctx.roundRect(naturalW - badgeW - 24, naturalH - badgeH - 24, badgeW, badgeH, 12);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 18px Inter, sans-serif";
      ctx.fillText("The Drapery Cupboard", naturalW - badgeW - 24 + 18, naturalH - badgeH - 24 + 28);

      const downloadUrl = canvas.toDataURL("image/jpeg", 0.92);
      const link = document.createElement("a");
      link.download = `drapery-cupboard-${selectedProduct}-preview.jpg`;
      link.href = downloadUrl;
      link.click();
    } catch (err) {
      console.error("Save image failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const activeProductObj = PRODUCTS.find((p) => p.id === selectedProduct) || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-[#fafbf8] pb-24 text-[#353439]">
      {/* Hero Header Section */}
      <Hero
        compact
        image="hero"
        label="Interactive Room Visualiser"
        title={
          <>
            Live Room Preview.
            <br />
            See It in Your Space.
          </>
        }
        description="Visualise our custom blinds, shades, and curtains directly on your window with real fabrics, colours, and 3D perspective before getting a quote."
      />

      <div className="wrap mt-8 space-y-10">
        {/* ========================================================================= */}
        {/* STEP 1: Add Your Photo */}
        {/* ========================================================================= */}
        <section aria-labelledby="step-1-title" className="space-y-4">
          <div>
            <h2 id="step-1-title" className="!text-xl font-bold tracking-tight text-forest sm:!text-2xl">
              1. Add Your Photo
            </h2>
            <p className="mt-0.5 text-xs text-brand-grey">Upload a photo from your device or take a new one.</p>
          </div>

          <div className="grid items-center gap-4 lg:grid-cols-[auto_1fr]">
            <div className="grid gap-3.5 sm:grid-cols-3">
              {/* Card 1: Upload an Image */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group flex min-h-[160px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-line bg-white p-5 text-center transition-all hover:border-moss hover:bg-brand-50 hover:shadow-sm sm:w-56"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-brand-100 text-moss transition-transform group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <span className="mt-3.5 block text-sm font-bold text-forest">Upload an Image</span>
                <span className="mt-1 block text-xs text-brand-grey">JPG, PNG (Max 10MB)</span>
              </button>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleUpload} className="hidden" />

              {/* Card 2: Take a Photo */}
              <button
                type="button"
                onClick={() => setCameraOpen(true)}
                className="group flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-brand-line bg-white p-5 text-center transition-all hover:border-moss hover:bg-brand-50 hover:shadow-sm sm:w-56"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-brand-100 text-moss transition-transform group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <span className="mt-3.5 block text-sm font-bold text-forest">Take a Photo</span>
                <span className="mt-1 block text-xs text-brand-grey">Use your device camera</span>
              </button>

              {/* Card 3: Tips for best results */}
              <div className="flex min-h-[160px] flex-col justify-center rounded-2xl border border-brand-line bg-brand-50 p-4 text-xs sm:w-64">
                <span className="mb-2 block font-bold text-forest">Tips for the best results</span>
                <ul className="space-y-1.5 text-brand-grey">
                  <li className="flex items-center gap-2">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-forest text-[10px] text-white">✓</span>
                    Take the photo in good lighting
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-forest text-[10px] text-white">✓</span>
                    Capture the full window area
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-forest text-[10px] text-white">✓</span>
                    Keep the camera straight
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-forest text-[10px] text-white">✓</span>
                    Avoid heavy filters
                  </li>
                </ul>
              </div>
            </div>

            {/* Handwritten note with curved arrow */}
            <div className="relative hidden pl-4 lg:flex lg:items-center">
              <svg width="48" height="48" viewBox="0 0 60 60" fill="none" className="text-neutral-400">
                <path d="M10 15 C 30 10, 50 25, 45 45 M 35 42 L 45 45 L 48 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="rotate-[-2deg] font-serif text-sm italic text-neutral-600">
                It’s easy –<br />just upload or take a photo!
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 2: Choose a Product */}
        {/* ========================================================================= */}
        <section aria-labelledby="step-2-title" className="space-y-4">
          <div>
            <h2 id="step-2-title" className="!text-xl font-bold tracking-tight text-forest sm:!text-2xl">
              2. Choose a Product
            </h2>
            <p className="mt-0.5 text-xs text-brand-grey">Select a window covering to preview in your space.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
            {PRODUCTS.map((product) => {
              const isSelected = selectedProduct === product.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelectProduct(product.id)}
                  className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border p-2 text-center transition-all ${
                    isSelected
                      ? "border-forest bg-white shadow-md ring-2 ring-forest/20"
                      : "border-brand-line bg-white hover:border-lime hover:bg-brand-50"
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <span className={`mt-2 block text-xs font-semibold tracking-tight ${isSelected ? "text-forest" : "text-neutral-700"}`}>
                    {product.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 3: Customise & Preview */}
        {/* ========================================================================= */}
        <section aria-labelledby="step-3-title" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="step-3-title" className="!text-xl font-bold tracking-tight text-forest sm:!text-2xl">
                3. Customise & Preview
              </h2>
              <p className="mt-0.5 text-xs text-brand-grey">Adjust options to see how it looks in your room.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-brand-line bg-white px-4 py-2 text-xs font-semibold text-neutral-700 shadow-sm transition hover:bg-brand-50"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Reset
              </button>
              <button
                type="button"
                onClick={handleSaveImage}
                disabled={isSaving}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-grey disabled:opacity-50"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {isSaving ? "Saving..." : "Save Image"}
              </button>
            </div>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[290px_1fr] 2xl:grid-cols-[330px_1fr] 2xl:gap-8">
            {/* Left Column: Control Options */}
            <div className="space-y-4 rounded-2xl border border-brand-line bg-white p-5 shadow-sm">
              {/* 1. Fabric / Colour */}
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-grey">
                  Fabric / Colour
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {FABRIC_SWATCHES.map((swatch) => {
                    const isSelected = selectedFabric.name === swatch.name && treatmentColor === swatch.hex;
                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => handleSelectFabric(swatch)}
                        title={swatch.name}
                        aria-label={swatch.name}
                        className={`relative size-8 rounded-full border border-black/15 transition-all ${
                          isSelected ? "ring-2 ring-forest ring-offset-2 scale-110" : "hover:scale-105"
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                      />
                    );
                  })}
                  {/* Custom color picker */}
                  <label
                    title="Choose custom shade"
                    className="relative flex size-8 cursor-pointer items-center justify-center rounded-full border border-dashed border-neutral-300 bg-neutral-50 hover:bg-neutral-100"
                  >
                    <input
                      type="color"
                      value={treatmentColor}
                      onChange={(e) => {
                        setTreatmentColor(e.target.value);
                        setSelectedFabric({ name: "Custom", hex: e.target.value });
                      }}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <span className="text-xs font-bold text-neutral-400">+</span>
                  </label>
                </div>
                <span className="mt-2 block text-xs font-semibold text-forest">
                  {selectedFabric.name}
                </span>
              </div>

              {/* 2. Control Type */}
              <div className="border-t border-neutral-100 pt-3.5">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-grey">
                  Control Type
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {CONTROL_TYPES.map((ct) => {
                    const isSelected = controlType === ct.id;
                    return (
                      <button
                        key={ct.id}
                        type="button"
                        onClick={() => setControlType(ct.id)}
                        className={`flex min-h-9 items-center justify-center gap-1.5 rounded-xl border px-2 py-1.5 text-xs font-semibold transition ${
                          isSelected
                            ? "border-lime bg-brand-50 text-forest shadow-xs"
                            : "border-brand-line bg-white text-neutral-600 hover:bg-brand-50"
                        }`}
                      >
                        {isSelected && <span className="text-[10px]">✓</span>}
                        {ct.id === "motorised" && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                        )}
                        {ct.id === "smart" && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 7a16 16 0 0 1 20 0" />
                            <path d="M5 11a11 11 0 0 1 14 0" />
                            <circle cx="12" cy="18" r="2" />
                          </svg>
                        )}
                        {ct.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Mount Type */}
              <div className="border-t border-neutral-100 pt-3.5">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-grey">
                  Mount Type
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {MOUNT_TYPES.map((mt) => {
                    const isSelected = mountType === mt.id;
                    return (
                      <button
                        key={mt.id}
                        type="button"
                        onClick={() => setMountType(mt.id)}
                        className={`flex min-h-9 items-center justify-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                          isSelected
                            ? "border-lime bg-brand-50 text-forest shadow-xs"
                            : "border-brand-line bg-white text-neutral-600 hover:bg-brand-50"
                        }`}
                      >
                        {isSelected && <span className="text-[10px]">✓</span>}
                        {mt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Opacity */}
              <div className="border-t border-neutral-100 pt-3.5">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-grey">
                  Opacity
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {OPACITY_OPTIONS.map((op) => {
                    const isSelected = opacityOption === op.id;
                    return (
                      <button
                        key={op.id}
                        type="button"
                        onClick={() => handleSelectOpacity(op.id)}
                        className={`flex min-h-9 items-center justify-center gap-1 rounded-xl border px-1.5 py-1.5 text-center text-xs font-semibold transition ${
                          isSelected
                            ? "border-lime bg-brand-50 text-forest shadow-xs"
                            : "border-brand-line bg-white text-neutral-600 hover:bg-brand-50"
                        }`}
                      >
                        {isSelected && <span className="text-[10px]">✓</span>}
                        {op.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Coverage Slider */}
              <div className="border-t border-neutral-100 pt-3.5">
                <label className="block">
                  <div className="flex justify-between text-xs font-semibold text-neutral-600">
                    <span>Blind Coverage</span>
                    <span className="text-forest font-bold">{coverage}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={coverage}
                    onChange={(e) => setCoverage(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 accent-forest"
                  />
                </label>
              </div>

              {/* 6. Venetian Slat Angle (if venetian) */}
              {selectedProduct === "venetian" && (
                <div className="border-t border-neutral-100 pt-3.5">
                  <label className="block">
                    <div className="flex justify-between text-xs font-semibold text-neutral-600">
                      <span>Slat Angle</span>
                      <span className="text-forest font-bold">{slatAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={slatAngle}
                      onChange={(e) => setSlatAngle(Number(e.target.value))}
                      className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 accent-forest"
                    />
                  </label>
                </div>
              )}

              {/* Quote link */}
              <div className="border-t border-neutral-100 pt-4">
                <a
                  href={`/online-quote?product=${activeProductObj.quoteSlug}`}
                  className="btn btn-dark w-full !min-h-10 !text-xs font-semibold"
                >
                  Estimate Price for this Blind
                  <Arrow />
                </a>
              </div>
            </div>

            {/* Right Column: Main Preview Stage & Transformation Thumbnail */}
            <div className="space-y-4">
              {imageUrl ? (
                <>
                  <div className="relative overflow-hidden rounded-2xl border border-brand-line bg-white p-3 shadow-sm sm:p-4">
                    {/* Stage Canvas */}
                    <div
                      ref={imageStageRef}
                      onPointerMove={moveCorner}
                      onPointerUp={() => setDraggedCorner(null)}
                      onPointerCancel={() => setDraggedCorner(null)}
                      className={`relative mx-auto flex max-h-[68vh] w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-100 ${
                        isAdjusting ? "touch-none select-none" : ""
                      }`}
                    >
                      <img
                        ref={previewImageRef}
                        src={imageUrl}
                        alt="Window room preview"
                        onLoad={analyzeRoomLighting}
                        crossOrigin="anonymous"
                        className="block max-h-[68vh] w-full object-contain"
                      />

                      {/* Treatment overlay */}
                      {showTreatment && (
                        renderMode === "photo" && activeProductObj?.treatmentImage ? (
                          <RealBlindTreatment
                            imageSrc={activeProductObj.treatmentImage}
                            corners={corners}
                            coverage={coverage}
                            color={treatmentColor}
                            opacity={opacity}
                            lighting={lighting}
                            shadow={shadow}
                            stageSize={stageSize}
                            product={selectedProduct}
                          />
                        ) : (
                          <PerspectiveTreatment
                            product={selectedProduct}
                            corners={corners}
                            coverage={coverage}
                            color={treatmentColor}
                            opacity={opacity}
                            lighting={lighting}
                            shadow={shadow}
                            slatAngle={slatAngle}
                          />
                        )
                      )}

                      {/* Corner pins overlay for window adjustments */}
                      {isAdjusting && (
                        <>
                          <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon
                              points={corners.map((c) => `${c.x},${c.y}`).join(" ")}
                              fill="rgba(70, 69, 74, 0.12)"
                              stroke="#46454a"
                              strokeWidth="1.2"
                              strokeDasharray="2 1.5"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                          {corners.map((corner, idx) => (
                            <button
                              key={idx}
                              type="button"
                              aria-label={`Window corner ${idx + 1}`}
                              onPointerDown={(event) => {
                                event.currentTarget.setPointerCapture(event.pointerId);
                                setDraggedCorner(idx);
                              }}
                              className="absolute z-40 flex size-7 -translate-x-1/2 -translate-y-1/2 cursor-move touch-none items-center justify-center rounded-full border-2 border-white bg-forest text-white shadow-lg transition hover:scale-125"
                              style={{ left: `${corner.x}%`, top: `${corner.y}%` }}
                            >
                              <span className="size-2 rounded-full bg-lime" />
                            </button>
                          ))}
                        </>
                      )}

                      {/* Top Floating Actions */}
                      <div className="absolute left-3 top-3 z-30 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAdjusting((val) => !val)}
                          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-md backdrop-blur-md transition ${
                            isAdjusting
                              ? "bg-forest text-white hover:bg-forest/90"
                              : "bg-white/90 text-neutral-800 hover:bg-white"
                          }`}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                          </svg>
                          {isAdjusting ? "Done Adjusting" : "Adjust Window"}
                        </button>
                        {isAdjusting && (
                          <span className="hidden rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white sm:inline-block">
                            Drag the 4 corner pins to fit your window opening
                          </span>
                        )}
                      </div>

                      <div className="absolute right-3 top-3 z-30 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setRenderMode((m) => (m === "photo" ? "vector" : "photo"))}
                          title="Toggle between real blind photo and vector illustration"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-md backdrop-blur-md hover:bg-white"
                        >
                          {renderMode === "photo" ? "Real Blind" : "Vector Mode"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowTreatment((v) => !v)}
                          title={showTreatment ? "Hide blinds" : "Show blinds"}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-md backdrop-blur-md hover:bg-white"
                        >
                          {showTreatment ? "Before" : "After"}
                        </button>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-md backdrop-blur-md hover:bg-white"
                        >
                          Replace
                        </button>
                      </div>

                      {/* Bottom Right Badge: Live Preview */}
                      <div className="absolute bottom-3 right-3 z-20 rounded-lg bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-md">
                        Live Preview
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Original Photo comparison thumbnail */}
                  <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-line bg-white p-4">
                    <div className="flex items-center gap-4">
                      {/* Original photo thumbnail card */}
                      <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-xs sm:w-44">
                        <img
                          ref={originalThumbnailRef}
                          src={imageUrl}
                          alt="Original room photo"
                          className="aspect-[4/3] w-full object-cover"
                        />
                        <div className="border-t border-neutral-200 bg-white/95 py-1 text-center text-[11px] font-semibold text-neutral-700">
                          Original Photo
                        </div>
                      </div>

                      {/* Transformation note */}
                      <div className="flex items-center gap-3">
                        <svg width="36" height="36" viewBox="0 0 50 50" fill="none" className="text-neutral-400 rotate-12">
                          <path d="M10 35 C 20 15, 35 15, 45 25 M 35 28 L 45 25 L 44 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-serif text-sm italic text-neutral-600">
                          See the<br />transformation!
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setShowTreatment((v) => !v)}
                        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-brand-line bg-brand-50 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-brand-100"
                      >
                        Toggle Overlay ({showTreatment ? "On" : "Off"})
                      </button>
                      <a
                        href={`/online-quote?product=${activeProductObj.quoteSlug}`}
                        className="btn btn-dark !min-h-10 !px-5 !py-2 !text-xs font-semibold"
                      >
                        Proceed to Online Quote
                        <Arrow />
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-line bg-white p-8 text-center sm:min-h-[460px]">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-100 text-moss">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <h3 className="mt-4 !font-sans !text-lg !font-bold text-forest">No Window Photo Selected</h3>
                  <p className="mt-1.5 max-w-md text-xs leading-relaxed text-brand-grey">
                    Upload an image of your window or take a photo with your device camera above to preview {activeProductObj.name} in your room.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn btn-dark !min-h-10 !px-5 !py-2 !text-xs font-semibold"
                    >
                      Upload an Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setCameraOpen(true)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-brand-line bg-white px-4 py-2 text-xs font-semibold text-neutral-700 shadow-sm transition hover:bg-brand-50"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                      Take a Photo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* CAMERA MODAL */}
      {/* ========================================================================= */}
      {cameraOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-white">
              <span className="text-sm font-bold">Take Window Photo</span>
              <button
                type="button"
                onClick={stopCamera}
                aria-label="Close camera"
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="relative flex min-h-[340px] items-center justify-center bg-black sm:min-h-[460px]">
              <video ref={videoRef} playsInline muted className="max-h-[65vh] w-full object-contain" />
              {cameraError && (
                <div className="absolute max-w-sm px-4 text-center text-xs leading-relaxed text-red-300">
                  {cameraError}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 p-4">
              <button
                type="button"
                onClick={stopCamera}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={captureCameraPhoto}
                disabled={Boolean(cameraError)}
                className="inline-flex items-center gap-2 rounded-xl bg-lime px-5 py-2.5 text-xs font-bold text-forest shadow-md transition hover:bg-[#8dca34] disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                Capture Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
