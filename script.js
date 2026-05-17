const days = [
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES"
];

const phases = [
  {
    id: "morning",
    name: "MAÑANA"
  },
  {
    id: "midday",
    name: "MEDIODÍA"
  },
  {
    id: "afternoon",
    name: "TARDE"
  },
  {
    id: "night",
    name: "NOCHE"
  }
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

const events = [

  {
    phase: "morning",
    repeatable: true,

    emoji: "🚇",
    context: "Llevas 40 minutos esperando.",

    text: "LA MICRO NO PARÓ.",

    choices: [
      {
        text: "CORRER DETRÁS",
        effect: "+10 CHILENIDAD",
        stats: {
          chileno: 10,
          cordura: -5
        }
      },

      {
        text: "INSULTAR AL CHOFER",
        effect: "CALLATE VIEJA QL",
        stats: {
          chileno: 20,
          cordura: -15
        }
      },

      {
        text: "ACEPTAR TU DESTINO",
        effect: "-10 CORDURA",
        stats: {
          cordura: -10
        }
      }
    ]
  },

  {
    phase: "morning",
    repeatable: true,

    emoji: "🌞",
    context: "Saliste con polerón.",

    text: "AHORA HACEN 34°.",

    choices: [
      {
        text: "SEGUIR SUFRIENDO",
        effect: "+15 CHILENIDAD",
        stats: {
          chileno: 15,
          temperatura: 10
        }
      },

      {
        text: "ENTRAR AL MALL",
        effect: "AIRE ACONDICIONADO GOD",
        stats: {
          cordura: 10
        }
      },

      {
        text: "SACARME TODO",
        effect: "-20 DIGNIDAD",
        stats: {
          cordura: -5
        }
      }
    ]
  },

  {
    phase: "midday",
    repeatable: true,

    emoji: "🧑‍💼",
    context: "Recién llegaste.",

    text: "EL JEFE QUIERE HABLAR.",

    choices: [
      {
        text: "SONREÍR",
        effect: "DOLOR INTERNO",
        stats: {
          cordura: -10
        }
      },

      {
        text: "HACERME EL WEON",
        effect: "+15 CHILENIDAD",
        stats: {
          chileno: 15
        }
      },

      {
        text: "RENUNCIAR MENTALMENTE",
        effect: "MODO AUTOMÁTICO",
        stats: {
          cordura: -15
        }
      }
    ]
  },

  {
    phase: "midday",
    repeatable: true,

    emoji: "🍔",
    context: "No llevaste almuerzo.",

    text: "EL CASINO SE VE PELIGROSO.",

    choices: [
      {
        text: "COMER IGUAL",
        effect: "RIESGO TOMADO",
        stats: {
          hambre: -20,
          cordura: -5
        }
      },

      {
        text: "SALTARME EL ALMUERZO",
        effect: "+30 HAMBRE",
        stats: {
          hambre: 30
        }
      },

      {
        text: "ARRIESGARME CON LA MAYONESA",
        effect: "DIOS NOS ABANDONÓ",
        stats: {
          cordura: -20
        }
      }
    ]
  },

  {
    phase: "afternoon",
    repeatable: false,

    emoji: "🌞",
    context: "Dormiste poco.",

    text: "EL SOL TE ESTÁ MIRANDO.",

    choices: [
      {
        text: "IGNORARLO",
        effect: "NO FUNCIONÓ",
        stats: {
          cordura: -15
        }
      },

      {
        text: "SALUDAR",
        effect: "EL SOL SONRIÓ",
        stats: {
          cordura: -20
        }
      },

      {
        text: "PEDIR PERDÓN",
        effect: "+10 SUPERVIVENCIA",
        stats: {
          chileno: 5
        }
      }
    ]
  },

  {
    phase: "night",
    repeatable: true,

    emoji: "🚉",
    context: "Terminó la pega.",

    text: "EL METRO ESTÁ COLAPSADO.",

    choices: [
      {
        text: "METERME IGUAL",
        effect: "+20 CHILENIDAD",
        stats: {
          chileno: 20,
          cordura: -15
        }
      },

      {
        text: "CAMINAR",
        effect: "PIERNAS DE ACERO",
        stats: {
          cordura: 5
        }
      },

      {
        text: "PEDIR UBER Y LLORAR",
        effect: "-25 PLATA",
        stats: {
          plata: -25
        }
      }
    ]
  }

];

let currentEvent = null;

function getRandomEvent() {

  const phaseId = phases[currentPhase].id;

  const filtered = events.filter(
    event => event.phase === phaseId
  );

  return filtered[
    Math.floor(Math.random() * filtered.length)
  ];
}

function renderEvent() {

  currentEvent = getRandomEvent();

  document.getElementById("day-phase").innerText =
    `${days[currentDay]} — ${phases[currentPhase].name}`;

  document.getElementById("event-image").innerText =
    currentEvent.emoji;

  document.getElementById("event-context").innerText =
    currentEvent.context;

  document.getElementById("event-text").innerText =
    currentEvent.text;

  const buttons =
    document.querySelectorAll("#choices button");

  currentEvent.choices.forEach((choice, index) => {
    buttons[index].innerText = choice.text;
  });

  updateStats();
}

function choose(index) {

  const choice = currentEvent.choices[index];

  document.getElementById("effect-text").innerText =
    choice.effect;

  for (let stat in choice.stats) {

    if (stats[stat] !== undefined) {
      stats[stat] += choice.stats[stat];
    }
  }

  updateStats();

  document.body.classList.add("shake");

  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 200);

  eventsThisPhase++;

  if (eventsThisPhase >= 3) {

    eventsThisPhase = 0;

    currentPhase++;

    if (currentPhase >= phases.length) {

      currentPhase = 0;
      currentDay++;

      if (currentDay >= days.length) {

        alert("SOBREVIVISTE CHILE.EXE");

        currentDay = 0;
      }
    }
  }

  setTimeout(() => {

    renderEvent();

    document.getElementById("effect-text").innerText = "";

  }, 800);
}

function updateStats() {

  document.getElementById("chileno").innerText =
    stats.chileno;

  document.getElementById("cordura").innerText =
    stats.cordura;

  document.getElementById("hambre").innerText =
    stats.hambre;

  document.getElementById("temperatura").innerText =
    stats.temperatura;

  document.getElementById("plata").innerText =
    stats.plata;
}

renderEvent();
