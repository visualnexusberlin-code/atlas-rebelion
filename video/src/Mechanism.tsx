import React from "react";
import { C, POLY, type Form } from "./kit";

const mix = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};
const hexPath = (r: number) =>
  [...Array(6).keys()].map((k) => { const a = Math.PI / 2 + (k * Math.PI) / 3; return `${k ? "L" : "M"}${(r * Math.cos(a)).toFixed(1)} ${(-r * Math.sin(a)).toFixed(1)}`; }).join(" ") + "Z";

type Props = {
  readonly form: Form;
  readonly accent?: string;
  readonly uniform?: number; // 0 pluralidad → 1 todo del mismo color
  readonly spin?: number; // grados de giro acumulado de los anillos
  readonly draw?: number; // 0..1, trazo de los anillos
  readonly glow?: number;
  readonly x?: number;
  readonly y?: number;
  readonly scale?: number;
  readonly id?: string;
};

// El mismo kit de piezas de la web, dibujado en SVG con resplandor.
export const Mechanism: React.FC<Props> = ({ form, accent = C.gold, uniform = 0, spin = 0, draw = 1, glow = 1, x = 0, y = 0, scale = 1, id = "m" }) => {
  const gold = mix(C.gold, C.mono, uniform);
  const acc = mix(accent, C.mono, uniform);
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <defs>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={4 * glow} result="b1" />
          <feGaussianBlur stdDeviation={14 * glow} result="b2" in="SourceGraphic" />
          <feMerge><feMergeNode in="b2" /><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id={`${id}-core`}>
          <stop offset="0" stopColor="#fff6dc" />
          <stop offset="0.35" stopColor="#ffe2a6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe2a6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {form.hex.map((h, i) => (
        <g key={`h${i}`} transform={`translate(0 ${h.y})`} opacity={h.op}>
          <path d={hexPath(h.r)} fill="none" stroke={gold} strokeWidth={i ? 1.2 : 2.2} opacity={i ? 0.55 : 0.9} filter={`url(#${id}-glow)`} />
          {i === 0 && [...Array(6).keys()].map((k) => { const a = Math.PI / 2 + (k * Math.PI) / 3; return (
            <g key={k} transform={`translate(${(h.r * 1.06 * Math.cos(a)).toFixed(1)} ${(-h.r * 1.06 * Math.sin(a)).toFixed(1)}) rotate(${90 - (a * 180) / Math.PI})`}>
              {[0, 1, 2].map((c) => <path key={c} d={`M${-16 + c * 4} ${c * 8} L0 ${-12 + c * 8} L${16 - c * 4} ${c * 8}`} fill="none" stroke={gold} strokeWidth={1.4} opacity={0.8 - c * 0.2} />)}
            </g>); })}
        </g>
      ))}
      <g filter={`url(#${id}-glow)`}>
        {form.rays.map((r, i) => (
          <line key={`r${i}`} x1={r.x} y1={r.y} x2={r.x + r.len * Math.cos((r.ang * Math.PI) / 180)} y2={r.y + r.len * Math.sin((r.ang * Math.PI) / 180)}
            stroke={i % 2 ? gold : acc} strokeWidth={i % 2 ? 1.1 : 1.6} opacity={r.op * (i % 2 ? 0.6 : 0.9)} strokeLinecap="round" />
        ))}
        {form.rings.map((r, i) => {
          const circ = Math.PI * (r.rx + r.ry);
          return (
            <g key={`g${i}`} transform={`translate(${r.cx} ${r.cy}) rotate(${r.rot})`} opacity={r.op}>
              <ellipse rx={Math.max(0.01, r.rx)} ry={Math.max(0.01, r.ry)} fill="none" stroke={i % 2 ? gold : acc} strokeWidth={i % 3 === 0 ? 2 : 1.3}
                strokeDasharray={`${circ * draw} ${circ}`} transform={`rotate(${(i % 2 ? 1 : -1) * spin * (1 + i * 0.15)})`} />
              {r.rx > 30 && [...Array(i % 2 ? 36 : 24).keys()].map((k, _, arr) => { const a = (k / arr.length) * Math.PI * 2 + ((i % 2 ? 1 : -1) * spin * (1 + i * 0.15) * Math.PI) / 180; return (
                <line key={k} x1={r.rx * Math.cos(a)} y1={r.ry * Math.sin(a)} x2={(r.rx + (k % 3 ? 4 : 8)) * Math.cos(a)} y2={(r.ry + (k % 3 ? 4 : 8) * (r.ry / r.rx)) * Math.sin(a)}
                  stroke={gold} strokeWidth={1} opacity={0.55 * draw} />); })}
            </g>
          );
        })}
      </g>
      {form.tiles.map((t, i) => (
        <g key={`t${i}`} transform={`translate(${t.x} ${t.y}) scale(${t.s})`} opacity={t.op}>
          <path d="M0 -10 L6.5 0 L0 10 L-6.5 0Z" fill={mix(POLY[i % 12], C.mono, uniform)} filter={`url(#${id}-glow)`} />
        </g>
      ))}
      <circle r={Math.min(110, 42 * form.core)} fill={`url(#${id}-core)`} opacity={0.85} />
      <circle r={9 * Math.min(1.6, form.core)} fill="#fff4d8" filter={`url(#${id}-glow)`} />
    </g>
  );
};
