import React from "react";
import { Composition } from "remotion";
import { MinuNaturalVideo } from "./MinuNaturalVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MinuNaturalDemo"
      component={MinuNaturalVideo}
      durationInFrames={1020}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
