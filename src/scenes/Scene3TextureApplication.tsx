import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily } from "../fonts";

const SOFT_GOLD = "#C4A87C";
const CREAM = "#F5EDE3";
const WARM = "#2A2025";
const BG = "#0A0A0A";

export const Scene3TextureApplication: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene fade in
  const sceneIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Product texture image — slow zoom in (luxurious close-up feel)
  const zoomProgress = interpolate(frame, [0, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imgScale = 1 + zoomProgress * 0.08;

  // Soft golden overlay pulses
  const overlayOpacity = 0.08 + Math.sin(frame * 0.04) * 0.04;

  // Text lines fade in sequentially
  const line1Opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Opacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line3Opacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle horizontal light sweep
  const sweepX = interpolate(frame, [0, 180], [-200, 1280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene fade out
  const sceneOut = interpolate(frame, [165, 180], [1, 0], {
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
      {/* Warm background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${WARM} 0%, ${BG} 100%)`,
        }}
      />

      {/* Product texture image — full frame with slow zoom */}
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
          src={staticFile("product-3.jpeg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imgScale})`,
            filter: "brightness(0.85) contrast(1.05)",
          }}
        />

        {/* Golden light sweep across image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: sweepX,
            width: 300,
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${SOFT_GOLD}15, transparent)`,
            opacity: overlayOpacity + 0.1,
          }}
        />
      </div>

      {/* Soft golden glow overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: `${SOFT_GOLD}${Math.round(overlayOpacity * 255).toString(16).padStart(2, "0")}`,
        }}
      />

      {/* Feature text overlay — bottom section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 200,
          paddingLeft: 60,
          paddingRight: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Gradient overlay behind text for readability */}
        <AbsoluteFill
          style={{
            bottom: 0,
            top: "auto",
            height: 500,
            background: `linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 60%, transparent 100%)`,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          {/* Line 1 — "Rich, luxurious ceramides" */}
          <div
            style={{
              fontFamily,
              fontSize: 48,
              fontWeight: 700,
              color: CREAM,
              textAlign: "center",
              lineHeight: 1.3,
              opacity: line1Opacity,
              transform: `translateY(${interpolate(line1Opacity, [0, 1], [20, 0])}px)`,
            }}
          >
            Rich, luxurious ceramides
          </div>

          {/* Line 2 — "lock in moisture" */}
          <div
            style={{
              fontFamily,
              fontSize: 48,
              fontWeight: 700,
              color: SOFT_GOLD,
              textAlign: "center",
              lineHeight: 1.3,
              opacity: line2Opacity,
              transform: `translateY(${interpolate(line2Opacity, [0, 1], [20, 0])}px)`,
            }}
          >
            lock in moisture
          </div>

          {/* Line 3 — "repair your skin's natural barrier" */}
          <div
            style={{
              fontFamily,
              fontSize: 36,
              fontWeight: 400,
              color: "#CCCCCC",
              textAlign: "center",
              lineHeight: 1.4,
              opacity: line3Opacity,
              transform: `translateY(${interpolate(line3Opacity, [0, 1], [20, 0])}px)`,
            }}
          >
            repair your skin's natural barrier,{"\n"}
            <span style={{ color: CREAM, fontWeight: 500 }}>
              and restore that effortless glow
            </span>
          </div>
        </div>
      </div>

      {/* Thin golden divider */}
      <div
        style={{
          position: "absolute",
          bottom: 420,
          left: 100,
          right: 100,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${SOFT_GOLD}30, transparent)`,
          opacity: line1Opacity,
        }}
      />
    </AbsoluteFill>
  );
};
