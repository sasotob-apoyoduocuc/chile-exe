// ── EVENTOS FIJOS DE INICIO DE DÍA ────────────────────────────
const dayStartEvents = {
  0: { // LUNES — atrasado
    emoji: "😵", background: "paradero",
    context: "Son las 7:58 AM. El bus sale a las 8:00.",
    text: "PRIMER DÍA. LLEGAS TARDE DE UNA.",
    choices: [
      { text: "SALIR CORRIENDO SIN DESAYUNAR", effect: "¡MODO BERSERKER ACTIVADO!", stats: { hambre: 15, cordura: -5, temperatura: 8 } },
      { text: "DESAYUNAR Y ASUMIR EL ATRASO",  effect: "Igual vas a llegar tarde po.",            stats: { hambre: -20, cordura: -10 } },
      { text: "INVENTAR QUE HAY TACO",          effect: "Funciona el 40% del tiempo.",             stats: { chileno: 20, cordura: -5 } }
    ]
  },
  1: { // MARTES — atrasado
    emoji: "💀", background: "pieza",
    context: "Dormiste 4 horas. El cuerpo rechaza la realidad.",
    text: "MARTES. EL DÍA MÁS LARGO DE LA SEMANA.",
    choices: [
      { text: "DUCHA DE 30 SEGUNDOS",               effect: "¿Quedé limpio? No lo sé.",          stats: { cordura: 5, temperatura: -5 } },
      { text: "SOLO DESODORANTE Y CORRER",           effect: "+15 Chilenidad. -15 Dignidad.",     stats: { chileno: 15, hambre: 10 } },
      { text: "HACER COMO QUE TRABAJO DESDE CASA",  effect: "La VPN no responde.",               stats: { cordura: -20 } }
    ]
  },
  2: { // MIÉRCOLES — con tiempo
    emoji: "😌", background: "pieza",
    context: "Miércoles. Hay tiempo. Esto no va a durar.",
    text: "PUEDES DESAYUNAR. ¿QUÉ COMES?",
    choices: [
      { text: "MARRAQUETA CON PALTA",         effect: "Empezaste bien. Disfrutalo.",           stats: { hambre: -30, cordura: 15 } },
      { text: "NESCAFÉ Y UN SUPER 8",         effect: "El desayuno del campeón nacional.",     stats: { hambre: -10, cordura: 5, plata: -1 } },
      { text: "NADA, SE ME ACABA EL TIEMPO",  effect: "Chilenidad: activada.",                 stats: { hambre: 20, chileno: 10 } }
    ]
  },
  3: { // JUEVES — con tiempo
    emoji: "🫠", background: "pieza",
    context: "Jueves. Ya casi. El cuerpo lo sabe.",
    text: "¿TE DUCHAS O LLEGAS PUNTUAL?",
    choices: [
      { text: "DUCHA COMPLETA (LLEGO TARDE)",   effect: "Sacrificio por higiene.",              stats: { cordura: 10, temperatura: -5, hambre: 5 } },
      { text: "DUCHA RÁPIDA Y CORRER",          effect: "Dejaste el shampoo puesto.",           stats: { cordura: 5, temperatura: -3 } },
      { text: "SALGO EN PIJAMA DEBAJO",         effect: "Nadie lo sabrá jamás.",                stats: { chileno: 20, cordura: -5 } }
    ]
  },
  4: { // VIERNES — atrasado
    emoji: "🔥", background: "paradero",
    context: "Viernes. La luz al final del túnel.",
    text: "PERO IGUAL LLEGAS TARDE. ES CHILE.",
    choices: [
      { text: "CORRER AL METRO CON TODO",            effect: "¡ES VIERNES CONCHETUMARE!",        stats: { chileno: 25, cordura: -5, temperatura: 10 } },
      { text: "CAMINAR TRANQUILO TOTAL",             effect: "Nadie trabaja en viernes igual.",   stats: { cordura: 15, hambre: 5 } },
      { text: "MANDAR AUDIO DE 4 MIN AL JEFE",       effect: "El jefe no lo escucha hasta lunes.",stats: { chileno: 30, cordura: 5 } }
    ]
  }
};

