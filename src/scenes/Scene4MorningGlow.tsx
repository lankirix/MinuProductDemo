import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { fontFamily } from "../fonts";

const MORNING_GOLD = "#E8C97A";
const CREAM = "#F5EDE3";
const BG = "#0A0A0A";
const WARM_BG = "#1C1815";

export const Scene4MorningGlow: React.FC = () => {
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

  // Warm sunrise overlay
  const sunriseProgress = interpolate(frame, [0, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sunriseOpacity = sunriseProgress * 0.2;

  // Text fades in sequentially
  const headlineOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOpacity = interpolate(frame, [50, 70], [0, 1], {
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
          src={staticFile("product-4.jpeg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imgScale})`,
            filter: "brightness(0.8) contrast(1.05)",
          }}
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(28,24,21,0.5) 50%, ${WARM_BG}80 100%)`,
        }}
      />

      {/* Warm sunrise glow */}
      <AbsoluteFill
        style={{
          backgroundColor: `${MORNING_GOLD}${Math.round(sunriseOpacity * 255).toString(16).padStart(2, "0")}`,
        }}
      />

      {/* Soft golden glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${MORNING_GOLD}18 0%, transparent 65%)`,
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
            fontSize: 50,
            fontWeight: 800,
            color: CREAM,
            textAlign: "center",
            lineHeight: 1.3,
            opacity: headlineOpacity,
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          Wake up to softer, calmer,
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 50,
            fontWeight: 800,
            color: MORNING_GOLD,
            textAlign: "center",
            lineHeight: 1.3,
            opacity: subOpacity,
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          deeply nourished skin.
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
          background: `linear-gradient(90deg, transparent, ${MORNING_GOLD}40, transparent)`,
          opacity: headlineOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
