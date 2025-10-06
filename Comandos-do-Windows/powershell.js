/* ===== Menu ===== */
const hamburger = document.getElementById("hamburger");
const floatMenu = document.getElementById("floatMenu");
const closeMenu = document.getElementById("closeMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  floatMenu.classList.toggle("show");
});

closeMenu.addEventListener("click", () => {
  hamburger.classList.remove("active");
  floatMenu.classList.remove("show");
});

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