// ── CHILENIDAD ESPECIAL ────────────────────────────────────────
const CHILENIDAD_MAX_NORMAL   = 100;
const CHILENIDAD_MAX_ESPECIAL = 112;

const eventosEspecialesChilenidad = [
  "m8_audifonos_fallan",
  "md27_reunion_eterna",
  "md33_temblor_oficina",
  "n79_temblor_fuerte",
  "t53_doctor_simi",
  "n86_cursed_fantasma_pega",
  "n94_fono_fantasma",
  "n98_vecino_extraterrestre",
  "m4_paradero_pelea",
  "md30_completo_italiano"
];

// ── MAPEO PLAYER POR EVENTO ────────────────────────────────────
const playerStateMap = {"m1_micro_no_paro": "enojado", "m2_micro_la_alcanzaste": "corriendo", "m3_micro_bip_rechazada": "enojado", "m4_paradero_pelea": "enojado", "m5_bip_no_carga": "derrotado", "m6_vendedor_carro": "normal", "m8_audifonos_fallan": "enojado", "m9_trio_andino": "derrotado", "m10_chaleco_amarillo": "enojado", "m13_asiento_reservado": "enojado", "m14_charco_agua": "derrotado", "m15_super_8": "normal", "m17_conserje_copuchento": "normal", "m18_conserje_secreto": "normal", "m19_desayuno_oficina": "normal", "m21_cursed_pudu": "esquizo", "m22_cursed_micro_fantasma": "esquizo", "m23_cursed_alarma": "esquizo", "m24_cursed_Tio_Aceite": "esquizo", "m25_cursed_Alameda_Infinita": "esquizo", "md26_reunion_sorpresa": "derrotado", "md27_reunion_eterna": "derrotado", "md28_casino_comida": "normal", "md29_colon_guerra": "enojado", "md30_completo_italiano": "normal", "md31_vendedor_carcasa": "normal", "md32_el_mimo": "enojado", "md33_temblor_oficina": "esquizo", "md34_aire_acondicionado": "normal", "md35_alcancia_bomberos": "derrotado", "md36_licencia_rechazada": "enojado", "md37_colacion_robada": "enojado", "md39_chilenismo_jefe": "enojado", "md41_pastor_soto": "esquizo", "md42_feria_libre": "normal", "md43_torta_tres_leches": "normal", "md46_cursed_jefe_reptil": "esquizo", "md47_cursed_completo_flotante": "esquizo", "md48_cursed_baño_infinito": "esquizo", "md49_cursed_fotocopiadora": "esquizo", "md50_cursed_clima_polar": "esquizo", "t53_doctor_simi": "enojado", "t54_vendedor_ensalada": "normal", "t60_paradero_infierno": "puerco", "t61_comercio_ambulante": "normal", "t62_noticia_impacto": "derrotado", "t63_cuaderno_colon": "derrotado", "t64_marraqueta_fresca": "normal", "t66_cursed_sol_francisco": "esquizo", "t67_cursed_estatua_viva": "esquizo", "t68_cursed_palomas_mafia": "esquizo", "t69_cursed_pandereta": "esquizo", "t70_cursed_tocomple_vengador": "esquizo", "n71_metro_tobalaba": "derrotado", "n72_olor_metro": "puerco", "n73_once_comida": "normal", "n74_vecino_taladro": "enojado", "n75_gato_techo": "normal", "n76_doomscrolling": "zombi", "n77_alarma_olvidada": "derrotado", "n79_temblor_fuerte": "esquizo", "n80_pan_con_chancho": "normal", "n81_lluvia_techo": "derrotado", "n82_perro_ladra_nada": "normal", "n83_botilleria_turno": "normal", "n84_carro_completos_noche": "normal", "n85_uber_caro": "enojado", "n86_cursed_fantasma_pega": "esquizo", "n87_cursed_chocman_gigante": "esquizo", "n88_cursed_metro_eterno": "esquizo", "n89_cursed_tele_estatica": "esquizo", "n90_cursed_quiltro_habla": "esquizo", "n91_cuenta_rut_habla": "esquizo", "n92_temblor_cielo": "esquizo", "n93_sopaipilla_voladora": "esquizo", "n94_fono_fantasma": "esquizo", "n95_gato_humano": "esquizo", "n96_alameda_agua": "esquizo", "n97_tostador_habla": "esquizo", "n98_vecino_extraterrestre": "esquizo", "n99_espejo_retraso": "esquizo", "n100_vendedor_alfajor_fantasma": "esquizo", "n101_indio_picaro_gigante": "esquizo", "day_start_0": "corriendo", "day_start_1": "zombi", "day_start_2": "normal", "day_start_3": "normal", "day_start_4": "corriendo"};

