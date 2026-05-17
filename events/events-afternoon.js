export const afternoonEvents = [
  {
    id: "t51_sol_tarde",
    minCordura: 40,
    emoji: "☀️",
    context: "Caminas a tomar el transporte de vuelta. El sol está bajo.",
    text: "EL SOL TE PEGA DIRECTO EN LOS OJOS Y NO VES NADA.",
    choices: [
      { text: "COMPRAR LENTES A MIL", effect: "Plástico del malo, quedas ciego.", stats: { plata: -1, cordura: -5 } },
      { text: "USAR MANO DE VISERA", effect: "Te chocas con un letrero de 'Peligro'.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "t52_fiscalizador_bip",
    minCordura: 0,
    emoji: "👮‍♂️",
    context: "Te subes a la micro y se suben tres tipos con chaleco rojo.",
    text: "¡FISCALIZACIÓN DE TARJETA BIP!",
    choices: [
      { text: "MOSTRAR CON ORGULLO", effect: "Estás al día. Civilizado.", stats: { cordura: 15 } },
      { text: "BAJARSE EN DERAPE", effect: "Huyes del estado chileno.", stats: { chileno: 30, cordura: -10 } }
    ]
  },
  {
    id: "t53_doctor_simi",
    minCordura: 0,
    emoji: "🕺",
    context: "Pasas por fuera de la farmacia.",
    text: "EL DOCTOR SIMI TE RETA A UN DUELO DE PASOS PROHIBIDOS.",
    choices: [
      { text: "BAILAR HASTA ABAJO", effect: "La gente aplaude. Eres leyenda.", stats: { chileno: 40, cordura: 20 } },
      { text: "IGNORAR AL MONO", effect: "El Simi te hace un gesto obsceno.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "t54_vendedor_ensalada",
    minCordura: 0,
    emoji: "🥬",
    context: "Vas saliendo del metro.",
    text: "UNA SEÑORA VENDE PUNTAS DE APIO A LUCA.",
    choices: [
      { text: "COMPRAR PARA LA ONCE", effect: "Sano y económico.", stats: { plata: -1, hambre: -5 } },
      { text: "PREFERIR PAPAS FONDAS", effect: "Te mira feo por poco patriota.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "t55_corte_luz",
    minCordura: 0,
    emoji: "🔌",
    context: "Estás terminando la jornada.",
    text: "SE CORTA LA LUZ EN TODO EL SECTOR POR UN CHOQUE DE POSTE.",
    choices: [
      { text: "¡NOS VAMOS TEMPRANO!", effect: "Felicidad colectiva.", stats: { cordura: 30 } },
      { text: "ATRAPADO EN ASCENSOR", effect: "Claustrofobia criolla.", stats: { cordura: -35 }, nextEvent: "t56_ascensor_oscuro" }
    ]
  },
  {
    id: "t56_ascensor_oscuro",
    isChain: true,
    emoji: "📦",
    context: "Llevas 20 minutos atrapado con el de finanzas.",
    text: "EL COMPAÑERO EMPIEZA A HABLAR DE SUS CRIPTOMONEDAS.",
    choices: [
      { text: "NOQUEARLO", effect: "Hiciste lo correcto.", stats: { chileno: 20, cordura: 10 } },
      { text: "ESCUCHARLO", effect: "Tu cerebro sufre daño permanente.", stats: { cordura: -30 } }
    ]
  },
  {
    id: "t57_banco_estado_clave",
    minCordura: 0,
    emoji: "🔐",
    context: "Intentas transferir para pagar una deuda.",
    text: "LA APP TE PIDE CLAVE, BEPASS Y COORDENADA 4D.",
    choices: [
      { text: "BLOQUEAR LA CLAVE", effect: "Tienes que ir a una sucursal mañana.", stats: { cordura: -25 } },
      { text: "LOGRARLO AL FIN", effect: "Hackers de la NASA un poroto.", stats: { cordura: 15 } }
    ]
  },
  {
    id: "t58_vendedor_helados",
    minCordura: 0,
    emoji: "🍦",
    context: "En la micro hace calor de sauna.",
    text: "SUBE UN TÍO CON UN BALDE: '¡HELADO A CIEN, A CIEN, A CIEN!'.",
    choices: [
      { text: "COMPRAR EL DE PIÑA", effect: "Refrescante pero sospechoso.", stats: { plata: -1, temperatura: -10, hambre: -5 } },
      { text: "DUDAR DE LA CADENA", effect: "Sufres el calor en silencio.", stats: { cordura: -10, temperatura: 5 } }
    ]
  },
  {
    id: "t59_perro_skater",
    minCordura: 0,
    emoji: "🛹",
    context: "Ves pasar algo rápido por la plaza.",
    text: "UN QUILTRO VA ARRIBA DE UN SKATE HACIENDO UN OLLIE.",
    choices: [
      { text: "GRITAR '¡CTM BUENA!'", effect: "El perro te ladra con onda.", stats: { chileno: 35, cordura: 25 } },
      { text: "IGNORARLO (VISTE TIKTOK)", effect: "Te pierdes el milagro de la vida.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "t60_paradero_infierno",
    minCordura: 0,
    emoji: "🚏",
    context: "Fila de 3 cuadras para la micro a Maipú/Puente Alto.",
    text: "LA GENTE EMPIEZA A EMPUJAR POR EL LADO.",
    choices: [
      { text: "METER CODO EN RUGBY", effect: "Consigues asiento al fondo.", stats: { chileno: 20, cordura: -10 } },
      { text: "RESPETAR LA FILA", effect: "Te quedas abajo 3 veces.", stats: { cordura: -20, hambre: 10 } }
    ]
  },
  {
    id: "t61_comercio_ambulante",
    minCordura: 0,
    emoji: "🕶️",
    context: "La vereda está tapada con paños azules.",
    text: "¡VIENE CARABINEROS RAJADO!",
    choices: [
      { text: "CORRER CON AMBULANTES", effect: "Te atrapa la adrenalina del comercio.", stats: { chileno: 30, cordura: -5 } },
      { text: "QUEDAR ATRAPADO", effect: "Te pisan un pie en la estampida.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "t62_noticia_impacto",
    minCordura: 0,
    emoji: "📺",
    context: "Miras la tele de un negocio.",
    text: "TITULAR: 'SANTIAGO TENDRÁ 42 GRADOS MAÑANA POR OLA DE CALOR'.",
    choices: [
      { text: "COMPRAR VENTILADOR", effect: "Precio inflado un 300%.", stats: { plata: -8, cordura: 5 } },
      { text: "ACEPTAR INCINERACIÓN", effect: "Tu cuerpo ya es ceniza.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "t63_cuaderno_colon",
    minCordura: 0,
    emoji: "📓",
    context: "Un promotor te regala un cuaderno en la calle.",
    text: "EL CUADERNO TIENE LA MARCA DE UN REMEDIO PARA EL COLON.",
    choices: [
      { text: "ANOTAR TUS DEUDAS", effect: "Poético y nacional.", stats: { chileno: 15 } },
      { text: "BOTARLO AL TIRO", effect: "Te da dolor de guata por botar cosas gratis.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "t64_marraqueta_fresca",
    minCordura: 0,
    emoji: "🥖",
    context: "Pasas por fuera de la panadería de barrio.",
    text: "HUELE A MARRAQUETA RECIÉN SALIDA DEL HORNO.",
    choices: [
      { text: "COMPRAR MEDIO KILO", effect: "Felicidad pura. Te comes una tibia.", stats: { plata: -2, hambre: -25, cordura: 25 } },
      { text: "SEGUIR DE LARGO", effect: "La peor decisión de tu vida.", stats: { cordura: -20 } }
    ]
  },
  {
    id: "t65_soprole_sorpresa",
    minCordura: 0,
    emoji: "🥛",
    context: "Abres tu mochila.",
    text: "UN YOGURT SE REVENTÓ SOBRE TODOS TUS PAPELES.",
    choices: [
      { text: "LIMPIAR CON CONFORT", effect: "Queda todo pastoso y blanco.", stats: { cordura: -25 } },
      { text: "BOTAR LA MOCHILA", effect: "Medida extrema pero necesaria.", stats: { plata: -10, cordura: -10 } }
    ]
  },
  {
    id: "t66_cursed_sol_francisco",
    minCordura: 0,
    maxCordura: 39,
    emoji: "👁️",
    context: "Miras al cielo deshidratado por la micro.",
    text: "EL SOL TIENE LA CARA DE DON FRANCISCO: '¿QUÉ DICE EL PÚBLICO?'.",
    choices: [
      { text: "GRITAR: '¡EL CHACAL!'", effect: "Te da su bendición de Sábado Gigante.", stats: { chileno: 40, cordura: -10 } },
      { text: "CORRER ASUSTADO", effect: "Te chocas con un carro de sopaipillas.", stats: { cordura: -20 } }
    ]
  },
  {
    id: "t67_cursed_estatua_viva",
    minCordura: 0,
    maxCordura: 30,
    emoji: "🗿",
    context: "Pasas al lado de la estatua humana plateada.",
    text: "LA ESTATUA TE SUSURRA TU RUT COMPLETO Y SALE CORRIENDO.",
    choices: [
      { text: "PERSEGUIRLA", effect: "Se sube a un Transantiago volador.", stats: { cordura: -25 } },
      { text: "QUEDAR HELADO", effect: "Tu mente se apaga un momento.", stats: { cordura: -20 } }
    ]
  },
  {
    id: "t68_cursed_palomas_mafia",
    minCordura: 0,
    maxCordura: 35,
    emoji: "🐦",
    context: "Te sientas en una banca de la plaza.",
    text: "CUATRO PALOMAS TE RODEAN Y HABLAN EN COA.",
    choices: [
      { text: "ENTREGAR EL CELULAR", effect: "Se llevan tus galletas Tritón.", stats: { hambre: 10, cordura: -20 } },
      { text: "HACERLES 'SHUUU'", effect: "Vuelan haciendo señas raras.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "t69_cursed_pandereta",
    minCordura: 0,
    maxCordura: 25,
    emoji: "🧱",
    context: "Vas caminando por tu barrio.",
    text: "TODAS LAS CASAS SON PANDERETAS GRISES SIN PUERTAS.",
    choices: [
      { text: "SALTAR UNA", effect: "Caes en el patio de un pitbull cuántico.", stats: { cordura: -30 } },
      { text: "LLAMAR A TU MAMÁ", effect: "Tu mamá te responde con voz de robot.", stats: { cordura: -40 } }
    ]
  },
  {
    id: "t70_cursed_tocomple_vengador",
    minCordura: 0,
    maxCordura: 20,
    emoji: "🌭",
    context: "Ves un completo tirado en la calle.",
    text: "EL COMPLETO TIENE OJOS Y TE PIDE VOLVER A SU HOGAR.",
    choices: [
      { text: "COMÉRSELO (HAY HAMBRE)", effect: "Adquieres visiones del año 1810.", stats: { hambre: -40, cordura: -30, chileno: 30 } },
      { text: "LLEVARLO EN EL BOLSILLO", effect: "Sientes su calorcito palta.", stats: { cordura: -15 } }
    ]
  }
];
