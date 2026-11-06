# -*- coding: utf-8 -*-
"""Capa de síntesis v2: el libro en un minuto + idea, herramienta y ejemplo por estación."""
import json
d = json.load(open("contenido.json", encoding="utf-8"))

d["libro_minuto"] = [
 "Hacia 1930, Europa vive una conquista sin precedentes: millones de personas acceden a una vida que antes era privilegio de unos pocos.",
 "Ortega celebra ese ascenso, pero detecta un riesgo: disfrutar lo recibido como si fuera naturaleza, sin preguntarse qué lo sostiene.",
 "Llama hombre-masa a quien no se exige nada y opina sin dar razones. No es una clase social: puede ser obrero, burgués o científico.",
 "La técnica, la ciencia, la ley y el Estado no funcionan solos. Si se olvida su esfuerzo de origen, pueden degradarse o volverse contra la sociedad.",
 "Su propuesta: exigencia personal, convivir con quien discrepa y un proyecto común para Europa que no borre las diferencias."
]
d["lectura_critica"] = "Ortega escribe desde una posición elitista en algunos pasajes, con prejuicios de su época sobre otros pueblos y sobre las mujeres. Esta bóveda los señala en cada estación: entender a un autor no obliga a darle siempre la razón."

EXTRA = {
 0: ("Umbral", "Ninguna idea flota sola: alguien la dice a alguien, en un momento concreto.",
     "¿Quién me dice esto, a quién se dirige y qué quiere que haga?",
     "Antes de compartir un titular que te indigna, pregúntate para qué público fue escrito."),
 1: ("Ciudad llena", "La masa no es la multitud: es la actitud de quien no se exige nada y se siente cómodo siendo como todos.",
     "¿Pienso esto porque lo he examinado o porque es lo que piensa mi entorno?",
     "Vale para cualquier grupo, también para los cultos, los expertos o los que se creen distintos."),
 2: ("Mundo inmenso", "Nunca tuvimos tantas posibilidades. Es un logro real, pero no trae incluido el criterio para elegir.",
     "Entre todo lo que puedo hacer, ¿qué quiero hacer de verdad, y por qué?",
     "Ante la oferta infinita de pantallas, cursos o viajes, elegir es la tarea, no un detalle."),
 3: ("Espejo", "Disfrutamos lo heredado como si fuera naturaleza y olvidamos que otros lo construyeron.",
     "¿Qué uso hoy que otros construyeron, y qué hago yo para sostenerlo?",
     "El agua potable, una vacuna, una biblioteca pública: detrás de cada una hay generaciones de esfuerzo."),
 4: ("Tribunal", "Tener una idea es aceptar que existen razones. Quien solo impone opiniones acaba en la acción directa.",
     "¿Qué argumento me haría cambiar de opinión?",
     "Si la respuesta honesta es «ninguno», no tengo una idea: tengo una trinchera."),
 5: ("La máquina", "La civilización no funciona sola: técnica, ciencia y memoria necesitan a alguien que las cuide.",
     "¿Sé dónde termina lo que sé, y escucho a quien sabe de lo demás?",
     "Un gran ingeniero opinando de historia, o una celebridad dando consejos médicos: precisión local, autoridad prestada."),
 6: ("El Estado", "El Estado es una creación admirable, pero si lo absorbe todo, la sociedad deja de crear.",
     "Ante este problema, ¿qué debe hacer el Estado, qué la sociedad y qué yo?",
     "La pregunta evita a la vez el «que lo arregle el gobierno» y el «sálvese quien pueda»."),
 7: ("Europa", "Mandar es tener autoridad, no fuerza. Una comunidad se sostiene por un proyecto común, no por la sangre.",
     "¿Qué futuro compartido me une a quienes son distintos a mí?",
     "Sirve igual para un barrio, una ciudad o la Unión Europea."),
 8: ("Exigencia", "La crisis de fondo es moral: vivir sin someterse a nada que no sea uno mismo.",
     "¿A qué me obligo, aunque nadie me lo exija?",
     "La exigencia no es obediencia: es elegir una tarea y responder ante ella.")
}
for st in d["estaciones"]:
    corto, idea, herr, ej = EXTRA[st["n"]]
    st.update({"corto": corto, "idea": idea, "herramienta": herr, "ejemplo": ej})
d["meta"]["version_contenido"] = "P0-0.2"
json.dump(d, open("contenido.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("ok")
