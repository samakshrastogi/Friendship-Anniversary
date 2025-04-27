// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0xffffff,
  transparent: true,
  opacity: 0.8,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Create floating hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);

// Button interaction
const button = document.querySelector(".button");

button.addEventListener("mousemove", (e) => {
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  const rotateX = -y / 10;
  const rotateY = x / 10;

  button.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

button.addEventListener("mouseleave", () => {
  button.style.transform = "rotateX(0deg) rotateY(0deg)";
});

function showMemory() {
  window.location.href = "https://tally.so/r/wdgl1K";
}
