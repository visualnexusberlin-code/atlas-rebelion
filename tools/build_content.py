# -*- coding: utf-8 -*-
"""Contenido editorial de ATLAS REBELLION — fase P0.
Paráfrasis propias; citas breves cotejadas contra el PDF (página PDF, no edición impresa)."""
import json, re, sys

pages = {i: re.sub(r"\s+", " ", open(f"p{i}.txt", encoding="utf-8").read()) for i in range(1, 88)}

def q(texto, pag):
    return {"texto": texto, "pdf": pag}

OBRA = [
 {"id":"prologo","titulo":"Prólogo para franceses","parte":"Paratexto (1937)","pdf":[1,10],
  "tesis":"Escrito once años después del libro, Ortega relee su diagnóstico ante una Europa en crisis. Defiende que la unidad de Europa como sociedad ya es un hecho antiguo, advierte contra la homogeneización y recuerda que toda palabra se dice por alguien a alguien.",
  "citas":[q("todo auténtico decir no sólo dice algo, sino que lo dice alguien a alguien",1),
           q("la unidad de Europa como sociedad no es un «ideal», sino un hecho",3)]},
 {"id":"I","titulo":"El hecho de las aglomeraciones","parte":"Primera parte","pdf":[11,13],
  "tesis":"El fenómeno visible es el lleno: ciudades, trenes y teatros repletos. Pero la masa no se define por la cantidad ni por la clase social, sino por una actitud: sentirse como todo el mundo y no angustiarse por ello. La división decisiva separa a quienes se exigen mucho de quienes no se exigen nada especial.",
  "citas":[q("Masa es todo aquel que no se valora a sí mismo",13),
           q("las que se exigen mucho y acumulan sobre sí mismas dificultades y deberes",13)]},
 {"id":"II","titulo":"La subida del nivel histórico","parte":"Primera parte","pdf":[14,15],
  "tesis":"La masa ya no delega: interviene directamente y quiere dar fuerza de ley a sus tópicos. Lo nuevo no es que el vulgar se crea excelente, sino que reclame el derecho a la vulgaridad. A la vez, Ortega reconoce que el nivel medio de vida ha subido de forma real y valiosa.",
  "citas":[q("ser diferente es indecente",14),
           q("la vida del hombre medio está ahora constituida por el repertorio vital que antes caracterizaba sólo a las minorías culminantes",16)]},
 {"id":"III","titulo":"La altura de los tiempos","parte":"Primera parte","pdf":[16,18],
  "tesis":"Nuestra época se siente superior a todas las anteriores y, a la vez, insegura de su rumbo. No se cree decadente ni plena: se cree más que el pasado, pero no sabe qué hacer con esa altura.",
  "citas":[q("el pasado íntegro se le ha quedado chico a la humanidad actual",19)]},
 {"id":"IV","titulo":"El crecimiento de la vida","parte":"Primera parte","pdf":[19,21],
  "tesis":"El mundo ha crecido: distancias, ciencia, técnica y placeres al alcance de cualquiera. La vida es un repertorio de posibilidades, y precisamente por ser tan amplio nos obliga a elegir. Vivir es estar condenado a ejercer la libertad.",
  "citas":[q("Vivir es sentirse fatalmente forzado a ejercitar la libertad",22)]},
 {"id":"V","titulo":"Un dato estadístico","parte":"Primera parte","pdf":[22,23],
  "tesis":"La población europea se multiplicó en un solo siglo. Las nuevas multitudes fueron llenadas de los instrumentos de la civilización, pero no de la conciencia de lo que los sostiene. Nuestra vida es magnífica como repertorio de posibilidades y, por lo mismo, ha desbordado los cauces heredados.",
  "citas":[q("nuestra vida, como repertorio de posibilidades, es magnífica, exuberante",22)]},
 {"id":"VI","titulo":"Comienza la disección del hombre-masa","parte":"Primera parte","pdf":[24,25],
  "tesis":"El siglo XIX creó un mundo de facilidad material, democracia liberal y técnica. Quien nace en él tiende a dos rasgos: la libre expansión de sus deseos y una radical ingratitud hacia lo que hizo posible esa facilidad. Es la psicología del niño mimado.",
  "citas":[q("la radical ingratitud hacia cuanto ha hecho posible la facilidad de su existencia",25)]},
 {"id":"VII","titulo":"Vida noble y vida vulgar, o esfuerzo e inercia","parte":"Primera parte","pdf":[26,27],
  "tesis":"La nobleza no es linaje ni privilegio: es exigencia. La vida noble se impone normas cada vez más difíciles; la vulgar se deja llevar. El noble originario se obliga a sí mismo; el heredero, en cambio, recibe la obligación sin haberla elegido.",
  "citas":[q("La nobleza se define por la exigencia, por las obligaciones, no por los derechos.",26),
           q("El noble originario se obliga a sí mismo",27)]},
 {"id":"VIII","titulo":"Por qué las masas intervienen en todo, y por qué sólo intervienen violentamente","parte":"Primera parte","pdf":[28,30],
  "tesis":"El hombre-masa tiene opiniones sobre todo, pero no ideas: tener una idea supone creer que existen razones y someterse a ellas. Quien renuncia a dar razones acaba en la acción directa. Frente a ello, Ortega celebra el liberalismo como la decisión de convivir con el enemigo, incluso con el débil.",
  "citas":[q("Tener una idea es creer que se poseen las razones de ella",29),
           q("el derecho a no tener razón, la razón de la sinrazón",29),
           q("El liberalismo -conviene hoy recordar esto- es la suprema generosidad",30)]},
 {"id":"IX","titulo":"Primitivismo y técnica","parte":"Primera parte","pdf":[30,33],
  "tesis":"La civilización no es naturaleza: no se sostiene sola, necesita artesanos que la mantengan. La técnica depende de la ciencia, y la ciencia de un interés desinteresado por la verdad. Quien usa los frutos sin cuidar sus raíces se comporta como un primitivo en medio de un mundo civilizado.",
  "citas":[q("La civilización no está ahí, no se sostiene a sí misma.",33),
           q("La técnica es, consustancialmente, ciencia",32),
           q("la ciencia experimental es uno de los productos más improbables de la historia",32)]},
 {"id":"X","titulo":"Primitivismo e historia","parte":"Primera parte","pdf":[33,34],
  "tesis":"Una civilización avanzada es también una civilización con mucho pasado. El saber histórico es una técnica para conservar y continuar lo logrado, y sin él se repiten los errores. Los movimientos que pretenden empezar de cero carecen, según Ortega, de memoria.",
  "citas":[q("El saber histórico es una técnica de primer orden para conservar y continuar una civilización",34)]},
 {"id":"XI","titulo":"La época del «señorito satisfecho»","parte":"Primera parte","pdf":[35,37],
  "tesis":"El tipo dominante cree que ha venido a la vida a hacer lo que le dé la gana, como el hijo de familia que hereda sin esfuerzo. Vive de lo que otros construyeron y lo trata como si fuera natural. Para Ortega es la forma más contradictoria de la vida humana.",
  "citas":[q("un hombre que ha venido a la vida para hacer lo que le dé la gana",37),
           q("El pasado tiene razón, la suya.",35)]},
 {"id":"XII","titulo":"La barbarie del «especialismo»","parte":"Primera parte","pdf":[38,40],
  "tesis":"El científico especializado es el prototipo inesperado del hombre-masa. Conoce a fondo su parcela y, por eso mismo, opina con la arrogancia del experto en todo lo que ignora. Ortega no condena la especialización, sino la pérdida de visión del conjunto: lo llama el sabio-ignorante.",
  "citas":[q("La ciencia no es especialista.",39),
           q("es un sabio-ignorante, cosa sobremanera grave",40)]},
 {"id":"XIII","titulo":"El mayor peligro, el Estado","parte":"Primera parte","pdf":[40,43],
  "tesis":"El Estado moderno es el producto más visible de la civilización y una maquinaria formidable. El hombre-masa lo cree suyo y le exige que lo resuelva todo. El peligro es que la sociedad acabe viviendo para el Estado, se burocratice y se militarice, hasta agotar la vitalidad que lo alimenta.",
  "citas":[q("El Estado contemporáneo es el producto más visible y notorio de la civilización.",42),
           q("La sociedad tendrá que vivir para el Estado; el hombre, para la maquina del gobierno.",42)]},
 {"id":"XIV","titulo":"¿Quién manda en el mundo?","parte":"Segunda parte","pdf":[44,62],
  "tesis":"La rebelión de las masas tiene un anverso magnífico y un reverso de desmoralización. Mandar no es imponer por la fuerza, sino ejercer una autoridad sostenida por la opinión pública. Europa ha dejado de mandar sin que nadie ocupe su lugar, y eso deja la vida sin programa. La salida que propone es un nuevo proyecto común europeo.",
  "citas":[q("la rebelión de las masas es una y misma cosa con el crecimiento fabuloso que la vida humana ha experimentado",44),
           q("La vida humana, por su naturaleza propia, tiene que estar puesta a algo",49)],
  "apartados":[
   {"n":1,"pdf":[44,45],"tesis":"Mandar es apoyarse en la opinión pública; ni siquiera quien gobierna con la fuerza escapa de ella."},
   {"n":2,"pdf":[46,47],"tesis":"Se ha hablado tanto de la decadencia europea que muchos la dan por un hecho sin haberla examinado."},
   {"n":3,"pdf":[47,48],"tesis":"Las naciones europeas se sienten estrechas: su decadencia relativa podría ser la condición de una unidad superior."},
   {"n":4,"pdf":[49,50],"tesis":"Mandar y obedecer son funciones decisivas; un mundo sin mando se desmoraliza porque la vida necesita estar puesta a algo."},
   {"n":5,"pdf":[50,52],"tesis":"La vida como programa: sin un quehacer común, los pueblos y las personas se dedican a ocupaciones falsas."},
   {"n":6,"pdf":[52,54],"tesis":"El Estado nace de la ciudad antigua: es una invitación a hacer algo juntos, no la mera administración de lo dado."},
   {"n":7,"pdf":[54,58],"tesis":"La nación no se funda en la sangre ni en el idioma, sino en un proyecto de futuro compartido."},
   {"n":8,"pdf":[58,61],"tesis":"El nacionalismo es un callejón sin salida: cada nación europea vive en realidad de lo que recibe de las demás."},
   {"n":9,"pdf":[61,62],"tesis":"Europa necesita un programa propio; sin él, otros proyectos ocuparán el vacío."}
  ]},
 {"id":"XV","titulo":"Se desemboca en la verdadera cuestión","parte":"Segunda parte","pdf":[63,64],
  "tesis":"La cuestión de fondo es moral: Europa se ha quedado sin moral. No porque cambie de moral, sino porque el hombre-masa rechaza toda sumisión a algo que no sea él mismo. Esa negación vive, paradójicamente, de lo que otros construyeron.",
  "citas":[q("Europa se ha quedado sin moral.",63),
           q("El hombre-masa está aún viviendo precisamente de lo que niega y otros construyeron o acumularon.",64)]},
 {"id":"epilogo","titulo":"Epílogo para ingleses","parte":"Paratexto (1938)","pdf":[65,67],
  "tesis":"Ortega escribe a los ingleses durante la guerra civil española. Admira el modo en que Inglaterra sabe ser sociedad y critica la incomprensión exterior de España. Insiste en que el carácter nacional no es innato, sino una fabricación histórica.",
  "citas":[q("la nación no nace, sino que se hace",65)],
  "nota_texto":"En el PDF se ha perdido el título del epílogo; el texto se conserva."},
 {"id":"pacifismo","titulo":"En cuanto al pacifismo","parte":"Paratexto (1937)","pdf":[67,77],
  "tesis":"Desear la paz no basta. La guerra es un invento humano y solo otro invento puede sustituirla: un derecho internacional eficaz. Un pacifismo que no empieza por crear esa nueva técnica jurídica es ilusorio.",
  "citas":[q("La guerra no es instinto, sino un invento.",67),
           q("La paz, por ejemplo, es el derecho como forma de trato entre los pueblos.",68)]},
 {"id":"apendice","titulo":"Apéndice: Dinámica del tiempo","parte":"Artículos de El Sol (1927)","pdf":[78,87],
  "tesis":"Tres artículos breves: «Los escaparates mandan», sobre el dinero como único criterio de distinción; «Juventud», sobre el predominio de lo juvenil; y «¿Masculino, o femenino?», sobre los ritmos históricos atribuidos a los sexos. Este último exige lectura crítica explícita.",
  "citas":[q("el mundo es ciertamente un balón, pero con algo más que aire dentro",83)]}
]

