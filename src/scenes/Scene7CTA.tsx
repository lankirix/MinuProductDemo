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
const BG = "#0A0A0A";

/*
  Scene 7 — Generic Search Bar + Website (240 frames / 8s)

  [0-2.5s]   Clean dark background + generic search bar appears
  [2.5-5s]   Types "minunatural.shop" character by character
  [5-5.5s]   Search executes (loading indicator)
  [5.5-8s]   Mobile website screenshot with CTA overlay
*/

const SEARCH_TEXT = "minunatural.shop";

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Scene fade in ──────────────────────────────────────────────────────────
  const sceneIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Phase 1: Search bar appears (frames 0-30) ─────────────────────────────
  const searchBarSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
    durationInFrames: 30,
  });
  const searchBarY = interpolate(searchBarSpring, [0, 1], [40, 0]);

  // ── Phase 2: Typing animation (frames 30-120) ─────────────────────────────
  const charsVisible = Math.floor(
    interpolate(frame, [30, 120], [0, SEARCH_TEXT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayText = SEARCH_TEXT.slice(0, charsVisible);
  const showCaret = frame >= 30 && frame <= 120 && frame % 16 < 10;

  // ── Phase 3: Loading / search transition (frames 120-150) ─────────────────
  const loadingOpacity = interpolate(frame, [120, 125, 145, 150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const spinnerRot = (frame * 12) % 360;

  // ── Phase 4: Website reveal (frames 140+) ─────────────────────────────────
  const websiteSpring = spring({
    frame: Math.max(0, frame - 140),
    fps,
    config: { damping: 16, stiffness: 120 },
    durationInFrames: 40,
  });
  const websiteScale = interpolate(websiteSpring, [0, 1], [0.9, 1]);

  // Slow Ken Burns zoom on website — signature style
  const websiteZoom = interpolate(frame, [170, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zoomScale = 1 + websiteZoom * 0.03;

  // ── CTA overlay on website ────────────────────────────────────────────────
  const ctaOpacity = interpolate(frame, [170, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL glow pulse
  const urlGlow = 0.5 + Math.sin(frame * 0.06) * 0.2;

  // Tagline
  const taglineOpacity = interpolate(frame, [195, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade last 10 frames
  const holdFade = interpolate(frame, [228, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        overflow: "hidden",
        opacity: sceneIn * holdFade,
      }}
    >
      {/* ── Background: dark gradient ── */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 35%, ${SOFT_GOLD}08 0%, ${BG} 70%)`,
        }}
      />

      {/* ── Phase 1-2: Search bar + typing ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: interpolate(frame, [0, 10, 110, 130], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${searchBarY}px)`,
        }}
      >
        {/* Subtle glow behind search bar */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${SOFT_GOLD}10 0%, transparent 70%)`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Label above search bar */}
        <div
          style={{
            fontFamily,
            fontSize: 22,
            fontWeight: 400,
            color: "#666",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Search
        </div>

        {/* Search bar */}
        <div
          style={{
            width: 600,
            height: 72,
            backgroundColor: "#1A1A1A",
            borderRadius: 36,
            border: `2px solid ${SOFT_GOLD}40`,
            display: "flex",
            alignItems: "center",
            paddingLeft: 32,
            paddingRight: 32,
            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${SOFT_GOLD}10`,
          }}
        >
          {/* Search icon */}
          <span
            style={{
              color: "#666",
              fontSize: 28,
              marginRight: 16,
              flexShrink: 0,
            }}
          >
            🔍
          </span>

          {/* Typed text */}
          <span
            style={{
              fontFamily,
              fontSize: 32,
              color: charsVisible > 0 ? CREAM : "#333",
              display: "flex",
              alignItems: "center",
            }}
          >
            {charsVisible > 0 ? displayText : "Search the web..."}
            {showCaret && (
              <span style={{ color: SOFT_GOLD, marginLeft: 2, fontWeight: 800 }}>
                |
              </span>
            )}
          </span>
        </div>

        {/* Subtle hint text */}
        <div
          style={{
            fontFamily,
            fontSize: 18,
            fontWeight: 400,
            color: "#444",
            marginTop: 20,
            letterSpacing: 2,
          }}
        >
          Tap to visit
        </div>
      </div>

      {/* ── Phase 3: Loading spinner ── */}
      {loadingOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `${BG}EE`,
            opacity: loadingOpacity,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: `4px solid ${SOFT_GOLD}20`,
              borderTop: `4px solid ${SOFT_GOLD}`,
              transform: `rotate(${spinnerRot}deg)`,
            }}
          />
        </div>
      )}

      {/* ── Phase 4: Website screenshot ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: websiteSpring,
          transform: `scale(${websiteScale})`,
        }}
      >
        {/* Mobile website screenshot — centered on 9:16 canvas */}
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
            src={staticFile("minunatural-mobile.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${zoomScale})`,
            }}
          />
        </div>

        {/* Dark gradient overlay for CTA readability */}
        <AbsoluteFill
          style={{
            background: `linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 40%, transparent 70%)`,
          }}
        />

        {/* CTA overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 160,
            left: 60,
            right: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: ctaOpacity,
          }}
        >
          {/* "Visit" label */}
          <div
            style={{
              fontFamily,
              fontSize: 22,
              fontWeight: 400,
              color: "#888",
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            Visit
          </div>

          {/* URL — main CTA */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Glow behind URL */}
            <div
              style={{
                position: "absolute",
                width: 500,
                height: 120,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${SOFT_GOLD}${Math.round(urlGlow * 30).toString(16).padStart(2, "0")}, transparent 70%)`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            <div
              style={{
                position: "relative",
                fontFamily,
                fontSize: 52,
                fontWeight: 800,
                color: CREAM,
                textAlign: "center",
                letterSpacing: 2,
                textShadow: `0 0 40px rgba(196,168,124,0.4), 0 4px 20px rgba(0,0,0,0.6)`,
              }}
            >
              minunatural.shop
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontFamily,
              fontSize: 20,
              fontWeight: 400,
              color: SOFT_GOLD,
              textAlign: "center",
              letterSpacing: 3,
              opacity: taglineOpacity,
            }}
          >
            Wellness · Beauty · Consultancy
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${SOFT_GOLD}40, transparent)`,
              opacity: taglineOpacity,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
