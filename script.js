document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector(".app");
  const nodesEl = document.getElementById("nodes");
  const avatar = document.getElementById("avatar");
  const live = document.querySelector(".sr-live");
  const chips = document.querySelectorAll(".chip");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");

  // Beispiel-Positionen (in % vom Scene-Container) – am Fluss entlang
  const POS = [
    {x:26, y:20}, // 1
    {x:36, y:30}, // 2
    {x:44, y:42}, // 3
    {x:50, y:54}, // 4
    {x:46, y:66}, // 5
    {x:56, y:74}, // 6
    {x:78, y:70}, // 7 (Ziel / Haus später)
  ];

  let active = 0;

  function makeNode(i){
    const n = document.createElement("button");
    n.className = "node is-inactive";
    n.type = "button";
    n.setAttribute("aria-pressed", "false");
    n.style.left = POS[i].x + "%";
    n.style.top  = POS[i].y + "%";
    n.style.position = "absolute";
    n.style.transform = "translate(-50%, -50%)";
    n.dataset.index = i;
    n.addEventListener("click", () => setActive(i));
    return n;
  }

  function renderNodes(){
    nodesEl.innerHTML = "";
    POS.forEach((_, i) => nodesEl.appendChild(makeNode(i)));
    updateNodes();
  }

  function updateNodes(){
    const buttons = nodesEl.querySelectorAll(".node");
    buttons.forEach((b,i) => {
      const on = i === active;
      b.classList.toggle("is-active", on);
      b.classList.toggle("is-inactive", !on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    // Avatar in Nähe des aktiven Node platzieren (leicht versetzt)
    const p = POS[active];
    avatar.style.left = Math.max(6, p.x - 12) + "%";
    avatar.style.bottom = Math.max(6, 100 - p.y - 12) + "%";

    if (live) live.textContent = `Meilenstein ${active+1} ausgewählt`;
  }

  function setActive(i){
    active = (i + POS.length) % POS.length;
    updateNodes();
  }

  // Theme-Switch (Tag/Abend/Nacht) – aktuell nur Klassenwechsel
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("is-active"));
      chips.forEach(c => c.setAttribute("aria-pressed","false"));
      chip.classList.add("is-active");
      chip.setAttribute("aria-pressed","true");
      document.body.setAttribute("data-theme", chip.dataset.theme);
      if (live) live.textContent = `Stimmung: ${chip.dataset.theme}`;
      // Hier später: bg_* und avatar_* PNGs tauschen
    });
  });

  // Prev/Next
  btnPrev.addEventListener("click", () => setActive(active - 1));
  btnNext.addEventListener("click", () => setActive(active + 1));

  // Init
  renderNodes();
  updateNodes();
});
