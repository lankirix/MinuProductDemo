import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "../fonts";

const SAGE = "#7FB069";
const DARK_GREEN = "#2D5A1B";
const MINT = "#A8D18A";
const BG = "#0A0A0A";

// Deterministic particles — 20 circles radiating outward
const NUM_PARTICLES = 20;
const PARTICLES = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
  angle: (i / NUM_PARTICLES) * Math.PI * 2,
  speed: 5 + (i % 5) * 1.6,
  size: 8 + (i % 4) * 5,
  color: [SAGE, MINT, DARK_GREEN, SAGE, MINT][i % 5],
}));

const DiamondLogo: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{ display: "block" }}
  >
    {/* Outermost — dark green */}
    <polygon points="50,2 98,50 50,98 2,50" fill={DARK_GREEN} />
    {/* Second — medium dark green */}
    <polygon points="50,13 87,50 50,87 13,50" fill="#3D6E22" />
    {/* Third — sage green */}
    <polygon points="50,26 74,50 50,74 26,50" fill={SAGE} />
    {/* Inner — dark green */}
    <polygon points="50,38 62,50 50,62 38,50" fill={DARK_GREEN} />
    {/* Center dot — mint */}
    <circle cx="50" cy="50" r="7" fill={MINT} />
  </svg>
);

export const Scene2ProductIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene fade in
  const sceneIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo group: scale 3 → 1 with spring
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
    durationInFrames: 28,
  });
  const logoScale = interpolate(logoSpring, [0, 1], [3, 1]);

  // Tagline slides up after 18 frames
  const taglineSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 20, stiffness: 220 },
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [70, 0]);

  // Product name slides up after 28 frames
  const productSpring = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: { damping: 20, stiffness: 200 },
  });
  const productY = interpolate(productSpring, [0, 1], [90, 0]);

  // Glow pulses
  const glowScale = 1 + Math.sin(frame * 0.1) * 0.04;

  // Center point for particles (center of logo at canvas 540, ~830)
  const PARTICLE_CX = 540;
  const PARTICLE_CY = 830;

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: "hidden" }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${SAGE}25 0%, ${SAGE}08 40%, transparent 70%)`,
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          opacity: sceneIn,
        }}
      />

      {/* Particle burst */}
      {PARTICLES.map((p, i) => {
        const progress = Math.max(0, frame - 3);
        const dist = p.speed * progress;
        const x = PARTICLE_CX + Math.cos(p.angle) * dist - p.size / 2;
        const y = PARTICLE_CY + Math.sin(p.angle) * dist - p.size / 2;
        const opacity = interpolate(progress, [0, 55], [1, 0], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.color,
              left: x,
              top: y,
              opacity: opacity * sceneIn,
            }}
          />
        );
      })}

      {/* Content — centered in safe zone */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 150,
          paddingBottom: 170,
          paddingLeft: 60,
          paddingRight: 60,
          opacity: sceneIn,
          overflow: "hidden",
        }}
      >
        {/* Logo group scales in */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <DiamondLogo size={130} />
          <div
            style={{
              fontFamily,
              fontSize: 100,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            minu
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 28,
              fontWeight: 400,
              color: SAGE,
              letterSpacing: 10,
            }}
          >
            ORGANICS
          </div>
        </div>

        {/* Tagline slides up */}
        <div
          style={{
            marginTop: 50,
            transform: `translateY(${taglineY}px)`,
            opacity: taglineSpring,
            fontFamily,
            fontSize: 28,
            fontWeight: 400,
            color: "#888888",
            letterSpacing: 4,
            textAlign: "center",
          }}
        >
          WELLNESS · BEAUTY · CONSULTANCY
        </div>

        {/* Product name slides up */}
        <div
          style={{
            marginTop: 36,
            transform: `translateY(${productY}px)`,
            opacity: productSpring,
            fontFamily,
            fontSize: 56,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Ceramide Barrier{"\n"}Night Cream
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