# Estaciones: vestíbulo (pregunta) + O / A / C
ESTACIONES = [
 {"n":0,"nombre":"Umbral","sub":"¿Con quién hablo?","caps":["prologo"],
  "pregunta":"¿Cambia el sentido de una idea según quién la dice y a quién?",
  "O":"Para Ortega, toda palabra tiene un emisor y un receptor que modifican su significado. Por eso empieza el libro advirtiendo a quién se dirige.",
  "A":"En un mundo de mensajes sin destinatario —feeds, algoritmos, titulares— la pregunta «¿quién me habla y para quién?» es una forma de higiene intelectual.",
  "C":"Ninguna interfaz garantiza una única lectura correcta. Esta web también habla desde un lugar: el de una interpretación europea de 2026."},
 {"n":1,"nombre":"La ciudad llena","sub":"El hecho de las aglomeraciones","caps":["I","II"],
  "pregunta":"¿Es lo mismo una multitud que una masa?",
  "O":"El lleno es visible; la masa, no. Masa es una actitud: no exigirse nada especial y sentirse cómodo siendo como todos.",
  "A":"Una plataforma con millones de usuarios no es «masa» por su tamaño, sino por el tipo de relación que fomenta con el criterio propio.",
  "C":"Ortega insiste en que no habla de clases sociales, pero su vocabulario —vulgo, plebe, selectos— arrastra una jerarquía discutible."},
 {"n":2,"nombre":"El mundo se hizo inmenso","sub":"El crecimiento de la vida","caps":["III","IV","V"],
  "pregunta":"¿Más posibilidades nos hacen más libres o solo más ocupados?",
  "O":"Nunca la vida media tuvo tanto repertorio. Esa amplitud es un logro real, pero obliga a elegir y no trae consigo el criterio para hacerlo.",
  "A":"La abundancia de opciones —información, viajes, herramientas— plantea hoy la misma pregunta: ¿quién nos enseña a orientarnos?",
  "C":"El ascenso del nivel de vida, los derechos y el bienestar de las mayorías son conquistas que no deben leerse como síntomas de decadencia."},
 {"n":3,"nombre":"El espejo del hombre-masa","sub":"Disección, nobleza y señorito satisfecho","caps":["VI","VII","XI"],
  "pregunta":"¿Qué he recibido sin preguntarme quién lo hizo posible?",
  "O":"El hombre-masa combina deseos ilimitados con ingratitud hacia lo que los satisface. La nobleza, en cambio, es exigencia: obligarse a sí mismo.",
  "A":"Cualquiera puede vivir como heredero satisfecho de servicios que funcionan solos. La pregunta no es quién eres, sino qué haces con lo recibido.",
  "C":"Esta sala nunca te clasificará. La distinción de Ortega es moral, no social, y él mismo la aplica de forma desigual a distintos grupos."},
 {"n":4,"nombre":"El tribunal de las ideas","sub":"Opinión, razones y acción directa","caps":["VIII"],
  "pregunta":"¿Tengo ideas o solo opiniones?",
  "O":"Tener una idea es aceptar que existen razones a las que someterse. Quien renuncia a ellas acaba imponiéndose por la acción directa. El liberalismo es la generosidad de convivir con el que piensa distinto.",
  "A":"Debatir en público hoy suele premiar la contundencia sobre las razones. Ortega pide lo contrario: someter la propia opinión a examen.",
  "C":"La ley y la mediación también pueden ser injustas. Y Ortega, crítico de la acción directa, no siempre fue ecuánime al juzgar a sus adversarios."},
 {"n":5,"nombre":"La máquina y su memoria","sub":"Técnica, historia y especialismo","caps":["IX","X","XII"],
  "pregunta":"¿Cuántas generaciones giran dentro de una máquina que parece funcionar sola?",
  "O":"La civilización no está ahí: se sostiene. La técnica depende de la ciencia, la ciencia del amor a la verdad, y todo ello de la memoria histórica. El especialista que pierde la visión del conjunto se vuelve sabio-ignorante.",
  "A":"Usamos sistemas que nadie entiende por completo. La pregunta es quién cuida las condiciones que los hacen posibles.",
  "C":"La especialización también produce excelencia y cooperación real. La ciencia actual avanza precisamente por redes de especialistas que se corrigen entre sí."},
 {"n":6,"nombre":"La sala de máquinas del Estado","sub":"El mayor peligro","caps":["XIII"],
  "pregunta":"¿Qué parte de nuestra seguridad necesita poder y qué parte necesita límites al poder?",
  "O":"El Estado moderno es una creación extraordinaria, pero tiende a absorber la iniciativa social. Cuando la sociedad vive para el Estado, se burocratiza, se militariza y se agota.",
  "A":"Ante cada crisis surge la tentación de pedirlo todo al aparato central. Ortega nos obliga a preguntar qué perdemos a cambio.",
  "C":"El Estado también protege libertades, garantiza derechos y redistribuye. Reducirlo no garantiza por sí mismo más pluralidad."},
 {"n":7,"nombre":"¿Quién manda? Europa inacabada","sub":"Mando, nación y proyecto común","caps":["XIV","epilogo","pacifismo"],
  "pregunta":"¿Qué proyecto podríamos hacer juntos sin dejar de ser distintos?",
  "O":"Mandar es apoyarse en la opinión, no en la fuerza. La nación no nace: se hace como proyecto de futuro. Europa ya es una sociedad y necesita un programa común. La paz no se desea: se inventa como derecho.",
  "A":"La Unión Europea no es exactamente lo que Ortega imaginó, pero su intuición —unidad sin uniformidad— sigue siendo la pregunta abierta del continente.",
  "C":"La Europa que Ortega celebra fue también imperial y colonial. Algunas frases del texto sobre otros pueblos son hoy inaceptables y deben leerse como tales."},
 {"n":8,"nombre":"La última exigencia","sub":"La verdadera cuestión","caps":["XV","apendice"],
  "pregunta":"¿A qué estoy dispuesto a obligarme?",
  "O":"La crisis de fondo es moral: no faltan reglas, falta la disposición a someterse a algo que no sea uno mismo. Vivir es tener un quehacer.",
  "A":"En una cultura de la autoafirmación, la pregunta por el deber vuelve como pregunta por la responsabilidad compartida.",
  "C":"No hay una única moral obligatoria deducible del libro. La exigencia que propone Ortega debe discutirse, no acatarse."}
]