function updatePlayer(eventId) {
  const playerEl = document.getElementById('player');
  if (!playerEl) return;
  
  const state = playerStateMap[eventId] || 'normal';
  
  // Si cordura baja de 30, forzar esquizo
  const finalState = stats.cordura <= 30 ? 'esquizo' : 
                     stats.cordura <= 60 && state === 'normal' ? 'derrotado' : 
                     state;

  playerEl.src = 'assets/player-' + finalState + '.png';
  playerEl.className = 'state-' + finalState;
}


// ── SISTEMA DE PLATA ───────────────────────────────────────────
let efectivo      = 15000;
let deudaTarjeta  = 0;
let usandoTarjeta = false;

function formatPlata(n) {
  return "$" + Math.abs(n).toLocaleString("es-CL");
}

function gastarPlata(monto) {
  const montoReal = monto * 1000;
  if (efectivo >= montoReal) {
    efectivo -= montoReal;
    if (efectivo === 0) usandoTarjeta = true;
  } else {
    const resto = montoReal - efectivo;
    efectivo = 0;
    deudaTarjeta += Math.round(resto * 1.3); // 30% interés
    usandoTarjeta = true;
  }
}

function ganarPlata(monto) {
  const montoReal = monto * 1000;
  if (deudaTarjeta > 0) {
    if (montoReal >= deudaTarjeta) {
      efectivo += (montoReal - deudaTarjeta);
      deudaTarjeta = 0;
      usandoTarjeta = false;
    } else {
      deudaTarjeta -= montoReal;
    }
  } else {
    efectivo += montoReal;
  }
}

// ── DATOS ─────────────────────────────────────────────────────
const eventsData = {
  morning:   morningEvents,
  midday:    middayEvents,
  afternoon: afternoonEvents,
  night:     nightEvents
};

const days   = ["LUNES","MARTES","MIÉRCOLES","JUEVES","VIERNES"];
const phases = [
  { id:"morning",   name:"MAÑANA"   },
  { id:"midday",    name:"MEDIODÍA"  },
  { id:"afternoon", name:"TARDE"     },
  { id:"night",     name:"NOCHE"     }
];

const bgClasses = ["bg-paradero","bg-metro","bg-oficina","bg-calle","bg-casino","bg-pieza","bg-noche","bg-cursed-scene","bg-default"];

