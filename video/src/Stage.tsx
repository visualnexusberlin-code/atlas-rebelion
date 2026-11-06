import React from "react";
import { AbsoluteFill } from "remotion";
import "@fontsource/poiret-one/400.css";
import "@fontsource/josefin-sans/300.css";
import "@fontsource/josefin-sans/600.css";
import "@fontsource/source-serif-4/400-italic.css";
import { C } from "./kit";

export const F = {
  deco: "'Poiret One', 'Josefin Sans', sans-serif",
  label: "'Josefin Sans', sans-serif",
  serif: "'Source Serif 4', Georgia, serif",
};

// Fondo de noche con el sunburst grabado de la web.
export const Stage: React.FC<{ children: React.ReactNode; dim?: number }> = ({ children, dim = 1 }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 60% at 50% 46%, rgba(242,200,121,${0.08 * dim}), transparent 70%), radial-gradient(ellipse at 50% 120%, #0d1a26 0, ${C.night} 60%)` }}>
    <svg viewBox="-640 -360 1280 720" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      <g opacity={0.05 * dim}>
        {[...Array(48).keys()].map((k) => { const a = (k / 48) * Math.PI * 2; return <line key={k} x1={0} y1={0} x2={900 * Math.cos(a)} y2={900 * Math.sin(a)} stroke={C.gold} strokeWidth={2} />; })}
      </g>
      {children}
    </svg>
  </AbsoluteFill>
);

export const Text: React.FC<{ children: React.ReactNode; y: number; size: number; font: string; color?: string; opacity?: number; spacing?: string; italic?: boolean; shift?: number; upper?: boolean }> =
  ({ children, y, size, font, color = C.paper, opacity = 1, spacing = "0", italic = false, shift = 0, upper = false }) => (
    <div style={{ position: "absolute", left: 80, right: 80, top: y, textAlign: "center", fontFamily: font, fontSize: size, color, opacity,
      letterSpacing: spacing, fontStyle: italic ? "italic" : "normal", textTransform: upper ? "uppercase" : "none", translate: `0 ${shift}px`,
      textShadow: "0 0 24px rgba(242,200,121,.35), 0 2px 14px #000", lineHeight: 1.15 }}>{children}</div>
  );
