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
const BG = "#0A0A0A";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade entire scene in from black
  const sceneIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text slams in: springs from scale 2 → 1
  const textSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 160 },
    durationInFrames: 22,
  });
  const textScale = interpolate(textSpring, [0, 1], [2, 1]);
  const textOpacity = interpolate(textSpring, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade text out at end
  const textOut = interpolate(frame, [72, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulses subtly
  const glowScale = 1 + Math.sin(frame * 0.08) * 0.05;

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: "hidden" }}>
      {/* Radial glow — sage green center */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${SAGE}40 0%, ${SAGE}15 35%, transparent 70%)`,
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          opacity: sceneIn,
        }}
      />

      {/* Hook text — centered in safe zone */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 150,
          paddingBottom: 170,
          paddingLeft: 60,
          paddingRight: 60,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 76,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.15,
            transform: `scale(${textScale})`,
            opacity: textOpacity * textOut * sceneIn,
          }}
        >
          Waking up with dry, rough skin?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
