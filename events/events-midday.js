const middayEvents = [
  {
    id: "md26_reunion_sorpresa",
    minCordura: 0,
    emoji: "🧑‍💼",
    context: "Faltan 5 minutos para salir a almorzar.",
    text: "EL JEFE TE ATRAVIESA CON UN '¿TIENES 5 MINUTITOS?'.",
    choices: [
      { text: "DECIR QUE SÍ Y SONREÍR", effect: "Dolor interno masivo.", stats: { cordura: -20 }, nextEvent: "md27_reunion_eterna" },
      { text: "HACERSE EL WEON", effect: "Sales corriendo al baño.", stats: { chileno: 25 } }
    ]
  },
  {
    id: "md27_reunion_eterna",
    isChain: true,
    emoji: "⏳",
    context: "Los 5 minutos se transformaron en una hora de PowerPoint.",
    text: "TU ESTÓMAGO RUGE TAN FUERTE QUE SE ESCUCHA EN LA SALA.",
    choices: [
      { text: "DECIR QUE FUE UN TEMBLOR", effect: "Todos te creen porque es Chile.", stats: { chileno: 30, cordura: 10 } },
      { text: "PEDIR PERDÓN Y SALIR", effect: "Humillación corporativa total.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "md28_casino_comida",
    minCordura: 0,
    emoji: "🤢",
    context: "El menú del casino hoy se ve extraño.",
    text: "¿TE ARRIESGAS CON LOS TALLARINES CON PRENSA?",
    choices: [
      { text: "COMER IGUAL", effect: "Sabor a cloroformo.", stats: { hambre: -40, cordura: -15 }, nextEvent: "md29_colon_guerra" },
      { text: "IR AL CHINO DE LA ESQUINA", effect: "Mucho arroz, precio decente.", stats: { plata: -5, hambre: -30 } }
    ]
  },
  {
    id: "md29_colon_guerra",
    isChain: true,
    emoji: "🌋",
    context: "Pasaron 10 minutos desde el almuerzo.",
    text: "TU COLON IRRITABLE LE DECLARA LA GUERRA A TU CUERPO.",
    choices: [
      { text: "BAÑO DEL JEFE", effect: "Estableciendo dominancia.", stats: { chileno: 35, cordura: -5 } },
      { text: "AGUANTAR CON SUDOR FRÍO", effect: "Tu alma abandona el cuerpo.", stats: { cordura: -35, temperatura: 5 } }
    ]
  },
  {
    id: "md30_completo_italiano",
    minCordura: 0,
    emoji: "🌭",
    context: "Decidiste ir por un tocomple de confianza.",
    text: "EL MAESTRO TE PREGUNTA: '¿CON MAYO CASERA, MI REY?'.",
    choices: [
      { text: "ARRIESGARSE (CON TODO)", effect: "DIOS TIENE A SUS FAVORITOS.", stats: { hambre: -35, cordura: 20, chileno: 15 } },
      { text: "SINO, SIN MAYO", effect: "El maestro te mira decepcionado.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "md31_vendedor_carcasa",
    minCordura: 0,
    emoji: "📱",
    context: "Caminas por el paseo Ahumada.",
    text: "DIEZ TIPOS TE OFRECEN CARCASAS PARA UN CELULAR QUE NO TIENES.",
    choices: [
      { text: "DECIR 'NO GRACIAS' x10", effect: "Te cansa la mandíbula.", stats: { cordura: -10 } },
      { text: "CAMINAR MIRANDO EL CIELO", effect: "Te chocas con un mimo.", stats: { cordura: -15 }, nextEvent: "md32_el_mimo" }
    ]
  },
  {
    id: "md32_el_mimo",
    isChain: true,
    emoji: "🤡",
    context: "Te chocaste con el mimo del centro.",
    text: "EMPIEZA A IMITAR TU CAMINADO Y LA GENTE SE RÍE.",
    choices: [
      { text: "HACER UN DUELO DE BAILE", effect: "Le ganas. Eres el rey del centro.", stats: { chileno: 40, cordura: 20 } },
      { text: "CORRER AVERGONZADO", effect: "El mimo te persigue una cuadra.", stats: { cordura: -20 } }
    ]
  },
  {
    id: "md33_temblor_oficina",
    minCordura: 0,
    emoji: "🫨",
    context: "Estás tecleando en Excel.",
    text: "EMPIEZA A MOVERSE LA LÁMPARA DEL TECHO. ES UN 5.8.",
    choices: [
      { text: "SEGUIR TRABAJANDO", effect: "Nivel de chilenidad al máximo.", stats: { chileno: 30, cordura: 5 } },
      { text: "CORRER AL MARCO DE LA PUERTA", effect: "Tus compañeros te tildan de tierno.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "md34_aire_acondicionado",
    minCordura: 0,
    emoji: "🥶",
    context: "En la oficina prendieron el aire.",
    text: "HACEN -2 GRADOS ADENTRO Y 35 GRADOS AFUERA.",
    choices: [
      { text: "ENMANTARTE CON CHAL", effect: "Parezco abuelita corporativa.", stats: { chileno: 15 } },
      { text: "SOPORTAR LA GLACIACIÓN", effect: "Se te congela la nariz.", stats: { temperatura: -15, cordura: -10 } }
    ]
  },
  {
    id: "md35_alcancia_bomberos",
    minCordura: 0,
    emoji: "🧑‍🚒",
    context: "Vas caminando y suena una campana.",
    text: "BOMBEROS TE PASA LA ALCANCÍA POR LA CARA.",
    choices: [
      { text: "DONAR MIL PESOS", effect: "Héroe nacional.", stats: { plata: -1, cordura: 15 } },
      { text: "HACER CLINC CON LAS LLAVES", effect: "Mentira táctica de bolsillo.", stats: { chileno: 25, cordura: -10 } }
    ]
  },
  {
    id: "md36_licencia_rechazada",
    minCordura: 30,
    emoji: "❌",
    context: "Te llega un correo del Compin.",
    text: "TU LICENCIA MÉDICA FUE RECHAZADA PORQUE SÍ.",
    choices: [
      { text: "APELAR CON FURIA", effect: "Tu hígado sufre el triple.", stats: { cordura: -25 } },
      { text: "ACEPTAR LA DERROTA", effect: "Trabajarás gratis esta semana.", stats: { plata: -15, cordura: -20 } }
    ]
  },
  {
    id: "md37_colacion_robada",
    minCordura: 30,
    emoji: "🍱",
    context: "Vas al refrigerador común a buscar tu postre.",
    text: "ALGUIEN SE COMIÓ TU CHOCMAN.",
    choices: [
      { text: "DEJAR UN CARTEL CON INSULTOS", effect: "Guerra pasivo-agresiva declarada.", stats: { chileno: 20, cordura: -5 } },
      { text: "LLORAR EN EL BAÑO", effect: "El Chocman era tu única luz.", stats: { cordura: -20, hambre: 10 } }
    ]
  },
  {
    id: "md38_colectivo_lleno",
    minCordura: 0,
    emoji: "🚗",
    context: "Tienes que salir a terreno.",
    text: "EL COLECTIVO TIENE ESPACIO SOLO ADELANTE AL MEDIO.",
    choices: [
      { text: "SUBIRSE EN MODO PALANCA", effect: "Tus rodillas chocan con la radio.", stats: { cordura: -15, chileno: 15 } },
      { text: "ESPERAR OTRO", effect: "Te da una insolación en la vereda.", stats: { temperatura: 10, hambre: 5 } }
    ]
  },
  {
    id: "md39_chilenismo_jefe",
    minCordura: 0,
    emoji: "💼",
    context: "El jefe imita modismos de TikTok para sonar buena onda.",
    text: "TE DICE: 'Ese reporte está muy de pana, mi rey'.",
    choices: [
      { text: "DECIR 'DE CHILL'", effect: "Cringe corporativo nivel dios.", stats: { cordura: -20 } },
      { text: "MIRARLO FIJO SIN PARPADEAR", effect: "El jefe se asusta y se va.", stats: { cordura: 10 } }
    ]
  },
  {
    id: "md40_cuenta_rut_cero",
    minCordura: 0,
    emoji: "💸",
    context: "Revisas la App del Banco Estado.",
    text: "SALDO DISPONIBLE: $320 PESOS.",
    choices: [
      { text: "PEDIR AVANCE EN EFECTIVO", effect: "Intereses del 400%.", stats: { plata: 10, cordura: -20 } },
      { text: "VIVIR DE ALUMNO EN PRÁCTICA", effect: "Almuerzas un té con galletas de agua.", stats: { hambre: 25, cordura: -10 } }
    ]
  },
  {
    id: "md41_pastor_soto",
    minCordura: 0,
    emoji: "📢",
    context: "Pasas por la plaza de armas.",
    text: "UN PREDICADOR CON PARLANTE TE GRITA QUE TE VAS A QUEMAR.",
    choices: [
      { text: "PEDIRLE QUE BAJE EL VOLUMEN", effect: "Te tira la biblia en la cara.", stats: { cordura: -15 } },
      { text: "AMÉN HERMANO", effect: "Te bendice y te da un folleto.", stats: { cordura: 10 } }
    ]
  },
  {
    id: "md42_feria_libre",
    minCordura: 0,
    emoji: "🍉",
    context: "Fuiste a comprar fruta rápido.",
    text: "EL FERIANTE TE GRITA: '¡LLEVE EL PLÁTANO BARATO CASERITA!'.",
    choices: [
      { text: "COMPRAR UN KILO", effect: "Fruta barata y rica.", stats: { plata: -2, hambre: -10 } },
      { text: "CORREGIRLE QUE ERES CASERITO", effect: "Te ignora olímpicamente.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "md43_torta_tres_leches",
    minCordura: 0,
    emoji: "🍰",
    context: "Es el cumpleaños de la secretaria.",
    text: "HAY TORTA TRES LECHES EN LA SALA DE REUNIONES.",
    choices: [
      { text: "REPETIRSE EL PLATO", effect: "Coma diabético instantáneo.", stats: { hambre: -30, cordura: 20, temperatura: 5 } },
      { text: "SOPLAR LA VELA CON TODOS", effect: "Cantas el 'Cumpleaños Feliz' versión lenta.", stats: { chileno: 15 } }
    ]
  },
  {
    id: "md44_estacionamiento_infierno",
    minCordura: 0,
    emoji: "🅿️",
    context: "Intentas estacionar el auto de la empresa.",
    text: "EL ÚNICO ESPACIO QUEDA ENTRE DOS CAMIONETAS MINERAS.",
    choices: [
      { text: "MANIOBRA DE 18 TIEMPOS", effect: "Lo logras. Eres Toretto.", stats: { chileno: 25, cordura: -5 } },
      { text: "IRSE A UN MALL", effect: "Pagas 4 lucas de estacionamiento.", stats: { plata: -4 } }
    ]
  },
  {
    id: "md45_vendedor_paraguas",
    minCordura: 40,
    emoji: "☔",
    context: "Hay un sol radiante de 34 grados.",
    text: "UN TÍO EN LA ESQUINA VENDE PARAGUAS A MIL.",
    choices: [
      { text: "COMPRAR POR PREVENCIÓN", effect: "Te da un golpe de calor usándolo.", stats: { plata: -1, temperatura: 10 } },
      { text: "MIRARLO CON ESCEPTICISMO", effect: "El viejo sabe algo que tú no.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "md46_cursed_jefe_reptil",
    minCordura: 0,
    maxCordura: 39,
    emoji: "🦎",
    context: "Tu mente se derrite por el Excel.",
    text: "AL JEFE SE LE ESCAPA UNA SEGUNDA LENGUA DE LAGARTO AL HABLAR.",
    choices: [
      { text: "OFRECERLE UNA MOSCA", effect: "Te sube el sueldo mentalmente.", stats: { cordura: -20, chileno: 30 } },
      { text: "FROTARSE LOS OJOS", effect: "Solo era tu astigmatismo corporativo.", stats: { cordura: 10 } }
    ]
  },
  {
    id: "md47_cursed_completo_flotante",
    minCordura: 0,
    maxCordura: 30,
    emoji: "🛸",
    context: "Miras tu plato de almuerzo.",
    text: "EL COMPLETO ITALIANO EMPIEZA A FLOTAR Y EMITE LUZ NEÓN.",
    choices: [
      { text: "MORDER EL AIRE", effect: "Te muerdes la lengua. Qué dolor.", stats: { cordura: -25 } },
      { text: "ALABAR AL DIOS ITALIANO", effect: "Alcanzas la iluminación criolla.", stats: { chileno: 50, cordura: -10 } }
    ]
  },
  {
    id: "md48_cursed_baño_infinito",
    minCordura: 0,
    maxCordura: 25,
    emoji: "🚪",
    context: "Entras al baño de la oficina.",
    text: "CADA PUERTA CONDUCE A OTRA SALA DE BAÑOS IDÉNTICA. THE BACKROOMS CHILENOS.",
    choices: [
      { text: "URINARIO ANCESTRAL", effect: "Te atrapa el fantasma de las liquidaciones.", stats: { cordura: -30 } },
      { text: "SEGUIR EL OLOR A POET", effect: "Logras salir por la cocina.", stats: { cordura: 15 } }
    ]
  },
  {
    id: "md49_cursed_fotocopiadora",
    minCordura: 0,
    maxCordura: 35,
    emoji: "🖨️",
    context: "Vas a sacar una copia.",
    text: "LA FOTOCOPIADORA EMPIEZA A IMPRIMIR FOTOS DE TU INFANCIA.",
    choices: [
      { text: "QUEMAR LA MÁQUINA", effect: "Llaman a seguridad.", stats: { cordura: -20 } },
      { text: "GUARDARLAS EN LA MOCHILA", effect: "Nostalgia de golpe.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "md50_cursed_clima_polar",
    minCordura: 0,
    maxCordura: 20,
    emoji: "🥶",
    context: "Miras por la ventana de la oficina.",
    text: "ESTÁ NEVANDO EN SANTIAGO CENTRO, PERO EL TERMÓMETRO MARCA 40 GRADOS.",
    choices: [
      { text: "SALIR EN POLERA", effect: "Te transformas en estatua de hielo-fuego.", stats: { temperatura: 20, cordura: -40 } },
      { text: "ABRAZAR EL BIDÓN", effect: "El agua está tibia.", stats: { cordura: -10 } }
    ]
  }
];
