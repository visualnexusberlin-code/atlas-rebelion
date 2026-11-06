import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { blend, C, FORMS, TENSIONES } from "../kit";
import { Mechanism } from "../Mechanism";
import { F, Stage } from "../Stage";

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const mixHex = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
};

// Momento 2 · cómo se lee la bóveda: un mismo mecanismo, seis figuras.
export const SeisFiguras: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lead = 0.7 * fps, step = 1.25 * fps, morph = 0.75 * fps;
  const seq = ["portal", ...TENSIONES.map((t) => t.figura), "portal"];
  const acc = [C.gold, ...TENSIONES.map((t) => t.acento), C.gold];
  const k = Math.max(0, Math.min(seq.length - 2, Math.floor((f - lead) / step)));
  const local = f - lead - k * step;
  const t = interpolate(local, [0, morph], [0, 1], cl);
  const form = f < lead ? FORMS.portal : blend(FORMS[seq[k]], FORMS[seq[k + 1]], t, 0.3);
  const accent = mixHex(acc[k], acc[k + 1], t);
  const idx = k; // tensión que está entrando
  const label = idx < 6 ? TENSIONES[idx] : null;
  const lab = interpolate(local, [morph * 0.6, morph, step - 6, step], [0, 1, 1, 0], cl);
  return (
    <AbsoluteFill>
      <Stage>
        <Mechanism form={form} accent={accent} spin={f * 0.2} x={190} scale={0.86} id="seis" />
      </Stage>
      <div style={{ position: "absolute", left: 80, top: 96, width: 760, fontFamily: F.label, fontSize: 24, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold }}>
        Un mecanismo · seis figuras
      </div>
      {label && (
        <div style={{ position: "absolute", left: 80, top: 300, width: 470, opacity: lab, translate: `0 ${(1 - lab) * 14}px` }}>
          <div style={{ fontFamily: F.deco, fontSize: 64, color: label.acento, textShadow: `0 0 22px ${label.acento}` }}>{label.n}</div>
          <div style={{ fontFamily: F.label, fontWeight: 600, fontSize: 30, letterSpacing: "0.22em", textTransform: "uppercase", color: C.paper, marginTop: 10 }}>{label.corto}</div>
          <div style={{ fontFamily: F.serif, fontStyle: "italic", fontSize: 44, lineHeight: 1.2, color: C.paper, marginTop: 14 }}>{label.titulo}</div>
        </div>
      )}
    </AbsoluteFill>
  );
};
