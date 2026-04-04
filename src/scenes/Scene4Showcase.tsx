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

const SAGE = "#7FB069";
const BG = "#0A0A0A";

// 3 images cross-fade in sequence across 150 frames
// Each image gets ~50 frames of full visibility with 15-frame crossfades
const IMAGES = [
  { src: staticFile("product-1.jpg"), inStart: 0,   inEnd: 14,  outStart: 55,  outEnd: 70  },
  { src: staticFile("product-2.jpeg"), inStart: 55,  inEnd: 70,  outStart: 108, outEnd: 122 },
  { src: staticFile("product-3.jpeg"), inStart: 108, inEnd: 122, outStart: 148, outEnd: 150 },
];

export const Scene4Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Feature headline fades in at frame 14
  const headlineOpacity = interpolate(frame, [14, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [14, 28], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [24, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene fade out
  const sceneOut = interpolate(frame, [138, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Image counter indicator
  const activeImage = frame < 70 ? 0 : frame < 122 ? 1 : 2;

  return (
    <AbsoluteFill
      style={{ backgroundColor: BG, overflow: "hidden", opacity: sceneOut }}
    >
      {/* Background glow — shifts hue subtly with each image */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${SAGE}15 0%, transparent 65%)`,
          left: "50%",
          top: "55%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Feature headline */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 60,
          right: 60,
          transform: `translateY(${headlineY}px)`,
          opacity: headlineOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 68,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          Barrier Repair.{"\n"}Overnight.
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 36,
            fontWeight: 400,
            color: SAGE,
            textAlign: "center",
            marginTop: 20,
            opacity: subOpacity,
            letterSpacing: 1,
          }}
        >
          Ceramide Barrier Night Cream
        </div>
      </div>

      {/* ── 3-image crossfade with Ken Burns ── */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 80,
          right: 80,
          bottom: 220,
          overflow: "hidden",
          borderRadius: 20,
        }}
      >
        {IMAGES.map(({ src, inStart, inEnd, outStart, outEnd }, i) => {
          const opacity = interpolate(
            frame,
            [inStart, inEnd, outStart, outEnd],
            [0, 1, 1, i === 2 ? 1 : 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Ken Burns: alternating zoom direction per image
          const kbProgress = interpolate(frame, [inEnd, Math.min(outEnd, 148)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const kbScale = 1 + kbProgress * 0.06;
          // Alternate pan direction: left / right / center
          const kbX = i === 0 ? kbProgress * 12 : i === 1 ? kbProgress * -12 : 0;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                opacity,
                transform: `scale(${kbScale}) translateX(${kbX}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={src}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  boxShadow:
                    "0 30px 100px rgba(0,0,0,0.7), 0 0 60px rgba(127,176,105,0.15)",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Image progress dots ── */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 18,
          opacity: headlineOpacity,
        }}
      >
        {[0, 1, 2].map((i) => {
          const dotActive = activeImage === i;
          return (
            <div
              key={i}
              style={{
                width: dotActive ? 32 : 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: dotActive ? SAGE : "#333",
                transition: "all 0.3s",
              }}
            />
          );
        })}
      </div>

      {/* Sage accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 195,
          left: 80,
          right: 80,
          height: 2,
          backgroundColor: SAGE,
          opacity: headlineOpacity * 0.35,
          borderRadius: 1,
        }}
      />
    </AbsoluteFill>
  );
};
