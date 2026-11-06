import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { blend, C, FORMS, TENSIONES } from "../kit";
import { Mechanism } from "../Mechanism";
import { F, Stage } from "../Stage";

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Momento 3 · el experimento llevado al extremo: seis figuras, una sola forma.
export const Uniformar: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pos = (i: number) => ({ x: -400 + (i % 3) * 400, y: i < 3 ? -150 : 165 });
  const fin = interpolate(f, [5 * fps, 6 * fps], [0, 1], cl);
  return (
    <AbsoluteFill>
      <Stage dim={1 - fin * 0.8}>
        {TENSIONES.map((tn, i) => {
          const t = interpolate(f, [(1 + i * 0.18) * fps, (3.4 + i * 0.18) * fps], [0, 1], cl);
          const { x, y } = pos(i);
          return (
            <Mechanism key={tn.n} form={blend(FORMS[tn.figura], FORMS.columna, t, 0.25)} accent={tn.acento} uniform={t} spin={f * 0.2 * (1 - t)}
              glow={1 - t * 0.7} x={interpolate(fin, [0, 1], [x, 0])} y={interpolate(fin, [0, 1], [y - 30, -70])} scale={interpolate(fin, [0, 1], [0.3, 0.62])} id={`u${i}`} />
          );
        })}
      </Stage>
      {TENSIONES.map((tn, i) => {
        const t = interpolate(f, [(2.4 + i * 0.18) * fps, (3.6 + i * 0.18) * fps], [0, 1], cl);
        const { x, y } = pos(i);
        return (
          <div key={tn.n} style={{ position: "absolute", left: 640 + x - 190, top: 360 + y + 104, width: 380, textAlign: "center", fontFamily: F.label, fontWeight: 600, fontSize: 21,
            letterSpacing: "0.14em", textTransform: "uppercase", color: t > 0.5 ? C.mono : tn.acento, opacity: 1 - fin }}>
            {t > 0.5 ? "Todos hacia el mismo lado" : tn.corto}
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 80, right: 80, top: 520, textAlign: "center", fontFamily: F.serif, fontStyle: "italic", fontSize: 46, color: C.paper, opacity: fin,
        translate: `0 ${interpolate(fin, [0, 1], [16, 0], { easing: Easing.bezier(0.16, 1, 0.3, 1) })}px` }}>
        Cuando todo suena igual, ya no queda nada que elegir.
      </div>
    </AbsoluteFill>
  );
};
