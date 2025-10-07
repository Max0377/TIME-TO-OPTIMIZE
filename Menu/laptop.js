/* ===== Menu ===== */
const hamburger = document.getElementById("hamburger");
const floatMenu = document.getElementById("floatMenu");
const closeMenu = document.getElementById("closeMenu");

if (hamburger && floatMenu && closeMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    floatMenu.classList.toggle("show");
  });
  closeMenu.addEventListener("click", () => {
    hamburger.classList.remove("active");
    floatMenu.classList.remove("show");
  });
}

/* ===== Acessibilidade ===== */
const openAcessibilidade = document.getElementById("openAcessibilidade");
const floatAcessibilidade = document.getElementById("floatAcessibilidade");
const closeAcessibilidade = document.getElementById("closeAcessibilidade");

if (openAcessibilidade) {
  openAcessibilidade.addEventListener("click", () => {
    floatMenu.classList.remove("show");
    floatAcessibilidade.classList.add("show");
  });
}

if (closeAcessibilidade) {
  closeAcessibilidade.addEventListener("click", () => {
    floatAcessibilidade.classList.remove("show");
  });
}

// ===== Botão Voltar para o Menu =====
document.querySelectorAll(".backToMenu").forEach(btn => {
  btn.addEventListener("click", () => {
    // Fecha todos os submenus abertos
    document.querySelectorAll(".float-menu").forEach(menu => {
      if (menu.id !== "floatMenu") {
        menu.classList.remove("show");
      }
    });
    // Reabre o menu principal
    document.getElementById("floatMenu").classList.add("show");
  });
});

/* ===== Dark Mode ===== */
const toggleMode = document.getElementById("toggleMode");
const body = document.body;
const titleText = document.getElementById("titleText");
const mainTitle = document.getElementById("mainTitle");

if (toggleMode) {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleMode.textContent = "Modo Escuro";
    if (titleText) titleText.style.color = "#00E5FF";
    if (mainTitle) mainTitle.style.color = "#00E5FF";
  } else {
    toggleMode.textContent = "Modo Claro";
    if (titleText) titleText.style.color = "#0044CC";
    if (mainTitle) mainTitle.style.color = "#0044CC";
  }

  toggleMode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      toggleMode.textContent = "Modo Escuro";
      if (titleText) titleText.style.color = "#00E5FF";
      if (mainTitle) mainTitle.style.color = "#00E5FF";
      localStorage.setItem("theme", "dark");
    } else {
      toggleMode.textContent = "Modo Claro";
      if (titleText) titleText.style.color = "#0044CC";
      if (mainTitle) mainTitle.style.color = "#0044CC";
      localStorage.setItem("theme", "light");
    }
  });
}

/* ===== Controle de Fonte ===== */
let fontSize = 16;
const increaseFont = document.getElementById("increaseFont");
const decreaseFont = document.getElementById("decreaseFont");
const resetFont = document.getElementById("resetFont");

function applyFontSize() {
  document.documentElement.style.fontSize = fontSize + "px";
  localStorage.setItem("fontSize", fontSize);
}
if (localStorage.getItem("fontSize")) {
  const saved = parseInt(localStorage.getItem("fontSize"), 10);
  if (!isNaN(saved)) { fontSize = saved; applyFontSize(); }
}
if (increaseFont) {
  increaseFont.addEventListener("click", () => { if (fontSize < 26) { fontSize += 2; applyFontSize(); } });
}
if (decreaseFont) {
  decreaseFont.addEventListener("click", () => { if (fontSize > 10) { fontSize -= 2; applyFontSize(); } });
}
if (resetFont) {
  resetFont.addEventListener("click", () => { fontSize = 16; applyFontSize(); });
}

// Recuperar valor salvo
if (localStorage.getItem("fontSize")) {
  const saved = parseInt(localStorage.getItem("fontSize"), 10);
  if (!isNaN(saved)) {
    fontSize = saved;
    applyFontSize();
  }
}

/* ===== Canvas Luzes ===== */
const canvas = document.getElementById("lightCanvas");
const ctx = canvas.getContext("2d");
let lights = [];
const lightCount = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createLights() {
  lights = [];
  for (let i = 0; i < lightCount; i++) {
    lights.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      twinkle: Math.random() * 0.05,
    });
  }
}
createLights();

function getLightColor() {
  return document.body.classList.contains("dark-mode") ? "#00E5FF" : "#0044CC";
}

function animateLights() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lights.forEach((light) => {
    ctx.beginPath();
    ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
    ctx.fillStyle = getLightColor();
    ctx.globalAlpha = light.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;

    light.x += light.speedX;
    light.y += light.speedY;
    light.opacity += (Math.random() - 0.5) * light.twinkle;

    if (light.opacity < 0.1) light.opacity = 0.1;
    if (light.opacity > 0.8) light.opacity = 0.8;
    if (light.x < 0 || light.x > canvas.width) light.speedX *= -1;
    if (light.y < 0 || light.y > canvas.height) light.speedY *= -1;
  });
  requestAnimationFrame(animateLights);
}
animateLights();

const observer = new MutationObserver(() => {
  createLights();
});
observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

/* ===== Comandos Windows no Menu ===== */
const openComandos = document.getElementById("openComandos");
const floatComandos = document.getElementById("floatComandos");
const closeComandos = document.getElementById("closeComandos");
const btnCMD = document.getElementById("openCMD");
const btnPowerShell = document.getElementById("openPowerShell");
const btnWinR = document.getElementById("openWinR");

if (openComandos && floatComandos && closeComandos) {
  openComandos.addEventListener("click", () => {
    floatMenu.classList.remove("show");
    floatComandos.classList.add("show");
  });
  closeComandos.addEventListener("click", () => {
    floatComandos.classList.remove("show");
  });
}

if (btnCMD) {
  btnCMD.addEventListener("click", () => {
    window.location.href = "/TIME-TO-OPTIMIZE/windows/cmd.html";
  });
}
if (btnPowerShell) {
  btnPowerShell.addEventListener("click", () => {
    window.location.href = "/TIME-TO-OPTIMIZE/windows/powershell.html";
  });
}
if (btnWinR) {
  btnWinR.addEventListener("click", () => {
    window.location.href = "/TIME-TO-OPTIMIZE/windows/winr.html";
  });
}

/* ===== Backup ===== */
const openBackup = document.getElementById("openBackup");
if (openBackup) {
  openBackup.addEventListener("click", () => {
    window.location.href = "../backup/backup.html";
  });
}


/* ===== Inicialização ===== */
setFont(currentFontSize);s


