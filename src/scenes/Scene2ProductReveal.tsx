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

export const Scene2ProductReveal: React.FC = () => {
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
  const brandOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagOpacity = interpolate(frame, [60, 80], [0, 1], {
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
          background: `radial-gradient(circle, ${SOFT_GOLD}15 0%, transparent 65%)`,
          left: "50%",
          top: "40%",
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
          gap: 14,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 24,
            fontWeight: 400,
            color: "#888",
            letterSpacing: 6,
            opacity: brandOpacity,
          }}
        >
          minu NATURAL
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 48,
            fontWeight: 700,
            color: CREAM,
            textAlign: "center",
            lineHeight: 1.3,
            opacity: nameOpacity,
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          Ceramide Night Barrier Cream
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 30,
            fontWeight: 400,
            color: SOFT_GOLD,
            textAlign: "center",
            letterSpacing: 1,
            opacity: tagOpacity,
          }}
        >
          That's when the magic happens
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
          opacity: nameOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
