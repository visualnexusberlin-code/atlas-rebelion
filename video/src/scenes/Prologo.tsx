import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { blend, C, FORMS } from "../kit";
import { Mechanism } from "../Mechanism";
import { F, Stage, Text } from "../Stage";

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Momento 1 · antes del portal: teselas sueltas que se ordenan en la bóveda.
export const Prologo: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = interpolate(f, [0.6 * fps, 6.5 * fps], [0, 1], cl);
  const form = blend(FORMS.disperso, FORMS.portal, t, 0.45);
  const flash = interpolate(f, [6.3 * fps, 6.8 * fps, 8 * fps], [0, 1, 0], cl);
  const out = interpolate(f, [11 * fps, 12 * fps], [1, 0], cl);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Stage>
        <Mechanism form={{ ...form, core: form.core + flash * 0.8 }} spin={f * 0.12} draw={interpolate(f, [2.5 * fps, 6.5 * fps], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) })}
          glow={1 + flash} scale={interpolate(f, [7 * fps, 9 * fps], [1, 0.9], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) })}
          id="pro" />
        <rect x={-640} y={-360} width={1280} height={720} fill={C.night} opacity={interpolate(f, [7.2 * fps, 8.2 * fps], [0, 0.74], cl)} />
      </Stage>
      <Text y={238} size={96} font={F.deco} opacity={interpolate(f, [7.4 * fps, 8.4 * fps], [0, 1], cl)} shift={interpolate(f, [7.4 * fps, 8.4 * fps], [18, 0], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) })}>
        La rebelión de las masas
      </Text>
      <Text y={364} size={30} font={F.label} color={C.gold} spacing="0.3em" upper opacity={interpolate(f, [8.1 * fps, 8.9 * fps], [0, 1], cl)}>
        José Ortega y Gasset · 1930
      </Text>
      <Text y={440} size={44} font={F.serif} italic opacity={interpolate(f, [9 * fps, 9.8 * fps], [0, 1], cl)}>
        Seis tensiones que siguen abiertas
      </Text>
    </AbsoluteFill>
  );
};
