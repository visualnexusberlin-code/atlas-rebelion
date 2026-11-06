"""Inyecta content/contenido.json en site/template.html y escribe site/index.html."""
import pathlib
R = pathlib.Path(__file__).resolve().parent.parent
t = (R/"site/template.html").read_text(encoding="utf-8")
d = (R/"content/contenido.json").read_text(encoding="utf-8").replace("</", "<\\/")
assert "/*__DATA__*/null" in t
(R/"site/index.html").write_text(t.replace("/*__DATA__*/null", d), encoding="utf-8")
print("site/index.html", len(t)+len(d), "bytes")

# Documento completo para publicar como archivos (index.html + media/).
html = (R/"site/index.html").read_text(encoding="utf-8")
cut = html.index('<div id="bg"')
head, body = html[:cut], html[cut:]
doc = ('<!DOCTYPE html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n'
       '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
       + head + '<style>body{margin:0}[hidden]{display:none!important}img,video{max-width:100%}</style>\n</head>\n<body>\n'
       + body + '\n</body>\n</html>\n')
(R/"site/dist").mkdir(exist_ok=True)
(R/"site/dist/index.html").write_text(doc, encoding="utf-8")
print("site/dist/index.html", len(doc), "bytes")
