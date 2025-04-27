// Ensure canvas exists
const canvas = document.getElementById("canvas");
if (!canvas) {
  console.error("Canvas element not found!");
  throw new Error("Canvas element not found!");
}

// Three.js setup
let scene, camera, renderer;
try {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
} catch (error) {
  console.error("Failed to initialize WebGLRenderer:", error);
  throw error;
}

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1.5, 50);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Card configurations
const cardConfigs = [
  {
    objects: [
      {
        geometry: new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
        color: 0xff66cc,
        position: { x: 0, y: 0, z: 0 },
        scale: 1,
      },
      {
        geometry: new THREE.SphereGeometry(0.5, 32, 32),
        color: 0xff99cc,
        position: { x: 3, y: 2, z: -2 },
        scale: 0.8,
      },
    ],
    rotationSpeed: 0.02,
    particleColor: 0xff66cc,
    animation: "pulse",
  },
  {
    objects: [
      {
        geometry: new THREE.SphereGeometry(1.5, 32, 32),
        color: 0x66ccff,
        position: { x: 2, y: 1, z: 0 },
        scale: 1,
      },
      {
        geometry: new THREE.BoxGeometry(1, 1, 1),
        color: 0x99ccff,
        position: { x: -2, y: -2, z: -1 },
        scale: 1.2,
      },
    ],
    rotationSpeed: 0.015,
    particleColor: 0x66ccff,
    animation: "orbit",
  },
  {
    objects: [
      {
        geometry: new THREE.BoxGeometry(2, 2, 2),
        color: 0xffff66,
        position: { x: -2, y: -1, z: 0 },
        scale: 1,
      },
      {
        geometry: new THREE.TorusGeometry(1, 0.3, 16, 100),
        color: 0xffff99,
        position: { x: 3, y: -1, z: -1 },
        scale: 0.9,
      },
    ],
    rotationSpeed: 0.025,
    particleColor: 0xffff66,
    animation: "bounce",
  },
  {
    objects: [
      {
        geometry: new THREE.DodecahedronGeometry(1.2),
        color: 0xcc66ff,
        position: { x: 0, y: 1, z: 0 },
        scale: 1,
      },
      {
        geometry: new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16),
        color: 0xcc99ff,
        position: { x: -3, y: -2, z: -1 },
        scale: 0.7,
      },
    ],
    rotationSpeed: 0.018,
    particleColor: 0xcc66ff,
    animation: "twist",
  },
  {
    objects: [
      {
        geometry: new THREE.IcosahedronGeometry(1.5),
        color: 0x66ff99,
        position: { x: 1, y: 0, z: 0 },
        scale: 1,
      },
      {
        geometry: new THREE.SphereGeometry(0.7, 32, 32),
        color: 0x99ffcc,
        position: { x: -2, y: 2, z: -2 },
        scale: 0.9,
      },
    ],
    rotationSpeed: 0.022,
    particleColor: 0x66ff99,
    animation: "fade",
  },
];

let currentCard = 0;
let objects = [];
let particles = null;

// Particle system
function createParticles(color) {
  const particleCount = 100;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    scales[i] = Math.random() * 0.5 + 0.2;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

  const material = new THREE.PointsMaterial({
    color: color,
    size: 0.3,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

// Initialize card
function initCard(index) {
  objects.forEach((obj) => scene.remove(obj));
  if (particles) scene.remove(particles);
  objects = [];

  const config = cardConfigs[index];
  config.objects.forEach((objConfig) => {
    const material = new THREE.MeshPhongMaterial({
      color: objConfig.color,
      shininess: 100,
      transparent: true,
      opacity: 1,
    });
    const mesh = new THREE.Mesh(objConfig.geometry, material);
    mesh.position.set(
      objConfig.position.x,
      objConfig.position.y,
      objConfig.position.z
    );
    mesh.scale.setScalar(objConfig.scale);
    scene.add(mesh);
    objects.push(mesh);
  });

  particles = createParticles(config.particleColor);
  scene.add(particles);
}

camera.position.z = 12;

// Animation
function animate() {
  requestAnimationFrame(animate);
  const config = cardConfigs[currentCard];
  const time = Date.now() * 0.001;

  objects.forEach((obj, i) => {
    const basePos = cardConfigs[currentCard].objects[i].position;
    if (config.animation === "pulse") {
      obj.rotation.x += config.rotationSpeed;
      obj.rotation.y += config.rotationSpeed;
      obj.scale.setScalar(1 + Math.sin(time * 2 + i) * 0.2);
    } else if (config.animation === "orbit") {
      obj.position.x = basePos.x + Math.sin(time + i) * 3;
      obj.position.y = basePos.y + Math.cos(time + i) * 3;
      obj.rotation.z += config.rotationSpeed;
    } else if (config.animation === "bounce") {
      obj.position.y = basePos.y + Math.abs(Math.sin(time * 3 + i)) * 2;
      obj.rotation.x += config.rotationSpeed;
      obj.rotation.y += config.rotationSpeed;
    } else if (config.animation === "twist") {
      obj.rotation.x += config.rotationSpeed;
      obj.rotation.y += config.rotationSpeed * Math.sin(time + i);
      obj.rotation.z += config.rotationSpeed * Math.cos(time + i);
    } else if (config.animation === "fade") {
      obj.material.opacity = 0.5 + Math.sin(time * 2 + i) * 0.5;
      obj.rotation.x += config.rotationSpeed;
      obj.rotation.y += config.rotationSpeed;
    }
  });

  if (particles) {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + i) * 0.02;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  pointLight.position.set(10 * Math.sin(time), 10 * Math.cos(time), 10);

  renderer.render(scene, camera);
}
animate();

// Camera zoom animation
function zoomCamera() {
  const targetZ = camera.position.z === 12 ? 10 : 12;
  const startZ = camera.position.z;
  const duration = 500;
  const startTime = Date.now();

  function zoom() {
    const elapsed = Date.now() - startTime;
    const t = Math.min(elapsed / duration, 1);
    camera.position.z = startZ + (targetZ - startZ) * t;
    if (t < 1) requestAnimationFrame(zoom);
  }
  requestAnimationFrame(zoom);
}

// Switch cards
function switchCard() {
  const containers = document.querySelectorAll(".card-container");
  containers[currentCard].classList.remove("active");
  if (currentCard === cardConfigs.length - 1) {
    window.location.href = "thanks.html";
  } else {
    currentCard = (currentCard + 1) % cardConfigs.length;
    containers[currentCard].classList.add("active");
    initCard(currentCard);
    zoomCamera();
  }
}

// Attach event listener to button
const nextButton = document.querySelector(".next-button");
nextButton.addEventListener("click", switchCard);

// Interactive hover effect
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objects);
  objects.forEach((obj, i) => {
    obj.material.color.set(cardConfigs[currentCard].objects[i].color);
  });
  intersects.forEach((intersect) => {
    intersect.object.material.color.set(0xffffff);
  });
});

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize first card
initCard(0);
