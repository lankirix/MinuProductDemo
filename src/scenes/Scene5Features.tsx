import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { fontFamily } from "../fonts";

const SAGE = "#7FB069";
const BG = "#0A0A0A";
const MUTED = "#888888";

const FEATURES = [
  { icon: "✓", label: "Deeply Moisturizing", color: SAGE },
  { icon: "⚡", label: "Repairs Skin Barrier", color: "#A8D18A" },
  { icon: "✦", label: "100% Organic Formula", color: SAGE },
];

const FEATURE_DELAYS = [15, 28, 41];

export const Scene5Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene fade in
  const sceneIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene fade out
  const sceneOut = interpolate(frame, [78, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Product image scales down and springs to small position
  const imgSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 25,
  });
  // Image starts large (conceptually) and settles at 40% scale
  const imgScale = interpolate(imgSpring, [0, 1], [0.6, 1]);

  // Product name fades in below image
  const nameOpacity = interpolate(frame, [10, 22], [0, 1], {
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
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${SAGE}18 0%, transparent 65%)`,
          left: "50%",
          top: "35%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Product image — 40% scale at top */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: "50%",
          transform: `translateX(-50%) scale(${imgScale})`,
          transformOrigin: "top center",
          width: 400,
          height: 500,
        }}
      >
        <Img
          src={staticFile("product-4.jpeg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 16,
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        />
      </div>

      {/* Product mini-label */}
      <div
        style={{
          position: "absolute",
          top: 676,
          left: 60,
          right: 60,
          textAlign: "center",
          opacity: nameOpacity,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 28,
            fontWeight: 700,
            color: SAGE,
            letterSpacing: 3,
          }}
        >
          minu ORGANICS
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          top: 740,
          left: 60,
          right: 60,
          height: 1,
          backgroundColor: "#2C2C2C",
          opacity: nameOpacity,
        }}
      />

      {/* Feature lines — slide in from right, staggered */}
      {FEATURES.map((feat, i) => {
        const delay = FEATURE_DELAYS[i];
        const featSpring = spring({
          frame: Math.max(0, frame - delay),
          fps,
          config: { damping: 20, stiffness: 200 },
        });
        const x = interpolate(featSpring, [0, 1], [160, 0]);
        const opacity = featSpring;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 786 + i * 130,
              left: 60,
              right: 60,
              display: "flex",
              alignItems: "center",
              gap: 28,
              transform: `translateX(${x}px)`,
              opacity,
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: `${feat.color}20`,
                border: `2px solid ${feat.color}50`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontFamily,
                  fontSize: 32,
                  color: feat.color,
                  lineHeight: 1,
                }}
              >
                {feat.icon}
              </div>
            </div>

            {/* Feature text */}
            <div
              style={{
                fontFamily,
                fontSize: 42,
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.2,
              }}
            >
              {feat.label}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
