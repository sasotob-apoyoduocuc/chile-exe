const events = [
  {
    emoji: "🚇",
    text: "LA MICRO NO PARÓ.",
    choices: [
      {
        text: "CORRER DETRÁS",
        effect: "+10 CHILENIDAD",
        stats: { chileno: 10, cordura: -5 }
      },
      {
        text: "INSULTAR AL CHOFER",
        effect: "CALLATE VIEJA QL",
        stats: { chileno: 20, cordura: -10 }
      },
      {
        text: "LLORAR",
        effect: "-15 CORDURA",
        stats: { cordura: -15 }
      }
    ]
  },

  {
    emoji: "🌞",
    text: "AHORA HACEN 34°.",
    choices: [
      {
        text: "SACARME EL POLERÓN",
        effect: "-5 DIGNIDAD",
        stats: { temperatura: 10 }
      },
      {
        text: "SEGUIR SUFRIENDO",
        effect: "+15 CHILENIDAD",
        stats: { chileno: 15, cordura: -5 }
      },
      {
        text: "ENTRAR AL MALL",
        effect: "AIRE ACONDICIONADO GOD",
        stats: { cordura: 10 }
      }
    ]
  }
];

let currentEvent = 0;

let stats = {
  chileno: 50,
  cordura: 100,
  hambre: 20,
  temperatura: 18
};

function renderEvent() {

  const event = events[currentEvent];

  document.getElementById("event-image").innerText = event.emoji;
  document.getElementById("event-text").innerText = event.text;

  const buttons = document.querySelectorAll("#choices button");

  event.choices.forEach((choice, index) => {
    buttons[index].innerText = choice.text;
  });

  updateStats();
}

function choose(index) {

  const event = events[currentEvent];
  const choice = event.choices[index];

  document.getElementById("effect-text").innerText = choice.effect;

  for (let stat in choice.stats) {
    stats[stat] += choice.stats[stat];
  }

  updateStats();

  document.body.style.transform = "scale(1.03)";

  setTimeout(() => {
    document.body.style.transform = "scale(1)";
  }, 100);

  currentEvent++;

  if (currentEvent >= events.length) {
    currentEvent = 0;
  }

  setTimeout(() => {
    renderEvent();
    document.getElementById("effect-text").innerText = "";
  }, 800);
}

function updateStats() {
  document.getElementById("chileno").innerText = stats.chileno;
  document.getElementById("cordura").innerText = stats.cordura;
  document.getElementById("hambre").innerText = stats.hambre;
  document.getElementById("temperatura").innerText = stats.temperatura;
}

renderEvent();
