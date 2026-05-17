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
