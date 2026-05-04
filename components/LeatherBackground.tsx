import { Platform } from "react-native";

// Web-only leather texture background using SVG fractal noise
export default function LeatherBackground() {
  if (Platform.OS !== "web") return null;

  const noise = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
      <filter id="leather">
        <feTurbulence type="fractalNoise" baseFrequency="0.75 0.65" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="300" height="300" filter="url(#leather)" opacity="0.13"/>
    </svg>`
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        backgroundColor: "#3c2a1e",
        backgroundImage: `url("data:image/svg+xml,${noise}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px",
      }}
    >
      {/* Vignette — darkens edges like a real leather cover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
