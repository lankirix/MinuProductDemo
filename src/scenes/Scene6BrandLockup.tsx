import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { fontFamily } from "../fonts";

const SOFT_GOLD = "#C4A87C";
const CREAM = "#F5EDE3";
const WARM_NIGHT = "#1A1520";
const BG = "#0A0A0A";

export const Scene6BrandLockup: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene fade in
  const sceneIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow Ken Burns zoom — signature style
  const zoomProgress = interpolate(frame, [0, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imgScale = 1 + zoomProgress * 0.05;

  // Text fades in sequentially
  const brandOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const sceneOut = interpolate(frame, [108, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        overflow: "hidden",
        opacity: sceneIn * sceneOut,
      }}
    >
      {/* Full-bleed product image with slow zoom */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile("product-2.jpeg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imgScale})`,
            filter: "brightness(0.7) contrast(1.05)",
          }}
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(26,21,32,0.4) 50%, ${WARM_NIGHT}80 100%)`,
        }}
      />

      {/* Soft golden glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${SOFT_GOLD}18 0%, transparent 65%)`,
          left: "50%",
          top: "38%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Text overlay — bottom section */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 60,
          right: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 52,
            fontWeight: 800,
            color: CREAM,
            textAlign: "center",
            lineHeight: 1.25,
            opacity: brandOpacity,
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          Minu Natural
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 32,
            fontWeight: 400,
            color: SOFT_GOLD,
            textAlign: "center",
            letterSpacing: 1,
            lineHeight: 1.4,
            opacity: taglineOpacity,
          }}
        >
          Barrier care that works while you rest.
        </div>
      </div>

      {/* Thin golden accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 160,
          right: 160,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${SOFT_GOLD}40, transparent)`,
          opacity: taglineOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
