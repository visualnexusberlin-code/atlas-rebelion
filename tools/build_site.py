"""Inyecta content/contenido.json en site/template.html y escribe site/index.html."""
import pathlib
R = pathlib.Path(__file__).resolve().parent.parent
t = (R/"site/template.html").read_text(encoding="utf-8")
d = (R/"content/contenido.json").read_text(encoding="utf-8").replace("</", "<\\/")
assert "/*__DATA__*/null" in t
(R/"site/index.html").write_text(t.replace("/*__DATA__*/null", d), encoding="utf-8")
print("site/index.html", len(t)+len(d), "bytes")
