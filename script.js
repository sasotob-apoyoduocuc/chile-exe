// 1. Importaciones nativas de módulos JS desde la subcarpeta
import { morningEvents } from './events/events-morning.js';
import { middayEvents } from './events/events-midday.js';
import { afternoonEvents } from './events/events-afternoon.js';
import { nightEvents } from './events/events-night.js';

// 2. Indexador de fases unificado
const eventsData = {
  morning: morningEvents,
  midday: middayEvents,
  afternoon: afternoonEvents,
  night: nightEvents
};

const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];

const phases = [
  { id: "morning", name: "MAÑANA" },
  { id: "midday", name: "MEDIODÍA" },
  { id: "afternoon", name: "TARDE" },
  { id: "night", name: "NOCHE" }
];

let stats = {
  chileno: 50,
  cordura: 100,
  hambre: 20,
  temperatura: 18,
  plata: 50
};

let currentDay = 0;
let currentPhase = 0;
let eventsThisPhase = 0;
let currentEvent = null;
let activeChainEventId = null; 
let lastEventId = null; 

function getRandomEvent() {
  const phaseId = phases[currentPhase].id;
  const phaseEvents = eventsData[phaseId] || [];

  // Buscar si hay un evento encadenado cruzando de manera global
  if (activeChainEventId) {
    let chainEvent = null;
    for (let phase in eventsData) {
      const found = eventsData[phase].find(e => e.id === activeChainEventId);
      if (found) { chainEvent = found; break; }
    }
    activeChainEventId = null; 
    return chainEvent;
  }

  // Filtrar eventos base (que no requieran ser encadenados)
  let filtered = phaseEvents.filter(event => !event.isChain);

  // Filtrar según el rango de cordura actual del jugador
  filtered = filtered.filter(event => {
    const minC = event.minCordura !== undefined ? event.minCordura : 0;
    const maxC = event.maxCordura !== undefined ? event.maxCordura : 100;
    return stats.cordura >= minC && stats.cordura <= maxC;
  });

  // Evitar repetir exactamente el mismo evento previo si hay más opciones disponibles
  if (filtered.length > 1 && lastEventId) {
    filtered = filtered.filter(event => event.id !== lastEventId);
  }

  const selected = filtered[Math.floor(Math.random() * filtered.length)];
  lastEventId = selected ? selected.id : null;
  return selected;
}

function renderEvent() {
  currentEvent = getRandomEvent();

  // Si por el filtro de cordura no hay ningún evento que calce, forzamos salto de fase
  if (!currentEvent) {
    eventsThisPhase = 3; 
    checkPhaseProgression();
    renderEvent();
    return;
  }

  document.getElementById("day-phase").innerText = 
    `${days[currentDay]} — ${phases[currentPhase].name}`;
  document.getElementById("event-image").innerText = currentEvent.emoji;
  document.getElementById("event-context").innerText = currentEvent.context;
  document.getElementById("event-text").innerText = currentEvent.text;

  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = ""; 

  // Generamos los botones dinámicamente según las opciones reales del evento
  currentEvent.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => choose(index);
    choicesContainer.appendChild(btn);
  });

  updateStats();
  applySanityEffects(); 
}

// Vinculamos al objeto window para mantener compatibilidad si hay llamadas inline
window.choose = function(index) {
  const choice = currentEvent.choices[index];
  document.getElementById("effect-text").innerText = choice.effect;

  for (let stat in choice.stats) {
    if (stats[stat] !== undefined) {
      stats[stat] += choice.stats[stat];
      // Clamping para que no rompa rangos de 0 a 100 (excepto plata y temperatura)
      if (stat !== "temperatura" && stat !== "plata") {
        stats[stat] = Math.max(0, Math.min(100, stats[stat])); 
      }
    }
  }

  updateStats();

  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 200);

  if (choice.nextEvent) {
    activeChainEventId = choice.nextEvent;
  } else {
    eventsThisPhase++;
  }

  // Bloqueo temporal para evitar doble clicks ansiosos del jugador
  document.getElementById("choices").style.pointerEvents = "none";

  setTimeout(() => {
    checkPhaseProgression();
    renderEvent();
    document.getElementById("effect-text").innerText = "";
    document.getElementById("choices").style.pointerEvents = "auto";
  }, 1100);
}

function checkPhaseProgression() {
  if (activeChainEventId) return;

  if (eventsThisPhase >= 3) {
    eventsThisPhase = 0;
    currentPhase++;

    if (currentPhase >= phases.length) {
      currentPhase = 0;
      currentDay++;

      if (currentDay >= days.length) {
        alert("🎉 INCREÍBLE: Sobreviviste una semana laboral en CHILE.EXE.");
        currentDay = 0;
        stats.cordura = 100; 
      }
    }
  }
}

function updateStats() {
  document.getElementById("chileno").innerText = stats.chileno;
  document.getElementById("cordura").innerText = stats.cordura;
  document.getElementById("hambre").innerText = stats.hambre;
  document.getElementById("temperatura").innerText = stats.temperatura;
  document.getElementById("plata").innerText = stats.plata;
}

function applySanityEffects() {
  const gameDiv = document.getElementById("game");
  const eventCard = document.getElementById("event-card");
  
  if (!gameDiv || !eventCard) return;

  gameDiv.className = "";
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

// Lanzamos el bucle por primera vez
renderEvent();
