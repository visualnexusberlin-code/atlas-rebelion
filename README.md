# atlas-rebelion · La Bóveda de Ortega

Experiencia web interactiva sobre *La rebelión de las masas* (José Ortega y Gasset, 1930): una bóveda Art Déco luminosa cuyos seis sectores son seis tensiones del libro. Cada tensión reorganiza el mecanismo en una figura propia y despliega su lectura: lo que vio Ortega, la tensión hoy con dos lecturas, el contrapunto y una pregunta para llevarse.

## Estructura

| Carpeta | Contenido |
|---|---|
| `site/template.html` | Página (HTML, CSS, Three.js + bloom). Los datos se inyectan en `/*__DATA__*/null`. |
| `site/media/` | Vídeos de los cuatro momentos clave (MP4 H.264) y sus pósters. |
| `content/contenido.json` | Contenido v3: seis tensiones, obra capítulo a capítulo, piezas M01–M12. Citas cotejadas con el PDF de trabajo. |
| `content/erratas.json` | Erratas de autocorrección detectadas en el PDF de trabajo. |
| `tools/` | `build_site.py` (construye `site/index.html` y `site/dist/index.html`) y los scripts editoriales de P0. |
| `video/` | Proyecto Remotion: `Prologo`, `SeisFiguras`, `Uniformar`, `Centro`. Usa la misma gramática de piezas que la web. |
| `docs/` | Informes de revisión (Impeccable) y capturas. |

## Construir

```bash
python3 tools/build_site.py          # site/index.html y site/dist/index.html
cd video && npm i && npx remotion studio            # vista previa
npx remotion render Prologo ../site/media/prologo.mp4 --codec=h264 --crf=26
```

## Criterios editoriales

- Paráfrasis propias y citas breves con su página; sin texto íntegro (la obra sigue protegida en España hasta el 31-12-2035).
- Tres planos siempre distinguibles: Ortega · actualización · contrapunto.
- Nadie es clasificado: las elecciones no se puntúan ni se envían.

Remotion es gratuito para equipos de hasta 3 personas; para uso comercial en organizaciones mayores, revisar su licencia.
