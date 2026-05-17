const nightEvents = [
  {
    id: "n71_metro_tobalaba",
    minCordura: 0,
    emoji: "🚉",
    context: "Estación Baquedano / Tobalaba. Hora punta extrema.",
    text: "EL METRO VIENE TAN LLENO QUE LA GENTE VA PEGADA AL VIDRIO.",
    choices: [
      { text: "METERSE A LA FUERZA", effect: "Te fusionas con tres desconocidos.", stats: { chileno: 25, cordura: -20 }, nextEvent: "n72_olor_metro" },
      { text: "ESPERAR OTRA LÍNEA", effect: "Pasan 5 metros llenos. Llegas mañana.", stats: { cordura: -15, hambre: 15 } }
    ]
  },
  {
    id: "n72_olor_metro",
    isChain: true,
    emoji: "🤢",
    context: "Estás atrapado debajo del brazo de un tipo de dos metros.",
    text: "HUELE A AXE CHOCOLATE VENCIDO Y SUDOR CORPORATIVO.",
    choices: [
      { text: "DEJAR DE RESPIRAR", effect: "Aguantas hasta Estación Central.", stats: { cordura: -10, temperatura: 5 } },
      { text: "CONVERSARLE", effect: "'Oiga pariente, ¿está mala la calor?'", stats: { chileno: 30, cordura: 5 } }
    ]
  },
  {
    id: "n73_once_comida",
    minCordura: 0,
    emoji: "☕",
    context: "Llegaste vivo a tu casa.",
    text: "LLEGÓ LA HORA DE LA ONCE. ¿QUÉ SE TOMA HOY?",
    choices: [
      { text: "TÉ CON MARRAQUETA", effect: "La cura para el alma chilena.", stats: { hambre: -30, cordura: 25 } },
      { text: "FIDEOS CON SALCHICHA", effect: "Comida de soltero bajonero.", stats: { hambre: -35, cordura: 10 } }
    ]
  },
  {
    id: "n74_vecino_taladro",
    minCordura: 0,
    emoji: "🔨",
    context: "Son las 11:30 PM. Te vas a dormir.",
    text: "EL VECINO EMPIEZA A TALADRAR LA PARED SIN RAZÓN.",
    choices: [
      { text: "IR A TOCARLE LA PUERTA", effect: "Pelea vecinal en pijama.", stats: { chileno: 20, cordura: -15 } },
      { text: "TAPARSE CON LA ALMOHADA", effect: "El ruido vibra en tus dientes.", stats: { cordura: -20 } }
    ]
  },
  {
    id: "n75_gato_techo",
    minCordura: 0,
    emoji: "🐈",
    context: "Se escucha un ruido horrible arriba de tu pieza.",
    text: "DOS GATOS SE ESTÁN AGARRANDO A COMBOS EN EL ZINC.",
    choices: [
      { text: "GRITAR '¡SAPE COCHINO!'", effect: "Se callan por un minuto.", stats: { chileno: 25 } },
      { text: "IGNORAR LA PELEA", effect: "Sueñas con felinos ninjas.", stats: { cordura: -5 } }
    ]
  },
  {
    id: "n76_doomscrolling",
    minCordura: 30,
    emoji: "📱",
    context: "Estás acostado a oscuras con el celular.",
    text: "LLEVAS 2 HORAS EN TIKTOK VIENDO VIDEOS SHITPOST.",
    choices: [
      { text: "VER UN VIDEO MÁS", effect: "Son las 3 AM. Cagaste.", stats: { cordura: -20, hambre: 5 } },
      { text: "CERRAR EL CELULAR", effect: "Te quedas mirando el techo pensando en tus deudas.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "n77_alarma_olvidada",
    minCordura: 0,
    emoji: "⏰",
    context: "Casi te quedas dormido.",
    text: "¿PUSISTE LA ALARMA PARA MAÑANA?",
    choices: [
      { text: "REVISAR CON PARANOIA", effect: "Estaba puesta a las 6:00 AM. Alivio.", stats: { cordura: 15 } },
      { text: "DEJARLO AL DESTINO", effect: "Te despiertas a las 9:15 AM en pánico.", stats: { cordura: -30 }, nextEvent: "n78_tarde_pega" }
    ]
  },
  {
    id: "n78_tarde_pega",
    isChain: true,
    emoji: "💀",
    context: "Despertaste tardísimo en tu mente.",
    text: "EL JEFE TE DEJÓ UN MENSAJE EN WHATSAPP.",
    choices: [
      { text: "DECIR QUE MURIÓ TU ABUELA", effect: "Mentira corporativa clásica (ya va por la cuarta abuela).", stats: { chileno: 35, cordura: -15 } },
      { text: "DECIR LA VERDAD", effect: "El jefe te manda al psicólogo laboral.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "n79_temblor_fuerte",
    minCordura: 0,
    emoji: "🫨",
    context: "Son las 2:00 AM.",
    text: "EMPIEZA UN RUIDO SUBTERRÁNEO BRUTAL. ES UN 6.5.",
    choices: [
      { text: "SEGUIR DURMIENDO", effect: "Si cae la casa, que me caiga durmiendo.", stats: { chileno: 40, cordura: 20 } },
      { text: "SALIR EN BOXERS", effect: "Conversas con los vecinos en pelota.", stats: { chileno: 20, cordura: -10 } }
    ]
  },
  {
    id: "n80_pan_con_chancho",
    minCordura: 0,
    emoji: "🥪",
    context: "Te dio el bajón de la medianoche.",
    text: "ABRES EL REFRIGERADOR Y SOLO HAY ARROLLADO DE HUASO.",
    choices: [
      { text: "SÁNDWICH MONSTRUOSO", effect: "Grasa pura directo al corazón.", stats: { hambre: -40, cordura: 15, temperatura: 5 } },
      { text: "AGUA DE LA LLAVE", effect: "Cenas agua sabor cloro de Santiago.", stats: { hambre: 10 } }
    ]
  },
  {
    id: "n81_lluvia_techo",
    minCordura: 40,
    emoji: "🌧️",
    context: "Empieza a llover fuerte afuera.",
    text: "SE ESCUCHA UNA GOTA ADENTRO. HAY UNA GOTERA.",
    choices: [
      { text: "PONER OLLA DE PRESIÓN", effect: "Ritmo musical para dormir: *Plop* *Plop*.", stats: { chileno: 25, cordura: 10 } },
      { text: "REPARAR EN LINTERNA", effect: "Te resbalas del techo y casi mueres.", stats: { cordura: -25 } }
    ]
  },
  {
    id: "n82_perro_ladra_nada",
    minCordura: 0,
    emoji: "🐕",
    context: "Tu perro mira fijamente una esquina oscura de la pieza.",
    text: "EMPIEZA A GRUÑIRLE A LA NADA.",
    choices: [
      { text: "DECIR 'YA QUÉ WEA HAY AHÍ'", effect: "Miedo sutil nocturno.", stats: { cordura: -15 } },
      { text: "TAPARSE HASTA LA CABEZA", effect: "La cobija protectora anti-fantasmas funciona.", stats: { cordura: 15 } }
    ]
  },
  {
    id: "n83_botilleria_turno",
    minCordura: 0,
    emoji: "🍾",
    context: "Es viernes por la noche (por fin).",
    text: "LA BOTILLERÍA TIENE REJA PROTECTORA DE DOS METROS.",
    choices: [
      { text: "COMPRAR UNA ESCUDO", effect: "El elixir del pueblo de litro.", stats: { plata: -2, cordura: 25, chileno: 20 } },
      { text: "COMPRAR MANÍ SALADO", effect: "Te da sed americana.", stats: { plata: -1, hambre: -5 } }
    ]
  },
  {
    id: "n84_carro_completos_noche",
    minCordura: 0,
    emoji: "🌭",
    context: "Sales de un mambo cansado.",
    text: "UN CARRO TIENE LA PROMO: 2 AS DE ASCO POR 2 LUCAS.",
    choices: [
      { text: "BAJONEAR CON FURIA", effect: "Tu cuerpo te lo agradecerá (hoy).", stats: { hambre: -45, plata: -2, cordura: 20 } },
      { text: "SOPORTAR EL HAMBRE", effect: "Luegos a la casa a masticar hielo.", stats: { hambre: 20, cordura: -10 } }
    ]
  },
  {
    id: "n85_uber_caro",
    minCordura: 0,
    emoji: "🚗",
    context: "No pasan micros y el metro cerró.",
    text: "EL UBER TIENE TARIFA DINÁMICA DE 15 LUCAS POR 4 CUADRAS.",
    choices: [
      { text: "PAGAR EN LÁGRIMAS", effect: "Tu billetera sangra.", stats: { plata: -15, cordura: -5 } },
      { text: "CAMINAR EN SIGILO", effect: "Corres como Naruto por las esquinas.", stats: { chileno: 35, cordura: -20 } }
    ]
  },
  {
    id: "n86_cursed_fantasma_pega",
    minCordura: 0,
    maxCordura: 39,
    emoji: "👻",
    context: "Te despiertas a las 3:33 AM.",
    text: "EL FANTASMA DE TU JEFE ESTÁ AL PIE DE LA CAMA PIDIENDO EL EXCEL.",
    choices: [
      { text: "PASARLE HOJA EN BLANCO", effect: "El espectro se disipa conforme.", stats: { cordura: -20, chileno: 30 } },
      { text: "GRITARLE UN CHILENISMO", effect: "El insulto espanta la esquizofrenia.", stats: { chileno: 45, cordura: 10 } }
    ]
  },
  {
    id: "n87_cursed_chocman_gigante",
    minCordura: 0,
    maxCordura: 30,
    emoji: "🍫",
    context: "Tienes parálisis del sueño.",
    text: "UN CHOCMAN GIGANTE SE SIENTA EN TU PECHO Y CANTA EL HIMNO.",
    choices: [
      { text: "SÉPTIMO REFUERZO", effect: "Te liberas del trance con chilenidad.", stats: { chileno: 50, cordura: -10 } },
      { text: "SOPORTAR EL BIZCOCHO", effect: "Despiertas sudando.", stats: { cordura: -30 } }
    ]
  },
  {
    id: "n88_cursed_metro_eterno",
    minCordura: 0,
    maxCordura: 25,
    emoji: "🚇",
    context: "Te quedaste dormido en el metro y no hay nadie.",
    text: "LA ESTACIÓN SE LLAMA 'JUICIO FINAL — LÍNEA 666'.",
    choices: [
      { text: "QUEDARSE EN EL TREN", effect: "Viajas al centro de la tierra.", stats: { cordura: -45 } },
      { text: "SUBIR POR ESCALERAS", effect: "Te despiertas en tu cama asustado.", stats: { cordura: 10 } }
    ]
  },
  {
    id: "n89_cursed_tele_estatica",
    minCordura: 0,
    maxCordura: 35,
    emoji: "📺",
    context: "Prendes la tele vieja.",
    text: "SOLO HAY ESTÁTICA, PERO SE ESCUCHA LA VOZ DEL MISTER CHIP.",
    choices: [
      { text: "ESCUCHAR LOS DATOS", effect: "Te da los números del Loto (están errados).", stats: { cordura: -20, plata: -2 } },
      { text: "DESENCHUFAR LA WEA", effect: "Silencio absoluto.", stats: { cordura: 15 } }
    ]
  },
  {
    id: "n90_cursed_quiltro_habla",
    minCordura: 0,
    maxCordura: 20,
    emoji: "🐕",
    context: "Tu perro te mira desde el suelo.",
    text: "CON VOZ DE HOMBRE ADULTO DICE: 'Mañana va a llover, guarda la ropa'.",
    choices: [
      { text: "DECIR 'GRACIAS COMPADRE'", effect: "Naturalidad criolla ante la locura.", stats: { chileno: 40, cordura: -15 } },
      { text: "CORRER AL PATIO", effect: "Te quedas afuera con frío.", stats: { cordura: -30, temperatura: -10 } }
    ]
  },
  {
    id: "n91_cuenta_rut_habla",
    minCordura: 0,
    maxCordura: 30,
    emoji: "🗣️",
    context: "Abres la App del banco de noche.",
    text: "EL LOGO DEL PATO BANCO ESTADO SE EMPIEZA A REÍR DE TI.",
    choices: [
      { text: "DESINSTALAR LA APP", effect: "Ojos que no ven, cuenta que no duele.", stats: { cordura: 20 } },
      { text: "INSULTAR AL PATO", effect: "El pato te quita 10 pesos por wn.", stats: { plata: -1, cordura: -20 } }
    ]
  },
  {
    id: "n92_temblor_cielo",
    minCordura: 0,
    maxCordura: 25,
    emoji: "🌌",
    context: "Miras por la ventana al cielo nocturno.",
    text: "EL CIELO TIENE UNA GRIETA QUE DICE: 'ERROR 404 CHILE NOT FOUND'.",
    choices: [
      { text: "APAGAR LUZ Y DORMIR", effect: "Problema del administrador, no mío.", stats: { cordura: 15, chileno: 30 } },
      { text: "GRITARLE AL CIELO", effect: "Te cae un rayo de lag de internet.", stats: { cordura: -40, temperatura: 10 } }
    ]
  },
  {
    id: "n93_sopaipilla_voladora",
    minCordura: 0,
    maxCordura: 35,
    emoji: "🛸",
    context: "Sientes un zumbido en la cocina.",
    text: "UNA SOPAIPILLA CON MOSTAZA VUELA EN CÍRCULOS COMO UN OVNI.",
    choices: [
      { text: "CAZARLA CON TENEDOR", effect: "Bajón galáctico.", stats: { hambre: -20, cordura: -15 } },
      { text: "QUE ABDUZCA AL GATO", effect: "El gato vuelve hablando inglés.", stats: { cordura: -25 } }
    ]
  },
  {
    id: "n94_fono_fantasma",
    minCordura: 0,
    maxCordura: 20,
    emoji: "📞",
    context: "Suena el teléfono fijo de la casa desconectado hace años.",
    text: "UNA VOZ TE DICE: 'Le quedan 5 minutos de saldo en la vida'.",
    choices: [
      { text: "RECARGA EN NEGOCIO", effect: "Mente rota de block corporativo.", stats: { cordura: -30 } },
      { text: "MANDARLOS A LA...", effect: "Espíritu inquebrantable.", stats: { chileno: 50 } }
    ]
  },
  {
    id: "n95_gato_humano",
    minCordura: 0,
    maxCordura: 15,
    emoji: "🐱",
    context: "El gato se para en dos patas al lado de tu cama.",
    text: "TE PIDE LAS LLAVES DEL AUTO PORQUE TIENE UNA REUNIÓN.",
    choices: [
      { text: "PASÁRSELAS", effect: "El gato maneja mejor que la mayoría en el centro.", stats: { cordura: -40, plata: -5 } },
      { text: "DECIRLE NO TIENE LICENCIA", effect: "El gato se lame una pata ofendido.", stats: { cordura: 10 } }
    ]
  },
  {
    id: "n96_alameda_agua",
    minCordura: 0,
    maxCordura: 30,
    emoji: "🌊",
    context: "Miras la calle de noche.",
    text: "LA CALLE AHORA ES UN RÍO DE BEBIDA PAP.",
    choices: [
      { text: "NADAR EN PAP", effect: "Quedas pegoteado pero dulce.", stats: { cordura: -20, temperatura: -5 } },
      { text: "TOMAR UN SORBO", effect: "Sabor original de los 90.", stats: { hambre: -10, cordura: 15 } }
    ]
  },
  {
    id: "n97_tostador_habla",
    minCordura: 0,
    maxCordura: 25,
    emoji: "🍞",
    context: "Pones el pan hallulla al tostador de malla.",
    text: "EL TOSTADOR TE DICE: 'Cuidado que te quemo el pan, wn'.",
    choices: [
      { text: "DARLE LAS GRACIAS", effect: "Pan perfectamente tostado.", stats: { cordura: -10, hambre: -15 } },
      { text: "ASUSTARSE Y TIRARLO", effect: "Quemas la cortina de la cocina.", stats: { cordura: -30, temperatura: 20 } }
    ]
  },
  {
    id: "n98_vecino_extraterrestre",
    minCordura: 0,
    maxCordura: 20,
    emoji: "👽",
    context: "El vecino ruidoso sale al pasillo.",
    text: "TIENE TRES OJOS, ES VERDE, PERO LLEVA LA CAMISETA DE LA U.",
    choices: [
      { text: "INVITARLO A ASADO", effect: "Trae carne de marte. Un 7 el marciano.", stats: { chileno: 50, cordura: -10 } },
      { text: "LLAMAR A MEN IN BLACK", effect: "No tienen jurisdicción en Puente Alto.", stats: { cordura: -15 } }
    ]
  },
  {
    id: "n99_espejo_retraso",
    minCordura: 0,
    maxCordura: 15,
    emoji: "🪞",
    context: "Te estás lavando los dientes.",
    text: "TU REFLEJO EN EL ESPEJO LLEVA 5 SEGUNDOS DE RETRASO (TIENE LAG).",
    choices: [
      { text: "HACER UN REEL", effect: "Te vuelves viral en el sub-mundo.", stats: { chileno: 30, cordura: -20 } },
      { text: "ROMPER EL ESPEJO", effect: "7 años de mala suerte y deudas.", stats: { cordura: -35, plata: -3 } }
    ]
  },
  {
    id: "n100_vendedor_alfajor_fantasma",
    minCordura: 0,
    maxCordura: 30,
    emoji: "🥯",
    context: "Estás solo en tu pieza cerrada.",
    text: "UN TÍO ATRAVIESA LA PARED: '¡LLEVE EL ALFAJOR CON MANJAR ARTESANAL!'.",
    choices: [
      { text: "COMPRARLE DOS", effect: "Están criminales de buenos.", stats: { plata: -2, hambre: -25 } },
      { text: "PEDIRLE QUE SE VAYA", effect: "Se va flotando triste.", stats: { cordura: -10 } }
    ]
  },
  {
    id: "n101_indio_picaro_gigante",
    minCordura: 0,
    maxCordura: 10,
    emoji: "🗿",
    context: "Es el fin de tu cordura. El colapso mental es absoluto.",
    text: "UN INDIO PÍCARO DE 50 METROS DE ALTURA DESTRUYE EL COSTANERA CENTER.",
    choices: [
      { text: "LEVANTARLE LA FALDA", effect: "El universo explota con un sonido saturado.", stats: { chileno: 100, cordura: -100 } },
      { text: "APLAUDIR EL FIN", effect: "Sobreviviste al brainrot final.", stats: { cordura: 20 } }
    ]
  },
  {
    id: "n102_despertar_lunes",
    minCordura: 0,
    maxCordura: 100,
    emoji: "🛌",
    context: "Terminaste la semana de terror.",
    text: "EL JUEGO SE VA A REINICIAR. ¿LISTO PARA EL SIFÓN LABORAL?",
    choices: [
      { text: "SÍ, CONCHETUMARE", effect: "El bucle infinito te atrapa.", stats: { cordura: 50 } }
    ]
  }
];