PIEZAS = [
 {"id":"M01","nombre":"Anillo de continuidad","concepto":"Memoria histórica","caps":["X","prologo"],"cita":q("El pasado tiene razón, la suya.",35)},
 {"id":"M02","nombre":"Puente de transmisión","concepto":"Educación y formación","caps":["IX","X"],"cita":q("El saber histórico es una técnica de primer orden para conservar y continuar una civilización",34)},
 {"id":"M03","nombre":"Regulador de método","concepto":"Ciencia y verificación","caps":["IX"],"cita":q("La técnica es, consustancialmente, ciencia",32)},
 {"id":"M04","nombre":"Tren de precisión","concepto":"Especialización","caps":["XII"],"cita":q("la especialización amenaza con ahogar a la ciencia",41)},
 {"id":"M05","nombre":"Ventana del especialista","concepto":"Límites del saber","caps":["XII"],"cita":q("es un sabio-ignorante, cosa sobremanera grave",40)},
 {"id":"M06","nombre":"Discos de lenguaje","concepto":"Diálogo situado","caps":["prologo","VIII"],"cita":q("todo auténtico decir no sólo dice algo, sino que lo dice alguien a alguien",1)},
 {"id":"M07","nombre":"Rueda de reglas comunes","concepto":"Derecho y mediación","caps":["VIII","pacifismo"],"cita":q("La paz, por ejemplo, es el derecho como forma de trato entre los pueblos.",68)},
 {"id":"M08","nombre":"Limitador de amplitud","concepto":"Pluralismo y liberalismo","caps":["VIII"],"cita":q("El liberalismo -conviene hoy recordar esto- es la suprema generosidad",30)},
 {"id":"M09","nombre":"Colectores periféricos","concepto":"Iniciativa social","caps":["XIII"],"cita":q("ninguna nueva simiente podrá fructificar",42)},
 {"id":"M10","nombre":"Núcleo de coordinación","concepto":"El Estado","caps":["XIII","XIV"],"cita":q("la invitación que un grupo de hombres hace a otros grupos humanos para ejecutar juntos una empresa",58)},
 {"id":"M11","nombre":"Indicador de responsabilidad","concepto":"Deber y exigencia","caps":["VII","XV"],"cita":q("La nobleza se define por la exigencia, por las obligaciones, no por los derechos.",26)},
 {"id":"M12","nombre":"Corona de posibilidades","concepto":"El mundo ampliado","caps":["IV","V","IX"],"cita":q("Vivir es sentirse fatalmente forzado a ejercitar la libertad",22)},
]

