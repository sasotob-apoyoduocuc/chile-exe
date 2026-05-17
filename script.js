// CHILE.EXE — script.js CORREGIDO
// Fixes incluidos:
// 1. Sin ES modules — todo inline (fix el bug de "Cargando...")
// 2. Game over real (no alert)
// 3. Win screen real (no alert)  
// 4. Clamping de plata (no negativa)
// 5. Fix cadenas: nextEvent SÍ avanza eventsThisPhase
// 6. minCordura corregido: t51(0), n76(0), n81(0)
// 7. Daño nocturno reducido para balance
// 8. n101 cordura -50 en vez de -100
// 9. n102 detectado como evento WIN

const morningEvents = [
  {
    id: "m1_micro_no_paro", minCordura: 0,
    emoji: "🚌",
    context: "Llevas 40 minutos esperando en el paradero.",
    text: "LA MICRO NO PARÓ.",
    choices: [
      { text: "CORRER DETRÁS", effect: "¡CORRE CONCHETUMARE!", stats: { chileno: 15, cordura: -10, temperatura: 5 }, nextEvent: "m2_micro_la_alcanzaste" },
      { text: "INSULTAR AL CHOFER", effect: "¡VIEJO QLIAOOO!", stats: { chileno: 25, cordura: -5 }, nextEvent: "m4_paradero_pelea" },
      { text: "ACEPTAR TU DESTINO", effect: "Te sientas a llorar.", stats: { cordura: -15, hambre: 5 } }
    ]
  },
  {
    id: "m2_micro_la_alcanzaste", isChain: true,
    emoji: "🏃💨",
    context: "La micro paró en el semáforo. Te subiste con el pulmón en la mano.",
    text: "EL CHOFER TE MIRA CON ODIO.",
    choices: [
      { text: "PAGAR SIN SALDO", effect: "*Ploop* Saldo Insuficiente", stats: { chileno: 20, cordura: -10 }, nextEvent: "m3_micro_bip_rechazada" },
      { text: "PEDIR UNA SALVADA", effect: "¿Alguien que me salve con 100?", stats: { cordura: -20 } },
      { text: "PASAR DE LARGO", effect: "Te haces el larry al fondo.", stats: { chileno: 30, cordura: -5 } }
    ]
  },
  {
    id: "m3_micro_bip_rechazada", isChain: true,
    emoji: "🤫",
    context: "El chofer dice: 'Abajo del bus, la wea no es gratis'.",
    text: "TODA LA MICRO TE QUEDA MIRANDO.",
    choices: [
      { text: "PAGAR CON EMBUNQUE", effect: "Aceptó el trueque por respeto.", stats: { chileno: 40, hambre: 10 } },
      { text: "BAJARSE DIGNAMENTE", effect: "Te bajas caminando como un rey.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "m4_paradero_pelea", isChain: true,
    emoji: "🤬",
    context: "Le gritaste tan fuerte que una señora te apoya.",
    text: "LA SEÑORA DICE: 'Tienen el monopolio estos sinvergüenzas'.",
    choices: [
      { text: "DEBATIR DEL SISTEMA", effect: "Arreglaron Chile en 2 minutos.", stats: { cordura: 15 } },
      { text: "IGNORARLA POR MIEDO", effect: "Te pones los audífonos sin música.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "m5_bip_no_carga", minCordura: 0,
    emoji: "💳",
    context: "Estás en el tótem del Metro.",
    text: "LA APLICACIÓN SE CAYÓ Y NO TIENES SALDO.",
    choices: [
      { text: "SALTAR EL TORNIQUETE", effect: "+50% Adrenalina criminal.", stats: { chileno: 35, cordura: -10 } },
      { text: "LLORARLE AL GUARDIA", effect: "El guardia te mira con desprecio.", stats: { cordura: -20 } },
      { text: "COMPRAR PASAJE MANUAL", effect: "Fila de 40 personas.", stats: { cordura: -15, plata: -2 } }
    ]
  },
  {
    id: "m6_vendedor_carro", minCordura: 0,
    emoji: "🍳",
    context: "Sales del metro y huele a gloria.",
    text: "UN TÍO VENDE SÁNDWICH DE POTRITO A LUCA.",
    choices: [
      { text: "COMPRAR ONE", effect: "Sabor celestial, riesgo estomacal.", stats: { plata: -2, hambre: -40 }, nextEvent: "m7_potrito_venganza" },
      { text: "SEGUIR DE LARGO", effect: "Tu estómago ruge de rabia.", stats: { hambre: 15, cordura: -5 } }
    ]
  },
  {
    id: "m7_potrito_venganza", isChain: true,
    emoji: "🌋",
    context: "Caminas a la pega y sientes un frío en la espalda.",
    text: "EL POTRITO RECLAMA SU TRONO.",
    choices: [
      { text: "CORRER AL BAÑO", effect: "Llegas derrapando al piso 3.", stats: { cordura: -20, temperatura: 5 } },
      { text: "REZARLE A DIOS", effect: "Dios no atiende en horario laboral.", stats: { cordura: -25 } }
    ]
  },
  {
    id: "m8_audifonos_fallan", minCordura: 0,
    emoji: "🎧",
    context: "Vas en el vagón escuchando tu playlist sad.",
    text: "SE DESCONECTA EL BLUETOOTH Y SE ESCUCHA EN ALTAVOZ.",
    choices: [
      { text: "APAGAR EL CELULAR", effect: "Demasiado tarde. Todos escucharon.", stats: { cordura: -25 } },
      { text: "CANTARLA A TODO PULMÓN", effect: "Impones respeto en el vagón.", stats: { chileno: 40, cordura: 10 } }
    ]
  },
  {
    id: "m9_trio_andino", minCordura: 0,
    emoji: "🪈",
    context: "El vagón va reventado y entran tres tipos.",
    text: "EMPIEZAN A TOCAR RITMOS ANDINOS EN TU OÍDO.",
    choices: [
      { text: "DARLES UNA MONEDA", effect: "Se van al siguiente vagón.", stats: { plata: -1 } },
      { text: "SUFRIR EN SILENCIO", effect: "La flauta te taladra el cerebro.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "m10_chaleco_amarillo", minCordura: 0,
    emoji: "🦺",
    context: "Caminas por la vereda.",
    text: "UN CUIDADOR DE AUTOS TE PIDE PLATA POR MIRARTE.",
    choices: [
      { text: "PAGARLE 500 PESOS", effect: "'Ya mi jefe, se lo cuido'.", stats: { plata: -1 } },
      { text: "DECIR 'A LA VUELTA'", effect: "Mecanismo de defensa chileno.", stats: { chileno: 20 } }
    ]
  },
  {
    id: "m12_perro_paradero", minCordura: 0,
    emoji: "🐕",
    context: "Estás solo en el paradero esperando.",
    text: "UN QUILTRO NEGRO SE ACERCA Y TE CONGELA LA MIRADA.",
    choices: [
      { text: "HACERLE 'TUTUTU'", effect: "Se vuelve tu guardaespaldas.", stats: { cordura: 20 } },
      { text: "DARLE UN PEDAZO DE PAN", effect: "Te ganaste un amigo de por vida.", stats: { hambre: 5, cordura: 30 } }
    ]
  },
  {
    id: "m13_asiento_reservado", minCordura: 0,
    emoji: "🪑",
    context: "Lograste sentarte en la micro desocupada.",
    text: "SUBE UNA SEÑORA CON TRES BOLSAS DE FERIA.",
    choices: [
      { text: "HACERSE EL DORMIDO", effect: "El pecado más grande de Chile.", stats: { chileno: 15, cordura: -10 } },
      { text: "DARLE EL ASIENTO", effect: "Karma +100. Tus piernas sufren.", stats: { cordura: 15 } }
    ]
  },
  {
    id: "m15_super_8", minCordura: 0,
    emoji: "🍫",
    context: "El semáforo se pone en rojo.",
    text: "UN TÍO SUBE A VENDER SUPER 8 A MÓDICO PRECIO.",
    choices: [
      { text: "COMPRAR LA PROMO", effect: "Desayuno de campeones.", stats: { plata: -1, hambre: -15 } },
      { text: "EVITAR CONTACTO VISUAL", effect: "Miras fijamente el piso de la micro.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "m17_conserje_copuchento", minCordura: 0,
    emoji: "🏢",
    context: "Llegas al edificio corporativo.",
    text: "EL CONSERJE TE DETIENE PARA CONTARTE UN CHISME.",
    choices: [
      { text: "ESCUCHAR EL CORDÓN", effect: "Te enteras de cosas prohibidas.", stats: { cordura: 10 }, nextEvent: "m18_conserje_secreto" },
      { text: "DECIR QUE VAS TARDE", effect: "Te ganaste un enemigo poderoso.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "m18_conserje_secreto", isChain: true,
    emoji: "🤫",
    context: "El conserje susurra: 'El del 402 no es su marido'.",
    text: "LA INFORMACIÓN ES DEMASIADO PODEROSA.",
    choices: [
      { text: "USARLA PARA EL BIEN", effect: "Te sientes el dueño del edificio.", stats: { cordura: 15 } },
      { text: "QUEDAR PARANOICO", effect: "¿Qué sabrá el conserje de mí?", stats: { cordura: -15 } }
    ]
  },
  {
    id: "m20_pan_con_palta", minCordura: 0,
    emoji: "🥑",
    context: "Tu compañero trajo marraqueta con palta molida de su casa.",
    text: "TE OFRECE LA MITAD.",
    choices: [
      { text: "ACEPTAR FELIZ", effect: "Esto es verdadera amistad.", stats: { hambre: -25, cordura: 25 } },
      { text: "RECHAZAR POR VERGÜENZA", effect: "Te arrepentirás todo el día.", stats: { cordura: -15, hambre: 5 } }
    ]
  },
  {
    id: "m21_cursed_pudu", minCordura: 0, maxCordura: 39,
    emoji: "🦌",
    context: "El estrés de la mañana te fracturó la mente.",
    text: "UN PUDÚ GIGANTE TE PIDE LA TARJETA BIP EN EL TORNIQUETE.",
    choices: [
      { text: "ENTREGÁRSELA", effect: "El Pudú susurra: 'Venceremos'.", stats: { cordura: -20, chileno: 50 } },
      { text: "GOLPEARTE LA CARA", effect: "Era un basurero municipal.", stats: { cordura: 15 } }
    ]
  },
  {
    id: "m22_cursed_micro_fantasma", minCordura: 0, maxCordura: 35,
    emoji: "👻",
    context: "Te subes a una micro completamente vacía a las 8 AM.",
    text: "EL CHOFER ES UN ESQUELETO CON GORRA DEL COLO.",
    choices: [
      { text: "PAGAR EL PASAJE", effect: "El esqueleto te da las gracias.", stats: { chileno: 30, cordura: -10 } },
      { text: "SALTAR POR LA VENTANA", effect: "Caes en un arbusto de la Alameda.", stats: { cordura: -20 } }
    ]
  },
  {
    id: "m24_cursed_Tio_Aceite", minCordura: 0, maxCordura: 39,
    emoji: "🧙",
    context: "Ves un puesto de sopaipillas en la niebla.",
    text: "EL REY DEL ACEITE TE OFRECE LA SOPAIPILLA ANCESTRAL.",
    choices: [
      { text: "COMERLA DE UN BOCADO", effect: "Tu estómago es ahora de acero.", stats: { hambre: -50, chileno: 50, cordura: -15 } },
      { text: "CORRER POR TU VIDA", effect: "Sientes su mirada frita en tu espalda.", stats: { cordura: -10 } }
    ]
  }
];

const middayEvents = [
  {
    id: "md26_reunion_sorpresa", minCordura: 0,
    emoji: "🧑‍💼",
    context: "Faltan 5 minutos para salir a almorzar.",
    text: "EL JEFE TE ATRAVIESA CON UN '¿TIENES 5 MINUTITOS?'.",
    choices: [
      { text: "DECIR QUE SÍ Y SONREÍR", effect: "Dolor interno masivo.", stats: { cordura: -20 }, nextEvent: "md27_reunion_eterna" },
      { text: "HACERSE EL WEON", effect: "Sales corriendo al baño.", stats: { chileno: 25 } }
    ]
  },
  {
    id: "md27_reunion_eterna", isChain: true,
    emoji: "⏳",
    context: "Los 5 minutos se transformaron en una hora de PowerPoint.",
    text: "TU ESTÓMAGO RUGE TAN FUERTE QUE SE ESCUCHA EN LA SALA.",
    choices: [
      { text: "DECIR QUE FUE UN TEMBLOR", effect: "Todos te creen porque es Chile.", stats: { chileno: 30, cordura: 10 } },
      { text: "PEDIR PERDÓN Y SALIR", effect: "Humillación corporativa total.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "md28_casino_comida", minCordura: 0,
    emoji: "🤢",
    context: "El menú del casino hoy se ve extraño.",
    text: "¿TE ARRIESGAS CON LOS TALLARINES CON PRENSA?",
    choices: [
      { text: "COMER IGUAL", effect: "Sabor a cloroformo.", stats: { hambre: -40, cordura: -15 }, nextEvent: "md29_colon_guerra" },
      { text: "IR AL CHINO DE LA ESQUINA", effect: "Mucho arroz, precio decente.", stats: { plata: -5, hambre: -30 } }
    ]
  },
  {
    id: "md29_colon_guerra", isChain: true,
    emoji: "🌋",
    context: "Pasaron 10 minutos desde el almuerzo.",
    text: "TU COLON IRRITABLE LE DECLARA LA GUERRA A TU CUERPO.",
    choices: [
      { text: "BAÑO DEL JEFE", effect: "Estableciendo dominancia.", stats: { chileno: 35, cordura: -5 } },
      { text: "AGUANTAR CON SUDOR FRÍO", effect: "Tu alma abandona el cuerpo.", stats: { cordura: -25, temperatura: 5 } }
    ]
  },
  {
    id: "md30_completo_italiano", minCordura: 0,
    emoji: "🌭",
    context: "Decidiste ir por un tocomple de confianza.",
    text: "EL MAESTRO TE PREGUNTA: '¿CON MAYO CASERA, MI REY?'.",
    choices: [
      { text: "ARRIESGARSE (CON TODO)", effect: "DIOS TIENE A SUS FAVORITOS.", stats: { hambre: -35, cordura: 20, chileno: 15 } },
      { text: "SIN MAYO", effect: "El maestro te mira decepcionado.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "md33_temblor_oficina", minCordura: 0,
    emoji: "🫨",
    context: "Estás tecleando en Excel.",
    text: "EMPIEZA A MOVERSE LA LÁMPARA DEL TECHO. ES UN 5.8.",
    choices: [
      { text: "SEGUIR TRABAJANDO", effect: "Nivel de chilenidad al máximo.", stats: { chileno: 30, cordura: 5 } },
      { text: "CORRER AL MARCO DE LA PUERTA", effect: "Tus compañeros te tildan de tierno.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "md37_colacion_robada", minCordura: 0,
    emoji: "🍱",
    context: "Vas al refrigerador común a buscar tu postre.",
    text: "ALGUIEN SE COMIÓ TU CHOCMAN.",
    choices: [
      { text: "DEJAR UN CARTEL CON INSULTOS", effect: "Guerra pasivo-agresiva declarada.", stats: { chileno: 20, cordura: -5 } },
      { text: "LLORAR EN EL BAÑO", effect: "El Chocman era tu única luz.", stats: { cordura: -15, hambre: 10 } }
    ]
  },
  {
    id: "md39_chilenismo_jefe", minCordura: 0,
    emoji: "💼",
    context: "El jefe imita modismos de TikTok para sonar buena onda.",
    text: "TE DICE: 'Ese reporte está muy de pana, mi rey'.",
    choices: [
      { text: "DECIR 'DE CHILL'", effect: "Cringe corporativo nivel dios.", stats: { cordura: -20 } },
      { text: "MIRARLO FIJO SIN PARPADEAR", effect: "El jefe se asusta y se va.", stats: { cordura: 10 } }
    ]
  },
  {
    id: "md43_torta_tres_leches", minCordura: 0,
    emoji: "🍰",
    context: "Es el cumpleaños de la secretaria.",
    text: "HAY TORTA TRES LECHES EN LA SALA DE REUNIONES.",
    choices: [
      { text: "REPETIRSE EL PLATO", effect: "Coma diabético instantáneo.", stats: { hambre: -30, cordura: 20, temperatura: 5 } },
      { text: "SOPLAR LA VELA CON TODOS", effect: "Cantas el himno versión lenta.", stats: { chileno: 15 } }
    ]
  },
  {
    id: "md41_pastor_soto", minCordura: 0,
    emoji: "📢",
    context: "Pasas por la plaza de armas.",
    text: "UN PREDICADOR CON PARLANTE TE GRITA QUE TE VAS A QUEMAR.",
    choices: [
      { text: "PEDIRLE QUE BAJE EL VOLUMEN", effect: "Te tira la biblia en la cara.", stats: { cordura: -15 } },
      { text: "AMÉN HERMANO", effect: "Te bendice y te da un folleto.", stats: { cordura: 10 } }
    ]
  },
  {
    id: "md46_cursed_jefe_reptil", minCordura: 0, maxCordura: 39,
    emoji: "🦎",
    context: "Tu mente se derrite por el Excel.",
    text: "AL JEFE SE LE ESCAPA UNA SEGUNDA LENGUA DE LAGARTO AL HABLAR.",
    choices: [
      { text: "OFRECERLE UNA MOSCA", effect: "Te sube el sueldo mentalmente.", stats: { cordura: -20, chileno: 30 } },
      { text: "FROTARSE LOS OJOS", effect: "Era tu astigmatismo corporativo.", stats: { cordura: 10 } }
    ]
  },
  {
    id: "md47_cursed_completo_flotante", minCordura: 0, maxCordura: 30,
    emoji: "🛸",
    context: "Miras tu plato de almuerzo.",
    text: "EL COMPLETO ITALIANO EMPIEZA A FLOTAR Y EMITE LUZ NEÓN.",
    choices: [
      { text: "MORDER EL AIRE", effect: "Te muerdes la lengua. Qué dolor.", stats: { cordura: -20 } },
      { text: "ALABAR AL DIOS ITALIANO", effect: "Alcanzas la iluminación criolla.", stats: { chileno: 50, cordura: -10 } }
    ]
  },
  {
    id: "md48_cursed_baño_infinito", minCordura: 0, maxCordura: 25,
    emoji: "🚪",
    context: "Entras al baño de la oficina.",
    text: "CADA PUERTA CONDUCE A OTRA SALA DE BAÑOS. THE BACKROOMS CHILENOS.",
    choices: [
      { text: "URINARIO ANCESTRAL", effect: "Te atrapa el fantasma de las liquidaciones.", stats: { cordura: -20 } },
      { text: "SEGUIR EL OLOR A POET", effect: "Logras salir por la cocina.", stats: { cordura: 15 } }
    ]
  }
];

const afternoonEvents = [
  {
    id: "t51_sol_tarde", minCordura: 0,
    emoji: "☀️",
    context: "Caminas a tomar el transporte de vuelta.",
    text: "EL SOL TE PEGA DIRECTO EN LOS OJOS Y NO VES NADA.",
    choices: [
      { text: "COMPRAR LENTES A MIL", effect: "Plástico del malo, quedas ciego.", stats: { plata: -1, cordura: -5 } },
      { text: "USAR MANO DE VISERA", effect: "Te chocas con un letrero de 'Peligro'.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "t52_fiscalizador_bip", minCordura: 0,
    emoji: "👮",
    context: "Te subes a la micro y se suben tres tipos con chaleco rojo.",
    text: "¡FISCALIZACIÓN DE TARJETA BIP!",
    choices: [
      { text: "MOSTRAR CON ORGULLO", effect: "Estás al día. Civilizado.", stats: { cordura: 15 } },
      { text: "BAJARSE EN DERAPE", effect: "Huyes del estado chileno.", stats: { chileno: 30, cordura: -10 } }
    ]
  },
  {
    id: "t53_doctor_simi", minCordura: 0,
    emoji: "🕺",
    context: "Pasas por fuera de la farmacia.",
    text: "EL DOCTOR SIMI TE RETA A UN DUELO DE PASOS PROHIBIDOS.",
    choices: [
      { text: "BAILAR HASTA ABAJO", effect: "La gente aplaude. Eres leyenda.", stats: { chileno: 40, cordura: 20 } },
      { text: "IGNORAR AL MONO", effect: "El Simi te hace un gesto obsceno.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "t55_corte_luz", minCordura: 0,
    emoji: "🔌",
    context: "Estás terminando la jornada.",
    text: "SE CORTA LA LUZ EN TODO EL SECTOR POR UN CHOQUE DE POSTE.",
    choices: [
      { text: "¡NOS VAMOS TEMPRANO!", effect: "Felicidad colectiva.", stats: { cordura: 30 } },
      { text: "ATRAPADO EN ASCENSOR", effect: "Claustrofobia criolla.", stats: { cordura: -20 }, nextEvent: "t56_ascensor_oscuro" }
    ]
  },
  {
    id: "t56_ascensor_oscuro", isChain: true,
    emoji: "📦",
    context: "Llevas 20 minutos atrapado con el de finanzas.",
    text: "EL COMPAÑERO EMPIEZA A HABLAR DE SUS CRIPTOMONEDAS.",
    choices: [
      { text: "NOQUEARLO", effect: "Hiciste lo correcto.", stats: { chileno: 20, cordura: 10 } },
      { text: "ESCUCHARLO", effect: "Tu cerebro sufre daño permanente.", stats: { cordura: -20 } }
    ]
  },
  {
    id: "t58_vendedor_helados", minCordura: 0,
    emoji: "🍦",
    context: "En la micro hace calor de sauna.",
    text: "SUBE UN TÍO: '¡HELADO A CIEN, A CIEN, A CIEN!'.",
    choices: [
      { text: "COMPRAR EL DE PIÑA", effect: "Refrescante pero sospechoso.", stats: { plata: -1, temperatura: -10, hambre: -5 } },
      { text: "DUDAR DE LA CADENA", effect: "Sufres el calor en silencio.", stats: { cordura: -10, temperatura: 5 } }
    ]
  },
  {
    id: "t59_perro_skater", minCordura: 0,
    emoji: "🛹",
    context: "Ves pasar algo rápido por la plaza.",
    text: "UN QUILTRO VA ARRIBA DE UN SKATE HACIENDO UN OLLIE.",
    choices: [
      { text: "GRITAR '¡CTM BUENA!'", effect: "El perro te ladra con onda.", stats: { chileno: 35, cordura: 25 } },
      { text: "IGNORARLO (VISTE TIKTOK)", effect: "Te pierdes el milagro de la vida.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "t60_paradero_infierno", minCordura: 0,
    emoji: "🚏",
    context: "Fila de 3 cuadras para la micro a Maipú.",
    text: "LA GENTE EMPIEZA A EMPUJAR POR EL LADO.",
    choices: [
      { text: "METER CODO EN RUGBY", effect: "Consigues asiento al fondo.", stats: { chileno: 20, cordura: -10 } },
      { text: "RESPETAR LA FILA", effect: "Te quedas abajo 3 veces.", stats: { cordura: -15, hambre: 10 } }
    ]
  },
  {
    id: "t64_marraqueta_fresca", minCordura: 0,
    emoji: "🥖",
    context: "Pasas por fuera de la panadería de barrio.",
    text: "HUELE A MARRAQUETA RECIÉN SALIDA DEL HORNO.",
    choices: [
      { text: "COMPRAR MEDIO KILO", effect: "Felicidad pura. Te comes una tibia.", stats: { plata: -2, hambre: -25, cordura: 25 } },
      { text: "SEGUIR DE LARGO", effect: "La peor decisión de tu vida.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "t66_cursed_sol_francisco", minCordura: 0, maxCordura: 39,
    emoji: "👁️",
    context: "Miras al cielo deshidratado por la micro.",
    text: "EL SOL TIENE LA CARA DE DON FRANCISCO: '¿QUÉ DICE EL PÚBLICO?'.",
    choices: [
      { text: "GRITAR: '¡EL CHACAL!'", effect: "Te da su bendición de Sábado Gigante.", stats: { chileno: 40, cordura: -10 } },
      { text: "CORRER ASUSTADO", effect: "Te chocas con un carro de sopaipillas.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "t68_cursed_palomas_mafia", minCordura: 0, maxCordura: 35,
    emoji: "🐦",
    context: "Te sientas en una banca de la plaza.",
    text: "CUATRO PALOMAS TE RODEAN Y HABLAN EN COA.",
    choices: [
      { text: "ENTREGAR EL CELULAR", effect: "Se llevan tus galletas Tritón.", stats: { hambre: 10, cordura: -15 } },
      { text: "HACERLES 'SHUUU'", effect: "Vuelan haciendo señas raras.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "t70_cursed_tocomple_vengador", minCordura: 0, maxCordura: 20,
    emoji: "🌭",
    context: "Ves un completo tirado en la calle.",
    text: "EL COMPLETO TIENE OJOS Y TE PIDE VOLVER A SU HOGAR.",
    choices: [
      { text: "COMÉRSELO (HAY HAMBRE)", effect: "Adquieres visiones del año 1810.", stats: { hambre: -40, cordura: -20, chileno: 30 } },
      { text: "LLEVARLO EN EL BOLSILLO", effect: "Sientes su calorcito palta.", stats: { cordura: -15 } }
    ]
  }
];

const nightEvents = [
  {
    id: "n71_metro_tobalaba", minCordura: 0,
    emoji: "🚉",
    context: "Estación Baquedano. Hora punta extrema.",
    text: "EL METRO VIENE TAN LLENO QUE LA GENTE VA PEGADA AL VIDRIO.",
    choices: [
      { text: "METERSE A LA FUERZA", effect: "Te fusionas con tres desconocidos.", stats: { chileno: 25, cordura: -15 }, nextEvent: "n72_olor_metro" },
      { text: "ESPERAR OTRA LÍNEA", effect: "Pasan 5 metros llenos. Llegas mañana.", stats: { cordura: -15, hambre: 15 } }
    ]
  },
  {
    id: "n72_olor_metro", isChain: true,
    emoji: "🤢",
    context: "Estás debajo del brazo de un tipo de dos metros.",
    text: "HUELE A AXE CHOCOLATE VENCIDO Y SUDOR CORPORATIVO.",
    choices: [
      { text: "DEJAR DE RESPIRAR", effect: "Aguantas hasta Estación Central.", stats: { cordura: -10, temperatura: 5 } },
      { text: "CONVERSARLE", effect: "'Oiga pariente, ¿está mala la calor?'", stats: { chileno: 30, cordura: 5 } }
    ]
  },
  {
    id: "n73_once_comida", minCordura: 0,
    emoji: "☕",
    context: "Llegaste vivo a tu casa.",
    text: "LLEGÓ LA HORA DE LA ONCE. ¿QUÉ SE TOMA HOY?",
    choices: [
      { text: "TÉ CON MARRAQUETA", effect: "La cura para el alma chilena.", stats: { hambre: -30, cordura: 25 } },
      { text: "FIDEOS CON SALCHICHA", effect: "Comida de soltero bajonero.", stats: { hambre: -35, cordura: 10 } }
    ]
  },
  {
    id: "n74_vecino_taladro", minCordura: 0,
    emoji: "🔨",
    context: "Son las 11:30 PM. Te vas a dormir.",
    text: "EL VECINO EMPIEZA A TALADRAR SIN RAZÓN.",
    choices: [
      { text: "IR A TOCARLE LA PUERTA", effect: "Pelea vecinal en pijama.", stats: { chileno: 20, cordura: -10 } },
      { text: "TAPARSE CON LA ALMOHADA", effect: "El ruido vibra en tus dientes.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "n76_doomscrolling", minCordura: 0,
    emoji: "📱",
    context: "Estás acostado a oscuras con el celular.",
    text: "LLEVAS 2 HORAS EN TIKTOK VIENDO VIDEOS SHITPOST.",
    choices: [
      { text: "VER UN VIDEO MÁS", effect: "Son las 3 AM. Cagaste.", stats: { cordura: -15, hambre: 5 } },
      { text: "CERRAR EL CELULAR", effect: "Te quedas pensando en tus deudas.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "n77_alarma_olvidada", minCordura: 0,
    emoji: "⏰",
    context: "Casi te quedas dormido.",
    text: "¿PUSISTE LA ALARMA PARA MAÑANA?",
    choices: [
      { text: "REVISAR CON PARANOIA", effect: "Estaba puesta a las 6:00 AM. Alivio.", stats: { cordura: 15 } },
      { text: "DEJARLO AL DESTINO", effect: "Te despiertas a las 9:15 AM en pánico.", stats: { cordura: -20 }, nextEvent: "n78_tarde_pega" }
    ]
  },
  {
    id: "n78_tarde_pega", isChain: true,
    emoji: "💀",
    context: "Despertaste tardísimo.",
    text: "EL JEFE TE DEJÓ UN MENSAJE EN WHATSAPP.",
    choices: [
      { text: "DECIR QUE MURIÓ TU ABUELA", effect: "Ya va por la cuarta abuela.", stats: { chileno: 35, cordura: -10 } },
      { text: "DECIR LA VERDAD", effect: "El jefe te manda al psicólogo laboral.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "n79_temblor_fuerte", minCordura: 0,
    emoji: "🫨",
    context: "Son las 2:00 AM.",
    text: "EMPIEZA UN RUIDO SUBTERRÁNEO BRUTAL. ES UN 6.5.",
    choices: [
      { text: "SEGUIR DURMIENDO", effect: "Si cae la casa, que me caiga durmiendo.", stats: { chileno: 40, cordura: 20 } },
      { text: "SALIR EN BOXERS", effect: "Conversas con los vecinos en pelota.", stats: { chileno: 20, cordura: -5 } }
    ]
  },
  {
    id: "n81_lluvia_techo", minCordura: 0,
    emoji: "🌧️",
    context: "Empieza a llover fuerte afuera.",
    text: "HAY UNA GOTERA ADENTRO.",
    choices: [
      { text: "PONER OLLA DE PRESIÓN", effect: "Ritmo musical para dormir: *Plop*", stats: { chileno: 25, cordura: 10 } },
      { text: "REPARAR EN LINTERNA", effect: "Te resbalas del techo y casi mueres.", stats: { cordura: -20 } }
    ]
  },
  {
    id: "n83_botilleria_turno", minCordura: 0,
    emoji: "🍾",
    context: "Es viernes por la noche (por fin).",
    text: "LA BOTILLERÍA TIENE REJA PROTECTORA DE DOS METROS.",
    choices: [
      { text: "COMPRAR UNA ESCUDO", effect: "El elixir del pueblo de litro.", stats: { plata: -2, cordura: 25, chileno: 20 } },
      { text: "COMPRAR MANÍ SALADO", effect: "Te da sed americana.", stats: { plata: -1, hambre: -5 } }
    ]
  },
  {
    id: "n85_uber_caro", minCordura: 0,
    emoji: "🚗",
    context: "No pasan micros y el metro cerró.",
    text: "EL UBER TIENE TARIFA DINÁMICA DE 15 LUCAS POR 4 CUADRAS.",
    choices: [
      { text: "PAGAR EN LÁGRIMAS", effect: "Tu billetera sangra.", stats: { plata: -15, cordura: -5 } },
      { text: "CAMINAR EN SIGILO", effect: "Corres como Naruto por las esquinas.", stats: { chileno: 35, cordura: -15 } }
    ]
  },
  {
    id: "n86_cursed_fantasma_pega", minCordura: 0, maxCordura: 39,
    emoji: "👻",
    context: "Te despiertas a las 3:33 AM.",
    text: "EL FANTASMA DE TU JEFE ESTÁ AL PIE DE LA CAMA PIDIENDO EL EXCEL.",
    choices: [
      { text: "PASARLE HOJA EN BLANCO", effect: "El espectro se disipa conforme.", stats: { cordura: -15, chileno: 30 } },
      { text: "GRITARLE UN CHILENISMO", effect: "El insulto espanta la esquizofrenia.", stats: { chileno: 45, cordura: 10 } }
    ]
  },
  {
    id: "n87_cursed_chocman_gigante", minCordura: 0, maxCordura: 30,
    emoji: "🍫",
    context: "Tienes parálisis del sueño.",
    text: "UN CHOCMAN GIGANTE SE SIENTA EN TU PECHO Y CANTA EL HIMNO.",
    choices: [
      { text: "SÉPTIMO REFUERZO", effect: "Te liberas del trance con chilenidad.", stats: { chileno: 50, cordura: -10 } },
      { text: "SOPORTAR EL BIZCOCHO", effect: "Despiertas sudando.", stats: { cordura: -20 } }
    ]
  },
  {
    id: "n88_cursed_metro_eterno", minCordura: 0, maxCordura: 25,
    emoji: "🚇",
    context: "Te quedaste dormido en el metro y no hay nadie.",
    text: "LA ESTACIÓN SE LLAMA 'JUICIO FINAL - LÍNEA 666'.",
    choices: [
      { text: "QUEDARSE EN EL TREN", effect: "Viajas al centro de la tierra.", stats: { cordura: -25 } },
      { text: "SUBIR POR ESCALERAS", effect: "Te despiertas en tu cama asustado.", stats: { cordura: 10 } }
    ]
  },
  {
    id: "n90_cursed_quiltro_habla", minCordura: 0, maxCordura: 20,
    emoji: "🐕",
    context: "Tu perro te mira desde el suelo.",
    text: "CON VOZ DE HOMBRE ADULTO DICE: 'Mañana va a llover, guarda la ropa'.",
    choices: [
      { text: "DECIR 'GRACIAS COMPADRE'", effect: "Naturalidad criolla ante la locura.", stats: { chileno: 40, cordura: -10 } },
      { text: "CORRER AL PATIO", effect: "Te quedas afuera con frío.", stats: { cordura: -20, temperatura: -10 } }
    ]
  },
  {
    id: "n101_indio_picaro_gigante", minCordura: 0, maxCordura: 10,
    emoji: "🗿",
    context: "Es el fin de tu cordura.",
    text: "UN INDIO PÍCARO DE 50 METROS DESTRUYE EL COSTANERA CENTER.",
    choices: [
      { text: "LEVANTARLE LA FALDA", effect: "El universo explota saturado.", stats: { chileno: 100, cordura: -50 } },
      { text: "APLAUDIR EL FIN", effect: "Sobreviviste al brainrot final.", stats: { cordura: 20 } }
    ]
  },
  {
    id: "n102_despertar_lunes", minCordura: 0,
    emoji: "🛌",
    context: "Terminaste la semana de terror.",
    text: "EL JUEGO SE VA A REINICIAR. ¿LISTO PARA EL SIFÓN LABORAL?",
    choices: [
      { text: "SÍ, CONCHETUMARE", effect: "El bucle infinito te atrapa.", stats: { cordura: 50 } }
    ]
  }
];

// ── ENGINE ────────────────────────────────────────────────────

const eventsData = {
  morning:   morningEvents,
  midday:    middayEvents,
  afternoon: afternoonEvents,
  night:     nightEvents
};

const days   = ["LUNES","MARTES","MIÉRCOLES","JUEVES","VIERNES"];
const phases = [
  { id: "morning",   name: "MAÑANA"   },
  { id: "midday",    name: "MEDIODÍA"  },
  { id: "afternoon", name: "TARDE"     },
  { id: "night",     name: "NOCHE"     }
];

let stats = { chileno:50, cordura:100, hambre:20, temperatura:18, plata:50 };
let currentDay      = 0;
let currentPhase    = 0;
let eventsThisPhase = 0;
let currentEvent    = null;
let activeChainId   = null;
let lastEventId     = null;
let gameOver        = false;

// ── PANTALLAS ─────────────────────────────────────────────────

function showGameOver() {
  gameOver = true;
  document.getElementById("event-card").innerHTML = `
    <div style="text-align:center;padding:24px;display:flex;flex-direction:column;gap:14px;align-items:center;">
      <div style="font-size:72px;animation:flash-bounce 0.4s steps(2) infinite">💀</div>
      <div style="font-size:28px;font-weight:900;color:#ff0000;-webkit-text-stroke:2px #000;text-shadow:3px 3px 0 #660000;text-transform:uppercase;">
        GAME OVER
      </div>
      <div style="font-family:'Courier New',monospace;font-size:13px;color:#00ff00;background:#000;padding:10px;border:2px solid #333;line-height:1.8;">
        La cordura llegó a 0.<br>
        Te quedaste mirando el techo<br>
        a las 3am un martes.<br><br>
        Chilenidad final: <b>${stats.chileno}</b>
      </div>
      <button onclick="restartGame()"
        style="background:#fff;border:5px solid #000;color:#000;
               font-family:Impact,sans-serif;font-size:20px;
               padding:14px 28px;cursor:pointer;
               box-shadow:5px 5px 0 #000;text-transform:uppercase;">
        DE NUEVO PO
      </button>
    </div>`;
  document.getElementById("effect-text").innerText = "";
  document.getElementById("day-phase").innerText   = "CORDURA: MUERTA";
}

function showWin() {
  gameOver = true;
  document.getElementById("event-card").innerHTML = `
    <div style="text-align:center;padding:24px;display:flex;flex-direction:column;gap:14px;align-items:center;">
      <div style="font-size:64px;animation:flash-bounce 0.4s steps(2) infinite">🇨🇱🏆</div>
      <div style="font-size:22px;font-weight:900;color:#ffff00;-webkit-text-stroke:2px #000;text-shadow:3px 3px 0 #006600;text-transform:uppercase;">
        SOBREVIVISTE LA SEMANA
      </div>
      <div style="font-family:'Courier New',monospace;font-size:13px;color:#00ff00;background:#000;padding:10px;border:2px solid #333;line-height:1.8;">
        Eres un chileno de acero.<br><br>
        Chilenidad: <b>${stats.chileno}</b><br>
        Cordura final: <b>${stats.cordura}</b><br>
        Plata restante: <b>${stats.plata}</b>
      </div>
      <button onclick="restartGame()"
        style="background:#fff;border:5px solid #000;color:#000;
               font-family:Impact,sans-serif;font-size:20px;
               padding:14px 28px;cursor:pointer;
               box-shadow:5px 5px 0 #000;text-transform:uppercase;">
        OTRA VEZ
      </button>
    </div>`;
  document.getElementById("effect-text").innerText = "";
  document.getElementById("day-phase").innerText   = "SEMANA COMPLETA";
}

function restartGame() {
  gameOver        = false;
  stats           = { chileno:50, cordura:100, hambre:20, temperatura:18, plata:50 };
  currentDay      = 0;
  currentPhase    = 0;
  eventsThisPhase = 0;
  activeChainId   = null;
  lastEventId     = null;
  renderEvent();
}

// ── RANDOM ────────────────────────────────────────────────────

function getRandomEvent() {
  if (activeChainId) {
    let found = null;
    for (const key in eventsData) {
      found = eventsData[key].find(e => e.id === activeChainId);
      if (found) break;
    }
    activeChainId = null;
    if (found) return found;
  }

  const phaseId = phases[currentPhase].id;
  let pool = eventsData[phaseId].filter(e => !e.isChain);

  pool = pool.filter(e => {
    const min = e.minCordura !== undefined ? e.minCordura : 0;
    const max = e.maxCordura !== undefined ? e.maxCordura : 100;
    return stats.cordura >= min && stats.cordura <= max;
  });

  if (pool.length > 1 && lastEventId) {
    const noRepeat = pool.filter(e => e.id !== lastEventId);
    if (noRepeat.length > 0) pool = noRepeat;
  }

  if (pool.length === 0) {
    return eventsData[phaseId].filter(e => !e.isChain)[0];
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

// ── RENDER ────────────────────────────────────────────────────

function renderEvent() {
  if (gameOver) return;

  currentEvent = getRandomEvent();
  if (!currentEvent) { advancePhase(); renderEvent(); return; }

  if (currentEvent.id === "n102_despertar_lunes") {
    setTimeout(showWin, 500);
    return;
  }

  lastEventId = currentEvent.id;

  document.getElementById("day-phase").innerText     = `${days[currentDay]} — ${phases[currentPhase].name}`;
  document.getElementById("event-image").innerText   = currentEvent.emoji;
  document.getElementById("event-context").innerText = currentEvent.context;
  document.getElementById("event-text").innerText    = currentEvent.text;

  const choicesEl = document.getElementById("choices");
  choicesEl.innerHTML = "";
  currentEvent.choices.forEach((choice, i) => {
    const btn      = document.createElement("button");
    btn.innerText  = choice.text;
    btn.onclick    = () => choose(i);
    choicesEl.appendChild(btn);
  });

  updateStats();
  applySanityEffects();
}

// ── CHOOSE ────────────────────────────────────────────────────

window.choose = function(index) {
  if (gameOver) return;

  const choice = currentEvent.choices[index];
  document.getElementById("effect-text").innerText = choice.effect;

  for (const stat in choice.stats) {
    if (stats[stat] !== undefined) {
      stats[stat] += choice.stats[stat];
      if (stat === "cordura" || stat === "chileno") {
        stats[stat] = Math.max(0, Math.min(100, stats[stat]));
      } else if (stat === "hambre" || stat === "temperatura") {
        stats[stat] = Math.max(0, Math.min(100, stats[stat]));
      } else if (stat === "plata") {
        stats[stat] = Math.max(0, stats[stat]);
      }
    }
  }

  updateStats();
  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 200);
  document.getElementById("choices").style.pointerEvents = "none";

  if (stats.cordura <= 0) {
    setTimeout(showGameOver, 700);
    return;
  }

  // FIX PRINCIPAL: cadenas SÍ avanzan el contador
  eventsThisPhase++;

  if (choice.nextEvent) {
    activeChainId = choice.nextEvent;
  }

  setTimeout(() => {
    checkPhaseProgression();
    document.getElementById("effect-text").innerText = "";
    document.getElementById("choices").style.pointerEvents = "auto";
    renderEvent();
  }, 1000);
};

// ── FASE ──────────────────────────────────────────────────────

function advancePhase() {
  eventsThisPhase = 0;
  currentPhase++;
  if (currentPhase >= phases.length) {
    currentPhase = 0;
    currentDay++;
    if (currentDay >= days.length) {
      setTimeout(showWin, 500);
    }
  }
}

function checkPhaseProgression() {
  if (eventsThisPhase >= 3) {
    advancePhase();
  }
}

// ── STATS ─────────────────────────────────────────────────────

function updateStats() {
  document.getElementById("chileno").innerText     = stats.chileno;
  document.getElementById("cordura").innerText     = stats.cordura;
  document.getElementById("hambre").innerText      = stats.hambre;
  document.getElementById("temperatura").innerText = stats.temperatura;
  document.getElementById("plata").innerText       = stats.plata;
}

function applySanityEffects() {
  const gameDiv   = document.getElementById("game");
  const eventCard = document.getElementById("event-card");
  if (!gameDiv || !eventCard) return;

  gameDiv.className   = "";
  eventCard.className = "";

  if (stats.cordura <= 60 && stats.cordura > 30) {
    gameDiv.classList.add("distorted-low");
  } else if (stats.cordura <= 30) {
    gameDiv.classList.add("distorted-high");
    eventCard.classList.add("glitch-card");
    if (Math.random() > 0.6) {
      document.getElementById("day-phase").innerText = "¿DÓNDE ESTOY? ¿AYUDA?";
    }
  }
}

// ── START ─────────────────────────────────────────────────────
renderEvent();
