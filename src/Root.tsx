import React from "react";
import { Composition } from "remotion";
import { MinuOrganicsVideo } from "./MinuOrganicsVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MinuOrganicsDemo"
      component={MinuOrganicsVideo}
      durationInFrames={810}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