# Validación de citas
errors = []
def check(c, where):
    if c["texto"] not in pages[c["pdf"]]:
        errors.append((where, c["pdf"], c["texto"]))
for s in OBRA:
    for c in s.get("citas", []): check(c, s["id"])
for p in PIEZAS: check(p["cita"], p["id"])
if errors:
    for e in errors: print("NO ENCONTRADA:", e)
    sys.exit(1)

erratas = json.load(open("erratas.json", encoding="utf-8"))
data = {
 "meta":{"obra":"La rebelión de las masas","autor":"José Ortega y Gasset","version_contenido":"P0-0.1","fecha":"2026-10-15",
   "fuente_trabajo":"PDF suministrado, 87 pp. (paginación PDF, no edición impresa)",
   "estado_citas":"cotejadas contra el PDF de trabajo; pendientes de cotejo con edición de referencia",
   "politica":"Paráfrasis propias + citas breves con localizador. Sin texto íntegro (protección en España hasta 31-12-2035)."},
 "obra":OBRA,"estaciones":ESTACIONES,"piezas":PIEZAS,
 "erratas":{"total_candidatas":len(erratas),"probables":sum(1 for e in erratas if e["estado"]=="errata_probable"),"lista":erratas}
}
json.dump(data, open("contenido.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
print("OK", len(OBRA), "secciones,", sum(len(s.get('citas',[])) for s in OBRA)+len(PIEZAS), "citas verificadas")
