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
const CARD_BG = "#141414";
const INPUT_BG = "#1C1C1C";
const BORDER = "#2C2C2C";
const MUTED = "#888888";

const INPUT_TEXT = "dry skin, barrier repair";

// UI layout — all positions are absolute on 1080x1920 canvas
const TITLE_Y = 300;
const INPUT_Y = 570;
const INPUT_H = 80;
const BUTTON_Y = 680;
const BUTTON_H = 80;
const RESULT_Y = 840;

const INPUT_CENTER_X = 540;
const INPUT_CENTER_Y = INPUT_Y + INPUT_H / 2;
const BUTTON_CENTER_X = 540;
const BUTTON_CENTER_Y = BUTTON_Y + BUTTON_H / 2;
const CURSOR_START_Y = 460;

export const Scene3Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Scene fade-in ──────────────────────────────────────────────────────────
  const sceneIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Cursor movement ────────────────────────────────────────────────────────
  const move1 = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 15 },
    durationInFrames: 30,
  });
  const move2 = spring({
    frame: Math.max(0, frame - 135),
    fps,
    config: { damping: 15 },
    durationInFrames: 30,
  });

  const cursorX = INPUT_CENTER_X;
  const cursorY =
    frame < 135
      ? interpolate(move1, [0, 1], [CURSOR_START_Y, INPUT_CENTER_Y])
      : interpolate(move2, [0, 1], [INPUT_CENTER_Y, BUTTON_CENTER_Y]);

  const cursorOpacity = interpolate(frame, [0, 5, 180, 200], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Input click ripple (frames 35–55) ──────────────────────────────────────
  const ripple1 = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple1Scale = 1 + ripple1 * 3.5;
  const ripple1Opacity = interpolate(frame, [35, 55], [0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Typing animation (frames 45–135) ───────────────────────────────────────
  const charsVisible = Math.floor(
    interpolate(frame, [45, 135], [0, INPUT_TEXT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayText = INPUT_TEXT.slice(0, charsVisible);
  const inputFocused = frame >= 35 && frame <= 165;
  const showBlinkCursor = frame >= 45 && frame <= 135 && frame % 23 < 15;

  // ── Button interaction (frames 165–185) ────────────────────────────────────
  const buttonDepress = interpolate(frame, [165, 170, 176], [1, 0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple2 = interpolate(frame, [165, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple2Scale = 1 + ripple2 * 4;
  const ripple2Opacity = interpolate(frame, [165, 190], [0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Loading spinner (frames 175–200) ───────────────────────────────────────
  const spinnerOpacity = interpolate(
    frame,
    [175, 182, 195, 202],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const spinnerRot = (frame * 12) % 360;

  // ── Result card (frame 200+) ───────────────────────────────────────────────
  const cardSpring = spring({
    frame: Math.max(0, frame - 200),
    fps,
    config: { damping: 20, stiffness: 200 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [70, 0]);
  const cardOpacity = cardSpring;

  const badge = spring({ frame: Math.max(0, frame - 202), fps, config: { damping: 20, stiffness: 200 } });
  const line1 = spring({ frame: Math.max(0, frame - 208), fps, config: { damping: 20, stiffness: 200 } });
  const line2 = spring({ frame: Math.max(0, frame - 216), fps, config: { damping: 20, stiffness: 200 } });
  const line3 = spring({ frame: Math.max(0, frame - 224), fps, config: { damping: 20, stiffness: 200 } });

  const bullets = [
    "Wake up to skin that finally feels like yours",
    "Seals your barrier while you sleep",
    "You deserve to stop hiding behind dry, rough skin",
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BG, overflow: "hidden" }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${SAGE}18 0%, transparent 65%)`,
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          opacity: sceneIn,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: TITLE_Y,
          left: 60,
          right: 60,
          opacity: sceneIn,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 60,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          What's your skin concern?
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 36,
            fontWeight: 400,
            color: MUTED,
            textAlign: "center",
            marginTop: 18,
          }}
        >
          Find your perfect cream
        </div>
      </div>

      {/* Input field label */}
      <div
        style={{
          position: "absolute",
          top: INPUT_Y - 46,
          left: 60,
          fontFamily,
          fontSize: 28,
          fontWeight: 700,
          color: MUTED,
          letterSpacing: 2,
          opacity: sceneIn,
        }}
      >
        SKIN CONCERN
      </div>

      {/* Input field */}
      <div
        style={{
          position: "absolute",
          top: INPUT_Y,
          left: 60,
          right: 60,
          height: INPUT_H,
          backgroundColor: INPUT_BG,
          borderRadius: 16,
          border: `2px solid ${inputFocused ? SAGE : BORDER}`,
          display: "flex",
          alignItems: "center",
          paddingLeft: 30,
          paddingRight: 30,
          overflow: "hidden",
          opacity: sceneIn,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 36,
            color: charsVisible > 0 ? "#FFFFFF" : "#444",
            display: "flex",
            alignItems: "center",
          }}
        >
          {charsVisible > 0
            ? displayText
            : "e.g. dry skin, sensitive, oily..."}
          {showBlinkCursor && (
            <span style={{ color: SAGE, marginLeft: 2 }}>|</span>
          )}
        </div>
      </div>

      {/* Input click ripple */}
      {ripple1 > 0 && ripple1 < 1 && (
        <div
          style={{
            position: "absolute",
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: `2px solid ${SAGE}`,
            left: INPUT_CENTER_X - 35,
            top: INPUT_CENTER_Y - 35,
            transform: `scale(${ripple1Scale})`,
            opacity: ripple1Opacity,
          }}
        />
      )}

      {/* Button */}
      <div
        style={{
          position: "absolute",
          top: BUTTON_Y,
          left: 60,
          right: 60,
          height: BUTTON_H,
          backgroundColor: SAGE,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${buttonDepress})`,
          opacity: sceneIn,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 36,
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          Find My Cream
        </div>
      </div>

      {/* Button click ripple */}
      {ripple2 > 0 && ripple2 < 1 && (
        <div
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: `2px solid ${SAGE}`,
            left: BUTTON_CENTER_X - 40,
            top: BUTTON_CENTER_Y - 40,
            transform: `scale(${ripple2Scale})`,
            opacity: ripple2Opacity,
          }}
        />
      )}

      {/* Loading spinner */}
      {spinnerOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: 540 - 44,
            top: RESULT_Y + 40,
            width: 88,
            height: 88,
            borderRadius: "50%",
            border: `6px solid ${SAGE}30`,
            borderTop: `6px solid ${SAGE}`,
            transform: `rotate(${spinnerRot}deg)`,
            opacity: spinnerOpacity,
          }}
        />
      )}

      {/* Result card */}
      {cardOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            top: RESULT_Y + cardY,
            left: 60,
            right: 60,
            backgroundColor: CARD_BG,
            borderRadius: 24,
            border: `1px solid ${BORDER}`,
            overflow: "hidden",
            opacity: cardOpacity,
          }}
        >
          {/* Accent top bar */}
          <div style={{ height: 4, backgroundColor: SAGE, width: "100%" }} />

          <div style={{ padding: 40 }}>
            {/* Perfect Match badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: `${SAGE}20`,
                border: `1px solid ${SAGE}50`,
                borderRadius: 100,
                paddingLeft: 22,
                paddingRight: 22,
                paddingTop: 10,
                paddingBottom: 10,
                marginBottom: 28,
                opacity: badge,
                transform: `scale(${interpolate(badge, [0, 1], [0.8, 1])})`,
              }}
            >
              <div
                style={{
                  fontFamily,
                  fontSize: 28,
                  fontWeight: 700,
                  color: SAGE,
                }}
              >
                ✓  Perfect Match
              </div>
            </div>

            {/* Product name */}
            <div
              style={{
                fontFamily,
                fontSize: 48,
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.2,
                marginBottom: 14,
                opacity: line1,
                transform: `translateY(${interpolate(line1, [0, 1], [24, 0])}px)`,
              }}
            >
              Ceramide Barrier Night Cream
            </div>

            {/* Brand + shop URL */}
            <div
              style={{
                fontFamily,
                fontSize: 26,
                fontWeight: 400,
                color: SAGE,
                letterSpacing: 3,
                marginBottom: 32,
                opacity: line2,
                transform: `translateY(${interpolate(line2, [0, 1], [20, 0])}px)`,
              }}
            >
              minu NATURALS · minunatural.shop
            </div>

            {/* Emotional bullet points */}
            <div
              style={{
                opacity: line3,
                transform: `translateY(${interpolate(line3, [0, 1], [20, 0])}px)`,
              }}
            >
              {bullets.map((text, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily,
                    fontSize: 32,
                    fontWeight: 400,
                    color: "#CCCCCC",
                    lineHeight: 1.85,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                  }}
                >
                  <span style={{ color: SAGE, fontWeight: 700, marginTop: 2, flexShrink: 0 }}>●</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cursor — white circle */}
      <div
        style={{
          position: "absolute",
          width: 28,
          height: 28,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.92)",
          boxShadow:
            "0 0 0 4px rgba(255,255,255,0.2), 0 4px 16px rgba(0,0,0,0.6)",
          left: cursorX - 14,
          top: cursorY - 14,
          opacity: cursorOpacity,
          zIndex: 200,
        }}
      />
    </AbsoluteFill>
  );
};
