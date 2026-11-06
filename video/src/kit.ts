// Gramática compartida con la web: las mismas piezas (7 anillos, 24 rayos,
// 36 teselas, 4 marcos hexagonales) cambian de formación.
export const C = {
  night: "#06090e",
  gold: "#f2c879",
  paper: "#efe6d2",
  muted: "#a59a86",
  mono: "#8d8a83",
};
export const POLY = ["#29c4ae", "#ffb627", "#3d8bff", "#ff4a3d", "#ff7a2f", "#b25cff", "#66d43a", "#ff9a1f", "#1fd6d0", "#5ea4ff", "#ff5a36", "#c3d92a"];
export const TENSIONES = [
  { n: "I", corto: "Posibilidades", titulo: "Más mundo, ¿más criterio?", acento: "#7fb6ff", figura: "armilar" },
  { n: "II", corto: "Herencia", titulo: "Lo recibido, ¿deuda o derecho?", acento: "#ffc46b", figura: "zigurat" },
  { n: "III", corto: "Conocimiento", titulo: "¿Quién entiende la máquina?", acento: "#5fe3c9", figura: "engranajes" },
  { n: "IV", corto: "Desacuerdo", titulo: "¿Razones comunes o reglas revisables?", acento: "#ff8a6b", figura: "tribunas" },
  { n: "V", corto: "Poder", titulo: "¿Qué sostiene el poder común?", acento: "#ff6f61", figura: "atrio" },
  { n: "VI", corto: "Proyecto", titulo: "¿Qué futuro cabe entre distintos?", acento: "#c79bff", figura: "mosaico" },
] as const;

export type RingP = { cx: number; cy: number; rx: number; ry: number; rot: number; op: number };
export type RayP = { x: number; y: number; ang: number; len: number; op: number };
export type TileP = { x: number; y: number; s: number; op: number };
export type HexP = { r: number; y: number; op: number };
export type Form = { rings: RingP[]; rays: RayP[]; tiles: TileP[]; hex: HexP[]; core: number };

const U = 52; // unidad de la web en píxeles de vídeo
const range = (n: number) => [...Array(n).keys()];
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const circle = (r: number, op = 1, cy = 0): RingP => ({ cx: 0, cy, rx: r, ry: r, rot: 0, op });
const hexGrid = () => {
  const out: [number, number, number][] = [];
  for (let q = -4; q <= 4; q++) for (let r = -4; r <= 4; r++) {
    const x = 0.86 * (q + r / 2), y = 0.745 * r;
    if (Math.hypot(x, y) < 3.75) out.push([x, y, Math.hypot(x, y)]);
  }
  return out.sort((a, b) => a[2] - b[2]).slice(0, 36);
};

