# Revisión Impeccable · 6-11-2026

Método: dos evaluaciones aisladas (A: revisión de diseño · B: detector + navegador). Render sin GPU ni fuentes web: el bloom se ve en bloques y los titulares caen a tipografía del sistema.

## Puntuación (Nielsen): 26/40

## Hallazgos y estado

| Pri. | Hallazgo | Estado v4 |
|---|---|---|
| P1 | El dial y el aviso tapan la columna de lectura | Corregido: el dial ocupa solo el escenario en escritorio; aviso sobre la figura; móvil con barra fija |
| P1 | El portal parece un radar, no Art Déco espectacular | Parcial: abanico sunburst detrás del hexágono, bloom más limpio y película de prólogo |
| P2 | Texto duplicado y jerga («PDF de trabajo») | Corregido: tesis sin repetición; «Cap. VI · pág. 25» |
| P2 | Elegir una puerta no cambia la figura | Corregido: la lectura elegida ilumina un lado y deja el otro en sombra |
| P2 | Móvil sin nombres en el dial; botones de 17 px | Corregido: dial desplazable con nombres, objetivos ≥ 44 px |
| — | Antetítulos (prohibidos por el suelo de calidad) | Corregido: el título va primero y la información debajo |
| — | Controles del panel cerrado seguían tabulables | Corregido: `inert` en el portal |
| — | Textos < 11 px | Corregido en nav, dial y subtítulo |
| — | Detector: low-contrast ×2, dark-glow | Falsos positivos (fondo no resuelto; glow pedido en el brief) |

## Pendiente

- Rótulos de los sectores como capas DOM (ahora texturas 3D, pequeños en el portal).
- Peldaños escalonados del Art Déco por encima y por debajo del hexágono.
- Vista imprimible de una tensión para clase.
- Cotejo de citas con una edición impresa de referencia.

## Momentos clave en vídeo (Remotion)

1. Prólogo (12 s): teselas sueltas que se ordenan en la bóveda; título. Primera visita al portal.
2. Seis figuras (9 s): el mismo mecanismo pasa por las seis figuras. En «El libro en un minuto», en bucle.
3. Uniformar (7 s): las seis figuras se vuelven una sola columna gris. Al llegar al extremo del control.
4. Centro (9 s): las figuras se recogen y queda el núcleo vacío. Al entrar en el centro.

Todas: una vez por visita, botón «Saltar», tecla Esc, nunca con movimiento reducido.
