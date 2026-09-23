const contestants = [
  {
    id: "067",
    name: "Kang Sae-byeok",
    age: 27,
    status: "ACTIVE",
    room: "Dorm-A-067",
    round: 3,
    history: ["Red Light, Green Light", "Dalgona", "Tug of War", "Marbles"],
    incidents: 0,
    disciplinary: 0,
    medical: "STABLE",
    access: "CONTESTANT"
  },
  {
    id: "120",
    name: "Seong Gi-hun",
    age: 46,
    status: "WINNER",
    room: "VIP-01",
    round: 6,
    history: ["Red Light, Green Light", "Dalgona", "Tug of War", "Marbles", "Glass Bridge", "Squid Game"],
    incidents: 1,
    disciplinary: 1,
    medical: "STABLE",
    access: "FINALIST"
  },
  {
    id: "218",
    name: "Seon-nyeo",
    age: 38,
    status: "ACTIVE",
    room: "Dorm-B-218",
    round: 5,
    history: ["Red Light, Green Light", "Dalgona", "Marbles", "Glass Bridge"],
    incidents: 2,
    disciplinary: 1,
    medical: "MONITORED",
    access: "CONTESTANT"
  },
  {
    id: "112",
    name: "Ali Abdul",
    age: 29,
    status: "ELIMINATED",
    room: "Archive-112",
    round: 3,
    history: ["Red Light, Green Light", "Dalgona", "Tug of War"],
    incidents: 0,
    disciplinary: 0,
    medical: "SEVERE",
    access: "RESTRICTED"
  },
  {
    id: "999",
    name: "No-Name",
    age: 24,
    status: "MISSING",
    room: "Unknown",
    round: 1,
    history: ["Red Light, Green Light"],
    incidents: 3,
    disciplinary: 2,
    medical: "UNKNOWN",
    access: "MISSING"
  }
];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function setPlayer(player) {
  document.getElementById("playerId").textContent = player.id;
  document.getElementById("playerName").textContent = player.name.toUpperCase();
  document.getElementById("playerAge").textContent = player.age;
  document.getElementById("playerRoom").textContent = player.room;
  document.getElementById("playerStatus").textContent = player.status;
  document.getElementById("playerRound").textContent = player.round;
  document.getElementById("playerStatusBadge").textContent = player.status;

  const badge = document.getElementById("playerStatusBadge");
  badge.className = "status-pill";
  if (player.status === "ACTIVE") {
    badge.style.color = "#78e08f";
    badge.style.background = "rgba(120,224,143,0.08)";
    badge.style.borderColor = "rgba(120,224,143,0.3)";
  } else if (player.status === "ELIMINATED") {
    badge.style.color = "#ff8f8f";
    badge.style.background = "rgba(255,59,59,0.08)";
    badge.style.borderColor = "rgba(255,59,59,0.3)";
  } else if (player.status === "WINNER") {
    badge.style.color = "#f5d76e";
    badge.style.background = "rgba(245,215,110,0.08)";
    badge.style.borderColor = "rgba(245,215,110,0.3)";
  } else if (player.status === "MISSING") {
    badge.style.color = "#6ab7ff";
    badge.style.background = "rgba(106,183,255,0.08)";
    badge.style.borderColor = "rgba(106,183,255,0.3)";
  }

  document.getElementById("incidentsCount").textContent = player.incidents;
  document.getElementById("disciplineCount").textContent = player.disciplinary;
  document.getElementById("medicalScore").textContent = player.medical;
  document.getElementById("accessLevel").textContent = player.access;

  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";
  player.history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function findPlayer(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return contestants[0];
  return contestants.find(player =>
    player.id.toLowerCase() === normalized ||
    player.name.toLowerCase().includes(normalized)
  ) || contestants[0];
}

searchBtn.addEventListener("click", () => {
  const player = findPlayer(searchInput.value);
  setPlayer(player);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const player = findPlayer(searchInput.value);
    setPlayer(player);
  }
});

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

setPlayer(findPlayer(searchInput.value));
