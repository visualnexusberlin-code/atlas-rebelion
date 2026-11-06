import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { blend, FORMS, TENSIONES } from "../kit";
import { Mechanism } from "../Mechanism";
import { F, Stage, Text } from "../Stage";

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Momento 4 · llegada al centro: las seis figuras se recogen y dejan el núcleo vacío.
export const Centro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inward = interpolate(f, [1 * fps, 4.4 * fps], [0, 1], { ...cl, easing: Easing.bezier(0.65, 0, 0.35, 1) });
  const main = interpolate(f, [2.6 * fps, 5.6 * fps], [0, 1], cl);
  const words = interpolate(f, [5.6 * fps, 6.6 * fps], [0, 1], cl);
  const q = interpolate(f, [7 * fps, 7.8 * fps], [0, 1], cl);
  return (
    <AbsoluteFill>
      <Stage>
        <Mechanism form={blend(FORMS.portal, FORMS.centro, main, 0.35)} spin={f * (0.2 + main * 0.6)} glow={1 + main * 0.35}
          scale={interpolate(main, [0, 1], [0.55, 0.92])} draw={interpolate(f, [2.2 * fps, 4 * fps], [0, 1], cl)} id="cen" />
        {TENSIONES.map((tn, i) => {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2 + f * 0.012;
          const r = interpolate(inward, [0, 1], [270, 20]);
          return (
            <g key={tn.n} opacity={interpolate(inward, [0, 0.75, 1], [1, 0.8, 0])}>
              <Mechanism form={FORMS[tn.figura]} accent={tn.acento} spin={f * 0.3} x={r * 1.6 * Math.cos(a)} y={r * Math.sin(a)}
                scale={interpolate(inward, [0, 1], [0.14, 0.03])} id={`c${i}`} />
            </g>
          );
        })}
        <rect x={-640} y={-360} width={1280} height={720} fill="#06090e" opacity={words * 0.5} />
      </Stage>
      <Text y={260} size={84} font={F.deco} opacity={words} shift={(1 - words) * 16}>Lo que usas no se sostiene solo.</Text>
      <Text y={420} size={48} font={F.serif} italic opacity={q}>¿Qué decides sostener?</Text>
    </AbsoluteFill>
  );
};
