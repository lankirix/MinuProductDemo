import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { fontFamily } from "../fonts";

const WARM_ROSE = "#C49B8A";
const CREAM = "#F5EDE3";
const SOFT_GOLD = "#C4A87C";
const BG = "#0A0A0A";
const WARM_BG = "#1C1518";

export const Scene5SelfCare: React.FC = () => {
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

  // Text fades in sequentially — staggered emotional lines
  const line1Opacity = interpolate(frame, [20, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Opacity = interpolate(frame, [45, 63], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line3Opacity = interpolate(frame, [70, 88], [0, 1], {
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
          src={staticFile("product-1.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imgScale})`,
            filter: "brightness(0.75) contrast(1.05)",
          }}
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(28,21,24,0.5) 50%, ${WARM_BG}80 100%)`,
        }}
      />

      {/* Warm rose ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${WARM_ROSE}15 0%, transparent 65%)`,
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
            fontSize: 48,
            fontWeight: 700,
            color: CREAM,
            textAlign: "center",
            lineHeight: 1.3,
            opacity: line1Opacity,
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          Because you deserve
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 48,
            fontWeight: 700,
            color: WARM_ROSE,
            textAlign: "center",
            lineHeight: 1.3,
            opacity: line2Opacity,
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          to feel this good
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 42,
            fontWeight: 400,
            color: SOFT_GOLD,
            textAlign: "center",
            lineHeight: 1.3,
            opacity: line3Opacity,
            textShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
        >
          every morning.
        </div>
      </div>

      {/* Thin accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 160,
          right: 160,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${WARM_ROSE}35, transparent)`,
          opacity: line1Opacity,
        }}
      />
    </AbsoluteFill>
  );
};
