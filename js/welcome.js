// Split title into letters
const title = document.getElementById("title");
title.innerHTML = title.textContent
  .split("")
  .map((char) => `<span class="letter">${char}</span>`)
  .join("");

// GSAP Animations
gsap.to(".letter", {
  opacity: 1,
  duration: 0.05,
  stagger: 0.05,
  ease: "power2.in",
  onComplete: () => {
    gsap.to(".letter", {
      scale: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      stagger: 0.02,
    });
  },
});

gsap.to("#message", {
  opacity: 1,
  y: 0,
  duration: 1.5,
  ease: "power3.out",
  delay: 1.5,
});

gsap.to("#timeline", {
  opacity: 1,
  y: 0,
  duration: 1.5,
  ease: "power3.out",
  delay: 2,
});

gsap.to(".timeline-item", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power3.out",
  delay: 2.2,
  stagger: 0.3,
});

// Delayed appearance of tailor question with error handling
gsap.delayedCall(5, () => {
  const tailorQuestion = document.getElementById("tailorQuestion");
  const tailorButtons = document.getElementById("tailorButtons");
  if (tailorQuestion && tailorButtons) {
    tailorQuestion.style.display = "block";
    tailorButtons.style.display = "block";
    gsap.to("#tailorQuestion", {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to("#tailorButtons", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });
  } else {
    console.error("Tailor question or buttons element not found!");
  }
});

// Audio playback function
const audio = document.getElementById("bgMusic");
function playAudio() {
  audio.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });
}

function animateFilmQuestion() {
  const filmQuestion = document.getElementById("filmQuestion");
  if (filmQuestion) {
    filmQuestion.style.display = "block";
    gsap.to("#filmQuestion", {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to("#filmButtons", {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });
  } else {
    console.error("Film question element not found!");
  }
}

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("threeCanvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Heart-shaped particles
const particlesCount = 150;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  colors[i * 3] = 0.9 + Math.random() * 0.1;
  colors[i * 3 + 1] = 0.2 + Math.random() * 0.2;
  colors[i * 3 + 2] = 0.4 + Math.random() * 0.2;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
particlesGeometry.setAttribute(
  "color",
  new THREE.BufferAttribute(colors, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  size: 0.25,
  vertexColors: true,
  transparent: true,
  opacity: 0.9,
});

const particles = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(particles);

// Main 3D heart
const heartGeometry = new THREE.SphereGeometry(1, 32, 32);
const heartMaterial = new THREE.MeshPhongMaterial({
  color: 0xe63946,
  shininess: 100,
});
const heart = new THREE.Mesh(heartGeometry, heartMaterial);
heart.scale.set(0.8, 1.2, 0.8);
scene.add(heart);

// Timeline orbiting hearts
const timelineHearts = [];
for (let i = 0; i < 3; i++) {
  const smallHeart = new THREE.Mesh(heartGeometry, heartMaterial);
  smallHeart.scale.set(0.2, 0.3, 0.2);
  smallHeart.position.y = -2 - i * 1;
  scene.add(smallHeart);
  timelineHearts.push(smallHeart);
}

// Fireworks effect
const fireworks = [];
function createFirework() {
  const fireworkGeometry = new THREE.BufferGeometry();
  const fireworkPositions = new Float32Array(50 * 3);
  for (let i = 0; i < 50; i++) {
    fireworkPositions[i * 3] = (Math.random() - 0.5) * 5;
    fireworkPositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    fireworkPositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  fireworkGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(fireworkPositions, 3)
  );
  const fireworkMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xff69b4,
    transparent: true,
    opacity: 0.8,
  });
  const firework = new THREE.Points(fireworkGeometry, fireworkMaterial);
  firework.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    -5
  );
  scene.add(firework);
  fireworks.push({ mesh: firework, life: 100 });
}
setInterval(createFirework, 3000);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0.9);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 6;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  heart.rotation.y += 0.01;
  particles.rotation.y += 0.002;
  particles.rotation.x += 0.001;

  // Animate particles
  const positions = particles.geometry.attributes.position.array;
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 1] -= 0.015;
    if (positions[i * 3 + 1] < -10) {
      positions[i * 3 + 1] = 10;
    }
  }
  particles.geometry.attributes.position.needsUpdate = true;

  // Orbit timeline hearts
  timelineHearts.forEach((h, i) => {
    h.position.x = Math.sin(Date.now() * 0.001 + i) * 1;
    h.rotation.y += 0.02;
  });

  // Animate fireworks
  fireworks.forEach((f, i) => {
    f.mesh.scale.multiplyScalar(1.02);
    f.mesh.material.opacity *= 0.95;
    f.life--;
    if (f.life <= 0) {
      scene.remove(f.mesh);
      fireworks.splice(i, 1);
    }
  });

  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Page functionality
function tailorYes() {
  console.log("tailorYes clicked");
  playAudio(); // Play audio on "Yes" click
  animateFilmQuestion();
}

function redirectTo(url) {
  window.location.href = url;
}
