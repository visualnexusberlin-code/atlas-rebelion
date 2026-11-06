# -*- coding: utf-8 -*-
"""v3: seis tensiones (estructura de Dear) + Ortega en primer plano + citas verificadas."""
import json, re
base = json.load(open("../work/contenido.json", encoding="utf-8"))
enc = json.load(open("encounters_user.json", encoding="utf-8"))
OBRA = {s["id"]: s for s in base["obra"]}
EST = {s["n"]: s for s in base["estaciones"]}
pages = {i: re.sub(r"\s+", " ", open(f"../work/p{i}.txt", encoding="utf-8").read()) for i in range(1, 88)}

def cita(cap, frag):
    for c in OBRA[cap]["citas"]:
        if frag in c["texto"]:
            assert c["texto"] in pages[c["pdf"]], c
            return {"texto": c["texto"], "pdf": c["pdf"], "cap": cap}
    raise SystemExit(f"cita no encontrada: {cap} {frag}")

EXTRA = {
 "posibilidades": dict(figura="armilar", acento="#7fb6ff", cap_label="Cap. I–V",
   idea="Nunca tuvimos tantas posibilidades. Es una conquista real, pero no trae incluido el criterio para elegir.",
   citas=[cita("I","Masa es todo"), cita("IV","Vivir es sentirse")], est=2),
 "herencia": dict(figura="zigurat", acento="#ffc46b", cap_label="Cap. VI, VII, XI",
   idea="Disfrutamos lo heredado como si fuera naturaleza y olvidamos que otros lo construyeron.",
   citas=[cita("VI","ingratitud"), cita("VII","La nobleza se define")], est=3),
 "conocimiento": dict(figura="engranajes", acento="#5fe3c9", cap_label="Cap. IX, X, XII",
   idea="La civilización no funciona sola: técnica, ciencia y memoria necesitan a alguien que las cuide.",
   citas=[cita("IX","no se sostiene"), cita("XII","sabio-ignorante")], est=5),
 "desacuerdo": dict(figura="tribunas", acento="#ff8a6b", cap_label="Prólogo · Cap. VIII",
   idea="Tener una idea es aceptar que existen razones. Quien solo impone opiniones acaba en la acción directa.",
   citas=[cita("VIII","Tener una idea"), cita("VIII","suprema generosidad")], est=4),
 "poder": dict(figura="atrio", acento="#ff6f61", cap_label="Cap. XIII",
   idea="El Estado es una creación admirable, pero si lo absorbe todo, la sociedad deja de crear.",
   citas=[cita("XIII","producto más visible"), cita("XIII","vivir para el Estado")], est=6),
 "proyecto": dict(figura="mosaico", acento="#c79bff", cap_label="Cap. XIV–XV · Epílogo",
   idea="Una comunidad no se sostiene por la sangre ni por la fuerza, sino por un proyecto común que todavía hay que hacer.",
   citas=[cita("XIV","tiene que estar puesta"), cita("epilogo","no nace")], est=7),
}
caps_of = lambda e: list(dict.fromkeys(c for n in e["stations"] for c in EST[n]["caps"]))
out = []
for e in enc:
    x = EXTRA[e["id"]]; st = EST[x["est"]]
    out.append({
      "id": e["id"], "corto": e["short"], "titulo": e["title"], "figura": x["figura"], "acento": x["acento"],
      "caps": caps_of(e), "cap_label": x["cap_label"], "fuente": e["source"],
      "ortega_idea": x["idea"], "ortega_tesis": e["thesis"], "ortega_largo": st["O"], "citas": x["citas"],
      "pregunta": e["question"],
      "lecturas": [{"etiqueta": c["label"], "corto": c["short"], "pieza": c["piece"], "lectura": c["reading"],
                    "deja_fuera": c["cost"], "objecion": c["counter"]} for c in e["choices"]],
      "fisura": e["fracture"], "aplanado": e["flatten"],
      "hoy": st["A"], "contrapunto": st["C"], "herramienta": st["herramienta"], "ejemplo": st["ejemplo"],
    })
data = {"meta": base["meta"] | {"version_contenido": "v3-0.1"}, "libro_minuto": base["libro_minuto"],
        "lectura_critica": base["lectura_critica"], "tensiones": out,
        "piezas": base["piezas"], "obra": base["obra"], "erratas_probables": base["erratas"]["probables"]}
json.dump(data, open("contenido_v3.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("ok", len(out), "tensiones,", sum(len(t["citas"]) for t in out), "citas verificadas")
