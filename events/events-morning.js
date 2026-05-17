const morningEvents = [
  {
    id: "m1_micro_no_paro",
    minCordura: 0,
    emoji: "🚌",
    context: "Llevas 40 minutos esperando en el paradero.",
    text: "LA MICRO NO PARÓ.",
    choices: [
      { text: "CORRER DETRÁS", effect: "¡CORRE CONCHETUMARE!", stats: { chileno: 15, cordura: -10, temperatura: 5 }, nextEvent: "m2_micro_la_alcanzaste" } ,
      { text: "INSULTAR AL CHOFER", effect: "¡VIEJO QLIAOOO!", stats: { chileno: 25, cordura: -5 }, nextEvent: "m4_paradero_pelea" },
      { text: "ACEPTAR TU DESTINO", effect: "Te sientas a llorar.", stats: { cordura: -15, hambre: 5 } }
    ]
  },
  {
    id: "m2_micro_la_alcanzaste",
    isChain: true,
    emoji: "🏃‍♂️💨",
    context: "La micro paró en el semáforo. Te subiste con el pulmón en la mano.",
    text: "EL CHOFER TE MIRA CON ODIO.",
    choices: [
      { text: "PAGAR SIN SALDO", effect: "*Ploop* Saldo Insuficiente", stats: { chileno: 20, cordura: -10 }, nextEvent: "m3_micro_bip_rechazada" },
      { text: "PEDIR UNA SALVADA", effect: "¿Alguien que me salve con 100?", stats: { cordura: -20, plata: 0 } },
      { text: "PASAR DE LARGO", effect: "Te haces el larry al fondo.", stats: { chileno: 30, cordura: -5 } }
    ]
  },
  {
    id: "m3_micro_bip_rechazada",
    isChain: true,
    emoji: "🤫",
    context: "El chofer dice: 'Abajo del bus, la wea no es gratis'.",
    text: "TODA LA MICRO TE QUEDA MIRANDO.",
    choices: [
      { text: "PAGAR CON EMBUNQUE", effect: "Aceptó el trueque por respeto.", stats: { chileno: 40, hambre: 10 } },
      { text: "BAJARSE DIGNAMENTE", effect: "Te bajas caminando como un rey.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "m4_paradero_pelea",
    isChain: true,
    emoji: "🤬",
    context: "Le gritaste tan fuerte que una señora te apoya.",
    text: "LA SEÑORA DICE: 'Tienen el monopolio estos sinvergüenzas'.",
    choices: [
      { text: "DEBATIR DEL SISTEMA", effect: "Arreglaron Chile en 2 minutos.", stats: { cordura: 15 } },
      { text: "IGNORARLA POR MIEDO", effect: "Te pones los audífonos sin música.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "m5_bip_no_carga",
    minCordura: 30,
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
    id: "m6_vendedor_carro",
    minCordura: 0,
    emoji: "🍳",
    context: "Sales del metro y huelo a gloria.",
    text: "UN TÍO VENDE SÁNDWICH DE POTRITO A LUCA.",
    choices: [
      { text: "COMPRAR ONE", effect: "Sabor celestial, riesgo estomacal.", stats: { plata: -2, hambre: -40 }, nextEvent: "m7_potrito_venganza" },
      { text: "SEGUIR DE LARGO", effect: "Tu estómago ruge de rabia.", stats: { hambre: 15, cordura: -5 } }
    ]
  },
  {
    id: "m7_potrito_venganza",
    isChain: true,
    emoji: "🌋",
    context: "Caminas a la pega y sientes un frío en la espalda.",
    text: "EL POTRITO RECLAMA SU TRONO.",
    choices: [
      { text: "CORRER AL BAÑO", effect: "Llegas derrapando al piso 3.", stats: { cordura: -20, temperatura: 5 } },
      { text: "REZARLE A DIOS", effect: "Dios no atiende en horario laboral.", stats: { cordura: -30 } }
    ]
  },
  {
    id: "m8_audifonos_fallan",
    minCordura: 0,
    emoji: "🎧",
    context: "Vas en el vagón escuchando tu playlist sad.",
    text: "SE DESCONECTA EL BLUETOOTH Y SE ESCUCHA EN ALTAVOZ.",
    choices: [
      { text: "APAGAR EL CELULAR", effect: "Demasiado tarde. Todos escucharon.", stats: { cordura: -25 } },
      { text: "CANTARLA A TODO PULMÓN", effect: "Impones respeto en el vagón.", stats: { chileno: 40, cordura: 10 } }
    ]
  },
  {
    id: "m9_trio_andino",
    minCordura: 0,
    emoji: "🪈",
    context: "El vagón va reventado y entran tres tipos.",
    text: "EMPIEZAN A TOCAR RITMOS ANDINOS EN TU OÍDO.",
    choices: [
      { text: "DARLES UNA MONEDA", effect: "Se van al siguiente vagón.", stats: { plata: -1 } },
      { text: "SUFRIR EN SILENCIO", effect: "La flauta te taladra el cerebro.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "m10_chaleco_amarillo",
    minCordura: 0,
    emoji: "🦺",
    context: "Caminas por la vereda.",
    text: "UN CUIDADOR DE AUTOS TE PIDE PLATA POR MIRARTE.",
    choices: [
      { text: "PAGARLE 500 PESOS", effect: "'Ya mi jefe, se lo cuido'.", stats: { plata: -1 } },
      { text: "DECIR 'A LA VUELTA'", effect: "Mecanismo de defensa chileno.", stats: { chileno: 20 } }
    ]
  },
  {
    id: "m11_ropa_equivocada",
    minCordura: 40,
    emoji: "🧥",
    context: "Saliste de la casa a las 6:30 AM con 5 grados.",
    text: "AHORA SON LAS 9:00 AM Y HACE UN CALOR INFERNAL.",
    choices: [
      { text: "LLEVAR LA PARKA EN LA MANO", effect: "Pareces canero con el botín.", stats: { chileno: 10, cordura: -5 } },
      { text: "SEGUIR USÁNDOLA", effect: "Te deshidratas como una pasa.", stats: { temperatura: 15, cordura: -15 } }
    ]
  },
  {
    id: "m12_perro_paradero",
    minCordura: 0,
    emoji: "🐕",
    context: "Estás solo en el paradero esperando.",
    text: "UN QUILTRO NEGRO SE ACERCA Y TE CONGELA LA MIRADA.",
    choices: [
      { text: "HACERLE 'TUTUTU'", effect: "Se vuelve tu guardaespaldas.", stats: { cordura: 20 } },
      { text: "DARLE UN PEDAZO DE PAN", effect: "Te ganaste un amigo de por vida.", stats: { hambre: 5, cordura: 30 } }
    ]
  },
  {
    id: "m13_asiento_reservado",
    minCordura: 0,
    emoji: "🪑",
    context: "Lograste sentarte en la micro desocupada.",
    text: "SUBE UNA SEÑORA CON TRES BOLSAS DE FERIA.",
    choices: [
      { text: "HACERSE EL DORMIDO", effect: "El pecado más grande de Chile.", stats: { chileno: 15, cordura: -10 } },
      { text: "DARLE EL ASIENTO", effect: "Karma +100. Tus piernas sufren.", stats: { cordura: 15 } }
    ]
  },
  {
    id: "m14_charco_agua",
    minCordura: 0,
    emoji: "💦",
    context: "Hubo lluvia ayer en Santiago (Santiago no está preparado).",
    text: "UNA CAMIONETA PASA RAJADA POR UN CHARCO AL LADO TUYO.",
    choices: [
      { text: "ESQUIVAR CON SPIN", effect: "Esquiva perfecta, pareces ninja.", stats: { chileno: 25 } },
      { text: "RECIBIR EL TSUNAMI", effect: "Quedas oliendo a alcantarilla.", stats: { cordura: -30, temperatura: -5 } }
    ]
  },
  {
    id: "m15_super_8",
    minCordura: 0,
    emoji: "🍫",
    context: "El semáforo se pone en rojo.",
    text: "UN TÍO SUBE A VENDER SUPER 8 A MODICOPRECIO.",
    choices: [
      { text: "COMPRAR LA PROMO", effect: "Desayuno de campeones.", stats: { plata: -1, hambre: -15 } },
      { text: "EVITAR CONTACTO VISUAL", effect: "Miras fijamente el piso de la micro.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "m16_tarjeta_bloqueada",
    minCordura: 30,
    emoji: "🏧",
    context: "Vas a sacar plata para el día.",
    text: "EL CAJERO AUTOMÁTICO SE QUEDA CON TU TARJETA.",
    choices: [
      { text: "PEGARLE UNA PATADA", effect: "Te duele el pie. El cajero gana.", stats: { cordura: -20 } },
      { text: "LLAMAR AL BANCO", effect: "Te atiende un robot por 30 min.", stats: { cordura: -25 } }
    ]
  },
  {
    id: "m17_conserje_copuchento",
    minCordura: 0,
    emoji: "🏢",
    context: "Llegas al edificio corporativo.",
    text: "EL CONSERJE TE DETIENE PARA CONTARTE UN CHISME.",
    choices: [
      { text: "ESCUCHAR EL CORDÓN", effect: "Te enteras de cosas prohibidas.", stats: { cordura: 10 }, nextEvent: "m18_conserje_secreto" },
      { text: "DECIR QUE VAS TARDE", effect: "Te ganaste un enemigo poderoso.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "m18_conserje_secreto",
    isChain: true,
    emoji: "🤫",
    context: "El conserje susurra: 'El del 402 no es su marido'.",
    text: "LA INFORMACIÓN ES DEMASIADO PODEROSA.",
    choices: [
      { text: "USARLA PARA EL BIEN", effect: "Te sientes el dueño del edificio.", stats: { cordura: 15 } },
      { text: "QUEDAR PARANOICO", effect: "¿Qué sabrá el conserje de mí?", stats: { cordura: -15 } }
    ]
  },
  {
    id: "m19_desayuno_oficina",
    minCordura: 0,
    emoji: "☕",
    context: "Hay café institucional gratis en la cocina.",
    text: "EL CAFÉ TIENE SABOR A TIERRA CON AGUA.",
    choices: [
      { text: "TOMARSE TRES TAZAS", effect: "Taquicardia corporativa activa.", stats: { cordura: -10, temperatura: 5 } },
      { text: "IR AL STARBUCKS", effect: "Adiós al presupuesto del mes.", stats: { plata: -6, cordura: 15 } }
    ]
  },
  {
    id: "m20_pan_con_palta",
    minCordura: 40,
    emoji: "🥑",
    context: "Tu compañero trajo marraqueta con palta molida de su casa.",
    text: "TE OFRECE LA MITAD.",
    choices: [
      { text: "ACEPTAR FELIZ", effect: "Esto es verdadera amistad.", stats: { hambre: -25, cordura: 25 } },
      { text: "RECHAZAR POR VERGÜENZA", effect: "Te arrepentirás todo el día.", stats: { cordura: -15, hambre: 5 } }
    ]
  },
  {
    id: "m21_cursed_pudu",
    minCordura: 0,
    maxCordura: 39,
    emoji: "🦌",
    context: "El estrés de la mañana te fracturó la mente.",
    text: "UN PUDÚ GIGANTE TE PIDE LA TARJETA BIP EN EL TORNIQUETE.",
    choices: [
      { text: "ENTREGÁRSELA", effect: "El Pudú susurra: 'Venceremos'.", stats: { cordura: -20, chileno: 50 } },
      { text: "GOLPEARTE LA CARA", effect: "Era un basurero municipal.", stats: { cordura: 15 } }
    ]
  },
  {
    id: "m22_cursed_micro_fantasma",
    minCordura: 0,
    maxCordura: 35,
    emoji: "👻",
    context: "Te subes a una micro completamente vacía a las 8 AM.",
    text: "EL CHOFER ES UN ESQUELETO CON GORRA DEL COLO.",
    choices: [
      { text: "PAGAR EL PASAJE", effect: "El esqueleto te da las gracias.", stats: { chileno: 30, cordura: -10 } },
      { text: "SALTAR POR LA VENTANA", effect: "Caes en un arbusto de la Alameda.", stats: { cordura: -25 } }
    ]
  },
  {
    id: "m23_cursed_alarma",
    minCordura: 0,
    maxCordura: 30,
    emoji: "🚨",
    context: "Caminas hacia tu oficina.",
    text: "EL SONIDO DE TU ALARMA EMPIEZA A SONAR DENTRO DE TU CABEZA.",
    choices: [
      { text: "GRITAR PARA APAGARLA", effect: "La gente se aleja de ti.", stats: { cordura: -30 } },
      { text: "ACEPTAR EL RITMO", effect: "Empiezas a bailar techno-alarma.", stats: { chileno: 20, cordura: -5 } }
    ]
  },
  {
    id: "m24_cursed_Tio_Aceite",
    minCordura: 0,
    maxCordura: 39,
    emoji: "🧙‍♂️",
    context: "Ves un puesto de sopaipillas en la niebla.",
    text: "EL REY DEL ACEITE TE OFRECE LA SOPAIPILLA ANCESTRAL.",
    choices: [
      { text: "COMERLA DE UN BOCADO", effect: "Tu estómago es ahora de acero.", stats: { hambre: -50, chileno: 50, cordura: -15 } },
      { text: "CORRER POR TU VIDA", effect: "Sientes su mirada frita en tu espalda.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "m25_cursed_Alameda_Infinita",
    minCordura: 0,
    maxCordura: 25,
    emoji: "🛣️",
    context: "Miras hacia adelante en la calle.",
    text: "LA ALAMEDA NO TIENE FIN, ES UN LOOP ESPACIAL.",
    choices: [
      { text: "SEGUIR CAMINANDO", effect: "Llevas 3 años caminando hacia el Este.", stats: { cordura: -40, hambre: 20 } },
      { text: "ENTRAR AL METRO SUBTERRÁNEO", effect: "Bajas al inframundo de Santiago.", stats: { cordura: -10 } }
    ]
  }
];
