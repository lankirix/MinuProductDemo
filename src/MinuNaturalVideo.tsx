import React from "react";
import { AbsoluteFill, Audio, Series } from "remotion";
import { staticFile } from "remotion";
import { Scene1NightHook } from "./scenes/Scene1NightHook";
import { Scene2ProductReveal } from "./scenes/Scene2ProductReveal";
import { Scene3TextureApplication } from "./scenes/Scene3TextureApplication";
import { Scene4MorningGlow } from "./scenes/Scene4MorningGlow";
import { Scene5SelfCare } from "./scenes/Scene5SelfCare";
import { Scene6BrandLockup } from "./scenes/Scene6BrandLockup";
import { Scene7CTA } from "./scenes/Scene7CTA";

// Voiceover duration: 33.67s → rounded to 34s
// 34 seconds @ 30fps = 1020 frames
//
// Scene 1: 120 frames (4s)   — "Your skin works hardest while you sleep."
// Scene 2: 120 frames (4s)   — "That's when Minu's Ceramide Night Barrier Cream does its magic."
// Scene 3: 180 frames (6s)   — "Rich, luxurious ceramides lock in moisture..."
// Scene 4: 120 frames (4s)   — "Wake up to softer, calmer, deeply nourished skin."
// Scene 5: 120 frames (4s)   — "Because you deserve to feel this good every morning."
// Scene 6: 120 frames (4s)   — "Minu Natural. Barrier care that works while you rest."
// Scene 7: 240 frames (8s)   — "Visit minunatural.shop" + extended hold for full voiceover
// Total:  1020 frames (34s)

export const MinuNaturalVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Voiceover — plays across all 1020 frames (full 33.67s) */}
      <Audio src={staticFile("I used to dread look.mp3")} />

      {/* Background music at ~28% volume */}
      <Audio
        src={staticFile("Gentle_Triumph_2026-04-13T195831.mp3")}
        volume={0.28}
      />

      <Series>
        <Series.Sequence durationInFrames={120} premountFor={30}>
          <Scene1NightHook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} premountFor={30}>
          <Scene2ProductReveal />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180} premountFor={30}>
          <Scene3TextureApplication />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} premountFor={30}>
          <Scene4MorningGlow />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} premountFor={30}>
          <Scene5SelfCare />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120} premountFor={30}>
          <Scene6BrandLockup />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240} premountFor={30}>
          <Scene7CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