const eventBgMap = {
  m1_micro_no_paro:"paradero", m2_micro_la_alcanzaste:"paradero",
  m3_micro_bip_rechazada:"paradero", m4_paradero_pelea:"paradero",
  m9_trio_andino:"paradero", m13_asiento_reservado:"paradero",
  m15_super_8:"paradero", t60_paradero_infierno:"paradero", m14_charco_agua:"paradero",
  m5_bip_no_carga:"metro", m8_audifonos_fallan:"metro",
  n71_metro_tobalaba:"metro", n72_olor_metro:"metro",
  m17_conserje_copuchento:"oficina", m18_conserje_secreto:"oficina",
  m19_desayuno_oficina:"oficina", md26_reunion_sorpresa:"oficina",
  md27_reunion_eterna:"oficina", md33_temblor_oficina:"oficina",
  md34_aire_acondicionado:"oficina", md36_licencia_rechazada:"oficina",
  md37_colacion_robada:"oficina", md39_chilenismo_jefe:"oficina",
  m6_vendedor_carro:"calle", m10_chaleco_amarillo:"calle",
  md31_vendedor_carcasa:"calle", md32_el_mimo:"calle",
  md35_alcancia_bomberos:"calle", md41_pastor_soto:"calle",
  md42_feria_libre:"calle", t53_doctor_simi:"calle",
  t54_vendedor_ensalada:"calle", t61_comercio_ambulante:"calle",
  t63_cuaderno_colon:"calle", t64_marraqueta_fresca:"calle", t62_noticia_impacto:"calle",
  md28_casino_comida:"casino", md29_colon_guerra:"casino",
  md30_completo_italiano:"casino", md43_torta_tres_leches:"casino",
  n73_once_comida:"pieza", n74_vecino_taladro:"pieza",
  n75_gato_techo:"pieza", n76_doomscrolling:"pieza",
  n77_alarma_olvidada:"pieza", n80_pan_con_chancho:"pieza",
  n81_lluvia_techo:"pieza", n82_perro_ladra_nada:"pieza",
  n83_botilleria_turno:"noche", n84_carro_completos_noche:"noche",
  n85_uber_caro:"noche",
  m21_cursed_pudu:"cursed", m22_cursed_micro_fantasma:"cursed",
  m23_cursed_alarma:"cursed", m24_cursed_Tio_Aceite:"cursed",
  m25_cursed_Alameda_Infinita:"cursed", md46_cursed_jefe_reptil:"cursed",
  md47_cursed_completo_flotante:"cursed", md48_cursed_baño_infinito:"cursed",
  md49_cursed_fotocopiadora:"cursed", md50_cursed_clima_polar:"cursed",
  t66_cursed_sol_francisco:"cursed", t67_cursed_estatua_viva:"cursed",
  t68_cursed_palomas_mafia:"cursed", t69_cursed_pandereta:"cursed",
  t70_cursed_tocomple_vengador:"cursed", n86_cursed_fantasma_pega:"cursed",
  n87_cursed_chocman_gigante:"cursed", n88_cursed_metro_eterno:"cursed",
  n89_cursed_tele_estatica:"cursed", n90_cursed_quiltro_habla:"cursed",
  n91_cuenta_rut_habla:"cursed", n92_temblor_cielo:"cursed",
  n93_sopaipilla_voladora:"cursed", n94_fono_fantasma:"cursed",
  n95_gato_humano:"cursed", n96_alameda_agua:"cursed",
  n97_tostador_habla:"cursed", n98_vecino_extraterrestre:"cursed",
  n99_espejo_retraso:"cursed", n100_vendedor_alfajor_fantasma:"cursed",
  n101_indio_picaro_gigante:"cursed"
};

let stats           = { chileno:50, cordura:100, hambre:20, temperatura:18 };
let currentDay      = 0;
let currentPhase    = 0;
let eventsThisPhase = 0;
let currentEvent    = null;
let activeChainId   = null;
let lastEventId     = null;
let gameOver        = false;
let dayStartDone    = false;
let effectTimeout   = null;

// ── FONDO ─────────────────────────────────────────────────────
function setBackground(type) {
  const game = document.getElementById("game");
  bgClasses.forEach(c => game.classList.remove(c));
  game.classList.add("bg-" + (type === "cursed" ? "cursed-scene" : type === "default" ? "default" : type));
}

function setBgForEvent(id) {
  setBackground(eventBgMap[id] || "default");
}

// ── STATS ─────────────────────────────────────────────────────
function applyStats(choice, eventId) {
  for (const stat in choice.stats) {
    const val = choice.stats[stat];
    if (stat === "plata") {
      if (val < 0) gastarPlata(Math.abs(val));
      else ganarPlata(val);
    } else if (stats[stat] !== undefined) {
      stats[stat] += val;
      if (stat === "chileno") {
        const esEspecial = eventosEspecialesChilenidad.includes(eventId);
        const tope = esEspecial ? CHILENIDAD_MAX_ESPECIAL : CHILENIDAD_MAX_NORMAL;
        stats[stat] = Math.max(0, Math.min(tope, stats[stat]));
      } else if (stat === "cordura") {
        stats[stat] = Math.max(0, Math.min(100, stats[stat]));
      } else {
        stats[stat] = Math.max(0, Math.min(100, stats[stat]));
      }
    }
  }
}

