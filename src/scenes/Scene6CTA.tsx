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
const MINT = "#A8D18A";
const BG = "#0A0A0A";
const CARD_BG = "#141414";
const INPUT_BG = "#1C1C1C";
const BORDER = "#2C2C2C";

const EMAIL_TEXT = "info@lankirix.com";

export const Scene6CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Scene fade-in ──────────────────────────────────────────────────────────
  const sceneIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Product image floats in (frame 0) ─────────────────────────────────────
  const imageSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100 },
    durationInFrames: 35,
  });
  const imageY = interpolate(imageSpring, [0, 1], [100, 0]);
  const imageScale = interpolate(imageSpring, [0, 1], [0.9, 1]);
  // Continuous float
  const floatY = Math.sin(frame * 0.065) * 16;
  // Glow pulse behind product
  const glowPulse = 0.5 + Math.sin(frame * 0.08) * 0.18;

  // ── "COMING SOON" badge (frame 16) ────────────────────────────────────────
  const badgeSpring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 16, stiffness: 220 },
    durationInFrames: 25,
  });
  const badgeDot = 0.55 + Math.sin(frame * 0.2) * 0.45;

  // ── Headline (frame 26) ───────────────────────────────────────────────────
  const headSpring = spring({
    frame: Math.max(0, frame - 26),
    fps,
    config: { damping: 20, stiffness: 180 },
    durationInFrames: 30,
  });

  // ── Sub copy (frame 38) ───────────────────────────────────────────────────
  const subSpring = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { damping: 20, stiffness: 180 },
    durationInFrames: 30,
  });

  // ── Email card slides up (frame 50) ───────────────────────────────────────
  const cardSpring = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 18, stiffness: 160 },
    durationInFrames: 30,
  });
  const cardY = interpolate(cardSpring, [0, 1], [60, 0]);

  // ── Email label fades in (frame 58) ───────────────────────────────────────
  const labelOpacity = interpolate(frame, [58, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Cursor moves to input field (frame 64–80) ─────────────────────────────
  const cursorMove = spring({
    frame: Math.max(0, frame - 64),
    fps,
    config: { damping: 15 },
    durationInFrames: 18,
  });
  // Input field center (approx on 1080 canvas)
  const INPUT_CENTER_Y = 1138;
  const cursorY = interpolate(cursorMove, [0, 1], [1020, INPUT_CENTER_Y]);
  const cursorOpacity = interpolate(frame, [62, 66, 118, 128], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Click ripple on input (frame 80–96) ───────────────────────────────────
  const ripple = interpolate(frame, [80, 98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleScale = 1 + ripple * 3.5;
  const rippleOpacity = interpolate(frame, [80, 98], [0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Email typing (frame 84–120) ───────────────────────────────────────────
  const inputFocused = frame >= 80 && frame <= 138;
  const charsVisible = Math.floor(
    interpolate(frame, [84, 120], [0, EMAIL_TEXT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayEmail = EMAIL_TEXT.slice(0, charsVisible);
  const showCaret = frame >= 84 && frame <= 120 && frame % 22 < 14;

  // ── Cursor moves to button (frame 122–134) ────────────────────────────────
  const BUTTON_CENTER_Y = 1240;
  const cursorMove2 = spring({
    frame: Math.max(0, frame - 122),
    fps,
    config: { damping: 15 },
    durationInFrames: 14,
  });
  const cursorY2 = interpolate(cursorMove2, [0, 1], [INPUT_CENTER_Y, BUTTON_CENTER_Y]);
  const activeCursorY = frame < 122 ? cursorY : cursorY2;

  // ── Button press (frame 134–142) ──────────────────────────────────────────
  const buttonDepress = interpolate(frame, [134, 138, 143], [1, 0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple2 = interpolate(frame, [134, 148], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple2Scale = 1 + ripple2 * 3.5;
  const ripple2Opacity = interpolate(frame, [134, 148], [0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Success state (frame 144+) ────────────────────────────────────────────
  const successSpring = spring({
    frame: Math.max(0, frame - 144),
    fps,
    config: { damping: 16, stiffness: 220 },
    durationInFrames: 20,
  });
  const showSuccess = frame >= 144;

  // ── URL / tagline (frame 50) ──────────────────────────────────────────────
  const urlOpacity = interpolate(frame, [50, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlPulse = 1 + Math.sin(Math.max(0, frame - 50) * 0.12) * 0.018;

  // ── Fade to black at end ───────────────────────────────────────────────────
  const fadeOut = interpolate(frame, [142, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        overflow: "hidden",
        opacity: sceneIn * fadeOut,
      }}
    >
      {/* ── Pulsing glow behind product ── */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${SAGE}${Math.round(glowPulse * 50)
            .toString(16)
            .padStart(2, "0")} 0%, transparent 65%)`,
          left: "50%",
          top: 430,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* ── Product image — floats ── */}
      <div
        style={{
          position: "absolute",
          top: 60 + imageY + floatY,
          left: 160,
          right: 160,
          height: 620,
          transform: `scale(${imageScale})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile("product-3.jpeg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter:
              "drop-shadow(0 40px 70px rgba(0,0,0,0.85)) drop-shadow(0 0 50px rgba(127,176,105,0.22))",
          }}
        />
      </div>

      {/* ── Text + email block ── */}
      <div
        style={{
          position: "absolute",
          top: 730,
          left: 60,
          right: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* COMING SOON badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            backgroundColor: `${SAGE}18`,
            border: `1px solid ${SAGE}55`,
            borderRadius: 100,
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 14,
            paddingBottom: 14,
            marginBottom: 32,
            opacity: badgeSpring,
            transform: `scale(${badgeSpring})`,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: SAGE,
              opacity: badgeDot,
            }}
          />
          <span
            style={{
              fontFamily,
              fontSize: 26,
              fontWeight: 700,
              color: SAGE,
              letterSpacing: 5,
            }}
          >
            LAUNCHING GLOBALLY · SOON
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily,
            fontSize: 62,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.18,
            opacity: headSpring,
            transform: `translateY(${interpolate(headSpring, [0, 1], [40, 0])}px)`,
            marginBottom: 22,
          }}
        >
          Your skin's{" "}
          <span style={{ color: SAGE }}>transformation</span>
          {"\n"}starts here.
        </div>

        {/* Sub copy */}
        <div
          style={{
            fontFamily,
            fontSize: 32,
            fontWeight: 400,
            color: "#999999",
            textAlign: "center",
            lineHeight: 1.55,
            opacity: subSpring,
            transform: `translateY(${interpolate(subSpring, [0, 1], [30, 0])}px)`,
            marginBottom: 44,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          Be the first to know when we ship worldwide.{"\n"}
          <span style={{ color: "#CCCCCC", fontWeight: 500 }}>
            Join the waitlist. Your skin can't wait.
          </span>
        </div>

        {/* ── Email signup card ── */}
        <div
          style={{
            width: "100%",
            backgroundColor: CARD_BG,
            borderRadius: 24,
            border: `1px solid ${BORDER}`,
            overflow: "hidden",
            opacity: cardSpring,
            transform: `translateY(${cardY}px)`,
          }}
        >
          {/* Sage top bar */}
          <div style={{ height: 4, backgroundColor: SAGE }} />

          <div style={{ padding: 36 }}>
            {/* Label */}
            <div
              style={{
                fontFamily,
                fontSize: 24,
                fontWeight: 700,
                color: "#666",
                letterSpacing: 3,
                marginBottom: 18,
                opacity: labelOpacity,
              }}
            >
              EMAIL ADDRESS
            </div>

            {/* Input field */}
            {!showSuccess ? (
              <div
                style={{
                  backgroundColor: INPUT_BG,
                  borderRadius: 14,
                  border: `2px solid ${inputFocused ? SAGE : BORDER}`,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 28,
                  paddingRight: 28,
                  marginBottom: 20,
                  boxSizing: "border-box",
                  boxShadow: inputFocused ? `0 0 0 3px ${SAGE}20` : "none",
                }}
              >
                <div
                  style={{
                    fontFamily,
                    fontSize: 34,
                    color: charsVisible > 0 ? "#FFFFFF" : "#3A3A3A",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {charsVisible > 0
                    ? displayEmail
                    : "yourname@email.com"}
                  {showCaret && (
                    <span style={{ color: SAGE, marginLeft: 2 }}>|</span>
                  )}
                </div>
              </div>
            ) : (
              // Success state
              <div
                style={{
                  backgroundColor: `${SAGE}15`,
                  borderRadius: 14,
                  border: `2px solid ${SAGE}60`,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  marginBottom: 20,
                  opacity: successSpring,
                  transform: `scale(${interpolate(successSpring, [0, 1], [0.95, 1])})`,
                }}
              >
                <span style={{ fontSize: 36 }}>✓</span>
                <span
                  style={{
                    fontFamily,
                    fontSize: 32,
                    fontWeight: 700,
                    color: SAGE,
                  }}
                >
                  You're on the list!
                </span>
              </div>
            )}

            {/* CTA button */}
            <div
              style={{
                backgroundColor: SAGE,
                borderRadius: 14,
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${buttonDepress})`,
                boxShadow: "0 8px 32px rgba(127,176,105,0.35)",
                opacity: cardSpring,
              }}
            >
              <span
                style={{
                  fontFamily,
                  fontSize: 34,
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {showSuccess ? "Welcome to minu family" : "Notify Me at Launch"}
              </span>
            </div>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            fontFamily,
            fontSize: 40,
            fontWeight: 800,
            color: MINT,
            textAlign: "center",
            marginTop: 36,
            transform: `scale(${urlPulse})`,
            opacity: urlOpacity,
            letterSpacing: 1,
          }}
        >
          minunatural.shop
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 24,
            fontWeight: 400,
            color: "#444",
            letterSpacing: 4,
            marginTop: 14,
            opacity: urlOpacity,
          }}
        >
          WELLNESS · BEAUTY · CONSULTANCY
        </div>
      </div>

      {/* Input click ripple */}
      {ripple > 0 && ripple < 1 && (
        <div
          style={{
            position: "absolute",
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: `2px solid ${SAGE}`,
            left: 540 - 30,
            top: INPUT_CENTER_Y - 30,
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* Button click ripple */}
      {ripple2 > 0 && ripple2 < 1 && (
        <div
          style={{
            position: "absolute",
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: `2px solid ${SAGE}`,
            left: 540 - 30,
            top: BUTTON_CENTER_Y - 30,
            transform: `scale(${ripple2Scale})`,
            opacity: ripple2Opacity,
          }}
        />
      )}

      {/* ── Cursor ── */}
      <div
        style={{
          position: "absolute",
          width: 26,
          height: 26,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.92)",
          boxShadow:
            "0 0 0 4px rgba(255,255,255,0.18), 0 4px 14px rgba(0,0,0,0.6)",
          left: 540 - 13,
          top: activeCursorY - 13,
          opacity: cursorOpacity,
          zIndex: 200,
        }}
      />
    </AbsoluteFill>
  );
};
