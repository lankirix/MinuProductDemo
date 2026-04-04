import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2ProductIntro } from "./scenes/Scene2ProductIntro";
import { Scene3Demo } from "./scenes/Scene3Demo";
import { Scene4Showcase } from "./scenes/Scene4Showcase";
import { Scene5Features } from "./scenes/Scene5Features";
import { Scene6CTA } from "./scenes/Scene6CTA";

// 30 seconds @ 30fps = 900 frames
// Scene 1:  90 frames (3s)  — Hook
// Scene 2:  90 frames (3s)  — Product Intro
// Scene 3: 240 frames (8s)  — Simulated Demo
// Scene 4: 150 frames (5s)  — Product Showcase (3-image crossfade)
// Scene 5:  90 frames (3s)  — Feature Callouts
// Scene 6: 150 frames (5s)  — Email CTA + Coming Soon
// Total:   810 frames (27s)

export const MinuOrganicsVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <Series>
        <Series.Sequence durationInFrames={90} premountFor={30}>
          <Scene1Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90} premountFor={30}>
          <Scene2ProductIntro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240} premountFor={30}>
          <Scene3Demo />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150} premountFor={30}>
          <Scene4Showcase />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90} premountFor={30}>
          <Scene5Features />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150} premountFor={30}>
          <Scene6CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