function updateStats() {
  const chilenoBadge = stats.chileno > 100 ? "🔥" : "";
  document.getElementById("chileno").innerText     = stats.chileno + chilenoBadge;
  document.getElementById("cordura").innerText     = stats.cordura;
  document.getElementById("hambre").innerText      = stats.hambre;
  document.getElementById("temperatura").innerText = stats.temperatura;

  const plataEl = document.getElementById("plata");
  if (usandoTarjeta || deudaTarjeta > 0) {
    plataEl.innerText   = "💳 DEBE";
    plataEl.style.color = "#ff4444";
  } else {
    plataEl.innerText   = formatPlata(efectivo);
    plataEl.style.color = efectivo < 3000 ? "#ffaa00" : "";
  }

  const cardWarn = document.getElementById("card-warning");
  if (cardWarn) {
    if (deudaTarjeta > 0) {
      cardWarn.style.display = "block";
      cardWarn.innerText     = "💳 TARJETA: " + formatPlata(deudaTarjeta) + " (30% interés)";
    } else {
      cardWarn.style.display = "none";
    }
  }
}

function applySanityEffects() {
  const gameDiv   = document.getElementById("game");
  const eventCard = document.getElementById("event-card");
  if (!gameDiv || !eventCard) return;
  gameDiv.classList.remove("distorted-low","distorted-high");
  eventCard.classList.remove("glitch-card");
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

// ── PANTALLAS ─────────────────────────────────────────────────
function showGameOver() {
  const playerEl = document.getElementById('player');
  if (playerEl) { playerEl.src = 'assets/player-muerto.png'; playerEl.className = 'state-muerto'; }
  gameOver = true;
  setBackground("cursed");
  document.getElementById("event-card").innerHTML = `
    <div class="screen-overlay">
      <div class="overlay-emoji">💀</div>
      <div class="overlay-title" style="color:#ff0000">GAME OVER</div>
      <div class="overlay-body">
        La cordura llegó a 0.<br>Te quedaste mirando el techo<br>a las 3am un martes.<br><br>
        🇨🇱 Chilenidad: <b>${stats.chileno}${stats.chileno > 100 ? " 🔥 ESPECIAL" : ""}</b><br>
        💸 Efectivo: <b>${formatPlata(efectivo)}</b><br>
        💳 Deuda: <b>${formatPlata(deudaTarjeta)}</b>
      </div>
      <button class="overlay-btn" onclick="restartGame()">DE NUEVO PO</button>
    </div>`;
  document.getElementById("effect-text").innerText = "";
  document.getElementById("day-phase").innerText   = "CORDURA: MUERTA";
}

function showWin() {
  const playerEl = document.getElementById('player');
  if (playerEl) { playerEl.src = 'assets/player-victoria.png'; playerEl.className = 'state-victoria'; }
  gameOver = true;
  setBackground("default");
  document.getElementById("event-card").innerHTML = `
    <div class="screen-overlay">
      <div class="overlay-emoji">🇨🇱🏆</div>
      <div class="overlay-title" style="color:#ffff00">SOBREVIVISTE</div>
      <div class="overlay-body">
        Eres un chileno de acero.<br><br>
        🇨🇱 Chilenidad: <b>${stats.chileno}${stats.chileno > 100 ? " 🔥 ÉPICO" : ""}</b><br>
        🧠 Cordura: <b>${stats.cordura}</b><br>
        💸 Efectivo: <b>${formatPlata(efectivo)}</b><br>
        💳 Deuda: <b>${formatPlata(deudaTarjeta)}</b>
      </div>
      <button class="overlay-btn" onclick="restartGame()">OTRA VEZ</button>
    </div>`;
  document.getElementById("effect-text").innerText = "";
  document.getElementById("day-phase").innerText   = "SEMANA COMPLETA 🏆";
}

function restartGame() {
  gameOver        = false;
  stats           = { chileno:50, cordura:100, hambre:20, temperatura:18 };
  efectivo        = 15000;
  deudaTarjeta    = 0;
  usandoTarjeta   = false;
  currentDay      = 0;
  currentPhase    = 0;
  eventsThisPhase = 0;
  activeChainId   = null;
  lastEventId     = null;
  dayStartDone    = false;
  setBackground("default");
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
  if (pool.length === 0) return eventsData[phaseId].filter(e => !e.isChain)[0];
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── RENDER ────────────────────────────────────────────────────
function renderChoices(choices) {
  const el = document.getElementById("choices");
  el.innerHTML = "";
  choices.forEach((choice, i) => {
    const btn     = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick   = () => choose(i);
    el.appendChild(btn);
  });
}

function renderEvent() {
  if (gameOver) return;

  // Evento fijo de inicio de día (solo primera fase, primera vez del día)
  if (!dayStartDone && currentPhase === 0) {
    dayStartDone = true;
    const startEv = dayStartEvents[currentDay];
    currentEvent  = { ...startEv, id: `day_start_${currentDay}` };
    document.getElementById("day-phase").innerText     = `${days[currentDay]} — ${phases[0].name}`;
    document.getElementById("event-image").innerText   = startEv.emoji;
    document.getElementById("event-context").innerText = startEv.context;
    document.getElementById("event-text").innerText    = startEv.text;
    setBackground(startEv.background);
    renderChoices(startEv.choices);
    updateStats();
    applySanityEffects();
    return;
  }

  currentEvent = getRandomEvent();
  if (!currentEvent) { advancePhase(); renderEvent(); return; }
  if (currentEvent.id === "n102_despertar_lunes") { setTimeout(showWin, 500); return; }

  lastEventId = currentEvent.id;
  document.getElementById("day-phase").innerText     = `${days[currentDay]} — ${phases[currentPhase].name}`;
  document.getElementById("event-image").innerText   = currentEvent.emoji;
  document.getElementById("event-context").innerText = currentEvent.context;
  document.getElementById("event-text").innerText    = currentEvent.text;
  setBgForEvent(currentEvent.id);
  updatePlayer(currentEvent.id);
  renderChoices(currentEvent.choices);
  updateStats();
  applySanityEffects();
}

// ── CHOOSE ────────────────────────────────────────────────────
window.choose = function(index) {
  if (gameOver) return;
  const choice  = currentEvent.choices[index];
  const eventId = currentEvent.id || "";

  const effEl = document.getElementById("effect-text");
  effEl.style.color = "#ff00ff";

  applyStats(choice, eventId);
  updateStats();

  // Badge chilenidad especial
  let effectMsg = choice.effect;
  if (stats.chileno > 100) {
    effectMsg += " ⭐ CHILENIDAD EXTREMA";
    effEl.style.color = "#ff6600";
  }
  effEl.innerText = effectMsg;
  effEl.classList.add('visible');

  if (effectTimeout) clearTimeout(effectTimeout);

  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 200);
  document.getElementById("choices").style.pointerEvents = "none";

  if (stats.cordura <= 0) { setTimeout(showGameOver, 700); return; }

  eventsThisPhase++;
  if (choice.nextEvent) activeChainId = choice.nextEvent;

  // Effect dura 2.5 segundos
  effectTimeout = setTimeout(() => {
    effEl.innerText   = "";
    effEl.style.color = "";
    effEl.classList.remove('visible');
    document.getElementById("choices").style.pointerEvents = "auto";
    checkPhaseProgression();
    renderEvent();
  }, 2500);
};

// ── FASE ──────────────────────────────────────────────────────
function advancePhase() {
  eventsThisPhase = 0;
  currentPhase++;
  if (currentPhase >= phases.length) {
    currentPhase = 0;
    currentDay++;
    dayStartDone = false;
    if (currentDay >= days.length) { setTimeout(showWin, 500); }
  }
}

function checkPhaseProgression() {
  if (eventsThisPhase >= 3) advancePhase();
}

// ── START ─────────────────────────────────────────────────────
renderEvent();