export const FORMS: Record<string, Form> = {
  disperso: {
    rings: range(7).map(() => circle(0, 0)),
    rays: range(24).map((i) => ({ x: 0, y: 0, ang: (i / 24) * 360, len: 0, op: 0 })),
    tiles: range(36).map((i) => ({ x: (rnd(i, 1) - 0.5) * 1180, y: (rnd(i, 2) - 0.5) * 640, s: 0.6 + rnd(i, 3) * 0.6, op: 0.85 })),
    hex: range(4).map((i) => ({ r: (6.1 + i * 0.62) * U * 1.3, y: 0, op: 0 })),
    core: 0,
  },
  portal: {
    rings: [1.25, 1.8, 2.45, 3.05, 4.38, 4.9, 5.45].map((r) => circle(r * U)),
    rays: range(24).map((i) => ({ x: 0, y: 0, ang: (i / 24) * 360, len: (i % 2 ? 0.6 : 0.85) * U, op: 1 })),
    tiles: range(36).map((i) => {
      const a = Math.PI / 2 - (i / 36) * Math.PI * 2;
      return { x: 2.75 * U * Math.cos(a), y: -2.75 * U * Math.sin(a), s: 1, op: 1 };
    }),
    hex: range(4).map((i) => ({ r: (6.1 + i * 0.62) * U * 0.98, y: 0, op: 1 - i * 0.2 })),
    core: 1,
  },
  armilar: {
    rings: range(7).map((i) => { const r = (2.2 + i * 0.42) * U; return { cx: 0, cy: 0, rx: r, ry: r * Math.max(0.16, Math.abs(Math.cos(i * 0.7 + 0.3))), rot: i * 26, op: 1 }; }),
    rays: range(24).map((i) => ({ x: 0, y: 0, ang: (i / 24) * 360, len: (i % 2 ? 3.2 : 5.4) * U, op: 0.8 })),
    tiles: range(36).map((i) => { const y = 1 - (i / 35) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996; return { x: 5.6 * U * r * Math.cos(th), y: 5.6 * U * y * 0.62, s: 0.8, op: 1 }; }),
    hex: range(4).map((i) => ({ r: (7.5 + i) * U, y: 0, op: 0.25 })),
    core: 1.6,
  },
  zigurat: {
    rings: range(7).map((i) => { const rx = (5.2 - i * 0.62) * U; return { cx: 0, cy: (2.6 - i * 0.92) * U, rx, ry: rx * 0.2, rot: 0, op: 1 }; }),
    rays: range(24).map((i) => { const L = i % 6, side = i % 2 ? 1 : -1; const rx = (5.2 - L * 0.62) * U; return { x: side * rx * (0.55 + (i % 4) * 0.12), y: (2.6 - L * 0.92) * U, ang: -90, len: 0.92 * U, op: 0.7 }; }),
    tiles: range(36).map((i) => { const L = i % 6, a = (i / 36) * Math.PI * 6, rx = (5.2 - L * 0.62) * U; return { x: rx * Math.cos(a), y: (2.6 - L * 0.92) * U + rx * 0.2 * Math.sin(a), s: 0.75, op: Math.sin(a) > -0.2 ? 1 : 0.35 }; }),
    hex: range(4).map((i) => ({ r: (5.8 + i * 0.5) * U * 0.55, y: 3.3 * U, op: 0.35 })),
    core: 1,
  },
  engranajes: (() => {
    const g = [[-3.2, 2.4, 1.5], [-1.05, 1.15, 0.95], [0.95, 1.9, 1.1], [2.75, 0.35, 1.25], [0.65, -1.25, 1.0], [-1.55, -0.95, 1.2], [-3.6, -1.1, 0.85]];
    return {
      rings: g.map(([x, y, r]) => ({ cx: x * U, cy: -y * U, rx: r * U, ry: r * U, rot: 0, op: 1 })),
      rays: range(24).map((i) => { const k = Math.floor(i / 4), [x, y, r] = g[k]; return { x: x * U, y: -y * U, ang: (i % 4) * 90 + k * 20, len: r * U * 0.92, op: 0.8 }; }),
      tiles: range(36).map((i) => ({ x: (2.6 + (i % 6) * 0.36) * U, y: (2.2 + Math.floor(i / 6) * 0.36) * U, s: 0.8, op: 1 })),
      hex: range(4).map((i) => (i === 0 ? { r: 1.6 * U, y: 0, op: 0 } : { r: (6.8 + i * 0.5) * U, y: 0, op: 0.2 })),
      core: 0.6,
    };
  })(),
  tribunas: {
    rings: range(7).map((i) => (i === 6 ? circle(5.8 * U, 0.5) : { cx: (i < 3 ? -3.2 : 3.2) * U, cy: 0, rx: [1.0, 1.6, 2.2][i % 3] * U * 0.82, ry: [1.0, 1.6, 2.2][i % 3] * U, rot: 0, op: 1 })),
    rays: range(24).map((i) => ({ x: -2.1 * U, y: (-1.65 + i * 0.143) * U, ang: 0, len: 4.2 * U, op: 0.5 })),
    tiles: range(36).map((i) => { const L = i < 18, k = i % 18, a = (L ? Math.PI * 0.55 : -Math.PI * 0.45) + (k / 17) * Math.PI * 0.9; return { x: ((L ? -3.2 : 3.2) + 2.75 * Math.cos(a)) * U, y: -2.75 * Math.sin(a) * U, s: 0.85, op: 1 }; }),
    hex: range(4).map((i) => ({ r: (6.4 + i * 0.5) * U, y: 0, op: 0.3 })),
    core: 0.8,
  },
  atrio: {
    rings: range(7).map((i) => ({ cx: 0, cy: (3.9 - i * 1.3) * U * 0.9, rx: 2.1 * U, ry: 2.1 * U * 0.24, rot: 0, op: 1 })),
    rays: range(24).map((i) => { const a = (i / 24) * Math.PI * 2; return { x: 2.1 * U * Math.cos(a), y: 3.9 * U * 0.9 + 0.5 * U * Math.sin(a), ang: -90, len: 7.8 * U * 0.9, op: Math.sin(a) > 0 ? 0.9 : 0.25 }; }),
    tiles: range(36).map((i) => { const a = (i / 36) * Math.PI * 4; return { x: 4.4 * U * Math.cos(a), y: (-3.5 + (i % 9) * 0.85) * U * 0.9, s: 0.55, op: Math.sin(a) > 0 ? 0.9 : 0.35 }; }),
    hex: range(4).map((i) => ({ r: (2.9 + Math.floor(i / 2) * 1.2) * U * 0.5, y: (i % 2 ? -4.2 : 4.3) * U * 0.9, op: 0.5 })),
    core: 1.2,
  },
  mosaico: {
    rings: [4.25, 4.45, 4.7, 5.0, 5.35, 5.7, 6.1].map((r) => circle(r * U * 0.92, 0.8)),
    rays: range(24).map((i) => ({ x: 0, y: 0, ang: (i / 24) * 360, len: (i % 2 ? 6.2 : 7.4) * U * 0.9, op: 0.35 })),
    tiles: hexGrid().map(([x, y]) => ({ x: x * U, y: -y * U, s: 2.3, op: 1 })),
    hex: range(4).map((i) => ({ r: (4.0 + i * 0.32) * U, y: 0, op: 0.6 })),
    core: 0.7,
  },
  centro: {
    rings: range(7).map((i) => ({ cx: 0, cy: 0, rx: (0.85 + i * 0.16) * U, ry: (0.85 + i * 0.16) * U * Math.max(0.3, Math.abs(Math.cos(i * 0.9))), rot: i * 29, op: 1 })),
    rays: range(24).map((i) => ({ x: 0, y: 0, ang: (i / 24) * 360, len: (i % 2 ? 5.5 : 7.6) * U, op: 1 })),
    tiles: range(36).map((i) => { const a = (i / 36) * Math.PI * 2; return { x: 3.4 * U * Math.cos(a), y: 3.4 * U * Math.sin(a), s: 1.1, op: 1 }; }),
    hex: range(4).map((i) => ({ r: (5.2 + i * 0.7) * U, y: 0, op: 0.5 })),
    core: 2.6,
  },
  // La forma que aparece al uniformar: todo igual, todo en fila.
  columna: {
    rings: range(7).map((i) => ({ cx: 0, cy: (3.3 - i * 1.1) * U, rx: 1.6 * U, ry: 1.6 * U * 0.18, rot: 0, op: 0.9 })),
    rays: range(24).map((i) => ({ x: (-1.6 + (i % 2) * 3.2) * U, y: 3.4 * U, ang: -90, len: 6.8 * U, op: i < 2 ? 0.8 : 0 })),
    tiles: range(36).map((i) => ({ x: (-1.25 + (i % 6) * 0.5) * U, y: (-2.8 + Math.floor(i / 6) * 1.1) * U, s: 0.7, op: 0.9 })),
    hex: range(4).map(() => ({ r: 2.4 * U, y: 0, op: 0 })),
    core: 0.2,
  },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (t: number) => Math.max(0, Math.min(1, t));

// Interpolación con escalonado: primero anillos, luego marcos, rayos y teselas.
export const blend = (A: Form, B: Form, t: number, stagger = 0.35): Form => {
  const k = (order: number, i: number, n: number) => ease(clamp((t - stagger * (order * 0.5 + (i / n) * 0.5)) / (1 - stagger)));
  return {
    rings: A.rings.map((a, i) => { const b = B.rings[i], p = k(0, i, 7); return { cx: lerp(a.cx, b.cx, p), cy: lerp(a.cy, b.cy, p), rx: lerp(a.rx, b.rx, p), ry: lerp(a.ry, b.ry, p), rot: lerp(a.rot, b.rot, p), op: lerp(a.op, b.op, p) }; }),
    hex: A.hex.map((a, i) => { const b = B.hex[i], p = k(0.4, i, 4); return { r: lerp(a.r, b.r, p), y: lerp(a.y, b.y, p), op: lerp(a.op, b.op, p) }; }),
    rays: A.rays.map((a, i) => { const b = B.rays[i], p = k(1, i, 24); return { x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), ang: lerp(a.ang, b.ang, p), len: lerp(a.len, b.len, p), op: lerp(a.op, b.op, p) }; }),
    tiles: A.tiles.map((a, i) => { const b = B.tiles[i], p = k(1.4, i, 36); return { x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), s: lerp(a.s, b.s, p), op: lerp(a.op, b.op, p) }; }),
    core: lerp(A.core, B.core, ease(clamp(t))),
  };
};
